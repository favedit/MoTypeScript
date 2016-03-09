import {FDictionary} from '../../runtime/common/lang/FDictionary';
import {RObject} from '../../runtime/common/lang/RObject';
import {RLogger} from '../../runtime/common/lang/RLogger';
import {FDataStream} from '../../runtime/common/io/FDataStream';
import {FResource} from './FResource';
import {FMeshResource} from './FMeshResource';

//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150128
//==========================================================
export class FModelResource extends FResource {
   //    o = MO.Class.inherits(this, o, MO.FE3sSpace);
   //    //..........................................................
   //    // @attribute
   //    o._dataCompress  = true;
   //    o._dataBlock     = true;
   //    // @attribute
   public meshes: FDictionary<FMeshResource> = null;
   //    o._skeletons     = MO.Class.register(o, new MO.AGetter('_skeletons'));
   //    o._animations    = MO.Class.register(o, new MO.AGetter('_animations'));
   //    o._display       = MO.Class.register(o, new MO.AGetter('_display'));
   //    //..........................................................
   //    o.construct      = MO.FE3sModel_construct;
   //    // @method
   //    o.findMeshByCode = MO.FE3sModel_findMeshByCode;
   //    // @method
   //    o.unserialize    = MO.FE3sModel_unserialize;
   //    o.saveConfig     = MO.FE3sModel_saveConfig;
   //    return o;
   // }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.typeCode = 'Model';
      this.meshes = new FDictionary<FMeshResource>();
      //var display = this._display = MO.Class.create(MO.FE3sModelDisplay);
      //display._model = this;
   }

   // //==========================================================
   // // <T>根据代码查找网格。</T>
   // //
   // // @method
   // // @param p:code:String 代码
   // // @return FE3sMesh 网格
   // //==========================================================
   // MO.FE3sModel_findMeshByCode = function FE3sModel_findMeshByCode(p){
   //    var s = this._meshes;
   //    for(var i = s.count() - 1; i >= 0; i--){
   //       var m = s.at(i);
   //       if(m._code == p){
   //          return m;
   //       }
   //    }
   //    return null;
   // }

   //==========================================================
   // <T>从输入流里反序列化信息内容</T>
   //
   // @param input 数据流
   //==========================================================
   public unserialize(input: FDataStream): void {
      // 读取父信息
      super.unserialize(input);
      //..........................................................
      // 存储模型
      //var modelConsole = MO.Console.find(MO.FE3sModelConsole);
      //modelConsole.models().set(this.guid(), this);
      //..........................................................
      // 读取几何体集合
      var meshCount: number = input.readInt32();
      if (meshCount > 0) {
         var meshes = this.meshes = new FDictionary<FMeshResource>();
         for (var n: number = 0; n < meshCount; n++) {
            //var mesh = modelConsole.unserialMesh(input)
            //var meshGuid = mesh.guid();
            //meshes.set(meshGuid, mesh);
            var mesh = new FMeshResource();
            mesh.unserialize(input);
            this.meshes.set(mesh.code, mesh);
         }
      }
      // //..........................................................
      // // 读取骨骼集合
      // var skeletonCount = input.readInt16();
      // if(skeletonCount > 0){
      //    var skeletons = this._skeletons = new MO.TObjects();
      //    for(var i = 0; i < skeletonCount; i++){
      //       var skeleton = modelConsole.unserialSkeleton(input)
      //       skeletons.push(skeleton);
      //    }
      // }
      // //..........................................................
      // // 读取动画集合
      // var animationCount = input.readInt16();
      // if(animationCount > 0){
      //    var animations = this._animations = new MO.TObjects();
      //    for(var i = 0; i < animationCount; i++){
      //       var animation = modelConsole.unserialAnimation(this, input)
      //       animations.push(animation);
      //    }
      // }
      // //..........................................................
      // // 读取显示信息
      // var display = this._display;
      // display.unserialize(input);
      // var renderables = display.renderables();
      // if(renderables){
      //    var renderableCount = renderables.count();
      //    for(var i = 0; i < renderableCount; i++){
      //       var renderable = renderables.get(i);
      //       var meshGuid = renderable.meshGuid();
      //       var mesh = meshes.get(meshGuid);
      //       MO.Assert.debugNotNull(mesh);
      //       renderable.setMesh(mesh);
      //    }
      // }
      //..........................................................
      //RLogger.info(this, "Unserialize model success. (guid={1}, code={2})", this._guid, this._code);
      RLogger.info(this, "Unserialize model success. (guid={1}, code={2})");
   }

   // //==========================================================
   // // <T>数据内容存储到配置节点中。</T>
   // //
   // // @method
   // // @param xconfig:TXmlNode 配置节点
   // //==========================================================
   // MO.FE3sModel_saveConfig = function FE3sModel_saveConfig(xconfig){
   //    var o = this;
   //    o.__base.FE3sSpace.saveConfig.call(o, xconfig);
   //    // 存储属性
   //    o._display.saveConfig(xconfig.create('Display'));
   // }
}