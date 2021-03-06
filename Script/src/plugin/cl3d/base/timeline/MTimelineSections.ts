//==========================================================
// <T>时间线段落集合。</T>
//
// @class
// @author maocy
// @history 150713
//==========================================================
export class MTimelineSections {
    //    o = MO.Class.inherits(this, o);
    //    //..........................................................
    //    // @attribute
    //    o._currentSection   = MO.Class.register(o, new MO.AGetter('_currentSection'));
    //    o._sections         = MO.Class.register(o, new MO.AGetter('_sections'));
    //    //..........................................................
    //    // @method
    //    o.construct         = MO.MTimelineSections_construct;
    //    // @method
    //    o.pushSection       = MO.MTimelineSections_pushSection;
    //    o.pushSectionAction = MO.MTimelineSections_pushSectionAction;
    //    // @method
    //    o.process           = MO.MTimelineSections_process;
    //    o.stop              = MO.MTimelineSections_stop;
    //    o.clear             = MO.MTimelineSections_clear;
    //    // @method
    //    o.dispose           = MO.MTimelineSections_dispose;

    // //==========================================================
    // // <T>构造处理。</T>
    // //
    // // @method
    // //==========================================================
    // public constructor() {
    //     var o = this;
    //     // 设置属性
    //     o._sections = new FObjects();
    // }

    // //==========================================================
    // // <T>增加一个段落。</T>
    // //
    // // @method
    // // @param section:FTimelineSection 段落
    // //==========================================================
    // public pushSection(section) {
    //     var o = this;
    //     MO.Assert.debugNotNull(section);
    //     o._sections.push(section);
    // }

    // //==========================================================
    // // <T>增加一个命令。</T>
    // //
    // // @method
    // // @param action:MTimelineAction 命令
    // //==========================================================
    // public pushSectionAction(action, loopCd, loopCount) {
    //     var o = this;
    //     MO.Assert.debugNotNull(action);
    //     var section = MO.Class.create(MO.FTimelineSection);
    //     section.pushAction(action, loopCd, loopCount);
    //     o._sections.push(section);
    // }

    // //==========================================================
    // // <T>逻辑处理。</T>
    // //
    // // @method
    // // @param context:STimelineContext 环境
    // //==========================================================
    // public process(context) {
    //     var o = this;
    //     var sections = o._sections;
    //     // 获得活动的段落
    //     var section = o._currentSection;
    //     if (!section) {
    //         if (!sections.isEmpty()) {
    //             section = o._currentSection = sections.shift();
    //         }
    //     }
    //     // 段落处理
    //     if (section) {
    //         section.process(context);
    //         // 测试完成
    //         if (section.testStop()) {
    //             section.stop(context);
    //             section.dispose();
    //             o._currentSection = null;
    //         }
    //     }
    // }

    // //==========================================================
    // // <T>停止处理。</T>
    // //
    // // @method
    // //==========================================================
    // public stop() {
    //     var o = this;
    //     var sections = o._sections;
    //     var count = sections.count();
    //     for (var i = 0; i < count; i++) {
    //         var section = sections.at(i);
    //         section.stop();
    //     }
    // }

    // //==========================================================
    // // <T>清空处理。</T>
    // //
    // // @method
    // //==========================================================
    // public clear() {
    //     var o = this;
    //     var sections = o._sections;
    //     var count = sections.count();
    //     for (var i = 0; i < count; i++) {
    //         var section = sections.at(i);
    //         section.clear();
    //     }
    //     sections.clear();
    //     o._currentSection = null;
    // }

    // //==========================================================
    // // <T>释放处理。</T>
    // //
    // // @method
    // //==========================================================
    // public dispose() {
    //     var o = this;
    //     // 释放属性
    //     o._sections = MO.Lang.Object.dispose(o._sections);
    //     o._currentSection;
    // }
}