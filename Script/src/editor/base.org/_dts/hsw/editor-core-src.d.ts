declare module hsw {

    /** @type {string} */
    var version: string;
}


declare module hsw.app.setting {

    /**
     * @return {undefined}
     */
    function AutoSaver(): void;

    /**
     * @return {undefined}
     */
    function AppSettings(): void;

    /**
     * @return {undefined}
     */
    function AppParams(): void;

    /**
     * @return {undefined}
     */
    function Hotkey(): void;
}

declare module hsw.util {

    /**
     * @param {?} actorA
     * @return {undefined}
     */
    function Signal(actorA: any): void;

    /**
     * @param {(number|string)} element
     * @return {undefined}
     */
    function KeyboardManager(element: number|string): void;

    /**
     * @return {undefined}
     */
    function ObjectPool(): void;
}

declare module hsw.util.Signal {

    /**
     * @param {?} title
     * @return {undefined}
     */
    function Hook(title: any): void;
}

declare module hsw.util.Flag {

    /**
     * @param {?} dataAndEvents
     * @param {?} deepDataAndEvents
     * @return {?}
     */
    function isFlagOn(dataAndEvents: any, deepDataAndEvents: any): any;

    /**
     * @param {?} deepDataAndEvents
     * @param {?} dataAndEvents
     * @return {?}
     */
    function isFlagOff(deepDataAndEvents: any, dataAndEvents: any): any;

    /**
     * @param {?} dataAndEvents
     * @param {boolean} deepDataAndEvents
     * @return {?}
     */
    function setFlagOn(dataAndEvents: any, deepDataAndEvents: boolean): any;

    /**
     * @param {?} deepDataAndEvents
     * @param {boolean} dataAndEvents
     * @return {?}
     */
    function setFlagOff(deepDataAndEvents: any, dataAndEvents: boolean): any;
}

declare module hsw.core.brep {

    /**
     * @param {?} mapper
     * @param {?} options
     * @param {?} capture
     * @param {?} opt_coordHeight
     * @return {undefined}
     */
    function Bound(mapper: any, options: any, capture: any, opt_coordHeight: any): void;

    /**
     * @return {undefined}
     */
    function Entity(): void;

    /**
     * @param {?} v2
     * @param {?} v1
     * @return {undefined}
     */
    function Vertex(v2: any, v1: any): void;

    /**
     * @param {Object} from
     * @param {Object} to
     * @return {undefined}
     */
    function Edge(from: Object, to: Object): void;

    /**
     * @param {Object} c
     * @return {undefined}
     */
    function CoEdge(c: Object): void;

    /**
     * @return {undefined}
     */
    function Polyline(): void;

    /**
     * @return {undefined}
     */
    function Loop(): void;

    /**
     * @return {undefined}
     */
    function BezierEdge(): void;

    /**
     * @return {undefined}
     */
    function Body(): void;
}

declare module hsw.core {

    /**
     * @param {Object} dataAndEvents
     * @return {?}
     */
    function Id(dataAndEvents: Object): any;

    /**
     * @param {string} type
     * @return {?}
     */
    function define(type: string): any;
}

declare module hsw.core.Id {

    /**
     * @return {?}
     */
    function randomGUID(): any;
}

declare module hsw.core.brep.Entity {

    /**
     * @param {?} dataAndEvents
     * @param {string} datum
     * @param {string} graphics
     * @param {?} attributes
     * @return {undefined}
     */
    function defaultFieldChangedCallback(dataAndEvents: any, datum: string, graphics: string, attributes: any): void;
}

declare module hsw.model {

    /** @type {Array.<string>} */
    var RoomTypes: Array<string>;

    /**
     * @param {?} attributes
     * @return {undefined}
     */
    function Material(attributes: any): void;

    /**
     * @param {?} geometry
     * @param {?} y
     * @return {undefined}
     */
    function Point(geometry: any, y: any): void;

    /**
     * @param {?} field
     * @param {?} initial
     * @return {undefined}
     */
    function Wall(field: any, initial: any): void;

    /**
     * @return {undefined}
     */
    function Content(): void;

    /**
     * @return {undefined}
     */
    function Opening(): void;

    /**
     * @return {undefined}
     */
    function Door(): void;

    /**
     * @param {?} mapper
     * @param {Object} inplace
     * @return {undefined}
     */
    function CoWall(mapper: any, inplace: Object): void;

    /**
     * @return {undefined}
     */
    function Room(): void;

    /**
     * @return {undefined}
     */
    function Underlay(): void;

    /**
     * @return {undefined}
     */
    function Grid(): void;

    /**
     * @return {undefined}
     */
    function Window(): void;

    /**
     * @param {string} eventType
     * @return {undefined}
     */
    function Molding(eventType: string): void;

    /**
     * @return {undefined}
     */
    function Hole(): void;

    /**
     * @param {string} id
     * @return {undefined}
     */
    function Camera(id: string): void;

    /**
     * @param {Object} group
     * @return {undefined}
     */
    function Group(group: Object): void;

    /**
     * @return {undefined}
     */
    function Object(): void;

    /**
     * @return {undefined}
     */
    function Floorplan(): void;

    /**
     * @return {undefined}
     */
    function Api(): void;

    /**
     * @return {undefined}
     */
    function Floor(): void;
}

declare module hsw.model.Pattern {

    /**
     * @param {number} opt_attributes
     * @param {number} code
     * @param {string} childrenVarArgs
     * @return {?}
     */
    function makePattern(opt_attributes: number, code: number, childrenVarArgs: string): any;
}

declare module hsw.model.Wall {

    /**
     * @param {?} name
     * @param {?} dataAndEvents
     * @return {?}
     */
    function wallInSameRoom(name: any, dataAndEvents: any): any;
}

declare module hsw.util.Math {

    /** @type {number} */
    var precisionDigits: number;

    /** @type {number} */
    var defaultTolerance: number;

    /**
     * @param {?} v02
     * @param {number} recurring
     * @param {number} opt_attributes
     * @return {?}
     */
    function nearlyEquals(v02: any, recurring: number, opt_attributes: number): any;

    /**
     * @param {(number|string)} a
     * @param {number} opt_attributes
     * @return {?}
     */
    function isZero(a: number|string, opt_attributes: number): any;

    /**
     * @param {?} position
     * @param {Array} obj
     * @param {boolean} recurring
     * @param {number} dataAndEvents
     * @return {?}
     */
    function isPointInPolygon(position: any, obj: Array<any>, recurring: boolean, dataAndEvents: number): any;

    /**
     * @param {(Array|Uint8Array)} values
     * @param {Array} val
     * @param {number} dataAndEvents
     * @return {?}
     */
    function isPolygonInPolygon(values: Array<any>|Uint8Array, val: Array<any>, dataAndEvents: number): any;

    /**
     * @param {Array} actual
     * @param {Array} expected
     * @param {number} dataAndEvents
     * @return {?}
     */
    function isPolygonOverlapped(actual: Array<any>, expected: Array<any>, dataAndEvents: number): any;

    /**
     * @param {?} walkers
     * @param {?} chars
     * @param {Array} spec
     * @param {number} dataAndEvents
     * @return {?}
     */
    function isSegmentIntersectedWithPolygon(walkers: any, chars: any, spec: Array<any>, dataAndEvents: number): any;

    /**
     * @param {?} deepDataAndEvents
     * @param {?} regex
     * @param {number} dataAndEvents
     * @return {?}
     */
    function isPointOnPolygon(deepDataAndEvents: any, regex: any, dataAndEvents: number): any;

    /**
     * @param {?} a
     * @param {?} cfg
     * @param {?} result
     * @param {number} opt_attributes
     * @return {?}
     */
    function isPointInLine(a: any, cfg: any, result: any, opt_attributes: number): any;

    /**
     * @param {Object} result
     * @param {Object} source
     * @param {?} column
     * @return {?}
     */
    function closestDistance(result: Object, source: Object, column: any): any;

    /**
     * @param {?} c
     * @param {?} a
     * @param {?} b
     * @param {number} d
     * @return {?}
     */
    function isPointInLineSegment(c: any, a: any, b: any, d: number): any;

    /**
     * @param {Object} pos
     * @param {Object} p2
     * @param {?} p0
     * @param {Object} p1
     * @return {?}
     */
    function isPointsOnSameSide(pos: Object, p2: Object, p0: any, p1: Object): any;

    /**
     * @param {number} j
     * @param {number} b
     * @param {number} x
     * @param {?} r
     * @param {number} opt_attributes
     * @return {?}
     */
    function isSegmentsOverlapped(j: number, b: number, x: number, r: any, opt_attributes: number): any;

    /**
     * @param {?} v
     * @param {?} nv
     * @param {number} opt_attributes
     * @return {?}
     */
    function isSameDirection(v: any, nv: any, opt_attributes: number): any;

    /**
     * @param {number} a
     * @param {?} b
     * @param {number} i
     * @return {?}
     */
    function getLerpNumber(a: number, b: any, i: number): any;

    /**
     * @param {?} prop
     * @param {?} opt_attributes
     * @param {number} obj
     * @return {?}
     */
    function rotatePointCW(prop: any, opt_attributes: any, obj: number): any;

    /**
     * @param {?} s
     * @param {?} e
     * @return {?}
     */
    function getAngleHorizontaleCCW(s: any, e: any): any;

    /**
     * @param {Object} pos
     * @param {Object} source
     * @param {?} str
     * @return {?}
     */
    function getPerpendicularIntersect(pos: Object, source: Object, str: any): any;

    /**
     * @param {Object} value
     * @param {Object} source
     * @param {?} str
     * @return {?}
     */
    function getClosestSegmentPoint(value: Object, source: Object, str: any): any;

    /**
     * @param {Object} target
     * @param {(Array|Uint8Array)} codeSegments
     * @return {?}
     */
    function closestDistanceToPolygon(target: Object, codeSegments: Array<any>|Uint8Array): any;

    /**
     * @param {Object} arg
     * @param {(Array|Uint8Array)} obj
     * @return {?}
     */
    function closestPointToPolygon(arg: Object, obj: Array<any>|Uint8Array): any;

    /**
     * @param {Object} method
     * @param {Object} value
     * @param {?} arg
     * @return {?}
     */
    function closestDistanceToSegment(method: Object, value: Object, arg: any): any;

    /**
     * @param {Object} point
     * @param {Object} str
     * @param {?} pos
     * @return {?}
     */
    function scalePoint(point: Object, str: Object, pos: any): any;

    /**
     * @param {Object} source
     * @param {Object} str
     * @return {?}
     */
    function pointLength(source: Object, str: Object): any;

    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function getLineAngle(a: any, b: any): any;

    /**
     * @param {?} p1
     * @param {?} obj
     * @param {number} opt_attributes
     * @return {?}
     */
    function isSamePoint(p1: any, obj: any, opt_attributes: number): any;

    /**
     * @param {?} v0
     * @param {?} argv
     * @param {number} opt_attributes
     * @return {?}
     */
    function isSamePoint3(v0: any, argv: any, opt_attributes: number): any;

    /**
     * @param {?} a
     * @param {?} b
     * @param {?} p
     * @param {?} s
     * @param {number} opt_attributes
     * @return {?}
     */
    function isParallel(a: any, b: any, p: any, s: any, opt_attributes: number): any;

