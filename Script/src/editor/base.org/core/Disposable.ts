import * as goog from '../util/index';

export enum MonitoringMode{
  OFF,
  PERMANENT,
  INTERACTIVE,
}

export class Disposable{

  static MONITORING_MODE = 0;
  static INCLUDE_STACK_ON_CREATION = true;
    disposed_: any;
    onDisposeCallbacks_: any;
  static  instances_;
  getUndisposedObjects(){
    var a = [], b;
      for (b in Disposable.instances_)
          Disposable.instances_.hasOwnProperty(b) && a.push(Disposable.instances_[Number(b)]);
      return a
  }

  static clearUndisposedObjects(){
    Disposable.instances_ = {}
  }

  getDisposed(){
    return this.disposed_
  }

  dispose(){
    if (!this.disposed_ && (this.disposed_ = !0,
       this.disposeInternal(),
       Disposable.MONITORING_MODE != MonitoringMode.OFF)) {
           var a = (goog as any).getUid(this);
           if (Disposable.MONITORING_MODE == MonitoringMode.PERMANENT && ! Disposable.instances_.hasOwnProperty(a))
               throw Error(this + " did not call the goog.Disposable base constructor or was disposed of after a clearUndisposedObjects call");
           delete Disposable.instances_[a]
       }
  }

  registerDisposable(a){
    this.addOnDisposeCallback((goog as any).partial((goog as any).dispose, a))
  }

  addOnDisposeCallback(a,b?:any){
    this.disposed_ ? a.call(b) : (this.onDisposeCallbacks_ || (this.onDisposeCallbacks_ = []),
      this.onDisposeCallbacks_.push((goog as any).isDef(b) ? (goog as any).bind(a, b) : a))
  }

  disposeInternal(){
    if (this.onDisposeCallbacks_)
        for (; this.onDisposeCallbacks_.length; )
            this.onDisposeCallbacks_.shift()()
  }

  isDisposed(a){
     return a && "function" == typeof a.isDisposed ? a.isDisposed() : !1
  }
}
