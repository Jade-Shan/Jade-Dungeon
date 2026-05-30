# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 启动与运行

- 使用 nvm 管理 Node 版本，项目根目录有 `.nvmrc`（当前指定 v22.22.2）。
- 开发环境启动：`bash startup-dev.sh`（端口 8038，假设 nvm 已在当前 shell 中可用）
- 生产环境启动：`bash startup-rls.sh`（端口 8088，脚本内显式加载 nvm）
- 直接启动：`node ./javascript/main.js -h localhost -p 8088`
- 命令行参数：`-h/--host`（主机名）、`-p/--port`（端口）、`-u/--uploadPath`（上传文件暂存目录）

## 架构概览

这是一个基于 Express 的个人网站后端，核心是一个**自定义的路由分发框架**。

### 启动流程

`javascript/main.js`（CLI 参数通过 `arg` 库解析）→ 加载 `javascript/config.js`（全局配置）→ 加载 `javascript/common/simpleHTTPServer.js`（Express 封装）→ 按 `config.globalCfg.moduleNames` 列表逐个加载模块 → `httpServer.start()` 绑定路由并启动监听。

### 模块（Handler）机制

每个模块文件导出 `exports.handler`，它是一个对象，key 是 URL 路径，value 是处理函数或配置对象。例如：

```javascript
exports.handler = {
    "/api/example": async (context, data) => { ... },                        // 同时支持 GET 和 POST
    "/api/getOnly": { method: httpServer.HTTP_GET,  bindFunc: async (...) => {...} },  // 仅 GET
    "/api/postOnly": { method: httpServer.HTTP_POST, bindFunc: async (...) => {...} }, // 仅 POST
};
```

处理函数签名：`async (context, data) => {...}`，其中 `context` 包含 `{globalCfg, application, request, response}`，`data` 包含 `{params, cookies, files}`。

`simpleHTTPServer.js` 自动将 handler 对象的 key 绑定到 Express 路由，并统一处理参数合并、文件上传、CORS 头和 JSON 响应头。

### 响应写入模式

Handler 函数**不通过返回值**来响应请求，而是直接操作 `context.response`：

```javascript
"/api/example": async (context, data) => {
    let json = { status: "ok", msg: "" };
    // ... 业务逻辑 ...
    if (!context.response.headersSent) {
        context.response.writeHead(200, {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST',
            'Access-Control-Allow-Headers': 'x-requested-with,content-type'
        });
    }
    context.response.end(JSON.stringify(json));
};
```

- 框架在 handler 执行完毕后检查 `headersSent`，若未发送则自动补上默认的 CORS + JSON 头并调用 `end()`（见 `simpleHTTPServer.js` 中的 `HttpMethods` 绑定逻辑）。
- 若 handler 需要自定义状态码或额外响应头（如 `Set-Cookie`），应在 `end()` 之前手动调用 `writeHead()`，框架检测到 `headersSent` 后就不会覆盖。
- 也可以使用 `context.response.write()` 分段输出（如流式响应），但最终必须调用 `context.response.end()`。
- 所有响应均以 JSON 格式返回。

### 目录结构

| 目录 | 说明 |
|------|------|
| `javascript/common/` | 基础框架：`simpleHTTPServer.js`（Express 封装）、`redisUtil.js`、`jadeutils.js`（UUID 工具） |
| `javascript/auth/` | 用户注册/登录，token 基于 UUID+过期时间 |
| `javascript/blog/` | 博客文章 CRUD（Redis List 存储） |
| `javascript/sandtable/` | TRPG 沙盘工具核心：`map.js`（地图场景存/取/移动请求）、`dice.js`（骰子检定） |
| `javascript/utils/` | 天气预报服务（聚合 weatherapi + openweathermap） |
| `static/` | 静态文件目录（通过 `/static` 路径暴露） |
| `docs/` | 模块文档：`framework.md`（框架说明）、`blog.md`、`gallery.md`、`weather.md` |

### Redis 数据层

- 通过 `javascript/common/redisUtil.js` 访问 Redis。
- `config.js` 中配置了 3 个命名的 Redis 连接：`trpg`、`blog`、`auth`。
- 获取连接：`rdsUtil.connectV4('trpg').call((conn) => { return conn.get(key); })`，返回 `{isSuccess, data, err}`。
- 所有 Redis key 使用 `jadedungeon::<module>::...` 命名空间前缀。

### TRPG 沙盘模块（sandtable）

核心功能模块，分为两个子模块：

- **map.js**: 地图场景管理。`campaignId + placeId + sceneId` 三级定位场景数据。包含 save-map（保存，有 owner 权限校验）、load-map（加载）、request-move（棋子移动请求，走 Redis Hash）、load-move-request（加载移动请求）。支持 parseImage 作为图片代理。

- **dice.js**: 骰子检定系统。支持标准骰子表达式（如 `3d6+d4+7D8+9`）。流程：先 `set-roll-threshold` 设定阈值 → 再 `roll-dice` 掷骰 → `get-roll-result` 查看结果。数据按 `campaignId + placeId + sceneId` 隔离。

### 认证机制

- 注册/登录接口在 `auth/login.js`。
- Token 格式：`${username}|${uuid}|${expire_timestamp}`，有效期 100 天。
- Token 存储在 Redis auth 库中，支持用户名+密码登录和 token 续期登录。

### 天气服务

聚合两个天气 API：`weatherapi.js`（主要数据）和 `openweathermap.js`（补充风向风速）。支持 `conky` 和 `json` 两种输出格式。

## 注意事项

- 所有 JavaScript 代码使用 **tab 缩进**（不使用空格缩进）。
- 本项目没有 TypeScript、没有构建工具、没有 linter、没有单元测试框架。
- `javascript/test.js` 是一个测试用 handler 模块，通过 `config.js` 加载后用于手动测试。
- 代码风格是较老的 Express 写法（手动 `writeHead` + `end`），CORS 头在每个 handler 中手动设置。
- `javascript/expressDemo.js` 是 Express 学习示例文件，不是正式模块。
- 部署通过 `tar` 打包 → `scp` 上传 → 服务器解压重启。