    /**
     * @param {Node} v2
     * @param {?} v1
     * @param {Node} b
     * @param {?} a
     * @param {number} opt_attributes
     * @return {?}
     */
    function isPerpendicular(v2: Node, v1: any, b: Node, a: any, opt_attributes: number): any;

    /**
     * @param {?} p
     * @param {?} key
     * @param {?} c
     * @param {?} a
     * @param {number} opt_attributes
     * @return {?}
     */
    function isSameLine(p: any, key: any, c: any, a: any, opt_attributes: number): any;

    /**
     * @param {Array} a
     * @param {Array} b
     * @param {(number|string)} opt_attributes
     * @return {?}
     */
    function isSamePolygon(a: Array<any>, b: Array<any>, opt_attributes: number|string): any;

    /**
     * @param {number} y
     * @param {number} x
     * @param {number} data
     * @param {?} result
     * @param {number} opt_attributes
     * @return {?}
     */
    function isSameLineSegment(y: number, x: number, data: number, result: any, opt_attributes: number): any;

    /**
     * @param {Object} a
     * @param {Object} b
     * @param {?} v
     * @param {?} data
     * @return {?}
     */
    function lineLineIntersection(a: Object, b: Object, v: any, data: any): any;

    /**
     * @param {?} obj
     * @param {?} tag
     * @param {?} v
     * @param {?} value
     * @param {number} dataAndEvents
     * @return {?}
     */
    function segmentSegmentIntersection(obj: any, tag: any, v: any, value: any, dataAndEvents: number): any;

    /**
     * @param {Object} r
     * @param {Object} d
     * @param {number} c
     * @param {Object} i
     * @param {number} attributes
     * @return {?}
     */
    function raySegmentIntersection(r: Object, d: Object, c: number, i: Object, attributes: number): any;

    /**
     * @param {Function} o
     * @param {?} value
     * @param {?} k
     * @param {?} key
     * @return {?}
     */
    function lineLineAngle(o: Function, value: any, k: any, key: any): any;

    /**
     * @param {Object} property
     * @param {?} value
     * @param {Object} name
     * @param {?} string
     * @return {?}
     */
    function lineLineAngleCCW(property: Object, value: any, name: Object, string: any): any;

    /**
     * @param {Array} p
     * @return {?}
     */
    function getBounds(p: Array<any>): any;

    /**
     * @param {?} n
     * @return {?}
     */
    function roundToPowerOf2(n: any): any;

    /**
     * @param {Object} v00
     * @return {?}
     */
    function toPersistentPrecision(v00: Object): any;

    /**
     * @param {number} children
     * @param {number} child
     * @return {?}
     */
    function randomInRange(children: number, child: number): any;

    /**
     * @param {?} b
     * @param {number} value
     * @param {number} result
     * @param {number} dataAndEvents
     * @return {?}
     */
    function computeOutline(b: any, value: number, result: number, dataAndEvents: number): any;

    /**
     * @param {?} startPoint
     * @param {?} endPoint
     * @return {?}
     */
    function getCentralLineOfLineSegment(startPoint: any, endPoint: any): any;
}

declare module hsw.util.Url {

    /** @type {RegExp} */
    var _REGEX_HOST: RegExp;

    /**
     * @param {Object} src
     * @return {?}
     */
    function getHost(src: Object): any;

    /**
     * @param {string} path
     * @return {?}
     */
    function getPath(path: string): any;

    /**
     * @param {?} objects
     * @return {?}
     */
    function isCrossOriginUrl(objects: any): any;

    /**
     * @param {string} key
     * @return {?}
     */
    function useCORSProxy(key: string): any;

    /**
     * @param {?} url
     * @return {?}
     */
    function isLocalUrl(url: any): any;

    /**
     * @param {Object} path
     * @return {?}
     */
    function isDataUrl(path: Object): any;

    /**
     * @param {Object} a
     * @param {Object} b
     * @return {?}
     */
    function isSameUrl(a: Object, b: Object): any;

    /**
     * @param {string} baseName
     * @param {string} path
     * @return {?}
     */
    function toAbsolutePath(baseName: string, path: string): any;

    /**
     * @param {string} options
     * @param {string} value
     * @param {number} index
     * @return {?}
     */
    function addParam(options: string, value: string, index: number): any;

    /**
     * @param {string} params
     * @param {?} opt_attributes
     * @return {?}
     */
    function addParams(params: string, opt_attributes: any): any;

    /**
     * @param {string} name
     * @return {?}
     */
    function getExtension(name: string): any;

    /**
     * @param {string} p
     * @return {?}
     */
    function toTimestampedUrl(p: string): any;

    /**
     * @param {string} atts
     * @return {?}
     */
    function isValidUrl(atts: string): any;
}

declare module hsw.util.Request {

    /**
     * @param {string} method
     * @param {?} url
     * @return {?}
     */
    function createCORSRequest(method: string, url: any): any;

    /**
     * @param {?} data
     * @param {?} url
     * @param {?} resolve
     * @return {undefined}
     */
    function uploadJsonToS3(data: any, url: any, resolve: any): void;

    /**
     * @param {Event} file
     * @param {?} url
     * @param {?} resolve
     * @param {?} debug
     * @return {undefined}
     */
    function uploadToS3(file: Event, url: any, resolve: any, debug: any): void;

    /**
     * @param {string} params
     * @param {Object} options
     * @return {?}
     */
    function getData(params: string, options: Object): any;

    /**
     * @param {string} data
     * @param {string} o
     * @param {Object} options
     * @return {?}
     */
    function postData(data: string, o: string, options: Object): any;

    /**
     * @param {Object} params
     * @param {?} value
     * @param {?} opt_attributes
     * @return {?}
     */
    function putData(params: Object, value: any, opt_attributes: any): any;

    /**
     * @param {Object} methods
     * @param {?} generatedLine
     * @param {Object} details
     * @return {?}
     */
    function patchData(methods: Object, generatedLine: any, details: Object): any;

    /**
     * @param {?} key
     * @param {Object} options
     * @return {?}
     */
    //function delete(key: any, options: Object): any;

    /**
     * @param {string} method
     * @param {string} requestUrl
     * @return {?}
     */
    function putRequest(method: string, requestUrl: string): any;

    /**
     * @param {string} oauth_token
     * @return {?}
     */
    function getSessionByToken(oauth_token: string): any;

    /**
     * @param {Object} a
     * @param {string} b
     * @return {?}
     */
    function deleteDesignByAssetId(a: Object, b: string): any;

    /**
     * @param {Object} dataAndEvents
     * @param {string} authorization
     * @param {Object} cssText
     * @return {?}
     */
    function updateDesignByAssetId(dataAndEvents: Object, authorization: string, cssText: Object): any;

    /**
     * @param {Object} screenName
     * @param {string} authorization
     * @param {(number|string)} value
     * @return {?}
     */
    function updateDesignStatusByAssetId(screenName: Object, authorization: string, value: number|string): any;

    /**
     * @param {string} count
     * @param {number} indentUnit
     * @param {number} limit
     * @param {(number|string)} dataAndEvents
     * @return {?}
     */
    function getDesignsByUser(count: string, indentUnit: number, limit: number, dataAndEvents: number|string): any;

    /**
     * @param {string} sid2
     * @param {number} indentUnit
     * @param {number} deepDataAndEvents
     * @param {(number|string)} dataAndEvents
     * @param {string} count
     * @return {?}
     */
    function getRecentProducts(sid2: string, indentUnit: number, deepDataAndEvents: number, dataAndEvents: number|string, count: string): any;

    /**
     * @param {string} postData
     * @param {(number|string)} dataAndEvents
     * @return {?}
     */
    function addToRecent(postData: string, dataAndEvents: number|string): any;

    /**
     * @param {?} deepDataAndEvents
     * @return {?}
     */
    function _getQueryType(deepDataAndEvents: any): any;

    /**
     * @param {string} sid2
     * @param {?} dataAndEvents
     * @param {string} contentType
     * @param {number} details
     * @return {?}
     */
    function getS3pathToUpload(sid2: string, dataAndEvents: any, contentType: string, details: number): any;

    /**
     * @param {string} params
     * @return {?}
     */
    function _addParamForModeller(params: string): any;

    /**
     * @param {?} dataAndEvents
     * @return {?}
     */
    function querySnapshotsByDesignId_mockup(dataAndEvents: any): any;

    /**
     * @param {string} dataAndEvents
     * @return {?}
     */
    function querySnapshotsByDesignId(dataAndEvents: string): any;

    /**
     * @param {string} data
     * @return {?}
     */
    function sendNewRender(data: string): any;

    /**
     * @param {string} idx
     * @param {string} dataAndEvents
     * @return {?}
     */
    function querySnapshotStatus(idx: string, dataAndEvents: string): any;

    /**
     * @return {?}
     */
    function queryAverageRenderTime(): any;

    /**
     * @param {string} dataAndEvents
     * @return {?}
     */
    function removeSnapshotNewTag(dataAndEvents: string): any;

    /**
     * @param {string} dataAndEvents
     * @return {?}
     */
    function cancelSnapshot(dataAndEvents: string): any;

    /**
     * @param {string} snapshot
     * @return {?}
     */
    function deleteSnapshot(snapshot: string): any;

    /**
     * @param {string} authorization
     * @return {?}
     */
    function queryEmailNotification(authorization: string): any;

    /**
     * @param {string} authorization
     * @param {boolean} bool
     * @return {?}
     */
    function updateEmailNotification(authorization: string, bool: boolean): any;

    /**
     * @param {?} docs
     * @return {?}
     */
    function _preProcessFavorites(docs: any): any;

    /**
     * @return {?}
     */
    function _getTenant(): any;

    /**
     * @return {?}
     */
    function _getLanguage(): any;

    /**
     * @return {?}
     */
    function _getProvider(): any;

    /**
     * @return {?}
     */
    function _getDevice(): any;

    /**
     * @return {?}
     */
    function _getRegionCode(): any;

    /**
     * @param {(number|string)} obj
     * @param {string} value
     * @param {?} dataAndEvents
     * @return {?}
     */
    function getAppParams(obj: number|string, value: string, dataAndEvents: any): any;

    /**
     * @return {?}
     */
    function _getHost(): any;

    /**
     * @return {?}
     */
    function _getApp(): any;
}

declare module hsw.io.request.Favorites {

    /**
     * @param {string} i
     * @param {(Object|boolean|number|string)} z
     * @return {?}
     */
    function getFavoriteProducts(i: string, z: Object|boolean|number|string): any;

    /**
     * @param {string} bus
     * @param {?} model
     * @param {Object} presentationId
     * @param {Object} options
     * @return {?}
     */
    function addFavorite(bus: string, model: any, presentationId: Object, options: Object): any;

    /**
     * @param {string} sid2
     * @param {?} postId
     * @param {Object} options
     * @return {?}
     */
    function deleteFavorite(sid2: string, postId: any, options: Object): any;

    /**
     * @param {?} docs
     * @return {?}
     */
    function _preProcessFavorites(docs: any): any;
}

declare module hsw.io.request.WishList {

