// import {IntegerUtil} from './runtime/common/lang/IntegerUtil';
import {StringUtil} from './runtime/common/lang/StringUtil';
import {Linker} from './runtime/common/reflect/Linker';
import {AssertUtil} from './runtime/common/AssertUtil';
import {EnvironmentService} from './runtime/core/service/EnvironmentService';
import {Component} from './Component';

export class RenderContext {
   // 文档对象
   public topComponent: Component;
   // 文档对象
   public parentComponent: Component;
   // 文档对象
   public hDocument: HTMLDocument;
   // 环境服务
   @Linker(EnvironmentService)
   protected _environmentService: EnvironmentService;

   public iconPath(code?: string): string {
      if (code) {
         var uri = '${resource.icon}/' + StringUtil.replaceChar(code, '.', '/') + '.gif';
         var url = this._environmentService.parse(uri);
         return url;
      }
      return null;
   }

   //==========================================================
   // <T>创建一个页面对象。</T>
   //
   // @param tagName 标签名称
   // @param styleName 样式名称
   // @return 页面对象
   //==========================================================
   public create(tagName: string, styleName?: string): HTMLElement {
      var hElement = this.hDocument.createElement(tagName);
      if (styleName) {
         hElement.className = styleName;
      }
      return hElement;
   }

   //==========================================================
   // <T>创建一个页面片段。</T>
   //
   // @return 页面片段
   //==========================================================
   public createFragment(): DocumentFragment {
      var hFragment = this.hDocument.createDocumentFragment();
      return hFragment;
   }

   //==========================================================
   // <T>创建一个页面图标对象。</T>
   //
   // @param styleName 样式名称
   // @param uri 图片路径
   // @param width 图片高度
   // @param height 图片宽度
   // @return 页面图标对象
   //==========================================================
   public createIcon(styleName?: any, code?: string, width?: any, height?: any): HTMLImageElement {
      var hImage: HTMLImageElement = <HTMLImageElement>this.create('IMG', StringUtil.nvl(styleName, 'Tag_Icon'));
      hImage.align = 'absmiddle';
      if (code) {
         hImage.src = this.iconPath(code);
      }
      if (width) {
         hImage.style.width = width + 'px';
      }
      if (height) {
         hImage.style.height = height + 'px';
      }
      return hImage;
   }

   //==========================================================
   // <T>创建一个页面图片对象。</T>
   //
   // @param styleName 样式名称
   // @param uri 图片路径
   // @param width 图片高度
   // @param height 图片宽度
   // @return 页面图片对象
   //==========================================================
   public createImage(styleName?: any, url?: any, width?: any, height?: any) {
      var hImage = this.create('IMG', styleName);
      if (url) {
         // hImage.src = RResource.imagePath(uri);
      }
      if (width) {
         hImage.style.width = width + 'px';
      }
      if (height) {
         hImage.style.height = height + 'px';
      }
      return hImage;
   }

   //==========================================================
   // <T>创建一个页面文本对象。</T>
   //
   // @param styleName 样式名称
   // @param text 内容
   // @return 页面文本对象
   //==========================================================
   public createText(styleName?: string, text?: string) {
      var hText = this.create('SPAN', styleName);
      if (text) {
         hText.innerHTML = text;
      }
      return hText;
   }

   //==========================================================
   // <T>创建一个页面按钮对象。</T>
   //
   // @param styleName 样式名称
   // @return 页面复选框对象
   //==========================================================
   public createButton(styleName?: string) {
      var hButton: HTMLInputElement = this.create("INPUT", styleName) as HTMLInputElement;
      hButton.type = 'button';
      return hButton;
   }

   //==========================================================
   // <T>创建一个页面复选框对象。</T>
   //
   // @param styleName 样式名称
   // @return 页面复选框对象
   //==========================================================
   public createCheck(styleName?: string) {
      var hCheck: HTMLInputElement = this.create("INPUT", styleName) as HTMLInputElement;
      hCheck.type = 'checkbox';
      return hCheck;
   }

   //==========================================================
   // <T>创建一个页面单选框对象。</T>
   //
   // @param styleName 样式名称
   // @return 页面单选框对象
   //==========================================================
   public createRadio(styleName?: string) {
      var hRadio: HTMLInputElement = this.create("INPUT", styleName) as HTMLInputElement;
      hRadio.type = 'radio';
      return hRadio;
   }

   //==========================================================
   // <T>创建一个页面编辑框对象。</T>
   //
   // @param styleName 样式名称
   // @return 页面编辑框对象
   //==========================================================
   public createEdit(styleName?: string): HTMLInputElement {
      var hInput: HTMLInputElement = this.create("INPUT", styleName) as HTMLInputElement;
      hInput.type = 'text';
      return hInput;
   }

   //==========================================================
   // <T>创建一个页面文件对象。</T>
   //
   // @param styleName 样式名称
   // @return 页面编辑框对象
   //==========================================================
   public createFile(styleName?: string): HTMLInputElement {
      var hInput: HTMLInputElement = this.create("INPUT", styleName) as HTMLInputElement;
      hInput.type = 'file';
      return hInput;
   }

