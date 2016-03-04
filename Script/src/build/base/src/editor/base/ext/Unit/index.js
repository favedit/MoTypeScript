define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.LengthUnitTypeEnum = {
        foot: "ft",
        inch: "in",
        meter: "m",
        centimeter: "cm",
        millimeter: "mm",
        kilometer: "km"
    };
    exports.AreaUnitTypeEnum = {
        foot: "ft",
        inch: "in",
        meter: "m",
        centimeter: "cm",
        millimeter: "mm",
        kilometer: "km"
    };
    exports.ConvertToMeterFactor = {
        feet: .3048,
        ft: .3048,
        inches: .0254,
        "in": .0254,
        cm: .01,
        m: 1,
        km: 1E3,
        mm: .001,
        meters: 1,
        centimeters: .01,
        kilometers: 1E3,
        millimeters: .001
    };
    exports.ConvertToSquareMeterFactor = {
        feet: .09290304,
        ft: .09290304,
        inches: 6.452E-4,
        "in": 6.452E-4,
        cm: 1E-4,
        m: 1,
        km: 1E6,
        mm: 1E-6,
        meters: 1
    };
});
//# sourceMappingURL=index.js.map