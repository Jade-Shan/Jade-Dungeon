/* jshint esversion: 8 */

class SandTableView {

	constructor(canvas, fc, scene, userId) {
		this.canvas    = canvas;
		this.ctx       = canvas.getContext("2d");
		this.fc = fc;
		this.fctx = this.fc.getContext("2d");
		this.userId    = userId;
		this.observer  = {};
		this.scene     = { width: 0, height: 0, 
			campaignId: scene.campaignId, placeId: scene.placeId, sceneId: scene.sceneId,
			shadowColor: scene.shadowColor, viewRange: scene.viewRange,
			creaters : [], teams: [], walls: [], doors: [], furnishings: [], images:[]};
		this.scene.createrMap    = new Map();
		this.scene.teamMap       = new Map();
		this.scene.wallMap       = new Map();
		this.scene.doorMap       = new Map();
		this.scene.furnishingMap = new Map();
		this.scene.imageMap      = new Map();
	}

	moveObs(dx, dy) {
		this.observer.move(dx, dy);
		this.drawSence();
	}

	async drawSandTable() {
		// await loadResources();
		await loadMapDatas(this.ctx, this.scene);
		this.replaceObserverOnMap(this.userId);
		await this.initSence();
		await this.drawSence();
		this.resizeLayout();
	}

	async initSence() {
		this.scene.width  = this.scene.imageMap.get('map').image.img.width;
		this.scene.height = this.scene.imageMap.get('map').image.img.height;
		canvas.setAttribute( 'width', this.scene.width );
		canvas.setAttribute('height', this.scene.height);
	}

	resizeLayout() {
		let wWidth    = parseInt(window.innerWidth);
		let wHeight   = parseInt(window.innerHeight);
		let mapArea   = document.querySelector("#mapArea");
		let ctrlPanel = document.querySelector("#ctrlPanel");
		let cpHeight = 150; // parseInt(ctrlPanel.style.height);

		let maWidth  = wWidth - 30;
		let maHeight = wHeight - cpHeight - 30;
		mapArea.style.width  = maWidth  + "px";
		mapArea.style.height = maHeight + "px";
	}

	replaceObserverOnMap(userId) {
		let obtm = null;
		if (this.scene.teams) {
			let l1 = this.scene.teams.filter((e) => {return e.id == userId;});
			let l2 = this.scene.teams.filter((e) => {return e.id == 'spectator';});
			if (l1.length > 0) {
				obtm = l1[0];
			} else if (l2.length > 0) {
				obtm = l2[0];
			}
		}
		if (null == obtm) {
			let tkImg = {img: this.scene.imageMap.get('chrt').image.img,
				key: 'chrt', sx: 100, sy: 100, width: 20, height: 20};
			obtm = new Circle(this.ctx, 'spectator', 10, 10, 200, '#0000FF', tkImg, false, false);
		}
		this.observer = new Observer(this.ctx, userId, obtm.x, obtm.y, 
			this.scene.viewRange, obtm, "#FFFFFF", false, false);
	}

	async drawSence() {

		this.ctx.clearRect(0, 0, canvas.width, canvas.height);
		this.ctx.drawImage(this.scene.imageMap.get('map').image.img, 0, 0);
		this.ctx.fillStyle = this.scene.shadowColor;
		this.ctx.fillRect(0, 0, this.scene.width, this.scene.height);
		let darkMap = new Image();
		await loadImage(darkMap, canvas.toDataURL({
			format: 'image/png', quality: 1, 
			width: this.scene.width, height: this.scene.height})
		).catch((img, url) => { alert('加载图形失败：' + url); });
		darkMap.crossOrigin='Anonymous';

		this.ctx.clearRect(0, 0, canvas.width, canvas.height);
		this.ctx.drawImage(this.scene.imageMap.get('map').image.img, 0, 0);
		this.observer.draw();


		// 渲染队友
		this.observer.renderTokensOnSandboxInView(darkMap, this.scene.teams);
		// 渲染陈设物
		this.observer.renderTokensOnSandboxInView(darkMap, this.scene.furnishings);
		// 渲染敌人
		this.observer.renderTokensOnSandboxInView(darkMap, this.scene.creaters);
		// 渲染墙壁
		this.observer.renderTokensOnSandboxInView(darkMap, this.scene.walls);
		// 渲染门
		this.observer.renderTokensOnSandboxInView(darkMap, this.scene.doors);


		let brightMap = new Image();
		await loadImage(brightMap, canvas.toDataURL({
			format: 'image/png', quality: 1, 
			width: this.scene.width, height: this.scene.height})
		).catch((img, url) => { alert('加载图形失败：' + url); });
		brightMap.crossOrigin='Anonymous';

		// 视线范围
		this.ctx.drawImage(darkMap, 0, 0);
		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.arc(this.observer.x, this.observer.y, this.scene.viewRange, 0, Math.PI * 2);
		this.ctx.clip();
		this.ctx.drawImage(brightMap, 0, 0);
		this.ctx.restore();

		// let fc   = document.getElementById("finalCanvas");
		this.fc.setAttribute( 'width', this.scene.width );
		this.fc.setAttribute('height', this.scene.height);
		// let fctx = fc.getContext("2d");
		let viewMap = new Image();
		await loadImage(viewMap, canvas.toDataURL({
			format: 'image/png', quality: 1, 
			width: this.scene.width, height: this.scene.height})
		).catch((img, url) => { alert('加载图形失败：' + url); });
		this. fctx.drawImage(viewMap, 0, 0);
	}

}






