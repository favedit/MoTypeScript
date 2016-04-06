import {React} from './plugin/dui/React';
import {ScrollEnum} from './runtime/ui/ScrollEnum';
import {DirectionEnum} from './runtime/ui/DirectionEnum';
import {Material} from './runtime/graphic/material/Material';
import {Renderable} from './plugin/cl3d/base/Renderable';
import {Container} from './plugin/dui/Container';
import {Fragment} from './plugin/dui/Fragment';
import {FramePage} from './plugin/dui/frame/FramePage';
import {FrameSpliter} from './plugin/dui/frame/FrameSpliter';
import {TreeEvent} from './plugin/dui/tree/TreeEvent';
import {MaterialUi} from './property/MaterialUi';
import {RenderableUi} from './property/RenderableUi';
import {FrameSet} from './base/FrameSet';
import {ToolBarUi} from './ToolBarUi';
import {CatalogUi} from './CatalogUi';

export class FrameSetUi extends FrameSet {

   public toolBar;

   public catalog: CatalogUi;

   public builded() {
      // this.catalog.selectObjectListeners.register(this, this.onCatalogNodeClick);
      // var a = this.propertyPage;
      // debugger
   }

   public onCatalogNodeClick(sender, event: TreeEvent) {
      var tag = event.node.tag;
      if (tag instanceof Material) {
         this.selectFrame(MaterialUi);
      } else if (tag instanceof Renderable) {
         this.selectFrame(RenderableUi);
      }
   }

   public render() {
      return <Fragment direction_cd={DirectionEnum.Vertical}>
         <FramePage style_class='FrameSet_ToolBar_Ground' height='24'>
            <ToolBarUi linker='toolBar'></ToolBarUi>
         </FramePage>
         <FramePage >
            <FrameSet direction_cd={DirectionEnum.Horizontal}>
               <FramePage style_class='FrameSet_Catalog_Content' width='400'>
                  <CatalogUi linker='catalog' onnodeclick='onCatalogNodeClick'/>
               </FramePage>
               <FrameSpliter/>
               <FramePage style_class='FrameSet_Canvas_Content'>
                  <canvas id='id_canvas3d'/>
               </FramePage>
               <FrameSpliter/>
               <FramePage linker='propertyContainer' style_class='FrameSet_Property_Content' width='300' scroll_cd={ScrollEnum.VerticalAuto}/>
            </FrameSet>
         </FramePage>
         <FramePage style_class= 'FrameSet_StatusBar_Ground' height='24'></FramePage>
      </Fragment>
   }
}