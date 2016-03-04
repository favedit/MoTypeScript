var _nextId = 1;
export function Id(dataAndEvents) {
	dataAndEvents.ID = dataAndEvents.ID || String(_nextId++);
	return dataAndEvents.ID;
}

(Id as any).randomGUID = function() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(y) {
		/** @type {number} */
		var x = 16 * Math.random() | 0;
		return ("x" === y ? x : x & 3 | 8).toString(16);
	});
};
