import {Vertex} from '../core/brep/Vertex';
declare var hsw;
export class Content extends Vertex{

  rotation:number ;
  z:number;
  variationId;
  XLength:number;
  YLength:number;
  ZLength:number;
  XScale:number;
  YScale:number;
  ZScale:number;
  seekId;
  unit:string;
  type;

  modelTexture:string;
  model3d:string;
  topView:string;

  metadata;
  _host;
  group;
  contents;

  public constructor(){
    super();

    this.variationId = this.seekId = "";
    this.unit = "m";
    this.type = hsw.catalog.ContentTypeEnum.decorative;
    this.ZScale = this.YScale = this.XScale = this.ZLength = this.YLength = this.XLength = 1;

    this.modelTexture = this.model3d = this.topView = "";
    this.metadata = this._host = this.group = null ;
    this.contents = {}
  }
}