    /**
     * @param {Object} response
     * @return {?}
     */
    function getWishList(response: Object): any;

    /**
     * @param {Object} response
     * @return {?}
     */
    function getWishListProducts(response: Object): any;

    /**
     * @param {?} k
     * @return {?}
     */
    function _preProcessWishProducts(k: any): any;

    /**
     * @param {Object} options
     * @return {?}
     */
    function createWishList(options: Object): any;

    /**
     * @param {?} event
     * @return {?}
     */
    function getProductsByWishId(event: any): any;

    /**
     * @param {?} event
     * @return {?}
     */
    function addProductToWishList(event: any): any;

    /**
     * @param {?} event
     * @return {?}
     */
    function removeProductFromWishList(event: any): any;

    /**
     * @param {string} separator2
     * @return {?}
     */
    function removeWishList(separator2: string): any;
}

declare module hsw.io.request.Catalog {

    /** @type {Array.<?>} */
    var ProductFacetTypeValues: Array<any>;

    /**
     * @param {?} attributes
     * @return {?}
     */
    function _getHardCodeTenant(attributes: any): any;

    /**
     * @param {string} count
     * @param {?} opt_attributes
     * @param {string} isXML
     * @return {?}
     */
    function getProductById(count: string, opt_attributes: any, isXML: string): any;

    /**
     * @param {string} count
     * @param {?} opt_attributes
     * @param {string} isXML
     * @return {?}
     */
    function getProductByExternalId(count: string, opt_attributes: any, isXML: string): any;

    /**
     * @param {Object} result
     * @param {Object} data
     * @param {string} key
     * @return {?}
     */
    function getProductsByIds(result: Object, data: Object, key: string): any;

    /**
     * @param {(Error|string)} deepDataAndEvents
     * @param {number} walkers
     * @param {string} end
     * @return {?}
     */
    function getCategoryTree(deepDataAndEvents: Error|string, walkers: number, end: string): any;

    /**
     * @param {string} count
     * @param {number} attributes
     * @param {number} maxChars
     * @param {?} id
     * @param {?} deepDataAndEvents
     * @param {?} opt_attributes
     * @param {string} end
     * @return {?}
     */
    function getProductsByCategoryId(count: string, attributes: number, maxChars: number, id: any, deepDataAndEvents: any, opt_attributes: any, end: string): any;

    /**
     * @param {Array} recipients
     * @param {?} attributes
     * @param {string} isXML
     * @return {?}
     */
    function getProductsByFamilyIds(recipients: Array<any>, attributes: any, isXML: string): any;

    /**
     * @param {?} last
     * @param {?} opt_attributes
     * @param {string} isXML
     * @return {?}
     */
    function getFamilyTree(last: any, opt_attributes: any, isXML: string): any;

    /**
     * @param {?} dataAndEvents
     * @param {number} pY
     * @param {?} start_block
     * @param {number} attributes
     * @param {number} attr
     * @param {?} id
     * @param {?} deepDataAndEvents
     * @param {Object} data
     * @param {string} count
     * @return {?}
     */
    function searchProducts(dataAndEvents: any, pY: number, start_block: any, attributes: number, attr: number, id: any, deepDataAndEvents: any, data: Object, count: string): any;

    /**
     * @param {number} properties
     * @param {number} chars
     * @param {Object} data
     * @param {Array} deepDataAndEvents
     * @param {string} end
     * @return {?}
     */
    function _getFacetsProductQueryParams(properties: number, chars: number, data: Object, deepDataAndEvents: Array<any>, end: string): any;

    /**
     * @param {string} authorization
     * @param {?} opt_attributes
     * @return {?}
     */
    function getCustomizedProducts(authorization: string, opt_attributes: any): any;

    /**
     * @param {string} authorization
     * @param {string} postData
     * @param {?} data
     * @return {?}
     */
    function addCustomizedProduct(authorization: string, postData: string, data: any): any;

    /**
     * @param {string} authorization
     * @param {string} url
     * @param {?} data
     * @return {?}
     */
    function deleteCustomizedProduct(authorization: string, url: string, data: any): any;

    /**
     * @param {string} authorization
     * @param {string} count
     * @param {?} cssText
     * @param {?} data
     * @return {?}
     */
    function updateCustomizedProduct(authorization: string, count: string, cssText: any, data: any): any;
}

declare module hsw.catalog.iterator {

    /**
     * @param {?} dataAndEvents
     * @param {Array} data
     * @param {Object} options
     * @return {undefined}
     */
    function Product(dataAndEvents: any, data: Array<any>, options: Object): void;

    /**
     * @param {?} dataAndEvents
     * @param {?} graphics
     * @param {?} mapper
     * @return {undefined}
     */
    function SearchById(dataAndEvents: any, graphics: any, mapper: any): void;

    /**
     * @param {?} stkTyp
     * @param {?} dataAndEvents
     * @param {?} aValue
     * @param {?} graphics
     * @param {?} mapper
     * @param {number} farmOrgLoc
     * @return {undefined}
     */
    function SearchProduct(stkTyp: any, dataAndEvents: any, aValue: any, graphics: any, mapper: any, farmOrgLoc: number): void;

    /**
     * @param {?} dataAndEvents
     * @param {?} deepDataAndEvents
     * @param {?} mapper
     * @return {undefined}
     */
    function HardcodeProduct(dataAndEvents: any, deepDataAndEvents: any, mapper: any): void;

    /**
     * @param {?} dataAndEvents
     * @param {?} mapper
     * @return {undefined}
     */
    function RecentProduct(dataAndEvents: any, mapper: any): void;

    /**
     * @param {?} dataAndEvents
     * @param {?} mapper
     * @return {undefined}
     */
    function CustomizedProduct(dataAndEvents: any, mapper: any): void;

    /**
     * @param {?} dataAndEvents
     * @param {?} mapper
     * @return {undefined}
     */
    function FavoriteProduct(dataAndEvents: any, mapper: any): void;

    /**
     * @param {?} dataAndEvents
     * @param {?} graphics
     * @param {?} mapper
     * @return {undefined}
     */
    function CategoryProduct(dataAndEvents: any, graphics: any, mapper: any): void;
}

declare module hsw.catalog {

    /**
     * @param {string} params
     * @return {undefined}
     */
    function ContentType(params: string): void;

    /**
     * @return {undefined}
     */
    function Manager(): void;
}

declare module hsw.util.CryptoJS {

    /**
     * @param {string} value
     * @param {string} key
     * @return {?}
     */
    function decode(value: string, key: string): any;
}

declare module hsw.ext.threejs {

    /**
     * @param {?} dataAndEvents
     * @return {undefined}
     */
    function OBJLoader(dataAndEvents: any): void;

    /**
     * @return {undefined}
     */
    function OBJExport(): void;

    /**
     * @param {?} mapper
     * @return {undefined}
     */
    function BinaryOBJLoader(mapper: any): void;
}

declare module hsw.ext.threejs.OBJLoader {

    /** @type {boolean} */
    var async: boolean;
}

declare module hsw.util.Unit {

    /**
     * @param {string} keepData
     * @param {?} timeoutKey
     * @return {?}
     */
    function ConvertLengthToDatabaseUnit(keepData: string, timeoutKey: any): any;

    /**
     * @param {string} keepData
     * @param {?} n
     * @return {?}
     */
    function ConvertAreaToDatabaseUnit(keepData: string, n: any): any;

    /**
     * @param {?} a
     * @param {?} deepDataAndEvents
     * @return {?}
     */
    function ConvertToMeter(a: any, deepDataAndEvents: any): any;

    /**
     * @param {Object} m3
     * @param {?} arg
     * @return {?}
     */
    function ConvertMeterToCustom(m3: Object, arg: any): any;
}

declare module hsw.catalog.meta.Util {

    /**
     * @param {Object} val
     * @param {?} name
     * @param {Function} type
     * @param {boolean} value
     * @return {?}
     */
    function getAttribute(val: Object, name: any, type: Function, value: boolean): any;

    /**
     * @param {Object} opts
     * @return {?}
     */
    function getTypeForAssembly(opts: Object): any;

    /**
     * @param {?} dataAndEvents
     * @return {?}
     */
    function buildDefaultProductURL(dataAndEvents: any): any;
}

declare module hsw.catalog.meta.Content {

    /**
     * @param {(Node|string)} obj
     * @param {Object} options
     * @return {?}
     */
    function updateMeta(obj: Node|string, options: Object): any;
}

declare module hsw.catalog.meta.Assembly {

    /**
     * @param {(Node|string)} response
     * @param {Object} opts
     * @param {?} actual
     * @return {?}
     */
    function updateMeta(response: Node|string, opts: Object, actual: any): any;
}

declare module hsw.catalog.meta.Opening {

    /**
     * @param {Node} result
     * @param {Object} source
     * @return {?}
     */
    function updateMeta(result: Node, source: Object): any;
}

declare module hsw.catalog.meta.Material {

    /**
     * @param {(Node|string)} obj
     * @param {Object} name
     * @return {?}
     */
    function updateMeta(obj: Node|string, name: Object): any;
}

declare module hsw.catalog.meta.Molding {

    /**
     * @param {Node} result
     * @param {Object} opts
     * @return {?}
     */
    function updateMeta(result: Node, opts: Object): any;
}

declare module hsw.catalog.meta.Builder {

    /** @type {Array} */
    var _metaProcessors: Array<any>;

    /**
     * @param {Object} path
     * @param {?} name
     * @return {?}
     */
    function build(path: Object, name: any): any;

    /**
     * @param {?} spaceName
     * @return {undefined}
     */
    function addMetaProcessor(spaceName: any): void;

    /**
     * @param {Object} item
     * @return {?}
     */
    function _createMeta(item: Object): any;
}

declare module hsw.catalog.Manager {

    /**
     * @return {?}
     */
    function instance(): any;
}

declare module hsw.core.brep.CoEdge {

    /**
     * @param {?} owner
     * @param {?} cl
     * @return {?}
     */
    function create(owner: any, cl: any): any;
}

declare module hsw.model.CoWall {

    /**
     * @param {Object} result
     * @param {?} list
     * @param {Object} url_params
     * @return {?}
     */
    function createFromPoints(result: Object, list: any, url_params: Object): any;
}

declare module hsw.model.Room {

    /**
     * @param {Array} str
     * @return {?}
     */
    function buildRoomFromPointList(str: Array<any>): any;

    /**
     * @param {Array} xs
     * @return {?}
     */
    function buildRoomFromWallList(xs: Array<any>): any;
}

declare module hsw.model.Molding {

    /**
     * @param {?} key
     * @return {?}
     */
    function isValidMoldingType(key: any): any;
}

declare module hsw.util.Version {

    /**
     * @param {string} other
     * @param {string} v
     * @return {?}
     */
    function compare(other: string, v: string): any;

    /**
     * @param {?} bench
     * @param {string} datum
     * @return {?}
     */
    function isEarlierThan(bench: any, datum: string): any;

    /**
     * @param {string} bench
     * @param {string} datum
     * @return {?}
     */
    function isLaterThan(bench: string, datum: string): any;
}

declare module hsw.cmd {

    /**
     * @return {undefined}
     */
    function Manager(): void;

    /**
     * @return {undefined}
     */
    function Command(): void;

