export class Flag {
   /**
	 * @param {?} dataAndEvents
	 * @param {?} deepDataAndEvents
	 * @return {?}
	 */
	public static isFlagOn(dataAndEvents, deepDataAndEvents) {
		return 0 !== (dataAndEvents & deepDataAndEvents);
	};

	/**
	 * @param {?} deepDataAndEvents
	 * @param {?} dataAndEvents
	 * @return {?}
	 */
	public static isFlagOff(deepDataAndEvents, dataAndEvents) {
		return 0 === (deepDataAndEvents & dataAndEvents);
	};

	/**
	 * @param {?} dataAndEvents
	 * @param {boolean} deepDataAndEvents
	 * @return {?}
	 */
	public static setFlagOn(dataAndEvents, deepDataAndEvents) {
		return dataAndEvents | deepDataAndEvents;
	};

	/**
	 * @param {?} deepDataAndEvents
	 * @param {boolean} dataAndEvents
	 * @return {?}
	 */
	public static setFlagOff(deepDataAndEvents, dataAndEvents) {
		return deepDataAndEvents & ~dataAndEvents;
	};
}
