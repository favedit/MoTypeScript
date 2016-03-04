import * as base from '../base/index'
import {Wall as WallEntity} from '../../model/Wall';
import {WallController} from './WallController';
import {Layer} from './Layer';
export let WallResourceLoadingTaskNames = new Map();

declare var hsw;
declare var goog;

"inner outer top bottom from to outerfrom outerto".split(" ").forEach(function(a) {
    WallResourceLoadingTaskNames.set(a, a + "material")
});


export type ITransform = {
       position: {
           x: number,
           y: number,
           z?: number
       },
       length: number,
       rotation: number
   }


export class Wall extends base.Wall{
  entity:WallEntity;
  controller:WallController;
  context;
  geometry;
  indices;

  node:THREE.Object3D;

  meshByFaceId

  cleanUpElements(){

  }

  _calculateTransform():ITransform{
    return {
       position: {
           x: 0,
           y: 0
       },
       length: 0,
       rotation: 0
   }
  }

  _modelSpaceToMeshSpace(a){

  }

  isInHalfWallMode:boolean;

  _getMaterial(b):THREE.Material{
    return null;
  }

  draw() {


      this.cleanUpElements();
      this.controller.clearMeshInfo();
      if ((this.entity as any).isValid() && (this.context.needsRendering = !0,
      this.geometry && !(2 > this.geometry.length) && !isNaN(this.geometry[0].x))) {
          var scope = this;
          var entity = this.entity;
          var  height3d = entity.height3d;
          var d = new THREE.Object3D;
          var  e = new THREE.Object3D;
          var f = new THREE.Object3D;
          var trans:any = this._calculateTransform();
          var position = trans.position;
          var geometry = this.geometry.map((a)=> {
            return this._modelSpaceToMeshSpace(a)
          });

          var n:any = [
            geometry[this.indices[0]],
            geometry[this.indices[1]],
            geometry[this.indices[2]],
            geometry[this.indices[3]]
          ];
          var p = function(a, b) {
              return hsw.view.webgl3d.Util.createConvexPolygonGeometry([{
                  x: a.x,
                  y: 0,
                  z: a.z
              }, {
                  x: b.x,
                  y: 0,
                  z: b.z
              }, {
                  x: b.x,
                  y: height3d,
                  z: b.z
              }, {
                  x: a.x,
                  y: height3d,
                  z: a.z
              }], {
                  plane: "yz"
              })
          }
          var q:any = function(b, c) {
              if (c) {
                  var e, f;
                  switch (b) {
                  case hsw.model.WallSurfaceTypeEnum.from:
                      e = c.from;
                      f = !0;
                      break;
                  case hsw.model.WallSurfaceTypeEnum.to:
                      e = c.to;
                      f = !1;
                      break;
                  case hsw.model.WallSurfaceTypeEnum.outerfrom:
                      e = c.outerfrom;
                      f = !0;
                      break;
                  case hsw.model.WallSurfaceTypeEnum.outerto:
                      e = c.outerto,
                      f = !1
                  }
                  if (e && !(1 > e.length)) {
                      e = e.map(function(b) {
                          return scope._modelSpaceToMeshSpace(b)
                      });
                      for (var g = [], h = 0, m = e.length - 1; h < m; h++) {
                          var n = p(e[h], e[h + 1]);
                          hsw.view.webgl3d.Util.normalizeGeometryUV(n, f);
                          n = new THREE.Mesh(n,scope._getMaterial(b));
                          n.name = "side";
                          d.add(n);
                          g.push(n);
                          scope.controller.setMeshInfo(n.uuid, b)
                      }
                      scope.meshByFaceId.set(b, g)
                  }
              }
          }
          var t:any = this.canDraw();
          var u = this.sidePaths;
          var x;
          var y;
          if (u) {
              var r = entity.prev
                , v = r ? this.context.hscanvas.displayList[r.ID] : null ;
              if (!(!entity.edge.isFlagOn(hsw.model.WallFlagEnum.heightEditable) && r && r.ID !== entity.ID && hsw.util.Math.isSamePoint(r.to, entity.from, .05) && r.isValid() && hsw.util.Geometry.isValidWall(entity) &&
              hsw.util.Geometry.isValidWall(r) && hsw.util.Math.nearlyEquals(r.height3d, entity.height3d) && r.edge.isFlagOn(hsw.model.WallFlagEnum.heightEditable) === entity.edge.isFlagOn(hsw.model.WallFlagEnum.heightEditable) && hsw.util.Math.nearlyEquals(r.width, entity.width)) || v && v.isInHalfWallMode !== this.isInHalfWallMode)
                  x = !0,
                  q(hsw.model.WallSurfaceTypeEnum.from, u);
              v = (r = entity.next) ? this.context.hscanvas.displayList[r.ID] : null ;
              if (!(!entity.edge.isFlagOn(hsw.model.WallFlagEnum.heightEditable) && r && r.ID !== entity.ID && hsw.util.Math.isSamePoint(entity.to,
              r.from, .05) && r.isValid() && hsw.util.Geometry.isValidWall(entity) && hsw.util.Geometry.isValidWall(r) && hsw.util.Math.nearlyEquals(r.height3d, entity.height3d) && r.edge.isFlagOn(hsw.model.WallFlagEnum.heightEditable) === entity.edge.isFlagOn(hsw.model.WallFlagEnum.heightEditable) && hsw.util.Math.nearlyEquals(r.width, entity.width)) || v && v.isInHalfWallMode !== this.isInHalfWallMode)
                  y = !0,
                  q(hsw.model.WallSurfaceTypeEnum.to, u)
          }
          var w = new THREE.Box3;
          w.min.set(Math.max(n[0].x, n[3].x) + hsw.view.webgl3d.Constants.TOLERANCE_OFFSET, 0, n[0].z);
          w.max.set(Math.min(n[1].x, n[2].x) - hsw.view.webgl3d.Constants.TOLERANCE_OFFSET, height3d - hsw.view.webgl3d.Constants.TOLERANCE_OFFSET, n[2].z);
          var C = {};
          goog.object.extend(C, entity.edge.openings);
          var r:any = Object.keys(C).map(function(a) {
              return C[a]
          }).filter(function(a) {
              return a.isFlagOff(hsw.core.brep.EntityFlagEnum.hidden)
          })
            , D = {};
          w.empty() || r.forEach(function(a) {
              var b = this._modelSpaceToMeshSpace(a)
                , c = hsw.view.webgl3d.OpeningProfileParser.parse(a.profile);
              hsw.view.webgl3d.Util.isClockwise(c) && c.reverse();
              var d = a.XScale
                ,
              e = a.ZScale;
              c.forEach(function(a) {
                  a.x *= d;
                  a.y *= e;
                  a.x += b.x;
                  a.y += b.y
              });
              c = hsw.util.Collision.ClipPolygon([c], [[{
                  x: w.min.x,
                  y: w.min.y
              }, {
                  x: w.min.x,
                  y: w.max.y
              }, {
                  x: w.max.x,
                  y: w.max.y
              }, {
                  x: w.max.x,
                  y: w.min.y
              }]], {
                  operation: hsw.util.Collision.ClipType.inter
              });
              0 < c.length ? (c[0].push(c[0][0]),
              D[a.ID] = c[0]) : D[a.ID] = []
          }
          .bind(this));
          var A = function(b, c) {
              for (var d = [], e = 0; e < b.length - 1; e++) {
                  var f = b[e]
                    , g = b[e + 1]
                    , h = hsw.util.Math.isZero(f.y) && hsw.util.Math.isZero(g.y)
                    , m = "xz";
                  h ? m = "xy" : Math.abs(f.x - g.x) < Math.abs(f.y - g.y) && (m = "yz");
                  var n:any = [{
                      x: f.x,
                      y: f.y,
                      z: w.max.z
                  }, {
                      x: g.x,
                      y: g.y,
                      z: w.max.z
                  }, {
                      x: g.x,
                      y: g.y,
                      z: w.min.z
                  }, {
                      x: f.x,
                      y: f.y,
                      z: w.min.z
                  }];
                  h ? (n = scope._createOpeningBottomPath(c, f.x, g.x, w),
                  f = hsw.view.webgl3d.Util.createConvexPolygonGeometry(n, {
                      plane: m
                  }),
                  scope._normalizeUVWithFloorPosition(f)) : f = hsw.view.webgl3d.Util.createConvexPolygonGeometry(n, {
                      plane: m
                  });
                  d.push({
                      geometry: f,
                      isBottom: h
                  })
              }
              return d
          }
          ;
          if (entity.edge.openings && entity.edge.coedge === entity && !w.empty()) {
              var z = this._getMaterial(hsw.model.WallSurfaceTypeEnum.inner)
                , F = this._getFloorMaterial();
              Object.keys(entity.edge.openings).forEach(function(a:any) {
                  a =
                  entity.edge.openings[a];
                  var c:any = D[a.ID];
                  c && A(c, a).forEach(function(a) {
                      var b = a.geometry
                        , c :THREE.Material | void = z;
                      a.isBottom && (c = F || c);
                      b = new THREE.Mesh(b,<THREE.Material>c);
                      b.name = "hole";
                      a.isBottom ? e.add(b) : d.add(b)
                  })
              })
          }
          var E = this.isInHalfWallMode ? hsw.core.Config.WALL_HEIGHT_IN_HALF_WALL_MODE : height3d;
          if (t) {
              var H = function(b, c) {
                  var e = b.map(function(a) {
                      return {
                          x: a.x,
                          y: c,
                          z: a.z
                      }
                  });
                  e.reverse();
                  e = hsw.view.webgl3d.Util.createConvexPolygonGeometry(e, {
                      plane: "xz"
                  });
                  hsw.view.webgl3d.Util.normalizeGeometryUV(e, !0);
                  e = new THREE.Mesh(e,scope._getMaterial(hsw.model.WallSurfaceTypeEnum.top));
                  e.name = "top";
                  d.add(e);
                  scope.controller.setMeshInfo(e.uuid, hsw.model.WallSurfaceTypeEnum.top);
                  var f = scope.meshByFaceId.get(hsw.model.WallSurfaceTypeEnum.top);
                  f ? f.push(e) : scope.meshByFaceId.set(hsw.model.WallSurfaceTypeEnum.top, [e])
              }
              ;
              if (this.isInHalfWallMode) {
                  var G = [];
                  G.push(geometry);
                  Object.keys(D).forEach(function(a:any) {
                      var b = D[a];
                      if (b && !(3 > b.length)) {
                          var c, d, e;
                          a = b[0].x;
                          c = b[0].x;
                          d = b[0].y;
                          e = b[0].y;
                          for (var f = 1; f < b.length; ++f) {
                              var g = b[f];
                              a = Math.min(a, g.x);
                              c = Math.max(c, g.x);
                              d = Math.min(d, g.y);
                              e = Math.max(e, g.y)
                          }
                          if (d < hsw.core.Config.WALL_HEIGHT_IN_HALF_WALL_MODE &&
                          hsw.core.Config.WALL_HEIGHT_IN_HALF_WALL_MODE < e && !(0 >= G.length))
                              for (b = 0; b < G.length; b++)
                                  if (d = G[b],
                                  !(3 > d.length)) {
                                      var h:any = -1;
                                      e = -1;
                                      for (f = 0; f < d.length - 1; f++)
                                          0 > h && d[f].x <= a && a < d[f + 1].x && (h = f),
                                          0 > e && d[f].x < c && c <= d[f + 1].x && (e = f + 1);
                                      g = [];
                                      if (0 <= h) {
                                          var m:any = {};
                                          m.x = a;
                                          m.y = E;
                                          m.z = d[h].z;
                                          var n:any = {};
                                          n.x = m.x;
                                          n.y = E;
                                          n.z = d[0].z;
                                          for (f = 0; f <= h; f++)
                                              g.push(d[f]);
                                          g.push(m);
                                          g.push(n)
                                      }
                                      h = [];
                                      if (0 <= e)
                                          for (m = {},
                                          m.x = c,
                                          m.y = E,
                                          m.z = d[d.length - 1].z,
                                          n = {},
                                          n.x = m.x,
                                          n.y = E,
                                          n.z = d[e].z,
                                          h.push(m),
                                          h.push(n),
                                          f = e; f < d.length; f++)
                                              h.push(d[f]);
                                      if (0 < g.length ||
                                      0 < h.length)
                                          G.splice(b, 1),
                                          0 < g.length && G.push(g),
                                          0 < h.length && G.push(h)
                                  }
                      }
                  });
                  G.forEach(function(a) {
                      H(a, E)
                  })
              } else
                  H(geometry, height3d)
          }
          geometry = function(a, b, c, d, e) {
              var f = new THREE.Shape;
              f.moveTo(a.x, 0);
              f.lineTo(a.x, e);
              f.lineTo(b.x, e);
              f.lineTo(b.x, 0);
              f.lineTo(a.x, 0);
              c && Object.keys(D).forEach(function(a:any) {
                  !(a = D[a]) || 3 > a.length || (a = hsw.view.webgl3d.Util.createShapeByLoopPoints(a),
                  f.holes.push(a))
              });
              a = new THREE.ShapeGeometry(f);
              hsw.view.webgl3d.Util.normalizeGeometryUV(a, d);
              return a
          }
          ;
          this.entity.edge.isShared() || (t = new THREE.Mesh(geometry(n[3],
          n[2], !0, !1, height3d),this._getMaterial(hsw.model.WallSurfaceTypeEnum.outer)),
          t.position.z = w.max.z,
          t.name = "outer",
          d.add(t),
          this.controller.setMeshInfo(t.uuid, hsw.model.WallSurfaceTypeEnum.outer),
          this.meshByFaceId.set(hsw.model.WallSurfaceTypeEnum.outer, [t]),
          x && q(hsw.model.WallSurfaceTypeEnum.outerfrom, u),
          y && q(hsw.model.WallSurfaceTypeEnum.outerto, u),
          q = new THREE.Mesh(geometry(n[3], n[2], !1, !1, E),hsw.view.webgl3d.Util.getPickTestMaterial(THREE.FrontSide)),
          q.position.z = t.position.z,
          f.add(q));
          q = new THREE.Mesh(geometry(n[0],
          n[1], !0, !0, height3d),this._getMaterial(hsw.model.WallSurfaceTypeEnum.inner));
          q.position.z = w.min.z;
          q.name = "inner";
          d.add(q);
          this.controller.setMeshInfo(q.uuid, hsw.model.WallSurfaceTypeEnum.inner);
          this.meshByFaceId.set(hsw.model.WallSurfaceTypeEnum.inner, [q]);
          n = new THREE.Mesh(geometry(n[0], n[1], !1, !1, E),hsw.view.webgl3d.Util.getPickTestMaterial(THREE.BackSide));
          n.position.z = q.position.z;
          f.add(n);
          position = hsw.view.webgl3d.Util.ModelSpaceToViewSpace({
              x: position.x,
              y: position.y,
              z: 0
          });
          trans = trans.rotation;
          d.position.copy(position);
          d.rotation.y = trans;
          this.wallMesh =
          d;
          this.node = new THREE.Object3D;
          this.node.add(d);
          e.rotation.x -= Math.PI / 2;
          this.node.add(e);
          this.layer.add(this);
          debugger
          f.position.copy(position);
          f.rotation.y = trans;
          this.noOpeningObject = {
              node: f,
              entity: this.entity
          };
          this.noOpeningWallLayer.add(this.noOpeningObject);
          this.wallMesh.updateMatrixWorld(!0);
          this.noOpeningObject.node.updateMatrixWorld(!0);
          this.context.needsRendering = !0
      }
  }

  noOpeningWallLayer;
  wallMesh;
  noOpeningObject;

  layer:Layer;

  _createOpeningBottomPath(c, f, g, w){

  }

  canDraw(){

  }

  sidePaths(){

  }

  _normalizeUVWithFloorPosition(f){

  }

  _getFloorMaterial(){

  }

}
