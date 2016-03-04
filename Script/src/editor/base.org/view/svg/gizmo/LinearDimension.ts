import * as base from '../../base/index';

  export let LinearDimensionController = {};

  export const LinearDimensionStateEnum = {
    disabled: 2,
    editable: 4,
    focus: 8,
    invalid: 16
};

export const LinearDimensionCommitTypeEnum = {
    enter: "enter",
    click: "click"
};

export class LinearDimension extends base.Gizmo{

}