    /**
     * @param {Array} dataAndEvents
     * @return {undefined}
     */
    function CompositeCommand(dataAndEvents: Array<any>): void;
}

declare module hsw.cmd.Manager {

    /**
     * @return {?}
     */
    function instance(): any;
}

declare module hsw.util.Point {

    /**
     * @param {?} type
     * @return {?}
     */
    function getPointOwner(type: any): any;

    /**
     * @param {Array} matches
     * @return {?}
     */
    function getAllRoomPoints(matches: Array<any>): any;

    /**
     * @param {?} object
     * @return {?}
     */
    function getParentCoEdges(object: any): any;

    /**
     * @param {?} key
     * @return {?}
     */
    function tryMergeWallOnPoint(key: any): any;

    /**
     * @param {?} value
     * @param {string} val
     * @return {undefined}
     */
    function replace(value: any, val: string): void;
}

declare class Arguments{}

declare module hsw.util.Transaction {

    /**
     * @param {Object} self
     * @param {Arguments} obj
     * @return {undefined}
     */
    function savePointToData(self: Object, obj: Arguments): void;

    /**
     * @param {Object} self
     * @param {Arguments} obj
     * @return {undefined}
     */
    function saveContentToData(self: Object, obj: Arguments): void;

    /**
     * @param {?} item
     * @return {undefined}
     */
    function _updateEntities(item: any): void;

    /**
     * @param {Object} obj
     * @param {Object} self
     * @param {Object} lerp
     * @param {boolean} recurring
     * @return {undefined}
     */
    function restorePointFromData(obj: Object, self: Object, lerp: Object, recurring: boolean): void;

    /**
     * @param {Object} obj
     * @param {Object} e
     * @param {Object} fn
     * @param {boolean} recurring
     * @return {undefined}
     */
    function restoreContentFromData(obj: Object, e: Object, fn: Object, recurring: boolean): void;

    /**
     * @param {Object} group
     * @param {Arguments} obj
     * @return {undefined}
     */
    function saveGroupToData(group: Object, obj: Arguments): void;

    /**
     * @param {Object} obj
     * @param {Arguments} data
     * @param {Object} counts
     * @param {boolean} recurring
     * @return {undefined}
     */
    function restoreGroupFromData(obj: Object, data: Arguments, counts: Object, recurring: boolean): void;

    /**
     * @param {Object} self
     * @param {Arguments} cache
     * @return {undefined}
     */
    function saveWallToData(self: Object, cache: Arguments): void;

    /**
     * @param {Object} p
     * @param {Arguments} data
     * @param {Object} deepDataAndEvents
     * @param {boolean} recurring
     * @return {undefined}
     */
    function restoreWallFromData(p: Object, data: Arguments, deepDataAndEvents: Object, recurring: boolean): void;

    /**
     * @param {?} _parent
     * @param {Arguments} walkers
     * @return {undefined}
     */
    function saveContentsToData(_parent: any, walkers: Arguments): void;

    /**
     * @param {HTMLElement} parent
     * @param {Arguments} obj
     * @param {Object} counts
     * @param {boolean} recurring
     * @return {undefined}
     */
    function restoreContentsFromData(parent: HTMLElement, obj: Arguments, counts: Object, recurring: boolean): void;

    /**
     * @param {?} _parent
     * @param {Arguments} deepDataAndEvents
     * @return {undefined}
     */
    function saveWallsToData(_parent: any, deepDataAndEvents: Arguments): void;

    /**
     * @param {(Array|string)} items
     * @param {Arguments} obj
     * @param {Object} deepDataAndEvents
     * @param {boolean} recurring
     * @return {undefined}
     */
    function restoreWallsFromData(items: Array<any>|string, obj: Arguments, deepDataAndEvents: Object, recurring: boolean): void;

    /**
     * @param {Object} parent
     * @param {Arguments} deepDataAndEvents
     * @return {undefined}
     */
    function saveRoomsToData(parent: Object, deepDataAndEvents: Arguments): void;

    /**
     * @param {Object} parent
     * @param {Arguments} files
     * @param {Object} insert
     * @param {boolean} recurring
     * @return {undefined}
     */
    function restoreRoomsFromData(parent: Object, files: Arguments, insert: Object, recurring: boolean): void;

    /**
     * @param {?} _parent
     * @param {?} deepDataAndEvents
     * @return {undefined}
     */
    function saveFloorplanTop(_parent: any, deepDataAndEvents: any): void;

    /**
     * @param {?} _parent
     * @param {?} walkers
     * @param {boolean} dataAndEvents
     * @return {undefined}
     */
    function restoreFloorplanTop(_parent: any, walkers: any, dataAndEvents: boolean): void;
}

declare module hsw.cmd.point {

    /**
     * @param {?} point
     * @return {undefined}
     */
    function CmdMergeWallOnPoint(point: any): void;

    /**
     * @param {?} point
     * @return {undefined}
     */
    function CmdDeletePoint(point: any): void;

    /**
     * @param {?} point
     * @return {undefined}
     */
    function CmdMovePoint(point: any): void;
}

declare module hsw.selection {

    /**
     * @param {?} entity
     * @param {Object} evt
     * @return {undefined}
     */
    function PickResult(entity: any, evt: Object): void;

    /**
     * @return {undefined}
     */
    function Manager(): void;
}

declare module hsw.selection.Manager {

    /**
     * @return {?}
     */
    function instance(): any;
}

declare module hsw.util.Room {

    /**
     * @param {Object} dataAndEvents
     * @return {undefined}
     */
    function RoomSplitter(dataAndEvents: Object): void;

    /**
     * @param {Array} matches
     * @param {Array} suites
     * @return {?}
     */
    function splitRooms(matches: Array<any>, suites: Array<any>): any;

    /**
     * @param {?} config
     * @param {?} obj
     * @param {Array} value
     * @return {?}
     */
    function _retrievePointsInLine(config: any, obj: any, value: Array<any>): any;

    /**
     * @param {Object} items
     * @param {Object} resultItems
     * @param {(Node|string)} item
     * @return {undefined}
     */
    function tryAssignRoomProperties(items: Object, resultItems: Object, item: Node|string): void;

    /**
     * @param {Array} xs
     * @return {?}
     */
    function _filterDuplicatedLoops(xs: Array<any>): any;

    /**
     * @param {Array} xs
     * @return {?}
     */
    function _filterExistingRoomPolygon(xs: Array<any>): any;

    /**
     * @param {Object} obj
     * @return {?}
     */
    function splitRoomByLoops(obj: Object): any;

    /**
     * @param {Object} deepDataAndEvents
     * @return {?}
     */
    function splitRoom(deepDataAndEvents: Object): any;

    /**
     * @return {undefined}
     */
    function RoomSplitterEx(): void;

    /**
     * @param {?} dataAndEvents
     * @return {?}
     */
    function findInteriorWallsInRoom(dataAndEvents: any): any;

    /**
     * @param {?} value
     * @param {Function} func
     * @return {?}
     */
    function findInteriorWallsConnectedToRoom(value: any, func: Function): any;

    /**
     * @param {?} deepDataAndEvents
     * @return {undefined}
     */
    function cleanUpSmallWallAttached(deepDataAndEvents: any): void;

    /**
     * @param {Array} o1
     * @param {?} o2
     * @return {?}
     */
    function isRoomOverlapped(o1: Array<any>, o2: any): any;

    /**
     * @return {undefined}
     */
    function cleanUpInvalidRooms(): void;

    /**
     * @param {string} message
     * @param {?} files
     * @return {?}
     */
    function mergeRooms(message: string, files: any): any;

    /**
     * @param {Object} obj
     * @return {undefined}
     */
    function breakRoom(obj: Object): void;

    /**
     * @param {?} value
     * @return {?}
     */
    function getRoomContentIn(value: any): any;
}

declare module hsw.util.Room.RoomSplitter {

    /**
     * @param {Array} opt_nodes
     * @param {?} value
     * @return {?}
     */
    function _findAllLoops(opt_nodes: Array<any>, value: any): any;

    /**
     * @param {number} id
     * @param {boolean} node
     * @param {boolean} recurring
     * @return {?}
     */
    function _findLoop(id: number, node: boolean, recurring: boolean): any;
}

declare module hsw.cmd.content {

    /**
     * @param {?} content
     * @return {undefined}
     */
    function CmdDeleteContent(content: any): void;

    /**
     * @param {Object} v
     * @return {undefined}
     */
    function CmdMoveContent(v: Object): void;

    /**
     * @param {?} text
     * @return {undefined}
     */
    function CmdMoveContents(text: any): void;

    /**
     * @param {?} content
     * @return {undefined}
     */
    function CmdDisplayContent(content: any): void;

    /**
     * @param {?} dataAndEvents
     * @param {Object} config
     * @return {undefined}
     */
    function CmdRescaleHole(dataAndEvents: any, config: Object): void;

    /**
     * @return {undefined}
     */
    function CmdDisplayAllContent(): void;

    /**
     * @param {(number|string)} a
     * @return {undefined}
     */
    function CmdScaleContent(a: number|string): void;

    /**
     * @param {?} e
     * @param {Object} transform
     * @param {(number|string)} dataAndEvents
     * @return {undefined}
     */
    function CmdAddContent(e: any, transform: Object, dataAndEvents: number|string): void;

    /**
     * @param {Object} data
     * @param {string} dataAndEvents
     * @return {undefined}
     */
    function CmdFlipOpening(data: Object, dataAndEvents: string): void;

    /**
     * @param {?} src
     * @return {undefined}
     */
    function CmdDuplicateContent(src: any): void;

    /**
     * @param {Object} dataAndEvents
     * @param {?} deepDataAndEvents
     * @param {Object} transform
     * @param {(number|string)} rotation
     * @return {undefined}
     */
    function CmdReplaceContent(dataAndEvents: Object, deepDataAndEvents: any, transform: Object, rotation: number|string): void;

    /**
     * @param {?} content
     * @param {?} dataAndEvents
     * @param {Object} meta
     * @return {undefined}
     */
    function CmdReplaceVariation(content: any, dataAndEvents: any, meta: Object): void;

    /**
     * @param {(number|string)} a
     * @return {undefined}
     */
    function CmdRotateContent(a: number|string): void;
}

declare module hsw.cmd.wall {

    /**
     * @param {?} options
     * @return {undefined}
     */
    function CmdChangeWallType(options: any): void;

    /**
     * @param {?} prop
     * @return {undefined}
     */
    function CmdMoveOpenWall(prop: any): void;

    /**
     * @param {?} dataAndEvents
     * @return {undefined}
     */
    function CmdChangeWallHeight(dataAndEvents: any): void;

    /**
     * @param {Array} failures
     * @return {undefined}
     */
    function CmdMoveWalls(failures: Array<any>): void;

    /**
     * @param {?} dataAndEvents
     * @return {undefined}
     */
    function CmdHideWall(dataAndEvents: any): void;

    /**
     * @param {number} options
     * @return {undefined}
     */
    function CmdSplitWall(options: number): void;

    /**
     * @param {number} options
     * @return {undefined}
     */
    function CmdChangeWallWidth(options: number): void;

