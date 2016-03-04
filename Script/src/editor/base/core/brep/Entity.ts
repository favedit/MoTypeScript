import {EventTarget} from '../EventTarget';
declare var hsw;
export class Entity extends EventTarget{
    _fieldChangedCallback: any;
    outline;
    boundInternal: any;
    children: {};
    _tempFlag: number;
    parents: {};
    ID: any;
    cache: {};
    _boundDirty: boolean;
    database: any;
    signalDirty: any;
    userDefined: {};
    _flag: number;
  isValid():boolean{
    return true;
  };

  defineField(a,b?:any){
    //var a:PropertyDescriptor
    Object.defineProperty(this, a, {
        writable: true,
        enumerable: !0,
        configurable: !1,
        get: function() {
            return this["__" + a]
        },
        set: function(b) {
            var d = this["__" + a];
            this["__" + a] = b;
            if (this._fieldChangedCallback[a])
                this._fieldChangedCallback[a](this, a, d, b)
        }
    });
    this._fieldChangedCallback = this._fieldChangedCallback || {};
    this._fieldChangedCallback[a] = b || hsw.core.brep.Entity.defaultFieldChangedCallback
}

  constructor(){
    super();
    this._tempFlag = this._flag = 0;
    this.parents = {};
    this.children = {};
    this.boundInternal = new hsw.core.brep.Bound(Infinity,Infinity,0,0);
    this.outline = [];
    this._boundDirty = !0;
    this.cache = {};
    this.database[this.ID] = this;
    this.userDefined = {};
    this.signalDirty = new hsw.util.Signal(this)

  }
}
