import {Fatal} from '../../../runtime/common/lang/Fatal';
import {Size2} from '../../../runtime/common/math/Size2';
import {ObjectUtil} from '../../../runtime/common/lang/ObjectUtil';
import {GraphicContext} from '../../../runtime/graphic/core/GraphicContext';
import {ImageResource} from '../../../runtime/ui/resource/ImageResource';

//==========================================================
// <T>WebGL渲染环境。</T>
//
// @author maocy
// @refer https://www.khronos.org/registry/webgl
// @history 141230
//==========================================================
export class Context extends GraphicContext {
   // @attribute
   protected _handle: CanvasRenderingContext2D;
   protected _globalScale: Size2;
   protected _scale: Size2;
   // @attribute
   protected _gridSourceX;
   protected _gridSourceY;
   protected _gridSourceWidth;
   protected _gridSourceHeight;
   protected _gridDrawX;
   protected _gridDrawY;
   protected _gridDrawWidth;
   protected _gridDrawHeight;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._globalScale = new Size2(1, 1);
      this._scale = new Size2(1, 1);
      this._gridSourceX = new Array(3);
      this._gridSourceY = new Array(3);
      this._gridSourceWidth = new Array(3);
      this._gridSourceHeight = new Array(3);
      this._gridDrawX = new Array(3);
      this._gridDrawY = new Array(3);
      this._gridDrawWidth = new Array(3);
      this._gridDrawHeight = new Array(3);
   }

   //==========================================================
   // <T>关联页面画布标签。</T>
   //
   // @method
   // @param hCanvas:HtmlCanvasTag 页面画布标签
   //==========================================================
   public linkCanvas(hCanvas) {
      super.linkCanvas(hCanvas);
      // 获得环境
      if (hCanvas.getContext) {
         // 初始化对象
         var handle = hCanvas.getContext('2d');
         if (!handle) {
            throw new Fatal(this, "Current browser can't support Context2D technique.");
         }
         this._handle = handle;
      }
      this._hCanvas = hCanvas;
   }

   //==========================================================
   // <T>设置全局缩放。</T>
   //
   // @method
   // @param width:Number 横向缩放
   // @param height:Number 纵向缩放
   //==========================================================
   public setGlobalScale(width, height) {
      this._globalScale.set(width, height);
   }

   //==========================================================
   // <T>设置缩放。</T>
   //
   // @method
   // @param width:Number 横向缩放
   // @param height:Number 纵向缩放
   //==========================================================
   public setScale(width, height) {
      if ((width == 1) && (height == 1)) {
         return;
      }
      //if(!o._scale.equalsData(width, height)){
      this._handle.scale(width, height);
      this._scale.set(width, height);
      //}
   }

   //==========================================================
   // <T>设置透明。</T>
   //
   // @method
   // @param alpha:Number 透明
   //==========================================================
   public setAlpha(alpha) {
      this._handle.globalAlpha = alpha;
   }

   //==========================================================
   // <T>设置字体。</T>
   //
   // @method
   // @param font:String 字体
   //==========================================================
   public setFont(font) {
      this._handle.font = font;
   }

   //==========================================================
   // <T>设置投影。</T>
   //
   // @method
   // @param font:String 字体
   //==========================================================
   public setShadow(offsetX, offsetY, blur, color) {
      this._handle.shadowOffsetX = offsetX;
      this._handle.shadowOffsetY = offsetY;
      this._handle.shadowBlur = blur;
      this._handle.shadowColor = color;
   }

   //==========================================================
   // <T>取消投影。</T>
   //
   // @method
   // @param font:String 字体
   //==========================================================
   public clearShadow() {
      //this._handle.shadowOffsetX = "0";
      //this._handle.shadowOffsetY = "0";
      //this._handle.shadowBlur = "0";
      //this._handle.shadowColor = "0";
   }

   //==========================================================
   // <T>存储当前状态。</T>
   //
   // @method
   //==========================================================
   public store() {
      this._handle.save();
   }

   //==========================================================
   // <T>回复当前状态。</T>
   //
   // @method
   //==========================================================
   public restore() {
      this._handle.restore();
   }

   //==========================================================
   // <T>准备内容。</T>
   //
   // @param clearFlag 是否清空
   //==========================================================
   public prepare(clearFlag) {
      var handle = this._handle;
      var scale = this._globalScale;
      if (clearFlag) {
         var size = this._size;
         handle.setTransform(1, 0, 0, 1, 0, 0);
         //handle.clearRect(0, 0, size.width, size.height);
      }
      //handle.setTransform(scale.width, 0, 0, scale.height, 0, 0);
   }

   //==========================================================
   // <T>清空内容。</T>
   //==========================================================
   public clear() {
      var size = this._size;
      var handle = this._handle;
      var hCanvas = handle.canvas;
      handle.save();
      handle.setTransform(1, 0, 0, 1, 0, 0);
      //o._handle.clearRect(0, 0, size.width, size.height);
      handle.restore();
   }

   //==========================================================
   // <T>清空矩形内容。</T>
   //
   // @method
   //==========================================================
   public clearRectangle(rectangle) {
      this._handle.clearRect(rectangle.left, rectangle.top, rectangle.width, rectangle.height);
   }

   //==========================================================
   // <T>剪裁区域。</T>
   //
   // @method
   // @param left:Integer 左位置
   // @param top:Integer 上位置
   // @param width:Integer 宽度
   // @param height:Integer 高度
   //==========================================================
   public clip(left, top, width, height) {
      var handle = this._handle;
      //handle.strokeStyle = '#FFFFFF';
      //handle.lineWidth = 1;
      //handle.strokeRect(left, top, width, height);
      handle.beginPath();
      handle.rect(left, top, width, height);
      handle.clip();
   }

   //==========================================================
   // <T>获得文本长度。</T>
   //
   // @method
   // @param text:String 文本
   // @return Integer 文本长度
   //==========================================================
   public textWidth(text) {
      var info = this._handle.measureText(text);
      return info.width;
   }

   //==========================================================
   // <T>创建线性渐变填充。</T>
   //
   // @method
   // @param x1,y1,x2,y2:Integer 起始、终止坐标
   // @return gradient 渐变
   //==========================================================
   public createLinearGradient(x1, y1, x2, y2) {
      var handle = this._handle;
      return handle.createLinearGradient(x1, y1, x2, y2);
   }

   //==========================================================
   // <T>开始路径。</T>
   //
   // @method
   //==========================================================
   public beginPath() {
      this._handle.beginPath();
   }

   //==========================================================
   // <T>结束路径。</T>
   //
   // @method
   //==========================================================
   public endPath() {
      this._handle.closePath();
   }

   //==========================================================
   // <T>移动到指定位置。</T>
   //
   // @method
   // @param x:Number 横坐标
   // @param y:Number 纵坐标
   //==========================================================
   public moveTo(x, y) {
      this._handle.moveTo(x, y);
   }

   //==========================================================
   // <T>绘线到指定位置。</T>
   //
   // @method
   // @param x:Number 横坐标
   // @param y:Number 纵坐标
   //==========================================================
   public lineTo(x, y) {
      this._handle.lineTo(x, y);
   }

   //==========================================================
   // <T>绘制直线。</T>
   //
   // @method
   // @param x1:Integer 横坐标1
   // @param y1:Integer 纵坐标1
   // @param x2:Integer 横坐标2
   // @param y2:Integer 纵坐标2
   // @param color:String 颜色
   // @param lineWidth:Integer 线宽
   //==========================================================
   public drawLine(x1, y1, x2, y2, color, lineWidth) {
      var handle = this._handle;
      handle.strokeStyle = color;
      handle.lineWidth = lineWidth;
      handle.beginPath();
      handle.moveTo(x1, y1);
      handle.lineTo(x2, y2);
      handle.closePath();
      handle.stroke();
   }

   //==========================================================
   // <T>绘制矩形。</T>
   //
   // @method
   // @param x:Integer 横坐标
   // @param y:Integer 纵坐标
   // @param width:Integer 宽度
   // @param height:Integer 高度
   // @param color:String 颜色
   // @param lineWidth:Integer 线宽
   //==========================================================
   public drawRectangle(x, y, width, height, color, lineWidth) {
      var handle = this._handle;
      handle.strokeStyle = color;
      handle.lineWidth = lineWidth;
      handle.strokeRect(x, y, width, height);
   }

   //==========================================================
   // <T>绘制文字。</T>
   //
   // @method
   // @param text:String 文本
   // @param x:Integer 横坐标
   // @param y:Integer 纵坐标
   // @param color:String 颜色
   //==========================================================
   public drawText(text, x, y, color) {
      var handle = this._handle;
      handle.fillStyle = color;
      handle.fillText(text, x, y);
   }
   //==========================================================
   // <T>将文字绘制在矩形区域。</T>
   //
   // @method
   // @param text:String 文本
   // @param x:Integer 横坐标
   // @param y:Integer 纵坐标
   // @param width:Integer 宽度
   // @param height:Integer 高度
   // @param lineWidth:Integer 行间距
   // @param color:String 颜色
   //==========================================================
   public drawTextRectangle(text, x, y, width, height, lineWidth, color) {
      var handle = this._handle;
      handle.fillStyle = color;
      // handle.fillText(text, x, y);
      var drawX = x;
      var drawY = y;
      var nCharWidth = handle.measureText("A").width;  //窄字符的宽度
      var wCharWidth = handle.measureText("王").width; //宽字符的宽度
      var beginDrawTextNumber = 0;
      var drawTextNumber = 0;
      var lineLengh = 0; //预测的字符长度
      if (width == 0 || height == 0 || lineWidth == 0) {
         return;
      }
      for (var i = 0; i < text.length; i++) {
         var tmp = text.charAt(i);
         drawTextNumber = i + 1 - beginDrawTextNumber;
         if (text.charCodeAt(i) > 255) {
            lineLengh += wCharWidth;
         } else {
            lineLengh += nCharWidth;
         }
         //换行符处理
         var currentChar = text.charAt(i);
         var nextChar = text.charAt(i + 1);
         if (currentChar == '\n') {            //linux换行处理
            var currentWidth = handle.measureText(text.substr(beginDrawTextNumber, drawTextNumber)).width;
            if (currentWidth < width) {
               handle.fillText(text.substr(beginDrawTextNumber, drawTextNumber), drawX, drawY);
               drawY += lineWidth;
               beginDrawTextNumber = i + 1;
               lineLengh = 0;
            }
         }
         if ((currentChar == '\r') && (nextChar == '\n')) { //windows换行处理
            var currentWidth = handle.measureText(text.substr(beginDrawTextNumber, drawTextNumber)).width;
            if (currentWidth < width) {
               handle.fillText(text.substr(beginDrawTextNumber, drawTextNumber), drawX, drawY);
               drawY += lineWidth;
               beginDrawTextNumber = i + 2;
               i++
               lineLengh = 0;
            }
         }
         if (lineLengh > width) {
            while (true) {
               var flag = false;
               var currentWidth = handle.measureText(text.substr(beginDrawTextNumber, drawTextNumber)).width;
               if (currentWidth == width) {
                  flag = true;
               }
               if (currentWidth > width) {  //预判的宽度大于实际宽度的情况 需要减少字符数量
                  if (drawTextNumber == 1) {//一个字符宽度大于给定矩形宽度的情况
                     flag = true;
                  } else {
                     drawTextNumber -= 1;
                     currentWidth = handle.measureText(text.substr(beginDrawTextNumber, drawTextNumber)).width;
                     if (currentWidth <= width) {
                        flag = true;
                     }
                  }
               }
               if ((flag == false) && (currentWidth < width)) {//预判的宽度大于实际宽度的情况 需要增加字符数量
                  drawTextNumber += 1;
                  currentWidth = handle.measureText(text.substr(beginDrawTextNumber, drawTextNumber)).width;
                  if (currentWidth >= width) {
                     flag = true;
                  }
               }
               if (flag == true) {//绘制字符
                  handle.fillText(text.substr(beginDrawTextNumber, drawTextNumber), drawX, drawY);
                  drawY += lineWidth;
                  i = beginDrawTextNumber + drawTextNumber - 1;

                  lineLengh = 0;
                  //下个字符是换行需要跳过
                  var nextChar = text.charAt(i + 1);
                  var nextNextChar = text.charAt(i + 2);
                  if (nextChar == '\n') {
                     i += 1;
                  }
                  if ((nextChar == '\r') && (nextNextChar == '\n')) {
                     i += 2;
                  }
                  beginDrawTextNumber = i + 1;
                  break;
               }
            }

         }
         //绘制高度超出给定矩形高度,则停止绘制
         if ((drawY - y + lineWidth) > height) {
            return;
         }
      }
      //绘制最后一行
      handle.fillText(text.substr(beginDrawTextNumber, drawTextNumber), drawX, drawY);
   }

   //==========================================================
   // <T>绘制文字。</T>
   //
   // @method
   // @param text:String 文本
   // @param x:Integer 横坐标
   // @param y:Integer 纵坐标
   // @param color:String 颜色
   // @param font:SUiFont 字体
   //==========================================================
   public drawTextVertical(text, x, y, font) {
      var handle = this._handle;
      handle.font = font.toString();
      handle.fillStyle = font.color;
      for (var i = 0; i < text.length; i++) {
         handle.fillText(text.charAt(i), x, y);
         y += font.size + parseInt((font.size / 5) as any);
      }
   }

   //==========================================================
   // <T>绘制图像。</T>
   //
   // @method
   // @param content:Object 图像内容
   // @param x:Integer 横坐标
   // @param y:Integer 纵坐标
   // @param width:Integer 宽度
   // @param height:Integer 高度
   //==========================================================
   public drawImage(content, x, y, width, height, targetX?:any, targetY?:any, targetWidth?:any, targetHeight?:any) {
      var handle = this._handle;
      var size = this._size;
      // 获得数据
      var data = null
      if (content.tagName == 'IMG') {
         data = content;
      } else if (content instanceof ImageResource) {
         if (!content.testReady()) {
            return;
         }
         data = content.handle;
         if (width == null) {
            width = data.width;
         }
         if (height == null) {
            height = data.height;
         }
      } else {
         throw new Fatal(this, 'Unknown content type');
      }
      // 绘制位图
      handle.drawImage(data, x, y, width, height, targetX, targetY, targetWidth, targetHeight);
   }

   //==========================================================
   // <T>绘制图像。</T>
   //
   // @method
   // @param content:Object 图像内容
   // @param rectangle:SRectangle 矩形
   //==========================================================
   public drawRectangleImage(content, rectangle) {
      this.drawImage(content, rectangle.left, rectangle.top, rectangle.width, rectangle.height);
   }

   //==========================================================
   // <T>绘制九宫格图像。</T>
   //
   // @method
   // @param content:Object 原始图像内容
   // @param x:Integer 在父级的横向位置
   // @param y:Integer 在父级的纵向位置
   // @param width:Integer 要绘制宽度
   // @param height:Integer 要绘制高度
   // @param padding:SPadding 不参与拉伸的边界分割信息
   //==========================================================
   public drawGridImage(content, x, y, width, height, padding) {
      /*var o = this;
      var handle = o._handle;
      // 获得数据
      var data = null
      if (MO.Class.isClass(content, MO.FImage)) {
         if (!content.testReady()) {
            return;
         }
         data = content.image();
      } else {
         throw new TError(o, 'Unknown content type');
      }
      var ssize = content.size();
      var sx = o._gridSourceX;
      sx[0] = 0;
      sx[1] = padding.left;
      sx[2] = ssize.width - padding.right;
      var sy = o._gridSourceY;
      sy[0] = 0;
      sy[1] = padding.top;
      sy[2] = ssize.height - padding.bottom;
      var dx = o._gridDrawX;
      dx[0] = x;
      dx[1] = x + padding.left;
      dx[2] = x + width - padding.right;
      var dy = o._gridDrawY;
      dy[0] = y;
      dy[1] = y + padding.top;
      dy[2] = y + height - padding.bottom;
      var sw = o._gridSourceWidth;
      sw[0] = padding.left;
      sw[1] = ssize.width - padding.left - padding.right;
      sw[2] = padding.right;
      var sh = o._gridSourceHeight;
      sh[0] = padding.top;
      sh[1] = ssize.height - padding.top - padding.bottom;
      sh[2] = padding.bottom;
      var dw = o._gridDrawWidth;
      dw[0] = padding.left;
      dw[1] = width - padding.left - padding.right;
      dw[2] = padding.right;
      var dh = o._gridDrawHeight;
      dh[0] = padding.top;
      dh[1] = height - padding.top - padding.bottom;
      dh[2] = padding.bottom;
      //drawImage(image,sx,sy,sw,sh,dx,dy,dw,dh)
      for (var i = 0; i < 9; i++) {
         var row = parseInt(i / 3);
         var column = i % 3;
         if (dh[row] > 0 && dw[column] > 0) {
            handle.drawImage(data, sx[column], sy[row], sw[column], sh[row], dx[column], dy[row], dw[column], dh[row]);
         }
      }
      //handle.drawImage(data, 0, 1, 1, 1, 1, 1, 100, 100);*/
   }

   //==========================================================
   // <T>绘制图像。</T>
   //
   // @method
   // @param content:Object 图像内容
   // @param rectangle:SRectangle 矩形
   //==========================================================
   public drawImageRectangle(content, rectangle) {
      return this.drawImage(content, rectangle.left, rectangle.top, rectangle.width, rectangle.height);
   }

   //==========================================================
   // <T>绘制边框线。</T>
   //
   // @method
   // @param rectangle:SRectangle 矩形
   // @param border:SBorder 边框
   //==========================================================
   public drawBorderLine(x1, y1, x2, y2, borderLine) {
      var handle = this._handle;
      handle.strokeStyle = borderLine.color;
      handle.lineWidth = borderLine.width;
      handle.beginPath();
      handle.moveTo(x1 + 0.5, y1 + 0.5);
      handle.lineTo(x2 + 0.5, y2 + 0.5);
      handle.closePath();
      handle.stroke();
   }

   //==========================================================
   // <T>绘制边框。</T>
   //
   // @method
   // @param content:Object 图像内容
   // @param rectangle:SRectangle 矩形
   // @param border:SBorder 边框
   //==========================================================
   public drawBorder(rectangle, border) {
      // 计算位置
      var left = rectangle.left;
      var top = rectangle.top;
      var right = rectangle.left + rectangle.width - 1;
      var bottom = rectangle.top + rectangle.height - 1;
      // 绘制边框
      this.drawBorderLine(left, bottom, left, top, border.left);
      this.drawBorderLine(left - 0.5, top, right + 0.5, top, border.top);
      this.drawBorderLine(right, top, right, bottom, border.right);
      this.drawBorderLine(left - 0.5, bottom, right + 0.5, bottom, border.bottom);
   }

   //==========================================================
   // <T>绘制四边形。</T>
   //
   // @method
   // @param x1,y1...x4,y4:Integer 四个点
   // @param lineWidth:Integer 线宽
   // @param strokeColor:String 描边色
   // @param fillColor:String 填充色
   //==========================================================
   public drawQuadrilateral(x1, y1, x2, y2, x3, y3, x4, y4, lineWidth, strokeColor, fillColor) {
      var handle = this._handle;
      handle.beginPath();
      handle.lineWidth = lineWidth;
      handle.strokeStyle = strokeColor;
      handle.fillStyle = fillColor;
      handle.moveTo(x1 + 0.5, y1 + 0.5);
      handle.lineTo(x2 + 0.5, y2 + 0.5);
      handle.lineTo(x3 + 0.5, y3 + 0.5);
      handle.lineTo(x4 + 0.5, y4 + 0.5);
      handle.lineTo(x1 + 0.5, y1 + 0.5);
      handle.closePath();
      if (lineWidth != null && strokeColor != null) {
         handle.stroke();
      }
      if (fillColor != null) {
         handle.fill();
      }
   }

   //==========================================================
   // <T>绘制形状。</T>
   //
   // @method
   // @param lineWidth:Integer 宽度
   // @param color:String 颜色
   //==========================================================
   public drawShape(lineWidth, color) {
      var handle = this._handle;
      handle.lineWidth = lineWidth;
      handle.strokeStyle = color;
      handle.stroke();
   }

   //==========================================================
   // <T>绘制三角形。</T>
   //
   // @method
   // @param x1,y1,x2,y2,x3,y3:Integer 三个点的坐标
   // @param lineWidth:Integer 线宽
   // @param strokeColor:String 边线色
   // @param fillColor:String 填充色
   //==========================================================
   public drawTriangle(x1, y1, x2, y2, x3, y3, lineWidth, strokeColor, fillColor) {
      var handle = this._handle;
      handle.lineWidth = lineWidth;
      handle.strokeStyle = strokeColor;
      handle.fillStyle = fillColor;
      handle.beginPath();
      handle.moveTo(x1 + 0.5, y1 + 0.5);
      handle.lineTo(x2 + 0.5, y2 + 0.5);
      handle.lineTo(x3 + 0.5, y3 + 0.5);
      handle.closePath();
      handle.fill();
      handle.stroke();
   }

   //==========================================================
   // <T>填充矩形。</T>
   //
   // @method
   // @param x:Integer 横坐标
   // @param y:Integer 纵坐标
   // @param width:Integer 宽度
   // @param height:Integer 高度
   // @param color:String 颜色
   // @param lineWidth:Integer 线宽
   //==========================================================
   public fillRectangle(x, y, width, height, color) {
      var handle = this._handle;
      handle.fillStyle = color;
      handle.beginPath();
      handle.fillRect(x, y, width, height);
      handle.closePath();
   }

   //==========================================================
   // <T>设置折线连接点。</T>
   //
   // @method
   // @param style:连接类型（"bevel", "round", "miter"）；
   //==========================================================
   public setLineJoin(style) {
      var handle = this._handle;
      handle.lineJoin = style;
   }

   //==========================================================
   // <T>填充形状。</T>
   //
   // @method
   // @param lineWidth:Integer 宽度
   // @param color:String 颜色
   //==========================================================
   public fillShape(lineWidth, color) {
      var handle = this._handle;
      handle.lineWidth = lineWidth;
      handle.fillStyle = color;
      handle.fill();
   }

   //==========================================================
   // <T>画圈。</T>
   //
   // @method
   // @param x,y:Integer 圆心坐标
   // @param radius:Integer 半径
   // @param lineWidth:Integer 线宽
   // @param strokeColor:String 边线色
   // @param fillColor:String 填充色
   //==========================================================
   public drawCircle(x, y, radius, lineWidth, strokeColor, fillColor) {
      var handle = this._handle;
      handle.lineWidth = lineWidth;
      handle.strokeStyle = strokeColor;
      handle.fillStyle = fillColor;
      handle.beginPath();
      handle.arc(x, y, radius, 0, 2 * Math.PI, false);
      handle.closePath();
      if (fillColor || fillColor != '') {
         handle.fill();
      }
      if (strokeColor || strokeColor != '') {
         handle.stroke();
      }
   }

   //==========================================================
   // <T>获得数据。</T>
   //
   // @method
   // @return Uint8Array 数据
   //==========================================================
   public toBytes() {
      var size = this._size;
      return this._handle.getImageData(0, 0, size.width, size.height);
   }

   //==========================================================
   // <T>存储画板到图片文件。</T>
   //
   // @method
   // @return Uint8Array 数据
   //==========================================================
   public saveFile(fileName, extention) {
      var o = this;
      // 存储数据
      /*var handle = context2d._handle;
      var hCanvas = handle.canvas;
      var imageUrl = hCanvas.toDataURL("image/" + extention);
      // 创建位图
      var link = document.createElement('A');
      var event = document.createEvent("MouseEvents");
      event.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      link.download = fileName;
      link.href = imageUrl;
      link.dispatchEvent(event);*/
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放属性
      this._handle = null;
      this._gridSourceX = null;
      this._gridSourceY = null;
      this._gridSourceWidth = null;
      this._gridSourceHeight = null;
      this._gridDrawX = null;
      this._gridDrawY = null;
      this._gridDrawWidth = null;
      this._gridDrawHeight = null;
      // 释放属性
      this._globalScale = ObjectUtil.dispose(this._globalScale);
      this._scale = ObjectUtil.dispose(this._scale);
      // 父处理
      super.dispose();
   }
}
