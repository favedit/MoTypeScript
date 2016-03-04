//==========================================================
// <T>时间命令。</T>
//
// @class
// @author maocy
// @history 150610
//==========================================================
export class FE3dTransformTimelineAction {
    //    o = MO.Class.inherits(this, o, MO.MTimelineAction);
    //    //..........................................................
    //    // @attribute
    //    o._code            = 'transform';
    //    // @attribute
    //    o._sources         = null;
    //    // @attribute
    //    o._currentMatrix   = MO.Class.register(o, new MO.AGetter('_currentMatrix'));
    //    o._sourceMatrix    = MO.Class.register(o, new MO.AGetter('_sourceMatrix'));
    //    o._targetMatrix    = MO.Class.register(o, new MO.AGetter('_targetMatrix'));
    //    //..........................................................
    //    // @method
    //    o.onStart          = MO.FE3dTransformTimelineAction_onStart;
    //    o.onProcess        = MO.FE3dTransformTimelineAction_onProcess;
    //    o.onStop           = MO.FE3dTransformTimelineAction_onStop;
    //    //..........................................................
    //    // @method
    //    o.construct        = MO.FE3dTransformTimelineAction_construct;
    //    // @method
    //    o.linkSource       = MO.FE3dTransformTimelineAction_linkSource;
    //    // @method
    //    o.dispose          = MO.FE3dTransformTimelineAction_dispose;

    // //==========================================================
    // // <T>构造处理。</T>
    // //
    // // @method
    // //==========================================================
    // public constructor() {
    //     var o = this;
    //     o.__base.MTimelineAction.construct.call(o);
    //     o._currentMatrix = new MO.SMatrix3d();
    //     o._sourceMatrix = new MO.SMatrix3d();
    //     o._targetMatrix = new MO.SMatrix3d();
    // }
    
    // //==========================================================
    // // <T>开始事件处理。</T>
    // //
    // // @method
    // //==========================================================
    // public onStart() {
    //     var o = this;
    //     o.__base.MTimelineAction.onStart.call(o);
    // }

    // //==========================================================
    // // <T>逻辑事件处理。</T>
    // //
    // // @method
    // //==========================================================
    // public onProcess() {
    //     var o = this;
    //     o.__base.MTimelineAction.onProcess.call(o, context);
    //     // 计算方向
    //     var direction = o._currentDirection;
    //     direction.direction(o._sourcePosition, o._targetPosition);
    //     direction.normalize();
    //     // 计算移动
    //     var moveLength = o._speed * context.spanSecond;
    //     var length = o._currentPosition.lengthToValue3(o._targetPosition);
    //     if (moveLength > length) {
    //         o._currentPosition.assign(o._targetPosition);
    //         o._statusStop = true;
    //     } else {
    //         o._currentPosition.add(direction.x * moveLength, direction.y * moveLength, direction.z * moveLength);
    //     }
    //     // 更新相机
    //     o._camera.position().assign(o._currentPosition);
    //     o._camera.update();
    // }

    // //==========================================================
    // // <T>结束事件处理。</T>
    // //
    // // @method
    // //==========================================================
    // public onStop() {
    //     var o = this;
    //     o.__base.MTimelineAction.onStop.call(o);
    // }

    // //==========================================================
    // // <T>构造处理。</T>
    // //
    // // @method
    // //==========================================================
    // public linkSource(source) {
    //     var o = this;
    //     var matrix = source.matrix();
    //     o._currentMatrix.assign(matrix);
    //     o._sourceMatrix.assign(matrix);
    //     o._targetMatrix.assign(matrix);
    // }

    // //==========================================================
    // // <T>构造处理。</T>
    // //
    // // @method
    // //==========================================================
    // public setTargetControl() {
    //     var o = this;
    // }

    // //==========================================================
    // // <T>释放处理。</T>
    // //
    // // @method
    // //==========================================================
    // public dispose() {
    //     var o = this;
    //     // 父处理
    //     o.__base.MTimelineAction.dispose.call(o);
    // }
}