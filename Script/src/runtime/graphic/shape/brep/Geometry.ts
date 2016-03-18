import {FObjects} from '../../common/lang/FObjects';
import {SPoint3} from '../../common/math/SPoint3';
import {SVector3} from '../../common/math/SVector3';
import {RMath} from '../../common/math/RMath';
import {SFace3} from '../core/SFace3';

//==========================================================
// <T>几何体。</T>
//
// @author maocy
// @history 160318
//==========================================================
export class Geometry {

   // 编号
   protected static _nextId: number = 0;

   public uuid: string;
   public name: string;
   public type: string;
   public _vertices: FObjects<SPoint3>;
   public _faces: FObjects<SFace3>;

   public colors: Array<any>;
   public faceVertexUvs: Array<any>;
   public morphTargets: Array<any>;
   public morphNormals: Array<any>;
   public skinWeights: Array<any>;
   public skinIndices: Array<any>;
   public lineDistances: Array<any>;
   public boundingBox;
   public boundingSphere;
   public verticesNeedUpdate: boolean;
   public elementsNeedUpdate: boolean;
   public uvsNeedUpdate: boolean;
   public normalsNeedUpdate: boolean;
   public colorsNeedUpdate: boolean;
   public lineDistancesNeedUpdate: boolean;
   public groupsNeedUpdate: boolean;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      this.uuid = RMath.makeGuid();
      this.name = '';
      this.type = 'Geometry';
      this._vertices = new FObjects<SPoint3>();
      this._faces = new FObjects<SFace3>();

