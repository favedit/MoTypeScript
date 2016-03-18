export class TextGeometry {
   // THREE.TextGeometry = function ( text, parameters ) {

   // 	parameters = parameters || {};

   // 	var font = parameters.font;

   // 	if ( font instanceof THREE.Font === false ) {

   // 		console.error( 'THREE.TextGeometry: font parameter is not an instance of THREE.Font.' );
   // 		return new THREE.Geometry();

   // 	}

   // 	var shapes = font.generateShapes( text, parameters.size, parameters.curveSegments );

   // 	// translate parameters to ExtrudeGeometry API

   // 	parameters.amount = parameters.height !== undefined ? parameters.height : 50;

   // 	// defaults

   // 	if ( parameters.bevelThickness === undefined ) parameters.bevelThickness = 10;
   // 	if ( parameters.bevelSize === undefined ) parameters.bevelSize = 8;
   // 	if ( parameters.bevelEnabled === undefined ) parameters.bevelEnabled = false;

   // 	THREE.ExtrudeGeometry.call( this, shapes, parameters );

   // 	this.type = 'TextGeometry';

   // };

   // THREE.TextGeometry.prototype = Object.create( THREE.ExtrudeGeometry.prototype );
   // THREE.TextGeometry.prototype.constructor = THREE.TextGeometry;
}