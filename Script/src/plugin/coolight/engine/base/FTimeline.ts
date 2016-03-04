//==========================================================
// <T>时间线对象。</T>
//
// @class
// @author maocy
// @history 150710
//==========================================================
export class FTimeline{
    //    o = MO.Class.inherits(this, o, MO.FObject, MO.MListener, MO.MTimelineActions, MO.MTimelineSections, MO.MTimelines);
    //    //..........................................................
    //    // @attribute
    //    o._mainTimeline = MO.Class.register(o, new MO.AGetter('_mainTimeline'));
    //    //..........................................................
    //    // @method
    //    o.construct     = MO.FTimeline_construct;
    //    // @method
    //    o.process       = MO.FTimeline_process;
    //    o.stop          = MO.FTimeline_stop;
    //    o.clear         = MO.FTimeline_clear;
    //    // @method
    //    o.dispose       = MO.FTimeline_dispose;

    //==========================================================
    // <T>构造处理。</T>
    //
    // @method
    //==========================================================
    public constructor() {
        var o = this;
        o.__base.FObject.construct.call(o);
        o.__base.MTimelineActions.construct.call(o);
        o.__base.MTimelineSections.construct.call(o);
        o.__base.MTimelines.construct.call(o);
    }

//==========================================================
// <T>逻辑处理。</T>
//
// @method
// @param context:STimelineContext 环境
//==========================================================
public process(context) {
        var o = this;
        // 命令处理
        o.__base.MTimelineActions.process.call(o, context);
        // 段落处理
        o.__base.MTimelineSections.process.call(o, context);
        // 时间线处理
        o.__base.MTimelines.process.call(o, context);
    }

//==========================================================
// <T>停止处理。</T>
//
// @method
//==========================================================
public stop() {
        var o = this;
        o.__base.MTimelineActions.stop.call(o);
        o.__base.MTimelineSections.stop.call(o);
        o.__base.MTimelines.stop.call(o);
    }

//==========================================================
// <T>清空处理。</T>
//
// @method
//==========================================================
public clear() {
        var o = this;
        o.__base.MTimelineActions.clear.call(o);
        o.__base.MTimelineSections.clear.call(o);
        o.__base.MTimelines.clear.call(o);
    }

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
public dispose() {
        var o = this;
        // 父处理
        o.__base.MTimelines.dispose.call(o);
        o.__base.MTimelineSections.dispose.call(o);
        o.__base.MTimelineActions.dispose.call(o);
        o.__base.FObject.dispose.call(o);
    }
}