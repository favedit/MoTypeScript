export class CameraController {
   public constructor(mapper, graphics) {
      // hsw.view.base.DisplayController.call(this, mapper, graphics);
   }

   // /**
   //  * @param {boolean} event
   //  * @return {undefined}
   //  */
   // hsw.view.webgl3d.CameraController.prototype.ondragstart = function(event) {
   //   var result = this._cmdMgr.current;
   //   if (!result) {
   //     result = this._cmdMgr.createCommand(hsw.cmd.camera.CmdMoveCamera3D, this.entity);
   //     this._cmdMgr.execute(result, event);
   //   }
   // };

   // /**
   //  * @param {boolean} qualifier
   //  * @return {undefined}
   //  */
   // hsw.view.webgl3d.CameraController.prototype.ondragmove = function(qualifier) {
   //   var result = this._cmdMgr.current;
   //   if (!result) {
   //     result = this._cmdMgr.createCommand(hsw.cmd.camera.CmdMoveCamera3D, this.entity);
   //     this._cmdMgr.execute(result, qualifier);
   //   }
   // };

   // /**
   //  * @param {Object} event
   //  * @return {undefined}
   //  */
   // hsw.view.webgl3d.CameraController.prototype.onkeydown = function(event) {
   //   var e = this._cmdMgr.current;
   //   if (!e) {
   //     if (this.context.application.isActiveView("webgl3d")) {
   //       if ((e = event.event) && void 0 !== e.keyCode) {
   //         e = e.keyCode;
   //         /** @type {boolean} */
   //         e = 38 === e || (87 === e || (37 === e || (65 === e || (40 === e || (83 === e || (39 === e || (68 === e || (69 === e || 81 === e))))))));
   //       } else {
   //         /** @type {boolean} */
   //         e = false;
   //       }
   //       if (e) {
   //         e = this._cmdMgr.createCommand(hsw.cmd.camera.CmdMoveCamera3D, this.entity);
   //         this._cmdMgr.execute(e, event);
   //       }
   //     }
   //   }
   // };
}