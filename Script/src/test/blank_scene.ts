let parse = function(arrayBuffer) {
    for (var dataView = new DataView(arrayBuffer),
             byteOffset = 0,
             dataNumber = dataView.getUint32(byteOffset, !0),
             byteOffset = byteOffset + 4,
             obj = new THREE.Object3D(),
             dataCount = 0;
     dataCount < dataNumber; ++dataCount) {
        let nameStrByteLength = dataView.getUint32(byteOffset, !0);
        byteOffset = byteOffset + 4;
        let objNameStr = new Uint8Array(arrayBuffer,byteOffset,nameStrByteLength)
        objNameStr = String.fromCharCode.apply(null , objNameStr);
        byteOffset = byteOffset + nameStrByteLength;
        byteOffset = byteOffset + (4 - nameStrByteLength % 4);//大端小端问题
        let pointNumber = dataView.getUint32(byteOffset, !0);
        byteOffset = byteOffset + 4;
        let normalNumber = dataView.getUint16(byteOffset, !0);
        byteOffset = byteOffset + 2;
        let uvNumber = dataView.getUint16(byteOffset, !0);
        byteOffset = byteOffset + 2;


        let bufferGeometry = new THREE.BufferGeometry();

        let pointArray = new Float32Array(arrayBuffer,byteOffset,3 * pointNumber);
        bufferGeometry.addAttribute("position", new THREE.BufferAttribute(pointArray,3));
        byteOffset += 12 * pointNumber;
        //p.vertices = p.attributes.position.array;
        if(normalNumber){
          bufferGeometry.addAttribute("normal",
            new THREE.BufferAttribute(new Float32Array(arrayBuffer,byteOffset,3 * pointNumber),3)
          );
              byteOffset += 12 * pointNumber;
              //p.normals = p.attributes.normal.array
        }else{
           bufferGeometry.computeVertexNormals();
        }

        if(uvNumber){
          bufferGeometry.addAttribute("uv", new THREE.BufferAttribute(new Float32Array(arrayBuffer,byteOffset,2 * pointNumber),2));
          byteOffset += 8 * pointNumber;
          //p.uvs = p.attributes.uv.array;
        }

        let mesh = new THREE.Mesh(bufferGeometry,this._getDefaultMaterial());
        (<any>mesh).name = objNameStr;
        obj.add(mesh)
    }
    return obj
}


function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object

  // files is a FileList of File objects. List some properties.
  var output = [];
  for (var i = 0, f; f = files[i]; i++) {
    readFile(f);
    output.push('<li><strong>', f.name, '</strong> (', f.type || 'n/a', ') - ',
                f.size, ' bytes, last modified: ',
                f.lastModifiedDate.toLocaleDateString(), '</li>');
  }
  document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
}

function readFile(f:File){
  var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          var content = e.target.result;
          console.log(content.length)
          var binObj = new BinaryOBJ();
          var bin = binObj.parse(content);
           window.open(URL.createObjectURL(bin));
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsText(f);

}

function blobToArrayBuffer(blob:Blob){
  var arrayBuffer;
  var fileReader = new FileReader();
  fileReader.onload = function() {
      arrayBuffer = this.result;
  };
  fileReader.readAsArrayBuffer(blob);
}

document.getElementById('objFiles').addEventListener('change', handleFileSelect, false);

function useBlob(){
  var blobBuilder = []; // 创建BlobBuilder对象
  blobBuilder.push("我今天只说三句话；"); // 连续放入文本
  blobBuilder.push("包括这一句；");
  blobBuilder.push("我的话完了。");

  var url = window.URL.createObjectURL(new Blob(blobBuilder, {type: 'application/octet-stream'})); // 返回Blob对象并以此创建URL
  window.open(url); // 通过URL打开这个Blob对象
}

