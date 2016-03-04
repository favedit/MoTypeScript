
export class DebugError extends Error{
    reportErrorToServer: boolean;

    constructor(a){
      super();
      if ((<any>Error).captureStackTrace)
          (<any>Error).captureStackTrace(this, DebugError);
      else {
          var b = (<any>Error()).stack;
          b && ((<any>this).stack = b)
      }
      a && (this.message = String(a));
      this.reportErrorToServer = !0
    }

}
