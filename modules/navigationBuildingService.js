module.exports = function (options) {
	var templateService = options.templateService;
	var userService = options.userService;
	var navigationMap = require('./navigationMap');
	var util = require('./util');
	var checkMenuItemPermissions = require('./permissionsFilter');

	return {
		buildHomeMenu: buildHomeMenu,
		buildNameMenu: buildNameMenu
	};

	function buildHomeMenu() {
		var HOME_MENU_TEMPLATE = templateService.homeMenuTemplate();
		var HOME_NAV_MAP = navigationMap.homeMenuMap();
		return buildMenu(HOME_MENU_TEMPLATE, HOME_NAV_MAP);
	}

	function buildNameMenu() {
		var NAME_MENU_TEMPLATE = templateService.nameMenuTemplate();
		var NAME_NAV_MAP = navigationMap.nameMenuMap();
		return buildMenu(NAME_MENU_TEMPLATE, NAME_NAV_MAP);
	}

	function buildMenu (menuTemplate, menuItems) {
		var allPossibleMenuItems = menuTemplate.map (resolveItemID);
		var authorizedMenuItems = allPossibleMenuItems.filter (checkMenuItemPermissions);
		return authorizedMenuItems;
	

		//resolve the itemIDs for actual item objects
		//destroy the itemIDs when done
		function resolveItemID (element) {
			var resolvedElement = element;
			if (element.itemID) {
				var item = menuItems[element.itemID];
				resolvedElement = util.merge (element, item);
				delete resolvedElement.itemID;
			}

			if (resolvedElement.children) {
				resolvedElement.children = resolvedElement.children.map (resolveItemID);
			}

			return resolvedElement;
		}
	}
};

