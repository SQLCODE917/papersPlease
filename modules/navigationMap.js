exports.nameMenuMap = function () {
	var navigationMap = {
		userPreferences: {
			label: 'Navigation.User_Preferences',
			target: '_self',
			referenceType: 'LEGACY',
			reference: '#applicationScreenId=userPreferences.home.home'
		},
		logout: {
			label: 'Navigation.logout',
			referenceType: 'FUNCTION',
			reference: '{\"logout\":[]}'
		}
	};
	return navigationMap;
};

exports.homeMenuMap = function () {
	var navigationMap = {
		body: {
			label: 'Navigation.body',
			reference: 'https://www.google.com'
		},
		mind: {
			label: 'Navigation.mind',
			reference: 'https://www.google.com',
			securableElementName: 'AWARENESS',
			privilegeName: 'execute'
		},
		spirit: {
			label: 'Navigation.spirit',
			reference: 'https://www.google.com',
			securableElementName: 'NOTHINGNESS',
			privilegeName: 'execute'
		},
		utilityBills: {
			label: 'Navigation.utilityBills',
			reference: 'https://www.google.com/',
			securableElementName: 'UTILITY_BILL_MANAGEMENT',
			privilegeName: 'execute'
		}
	};
	return navigationMap;
};
