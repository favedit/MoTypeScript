import {EScope} from '../../../../runtime/common/lang/EScope';
import {FError} from '../../../../runtime/common/lang/FError';
import {FDictionary} from '../../../../runtime/common/lang/FDictionary';
import {RClass} from '../../../../runtime/common/reflect/RClass';
import {FConsole} from '../../../../runtime/core/FConsole';

//==========================================================
// <T>技术管理器。</T>
//
// @author maocy
// @history 150107
//==========================================================
export class FG3dTechniqueConsole extends FConsole {
   // @attribute
   protected _scopeCd = EScope.Local;
   //o._techniques = MO.Class.register(o, new MO.AGetter('_techniques'));
   protected _techniques: FDictionary = new FDictionary();

   //==========================================================
   // <T>根据类名称或对象获得技术器。</T>
   //
   // @method
   // @param context:FG3dContext 环境对象
   // @param clazz:Function 类对象
   // @return FG3dTechnique 效果器
   //==========================================================
   public find(context, clazz) {
      var o = this;
      // 获得环境
      if (!RClass.isClass(context, context.FGraphicContext)) {
         context = context.graphicContext();
      }
      if (!RClass.isClass(context, context.FGraphicContext)) {
         throw new FError(o, 'Unknown context.');
      }
      // 查找技术
      var code = context.hashCode() + '|' + RClass.name(clazz);
      var techniques = o._techniques;
      var technique = techniques.get(code);
      if (!technique) {
         // 创建技术
         technique = RClass.create(clazz);
         technique.linkGraphicContext(context);
         technique.setup();
         var techniqueCode = technique.code();
         // 设置过程集合
         var passes = technique.passes();
         var passCount = passes.count();
         for (var i = 0; i < passCount; i++) {
            var pass = passes.at(i);
            var passCode = pass.code();
            pass.setFullCode(techniqueCode + '.' + passCode);
         }
         // 存储技术
         techniques.set(code, technique);
      }
      return technique;
   }
}
