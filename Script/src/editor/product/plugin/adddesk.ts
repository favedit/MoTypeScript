declare var hsw:any;
declare var goog:any;
import {IPlugin} from '../../base/plugin/IPlugin';


 class DefaultCubeComponent extends THREE.Mesh{
    constructor(color?:number,size?:number){
      super();
      size = size || 1;
      color = color ||0x00ff00;
      this.geometry = new THREE.BoxGeometry( size, size, size );
      this.material = new THREE.MeshBasicMaterial( { color:color} );
    }
  }

  class Desk extends THREE.Mesh{
    constructor(){
      super();

    }
  }

(function(e) {
    function d() {
        var a = hsw.app.Base.getApp().pluginManager.getPlugin("hsw.plugin.hotkey.Plugin");
        return a && a.enabled()
    }

    hsw.app.Base.getApp().registerPlugin(e + ".Plugin");
    e = hsw.core.define(e);

    class Plugin extends IPlugin{
      constructor(){
        super({
            name: "Hotkey plugin",
            description: "define hotkeys for the app."
        });
        this.enable = true;
      }

      onActive(context) {
          this.context = context;
          var app = this.context.app;
          app.hotkey.registerHotkey("a",()=>{this.addDeskToScene()} );
      }


      addDeskToScene(){
        console.log(this.context.app.views.webgl3d.scene)
      }

    }

    e.Plugin = Plugin;


})("hsw.plugin.hotkey");
