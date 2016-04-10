import {RuntimeUtil} from './runtime/common/RuntimeUtil';
import {FileViewer} from './runtime/common/io/FileViewer';
import {JsonConnection} from './runtime/common/net/JsonConnection';
import {HttpConnection} from './runtime/common/net/HttpConnection';
import {ServiceUtil} from './runtime/core/ServiceUtil';
import {EnvironmentService} from '../../runtime/core/service/EnvironmentService';
import {DeviceService} from '../../runtime/ui/service/DeviceService';
import {ForwardPipeline} from '../../plugin/cl3d/technique/pipeline/ForwardPipeline';
import {FSimpleScene} from '../../plugin/cl3d/framework/FSimpleScene';
import {SceneService} from '../../plugin/cl3d/shape/SceneService';
import {FCanvas} from '../../plugin/cl3d/framework/FCanvas';

// 初始化空间
import * as mo from '../../index';
RuntimeUtil.namespace(mo, 'mo');
(window as any).mo = (window as any).mo || mo;

//............................................................
export class Tester {

   public canvas: FCanvas;
   public context;
   public scene;

   public constructor() {
   }

   public setup(hWindow) {
      // 设置环境
      var deviceService = ServiceUtil.find(DeviceService);
      deviceService.setup(hWindow);
   }

   public setEnvironment(name: string, value: string) {
      // 设置环境
      var environmentConsole = ServiceUtil.find(EnvironmentService);
      environmentConsole.registerValue(name, value);
   }

   public send(url:string, data:any) {
      var connection = new JsonConnection();
      connection.send(url, data);
      return connection;
   }

   public onFileLoad(sender, event) {
      debugger
      var url = sender.attributes[0];
      url += '?do=process&type=resource.bitmap&name=' + event.fileName + "&mime=jpeg&size=" + event.dataLength;
      var connection = new HttpConnection();
      connection.send(url, event.data);
   }

   public sendFile(url:string, data:any) {
      var file = new FileViewer();
      file.loadListeners.register(this, this.onFileLoad, url);
      file.loadFile(data);
   }
}
