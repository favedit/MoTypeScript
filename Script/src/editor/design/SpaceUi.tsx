import {DirectionEnum} from './runtime/ui/DirectionEnum';
import {Container} from './plugin/dui/Container';
import {FramePage} from './plugin/dui/frame/FramePage';
import {FrameSpliter} from './plugin/dui/frame/FrameSpliter';
import {FrameSet} from './plugin/dui/frame/FrameSet';
import {React} from './plugin/dui/React';
import {ToolBarUi} from './frame/ToolBarUi';

export class SpaceUi extends Container {
   public render() {
      return <FrameSet direction_cd={DirectionEnum.Vertical}>
         <FramePage style_class='FrameSet_ToolBar_Ground' size='0,24'>
            <ToolBarUi></ToolBarUi>
         </FramePage>
         <FramePage>
            <FrameSet direction_cd={DirectionEnum.Horizontal}>
               <FramePage style_class='FrameSet_Catalog_Content' size='400,0'></FramePage>
               <FrameSpliter></FrameSpliter>
               <FramePage style_class='FrameSet_Canvas_Content'></FramePage>
               <FrameSpliter></FrameSpliter>
               <FramePage style_class='FrameSet_Property_Content' size='300,0'></FramePage>
            </FrameSet>
         </FramePage>
         <FramePage style_class='FrameSet_StatusBar_Ground' size='0,24'></FramePage>
      </FrameSet>
   }
}