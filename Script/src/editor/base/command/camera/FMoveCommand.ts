import { FCommand } from '../FCommand';
import { FCamera } from '../../model/FCamera';
export class FMoveCommand extends FCommand {
   // 相机
   public camera: FCamera;
   public pressedKey: Array<Number>;
   constructor(camera) {
      super();
      this.camera = camera;
   }

   //==========================================================
   // <T>普通移动相机。</T>
   //==========================================================
   public doMoveTo(x, y, z?) {
      var camera = this.camera;
      camera.x += x;
      camera.y += y;
      camera.z += 0 < z ? z : 0.01;
      camera.targetX = x;
      camera.targetY = y;
   }

   //==========================================================
   // <T>沿轴移动相机。</T>
   //==========================================================
   public doMoveAlongAxis(axis: String, distance: number) {
      switch (axis) {
         case "x":
            this.camera.x += distance;
            break;
         case "y":
            this.camera.y += distance;
            break;
         case "z":
            this.camera.z = 0 < distance ? distance : 0.01;
      }
   }

   //==========================================================
   // <T>添加一个按下的案件到数组。</T>
   //==========================================================
   public addPressedKey(key: number) {
      this.pressedKey.push(key);
   }

   //==========================================================
   // <T>移除一个按下的案件到数组。</T>
   //==========================================================
   public removePressedKey(key: number) {
      if (key) {
         var idx = this.pressedKey.indexOf(key);
         this.pressedKey.splice(idx, 1);
      }
   }
   //==========================================================
   // <T>检查按钮是否合法（存在）。</T>
   //==========================================================
   public isCompatibleKey(ev) {
      var self: any = [91];
      return ev && ev.keyCode ? !self.includes(ev.keyCode) : true;
   };

   //==========================================================
   // <T>检查是否有按键按下。</T>
   //==========================================================   
   public isKeyUp() {
      return (0 === this.pressedKey.length);
   };

   //==========================================================
   // <T>是否可挂起。</T>
   //==========================================================   
   public onExecute() {
      this.saveData[this.camera.id] = this.camera.save();
      this.pressedKey = [];
   };

   //==========================================================
   // <T>接收到命令处理。</T>
   //==========================================================
   public onReceive(cmdName, target) {
      var onReceive = true;
      switch (cmdName) {
         case "dragmove":
            if (void 0 !== target.pitch) {
               this.camera.pitch = target.pitch;
            }
            if (target.moveTarget) {
               var start = target.offset;
               this.doMoveTo(start[0], start[1]);
            } else {
               if (target.position) {
                  this.doMoveTo(target.position.x, target.position.y, target.position.z);
               }
            }
            break;
         case "dragend":
            this.console.complete(this);
            onReceive = false;
            break;
         case "keydown":
            if (!this.isCompatibleKey(target.event)) {
               return this.console.complete(this), false;
            }
            this.addPressedKey(target.event);
            if (start = target.offset) {
               this.doMoveTo(start[0], start[1], start[2]);
            }
            break;
         case "keyup":
            this.removePressedKey(target.event);
            if (this.isKeyUp()) {
               this.console.complete(this);
            }
            break;
         case "movealongaxis":
            this.doMoveAlongAxis(target.type, target.value);
            break;
         default:
            onReceive = false;
      }
      return onReceive;
   };
   //==========================================================
   // <T>接收到命令处理。</T>
   //==========================================================
   onCleanup(d) {
   };
   //==========================================================
   // <T>接收到命令处理。</T>
   //==========================================================
   canUndoRedo() {
      return false;
   };
   //==========================================================
   // <T>接收到命令处理。</T>
   //==========================================================
   canSuspend() {
      return false;
   };
   //==========================================================
   // <T>接收到命令处理。</T>
   //==========================================================
   willDirtyDataModel() {
      return false;
   };
}