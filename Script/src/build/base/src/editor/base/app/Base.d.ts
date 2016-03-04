import { EventTarget } from '../core/EventTarget';
import { Floorplan } from '../model/Floorplan';
import { Manager as CmdManager } from '../cmd/Manager';
import { Manager as TransManager } from '../transaction/Manager';
import { Manager as SelectionManager } from '../selection/Manager';
import { Manager as PluginManager } from '../plugin/Manager';
import { AppSettings } from './setting/AppSettings';
import { AppParams } from './setting/AppParams';
import { Scene } from '../view/webgl3d/Scene';
export declare class Base extends EventTarget {
    floorplan: Floorplan;
    cmdManager: CmdManager;
    transManager: TransManager;
    views: {
        webgl3d: {
            scene: Scene;
        };
    };
    active_view: any;
    selectionManager: SelectionManager;
    pluginManager: PluginManager;
    appSettings: AppSettings;
    appParams: AppParams;
    threeDThumbnail: string;
    designName: string;
    designId: string;
    designMetaData: any;
    constructor();
    listen(dom: HTMLDocument): void;
    resetDesignData(): void;
    cleanDocumment(): void;
    newDocument(): void;
    openDocument(a: any): void;
    _openDocument(a: any): void;
    saveDocument(a: any, b: any, c: any): void;
    registerView(a: any, b: any): void;
    getView(a: any): void;
    activeView(a: any): void;
    isActiveView(): void;
    forEachView(): void;
    run(): void;
    registerPlugin(a: any): void;
    unRegisterPlugin(a: any): void;
    static _app: any;
    static getApp(): void;
    bindViewElement(name: any, element: any): void;
}
