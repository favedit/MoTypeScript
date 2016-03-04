//==========================================================
// <T>舞台对象。</T>
//
// @class
// @author maocy
// @history 150106
//==========================================================
export class FStage {
    //    o = MO.Class.inherits(this, o, MO.FComponent, MO.MListener);
    //    //..........................................................
    //    // @attribute
    //    o._code                = 'stage';
    //    o._statusActive        = false;
    //    o._size                = MO.Class.register(o, new MO.AGetter('_size'));
    //    o._timer               = MO.Class.register(o, new MO.AGetter('_timer'));
    //    o._layers              = MO.Class.register(o, new MO.AGetter('_layers'));
    //    // @attribute
    //    o._enterFrameListeners = MO.Class.register(o, new MO.AListener('_enterFrameListeners', MO.EEvent.EnterFrame));
    //    o._leaveFrameListeners = MO.Class.register(o, new MO.AListener('_leaveFrameListeners', MO.EEvent.LeaveFrame));

    //==========================================================
    // <T>构造处理。</T>
    //
    // @method
    //==========================================================
    public constructor() {
        super();
        // 设置变量
        this._size = new SSize2(1920, 1080);
        this._timer = RClass.create(MO.FTimer);
        this._layers = new FDictionary();
    }

    //==========================================================
    // <T>逻辑处理。</T>
    //
    // @method
    //==========================================================
    public onProcess() {
        var o = this;
        // 舞台处理
        var layers = o._layers;
        var count = layers.count();
        for (var i = 0; i < count; i++) {
            var layer = layers.at(i);
            layer.process();
        }
    }
    
    //==========================================================
    // <T>注册一个显示层。</T>
    //
    // @method
    // @param code:String 名称
    // @param layer:FDisplayLayer 显示层
    //==========================================================
    public registerLayer(code, layer) {
        layer.setCode(code);
        this._layers.set(code, layer);
    }

    //==========================================================
    // <T>注销一个显示层。</T>
    //
    // @method
    // @param n:name:String 名称
    //==========================================================
    public unregisterLayer(code) {
        this._layers.set(code, null);
    }

    //==========================================================
    // <T>激活处理。</T>
    //
    // @method
    //==========================================================
    public active() {
        var o = this;
        // 设置状态
        o._statusActive = true;
        // 层集合处理
        var layers = o._layers;
        var count = layers.count();
        for (var i = 0; i < count; i++) {
            var layer = layers.at(i);
            layer.active();
        }
    }

    //==========================================================
    // <T>取消激活处理。</T>
    //
    // @method
    //==========================================================
    public deactive() {
        var o = this;
        // 层集合处理
        var layers = o._layers;
        var count = layers.count();
        for (var i = 0; i < count; i++) {
            var layer = layers.at(i);
            layer.deactive();
        }
        // 设置状态
        o._statusActive = false;
    }

    //==========================================================
    // <T>逻辑处理。</T>
    //
    // @method
    //==========================================================
    public process() {
        var o = this;
        // 设置计时器
        var timer = o._timer;
        if (!timer) {
            timer = MO.Class.create(MO.FTimer);
            timer.setup();
        }
        //..........................................................
        // 前处理
        o.processEnterFrameListener(o);
        // 逻辑处理
        o.onProcess();
        // 后处理
        o.processLeaveFrameListener(o);
        //..........................................................
        // 计时器更新
        timer.update();
    }

    //==========================================================
    // <T>释放处理。</T>
    //
    // @method
    //==========================================================
    public dispose() {
        var o = this;
        o._timer = MO.Lang.Object.dispose(o._timer);
        o._layers = MO.Lang.Object.dispose(o._layers);
        // 父处理
        o.__base.MListener.dispose.call(o);
        o.__base.FComponent.dispose.call(o);
    }
}