export var CategoryTypeEnum = {
    Color: "color",
    Floor: "floor",
    Tile: "tile",
    WallPaper: "wallpaper",
    Pinhua: "pinhua"
};

$.extend(CategoryTypeEnum, {
    ext_material: [CategoryTypeEnum.Color, CategoryTypeEnum.Floor, CategoryTypeEnum.Tile, CategoryTypeEnum.WallPaper, CategoryTypeEnum.Pinhua],
    ext_pinhua_material: [CategoryTypeEnum.Floor, CategoryTypeEnum.Tile, CategoryTypeEnum.WallPaper]
});
