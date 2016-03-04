import RoomActor from '../RoomActor';
import Room from '../Room';
import MeshComponent from '../../core/component/mesh/MeshComponent';

import FalseRoof from './FalseRoof';
import CurtainBox from './CurtainBox';
import GypsumLine from './GypsumLine';
export default class GypsumLineSet extends RoomActor{

  private gypsumLineHeight;


  constructor(private room:Room,height:number = 120){
    super();
    this.gypsumLineHeight = height;
  }

  init(){
    super.init();
    this.addComponent(new MeshComponent())
    var topLayer = this.room.getTopLayer();
    var falseRoof = this.room.getFalseRoof();
    if(falseRoof){
      let actor = falseRoof;
      let line1 = new GypsumLine();
      line1.init();
      line1.setXAxisLength(this.gypsumLineHeight);
      line1.setYAxisLength(actor.getWidth() + this.gypsumLineHeight);
      line1.setZAxisLength(this.gypsumLineHeight);
      line1.getFristMeshComponent().position.set(
        this.room.getWidth() - actor.getLength() - line1.getXAxisLength()/2,
        this.room.getLength() - line1.getYAxisLength()/2,
        this.room.getHeight() - line1.getZAxisLength()/2
      )
      this.addChild(line1);

      let line2 = new GypsumLine();
      line2.init();
      line2.setXAxisLength(actor.getLength());
      line2.setYAxisLength(this.gypsumLineHeight);
      line2.setZAxisLength(this.gypsumLineHeight);
      line2.getFristMeshComponent().position.set(
        this.room.getWidth() - line2.getXAxisLength()/2,
        this.room.getLength() - actor.getWidth() - line2.getYAxisLength()/2,
        this.room.getHeight() - line2.getZAxisLength()/2
      )
      this.addChild(line2);
    }

    var curtainBox = this.room.getCurtainBox();

    if(curtainBox){
      let actor = curtainBox;
      let line = new GypsumLine();
      line.init();
      line.setXAxisLength(actor.getLength());
      line.setYAxisLength(this.gypsumLineHeight);
      line.setZAxisLength(this.gypsumLineHeight);
      //紧贴某物向里放置
      line.getFristMeshComponent().position.copy(actor.getMeshGroup().position);
      line.getFristMeshComponent().position.y += line.getYAxisLength()/2 + actor.getWidth()/2;
      line.getFristMeshComponent().position.z += actor.getHeight()/2 - line.getZAxisLength()/2;
      this.addChild(line);
    }


    let line1 = new GypsumLine();
    line1.init();
    line1.setXAxisLength(this.room.getWidth() - falseRoof.getLength());
    line1.setYAxisLength(this.gypsumLineHeight);
    line1.setZAxisLength(this.gypsumLineHeight);
    line1.getFristMeshComponent().position.set(
      line1.getXAxisLength()/2,
      this.room.getLength() - this.gypsumLineHeight/2,
      this.room.getHeight() - this.gypsumLineHeight/2
    )
    this.addChild(line1);

    let line2 = new GypsumLine();
    line2.init();
    line2.setXAxisLength(this.gypsumLineHeight);
    line2.setYAxisLength(this.room.getLength() - curtainBox.getWidth() - curtainBox.getDistanceToWindowWall());
    line2.setZAxisLength(this.gypsumLineHeight);
    line2.getFristMeshComponent().position.set(
      line2.getXAxisLength()/2,
      line2.getYAxisLength()/2 + curtainBox.getWidth() + curtainBox.getDistanceToWindowWall() ,
      this.room.getHeight() - this.gypsumLineHeight/2
    )
    this.addChild(line2);

    let line3 = new GypsumLine();
    line3.init();
    line3.setXAxisLength(this.gypsumLineHeight);
    line3.setYAxisLength(this.room.getLength() - falseRoof.getWidth() - curtainBox.getWidth() - curtainBox.getDistanceToWindowWall());
    line3.setZAxisLength(this.gypsumLineHeight);
    line3.getFristMeshComponent().position.set(
      this.room.getWidth() - this.gypsumLineHeight/2,
      line3.getYAxisLength()/2 + curtainBox.getWidth() + curtainBox.getDistanceToWindowWall(),
      this.room.getHeight() - this.gypsumLineHeight/2
    )
    this.addChild(line3);



  }
}
