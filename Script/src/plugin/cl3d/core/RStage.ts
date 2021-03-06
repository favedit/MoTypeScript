//==========================================================
// <T>舞台管理器。</T>
//
// @author maocy
// @history 141231
//==========================================================
export class RStage {
    //    //..........................................................
    //    // @attribute
    //    o._started       = false;
    //    o._thread        = null;
    //    o._active        = true;
    //    //o._interval      = 1000 / 60;
    //    o._interval      = 10;
    //    o._stages        = null;
    //    //..........................................................
    //    // @listener
    //    o.lsnsEnterFrame = null;
    //    o.lsnsLeaveFrame = null;
    //    //..........................................................
    //    // @construct
    //    o.construct();

    // //==========================================================
    // // <T>逻辑处理。</T>
    // //
    // // @method
    // //==========================================================
    // public static onProcess(event) {
    //     var o = this;
    //     // 检查参数
    //     if (!o._active) {
    //         return;
    //     }
    //     // 逻辑处理
    //     try {
    //         // 前处理
    //         o.lsnsEnterFrame.process(o);
    //         // 舞台处理
    //         var stages = o._stages;
    //         if (stages) {
    //             var count = stages.count();
    //             for (var i = 0; i < count; i++) {
    //                 var stage = stages.at(i);
    //                 stage.process();
    //             }
    //         }
    //         // 后处理
    //         o.lsnsLeaveFrame.process(o);
    //         MO.Timer.update();
    //     } catch (e) {
    //         alert(e);
    //     }
    // }

    // //==========================================================
    // // <T>构造处理。</T>
    // //
    // // @method
    // //==========================================================
    // public static constructor() {
    //     var o = this;
    //     o.lsnsEnterFrame = new MO.TListeners();
    //     o.lsnsLeaveFrame = new MO.TListeners();
    // }

    // //==========================================================
    // // <T>注册一个舞台。</T>
    // //
    // // @method
    // // @param name:String 名称
    // // @param stage:FStage 舞台
    // //==========================================================
    // public static register(name, stage) {
    //     var o = this;
    //     var stages = o._stages;
    //     if (!stages) {
    //         stages = o._stages = new MO.TDictionary();
    //     }
    //     stages.set(name, stage);
    // }

    // //==========================================================
    // // <T>注销一个舞台。</T>
    // //
    // // @method
    // // @param stage:FStage 舞台
    // //==========================================================
    // public static unregister(stage) {
    //     this._stages.removeValue(stage);
    // }

    // //==========================================================
    // // <T>激活处理。</T>
    // //
    // // @method
    // //==========================================================
    // public static active() {
    //     var o = this;
    //     var stages = o._stages;
    //     if (stages) {
    //         var count = stages.count();
    //         for (var i = 0; i < count; i++) {
    //             var stage = stages.at(i);
    //             stage.active();
    //         }
    //     }
    // }

    // //==========================================================
    // // <T>逻辑处理。</T>
    // //
    // // @method
    // //==========================================================
    // public static process() {
    //     this.onProcess();
    // }

    // //==========================================================
    // // <T>取消激活处理。</T>
    // //
    // // @method
    // //==========================================================
    // public static deactive() {
    //     var o = this;
    //     var stages = o._stages;
    //     if (stages) {
    //         var count = stages.count();
    //         for (var i = 0; i < count; i++) {
    //             var stage = stages.at(i);
    //             stage.deactive();
    //         }
    //     }
    // }

    // //==========================================================
    // // <T>启动处理。</T>
    // //
    // // @method
    // // @param interval:Integer 执行间隔
    // //==========================================================
    // public static start(interval) {
    //     var o = this;
    //     // 检查是否已经启动
    //     if (o._started) {
    //         return;
    //     }
    //     // 引擎配置
    //     MO.RE3dEngine.setup();
    //     // 激活舞台
    //     o.active();
    //     MO.Timer.setup();
    //     // 计算间隔时间
    //     if (interval == null) {
    //         interval = o._interval;
    //     }
    //     o._interval = parseInt(interval);
    //     // 启动线程
    //     var thread = o._thread = MO.Class.create(MO.FThread);
    //     thread.setInterval(o._interval);
    //     thread.addProcessListener(o, o.onProcess);
    //     MO.Console.find(MO.FThreadConsole).start(thread);
    //     // 设置标志
    //     o._started = true;
    // }
}