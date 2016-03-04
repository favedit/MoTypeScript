import * as Url from "../../../util/Url";
import {OBJLoader} from "../../../ext/threejs/OBJLoader";
import {BinaryOBJLoader} from "../../../ext/threejs/BinaryOBJLoader";
import {ILoader} from '../ILoader';
export class ModelLoader extends ILoader {
	// private _binaryLoader = new BinaryOBJLoader;
	// private _objLoader = new OBJLoader;
	// public load(a, b) {
	// 	b = b || {};
	// 	var c = b.key, d = b.onProgress, e;
	// 	e = this._isBinaryModel(a) ? this._binaryLoader : this._objLoader;
	// 	this._isEncrypted(a) || (c = void 0);
	// 	Url.isCrossOriginUrl(a) ? e.setCrossOrigin("anonymous") : e.setCrossOrigin(null);
	// 	return (new Promise(function(b, g) {
	// 		e.load(a, b, d, g, c)
	// 	}
	// 	)).then(function(a) {
	// 		a.children.forEach(function(a) {
	// 			hsw.util.Object.makeRefCounted(a.geometry).xAddRef()
	// 		});
	// 		return a
	// 	})
	// }
	// private _isBinaryModel(a) {
	// 	return "bobj" === Url.getExtension(a)
	// }
	// private _isEncrypted(a) {
	// 	return a.includes("-fc.gz") || a.includes("-fc.obj")
	// }
}
