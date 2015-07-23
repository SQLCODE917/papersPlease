(function () {

	'use strict';

	module.exports = (function () {
		return {
			merge: merge
		};

		//non-destructive merge of attrs between 2 objects
		function merge (object1,object2) {
			var mergedObject = {};
			for (var attribute1 in object1) { mergedObject[attribute1] = object1[attribute1]; }
			for (var attribute2 in object2) { mergedObject[attribute2] = object2[attribute2]; }
			return mergedObject;
		}

	})();
})();