    /**
     * @param {string} dataAndEvents
     * @return {undefined}
     */
    function CmdCreateFreeformWall(dataAndEvents: string): void;

    /**
     * @param {string} dataAndEvents
     * @return {undefined}
     */
    function CmdDisplayDimension(dataAndEvents: string): void;

    /**
     * @param {string} dataAndEvents
     * @return {undefined}
     */
    function CmdDeleteWalls(dataAndEvents: string): void;

    /**
     * @param {?} item
     * @return {undefined}
     */
    function CmdDeleteWall(item: any): void;

    /**
     * @param {?} prop
     * @return {undefined}
     */
    function CmdMoveWall(prop: any): void;
}

declare module hsw.util.Wall {

    /**
     * @param {Object} settings
     * @return {undefined}
     */
    function detach(settings: Object): void;

    /**
     * @param {Object} that
     * @return {undefined}
     */
    function mergeWall(that: Object): void;

    /**
     * @param {Array} arr
     * @param {Array} assertions
     * @param {Object} name
     * @return {undefined}
     */
    function tryAssignWallProperties(arr: Array<any>, assertions: Array<any>, name: Object): void;

    /**
     * @param {Object} $scope
     * @param {?} dataAndEvents
     * @return {?}
     */
    function findAllOtherWallsInThisRoom($scope: Object, dataAndEvents: any): any;

    /**
     * @return {undefined}
     */
    function cleanUpSmallWalls(): void;

    /**
     * @param {Object} a
     * @param {?} pos
     * @return {?}
     */
    function autoFitToWall(a: Object, pos: any): any;

    /**
     * @param {Array} arr
     * @param {Array} failures
     * @return {undefined}
     */
    function tryAssignWallContents(arr: Array<any>, failures: Array<any>): void;

    /**
     * @param {number} o
     * @param {?} string
     * @param {Array} props
     * @return {?}
     */
    function findNeighborWalls(o: number, string: any, props: Array<any>): any;

    /**
     * @param {?} dataAndEvents
     * @return {?}
     */
    function canLoadBearing(dataAndEvents: any): any;

    /**
     * @param {?} dataAndEvents
     * @return {?}
     */
    function isWallFixedWidth(dataAndEvents: any): any;

    /**
     * @param {?} dataAndEvents
     * @return {?}
     */
    function getWallFixedWidth(dataAndEvents: any): any;

    /**
     * @param {?} a
     * @return {?}
     */
    function getRoomWallIn(a: any): any;
}

declare module hsw.cmd.camera {

    /**
     * @param {?} who
     * @return {undefined}
     */
    function CmdChangeCameraFov(who: any): void;

    /**
     * @param {?} camera
     * @return {undefined}
     */
    function CmdMoveCameraTarget(camera: any): void;

    /**
     * @param {?} camera
     * @return {undefined}
     */
    function CmdMoveCamera(camera: any): void;

    /**
     * @param {?} camera
     * @return {undefined}
     */
    function CmdMoveCamera3D(camera: any): void;
}

declare module hsw.cmd.group {

    /**
     * @param {?} group
     * @return {undefined}
     */
    function CmdRemoveGroup(group: any): void;

    /**
     * @param {?} group
     * @return {undefined}
     */
    function CmdDeleteGroup(group: any): void;

    /**
     * @param {?} member
     * @return {undefined}
     */
    function CmdIncludeMember(member: any): void;

    /**
     * @param {?} member
     * @return {undefined}
     */
    function CmdExcludeMember(member: any): void;

    /**
     * @param {Array} members
     * @param {string} metadata
     * @return {undefined}
     */
    function CmdAddGroup(members: Array<any>, metadata: string): void;

    /**
     * @param {?} dataAndEvents
     * @param {Object} transform
     * @param {(number|string)} deepDataAndEvents
     * @return {undefined}
     */
    function CmdAddAssembly(dataAndEvents: any, transform: Object, deepDataAndEvents: number|string): void;
}

declare module hsw.snapping.strategy {

    /**
     * @param {?} entity
     * @return {undefined}
     */
    function Base(entity: any): void;

    /**
     * @param {?} mapper
     * @return {undefined}
     */
    function SnapToFloor(mapper: any): void;

    /**
     * @param {?} mapper
     * @param {Object} strategies
     * @return {undefined}
     */
    function Composite(mapper: any, strategies: Object): void;

    /**
     * @param {?} i
     * @param {?} graphics
     * @return {undefined}
     */
    function All(i: any, graphics: any): void;

    /**
     * @param {?} mapper
     * @return {undefined}
     */
    function SnapToCeiling(mapper: any): void;

    /**
     * @param {?} mapper
     * @param {?} cb
     * @return {undefined}
     */
    function Some(mapper: any, cb: any): void;

    /**
     * @param {?} mapper
     * @return {undefined}
     */
    function SnapToContentFace(mapper: any): void;

    /**
     * @param {?} mapper
     * @return {undefined}
     */
    function SnapToContent(mapper: any): void;

    /**
     * @param {Object} mapper
     * @return {undefined}
     */
    function SnapToWall(mapper: Object): void;
}

declare module hsw.util.Collision {

    /**
     * @param {string} object
     * @param {Array} result
     * @param {?} obj
     * @return {?}
     */
    function OutlineIntersect(object: string, result: Array<any>, obj: any): any;

    /**
     * @param {Array} data
     * @param {Array} x
     * @param {?} opt_attributes
     * @return {?}
     */
    function ClipPolygon(data: Array<any>, x: Array<any>, opt_attributes: any): any;

    /**
     * @param {Array} x
     * @param {number} opt_attributes
     * @param {(Element|string)} model
     * @return {?}
     */
    function OffsetPolygon(x: Array<any>, opt_attributes: number, model: Element|string): any;

    /**
     * @param {(Array|string)} deepDataAndEvents
     * @return {?}
     */
    function SimplifyPolygons(deepDataAndEvents: Array<any>|string): any;

    /**
     * @param {(Array|string)} deepDataAndEvents
     * @return {?}
     */
    function Orientation(deepDataAndEvents: Array<any>|string): any;
}

declare module hsw.util.Geometry {

    /**
     * @param {Object} a
     * @param {Object} args
     * @return {?}
     */
    function unshelveredWallGeometry(a: Object, args: Object): any;

    /**
     * @param {Object} arg
     * @param {?} opt_attributes
     * @param {?} walkers
     * @return {?}
     */
    function roomGeometry(arg: Object, opt_attributes: any, walkers: any): any;

    /**
     * @param {Object} f
     * @param {Object} data
     * @param {?} key
     * @return {?}
     */
    function ceilingGeometry(f: Object, data: Object, key: any): any;

    /**
     * @param {Object} t
     * @param {number} details
     * @return {?}
     */
    function getRawRoomGeometry(t: Object, details: number): any;

    /**
     * @param {string} x
     * @param {?} obj
     * @param {Function} iterator
     * @return {?}
     */
    function _getInteriorWallPolys(x: string, obj: any, iterator: Function): any;

    /**
     * @param {Object} t
     * @param {?} deepDataAndEvents
     * @return {?}
     */
    function wallGeometry(t: Object, deepDataAndEvents: any): any;

    /**
     * @param {Array} value
     * @param {Array} data
     * @param {number} name
     * @return {?}
     */
    function combineGeometry(value: Array<any>, data: Array<any>, name: number): any;

    /**
     * @param {?} i
     * @param {Array} _
     * @return {?}
     */
    function computeWallGeomsAtEndPoint(i: any, _: Array<any>): any;

    /**
     * @param {(Object|string)} hash
     * @param {?} next
     * @param {Object} obj
     * @param {Array} options
     * @return {?}
     */
    function _computePartialWallGeomAtEndPoint(hash: Object|string, next: any, obj: Object, options: Array<any>): any;

    /**
     * @param {Object} event
     * @param {?} data
     * @param {Object} a
     * @param {string} b
     * @param {NodeList} obj
     * @return {?}
     */
    function _computeWallGeomAtEndPoint(event: Object, data: any, a: Object, b: string, obj: NodeList): any;

    /**
     * @param {Object} a
     * @param {Object} item
     * @param {?} fn
     * @param {Array} dataAndEvents
     * @param {Array} deepDataAndEvents
     * @return {?}
     */
    function _wallTrimedGeometry(a: Object, item: Object, fn: any, dataAndEvents: Array<any>, deepDataAndEvents: Array<any>): any;

    /**
     * @param {?} deepDataAndEvents
     * @return {?}
     */
    function wallBorderLines(deepDataAndEvents: any): any;

    /**
     * @param {Object} item
     * @param {(RegExp|string)} deepDataAndEvents
     * @return {?}
     */
    function getWallGeometryInfo(item: Object, deepDataAndEvents: RegExp|string): any;

    /**
     * @param {?} classProps
     * @param {?} config
     * @return {?}
     */
    function getWallDimension(classProps: any, config: any): any;

    /**
     * @param {?} v
     * @param {(RegExp|string)} deepDataAndEvents
     * @return {?}
     */
    function _getPrevCowalls(v: any, deepDataAndEvents: RegExp|string): any;

    /**
     * @param {?} v
     * @param {(RegExp|string)} deepDataAndEvents
     * @return {?}
     */
    function _getNextCowalls(v: any, deepDataAndEvents: RegExp|string): any;
}

declare module hsw.snapping {

    /**
     * @param {?} walkers
     * @param {?} deepDataAndEvents
     * @return {undefined}
     */
    function Helper(walkers: any, deepDataAndEvents: any): void;
}

declare module hsw.util.Selection {

    /**
     * @param {?} e
     * @return {?}
     */
    function isMultiSelectKey(e: any): any;

    /**
     * @param {?} dataAndEvents
     * @return {?}
     */
    function hasOnlySelected(dataAndEvents: any): any;

    /**
     * @param {?} opt_attributes
     * @return {?}
     */
    function isTypeOf(opt_attributes: any): any;
}

declare module hsw.cmd.dummy {

    /**
     * @param {?} dataAndEvents
     * @param {?} deepDataAndEvents
     * @param {string} op
     * @return {undefined}
     */
    function CmdDummy(dataAndEvents: any, deepDataAndEvents: any, op: string): void;
}

declare module hsw.cmd.room {

    /**
     * @param {Array} dataAndEvents
     * @return {undefined}
     */
    function CmdMoveRooms(dataAndEvents: Array<any>): void;

    /**
     * @param {Object} room
     * @return {undefined}
     */
    function CmdChangeCeilingHeight(room: Object): void;

    /**
     * @param {?} room
     * @return {undefined}
     */
    function CmdMoveRoom(room: any): void;

    /**
     * @return {undefined}
     */
    function CmdCreateRectRoom(): void;

    /**
     * @param {?} global
     * @return {undefined}
     */
    function CmdChangeGlobalHeight(global: any): void;

    /**
     * @param {?} room
     * @return {undefined}
     */
    function CmdDeleteRoom(room: any): void;
}

declare module hsw.cmd.selection {

    /**
     * @return {undefined}
     */
    function CmdRegionSelect(): void;

    /**
     * @return {undefined}
     */
    function CmdDuplicate(): void;

    /**
     * @return {undefined}
     */
    function CmdDelete(): void;

    /**
     * @return {undefined}
     */
    function CmdPointSelect(): void;
}

