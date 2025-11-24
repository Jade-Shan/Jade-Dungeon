/* jshint esversion: 6 */

let imgPlaceHolder = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAGQCAYAAAByNR6YAAAeXUlEQVR4Xu3dC4scxdcH4P7HEEKMRokRReL9FkRE/P7fQBER8RYTjYgSFdQYEW/vSw3MZrbSM909c05c9zwLEkhmTnU9dWR/VNf0/O/dd9/9v8EPAQIECBAgQIBAmMD/BKwwS4UIECBAgAABAisBAUsjECBAgAABAgSCBQSsYFDlCBAgQIAAAQIClh4gQIAAAQIECAQLCFjBoMoRIECAAAECBAQsPUCAAAECBAgQCBYQsIJBlSNAgAABAgQICFh6gAABAgQIECAQLCBgBYMqR4AAAQIECBAQsPQAAQIECBAgQCBYQMAKBlWOAAECBAgQICBg6QECBAgQIECAQLCAgBUMqhwBAgQIECBAQMDSAwQIECBAgACBYAEBKxhUOQIECBAgQICAgKUHCBAgQIAAAQLBAgJWMKhyBAgQIECAAAEBSw8QIECAAAECBIIFBKxgUOUIECBAgAABAgKWHiBAgAABAgQIBAsIWMGgyhEgQIAAAQIEBCw9QIAAAQIECBAIFhCwgkGVI0CAAAECBAgIWHqAAAECBAgQIBAsIGAFgypHgAABAgQIEBCw9AABAgQIECBAIFhAwAoGVY4AAQIECBAgIGDpAQIECBAgQIBAsICAFQyqHAECBAgQIEBAwNIDBAgQIECAAIFgAQErGFQ5AgQIECBAgICApQcIECBAgAABAsECAlYwqHIECBAgQIAAAQFLDxAgQIAAAQIEggUErGBQ5QgQIECAAAECApYeIECAAAECBAgECwhYwaDKESBAgAABAgQELD1AgAABAgQIEAgWELCCQZUjQIAAAQIECAhYeoAAAQIECBAgECwgYAWDKkeAAAECBAgQELD0AAECBAgQIEAgWEDACgZVjgABAgQIECAgYOkBAgQIECBAgECwgIAVDKocAQIECBAgQEDA0gMECBAgQIAAgWABASsYVDkCBAgQIECAgIClBwgQIECAAAECwQICVjCocgQIECBAgAABAUsPECBAgAABAgSCBQSsYFDlCBAgQIAAAQIClh4gQIAAAQIECAQLCFjBoMoRIECAAAECBAQsPUCAAAECBAgQCBYQsIJBlSNAgAABAgQICFh6gAABAgQIECAQLCBgBYMqR4AAAQIECBAQsPQAAQIECBAgQCBYQMAKBlWOAAECBAgQICBg6QECBAgQIECAQLCAgBUMqhwBAgQIECBAQMDSAwQIECBAgACBYAEBKxhUOQIECBAgQICAgKUHCBAgQIAAAQLBAgJWMKhyBAgQIECAAAEBSw8QIECAAAECBIIFBKxgUOUIECBAgAABAgKWHiBAgAABAgQIBAsIWMGgyhEgQIAAAQIEBCw9QIAAAQIECBAIFhCwgkGVI0CAAAECBAgIWHqAAAECBAgQIBAsIGAFgypHgAABAgQIEBCw9AABAgQIECBAIFhAwAoGVY4AAQIECBAgIGDpAQIECBAgQIBAsICAFQyqHAECBAgQIEBAwNIDBAgQIECAAIFgAQErGFQ5AgQIECBAgICApQcIECBAgAABAsECAlYwqHIECBAgQIAAAQFLDxAgQIAAAQIEggUErGBQ5QgQIECAAAECApYeIECAAAECBAgECwhYwaDKESBAgAABAgQELD1AgAABAgQIEAgWELCCQZUjQIAAAQIECAhYeoAAAQIECBAgECwgYAWDKkeAAAECBAgQELD0AAECBAgQIEAgWEDACgZVjgABAgQIECAgYOkBAgQIECBAgECwgIAVDKocAQIECBAgQEDA0gMECBAgQIAAgWABASsYVDkCBAgQIECAgIClBwgQIECAAAECwQICVjCocgQIECBAgAABAUsPECBAgAABAgSCBQSsYFDlCBAgQIAAAQIClh4gQIAAAQIECAQLCFjBoMoRIECAAAECBAQsPUCAAAECBAgQCBYQsIJBlSNAgAABAgQICFh6gAABAgQIECAQLCBgBYMqR4AAAQIECBAQsPQAAQIECBAgQCBYQMAKBlWOAAECBAgQICBg6QECBAgQIECAQLCAgBUMqhwBAgQIECBAQMDSAwQIECBAgACBYAEBKxhUOQIECBAgQICAgKUHCBAgQIAAAQLBAgJWMKhyBAgQIECAAAEBSw8QIECAAAECBIIFBKxgUOUIECBAgAABAgKWHiBAgAABAgQIBAsIWMGgyhEgQIAAAQIEBCw9QIAAAQIECBAIFhCwgkGVI0CAAAECBAgIWHqAAAECBAgQIBAsIGAFgypHgAABAgQIEBCw9AABAgQIECBAIFhAwAoGVY4AAQIECBAgIGDpAQIECBAgQIBAsICAFQyqHAECBAgQIEBAwNIDBAgQIECAAIFgAQErGFQ5AgQIECBAgICApQcIECBAgAABAsECAlYwqHIECBAgQIAAAQFLDxAgQIAAAQIEggUErGBQ5QgQIECAAAECApYeIECAAAECBAgECwhYwaDKESBAgAABAgQELD1AgAABAgQIEAgWELCCQZUjQIAAAQIECAhYeoAAAQIECBAgECwgYAWDKkeAAAECBAgQELD0AAECBAgQIEAgWEDACgZVjgABAgQIECAgYOkBAgQIECBAgECwgIAVDKocAQIECBAgQEDA0gMECBAgQIAAgWABASsYVDkCBAgQIECAgIClBwgQIECAAAECwQICVjCocgQIECBAgAABAUsPECBAgAABAgSCBQSsYFDlCBAgQIAAAQIClh4gQIAAAQIECAQLCFjBoMoRIECAAAECBAQsPUCAAAECBAgQCBYQsIJBlSNAgAABAgQICFh6gAABAgQIECAQLCBgBYMqR4AAAQIECBAQsPQAAQIECBAgQCBYQMAKBlWOAAECBAgQICBg6QECBAgQIECAQLCAgBUMqhwBAgQIECBAQMDSAwQIECBAgACBYAEBKxhUOQIECBAgQICAgKUHCBAgQIAAAQLBAgJWMKhyBAgQIECAAAEBSw8QIECAAAECBIIFBKxgUOUIECBAgAABAgKWHiBAgAABAgQIBAsIWMGgyhEgQIAAAQIEBCw9QIAAAQIECBAIFhCwgkGVI0CAAAECBAgIWHqAAAECBAgQIBAsIGAFgypHgAABAgQIEBCw9AABAgQIECBAIFhAwAoGVY4AAQIECBAgIGDpAQIECBAgQIBAsICAFQyqHAECBAgQIEBAwNIDBAgQIECAAIFgAQErGFQ5AgQIECBAgICApQcIECBAgAABAsECAlYwqHIECBAgQIAAAQFLDxAgQIAAAQIEggUErGBQ5QgQIECAAAECApYeIECAAAECBAgECwhYwaDKERgTeOqpp4ZLly4N586dW/23+fP7778Pf/311/Drr78O33zzzWzAZ599dnj44YdX9c6ePbt63z///DP88ccfw927d4fvv/9+9ec+P4899thw5cqVVe3z588flWi1238///zz8N133+1T+tS8pxm99NJLx+bT1m+pS7Z1Zp+cmsU0EQIJAgJWAqqSBNYCLVitg8qUSgtaH3300dTLhieeeGJ45plnjkLVtje0sHX79u1Foa3VeuWVV4ZHH3108jp+++234datW3uHuMkBTvgLXnvt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";

