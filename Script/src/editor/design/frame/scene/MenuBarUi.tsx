import {Container} from './plugin/dui/Container';
import {MenuButton} from './plugin/dui/menu/MenuButton';
import {MenuButtonMenu} from './plugin/dui/menu/MenuButtonMenu';
import {MenuBar} from './plugin/dui/menu/MenuBar';
import {React} from './plugin/dui/React';

export class MenuBarUi extends Container {

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
      return <MenuBar>
         <MenuButtonMenu icon='tools.file' label='文件' onclick='onButtonSaveClick'>
            <MenuButton icon='tools.file' label='新建' onclick='onButtonSaveClick'/>
            <MenuButton icon='tools.file' label='打开' onclick='onButtonSaveClick'/>
            <MenuButton icon='tools.file' label='保存' onclick='onButtonSaveClick'/>
            <MenuButton icon='tools.file' label='删除' onclick='onButtonSaveClick'/>
            <MenuButton icon='tools.file' label='导出' onclick='onButtonSaveClick'/>
            <MenuButton icon='tools.file' label='导入' onclick='onButtonSaveClick'/>
         </MenuButtonMenu>
         <MenuButton icon='tools.edit' label='编辑' onclick='onButtonSaveClick'></MenuButton>
         <MenuButton icon='tools.add' label='添加' onclick='onButtonSaveClick'></MenuButton>
         <MenuButton icon='tools.play' label='播放' onclick='onButtonSaveClick'></MenuButton>
         <MenuButton icon='tools.tools' label='工具' onclick='onButtonSaveClick'></MenuButton>
         <MenuButton icon='tools.help' label='帮助' onclick='onButtonSaveClick'></MenuButton>
      </MenuBar>;
   }
}