// declare module hsw.cmd.export {
//
//     /**
//      * @param {Object} params
//      * @return {undefined}
//      */
//     function CmdExportImage(params: Object): void;
// }

declare module hsw.cmd.product {

    /**
     * @param {?} dataAndEvents
     * @param {Object} transform
     * @param {(number|string)} deepDataAndEvents
     * @return {undefined}
     */
    function CmdAdd(dataAndEvents: any, transform: Object, deepDataAndEvents: number|string): void;
}

declare module hsw.cmd.molding {

    /**
     * @param {?} entity
     * @return {undefined}
     */
    function CmdChangeMoldingHeight(entity: any): void;

    /**
     * @param {?} dataAndEvents
     * @param {?} deepDataAndEvents
     * @param {?} entity
     * @return {undefined}
     */
    function CmdChangeMoldingAutoFit(dataAndEvents: any, deepDataAndEvents: any, entity: any): void;

    /**
     * @param {?} dataAndEvents
     * @param {?} deepDataAndEvents
     * @param {?} ignoreMethodDoesntExist
     * @param {?} textAlt
     * @return {undefined}
     */
    function CmdAddMolding(dataAndEvents: any, deepDataAndEvents: any, ignoreMethodDoesntExist: any, textAlt: any): void;

    /**
     * @param {?} dataAndEvents
     * @param {?} deepDataAndEvents
     * @param {?} entity
     * @return {undefined}
     */
    function CmdChangeMoldingOffset(dataAndEvents: any, deepDataAndEvents: any, entity: any): void;
}

declare module hsw.cmd.underlay {

    /**
     * @return {undefined}
     */
    function CmdMoveUnderlay(): void;

    /**
     * @return {undefined}
     */
    function CmdUpdateUnderlay(): void;
}

declare module hsw.view.base {

    /**
     * @param {?} context
     * @param {?} layer
     * @param {Object} obj
     * @param {string} controller
     * @return {undefined}
     */
    function Display(context: any, layer: any, obj: Object, controller: string): void;

    /**
     * @param {?} entity
     * @param {?} element
     * @return {undefined}
     */
    function DisplayController(entity: any, element: any): void;

    /**
     * @param {Function} property
     * @param {number} args
     * @param {(Object|string)} obj
     * @param {?} v11
     * @return {undefined}
     */
    function Content(property: Function, args: number, obj: Object|string, v11: any): void;

    /**
     * @param {?} mapper
     * @param {?} $element
     * @return {undefined}
     */
    function ContentController(mapper: any, $element: any): void;

    /**
     * @param {Object} scope
     * @param {?} entity
     * @param {Object} variables
     * @return {undefined}
     */
    function LoadingTasks(scope: Object, entity: any, variables: Object): void;

    /**
     * @param {?} mapper
     * @param {?} data
     * @param {?} body
     * @param {(Object|boolean|number|string)} id
     * @return {undefined}
     */
    function Camera(mapper: any, data: any, body: any, id: Object|boolean|number|string): void;

    /**
     * @param {?} mapper
     * @param {?} graphics
     * @return {undefined}
     */
    function CameraController(mapper: any, graphics: any): void;

    /**
     * @param {?} cfg
     * @param {?} containerId
     * @param {?} body
     * @param {(Object|boolean|number|string)} opt_renderer
     * @return {undefined}
     */
    function Grid(cfg: any, containerId: any, body: any, opt_renderer: Object|boolean|number|string): void;

    /**
     * @param {?} mapper
     * @param {?} data
     * @return {undefined}
     */
    function GridController(mapper: any, data: any): void;

    /**
     * @param {?} mapper
     * @param {?} graphics
     * @param {?} capture
     * @param {?} opt_coordHeight
     * @return {undefined}
     */
    function Temp(mapper: any, graphics: any, capture: any, opt_coordHeight: any): void;

    /**
     * @param {?} $http
     * @return {undefined}
     */
    function Controller($http: any): void;

    /**
     * @param {?} mapper
     * @param {?} graphics
     * @param {?} capture
     * @param {?} opt_coordHeight
     * @return {undefined}
     */
    function Gizmo(mapper: any, graphics: any, capture: any, opt_coordHeight: any): void;

    /**
     * @param {?} backgroundDesc
     * @param {?} description
     * @param {?} capture
     * @param {?} width
     * @return {undefined}
     */
    function Background(backgroundDesc: any, description: any, capture: any, width: any): void;

    /**
     * @param {?} context
     * @param {?} dataAndEvents
     * @param {?} aValue
     * @return {undefined}
     */
    function WallGeometry(context: any, dataAndEvents: any, aValue: any): void;

    /**
     * @param {?} field
     * @param {?} initial
     * @param {?} body
     * @param {(Object|boolean|number|string)} opt_renderer
     * @return {undefined}
     */
    function Wall(field: any, initial: any, body: any, opt_renderer: Object|boolean|number|string): void;

    /**
     * @param {?} mapper
     * @param {?} graphics
     * @return {undefined}
     */
    function WallController(mapper: any, graphics: any): void;

    /**
     * @param {?} element
     * @param {Function} options
     * @return {undefined}
     */
    function Canvas(element: any, options: Function): void;

    /**
     * @param {?} element_factory
     * @return {undefined}
     */
    function GizmoManager(element_factory: any): void;

    /**
     * @param {Function} property
     * @param {number} args
     * @param {(Object|string)} obj
     * @param {?} v11
     * @return {undefined}
     */
    function Floor(property: Function, args: number, obj: Object|string, v11: any): void;

    /**
     * @param {?} mapper
     * @param {?} graphics
     * @return {undefined}
     */
    function FloorController(mapper: any, graphics: any): void;

    /**
     * @param {?} geometry
     * @param {?} y
     * @param {?} body
     * @param {?} a
     * @return {undefined}
     */
    function Point(geometry: any, y: any, body: any, a: any): void;

    /**
     * @param {?} domElement
     * @param {?} eventListener
     * @return {undefined}
     */
    function DOMEventHook(domElement: any, eventListener: any): void;
}

declare module hsw.view.svg {

    /**
     * @param {(Object|string)} selector
     * @return {undefined}
     */
    function PickContext(selector: Object|string): void;

    /**
     * @return {undefined}
     */
    function PickResult(): void;

    /**
     * @param {?} a
     * @param {Object} event
     * @param {Array} elem
     * @return {?}
     */
    function Pick(a: any, event: Object, elem: Array<any>): any;

    /**
     * @param {Function} property
     * @param {number} args
     * @param {Object} obj
     * @return {undefined}
     */
    function Content(property: Function, args: number, obj: Object): void;

    /**
     * @param {?} mapper
     * @param {?} graphics
     * @param {?} capture
     * @return {undefined}
     */
    function Concealedwork(mapper: any, graphics: any, capture: any): void;

    /**
     * @param {?} mapper
     * @param {?} graphics
     * @param {?} capture
     * @return {undefined}
     */
    function Elecbox(mapper: any, graphics: any, capture: any): void;

    /**
     * @param {?} mapper
     * @param {?} data
     * @param {?} far
     * @param {?} body
     * @return {undefined}
     */
    function Camera(mapper: any, data: any, far: any, body: any): void;

    /**
     * @param {?} cfg
     * @param {?} containerId
     * @param {?} list
     * @return {undefined}
     */
    function Grid(cfg: any, containerId: any, list: any): void;

    /**
     * @param {?} mapper
     * @param {?} graphics
     * @param {?} capture
     * @return {undefined}
     */
    function Temp(mapper: any, graphics: any, capture: any): void;

    /**
     * @param {?} backgroundDesc
     * @param {?} description
     * @param {?} capture
     * @return {undefined}
     */
    function Background(backgroundDesc: any, description: any, capture: any): void;

    /**
     * @param {?} mapper
     * @param {?} graphics
     * @param {?} me
     * @return {undefined}
     */
    function Opening(mapper: any, graphics: any, me: any): void;

    /**
     * @param {Function} property
     * @param {number} args
     * @param {(Object|string)} obj
     * @return {undefined}
     */
    function Window(property: Function, args: number, obj: Object|string): void;

    /**
     * @param {?} styles
     * @param {?} opt_wrapper
     * @param {?} body
     * @return {undefined}
     */
    function Group(styles: any, opt_wrapper: any, body: any): void;

    /**
     * @param {Function} property
     * @param {number} args
     * @param {(Object|string)} obj
     * @return {undefined}
     */
    function Door(property: Function, args: number, obj: Object|string): void;

    /**
     * @param {?} mapper
     * @param {?} opt_domHelper
     * @param {?} time
     * @return {undefined}
     */
    function Switch(mapper: any, opt_domHelper: any, time: any): void;

    /**
     * @param {?} dataAndEvents
     * @return {undefined}
     */
    function WallBorder(dataAndEvents: any): void;

    /**
     * @param {Object} obj
     * @param {?} initial
     * @param {?} options
     * @return {undefined}
     */
    function Wall(obj: Object, initial: any, options: any): void;

    /**
     * @param {?} options
     * @param {?} endpoint
     * @param {?} capture
     * @return {undefined}
     */
    function Socket(options: any, endpoint: any, capture: any): void;

    /**
     * @param {Function} property
     * @param {number} args
     * @param {(Object|string)} obj
     * @return {undefined}
     */
    function Hole(property: Function, args: number, obj: Object|string): void;

    /**
     * @param {?} mapper
     * @param {?} parameters
     * @param {(Object|string)} options
     * @return {undefined}
     */
    function Water(mapper: any, parameters: any, options: Object|string): void;

    /**
     * @param {Function} property
     * @param {number} args
     * @param {(Object|string)} obj
     * @return {undefined}
     */
    function Floor(property: Function, args: number, obj: Object|string): void;

    /**
     * @param {?} mapper
     * @param {?} graphics
     * @return {undefined}
     */
    function FloorController(mapper: any, graphics: any): void;

    /**
     * @param {Window} x
     * @param {?} y
     * @param {Object} ctx
     * @return {undefined}
     */
    function Point(x: Window, y: any, ctx: Object): void;

    /**
     * @param {?} width
     * @param {?} height
     * @return {undefined}
     */
    function Canvas(width: any, height: any): void;
}

declare module hsw.view.svg.events {

    /**
     * @param {Element} targetElement
     * @return {undefined}
     */
    function Forwarder(targetElement: Element): void;

    /**
     * @param {?} element
     * @return {undefined}
     */
    function Hook(element: any): void;
}

declare module hsw.view.svg.Content {

    /**
     * @param {Object} a
     * @return {?}
     */
    function buildSVGContentBound(a: Object): any;
}

declare module hsw.view.svg.inference {

    /**
     * @param {?} context
     * @return {undefined}
     */
    function Inference(context: any): void;

    /**
     * @param {?} mapper
     * @return {undefined}
     */
    function WallInference(mapper: any): void;

    /**
     * @param {?} context
     * @param {Object} dataAndEvents
     * @return {undefined}
     */
    function WallIntersection(context: any, dataAndEvents: Object): void;

    /**
     * @param {?} mapper
     * @return {undefined}
     */
    function PointInference(mapper: any): void;
}

declare module hsw.view.svg.gizmo {

