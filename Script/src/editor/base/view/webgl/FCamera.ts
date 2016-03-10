export class FCamera {

   /**
    * @param {?} config
    * @param {?} capture
    * @param {Object} far
    * @return {undefined}
    */

   public constructor(config, capture, far) {
      // super(config, null, capture);
      /** @type {Object} */
      //   this._threeCamera = far;
      //   /** @type {boolean} */
      //   this._canvasClientRectChanged = this._isDirty = true;
      //   this.listenEvent(this.entity, hsw.core.brep.EntityEventEnum.fieldChanged, this.onFieldChanged, false, this);
      //   config.signalCanvasRectChanged.listen(this.onCanvasRectChanged, this);
      //   this.update();
   }

   /**
    * @return {undefined}
    */
   public onCleanup() {
      //   this.context.signalCanvasRectChanged.unlisten(this.onCanvasRectChanged, this);
      //   hsw.view.webgl3d.Camera.superClass_.onCleanup.call(this);
   };

   /**
    * @return {undefined}
    */
   public onFieldChanged() {
      /** @type {boolean} */
      // this._isDirty = true;
   };

   /**
    * @return {undefined}
    */
   public onCanvasRectChanged() {
      /** @type {boolean} */
      // this._canvasClientRectChanged = true;
   };

   public update() {
      //   var lang;
      //   var data;
      //   return function() {
      //     var attributes = this._threeCamera;
      //     var c = this.context;
      //     if (this._canvasClientRectChanged) {
      //       /** @type {boolean} */
      //       this._canvasClientRectChanged = false;
      //       /** @type {number} */
      //       attributes.aspect = c.clientRect.width / c.clientRect.height;
      //       attributes.updateProjectionMatrix();
      //     }
      //     if (this._isDirty) {
      //       /** @type {boolean} */
      //       this._isDirty = false;
      //       lang = lang || new THREE.Vector2;
      //       data = data || new THREE.Vector3;
      //       attributes.position.set(this.entity.x, this.entity.z, -this.entity.y);
      //       lang.subVectors({
      //         x : this.entity.target_x,
      //         y : this.entity.target_y
      //       }, {
      //         x : this.entity.x,
      //         y : this.entity.y
      //       });
      //       var val = lang.length();
      //       /** @type {number} */
      //       val = Math.tan(THREE.Math.degToRad(this.entity.pitch)) * val;
      //       attributes.lookAt(data.set(this.entity.target_x, this.entity.z + val, -this.entity.target_y));
      //       attributes.target = data;
      //       attributes.updateMatrixWorld(false);
      //       if (attributes.fov !== this.entity.horizontal_fov) {
      //         attributes.fov = this.entity.horizontal_fov;
      //         attributes.updateProjectionMatrix();
      //       }
      //       c.signalCameraChanged.dispatch(attributes, this);
      //       /** @type {boolean} */
      //       c.needsRendering = true;
      //     }
      //   };
      // }();
   }

}