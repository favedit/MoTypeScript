import {EventTarget} from '../core/EventTarget';
import {Floorplan} from '../model/Floorplan';
import {Manager as CmdManager} from '../cmd/Manager';
import {Manager as TransManager} from '../transaction/Manager';
import {Manager as SelectionManager} from '../selection/Manager';
import {Manager as PluginManager} from '../plugin/Manager';
import {AppSettings} from './setting/AppSettings';
import {AppParams} from './setting/AppParams';

import {Scene} from '../view/webgl3d/Scene';

export class Base extends EventTarget {
    floorplan = new Floorplan();
    cmdManager = CmdManager.instance();
    transManager = new TransManager();
    views: {
		webgl3d: {
			scene: Scene
		}
    };
    active_view = null;
    selectionManager = SelectionManager.instance();
    pluginManager = new PluginManager(this);
    appSettings = new AppSettings();
    appParams = new AppParams();

    threeDThumbnail: string;
    designName: string;
    designId: string;
    designMetaData;

    constructor() {
        super();
        this.resetDesignData()
    }

    listen(dom: HTMLDocument) {

    }

    resetDesignData() {
		this.threeDThumbnail = this.designName = this.designId = "";
		this.designMetaData = null;
    }

    cleanDocumment() {

    }

    newDocument() {

    }

    openDocument(a) {

    }

    _openDocument(a) {

    }

    saveDocument(a, b, c) {

    }



    registerView(a, b) {

    }

    getView(a) {

    }

    activeView(a) {

    }

    isActiveView() {

    }

    forEachView() {

    }

    run() {

    }

    registerPlugin(a) {

    }

    unRegisterPlugin(a) {

    }

    static _app;
    static getApp() {

		//
		// Base._app = Base._app || new Professional();
		// return Base._app;
    }


    bindViewElement(name, element) {

    }
}
