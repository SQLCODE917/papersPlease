var express = require('express'),
	bodyParser = require('body-parser'),
	isvalid = require('isvalid'),
	mobileNavigationTemplateService = require('./modules/mobileNavigationTemplateService'),
	navigationTemplateService = require('./modules/navigationTemplateService');

var app = express(),
	validate = isvalid.validate;

app.use(bodyParser.json());

app.post('/v1/permissioned', 
		validate.body ({
			type: Object,
			unknownKeys: 'allow',
			schema: {
				'permissions': { 
					type: Array, 
					default: [],
					schema: {
						'securableElement': { 
							type: Object, 
							unknownKeys: 'allow',
							schema: {
								'securableElementName': {
									type: String,
									required: true	
								}
							}	
						},
						'privileges': { 
							type: Object,
							unknownKeys: 'allow',
							schema: {
								'privilegeName': {
									type: String,
									required: true
								}
							}
						}
					}
				}
			}
		}), 
		function (request, response) {
			var userDetail = request.body;
			var userService = require('./modules/userService')({userDetail: userDetail});
			var mobileNavigationBuildingService = require('./modules/navigationBuildingService')({
				templateService: mobileNavigationTemplateService,
				userService: userService
			});
			var navigationBuildingService = require('./modules/navigationBuildingService')({
				templateService: navigationTemplateService,
				userService: userService
			});

			var mobileHomeMenu = mobileNavigationBuildingService.buildHomeMenu();
			var mobileNameMenu = mobileNavigationBuildingService.buildNameMenu();
			var homeMenu = navigationBuildingService.buildHomeMenu();
			var nameMenu = navigationBuildingService.buildNameMenu();
			var result = {
				mobile: {
					homeMenu: mobileHomeMenu,
					nameMenu: mobileNameMenu
				},
				desktop: {
					homeMenu: homeMenu,
					nameMenu: nameMenu
				}
			};

			response.setHeader('Content-Type', 'application/json');
			response.send(JSON.stringify(result));
		});

app.listen(3000);
