//==========================================================
// <T>时间线环境。</T>
//
// @class
// @author maocy
// @history 150710
//==========================================================
export class STimelineContext {
    //..........................................................
    // @attribute
    public mainTimeline = null;
    public timeline = null;
    public action = null;
    //..........................................................
    // @attribute 主时间轴开始到现在的时刻
    public tick = null;
    // @attribute 当前对象开始到现在的时刻
    public currentTick = null;
    // @attribute 当前帧执行的间隔
    public frameSpan = null;
}