function objTextParse(text){
  var object, objects = [];
  var geometry, material;

  function parseVertexIndex( value ) {

    var index = parseInt( value );

    return ( index >= 0 ? index - 1 : index + vertices.length / 3 ) * 3;

  }

  function parseNormalIndex( value ) {

    var index = parseInt( value );

    return ( index >= 0 ? index - 1 : index + normals.length / 3 ) * 3;

  }

  function parseUVIndex( value ) {

    var index = parseInt( value );

    return ( index >= 0 ? index - 1 : index + uvs.length / 2 ) * 2;

  }

  function addVertex( a, b, c ) {

    geometry.vertices.push(
      vertices[ a ], vertices[ a + 1 ], vertices[ a + 2 ],
      vertices[ b ], vertices[ b + 1 ], vertices[ b + 2 ],
      vertices[ c ], vertices[ c + 1 ], vertices[ c + 2 ]
    );

  }

  function addNormal( a, b, c ) {

    geometry.normals.push(
      normals[ a ], normals[ a + 1 ], normals[ a + 2 ],
      normals[ b ], normals[ b + 1 ], normals[ b + 2 ],
      normals[ c ], normals[ c + 1 ], normals[ c + 2 ]
    );

  }

  function addUV( a, b, c ) {

    geometry.uvs.push(
      uvs[ a ], uvs[ a + 1 ],
      uvs[ b ], uvs[ b + 1 ],
      uvs[ c ], uvs[ c + 1 ]
    );

  }

  function addFace( a, b, c, d,  ua?:any, ub?:any, uc?:any, ud?:any, na?:any, nb?:any, nc?:any, nd?:any ) {
    faces.push(arguments);
    var ia = parseVertexIndex( a );
    var ib = parseVertexIndex( b );
    var ic = parseVertexIndex( c );
    var id;

    if ( d === undefined ) {

      addVertex( ia, ib, ic );

    } else {

      id = parseVertexIndex( d );

      addVertex( ia, ib, id );
      addVertex( ib, ic, id );

    }

    if ( ua !== undefined ) {

      ia = parseUVIndex( ua );
      ib = parseUVIndex( ub );
      ic = parseUVIndex( uc );

      if ( d === undefined ) {

        addUV( ia, ib, ic );

      } else {

        id = parseUVIndex( ud );

        addUV( ia, ib, id );
        addUV( ib, ic, id );

      }

    }

    if ( na !== undefined ) {

      ia = parseNormalIndex( na );
      ib = parseNormalIndex( nb );
      ic = parseNormalIndex( nc );

      if ( d === undefined ) {

        addNormal( ia, ib, ic );

      } else {

        id = parseNormalIndex( nd );

        addNormal( ia, ib, id );
        addNormal( ib, ic, id );

      }

    }

  }

  // create mesh if no objects in text

  if ( /^o /gm.test( text ) === false ) {

    geometry = {
      vertices: [],
      normals: [],
      uvs: []
    };

    material = {
      name: ''
    };

    object = {
      name: '',
      geometry: geometry,
      material: material
    };

    objects.push( object );

  }

  var vertices = [];
  var normals = [];
  var uvs = [];
  var faces = [];

  // v float float float

  var vertex_pattern = /v( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;

  // vn float float float

  var normal_pattern = /vn( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;

  // vt float float

  var uv_pattern = /vt( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;

  // f vertex vertex vertex ...

  var face_pattern1 = /f( +-?\d+)( +-?\d+)( +-?\d+)( +-?\d+)?/;

  // f vertex/uv vertex/uv vertex/uv ...

  var face_pattern2 = /f( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))?/;

  // f vertex/uv/normal vertex/uv/normal vertex/uv/normal ...

  var face_pattern3 = /f( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))?/;

  // f vertex//normal vertex//normal vertex//normal ...

  var face_pattern4 = /f( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))?/;

  //

  var lines = text.split( '\n' );

  for ( var i = 0; i < lines.length; i ++ ) {

    var line = lines[ i ];
    line = line.trim();

    var result;

    if ( line.length === 0 || line.charAt( 0 ) === '#' ) {

      continue;

    } else if ( ( result = vertex_pattern.exec( line ) ) !== null ) {

      // ["v 1.0 2.0 3.0", "1.0", "2.0", "3.0"]

      vertices.push(
        parseFloat( result[ 1 ] ),
        parseFloat( result[ 2 ] ),
        parseFloat( result[ 3 ] )
      );

    } else if ( ( result = normal_pattern.exec( line ) ) !== null ) {

      // ["vn 1.0 2.0 3.0", "1.0", "2.0", "3.0"]

      normals.push(
        parseFloat( result[ 1 ] ),
        parseFloat( result[ 2 ] ),
        parseFloat( result[ 3 ] )
      );

    } else if ( ( result = uv_pattern.exec( line ) ) !== null ) {

      // ["vt 0.1 0.2", "0.1", "0.2"]

      uvs.push(
        parseFloat( result[ 1 ] ),
        parseFloat( result[ 2 ] )
      );

    } else if ( ( result = face_pattern1.exec( line ) ) !== null ) {

      // ["f 1 2 3", "1", "2", "3", undefined]

      addFace(
        result[ 1 ], result[ 2 ], result[ 3 ], result[ 4 ]
      );

    } else if ( ( result = face_pattern2.exec( line ) ) !== null ) {

      // ["f 1/1 2/2 3/3", " 1/1", "1", "1", " 2/2", "2", "2", " 3/3", "3", "3", undefined, undefined, undefined]

      addFace(
        result[ 2 ], result[ 5 ], result[ 8 ], result[ 11 ],
        result[ 3 ], result[ 6 ], result[ 9 ], result[ 12 ]
      );

    } else if ( ( result = face_pattern3.exec( line ) ) !== null ) {

      // ["f 1/1/1 2/2/2 3/3/3", " 1/1/1", "1", "1", "1", " 2/2/2", "2", "2", "2", " 3/3/3", "3", "3", "3", undefined, undefined, undefined, undefined]

      addFace(
        result[ 2 ], result[ 6 ], result[ 10 ], result[ 14 ],
        result[ 3 ], result[ 7 ], result[ 11 ], result[ 15 ],
        result[ 4 ], result[ 8 ], result[ 12 ], result[ 16 ]
      );

    } else if ( ( result = face_pattern4.exec( line ) ) !== null ) {

      // ["f 1//1 2//2 3//3", " 1//1", "1", "1", " 2//2", "2", "2", " 3//3", "3", "3", undefined, undefined, undefined]

      addFace(
        result[ 2 ], result[ 5 ], result[ 8 ], result[ 11 ],
        undefined, undefined, undefined, undefined,
        result[ 3 ], result[ 6 ], result[ 9 ], result[ 12 ]
      );

    } else if ( /^o /.test( line ) ) {

      geometry = {
        vertices: [],
        normals: [],
        uvs: []
      };

      material = {
        name: ''
      };

      object = {
        name: line.substring( 2 ).trim(),
        geometry: geometry,
        material: material
      };

      objects.push( object )

    } else if ( /^g /.test( line ) ) {

      // group

    } else if ( /^usemtl /.test( line ) ) {

      // material

      material.name = line.substring( 7 ).trim();

    } else if ( /^mtllib /.test( line ) ) {

      // mtl file

    } else if ( /^s /.test( line ) ) {

      // smooth shading

    } else {

      // console.log( "THREE.OBJLoader: Unhandled line " + line );

    }

  }



  // return {
  //   vertices:vertices,
  //   normals:normals,
  //   uvs:uvs,
  //   faces:faces
  // };

  return objects;
}

