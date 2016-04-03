import {ClassUtil} from './runtime/common/reflect/ClassUtil';
import {RenderContext} from './RenderContext';
import {Control} from './Control';
import {React} from './React';

export class Render {

   public hDocument: HTMLDocument;

   public hPanel: HTMLElement;

   public context: RenderContext;

   public constructor(hPanel?: HTMLElement) {
      this.hPanel = hPanel;
      if (hPanel) {
         this.setup();
      }
   }

   public setup() {
      // 设置文档
      var hDocument = this.hDocument = this.hPanel.ownerDocument;
      // 创建环境
      var context = this.context = new RenderContext();
      context.hDocument = hDocument;
   }

   public create(clazz): any {
      var context = this.context;
      var control: Control = ClassUtil.create(clazz);
      control.renderContext = this.context;
      control.setup(context);
      control.build(context);
      return control;
   }

   public render(control: Control, hPanel?: any) {
      React.render(this.context, control, control, control);

      //control.setPanel(this.hPanel);
      //control.build(this.context);
      //(component as any).setPanel(this.hPanel);
   }
}