   //==========================================================
   // <T>创建一个页面浮动块对象。</T>
   //
   // @param styleName 样式名称
   // @return 页面浮动块对象
   //==========================================================
   public createSpan(styleName): HTMLSpanElement {
      return this.create('SPAN', styleName) as HTMLSpanElement;
   }

   //==========================================================
   // <T>创建一个页面浮动块对象。</T>
   //
   // @param styleName 样式名称
   // @return 页面浮动块对象
   //==========================================================
   public createDiv(styleName?: any): HTMLDivElement {
      return this.create('DIV', styleName) as HTMLDivElement;
   }

   //==========================================================
   // <T>创建一个页面表格。</T>
   //
   // @param styleName 样式名称
   // @param border 边框宽度
   // @param cellSpaceing 单元格之间的宽度
   // @param cellPadding 单元格内文字与单元格边框之间的距离
   // @return 表格对象
   //==========================================================
   public createTable(styleName: string, border?: any, cellSpaceing?: any, cellPadding?: any): HTMLTableElement {
      var hElement: HTMLTableElement = this.create('TABLE', styleName) as HTMLTableElement;
      hElement.border = border || 0;
      hElement.cellSpacing = cellSpaceing || 0;
      hElement.cellPadding = cellPadding || 0;
      return hElement;
   }

   //==========================================================
   // <T>创建一个页面表格行。</T>
   //
   // @param styleName 样式名称
   // @return 表格行对象
   //==========================================================
   public createTableRow(styleName): HTMLTableRowElement {
      return <HTMLTableRowElement>this.create('TR', styleName);
   }

   //==========================================================
   // <T>创建一个页面表格格子。</T>
   //
   // @param styleName 样式名称
   // @return 表格格子对象
   //==========================================================
   public createTableCell(styleName): HTMLTableCellElement {
      return <HTMLTableCellElement>this.create('TD', styleName);
   }

   //==========================================================
   // <T>追加一个页面对象，如果存在父容器就放在里面，没有就放在当前页面里。</T>
   //
   // @param hTag 页面标签
   // @param tagName 标签名称
   // @param styleName 样式名称
   // @return 页面对象
   //==========================================================
   public append(hParent: HTMLElement, tagName: string, styleName?: string) {
      AssertUtil.debugNotNull(hParent);
      AssertUtil.debugNotEmpty(tagName);
      var hElement = this.create(tagName, styleName);
      hParent.appendChild(hElement);
      return hElement;
   }

   //==========================================================
   // <T>追加一个页面图标对象，放在父容器里面，并返回这个对象。</T>
   //
   // @param hParent 页面标签
   // @param styleName 样式名称
   // @param url 图片路径
   // @param width 图片高度
   // @param height 图片宽度
   // @return 页面图标对象
   //==========================================================
   public appendIcon(hParent, styleName?: string, code?: string, width?: any, height?: any) {
      var hIcon = this.createIcon(styleName, code, width, height);
      hParent.appendChild(hIcon);
      return hIcon;
   }

   //==========================================================
   // <T>追加一个页面图片对象，放在父容器里面，并返回这个对象。</T>
   //
   // @param hParent 页面标签
   // @param styleName 样式名称
   // @param url 图片路径
   // @param width 图片高度
   // @param height 图片宽度
   // @return HtmlImgTag 页面图片对象
   //==========================================================
   public appendImage(hParent, styleName?: string, url?: string, width?: any, height?: any) {
      var hImage = this.createImage(styleName, url, width, height);
      hParent.appendChild(hImage);
      return hImage;
   }

   //==========================================================
   // <T>追加一个空白页面图标对象，放在父容器里面，并返回这个对象。</T>
   //
   // @param hParent 页面标签
   // @param width 图片的显示宽度
   // @param height 图片的显示宽度
   // @return 空白页面图标对象
   //==========================================================
   public appendEmpty(hParent, width, height) {
      var hResult = this.createIcon(null, 'n', width, height);
      hParent.appendChild(hResult);
      return hResult;
   }

   //==========================================================
   // <T>追加一个页面文本对象，放在父容器里面，并返回这个对象。</T>
   //
   // @param hParent 页面标签
   // @param styleName 样式名称
   // @param text 内容
   // @return 页面文本对象
   //==========================================================
   public appendText(hParent, styleName?: string, text?: string) {
      var hResult = this.createText(styleName, text);
      hParent.appendChild(hResult);
      return hResult;
   }

   //==========================================================
   // <T>追加一个页面按钮对象，放在父容器里面，并返回这个对象。</T>
   //
   // @param hParent 页面标签
   // @param styleName 样式名称
   // @return 页面按钮对象
   //==========================================================
   public appendButton(hParent, styleName?: string) {
      var hResult = this.createButton(styleName);
      hParent.appendChild(hResult);
      return hResult;
   }

   //==========================================================
   // <T>追加一个页面复选框对象，放在父容器里面，并返回这个对象。</T>
   //
   // @param hParent 页面标签
   // @param styleName 样式名称
   // @return 页面复选框对象
   //==========================================================
   public appendCheck(hParent, styleName?: string) {
      var hResult = this.createCheck(styleName);
      hParent.appendChild(hResult);
      return hResult;
   }