function objToBinrary(result){
  //useBlob();
  var buffers = [];
//  debugger;
  result.forEach((object)=>{
    var g =  object.geometry;
    var pointNumber = g.vertices.length /3;
    //每个点上8个float数 x y z nx ny nz u v
    var byteLength = pointNumber * 8 * 4;
    var buffer = new ArrayBuffer(byteLength);
    var byteOffset = 0;
    var dv = new DataView(buffer, byteOffset,byteLength);
    for(var pointIndex = 0;pointIndex < g.vertices.length;pointIndex += 3){
      dv.setInt32(byteOffset,g.vertices[pointIndex]);
      byteOffset += 4;
      dv.setInt32(byteOffset,g.vertices[pointIndex + 1]);
      byteOffset += 4;
      dv.setInt32(byteOffset,g.vertices[pointIndex + 2]);
      byteOffset += 4;
      dv.setInt32(byteOffset,g.normals[pointIndex]);
      byteOffset += 4;
      dv.setInt32(byteOffset,g.normals[pointIndex + 1]);
      byteOffset += 4;
      dv.setInt32(byteOffset,g.normals[pointIndex + 2]);
      byteOffset += 4;
      dv.setFloat32(byteOffset,g.uvs[pointIndex]);
      byteOffset += 4;
      dv.setFloat32(byteOffset,g.uvs[pointIndex + 1]);
      byteOffset += 4;
    }

    buffers.push(buffer);
  });
    // var g = result;
    // var pointNumber = g.vertices.length /3;
    // //每个点上8个float数 x y z nx ny nz u v
    // var byteLength = pointNumber * 8 * 4;
    // var buffer = new ArrayBuffer(byteLength);
    // var byteOffset = 0;
    // var dv = new DataView(buffer, byteOffset,byteLength);
    // for(var pointIndex = 0;pointIndex < g.vertices.length;pointIndex += 3){
    //   dv.setInt32(byteOffset,g.vertices[pointIndex]);
    //   byteOffset += 4;
    //   dv.setInt32(byteOffset,g.vertices[pointIndex + 1]);
    //   byteOffset += 4;
    //   dv.setInt32(byteOffset,g.vertices[pointIndex + 2]);
    //   byteOffset += 4;
    //   dv.setInt32(byteOffset,g.normals[pointIndex]);
    //   byteOffset += 4;
    //   dv.setInt32(byteOffset,g.normals[pointIndex + 1]);
    //   byteOffset += 4;
    //   dv.setInt32(byteOffset,g.normals[pointIndex + 2]);
    //   byteOffset += 4;
    //   dv.setFloat32(byteOffset,g.uvs[pointIndex]);
    //   byteOffset += 4;
    //   dv.setFloat32(byteOffset,g.uvs[pointIndex + 1]);
    //   byteOffset += 4;
    // }
    //
    // buffers.push(buffer);



  var blob = new Blob(buffers, {type: 'application/octet-stream'});
  return blob;
  // var a = new Blob();
  //
  // // Create a 1024-byte ArrayBuffer
  // // buffer could also come from reading a File
  //
  // var buffer = new ArrayBuffer(1024);
  //
  // // Create ArrayBufferView objects based on buffer
  //
  // var shorts = new Uint16Array(buffer, 512, 128);
  // var bytes = new Uint8Array(buffer, shorts.byteOffset + shorts.byteLength);
  //
  // var b = new Blob(["foobarbazetcetc" + "birdiebirdieboo"], {type: "text/plain;charset=UTF-8"});
  //
  // var c = new Blob([b, shorts]);
  //
  // var a = new Blob([b, c, bytes]);
  //
  // var d = new Blob([buffer, b, c, bytes]);
}
class BinaryOBJ extends THREE.OBJLoader{
    parse(text){
       var parsedObject = objTextParse(text);
       console.log(parsedObject);
       var binObj = objToBinrary(parsedObject);
       return binObj;
    }
}

