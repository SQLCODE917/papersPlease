exports.nameMenuTemplate = function () {
	var menuTemplate = [
		{
			itemID: 'userPreferences',
			type: 'ITEM'
		},
		{
			itemID: 'logout',
			type: 'ITEM'
		}
	];
	return menuTemplate;	
};

exports.homeMenuTemplate = function () {
	var menuTemplate = [
		{
			label: 'Navigation.howYouLive',
			type: 'SECTION',
			children: [
				{
					itemID: 'body',
					type: 'ITEM'
				},
				{
					itemID: 'mind',
					type: 'ITEM'
				},
				{
					itemID: 'spirit',
					type: 'ITEM'
				}
			]
		},
		{
			label: 'Navigation.whatYouLiveFor',
			type: 'SECTION',
			children: [
				{
					itemID: 'utilityBills',
					type: 'ITEM'
				}	
			]
		}
	];
	return menuTemplate;
};
