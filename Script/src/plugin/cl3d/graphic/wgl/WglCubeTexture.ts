import {CubeTexture} from '../CubeTexture';
import {WglUtil} from './WglUtil';

//==========================================================
// <T>WebGL立方渲染纹理。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class WglCubeTexture extends CubeTexture {
   // 句柄
   public handle: any = null;

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   public setup() {
      //super.setup();
      var graphic = this.graphicContext.handle;
      this.handle = graphic.createTexture();
   }

   //==========================================================
   // <T>当前缓冲是否有效。</T>
   //
   // @method
   // @return Boolean 是否有效
   //==========================================================
   public isValid() {
      var graphic = this.graphicContext.handle;
      return graphic.isTexture(this.handle);
   }

   //==========================================================
   // <T>生成位图的缩放图片。</T>
   //
   // @method
   //==========================================================
   public makeMipmap() {
      var graphic = this.graphicContext.handle;
      // 绑定数据
      graphic.bindTexture(graphic.TEXTURE_CUBE_MAP, this.handle);
      // 生成MIP
      graphic.generateMipmap(graphic.TEXTURE_CUBE_MAP);
   }

   //==========================================================
   // <T>上传图片内容。</T>
   //
   // @method
   // @param p:image:HtmlImgTag 图片
   //==========================================================
   public upload(x1, x2, y1, y2, z1, z2) {
      var context = this.graphicContext;
      var graphic = context.handle;
      // 绑定数据
      graphic.bindTexture(graphic.TEXTURE_CUBE_MAP, this.handle);
      // 上传内容
      graphic.texImage2D(graphic.TEXTURE_CUBE_MAP_POSITIVE_X, 0, graphic.RGB, graphic.RGB, graphic.UNSIGNED_BYTE, x1.image());
      graphic.texImage2D(graphic.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, graphic.RGB, graphic.RGB, graphic.UNSIGNED_BYTE, x2.image());
      graphic.texImage2D(graphic.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, graphic.RGB, graphic.RGB, graphic.UNSIGNED_BYTE, y1.image());
      graphic.texImage2D(graphic.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, graphic.RGB, graphic.RGB, graphic.UNSIGNED_BYTE, y2.image());
      graphic.texImage2D(graphic.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, graphic.RGB, graphic.RGB, graphic.UNSIGNED_BYTE, z1.image());
      graphic.texImage2D(graphic.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, graphic.RGB, graphic.RGB, graphic.UNSIGNED_BYTE, z2.image());
      // 检查结果
      this.statusLoad = context.checkError("texImage2D", "Upload cube image failure.");
      // 更新处理
      this.update();
   }

   //==========================================================
   // <T>更新处理。</T>
   //
   // @method
   //==========================================================
   public update() {
      //o.__base.FG3dCubeTexture.update.call(o);
      // 绑定数据
      var graphic = this.graphicContext.handle;
      graphic.bindTexture(graphic.TEXTURE_CUBE_MAP, this.handle);
      // 设置过滤器
      var c = WglUtil.convertSamplerFilter(graphic, this.filterMinCd);
      if (c) {
         graphic.texParameteri(graphic.TEXTURE_CUBE_MAP, graphic.TEXTURE_MIN_FILTER, c);
      }
      var c = WglUtil.convertSamplerFilter(graphic, this.filterMagCd);
      if (c) {
         graphic.texParameteri(graphic.TEXTURE_CUBE_MAP, graphic.TEXTURE_MAG_FILTER, c);
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
      var graphic = this.graphicContext.handle;
      // 释放对象
      var handle = this.handle;
      if (handle) {
         graphic.deleteTexture(handle);
         this.handle = null;
      }
      // 父处理
      super.dispose();
   }
}