var net = net || {};
(function ($) {
	net.jadedungeon = function () { init(); return this; };
	var self = net.jadedungeon.prototype;
	var init = function (cfg) {
		self.ui = {};
		self.data = {};
		self.cfg = {ajaxTimeout: 5000};

		self.markdown = new showdown.Converter();

		self.data.nav = [
			{title: "Journal", link: "/"},
			{title: "Gallery", link: "/gallery.html"},
			{title: "Note", link: "//47.102.120.187/study/notes/wiki_html"},
			{title: "About Me", subs: [
				// {title: "Github", link: "//github.com/Jade-Shan/", isNewWin: true},
				{title: "", link: ""},
				{title: "Resume", link: "/resume.html"}]},
			{title: "Themes", subs: [
				{title: "hobbit", id: "switch-theme-hobbit", link: "#"},
				{title: "lo-fi",  id: "switch-theme-lo-fi", link: "#"},
				{title: "paper",  id: "switch-theme-paper-print", link: "#"}]}
		];
	};

	self.renderThemeSwitcher = () => {
		$("#switch-theme-hobbit").on("click", (t) => {
			net.jadedungeon.changeTheme('hobbit');
		});
		$("#switch-theme-lo-fi").on("click", (t) => {
			net.jadedungeon.changeTheme('lo-fi');
		});
		$("#switch-theme-paper-print").on("click", (t) => {
			net.jadedungeon.changeTheme('paper-print');
		});
	};

	self.renderTopNav = function (page) {
		var addLink = function (item, page) {
			if (item.title === "") {
				navhtml = navhtml + '<li class="divider"></li>';
			} else {
				if (page && page.pageTitle === item.title) {
					navhtml = navhtml + '<li class="active">';
				} else { navhtml = navhtml + '<li>'; }
				navhtml = navhtml + '<a ' ;
				if (item.isNewWin) { navhtml = navhtml + ' target="_blank" '; } 
				if (item.id) { navhtml = navhtml + ' id="' + item.id + '" '; } 
				navhtml = navhtml + ' href="' + item.link + '">' + item.title + '</a></li>';
			}
		};

		var addSub = function (item) {
			navhtml = navhtml + '<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">';
			navhtml = navhtml + item.title;
			navhtml = navhtml + '<b class="caret"></b></a><ul class="dropdown-menu">';
			$.each(item.subs, function (i, item) { addLink(item, false); });
			navhtml = navhtml + '</ul></li>';
		};

		var navhtml = '<div class="navbar-header"> <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#example-navbar-collapse"> <span class="sr-only">切换导航</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="/">Jade Dungeon</a> </div> <div class="collapse navbar-collapse" id="example-navbar-collapse"> <ul class="nav navbar-nav">';
		$.each(self.data.nav, function (i, item) {
				if (item.link) { addLink(item, page); }
				else if (item.subs) { addSub(item); }
		});
		navhtml = navhtml + '</ul></div>';
		$("#topnav").html(navhtml);
	};

	self.renderSubTitle = function (page) { $("#subTitle").html(page.subTitle); };

	self.renderPagination = function (page, count, callbackName) {
		var i = 1;
		var html = '<ul class="pagination center">';
		if (page === 1) {
			html = html + '<li><a class="disable" href="javascript:void(0);">&laquo;</a></li>';
		} else {
			html = html + '<li><a href="javascript:' + callbackName + 
				'(' + i + ');">&laquo;</a></li>';
		}
		while (page > i) {
			html = html + '<li><a href="javascript:' + callbackName + 
				'(' + i + ');">' + i + '</a></li>';
			i = i + 1;
		}
		html = html + '<li class="active"><a href="javascript:void(0);">' + page + 
			'</a></li>';
		i = page + 1;
		while (i <= count) {
			html = html + '<li><a href="javascript:' + callbackName + 
				'(' + i + ');">' + i + '</a></li>';
			i = i + 1;
		}
		if (page === count) {
			html = html + '<li><a class="disable" href="javascript:void(0);">&raquo;</a></li>';
		} else {
			html = html + '<li><a href="javascript:' + callbackName + 
				'(' + count + ');">&raquo;</a></li>';
		}
		html = html + '</ul>';
		return html;
	};

	self.renderPhotoFrame = function () {
		var html = '<div class="modal-dialog"><div class="modal-content">';
		html = html + '<div class="modal-header">';
		html = html + '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
		html = html + '<h4 class="modal-title" id="photo-frame-label"></h4></div>';
		html = html + '<div class="modal-body row">';
		html = html + '<img id="photo-frame-img" alt="" src="" class="col-xs-12 col-sm-12 col-md-12 col-lg-12" >';
		html = html + '</div></div>';
		$("#photo-frame").html(html);
	};

	self.initUITheme = function () {
		let currUITheme = jadeUtils.web.cookieOperator("ui.theme");
		if (currUITheme) {
			self.changeTheme(currUITheme);
		}
	};

	self.renderPicItem = function (itm) {
		var html = '<div class="col-sm-6 col-md-3"><div class="thumbnail">';
		html = html + '<img onClick="javascript:net.jadedungeon.viewPic(this)" id="' + itm.id + 
			'" src="' + imgPlaceHolder + '" data-src="' + itm.url + '" alt="' + itm.title +'"></div>';
		html = html + '<div class="caption">' + /* '<h3>' + itm.title + '</h3>' + */ '<p>' + itm.desc + '</p></div></div>';
		return html;
	};

	self.renderArticle = function (itm) {
		var html = '<div class="item">';
		html = html + '<div class="title">' + itm.title + '</div>';
		var t = (new Date());
		t.setTime(itm.time);
		html = html + 
			'<div class="metadata metadata-time">' + t.toLocaleString() + 
			'</div><div class="metadata metadata-auth"> by ' + itm.auth + '</div>';
		html = html + '<div class="body">' + 
			net.jadedungeon.markdown.makeHtml(itm.text) + '</div>';
		html = html + '</div>';
		if (itm.ablum && itm.ablum.length > 0) {
			html = html + '<div class="row">';
			$.each(itm.ablum, function (i, pic) {
				html = html + self.renderPicItem(pic);
			});
			html = html + '</div>';
		}
		html = html + '<div class="divider"><span></span></div>';
		return html;
	};

	self.viewPic = function (img) {
		var m = $(img);
		$("#photo-frame-label").html(m.attr("alt"));
		$("#photo-frame-img").attr("src", m.attr("data-src"));
		$("#photo-frame-img").attr("alt", m.attr("alt"));
		$('#photo-frame').modal('show');
	};

	self.changeTheme = function (themeName) {
		var styles = document.querySelectorAll('link[title]');
		for (let i=0; i<styles.length; i++) {
			var lnk = styles[i];
			lnk.disabled = true;
		}
		for (let i=0; i<styles.length; i++) {
			let lnk = styles[i];
			let ttitle = lnk.title;
			if (ttitle == themeName) { 
				jadeUtils.web.cookieOperator("ui.theme", themeName, {SameSite:'Lax', expires: 90 });
				lnk.disabled = false; 
			}
		}
	};

	self.loadUserById = function (apiRoot, userId) {
		$.ajax({ 
			url: encodeURI(apiRoot + "blog/loadUserById?userId=" + userId), 
			xhrFields: {'Access-Control-Allow-Origin':'*'}, 
			type: 'GET', dataType: 'json', data: { },
			timeout: net.jadedungeon.ajaxTimeout,
			success: function(data, status, xhr) {
				if ('success' == data.status) {
					var user = data.user;
					$('#widget-username').html(user.userName);
					$('#widget-avatar').attr('alt', user.userName);
					$('#widget-avatar').attr('src', user.avatar);
					$('#widget-user-desc').html(user.desc);
					$('#widget-user-joined').html(user.joinTime);
					$('#widget-user-group').html(user.group);
					$('#widget-avatar-lnk').attr('href', user.homePageUrl);
				} else {
					console.error("加载用户信息失败");
				}
			},
			error: function(xhr, errorType, error) {
				console.error("加载用户信息失败");
				console.debug(xhr);
				console.debug(errorType);
				console.debug(error);
			},
			complete: function(xhr, status) { }
		});
	};

	self.loadRecommadArticles = function (apiRoot) {
		$.ajax({ 
			url: encodeURI(apiRoot + "blog/loadRecommandArticles"), 
			xhrFields: {'Access-Control-Allow-Origin':'*'}, 
			type: 'GET', dataType: 'json', data: { },
			timeout: net.jadedungeon.ajaxTimeout,
			success: function(data, status, xhr) {
				if ('success' == data.status) {
					self.renderRecommandArticles(data);
				} else {
					console.error("加载推荐文章失败");
				}
			},
			error: function(xhr, errorType, error) {
				console.error("加载推荐文章失败");
				console.debug(xhr);
				console.debug(errorType);
				console.debug(error);
			},
			complete: function(xhr, status) { }
		});
	};

	self.renderRecommandArticles = function (data) {
		var html = '';
		$.each(data.recommands, function (i, rec) {
			html = html + '<li><div class="img-text-itm"><div class="item-thumbnail">' +
					'<a href="' + rec.link + '" target="_blank">' + 
					'<img class="img-hov" alt="" src="' + rec.thumbnail + '" border="0">' +
					'</a></div>' +
					'<div class="item-title"><a href="' + rec.link + '">' + rec.title + 
					'</a></div></div><div style="clear: both;"></div></li>';
		});
		$("#widget-recommends-articles").html(html);
	};

})(jQuery);
