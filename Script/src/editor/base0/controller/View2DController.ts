export default class View2DController{

  private camFactor:number;
  private isDirty:boolean;
  private sensFactor:number = 0.03;

  static DefaultCamFactor:number = 0.15;
  static MaxCamFactor:number = 1;
  static MinCamFactor:number = 0.15;

  private _isEnable:boolean = false;

  constructor(private camera:THREE.OrthographicCamera,private domElement:HTMLCanvasElement){
    this.camFactor = View2DController.DefaultCamFactor;

    let onMouseWheel = (e:MouseWheelEvent)=>{
        //放大视图
        if(this._isEnable){
          if(e.wheelDelta > 0 && this.camFactor > View2DController.MinCamFactor){
            this.camFactor -= this.sensFactor;
            this.isDirty = true;
          }

          //缩小视图
          if(e.wheelDelta < 0 && this.camFactor < View2DController.MaxCamFactor){
            this.camFactor += this.sensFactor;
            this.isDirty = true;
          }

        }

    }
    this.domElement.addEventListener( 'mousewheel', onMouseWheel, false );
    this.domElement.addEventListener( 'MozMousePixelScroll', onMouseWheel, false ); // firefox

  }

  enable(){
    this._isEnable = true;
  }

  disable(){
    this._isEnable = false;
  }

  static setCameraFactor(camera:THREE.OrthographicCamera,camFactor?:number){
    camFactor = camFactor || View2DController.DefaultCamFactor;
    camera.left = -window.innerWidth/ camFactor;
    camera.right = window.innerWidth/ camFactor;
    camera.top = window.innerHeight/ camFactor;
    camera.bottom = -window.innerHeight /camFactor;
    camera.updateProjectionMatrix();
  }

  clearDirty(){
      this.isDirty = false;
      View2DController.setCameraFactor(this.camera,this.camFactor);
  }

  update(delta:number){
    if(this.isDirty){
      this.clearDirty();
    }
  }
}
