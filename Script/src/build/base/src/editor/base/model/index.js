define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.MaterialIdEnum = {
        local: "local",
        generated: "generated",
        customized: "customized"
    };
    exports.PointFlagEnum = {
        hoverOn: 512
    };
    exports.Pattern = {
        makePattern: function (a, b, c) {
            return "";
        }
    };
    exports.PatternTypeEnum = {
        Horizontal: "res/view/svg/wooden_floor_pattern.png",
        UserDefine_1: exports.Pattern.makePattern(10, 10, "")
    };
    exports.WallFlagEnum = {
        dimensionOff: 256,
        hoverOn: 512,
        clickOn: 1024,
        heightEditable: 2048
    };
    exports.WallEvent = {
        dimensionChanged: "dimensionchanged"
    };
    exports.WallSurfaceTypeEnum = {
        inner: "inner",
        outer: "outer",
        top: "top",
        bottom: "bottom",
        from: "from",
        to: "to",
        outerfrom: "outerfrom",
        outerto: "outerto"
    };
    exports.WallTypeEnum = {
        generic: "generic",
        gypsum_120: "gypsum_120",
        brick_120: "brick_120",
        brick_240: "brick_240",
        non_brick_120: "non_brick_120"
    };
    exports.ContentUrlTypeEnum = {
        top: "top",
        model3d: "model3d",
        modelTexture: "modelTexture"
    };
    exports.ContentFlagEnum = {
        castShadow: 256,
        scalable_obsoleted: 512,
        scaleProportionConstrain: 1024
    };
    exports.CoWallEventEnum = {
        moldingAdded: "moldingadded",
        moldingRemoved: "moldingremoved"
    };
    exports.RoomFlagEnum = {
        ceilingOff: 256,
        hoverOn: 512,
        clickOn: 1024,
        dimensionOff: 2048,
        roomtypeOff: 4096
    };
    exports.RoomSurfaceTypeEnum = {
        floor: "floor",
        ceiling: "ceiling"
    };
    exports.RoomTypes = "Bathroom Bedroom DiningRoom KidsRoom Kitchen LivingRoom Office OtherRoom Outdoors PublicExterior PublicInterior ResidentialExterior EntranceHallway ProductShowcase FloorPlan Studio Basement HomeCinema Library Den Sketch LivingDiningRoom Hallway Balcony MasterBedroom SecondBedroom ElderlyRoom Lounge Auditorium NannyRoom LaundryRoom StorageRoom CloakRoom MasterBathroom SecondBathroom Stairwell Aisle Corridor PorchBalcony none".split(" ");
    exports.GridFlagEnum = {
        toggleOff: 256
    };
    exports.MoldingTypeEnum = {
        baseboard: "baseboard",
        gypsum: "gypsum"
    };
    exports.CameraTypeEnum = {
        FirstPerson: "firstperson",
        AerialView: "aerialview"
    };
    exports.CameraFlagEnum = {
        toggleOff: 256
    };
    exports.GroupIdEnum = {
        temporary: "temporary",
        persistent: "persistent"
    };
    exports.GroupFlagEnum = {
        firstFlag: 256,
        boundingOff: 256
    };
    exports.FloorplanMeta = {
        magic: "3614ec83716a",
        version: "0.13",
        unit: "meter",
        keywords: "Homestyler web designer editor"
    };
    exports.FloorplanVersion = {
        MIN: "0.2",
        MAX: exports.FloorplanMeta.version
    };
});
//# sourceMappingURL=index.js.map