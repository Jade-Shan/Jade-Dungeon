var net = net || {};
(function ($) {
	net.jadedungeon = function () { init(); return this; };
	var self = net.jadedungeon.prototype;
	var init = function (cfg) {
		self.ui = {};
		self.data = {};
		self.cfg = {ajaxTimeout: 5000};

		self.markdown = new showdown.Converter();

		self.data.nav = [ {title: "Journal", link: "/"},
			{title: "Gallery", link: "/gallery.html"},
			{title: "Note", link: "./study/notes/wiki_html"},
			{title: "About Me", subs: [
				{title: "Github", link: "//github.com/Jade-Shan/", isNewWin: true},
				{title: "", link: ""},
				{title: "Resume", link: "/resume.html"}]
		}];
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

	self.renderPicItem = function (itm) {
		var html = '<div class="col-sm-6 col-md-3"><div class="thumbnail">';
		html = html + '<img onClick="javascript:net.jadedungeon.viewPic(this)" id="' + itm.id + '" src="' + itm.url +'" alt="' + 
			itm.title +'"></div>';
		html = html + '<div class="caption"><h3>' + itm.title + '</h3><p>' + 
			itm.desc + '</p></div></div>';
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
		$("#photo-frame-img").attr("src", m.attr("src"));
		$("#photo-frame-img").attr("alt", m.attr("alt"));
		$('#photo-frame').modal('show');
	};

})(jQuery);
