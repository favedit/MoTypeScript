import {Professional} from './app/Professional';
import {Base} from './app/Base';

declare var hsw: any;
declare var goog: any;
declare var hsw_dir: string;
declare var ResourceManager: any;
declare var toVersionedUrl: any;
declare var mixpanel: any;
declare var showcaseProduct: any;
declare var LiveHint: any;

class SkApp extends Professional {

}
function getHswApp(): SkApp {
    var app: Base = null;
    return <SkApp>app;
}

type Task = {
    getTaskDefinition: (app?: SkApp) => void;
    onTaskCompleted?: (res: any) => void;
    _loadFile?: (fileUrl, fileType) => void;
    _tasks?: Array<Task>
}

type TaskManager = {
	completed: Promise<void>;
	init: (app?: SkApp) => TaskManager;
	uninit: () => void;
	registerTask: (name: string, task: Task) => void;
	loadTask: (...taskName) => TaskManager;
	loadFile: (fileUrl: string, fileType: string) => Promise<void>;
	_app?: SkApp;
	_taskById?: Map<any, any>
}

export function initSkApp() {
    var queryConfig: any = function() {
        var config = {};
        location.search.replace("?", "").split("&").forEach(function(item) {
            item = <any>item.split("=");
            2 === item.length && (config[item[0]] = decodeURIComponent(item[1].replace(/\+/g, "%20")))
        });
        return config
    } ()
    //   , e = new PageLoading;
    // e.startLoading();
    var taskManager: TaskManager = {
        completed: Promise.resolve(),
        init: function(app: SkApp) {
            this._app = app;
            return this
        },
        uninit: function() {
            this._app = null;
            this._taskById.clear()
        },
        registerTask: function(name: string, task: Task) {
            this._taskById.set(name, task)
        },
        loadTask: function() {
            var itemNameList = Array.prototype.slice.call(arguments);
            this.completed = this.completed.then(function() {
                var result =
                    itemNameList.map(function(item) {
                        var task = this._taskById.get(item);
                        return task ? (item = task.getTaskDefinition(this._app)) ? item instanceof Promise ? item : this.loadFile(item.url, item.type).then(function(itemContent) {
                            return task.onTaskCompleted ? task.onTaskCompleted(itemContent) : itemContent
                        }) : Promise.resolve("task skipped") : Promise.resolve("no such loading task")
                    }, this);
                return Promise.all(result)
            }
                .bind(this));

            return this
        },
        loadFile: function(fileUrl: string, fileType: string) {
            var promise;
            switch(fileType) {
                case "css":
                    promise = {
                        rel: "stylesheet",
                        type: "text/css",
                        href: fileUrl
                    };
                    fileUrl.endsWith("less") && goog.object.extend(promise, {
                        rel: "stylesheet/less",
                        type: "text/less"
                    });
                    $("head").append($("<link/>", promise));
                    promise = Promise.resolve(fileUrl);
                    break;
                default:
                    promise = hsw.util.Request.getData(fileUrl, {
                        dataType: fileType
                    })
            }
            return promise
        },
        _app: null,
        _taskById: new Map
    };
    taskManager.registerTask("config", {
        getTaskDefinition: function() {
            return {
                url: hsw.util.Url.toTimestampedUrl(hsw_dir + "res/config/core.json"),
                type: "json"
            }
        },
        onTaskCompleted: function(config) {
            goog.object.extend(hsw.core.Config, config);
            "false" === queryConfig.cdn && (hsw.core.Config.USE_CDN = !1);
            goog.DEBUG && (hsw.core.Config.USE_CORS_PROXY = !0)
        }
    });
    taskManager.registerTask("partnerConfig", {
        getTaskDefinition: function(app) {
            var tenant = app.appParams.tenant;
            return tenant && "fp" !== tenant ? {
                url: hsw.util.Url.toTimestampedUrl("partner/" + app + "/config.json"),
                type: "json"
            } : void 0
        },
        onTaskCompleted: function(config) {
            goog.object.extend(hsw.core.PartnerConfig, config)
        }
    });
    taskManager.registerTask("resource", {
        getTaskDefinition: function(app) {
            return ResourceManager.init(app.appParams.locale, app.appParams.tenant)
        }
    });
    // c.registerTask("uiResource", {
    //     getTaskDefinition: function() {
    //         return goog.DEBUG ? void 0 : {
    //             url: toVersionedUrl("res/ui.xml"),
    //             type: "html"
    //         }
    //     },
    //     onTaskCompleted: function(a) {
    //         preLoader.xmlResource = a
    //     }
    // });
    taskManager.registerTask("partnerResource", {
        getTaskDefinition: function(app) {
            var tenant = app.appParams.tenant;
            return tenant && "fp" !== tenant ? {
                url: toVersionedUrl("partner/" + tenant + "/resource.json"),
                type: "json"
            } : void 0
        },
        onTaskCompleted: function(resource) {
            (goog.DEBUG ? resource.debug.js : resource.release.js).forEach(function(item) {
                this._loadFile(item, "script")
            }, this);
            (goog.DEBUG ? resource.debug.css : resource.release.css).forEach(function(item) {
                this._loadFile(item, "css")
            }, this);
            return Promise.all(this._tasks)
        },
        _loadFile: function(fileUrl, fileType) {
            this._tasks.push(taskManager.loadFile(toVersionedUrl(fileUrl), fileType))
        },
        _tasks: []
    });
    taskManager.registerTask("languageResource", {
        getTaskDefinition: function(app) {
            return {
                url: hsw_dir + "res/style/style_#locale.css".replace("#locale", app.appParams.locale),
                type: "css"
            }
        }
    });
    // loader.registerTask("lessBuilder", {
    //     getTaskDefinition: function() {
    //         return goog.DEBUG ? {
    //             url: "lib/less.js",
    //             type: "script"
    //         } : void 0
    //     }
    // });
    taskManager.registerTask("regionalization", {
        getTaskDefinition: function(app) {
            return hsw.core.PartnerConfig.CONFIG_REGION ? {
                url: toVersionedUrl("partner/" + app.appParams.tenant + "/config_region.json"),
                type: "json"
            } : this.onTaskCompleted()
        },
        onTaskCompleted: function(config) {
            hsw.app.Base.getApp().appParams.setRegion({
                region: queryConfig.region,
                locale: queryConfig.lang || queryConfig.locale || hsw.core.PartnerConfig.LOCALE
            }, config);
            return Promise.resolve()
        }
    });
	$(function() {
		var app: SkApp = hsw.app.Base.getApp();
		app.appParams.set(queryConfig);
		if(app.appParams.debug && "true" === queryConfig.log) {
			goog.debug.LOGGING_ENABLED = !0;
			hsw.core.Logger.enabled = !0;
			var debugWindow = (<any>window).debugWindow = new goog.debug.FancyWindow("main");
			debugWindow.setEnabled(!0);
			debugWindow.init()
		}
		taskManager.init(app)
			.loadTask("config", "partnerConfig")
			.loadTask("regionalization")
			.loadTask("resource")
			.loadTask("uiResource", "partnerResource", "languageResource")
			.completed
			.then(function() {
				taskManager.uninit();
				hsw.core.PartnerConfig.REMOVED_PLUGINS && hsw.core.PartnerConfig.REMOVED_PLUGINS.forEach(function(b) {
					app.unRegisterPlugin(b)
				});
				document.title = ResourceManager.getString("app_title");
				(<any>document.getElementsByName("description")[0]).content = ResourceManager.getString("app_description");
				//site.init();
				"undefined" !== typeof mixpanel && mixpanel.init(hsw.core.Config.MIXPANEL_TOKEN, {}, "homestyler_mixpanel");
				//messageDialog.init();
				//adskUser.init();
				//openDesign.UI.init();
				//saveDesign.init();
				//appSettingsUtil.init();
				//appSettings.Handler.init();
				//share.init();
				//UpdateDesign.UI.init();
				//video.init();
				//favorite.init();
				//e.stopLoading();
				app.appParams.svgCanvas && app.bindViewElement("svg", document.getElementById("editor2d"));
				app.appParams.webglCanvas && app.bindViewElement("webgl3d", document.getElementById("editor3d"));
				var seekid = app.appParams.seekid;
				seekid ? app.activeView("webgl3d") : app.activeView("svg");
				app.run();
				// hsMixpanel.tracker("App Launch", {
				//     "User ID": adskUser.sid,
				//     "AppLaunch Last Seen": getTheCurrentDateTime()
				// });
				seekid && showcaseProduct.run(seekid);
				app.appParams.mode === hsw.app.setting.ModeTypeEnum.iframe && LiveHint && (LiveHint._offsetTopShow = 47);
				$(window).on("resize", function(a) {
					// welcome.UI.updatePosition();
					// openDesign.UI.updatePosition();
					// UpdateDesign.UI.updatePosition();S
					hsw.plugin.projectsummary && hsw.plugin.projectsummary.UI.updatePosition();
					hsw.plugin.underlayimg && hsw.plugin.underlayimg.UI.updatePosition()
				})
			})
    });
    // $.extend({
    //     getURLParameter: function(a) {
    //         return decodeURIComponent(((new RegExp("[?|&]" + a + "=([^&;]+?)(&|#|;|$)")).exec(location.search) || [, ""])[1].replace(/\+/g, "%20")) || null
    //     }
    // })
}
