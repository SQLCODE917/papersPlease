module.exports = function (options) {
	var userDetail = options.userDetail;

	return {
		hasPermission: hasPermission
	};

	function hasPermission(element, privilege) {
		var permissions = userDetail.permissions;
		if (!permissions) {
			return false;
		}

		for (var i = 0; i < permissions.length; i++) {
			var entry = permissions[i];
			if (entry.securableElement && entry.securableElement.securableElementName === element) {
				var privileges = entry.privileges || [];
				for (var j = 0; j < privileges.length; j++) {
					if (privileges[j] && privileges[j].privilegeName === privilege) {
						return true;
					}
				}
				return false; // securableElement found but privilege not found
			}
		}
		return false; // securableElement not found
	}
};
