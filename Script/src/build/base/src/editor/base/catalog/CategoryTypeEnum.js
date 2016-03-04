define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.CategoryTypeEnum = {
        Color: "color",
        Floor: "floor",
        Tile: "tile",
        WallPaper: "wallpaper",
        Pinhua: "pinhua"
    };
    $.extend(exports.CategoryTypeEnum, {
        ext_material: [exports.CategoryTypeEnum.Color, exports.CategoryTypeEnum.Floor, exports.CategoryTypeEnum.Tile, exports.CategoryTypeEnum.WallPaper, exports.CategoryTypeEnum.Pinhua],
        ext_pinhua_material: [exports.CategoryTypeEnum.Floor, exports.CategoryTypeEnum.Tile, exports.CategoryTypeEnum.WallPaper]
    });
});
//# sourceMappingURL=CategoryTypeEnum.js.map