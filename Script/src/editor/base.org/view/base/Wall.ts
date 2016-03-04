import {Layer} from "../webgl3d/Layer";
import {WallController} from "./WallController";
import {Display} from './Display'
import {CoWall} from '../../model/CoWall';
declare var hsw;
declare var goog;

export class WallGeometry{

}

export class Wall extends Display{
  constructor(context,layer:RaphaelElement|Layer,coWall:CoWall,ctrl:WallController){
    super(context,layer,coWall,ctrl);
    hsw.view.base.Display.call(this, context, layer, coWall, ctrl || new hsw.view.base.WallController(coWall,context));
    this.listenEvent(coWall, hsw.core.brep.EntityEventEnum.fieldChanged, function(event) {
        var b = event.target;
        if ("width" === b.fieldName || "height3d" === b.fieldName || "next" === b.fieldName || "prev" === b.fieldName)
            b = event.currentTarget,
            event = b.next,
            b = b.prev,
            event && event.dispatchEvent(new goog.events.Event(hsw.core.brep.EntityEventEnum.entityDirty)),
            b && b.dispatchEvent(new goog.events.Event(hsw.core.brep.EntityEventEnum.entityDirty))
    });
    this.listenEvent(coWall, hsw.core.brep.EntityEventEnum.flagChanged, function(event) {
        this.onFlagChanged(event.target.flag)
    })
  }
}
