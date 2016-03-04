import {FG3dCubeTexture} from '../FG3dCubeTexture';
import {RWglUtility} from './RWglUtility';

//==========================================================
// <T>WebGL立方渲染纹理。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class FWglCubeTexture extends FG3dCubeTexture {
   //..........................................................
   // @attribute
   _handle = null;

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   public setup() {
      var handle = this._graphicContext._handle;
      //o.__base.FG3dCubeTexture.setup.call(o);
      this._handle = handle.createTexture();
   }

   //==========================================================
   // <T>当前缓冲是否有效。</T>
   //
   // @method
   // @return Boolean 是否有效
   //==========================================================
   public isValid() {
      var handle = this._graphicContext._handle;
      return handle.isTexture(this._handle);
   }

   //==========================================================
   // <T>生成位图的缩放图片。</T>
   //
   // @method
   //==========================================================
   public makeMipmap() {
      var o = this;
      var g = o._graphicContext._handle;
      // 绑定数据
      g.bindTexture(g.TEXTURE_CUBE_MAP, o._handle);
      // 生成MIP
      g.generateMipmap(g.TEXTURE_CUBE_MAP);
   }

   //==========================================================
   // <T>上传图片内容。</T>
   //
   // @method
   // @param p:image:HtmlImgTag 图片
   //==========================================================
   public upload(x1, x2, y1, y2, z1, z2) {
      var o = this;
      var c = o._graphicContext;
      var g = c._handle;
      // 绑定数据
      g.bindTexture(g.TEXTURE_CUBE_MAP, o._handle);
      // 上传内容
      g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_X, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, x1.image());
      g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, x2.image());
      g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, y1.image());
      g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, y2.image());
      g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, z1.image());
      g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, z2.image());
      // 检查结果
      o._statusLoad = c.checkError("texImage2D", "Upload cube image failure.");
      // 更新处理
      o.update();
   }

   //==========================================================
   // <T>更新处理。</T>
   //
   // @method
   //==========================================================
   public update() {
      var o = this;
      //o.__base.FG3dCubeTexture.update.call(o);
      // 绑定数据
      var g = o._graphicContext._handle;
      g.bindTexture(g.TEXTURE_CUBE_MAP, o._handle);
      // 设置过滤器
      var c = RWglUtility.convertSamplerFilter(g, o._filterMinCd);
      if (c) {
         g.texParameteri(g.TEXTURE_CUBE_MAP, g.TEXTURE_MIN_FILTER, c);
      }
      var c = RWglUtility.convertSamplerFilter(g, o._filterMagCd);
      if (c) {
         g.texParameteri(g.TEXTURE_CUBE_MAP, g.TEXTURE_MAG_FILTER, c);
      }
      //var c = MO.RWglUtility.convertSamplerFilter(g, pt.wrapS());
      //if(c){
      //g.texParameteri(gt, g.TEXTURE_WRAP_S, c);
      //}
      //var c = MO.RWglUtility.convertSamplerFilter(g, pt.wrapT());
      //if(c){
      //g.texParameteri(gt, g.TEXTURE_WRAP_T, c);
      //}
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      var o = this;
      var c = o._graphicContext;
      // 释放对象
      var n = o._handle;
      if (n) {
         c._handle.deleteTexture(n);
         o._handle = null;
      }
      // 父处理
      super.dispose();
   }
}