    /**
     * @param {?} mapper
     * @param {?} graphics
     * @param {?} capture
     * @return {undefined}
     */
    function MoveWall(mapper: any, graphics: any, capture: any): void;

    /**
     * @param {?} mapper
     * @param {?} graphics
     * @param {?} capture
     * @return {undefined}
     */
    function MoveWalls(mapper: any, graphics: any, capture: any): void;

    /**
     * @param {?} mapper
     * @param {?} graphics
     * @param {?} capture
     * @return {undefined}
     */
    function DeleteWall(mapper: any, graphics: any, capture: any): void;

    /**
     * @param {?} mapper
     * @param {?} graphics
     * @param {?} capture
     * @return {undefined}
     */
    function MoveContent(mapper: any, graphics: any, capture: any): void;

    /**
     * @param {?} mapper
     * @param {?} graphics
     * @param {?} capture
     * @return {undefined}
     */
    function MoveRooms(mapper: any, graphics: any, capture: any): void;

    /**
     * @param {?} mapper
     * @param {?} graphics
     * @param {?} capture
     * @param {?} opt_coordHeight
     * @return {undefined}
     */
    function Gizmo(mapper: any, graphics: any, capture: any, opt_coordHeight: any): void;

    /**
     * @param {?} mapper
     * @param {?} graphics
     * @param {?} capture
     * @param {Object} options
     * @return {undefined}
     */
    function LinearDimension(mapper: any, graphics: any, capture: any, options: Object): void;

    /**
     * @param {Object} mapper
     * @param {?} graphics
     * @param {?} capture
     * @return {undefined}
     */
    function WallDimension(mapper: Object, graphics: any, capture: any): void;

    /**
     * @param {?} mapper
     * @param {?} graphics
     * @return {undefined}
     */
    function WallDimensionController(mapper: any, graphics: any): void;

    /**
     * @param {?} mapper
     * @param {?} graphics
     * @param {Object} opts
     * @return {undefined}
     */
    function Compass(mapper: any, graphics: any, opts: Object): void;

    /**
     * @param {?} mapper
     * @param {?} graphics
     * @param {Object} spec
     * @return {undefined}
     */
    function EntranceIndictor(mapper: any, graphics: any, spec: Object): void;

    /**
     * @param {?} mapper
     * @param {?} graphics
     * @param {?} capture
     * @return {undefined}
     */
    function Export2D(mapper: any, graphics: any, capture: any): void;

    /**
     * @param {?} mapper
     * @param {?} graphics
     * @param {?} capture
     * @return {undefined}
     */
    function RoomDimension(mapper: any, graphics: any, capture: any): void;

    /**
     * @param {(Object|string)} mapper
     * @param {?} graphics
     * @param {?} capture
     * @return {undefined}
     */
    function OpeningDimension(mapper: Object|string, graphics: any, capture: any): void;

    /**
     * @param {?} mapper
     * @param {?} graphics
     * @param {?} dataAndEvents
     * @return {undefined}
     */
    function OpeningDimensionController(mapper: any, graphics: any, dataAndEvents: any): void;

    /**
     * @param {(Function|string)} mapper
     * @param {?} graphics
     * @param {?} capture
     * @return {undefined}
     */
    function RepositionPoint(mapper: Function|string, graphics: any, capture: any): void;

    /**
     * @param {?} mapper
     * @param {?} graphics
     * @return {undefined}
     */
    function RepositionPointController(mapper: any, graphics: any): void;

    /**
     * @param {?} mapper
     * @param {?} graphics
     * @param {?} capture
     * @return {undefined}
     */
    function RepositionWall(mapper: any, graphics: any, capture: any): void;

    /**
     * @param {?} mapper
     * @param {?} graphics
     * @return {undefined}
     */
    function RepositionWallController(mapper: any, graphics: any): void;

    /**
     * @param {?} element
     * @return {undefined}
     */
    function Factory(element: any): void;

    /**
     * @param {?} mapper
     * @param {?} graphics
     * @param {?} capture
     * @return {undefined}
     */
    function CreateRectRoom(mapper: any, graphics: any, capture: any): void;

    /**
     * @param {Object} context
     * @param {?} layer
     * @param {?} capture
     * @return {undefined}
     */
    function ScaleContent(context: Object, layer: any, capture: any): void;

    /**
     * @param {?} mapper
     * @param {?} graphics
     * @param {?} capture
     * @return {undefined}
     */
    function MovePoint(mapper: any, graphics: any, capture: any): void;

    /**
     * @param {?} mapper
     * @param {?} graphics
     * @param {?} capture
     * @return {undefined}
     */
    function CreateFreeformWall(mapper: any, graphics: any, capture: any): void;
}

declare module hsw.view {

    /**
     * @param {?} dataAndEvents
     * @return {undefined}
     */
    function CursorStatus(dataAndEvents: any): void;

    /**
     * @param {?} exports
     * @param {?} dataAndEvents
     * @return {undefined}
     */
    function CursorStatusController(exports: any, dataAndEvents: any): void;

    /**
     * @return {undefined}
     */
    function IView(): void;
}

declare module hsw.view.base.WallGeometry {

    /**
     * @param {string} tagName
     * @return {undefined}
     */
    function initDataBase(tagName: string): void;
}

declare module hsw.view.svg.Util {

    /**
     * @param {?} a
     * @return {?}
     */
    function ModelLengthToScreenLength(a: any): any;

    /**
     * @param {?} a
     * @return {?}
     */
    function CanvasLengthToScreenLength(a: any): any;

    /**
     * @param {Array} xy
     * @param {?} parent
     * @return {?}
     */
    function ScreenPointToCanvas(xy: Array<any>, parent: any): any;

    /**
     * @param {?} xy
     * @param {?} obj
     * @return {?}
     */
    function CanvasPointToScreen(xy: any, obj: any): any;

    /**
     * @param {Array} deepDataAndEvents
     * @param {?} obj
     * @return {?}
     */
    function ScreenVectorToCanvas(deepDataAndEvents: Array<any>, obj: any): any;

    /**
     * @param {Array} x
     * @param {?} walkers
     * @return {?}
     */
    function ModelPointToScreen(x: Array<any>, walkers: any): any;

    /**
     * @param {Array} x
     * @param {?} _super
     * @return {?}
     */
    function ScreenPointToModel(x: Array<any>, _super: any): any;

    /**
     * @param {number} sprite
     * @param {number} id
     * @return {?}
     */
    function getBBox(sprite: number, id: number): any;

    /**
     * @param {?} dataAndEvents
     * @param {?} deepDataAndEvents
     * @return {undefined}
     */
    function HookupGizmo(dataAndEvents: any, deepDataAndEvents: any): void;

    /**
     * @param {Object} segment
     * @param {Object} p2
     * @param {string} deepDataAndEvents
     * @return {undefined}
     */
    function drawModelLineDebug(segment: Object, p2: Object, deepDataAndEvents: string): void;

    /**
     * @param {Object} rect
     * @param {string} deepDataAndEvents
     * @return {undefined}
     */
    function drawModelBoundDebug(rect: Object, deepDataAndEvents: string): void;
}

declare module hsw.view.svg.gizmo.LinearDimension {

    /**
     * @param {Node} el
     * @return {?}
     */
    function isDimensionInput(el: Node): any;
}

declare module hsw.view.svg.gizmo.RoomDimension {

    /**
     * @return {undefined}
     */
    function _bindCommand(): void;
}

declare module hsw.view.svg.WallBorder {

    /** @type {boolean} */
    var dirty: boolean;

    /**
     * @return {undefined}
     */
    function update(): void;

    /**
     * @return {?}
     */
    function _computeBorderSegments(): any;
}

declare module hsw.view.svg.Canvas {

    /**
     * @return {?}
     */
    function browserSupport(): any;
}

declare module hsw.view.webgl3d {

    /**
     * @param {?} config
     * @param {?} capture
     * @param {Object} far
     * @return {undefined}
     */
    function Camera(config: any, capture: any, far: Object): void;

    /**
     * @param {?} context
     * @param {?} scene
     * @return {undefined}
     */
    function LightManager(context: any, scene: any): void;

    /**
     * @param {?} app
     * @return {undefined}
     */
    function Scene(app: any): void;

    /**
     * @param {Function} property
     * @param {number} args
     * @param {(Object|string)} obj
     * @return {undefined}
     */
    function Floor(property: Function, args: number, obj: Object|string): void;

    /**
     * @param {?} mapper
     * @param {?} graphics
     * @return {undefined}
     */
    function FloorController(mapper: any, graphics: any): void;

    /**
     * @param {?} mapper
     * @param {?} graphics
     * @return {undefined}
     */
    function CameraController(mapper: any, graphics: any): void;

    /**
     * @param {Function} property
     * @param {number} args
     * @return {undefined}
     */
    function Layer(property: Function, args: number): void;

    /**
     * @param {?} context
     * @param {?} mapper
     * @param {?} graphics
     * @return {undefined}
     */
    function FloatingLayer(context: any, mapper: any, graphics: any): void;

    /**
     * @param {Function} property
     * @param {number} args
     * @param {(Object|string)} obj
     * @param {?} v11
     * @return {undefined}
     */
    function Content(property: Function, args: number, obj: Object|string, v11: any): void;

    /**
     * @param {?} mapper
     * @param {?} $element
     * @return {undefined}
     */
    function ContentController(mapper: any, $element: any): void;

    /**
     * @param {Function} property
     * @param {number} args
     * @param {(Object|string)} obj
     * @param {?} v11
     * @return {undefined}
     */
    function Hole(property: Function, args: number, obj: Object|string, v11: any): void;

    /**
     * @param {?} field
     * @param {?} initial
     * @param {?} options
     * @param {Object} tileInfos
     * @return {undefined}
     */
    function Wall(field: any, initial: any, options: any, tileInfos: Object): void;

    /**
     * @param {?} mapper
     * @param {?} graphics
     * @return {undefined}
     */
    function WallController(mapper: any, graphics: any): void;

    /**
     * @param {?} mapper
     * @param {?} graphics
     * @param {?} capture
     * @return {undefined}
     */
    function Molding(mapper: any, graphics: any, capture: any): void;

    /**
     * @param {?} mapper
     * @param {?} graphics
     * @param {?} capture
     * @param {(Object|boolean|number|string)} opt_renderer
     * @return {undefined}
     */
    function Opening(mapper: any, graphics: any, capture: any, opt_renderer: Object|boolean|number|string): void;

    /**
     * @param {Function} property
     * @param {number} args
     * @param {(Object|string)} obj
     * @param {?} v11
     * @return {undefined}
     */
    function Door(property: Function, args: number, obj: Object|string, v11: any): void;

    /**
     * @param {?} width
     * @param {?} height
     * @return {undefined}
     */
    function Canvas(width: any, height: any): void;
}

declare module hsw.view.webgl3d.render {

    /**
     * @param {?} opt_rightAlign
     * @param {?} clear
     * @param {?} backend
     * @param {?} x
     * @return {undefined}
     */
    function Renderer(opt_rightAlign: any, clear: any, backend: any, x: any): void;

    /**
     * @param {Object} renderer
     * @param {Object} data
     * @param {?} camera
     * @param {Object} options
     * @return {undefined}
     */
    function CompositeRenderer(renderer: Object, data: Object, camera: any, options: Object): void;

