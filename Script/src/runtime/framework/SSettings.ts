import {Size2} from '../common/math/Size2';

//==========================================================
// <T>设置信息。</T>
//==========================================================
export class SSettings {
   // 窗口
   public hWindow: Window;
   // 文档
   public hDocument: HTMLDocument;
   // 面板
   public hPanel: HTMLBodyElement;
   // 尺寸
   public size: Size2 = new Size2();
}