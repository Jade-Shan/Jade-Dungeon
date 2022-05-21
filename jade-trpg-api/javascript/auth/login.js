const { request } = require('express');
let jadeutils = require('../common/jadeutils');
let rdsUtil = require('../common/redisUtil');

let EXPIRE_RANGE = 1000 * 60 * 60 * 24 * 100;
let genLoginToken = (username) => {
	let uuid = jadeutils.uuid();
	let expire = (new Date()).getTime() + EXPIRE_RANGE;
	return `${username}|${uuid}|${expire}`;
};

let genUserInfoRrdsKey = (username) => {
	return `jadedungeon::auth::userInfo::${username}`;
};

let genUserTokenRrdsKey = (username) => {
	return `jadedungeon::auth::userAuth::${username}`;
};

exports.handler = {
	"/api/auth/regist": async (context, data) => {
		let json = { status: 'err' };
		let username = data.params.username;
		let password = data.params.password;
		if (username && password && username.length > 0 && password.length > 0) {
			let key = genUserInfoRrdsKey(username);
			let value = await rdsUtil.connect('auth').call((conn, callback) => {
				conn.get(key, callback);
			});
			if (value && value.length > 0) {
				json.msg = "username exists";
				console.log(json.msg);
			} else {
				let resp = await rdsUtil.connect('auth').call((conn, callback) => {
					conn.set(key, password, callback);
				});
				json.msg = resp;
				json.username = username;
				json.status = 'success';
			}
		} else {
			json.msg = "miss username or passwork";
		}
		context.response.writeHead(200, {
			'Content-Type': 'application/json;charset=utf-8',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET,POST',
			'Access-Control-Allow-Headers': 'x-requested-with,content-type'
		});
		context.response.end(JSON.stringify(json));
	},
	"/api/auth/login": async (context, data) => {
		let json = { status: 'err' };
		let username = data.params.username;
		let password = data.params.password;
		let token = data.params.token;
		if (username && password && username.length > 0 && password.length > 0) {
			let key = genUserInfoRrdsKey(username);
			let value = await rdsUtil.connect('auth').call((conn, callback) => {
				conn.get(key, callback);
			});
			if (password == value) {
				let token = genLoginToken(username);
				let key = genUserTokenRrdsKey(username);
				let resp = await rdsUtil.connect('auth').call((conn, callback) => {
					conn.set(key, token, callback);
				});
				json.msg = 'login success';
				json.username = username;
				json.token = token;
				json.status = 'success';
			} else {
				json.msg = "username or password err";
			}
		} else if (token && token.length > 0) {
			let strArr = token.split('|');
			if (strArr.length == 3 && strArr[0].length > 0 && strArr[1].length == 36 && strArr[2].length > 0) {
				username = strArr[0];
				let expire = 0;
				try {
					expire = parseInt(strArr[2]);
				} catch (err) {
					console.log(err);
				}
				if (expire > (new Date()).getTime()) {
					let key = genUserTokenRrdsKey(username);
					let value = await rdsUtil.connect('auth').call((conn, callback) => {
						conn.get(key, callback);
					});
					if (value && value === token) {
						let key = genUserTokenRrdsKey(username);
						let resp = await rdsUtil.connect('auth').call((conn, callback) => {
							conn.set(key, token, callback);
						});
						json.msg = 'login success';
						json.username = username;
						json.token = key;
						json.status = 'success';
					} else {
						json.msg = "token err or expire";
					}
				} else {
					json.msg = "token err or expire";
				}
			} else {
				json.msg = "miss username or passwork";
			}
		}
		context.response.writeHead(200, {
			'Content-Type': 'application/json;charset=utf-8',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET,POST',
			'Access-Control-Allow-Headers': 'x-requested-with,content-type'
		});
		context.response.end(JSON.stringify(json));
	}
};

