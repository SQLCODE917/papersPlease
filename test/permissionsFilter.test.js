(function () {
	'use strict';

	var assert = require('assert');
	var filter = require('../modules/permissionsFilter');

	describe ('permissions filter', function () {
		var testElement;

		beforeEach(function () {
		 testElement = {
		 	securableElementName: 'test_securable_element',
			privilegeName: 'test_privilege'
		 };
		});

		it ('should return true if the user has the right permission and securable element name', function () {
		
			var testUserService = {
				hasPermission: hasPermission
			};

			var actualPermission = filter.checkPermissions(testUserService)(testElement);
			assert(actualPermission, 'test element had the right securable element, but was not permitted!');
			
			function hasPermission (securableElementName, privilegeName) {
				switch (securableElementName) {
					case 'test_securable_element':
						return true;
					default:
						return false;
				}
			}
		});

		it ('should return false if the user does not have the right permission and securable element name', function () {
			var testUserService = {
				hasPermission: hasPermission
			};

			var actualPermission = filter.checkPermissions(testUserService)(testElement);
			assert.equal(actualPermission, false, 'test element does not have the right securable element, but was permitted!');
			
			function hasPermission () {
				return false;
			}
		});

		it ('should return true if the element does not have a securable element', function () {
			var testUserService = {
				hasPermission: hasPermission
			};

			filter.checkPermissions(testUserService)(testElement);
			assert.deepEqual(testElement, {}, 'securable element name and privilege should have been deleted!');

			var actualPermission = filter.checkPermissions(testUserService)(testElement);
			assert(actualPermission, 'test element is free, but was not permitted!');

			function hasPermission () {
				return false;
			}
		});

		it ('should delete the permissions and privileges', function () {
			var testUserService = {
				hasPermission: hasPermission
			};

			
			function hasPermission(securableElementName, privilegeName) {
				return true;
			}
		});

		it ('should filter out unprivileged children', function () {
			var testUserService = {
				hasPermission: hasPermission
			};
	
			var testNestedElement = {
				children: [
					{
						label: 'child1',
		   				securableElementName: 'we_like_child1',
		   				privilageName: 'execute'
					},
	   				{
						label: 'child2'
					},
					{
						label: 'child3',
		   				securableElementName: 'we_like_child3',
		   				privilegeName: 'execute'
					}
				]
			};

			var actualPermission = filter.checkPermissions(testUserService)(testNestedElement);
			assert(actualPermission, 'test element is free, but was not permitted!');
			
			var goodChildren = testNestedElement.children.length;
			assert.equal(goodChildren, 2, '2 children should have been permitted!');

			var expectedChildren = [
				{
					label: 'child2'
				},
				{
					label: 'child3'
				}
			];

			assert.deepEqual(testNestedElement.children, expectedChildren, 'The wrong children were permitted!');

			function hasPermission(securableElementName, privilegeName) {
				switch (securableElementName) {
					case 'we_like_child3':
						return true;
					default:
						return false;
				}
			}

		});
	});
})();
