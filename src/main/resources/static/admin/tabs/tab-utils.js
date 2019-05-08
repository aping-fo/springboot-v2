var nthTabsUtils;
$(function() {
	//初始化选项卡
	var nthTabs = $("#main-tabs").nthTabs({
						iframeAttr : ' width="100%" height="900" frameborder="0" marginheight="0" marginwidth="0" border="false" scrolling="no" '
					});
	//初始化tabsUtils
	nthTabsUtils = $("#main-tabs").nthTabsUtils({
		nthTabs : nthTabs
	});
	nthTabsUtils.initMainPage(window.rootPath + '/main');
	//绑定菜单的点击事件
	$(".menu-left-nest a").bind("click", function() {
		var url = $(this).attr("url");
		if (url && url != '#') {
			menuClick(this);
		}
	});
});

/**
 * 点击菜单发送添加选项卡
 * @param obj
 * @returns
 */
function menuClick(obj) {
	var jsonObj = $(obj);
	var id = jsonObj.attr("id");
	var title = jsonObj.attr("sname");
	var url = jsonObj.attr("url");
	if (url && url != '#') {
		nthTabsUtils.addMenuUrlTabs(id, title, url, true, true);
	}
}

/**
 * nth-tabs utils
 * author:cs
 * version:1.0
 */
(function($) {
	$.fn.nthTabsUtils = function(options) {
		var defaults = {
			nthTabs : null
		};
		var settings = $.extend({}, defaults, options);
		var nthTabs = settings.nthTabs;
		var tabsIdJsons = {};
		// 启用插件
		var run = function() {
			return methods;
		};
		// 方法列表
		var methods = {
			/**
			 * 初始化首页
			 * @param url
			 * @returns
			 */
			initMainPage : function(url) {
				methods.addMenuUrlTabs('main_page', '首页', url, true, false);
			},
			/**
			 * 获取tabs的ID
			 */
			getTabsId : function(id) {
				if (tabsIdJsons.hasOwnProperty(id)) {
					val = tabsIdJsons[id];
					if (val) {
						return val;
					} else {
						tabsIdJsons[id] = new Date().getTime();
					}
				} else {
					tabsIdJsons[id] = new Date().getTime();
				}
				return tabsIdJsons[id];
			},

			/**
			 * 添加选项卡
			 * @param id 
			 * @param title 标题
			 * @param content 内容
			 * @param active 是否激活选项卡 默认 false
			 * @param allowClose  是否允许关闭 默认 true
			 * @returns
			 */
			addMenuTabs : function(id, title, content, active, allowClose) {
				var tab_id = methods.getTabsId(id);
				nthTabs.addTab({
					id : "nth-tab-" + tab_id,
					title : title,
					content : content,
					active : active ? active : false,
					allowClose : typeof (allowClose) == undefined
							|| allowClose == null ? true : allowClose
				})
			},

			/**
			 * 添加选项卡
			 * @param id 
			 * @param title 标题
			 * @param content 内容
			 * @param active 是否激活选项卡 默认 false
			 * @param allowClose  是否允许关闭 默认 true
			 * @returns
			 */
			addMenuUrlTabs : function(id, title, url, active, allowClose) {
				var tab_id = methods.getTabsId(id);
				nthTabs.addTab({
					id : "nth-tab-" + tab_id,
					title : title,
					url : url,
					active : (active ? active : false),
					allowClose : (typeof (allowClose) == undefined
							|| allowClose == null ? true : allowClose),
					location : false,
					fadeIn : true
				});
			},
			/**
			 * 生成iFrame
			 * @param url
			 * @param id
			 * @returns
			 */
			appendIframeContent : function(url, id) {
				var content = '<iframe  width="100%" height="900" id="frame_'
						+ id
						+ '" name="mainFrame" src="'
						+ url
						+ '" frameborder="0" marginheight="0" marginwidth="0" border="false" scrolling="no"></iframe>';
				return content;
			}

		};
		return run();
	}
})(jQuery);