    /**
     * @param {Object} renderer
     * @param {?} scene
     * @param {number} capture
     * @param {Object} options
     * @return {undefined}
     */
    function SimpleRenderer(renderer: Object, scene: any, capture: number, options: Object): void;

    /**
     * @return {undefined}
     */
    function DummyRenderer(): void;

    /**
     * @param {?} context
     * @param {?} showDebug
     * @param {?} camera
     * @param {?} module
     * @param {Object} options
     * @return {undefined}
     */
    function Manager(context: any, showDebug: any, camera: any, module: any, options: Object): void;
}

declare module hsw.view.webgl3d.Util {

    /**
     * @param {Array} x
     * @return {?}
     */
    function ModelSpaceToViewSpace(x: Array<any>): any;

    /**
     * @param {Array} x
     * @return {?}
     */
    function ViewSpaceToModelSpace(x: Array<any>): any;

    /**
     * @param {?} a
     * @param {Object} deepDataAndEvents
     * @return {?}
     */
    function ModelLengthToScreenLength(a: any, deepDataAndEvents: Object): any;

    /**
     * @param {?} a
     * @param {Object} deepDataAndEvents
     * @return {?}
     */
    function modelSpaceToScreenSpace(a: any, deepDataAndEvents: Object): any;

    /**
     * @param {?} point
     * @param {number} a
     * @return {?}
     */
    function Rotate(point: any, a: number): any;

    /**
     * @param {Function} tex
     * @param {Object} opts
     * @return {?}
     */
    function makeImageSprite(tex: Function, opts: Object): any;

    /**
     * @param {string} key
     * @return {?}
     */
    function buildResourceURI(key: string): any;

    /**
     * @param {(Array|Uint8Array)} results
     * @return {?}
     */
    function isClockwise(results: Array<any>|Uint8Array): any;

    /**
     * @param {(Array|string)} data
     * @return {?}
     */
    function createShapeByLoopPoints(data: Array<any>|string): any;

    /**
     * @param {?} d
     * @param {boolean} recurring
     * @return {undefined}
     */
    function normalizeGeometryUV(d: any, recurring: boolean): void;

    /**
     * @param {?} opt_attributes
     * @param {?} regex
     * @return {?}
     */
    function createLineGeometry(opt_attributes: any, regex: any): any;

    /**
     * @param {?} vert
     * @return {?}
     */
    function getContentCirclePosition(vert: any): any;

    /**
     * @param {?} deepDataAndEvents
     * @return {undefined}
     */
    function cleanupMeshGeometry(deepDataAndEvents: any): void;

    /**
     * @param {Array} key
     * @return {?}
     */
    function computeBorderLines(key: Array<any>): any;
}

declare module hsw.view.webgl3d.Indicator {

    /**
     * @param {Object} node
     * @param {Object} distance
     * @param {?} theta
     * @param {?} img
     * @return {undefined}
     */
    function ContentMovement(node: Object, distance: Object, theta: any, img: any): void;

    /**
     * @param {?} mapper
     * @param {?} graphics
     * @return {undefined}
     */
    function ContentMovementController(mapper: any, graphics: any): void;

    /**
     * @param {Object} node
     * @param {Object} distance
     * @param {?} theta
     * @param {?} dataAndEvents
     * @return {undefined}
     */
    function CameraMovement(node: Object, distance: Object, theta: any, dataAndEvents: any): void;

    /**
     * @param {?} graphics
     * @param {Object} cmd
     * @return {undefined}
     */
    function CameraMovementController(graphics: any, cmd: Object): void;

    /**
     * @param {Function} config
     * @param {?} factor
     * @param {?} content
     * @return {undefined}
     */
    function ContentLift(config: Function, factor: any, content: any): void;

    /**
     * @param {?} factor
     * @param {?} graphics
     * @return {undefined}
     */
    function ContentLiftController(factor: any, graphics: any): void;

    /**
     * @param {Object} node
     * @param {?} graphics
     * @param {Object} img
     * @return {undefined}
     */
    function ContentRotation(node: Object, graphics: any, img: Object): void;

    /**
     * @param {?} mapper
     * @param {?} graphics
     * @return {undefined}
     */
    function ContentRotationController(mapper: any, graphics: any): void;

    /**
     * @param {?} element
     * @return {undefined}
     */
    function Factory(element: any): void;

    /**
     * @param {?} context
     * @param {Object} options
     * @return {undefined}
     */
    function Manager(context: any, options: Object): void;
}

declare module hsw.view.webgl3d.Indicator.ContentMovement {

    /** @type {null} */
    var _meshData: void;
}

declare module hsw.view.webgl3d.Indicator.CameraMovement {

    /** @type {null} */
    var _meshData: void;
}

declare module hsw.view.webgl3d.Indicator.ContentLift {

    /** @type {null} */
    var _meshData: void;
}

declare module hsw.view.webgl3d.Indicator.ContentRotation {

    /** @type {null} */
    var _meshData: void;
}

declare module hsw.view.webgl3d.controls {

    /**
     * @param {Object} context
     * @param {?} entity
     * @return {undefined}
     */
    function Camera(context: Object, entity: any): void;

    /**
     * @param {Object} scene
     * @param {?} graphics
     * @param {Object} d
     * @return {undefined}
     */
    function FirstPersonCamera(scene: Object, graphics: any, d: Object): void;

    /**
     * @param {Object} scene
     * @param {?} graphics
     * @param {Object} n
     * @return {undefined}
     */
    function AerialViewCamera(scene: Object, graphics: any, n: Object): void;
}

declare module hsw.view.webgl3d.selection {

    /**
     * @param {?} element
     * @return {undefined}
     */
    function Picker(element: any): void;

    /**
     * @param {Object} context
     * @param {?} index
     * @return {undefined}
     */
    function Selector(context: Object, index: any): void;

    /**
     * @param {?} exports
     * @param {Object} selector
     * @return {undefined}
     */
    function SelectController(exports: any, selector: Object): void;
}

declare module hsw.view.webgl3d.material {

    /** @type {Array} */
    var envNames: Array<any>;

    /**
     * @return {undefined}
     */
    function initializeEnvMaps(): void;
}

declare module hsw.view.webgl3d.Canvas {

    /**
     * @return {?}
     */
    function browserSupport(): any;

    /**
     * @return {?}
     */
    function _webglBrowserSupport(): any;
}

declare module hsw.material {

    /**
     * @return {undefined}
     */
    function Manager(): void;
}

declare module hsw.material.Manager {

    /**
     * @return {?}
     */
    function instance(): any;
}

declare module hsw.transaction {

    /**
     * @return {undefined}
     */
    function Request(): void;

    /**
     * @return {undefined}
     */
    function Session(): void;

    /**
     * @return {undefined}
     */
    function Manager(): void;
}

declare module hsw.transaction.common {

    /**
     * @param {Array} dataAndEvents
     * @return {undefined}
     */
    function CompositeRequest(dataAndEvents: Array<any>): void;

    /**
     * @param {?} dataAndEvents
     * @param {?} label
     * @param {?} setter
     * @param {?} deepDataAndEvents
     * @return {undefined}
     */
    function DataRequest(dataAndEvents: any, label: any, setter: any, deepDataAndEvents: any): void;
}

declare module hsw.transaction.common.CompositeRequest {

    /**
     * @param {Node} a
     * @param {string} b
     * @return {?}
     */
    function create(a: Node, b: string): any;
}

declare module hsw.transaction.common.DataRequest {

    /**
     * @param {Element} owner
     * @param {string} cl
     * @param {?} methodName
     * @param {?} opt_path
     * @return {?}
     */
    function create(owner: Element, cl: string, methodName: any, opt_path: any): any;
}

declare module hsw.plugin {

    /**
     * @param {Object} plugin
     * @return {undefined}
     */
    function IPlugin(plugin: Object): void;

    /**
     * @param {Object} AppView
     * @return {undefined}
     */
    function Manager(AppView: Object): void;
}

declare module hsw.util.UnitFormater {

    /**
     * @param {number} newVal
     * @param {string} oldVal
     * @param {number} value
     * @param {boolean} dataAndEvents
     * @return {?}
     */
    function toAreaDisplayString(newVal: number, oldVal: string, value: number, dataAndEvents: boolean): any;
}

declare module hsw.util.Image {

    /**
     * @param {string} el
     * @param {string} type
     * @return {?}
     */
    function toDataURL(el: string, type: string): any;

    /**
     * @param {?} c
     * @param {?} x
     * @param {?} y
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    function clip(c: any, x: any, y: any, width: any, height: any): any;

    /**
     * @param {?} data
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    function resize(data: any, width: any, height: any): any;

    /**
     * @param {?} i
     * @return {?}
     */
    function resizeToPowerOf2(i: any): any;
}

declare module hsw.util.Entity {

    /**
     * @param {Array} array
     * @param {(Function|string)} exp
     * @param {number} timestamp
     * @return {?}
     */
    function getEntitiesProperty(array: Array<any>, exp: Function|string, timestamp: number): any;

    /**
     * @param {Array} failures
     * @param {Function} node
     * @return {?}
     */
    function createCommandsForEntities(failures: Array<any>, node: Function): any;
}

declare module hsw.app {

    /**
     * @return {undefined}
     */
    function Base(): void;

    /**
     * @return {undefined}
     */
    function Product(): void;

    /**
     * @return {undefined}
     */
    function Professional(): void;
}

declare module hsw.app.Base {

    /**
     * @return {undefined}
     */
    function getApp(): void;

    /**
     * @return {undefined}
     */
    function getApp();
}

declare module hsw.io.load {

    /**
     * @return {undefined}
     */
    function IStrategy(): void;

    /**
     * @return {undefined}
     */
    function ICache(): void;

    /**
     * @return {undefined}
     */
    function ILoader(): void;

    /**
     * @return {undefined}
     */
    function Manager(): void;
}

declare module hsw.io.load.strategy {

    /**
     * @param {?} a
     * @param {number} newVal
     * @return {undefined}
     */
    function Chain(a: any, newVal: number): void;

    /**
     * @param {Array} dataAndEvents
     * @return {undefined}
     */
    function Prioritized(dataAndEvents: Array<any>): void;

    /**
     * @return {undefined}
     */
    function MaxCocurrency(): void;

    /**
     * @return {undefined}
     */
    function UniqueLoadingUrl(): void;
}

declare module hsw.io.load.cache {

    /**
     * @return {undefined}
     */
    function TextureCache(): void;

    /**
     * @return {undefined}
     */
    function ModelCache(): void;

    /**
     * @return {undefined}
     */
    function XMLCache(): void;
}

declare module hsw.io.load.loader {

    /**
     * @return {undefined}
     */
    function ImageLoader(): void;

    /**
     * @return {undefined}
     */
    function XMLDataLoader(): void;

    /**
     * @param {string} dataAndEvents
     * @return {undefined}
     */
    function TextureLoader(dataAndEvents: string): void;

    /**
     * @return {undefined}
     */
    function ModelLoader(): void;
}

declare module hsw.io {

    /**
     * @return {undefined}
     */
    function ResourceManager(): void;
}
