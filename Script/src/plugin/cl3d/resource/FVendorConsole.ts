import {Dictionary} from '../../runtime/common/lang/Dictionary';
import {Fatal} from '../../runtime/common/lang/Fatal';
import {ClassUtil} from '../../runtime/common/reflect/ClassUtil';
import {Service} from '../../runtime/core/Service';
import {FVendor} from './FVendor';
import {FVendorNet} from './FVendorNet';
import {FVendorLocal} from './FVendorLocal';

//==========================================================
// <T>资源提供商管理器。</T>
//
// @class
// @author maocy
// @history 15031
//==========================================================
export class FVendorConsole extends Service {
   // 设置
   protected _setuped: boolean = false;
   // 提供商集合
   protected _vendors: Dictionary<FVendor> = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._vendors = new Dictionary<FVendor>();
   }

   //==========================================================
   // <T>注册一个资源提供商。</T>
   //
   // @param p:name:String 名称
   // @return 主题
   //==========================================================
   public createVendor(clazz, url) {
      var vendor = ClassUtil.create(clazz);
      vendor.setContentUrl(url);
      return vendor;
   }

   //==========================================================
   // <T>注册一个资源提供商。</T>
   //
   // @param p:name:String 名称
   // @return 主题
   //==========================================================
   public register(name, vendor) {
      this._vendors.set(name, vendor);
   }

   //==========================================================
   // <T>根据名称查找资源提供商。</T>
   //
   // @param p:name:String 名称
   // @return FE3sVendor 资源提供商
   //==========================================================
   public find(name) {
      if (!this._setuped) {
         this.setup('net');
      }
      var vendor = this._vendors.get(name);
      vendor.reset();
      return vendor;
   }

   //==========================================================
   // <T>根据名称查找资源提供商。</T>
   //
   // @param name 名称
   //==========================================================
   public setup(name) {
      if (name == 'net') {
         // this._vendors.set('bitmap', this.createVendor(FVendorNet, MO.RBrowser.hostPath('/cloud.resource.bitmap.wv'), 'guid'));
         // this._vendors.set('material', this.createVendor(FVendorNet, MO.RBrowser.hostPath('/cloud.resource.material.wv?do=data'), 'guid'));
         // this._vendors.set('mesh', this.createVendor(FVendorNet, MO.RBrowser.hostPath('/cloud.resource.mesh.wv'), 'guid'));
         // this._vendors.set('model', this.createVendor(FVendorNet, MO.RBrowser.hostPath('/cloud.resource.model.wv'), 'guid'));
         // this._vendors.set('template', this.createVendor(FVendorNet, MO.RBrowser.hostPath('/cloud.resource.template.wv'), 'guid'));
         // this._vendors.set('scene', this.createVendor(FVendorNet, MO.RBrowser.hostPath('/cloud.resource.scene.wv'), 'guid|code'));
      } else if (name == 'local') {
         // this._vendors.set('bitmap', this.createVendor(FVendorLocal, MO.RBrowser.contentPath('/ar3/bitmap/{guid}.bin')));
         // this._vendors.set('material', this.createVendor(FVendorLocal, MO.RBrowser.contentPath('/ar3/material/{guid}.bin')));
         // this._vendors.set('mesh', this.createVendor(FVendorLocal, MO.RBrowser.contentPath('/ar3/mesh/{guid}.bin')));
         // this._vendors.set('model', this.createVendor(FVendorLocal, MO.RBrowser.contentPath('/ar3/model/{guid}.bin')));
         // this._vendors.set('template', this.createVendor(FVendorLocal, MO.RBrowser.contentPath('/ar3/template/{guid}.bin')));
         // this._vendors.set('scene', this.createVendor(FVendorLocal, MO.RBrowser.contentPath('/ar3/scene/{guid}.bin')));
      } else {
         throw new Fatal(this, 'Unknown setup code. (code={1})', name);
      }
      this._setuped = true;
   }
}