define(["require", "exports", './Background', './Camera', './CameraController', './Canvas', './Content', './ContentController', './Controller', './Display', './DisplayController', './Gizmo', './Grid', './GridController', './LoadingTasks', './Temp', './Util', './Wall', './WallController', './Floor', './FloorController', './Point'], function (require, exports, Background_1, Camera_1, CameraController_1, Canvas_1, Content_1, ContentController_1, Controller_1, Display_1, DisplayController_1, Gizmo_1, Grid_1, GridController_1, LoadingTasks_1, Temp_1, Util_1, Wall_1, WallController_1, Floor_1, FloorController_1, Point_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    __export(Background_1);
    __export(Camera_1);
    __export(CameraController_1);
    __export(Canvas_1);
    __export(Content_1);
    __export(ContentController_1);
    __export(Controller_1);
    __export(Display_1);
    __export(DisplayController_1);
    __export(Gizmo_1);
    __export(Grid_1);
    __export(GridController_1);
    __export(LoadingTasks_1);
    __export(Temp_1);
    __export(Util_1);
    __export(Wall_1);
    __export(WallController_1);
    __export(Floor_1);
    __export(FloorController_1);
    __export(Point_1);
    exports.ResourceLoadingStatusEnum = {
        NotStarted: "notstated",
        InProgress: "inprogress",
        Completed: "completed",
        Failed: "failed",
        Canceled: "canceled"
    };
    exports.CanvasShadedModeEnum = {
        Realistic: 0,
        Consistent: 1
    };
    exports.CanvasEventTypeEnum = {
        ShadedModeChanged: "shadedModeChanged",
        LoadingStatusChanged: "loadingStatusChanged",
        ViewBoxChanged: "viewBoxChanged",
        CanvasSizeChanged: "canvasSizeChanged",
        UnderlayChanged: "underlayChanged"
    };
});
//# sourceMappingURL=index.js.map