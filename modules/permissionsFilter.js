(function () {

	'use strict';
	
	module.exports = (function () {

		return {
			checkPermissions: checkPermissions
		};

		function checkPermissions(userService) {
		
			return checkMenuItemPermissions;

			function checkMenuItemPermissions (element) {
				if (element.children) {
					element.children = element.children.filter (checkMenuItemPermissions);
				}
				if (element.securableElementName) {
					var hasPermission = userService.hasPermission (element.securableElementName, element.privilegeName);
					delete element.securableElementName;
					delete element.privilegeName;
					return hasPermission;
				}
				return true;
			}
		}
	})();
})();
