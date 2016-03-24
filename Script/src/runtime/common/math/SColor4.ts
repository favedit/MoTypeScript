import {FError} from '../lang/FError';
import {HexUtil} from '../lang/HexUtil'
import {FloatUtil} from '../lang/RFloat';

//==========================================================
// <T>颜色。</T>
//
// @struct
// @author maocy
// @version 141231
//==========================================================
export class SColor4 {
   //..........................................................
   // @attribute
   public red: number = 0;
   public green: number = 0;
   public blue: number = 0;
   public alpha: number = 1;

   //============================================================
   // <T>构造处理。</T>
   //
   // @method
   // @param x:Number X分量
   // @param y:Number Y分量
   // @param z:Number Z分量
   //============================================================
   public constructor(red: number = 0, green: number = 0, blue: number = 0, alpha: number = 1) {
      this.red = red;
      this.green = green;
      this.blue = blue;
      this.alpha = alpha;
   }

   //============================================================
   // <T>接收数据。</T>
   //
   // @method
   // @param p:value:SColor4 颜色
   //============================================================
   public assign(p) {
      var o = this;
      o.red = p.red;
      o.green = p.green;
      o.blue = p.blue;
      o.alpha = p.alpha;
   }

   //============================================================
   // <T>接收强度数据。</T>
   //
   // @method
   // @param p:value:SColor4 颜色
   //============================================================
   public assignPower(p) {
      var o = this;
      o.red = p.red * p.alpha;
      o.green = p.green * p.alpha;
      o.blue = p.blue * p.alpha;
      o.alpha = p.alpha;
   }

   //============================================================
   // <T>设置数据内容。</T>
   //
   // @param r:red:Number 红色
   // @param g:green:Number 绿色
   // @param b:blue:Number 蓝色
   // @param a:alpha:Number 透明
   //============================================================
   public set(r, g, b, a) {
      var o = this;
      o.red = r;
      o.green = g;
      o.blue = b;
      o.alpha = a;
   }

   //============================================================
   // <T>设置数据内容。</T>
   //
   // @param value:Number 数值
   //============================================================
   public setInteger(value) {
      var o = this;
      o.red = ((value >> 16) & 0xFF) / 255;
      o.green = ((value >> 8) & 0xFF) / 255;
      o.blue = (value & 0xFF) / 255;
      o.alpha = ((value >> 24) & 0xFF) / 255;
   }

   //============================================================
   // <T>设置数据内容。</T>
   //
   // @param value:Number 数值
   //============================================================
   public setIntAlpha(value, alpha) {
      var o = this;
      o.red = ((value >> 16) & 0xFF) / 255;
      o.green = ((value >> 8) & 0xFF) / 255;
      o.blue = (value & 0xFF) / 255;
      o.alpha = alpha;
   }

   //============================================================
   // <T>设置数据内容。</T>
   //
   // @param r:red:Number 红色
   // @param g:green:Number 绿色
   // @param b:blue:Number 蓝色
   // @param a:alpha:Number 透明
   //============================================================
   public setHex(value) {
      var o = this;
      if (value.indexOf('#') == 0) {
         value = value.substring(1);
      }
      if (value.indexOf('0x') == 0) {
         value = value.substring(2);
      }
      if (value.length == 6) {
         o.red = HexUtil.parse(value.substring(0, 2)) / 255;
         o.green = HexUtil.parse(value.substring(2, 4)) / 255;
         o.blue = HexUtil.parse(value.substring(4, 6)) / 255;
      } else {
         throw new FError(o, 'Invalid value.');
      }
   }

   //==========================================================
   // <T>序列化数据到输出流里。</T>
   //
   // @method
   // @param p:input:FByteStream 数据流
   //==========================================================
   public serialize(p) {
      p.writeFloat(this.red);
      p.writeFloat(this.green);
      p.writeFloat(this.blue);
      p.writeFloat(this.alpha);
   }

   //==========================================================
   // <T>从输入流里反序列化数据。</T>
   //
   // @method
   // @param p:input:FByteStream 数据流
   //==========================================================
   public unserialize(p) {
      this.red = p.readFloat();
      this.green = p.readFloat();
      this.blue = p.readFloat();
      this.alpha = p.readFloat();
   }

   //==========================================================
   // <T>从输入流里反序列化数据。</T>
   //
   // @method
   // @param p:input:FByteStream 数据流
   //==========================================================
   public unserialize3(p) {
      this.red = p.readFloat();
      this.green = p.readFloat();
      this.blue = p.readFloat();
      this.alpha = 1.0;
   }

   //==========================================================
   // <T>数据内容存储到配置节点中。</T>
   //
   // @method
   // @param p:config:TXmlNode 配置节点
   //==========================================================
   public saveConfig(p) {
      p.setFloat('r', this.red);
      p.setFloat('g', this.green);
      p.setFloat('b', this.blue);
      p.setFloat('a', this.alpha);
   }

   //==========================================================
   // <T>数据内容存储到配置节点中。</T>
   //
   // @method
   // @param p:config:TXmlNode 配置节点
   //==========================================================
   public savePower(p) {
      p.setFloat('r', this.red);
      p.setFloat('g', this.green);
      p.setFloat('b', this.blue);
      p.setFloat('power', this.alpha);
   }

   //============================================================
   // <T>复制内容到数组中。</T>
   //
   // @method
   // @param d:data:Array 数组
   // @param i:index:Integer 索引
   //============================================================
   public copyArray(d, i) {
      d[i++] = this.red;
      d[i++] = this.green;
      d[i++] = this.blue;
      d[i++] = this.alpha;
      return 4;
   }

   //============================================================
   // <T>获得字符串。</T>
   //
   // @return String 字符串
   //============================================================
   public toRgbaString() {
      return 'rgba(' + parseInt((this.red * 255) as any) + ',' + parseInt((this.green * 255) as any) + ',' + parseInt((this.blue * 255) as any) + ',' + FloatUtil.format(this.alpha) + ')';
   }

   //============================================================
   // <T>获得字符串。</T>
   //
   // @return String 字符串
   //============================================================
   public toString() {
      return FloatUtil.format(this.red) + ',' + FloatUtil.format(this.green) + ',' + FloatUtil.format(this.blue) + ',' + FloatUtil.format(this.alpha);
   }

   //============================================================
   // <T>释放处理。</T>
   //
   // @method
   //============================================================
   public dispose() {
      this.red = null;
      this.green = null;
      this.blue = null;
      this.alpha = null;
   }
}