class BinaryOBJLoader extends THREE.OBJLoader{
    parse(text){
       var parsedObject = objTextParse(text);
       var binObj = objToBinrary(parsedObject);
       return parsedObject;
    }
}

import SKSpace from '../core/SKSpace';
import {Application} from '../core/IoC';
import RotatingCube from '../core/actor/RotatingCube';
import AsyncRotatingCube from '../core/actor/AsyncRotatingCube';
@Application()
class SKongVR extends SKSpace{
  constructor(){
    super();


    //
    // var objLoader = new THREE.OBJMTLLoader();
    // var objUrl = './resource/room/wardrobe/wardrobe.obj';
    // var mtlUrl = './resource/room/wardrobe/wardrobe.mtl';
    // objLoader.load(objUrl, mtlUrl,( object ) =>{
    //   console.log(object);
    //   object.scale.set(0.001,0.001,0.001);
    //   object.position.set(0,0,0);
    //   this.scene.add( object );
    // },function ( item, loaded, total ) {
    //   console.log( item, loaded, total );
    // }, function ( xhr ) {
    //   console.log('load error: ',objUrl);
    // });


        var objLoader = new THREE.OBJLoader();
        var objUrl = './resource/room/xmas_decoration.obj';
        var mtlUrl = './resource/room/wardrobe/wardrobe.mtl';
        objLoader.load(objUrl,( object ) =>{
          console.log(object);
          debugger;
          object.scale.set(0.001,0.001,0.001);
          object.position.set(0,0,0);
          this.scene.add( object );
        },function ( item, loaded, total ) {
          console.log( item, loaded, total );
        }, function ( xhr ) {
          console.log('load error: ',objUrl);
        });


        // var scope = this;
        // var oReq = new XMLHttpRequest();
        // oReq.open("GET", "./resource/room/wardrobe/wardrobe.obj", true);
        // oReq.responseType = "arraybuffer";
        //
        // oReq.onload = function(oEvent) {
        //   var blob = new Blob([oReq.response], {type: "text/plain"});
        //   var fileReader = new FileReader();
        //   fileReader.onload = function(e:any) {
        //       var content = e.target.result;
        //       console.log(content)
        //       var binObj = new BinaryOBJ();
        //       var bin = binObj.parse(content);
        //       console.log(bin)
        //   };
        //   fileReader.readAsText(blob);
        // };
        //
        // oReq.send();
  }

}
