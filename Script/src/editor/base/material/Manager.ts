export class Manager {
   protected _materialProcess = null;
	protected _materialBondPathProcess = null;
	protected _materialIsRectangle = null;
	protected _materialNeedToChangeDataURL = null;

	protected static _instance;

   /**
	 * @return {?}
	 */
	public static instance() {
		this._instance = this._instance || new Manager();
		return this._instance;
	};

	/**
	 * @return {undefined}
	 */
	public constructor() {
		this._materialProcess = {};
		this._materialBondPathProcess = {};
		this._materialIsRectangle = {};
		this._materialNeedToChangeDataURL = {};
	}

	/**
	 * @param {?} task
	 * @return {?}
	 */
	public getImageFromMaterialData(task) {
		if("" !== task.textureURI) {
			return new Promise(function(worker, dataAndEvents) {
				worker(task.textureURI);
			});
		}
		var unlock;
		for(unlock in this._materialProcess) {
			if(this._materialProcess[unlock].checkMaterial(task)) {
				return this._materialProcess[unlock].generateImage(task);
			}
		}
		return new Promise(function($sanitize, dataAndEvents) {
			$sanitize(null);
		});
	};

	/**
	 * @param {?} aPoints
	 * @return {?}
	 */
	public getBoundaryFromMaterialData(aPoints) {
		var i;
		for(i in this._materialBondPathProcess) {
			if(this._materialBondPathProcess[i].checkMaterial(aPoints)) {
				return this._materialBondPathProcess[i].getBoundary(aPoints);
			}
		}
		return null;
	};

	/**
	 * @param {?} deepDataAndEvents
	 * @return {?}
	 */
	public getIsRectangleFromMaterialData(deepDataAndEvents) {
		var unlock;
		for(unlock in this._materialIsRectangle) {
			if(this._materialIsRectangle[unlock].checkMaterial(deepDataAndEvents)) {
				return this._materialIsRectangle[unlock].isRectangle(deepDataAndEvents);
			}
		}
		return true;
	};

	/**
	 * @param {?} deepDataAndEvents
	 * @return {?}
	 */
	public isMaterialNeedToChangeDataURL(deepDataAndEvents) {
		var unlock;
		for(unlock in this._materialNeedToChangeDataURL) {
			if(this._materialNeedToChangeDataURL[unlock].checkMaterial(deepDataAndEvents)) {
				return true;
			}
		}
		return false;
	};

	/**
	 * @param {?} timeoutKey
	 * @param {?} cmd
	 * @return {undefined}
	 */
	public registerMaterialDataProcess(timeoutKey, cmd) {
		this._materialProcess[timeoutKey] = this._materialProcess[timeoutKey] || {};
		this._materialProcess[timeoutKey].checkMaterial = cmd.check;
		this._materialProcess[timeoutKey].generateImage = cmd.do;
	};

	/**
	 * @param {?} i
	 * @param {?} cmd
	 * @return {undefined}
	 */
	public registerMaterialBoundaryProcess(i, cmd) {
		this._materialBondPathProcess[i] = this._materialBondPathProcess[i] || {};
		this._materialBondPathProcess[i].checkMaterial = cmd.check;
		this._materialBondPathProcess[i].getBoundary = cmd.do;
	};

	/**
	 * @param {?} timeoutKey
	 * @param {?} cmd
	 * @return {undefined}
	 */
	public registerMaterialIsRectangleProcess(timeoutKey, cmd) {
		this._materialIsRectangle[timeoutKey] = this._materialIsRectangle[timeoutKey] || {};
		this._materialIsRectangle[timeoutKey].checkMaterial = cmd.check;
		this._materialIsRectangle[timeoutKey].isRectangle = cmd.do;
	};

	/**
	 * @param {?} timeoutKey
	 * @param {?} engineTools
	 * @return {undefined}
	 */
	public registerMaterialNeedToChangeDataURL(timeoutKey, engineTools) {
		this._materialNeedToChangeDataURL[timeoutKey] = this._materialNeedToChangeDataURL[timeoutKey] || {};
		this._materialNeedToChangeDataURL[timeoutKey].checkMaterial = engineTools.check;
	};
}
