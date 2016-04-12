import {React} from './plugin/dui/React';
import {ScrollEnum} from './runtime/ui/ScrollEnum';
import {DirectionEnum} from './runtime/ui/DirectionEnum';
import {Material} from './runtime/graphic/material/Material';
import {Renderable} from './plugin/cl3d/base/Renderable';
import {Container} from './plugin/dui/Container';
import {Fragment} from './plugin/dui/Fragment';
import {PageSheet} from './plugin/dui/page/PageSheet';
import {PageControl} from './plugin/dui/page/PageControl';
import {FramePage} from './plugin/dui/frame/FramePage';
import {FrameSpliter} from './plugin/dui/frame/FrameSpliter';
import {TreeEvent} from './plugin/dui/tree/TreeEvent';
import {MaterialUi} from './property/MaterialUi';
import {RenderableUi} from './property/RenderableUi';
import {FrameSet} from './base/FrameSet';
import {MenuBarUi} from './MenuBarUi';
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
      var frame = null;
      if (tag instanceof Material) {
         frame = this.selectFrame(MaterialUi);
      } else if (tag instanceof Renderable) {
         frame = this.selectFrame(RenderableUi);
      }
      if (frame) {
         frame.load(tag);
      }
   }

   public render() {
      return <Fragment direction_cd={DirectionEnum.Vertical}>
         <FramePage style_class='FrameSet_ToolBar_Ground' height='24'>
            <MenuBarUi linker='toolBar'></MenuBarUi>
         </FramePage>
         <FramePage>
            <FrameSet direction_cd={DirectionEnum.Horizontal}>
               <FramePage style_class='FrameSet_Canvas_Content'>
                  <FrameSet direction_cd={DirectionEnum.Vertical}>
                     <FramePage><canvas id='id_canvas3d'/></FramePage>
                     <FramePage style_class= 'FrameSet_StatusBar_Ground' height='24'></FramePage>
                  </FrameSet>
               </FramePage>
               <FrameSpliter/>
               <FramePage style_class='FrameSet_Property_Content' width='320' scroll_cd={ScrollEnum.VerticalAuto}>
                  <PageControl>
                     <PageSheet name='pageScene' label='场景'>
                        <CatalogUi linker='catalog' onnodeclick='onCatalogNodeClick'/>
                     </PageSheet>
                     <PageSheet  name='pageProperty' label='属性' linker='propertyContainer'>
                     </PageSheet>
                  </PageControl>
               </FramePage>
            </FrameSet>
         </FramePage>
      </Fragment>
   }
}