export default class miku{
  private mikuName:string;
  private mikuHeight:number;
  private mikuShape:THREE.Shape;

  constructor(name:string,height:number){
    this.setName(name);
    this.setHeight(height);
  }
  public getHeight():number{
    return this.mikuHeight;
  }
  public setHeight(height:number){
    this.mikuHeight = height;
  }
  public getName():string{
    return this.mikuName;
  }
  public setName(name:string){
    this.mikuName = name;
  }
  public getShape():THREE.Shape{
    let shape = new THREE.Shape();
    shape.moveTo(0,0);
    shape.lineTo(10,0);
    shape.lineTo(10,10);
    shape.lineTo(0,10);
    shape.closePath();
    return shape;
  }
  public setShape(weight:number,height:number){
    this.mikuShape = new THREE.Shape();
    this.mikuShape = this.getShape();

  }

  public sayHello(){
    console.log(this.mikuName + ": hello world, I am " + this.mikuName);
  }
  public syaHello(str:string){
    console.log(this.mikuName+ ": hello world, I am "+ str);
  }

}