   //==========================================================
   // <T>追加一个页面单选框对象，放在父容器里面，并返回这个对象。</T>
   //
   // @param hParent 页面标签
   // @param styleName 样式名称
   // @return 页面单选框对象
   //==========================================================
   public appendRadio(hParent, styleName?: string) {
      var hResult = this.createRadio(styleName);
      hParent.appendChild(hResult);
      return hResult;
   }

   //==========================================================
   // <T>追加一个页面编辑框对象，放在父容器里面，并返回这个对象。</T>
   //
   // @param hParent 页面标签
   // @param styleName 样式名称
   // @return 页面编辑框对象
   //==========================================================
   public appendEdit(hParent, styleName?: string): HTMLInputElement {
      var hInput = this.createEdit(styleName);
      hParent.appendChild(hInput);
      return hInput;
   }

   //==========================================================
   // <T>追加一个页面文件框对象，放在父容器里面，并返回这个对象。</T>
   //
   // @param hParent 页面标签
   // @param styleName 样式名称
   // @return 页面编辑框对象
   //==========================================================
   public appendFile(hParent, styleName?: string): HTMLInputElement {
      var hInput = this.createFile(styleName);
      hParent.appendChild(hInput);
      return hInput;
   }

   //==========================================================
   // <T>创建一个页面浮动块对象。</T>
   //
   // @param hParent 页面标签
   // @param styleName 样式名称
   // @return 页面浮动块对象
   //==========================================================
   public appendSpan(hParent: HTMLElement, styleName?: string): HTMLSpanElement {
      var hSpan = this.createSpan(styleName);
      hParent.appendChild(hSpan);
      return hSpan;
   }

   //==========================================================
   // <T>创建一个页面浮动块对象。</T>
   //
   // @param hParent 页面标签
   // @param styleName 样式名称
   // @return 页面浮动块对象
   //==========================================================
   public appendDiv(hParent: HTMLElement, styleName?: string): HTMLDivElement {
      var hResult = this.createDiv(styleName);
      hParent.appendChild(hResult);
      return hResult;
   }

   //==========================================================
   // <T>追加一个页面表格对象，放在父容器里面，并返回这个表格对象。</T>
   //
   // @param parent 页面标签
   // @param styleName 样式名称
   // @param border 边框宽度
   // @param cellSpaceing 单元格之间的宽度
   // @param cellPadding 单元格内文字与单元格边框之间的距离
   // @return 表格对象
   //==========================================================
   public appendTable(hParent: HTMLElement, styleName?: any, border?: any, cellSpaceing?: any, cellPadding?: any): HTMLTableElement {
      var hElement = this.createTable(styleName, border, cellSpaceing, cellPadding);
      hParent.appendChild(hElement);
      return hElement;
   }

   //==========================================================
   // <T>追加一个页面行对象，并返回这个页面行对象。</T>
   //
   // @param hParent 表格容器
   // @param styleName 样式名称
   // @param index 索引位置
   // @param height 行高度
   // @return 页面行对象
   //==========================================================
   public appendTableRow(hParent: HTMLTableElement, styleName?: any, index?: any, height?: any): HTMLTableRowElement {
      var hResult = null;
      if (index == null) {
         //if (RBrowser.isBrowser(EBrowser.Explorer)) {
         hResult = hParent.insertRow();
         //} else {
         //   r = p.insertRow(-1);
         //}
      } else {
         hResult = hParent.insertRow(index);
      }
      if (styleName) {
         hResult.className = styleName;
      }
      if (height) {
         hResult.height = height;
      }
      return hResult;
   }

   //==========================================================
   // <T>追加一个页面行对象，并返回这个页面行对象。</T>
   //
   // @param hParent 表格容器
   // @param styleName 样式名称
   // @param index 索引位置
   // @param width 行宽度
   // @return 页面行对象
   //==========================================================
   public appendTableCell(hParent: HTMLTableRowElement, styleName?: any, index?: any, width?: any): HTMLTableCellElement {
      var hCell = null;
      if (index == null) {
         hCell = this.create('TD', styleName);
         hParent.appendChild(hCell);
         //if(RBrowser.isBrowser(MO.EBrowser.Explorer)){
         //   r = p.insertCell();
         //}else{
         //   r = p.insertCell(-1);
         //}
      } else {
         hCell = hParent.insertCell(index);
      }
      if (styleName) {
         hCell.className = styleName;
      }
      if (width) {
         hCell.width = width;
      }
      return hCell;
   }

   //==========================================================
   // <T>追加一个页面行对象，并返回这个页面行对象。</T>
   //
   // @param hParent 表格容器
   // @param styleName 样式名称
   // @param width 行宽度
   // @param height 行高度
   // @return 页面行对象
   //==========================================================
   public appendTableRowCell(hParent: HTMLTableElement, styleName?: any, width?: any, height?: any): HTMLTableCellElement {
      var hRow = this.appendTableRow(hParent, null, null, width);
      var hCell = this.appendTableCell(hRow, styleName, null, height);
      return hCell;
   }
}