export let ModelSpaceToViewSpace  = function(a) {
    return Array.isArray(a) ? [a[0], a[2], -a[1]] : {
        x: a.x,
        y: a.z,
        z: -a.y
    }
};

export let ViewSpaceToModelSpace = function(a) {
    return Array.isArray(a) ? [a[0], -a[2], a[1]] : {
        x: a.x,
        y: -a.z,
        z: a.y
    }
};
