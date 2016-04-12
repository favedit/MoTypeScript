import {Container} from './plugin/dui/Container';
import {ToolBar} from './plugin/dui/toolbar/ToolBar';
import {ToolButton} from './plugin/dui/toolbar/ToolButton';
import {React} from './plugin/dui/React';

export class ToolBarUi extends Container {

   public onButtonCreateClick(sender, event) {
      debugger
   }

   public onButtonOpenClick(sender, event) {
      debugger
   }

   public onButtonSaveClick(sender, event) {
      var application = (window as any).MoApplication;
      application.saveDocument();
   }

   // <ToolButton icon='tools.create' label='新建' onclick='onButtonCreateClick'></ToolButton>
   // <ToolButton icon='tools.preview' label='打开' onclick='onButtonOpenClick'></ToolButton>

   public render() {
      return <ToolBar>
         <ToolButton icon='tools.save' label='保存' onclick='onButtonSaveClick'></ToolButton>
      </ToolBar>;
   }
}