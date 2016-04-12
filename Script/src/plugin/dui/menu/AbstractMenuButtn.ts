import {Listeners} from './runtime/common/lang/Listeners';
import {StringUtil} from './runtime/common/lang/StringUtil';
import {EventEnum} from './runtime/ui/EventEnum';
import {DispatchEvent} from './runtime/ui/event/DispatchEvent';
import {HtmlUtil} from './runtime/ui/utility/HtmlUtil';
import {RenderContext} from './RenderContext';
import {Control} from './Control';

//==========================================================
// <T>菜单按键。</T>
//==========================================================
export class AbstractMenuButtn extends Control {
   // 父底板元素
   public _hParentLine: HTMLTableRowElement;
}