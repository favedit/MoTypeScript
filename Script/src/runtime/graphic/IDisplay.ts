import {Objects} from '../common/lang/Objects';
import {SPoint3} from '../common/math/SPoint3';
import {SVector3} from '../common/math/SVector3';
import {IDrawable} from './IDrawable';
import {IRenderable} from './IRenderable';
//import {FRegion} from './FRegion';

//==========================================================
// <T>显示对象。</T>
//
// @author maocy
// @history 160305
//==========================================================
export interface IDisplay extends IDrawable {
   // 位置
   position: SPoint3;
   // 旋转
   rotation: SVector3;
   // 缩放
   scale: SVector3;
   // 渲染集合
   renderables: Objects<IRenderable>;

   //==========================================================
   // <T>判断是否含有渲染对象。</T>
   //
   // @return 是否含有
   //==========================================================
   hasRenderable(): boolean;

   //==========================================================
   // <T>增加一个渲染对象。</T>
   //
   // @param renderable 渲染对象
   //==========================================================
   pushRenderable(renderable: IRenderable): void;

   //==========================================================
   // <T>移除一个渲染对象。</T>
   //
   // @param renderable 渲染对象
   //==========================================================
   removeRenderable(renderable: IRenderable): void;

   //==========================================================
   // <T>清空渲染对象集合。</T>
   //==========================================================
   clearRenderables(): void;

   // //==========================================================
   // // <T>逻辑处理。</T>
   // //
   // // @param region 区域
   // //==========================================================
   // public process(region: FRegion) ;
}