      this.colors = [];
      this.faceVertexUvs = [[]];
      this.morphTargets = [];
      this.morphNormals = [];
      this.skinWeights = [];
      this.skinIndices = [];
      this.lineDistances = [];
      this.boundingBox = null;
      this.boundingSphere = null;
      this.verticesNeedUpdate = false;
      this.elementsNeedUpdate = false;
      this.uvsNeedUpdate = false;
      this.normalsNeedUpdate = false;
      this.colorsNeedUpdate = false;
      this.lineDistancesNeedUpdate = false;
      this.groupsNeedUpdate = false;
   }

   //==========================================================
   // <T>获得编号。</T>
   //==========================================================
   public get id() {
      var id = Geometry._nextId;
      if (id == 0) {
         id = Geometry._nextId++;
      }
      return id;
   }

   //==========================================================
   // <T>获得顶点集合。</T>
   //==========================================================
   public get vertices(): FObjects<SPoint3> {
      return this._vertices;
   }

   //==========================================================
   // <T>获得面集合。</T>
   //==========================================================
   public get faces(): FObjects<SFace3> {
      return this._faces;
   }


   public applyMatrix(matrix) {
      // var normalMatrix = new THREE.Matrix3().getNormalMatrix(matrix);
      // for (var i = 0, il = this.vertices.length; i < il; i++) {
      //    var vertex = this.vertices[i];
      //    vertex.applyMatrix4(matrix);
      // }
      // for (var i = 0, il = this.faces.length; i < il; i++) {
      //    var face = this.faces[i];
      //    face.normal.applyMatrix3(normalMatrix).normalize();
      //    for (var j = 0, jl = face.vertexNormals.length; j < jl; j++) {
      //       face.vertexNormals[j].applyMatrix3(normalMatrix).normalize();
      //    }
      // }
      // if (this.boundingBox !== null) {
      //    this.computeBoundingBox();
      // }
      // if (this.boundingSphere !== null) {
      //    this.computeBoundingSphere();
      // }
      // this.verticesNeedUpdate = true;
      // this.normalsNeedUpdate = true;
   }

   public rotateX() {
      // var m1;
      // return function rotateX(angle) {
      //    if (m1 === undefined) m1 = new THREE.Matrix4();
      //    m1.makeRotationX(angle);
      //    this.applyMatrix(m1);
      //    return this;
      // }
   }

   public rotateY() {
      // // rotate geometry around world y-axis
      // var m1;
      // return function rotateY(angle) {
      //    if (m1 === undefined) m1 = new THREE.Matrix4();
      //    m1.makeRotationY(angle);
      //    this.applyMatrix(m1);
      //    return this;
      // };
   }

   public rotateZ() {
      // rotate geometry around world z-axis
      // var m1;
      // return function rotateZ(angle) {
      //    if (m1 === undefined) m1 = new THREE.Matrix4();
      //    m1.makeRotationZ(angle);
      //    this.applyMatrix(m1);
      //    return this;
      // };
   }

   public translate() {
      // translate geometry
      // var m1;
      // return function translate(x, y, z) {
      //    if (m1 === undefined) m1 = new THREE.Matrix4();
      //    m1.makeTranslation(x, y, z);
      //    this.applyMatrix(m1);
      //    return this;
      // };
   }

   public scale() {
      // // scale geometry
      // var m1;
      // return function scale(x, y, z) {
      //    if (m1 === undefined) m1 = new THREE.Matrix4();
      //    m1.makeScale(x, y, z);
      //    this.applyMatrix(m1);
      //    return this;
      // };
   }

   public lookAt() {
      // var obj;
      // return function lookAt(vector) {
      //    if (obj === undefined) obj = new THREE.Object3D();
      //    obj.lookAt(vector);
      //    obj.updateMatrix();
      //    this.applyMatrix(obj.matrix);
      // };
   }

   public fromBufferGeometry(geometry) {
      // var scope = this;
      // var indices = geometry.index !== null ? geometry.index.array : undefined;
      // var attributes = geometry.attributes;
      // var positions = attributes.position.array;
      // var normals = attributes.normal !== undefined ? attributes.normal.array : undefined;
      // var colors = attributes.color !== undefined ? attributes.color.array : undefined;
      // var uvs = attributes.uv !== undefined ? attributes.uv.array : undefined;
      // var uvs2 = attributes.uv2 !== undefined ? attributes.uv2.array : undefined;
      // if (uvs2 !== undefined) this.faceVertexUvs[1] = [];
      // var tempNormals = [];
      // var tempUVs = [];
      // var tempUVs2 = [];
      // for (var i = 0, j = 0; i < positions.length; i += 3, j += 2) {
      //    scope.vertices.push(new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]));
      //    if (normals !== undefined) {
      //       tempNormals.push(new THREE.Vector3(normals[i], normals[i + 1], normals[i + 2]));
      //    }
      //    if (colors !== undefined) {
      //       scope.colors.push(new THREE.Color(colors[i], colors[i + 1], colors[i + 2]));
      //    }
      //    if (uvs !== undefined) {
      //       tempUVs.push(new THREE.Vector2(uvs[j], uvs[j + 1]));
      //    }
      //    if (uvs2 !== undefined) {
      //       tempUVs2.push(new THREE.Vector2(uvs2[j], uvs2[j + 1]));
      //    }
      // }
      // function addFace(a, b, c) {
      //    var vertexNormals = normals !== undefined ? [tempNormals[a].clone(), tempNormals[b].clone(), tempNormals[c].clone()] : [];
      //    var vertexColors = colors !== undefined ? [scope.colors[a].clone(), scope.colors[b].clone(), scope.colors[c].clone()] : [];
      //    var face = new THREE.Face3(a, b, c, vertexNormals, vertexColors);
      //    scope.faces.push(face);
      //    if (uvs !== undefined) {
      //       scope.faceVertexUvs[0].push([tempUVs[a].clone(), tempUVs[b].clone(), tempUVs[c].clone()]);
      //    }
      //    if (uvs2 !== undefined) {
      //       scope.faceVertexUvs[1].push([tempUVs2[a].clone(), tempUVs2[b].clone(), tempUVs2[c].clone()]);
      //    }
      // }
      // if (indices !== undefined) {
      //    var groups = geometry.groups;
      //    if (groups.length > 0) {
      //       for (var i = 0; i < groups.length; i++) {
      //          var group = groups[i];
      //          var start = group.start;
      //          var count = group.count;
      //          for (var j = start, jl = start + count; j < jl; j += 3) {
      //             addFace(indices[j], indices[j + 1], indices[j + 2]);
      //          }
      //       }
      //    } else {
      //       for (var i = 0; i < indices.length; i += 3) {
      //          addFace(indices[i], indices[i + 1], indices[i + 2]);
      //       }
      //    }
      // } else {
      //    for (var i = 0; i < positions.length / 3; i += 3) {
      //       addFace(i, i + 1, i + 2);
      //    }
      // }
      // this.computeFaceNormals();
      // if (geometry.boundingBox !== null) {
      //    this.boundingBox = geometry.boundingBox.clone();
      // }
      // if (geometry.boundingSphere !== null) {
      //    this.boundingSphere = geometry.boundingSphere.clone();
      // }
      // return this;
   }

   public center() {
      // this.computeBoundingBox();
      // var offset = this.boundingBox.center().negate();
      // this.translate(offset.x, offset.y, offset.z);
      // return offset;
   }

   public normalize() {
      // this.computeBoundingSphere();
      // var center = this.boundingSphere.center;
      // var radius = this.boundingSphere.radius;
      // var s = radius === 0 ? 1 : 1.0 / radius;
      // var matrix = new THREE.Matrix4();
      // matrix.set(
      //    s, 0, 0, - s * center.x,
      //    0, s, 0, - s * center.y,
      //    0, 0, s, - s * center.z,
      //    0, 0, 0, 1
      // );
      // this.applyMatrix(matrix);
      // return this;
   }

   public computeFaceNormals() {
      // var cb = new THREE.Vector3(), ab = new THREE.Vector3();
      // for (var f = 0, fl = this.faces.length; f < fl; f++) {
      //    var face = this.faces[f];
      //    var vA = this.vertices[face.a];
      //    var vB = this.vertices[face.b];
      //    var vC = this.vertices[face.c];
      //    cb.subVectors(vC, vB);
      //    ab.subVectors(vA, vB);
      //    cb.cross(ab);
      //    cb.normalize();
      //    face.normal.copy(cb);
      // }
   }

   //==========================================================
   // <T>计算顶点法线。</T>
   //==========================================================
   public computeVertexNormals(areaWeighted: boolean = true) {
      var vertexCount = this._vertices.count();
      var faceCount = this._faces.count();
      // 创建集合
      var vertices = new FObjects<SVector3>();
      for (let i: number = 0; i < vertexCount; i++) {
         vertices[i] = new SVector3();
      }
      // 区域权重
      if (areaWeighted) {
         var cb = new SVector3();
         var ab = new SVector3();
         for (let i: number = 0; i < faceCount; i++) {
            var face = this._faces.at(i);
            var vA = this._vertices[face.a];
            var vB = this._vertices[face.b];
            var vC = this._vertices[face.c];
            cb.direction(vC, vB);
            ab.direction(vA, vB);
            cb.cross(ab);
            vertices.get(face.a).addValue3(cb);
            vertices.get(face.b).addValue3(cb);
            vertices.get(face.c).addValue3(cb);
         }
      } else {
         for (let i: number = 0; i < faceCount; i++) {
            var face = this._faces.at(i);
            vertices.get(face.a).addValue3(face.normal);
            vertices.get(face.b).addValue3(face.normal);
            vertices.get(face.c).addValue3(face.normal);
         }
      }
      // 单位化
      for (let i: number = 0; i < vertexCount; i++) {
         vertices[i].normalize();
      }
      // 设置面法线信息
      for (let i = 0; i < faceCount; i++) {
         face = this._faces[i];
         var vertexNormals = face.vertexNormals;
         if (vertexNormals.length === 3) {
            vertexNormals[0].assign(vertices.get(face.a));
            vertexNormals[1].assign(vertices.get(face.b));
            vertexNormals[2].assign(vertices.get(face.c));
         } else {
            vertexNormals[0] = vertices.get(face.a).clone();
            vertexNormals[1] = vertices.get(face.b).clone();
            vertexNormals[2] = vertices.get(face.c).clone();
         }
      }
      if (faceCount > 0) {
         this.normalsNeedUpdate = true;
      }
   }

   public computeMorphNormals() {
      // var i, il, f, fl, face;
      // // save original normals
      // // - create temp variables on first access
      // //   otherwise just copy (for faster repeated calls)
      // for (f = 0, fl = this.faces.length; f < fl; f++) {
      //    face = this.faces[f];
      //    if (!face.__originalFaceNormal) {
      //       face.__originalFaceNormal = face.normal.clone();
      //    } else {
      //       face.__originalFaceNormal.copy(face.normal);
      //    }
      //    if (!face.__originalVertexNormals) face.__originalVertexNormals = [];
      //    for (i = 0, il = face.vertexNormals.length; i < il; i++) {
      //       if (!face.__originalVertexNormals[i]) {
      //          face.__originalVertexNormals[i] = face.vertexNormals[i].clone();
      //       } else {
      //          face.__originalVertexNormals[i].copy(face.vertexNormals[i]);
      //       }
      //    }
      // }
      // // use temp geometry to compute face and vertex normals for each morph
      // var tmpGeo = new THREE.Geometry();
      // tmpGeo.faces = this.faces;
      // for (i = 0, il = this.morphTargets.length; i < il; i++) {
      //    // create on first access
      //    if (!this.morphNormals[i]) {
      //       this.morphNormals[i] = {};
      //       this.morphNormals[i].faceNormals = [];
      //       this.morphNormals[i].vertexNormals = [];
      //       var dstNormalsFace = this.morphNormals[i].faceNormals;
      //       var dstNormalsVertex = this.morphNormals[i].vertexNormals;
      //       var faceNormal, vertexNormals;
      //       for (f = 0, fl = this.faces.length; f < fl; f++) {
      //          faceNormal = new THREE.Vector3();
      //          vertexNormals = { a: new THREE.Vector3(), b: new THREE.Vector3(), c: new THREE.Vector3() };
      //          dstNormalsFace.push(faceNormal);
      //          dstNormalsVertex.push(vertexNormals);
      //       }
      //    }
      //    var morphNormals = this.morphNormals[i];
      //    // set vertices to morph target
      //    tmpGeo.vertices = this.morphTargets[i].vertices;
      //    // compute morph normals
      //    tmpGeo.computeFaceNormals();
      //    tmpGeo.computeVertexNormals();
      //    // store morph normals
      //    var faceNormal, vertexNormals;
      //    for (f = 0, fl = this.faces.length; f < fl; f++) {
      //       face = this.faces[f];
      //       faceNormal = morphNormals.faceNormals[f];
      //       vertexNormals = morphNormals.vertexNormals[f];
      //       faceNormal.copy(face.normal);
      //       vertexNormals.a.copy(face.vertexNormals[0]);
      //       vertexNormals.b.copy(face.vertexNormals[1]);
      //       vertexNormals.c.copy(face.vertexNormals[2]);
      //    }
      // }
      // // restore original normals
      // for (f = 0, fl = this.faces.length; f < fl; f++) {
      //    face = this.faces[f];
      //    face.normal = face.__originalFaceNormal;
      //    face.vertexNormals = face.__originalVertexNormals;
      // }
   }

   public computeTangents() {
      console.warn('THREE.Geometry: .computeTangents() has been removed.');
   }

   public computeLineDistances() {
      // var d = 0;
      // var vertices = this.vertices;
      // for (var i = 0, il = vertices.length; i < il; i++) {
      //    if (i > 0) {
      //       d += vertices[i].distanceTo(vertices[i - 1]);
      //    }
      //    this.lineDistances[i] = d;
      // }
   }

   public computeBoundingBox() {
      // if (this.boundingBox === null) {
      //    this.boundingBox = new THREE.Box3();
      // }
      // this.boundingBox.setFromPoints(this.vertices);
   }

   public computeBoundingSphere() {
      // if (this.boundingSphere === null) {
      //    this.boundingSphere = new THREE.Sphere();
      // }
      // this.boundingSphere.setFromPoints(this.vertices);
   }

   public merge(geometry, matrix, materialIndexOffset) {
      // if (geometry instanceof THREE.Geometry === false) {
      //    console.error('THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.', geometry);
      //    return;
      // }
      // var normalMatrix,
      //    vertexOffset = this.vertices.length,
      //    vertices1 = this.vertices,
      //    vertices2 = geometry.vertices,
      //    faces1 = this.faces,
      //    faces2 = geometry.faces,
      //    uvs1 = this.faceVertexUvs[0],
      //    uvs2 = geometry.faceVertexUvs[0];
      // if (materialIndexOffset === undefined) materialIndexOffset = 0;
      // if (matrix !== undefined) {
      //    normalMatrix = new THREE.Matrix3().getNormalMatrix(matrix);
      // }
      // // vertices
      // for (var i = 0, il = vertices2.length; i < il; i++) {
      //    var vertex = vertices2[i];
      //    var vertexCopy = vertex.clone();
      //    if (matrix !== undefined) vertexCopy.applyMatrix4(matrix);
      //    vertices1.push(vertexCopy);
      // }
      // // faces
      // for (i = 0, il = faces2.length; i < il; i++) {
      //    var face = faces2[i], faceCopy, normal, color,
      //       faceVertexNormals = face.vertexNormals,
      //       faceVertexColors = face.vertexColors;
      //    faceCopy = new THREE.Face3(face.a + vertexOffset, face.b + vertexOffset, face.c + vertexOffset);
      //    faceCopy.normal.copy(face.normal);
      //    if (normalMatrix !== undefined) {
      //       faceCopy.normal.applyMatrix3(normalMatrix).normalize();
      //    }
      //    for (var j = 0, jl = faceVertexNormals.length; j < jl; j++) {
      //       normal = faceVertexNormals[j].clone();
      //       if (normalMatrix !== undefined) {
      //          normal.applyMatrix3(normalMatrix).normalize();
      //       }
      //       faceCopy.vertexNormals.push(normal);
      //    }
      //    faceCopy.color.copy(face.color);
      //    for (var j = 0, jl = faceVertexColors.length; j < jl; j++) {
      //       color = faceVertexColors[j];
      //       faceCopy.vertexColors.push(color.clone());
      //    }
      //    faceCopy.materialIndex = face.materialIndex + materialIndexOffset;
      //    faces1.push(faceCopy);
      // }
      // // uvs
      // for (i = 0, il = uvs2.length; i < il; i++) {
      //    var uv = uvs2[i], uvCopy = [];
      //    if (uv === undefined) {
      //       continue;
      //    }
      //    for (var j = 0, jl = uv.length; j < jl; j++) {
      //       uvCopy.push(uv[j].clone());
      //    }
      //    uvs1.push(uvCopy);
      // }
   }

   public mergeMesh(mesh) {
      // if (mesh instanceof THREE.Mesh === false) {
      //    console.error('THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.', mesh);
      //    return;
      // }
      // mesh.matrixAutoUpdate && mesh.updateMatrix();
      // this.merge(mesh.geometry, mesh.matrix);
   }

   /*
    * Checks for duplicate vertices with hashmap.
    * Duplicated vertices are removed
    * and faces' vertices are updated.
    */

   public mergeVertices() {
      var verticesMap = {}; // Hashmap for looking up vertices by position coordinates (and making sure they are unique)
      var unique = [], changes = [];
      var v, key;
      var precisionPoints = 4; // number of decimal points, e.g. 4 for epsilon of 0.0001
      var precision = Math.pow(10, precisionPoints);
      var i, il, face;
      var indices, j, jl;
      for (i = 0, il = this._vertices.count(); i < il; i++) {
         v = this._vertices[i];
         key = Math.round(v.x * precision) + '_' + Math.round(v.y * precision) + '_' + Math.round(v.z * precision);
         if (verticesMap[key] === undefined) {
            verticesMap[key] = i;
            unique.push(this._vertices[i]);
            changes[i] = unique.length - 1;
         } else {
            //console.log('Duplicate vertex found. ', i, ' could be using ', verticesMap[key]);
            changes[i] = changes[verticesMap[key]];
         }
      }

      // if faces are completely degenerate after merging vertices, we
      // have to remove them from the geometry.
      var faceIndicesToRemove = [];
      for (i = 0, il = this._faces.count(); i < il; i++) {
         face = this._faces[i];
         face.a = changes[face.a];
         face.b = changes[face.b];
         face.c = changes[face.c];
         indices = [face.a, face.b, face.c];
         var dupIndex = - 1;
         // if any duplicate vertices are found in a Face3
         // we have to remove the face as nothing can be saved
         for (var n = 0; n < 3; n++) {
            if (indices[n] === indices[(n + 1) % 3]) {
               dupIndex = n;
               faceIndicesToRemove.push(i);
               break;
            }
         }
      }
      for (i = faceIndicesToRemove.length - 1; i >= 0; i--) {
         var idx = faceIndicesToRemove[i];
         //this._faces.splice(idx, 1);
         for (j = 0, jl = this.faceVertexUvs.length; j < jl; j++) {
            this.faceVertexUvs[j].splice(idx, 1);
         }
      }
      // Use unique set of vertices
      // var diff = this._vertices.length - unique.length;
      // this._vertices = unique;
      // return diff;
   }

   public sortFacesByMaterialIndex() {
      var faces = this._faces;
      var length = faces.count();
      // tag faces
      for (var i = 0; i < length; i++) {
         faces[i]._id = i;
      }
      // sort faces
      function materialIndexSort(a, b) {
         return a.materialIndex - b.materialIndex;
      }
      faces.sort(materialIndexSort);
      // sort uvs
      var uvs1 = this.faceVertexUvs[0];
      var uvs2 = this.faceVertexUvs[1];
      var newUvs1, newUvs2;
      if (uvs1 && uvs1.length === length) newUvs1 = [];
      if (uvs2 && uvs2.length === length) newUvs2 = [];
      for (var i = 0; i < length; i++) {
         var id = faces[i]._id;
         if (newUvs1) newUvs1.push(uvs1[id]);
         if (newUvs2) newUvs2.push(uvs2[id]);
      }
      if (newUvs1) this.faceVertexUvs[0] = newUvs1;
      if (newUvs2) this.faceVertexUvs[1] = newUvs2;
   }

   public toJSON() {
      // var data = {
      //    metadata: {
      //       version: 4.4,
      //       type: 'Geometry',
      //       generator: 'Geometry.toJSON'
      //    }
      // };

      // // standard Geometry serialization

      // data.uuid = this.uuid;
      // data.type = this.type;
      // if (this.name !== '') data.name = this.name;

      // if (this.parameters !== undefined) {

      //    var parameters = this.parameters;

      //    for (var key in parameters) {

      //       if (parameters[key] !== undefined) data[key] = parameters[key];

      //    }

      //    return data;

      // }

      // var vertices = [];

      // for (var i = 0; i < this.vertices.length; i++) {

      //    var vertex = this.vertices[i];
      //    vertices.push(vertex.x, vertex.y, vertex.z);

      // }

      // var faces = [];
      // var normals = [];
      // var normalsHash = {};
      // var colors = [];
      // var colorsHash = {};
      // var uvs = [];
      // var uvsHash = {};

      // for (var i = 0; i < this.faces.length; i++) {

      //    var face = this.faces[i];

      //    var hasMaterial = true;
      //    var hasFaceUv = false; // deprecated
      //    var hasFaceVertexUv = this.faceVertexUvs[0][i] !== undefined;
      //    var hasFaceNormal = face.normal.length() > 0;
      //    var hasFaceVertexNormal = face.vertexNormals.length > 0;
      //    var hasFaceColor = face.color.r !== 1 || face.color.g !== 1 || face.color.b !== 1;
      //    var hasFaceVertexColor = face.vertexColors.length > 0;

      //    var faceType = 0;

      //    faceType = setBit(faceType, 0, 0); // isQuad
      //    faceType = setBit(faceType, 1, hasMaterial);
      //    faceType = setBit(faceType, 2, hasFaceUv);
      //    faceType = setBit(faceType, 3, hasFaceVertexUv);
      //    faceType = setBit(faceType, 4, hasFaceNormal);
      //    faceType = setBit(faceType, 5, hasFaceVertexNormal);
      //    faceType = setBit(faceType, 6, hasFaceColor);
      //    faceType = setBit(faceType, 7, hasFaceVertexColor);

      //    faces.push(faceType);
      //    faces.push(face.a, face.b, face.c);
      //    faces.push(face.materialIndex);

      //    if (hasFaceVertexUv) {

      //       var faceVertexUvs = this.faceVertexUvs[0][i];

      //       faces.push(
      //          getUvIndex(faceVertexUvs[0]),
      //          getUvIndex(faceVertexUvs[1]),
      //          getUvIndex(faceVertexUvs[2])
      //       );

      //    }

      //    if (hasFaceNormal) {

      //       faces.push(getNormalIndex(face.normal));

      //    }

      //    if (hasFaceVertexNormal) {

      //       var vertexNormals = face.vertexNormals;

      //       faces.push(
      //          getNormalIndex(vertexNormals[0]),
      //          getNormalIndex(vertexNormals[1]),
      //          getNormalIndex(vertexNormals[2])
      //       );

      //    }

      //    if (hasFaceColor) {

      //       faces.push(getColorIndex(face.color));

      //    }

      //    if (hasFaceVertexColor) {

      //       var vertexColors = face.vertexColors;

      //       faces.push(
      //          getColorIndex(vertexColors[0]),
      //          getColorIndex(vertexColors[1]),
      //          getColorIndex(vertexColors[2])
      //       );

      //    }

      // }

      // function setBit(value, position, enabled) {

      //    return enabled ? value | (1 << position) : value & (~(1 << position));

      // }

      // function getNormalIndex(normal) {

      //    var hash = normal.x.toString() + normal.y.toString() + normal.z.toString();

      //    if (normalsHash[hash] !== undefined) {

      //       return normalsHash[hash];

      //    }

      //    normalsHash[hash] = normals.length / 3;
      //    normals.push(normal.x, normal.y, normal.z);

      //    return normalsHash[hash];

      // }

      // function getColorIndex(color) {

      //    var hash = color.r.toString() + color.g.toString() + color.b.toString();

      //    if (colorsHash[hash] !== undefined) {

      //       return colorsHash[hash];

      //    }

      //    colorsHash[hash] = colors.length;
      //    colors.push(color.getHex());

      //    return colorsHash[hash];

      // }

      // function getUvIndex(uv) {

      //    var hash = uv.x.toString() + uv.y.toString();

      //    if (uvsHash[hash] !== undefined) {

      //       return uvsHash[hash];

      //    }

      //    uvsHash[hash] = uvs.length / 2;
      //    uvs.push(uv.x, uv.y);

      //    return uvsHash[hash];

      // }

      // data.data = {};

      // data.data.vertices = vertices;
      // data.data.normals = normals;
      // if (colors.length > 0) data.data.colors = colors;
      // if (uvs.length > 0) data.data.uvs = [uvs]; // temporal backward compatibility
      // data.data.faces = faces;

      // return data;
   }

   public clone() {

      /*
      // Handle primitives

      var parameters = this.parameters;

      if ( parameters !== undefined ) {

         var values = [];

         for ( var key in parameters ) {

            values.push( parameters[ key ] );

         }

         var geometry = Object.create( this.constructor.prototype );
         this.constructor.apply( geometry, values );
         return geometry;

      }

      return new this.constructor().copy( this );
      */

      //return new THREE.Geometry().copy(this);

   }

   public copy(source) {

      // this.vertices = [];
      // this.faces = [];
      // this.faceVertexUvs = [[]];

      // var vertices = source.vertices;

      // for (var i = 0, il = vertices.length; i < il; i++) {

      //    this.vertices.push(vertices[i].clone());

      // }

      // var faces = source.faces;

      // for (var i = 0, il = faces.length; i < il; i++) {

      //    this.faces.push(faces[i].clone());

      // }

      // for (var i = 0, il = source.faceVertexUvs.length; i < il; i++) {

      //    var faceVertexUvs = source.faceVertexUvs[i];

      //    if (this.faceVertexUvs[i] === undefined) {

      //       this.faceVertexUvs[i] = [];

      //    }

      //    for (var j = 0, jl = faceVertexUvs.length; j < jl; j++) {

      //       var uvs = faceVertexUvs[j], uvsCopy = [];

      //       for (var k = 0, kl = uvs.length; k < kl; k++) {

      //          var uv = uvs[k];

      //          uvsCopy.push(uv.clone());

      //       }

      //       this.faceVertexUvs[i].push(uvsCopy);

      //    }

      // }

      // return this;

   }

   public dispose() {
      // this.dispatchEvent({ type: 'dispose' });
   }
}