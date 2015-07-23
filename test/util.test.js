(function () {
	'use strict';
	var assert = require('assert');
	var util = require ('../modules/util');

	describe('merge utility', function () {
		var testObject1, testObject2; 

		beforeEach(function () {
			testObject1 = {
				o1p1: "hello"
			};

			testObject2 = {
				o2p1: "world"
			};
		});

		it('should merge 2 objects', function () {
			var expected = {
				o1p1: "hello",
				o2p1: "world"
			};

			var actual = util.merge(testObject1, testObject2);
			assert.deepEqual(actual, expected, "Failed to merge");
		});

		it('should be non-destructive', function () {
			var expectedObject1 = {
				o1p1: "hello"
			};

			var expectedObject2 = {
				o2p1: "world"
			};

			util.merge(testObject1, testObject2);
			
			assert.deepEqual(testObject1, expectedObject1, "Object 1 got modified by the merge!");
			assert.deepEqual(testObject2, expectedObject2, "Object 2 got modified by the merge!");
		});
	});
})();
