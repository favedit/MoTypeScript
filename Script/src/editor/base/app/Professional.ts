import {Product} from './Product'
import {KeyboardManager} from '../util/KeyboardManager';
import {Hotkey} from './setting/Hotkey';
import {AutoSaver} from './setting/AutoSaver';
export class Professional extends Product{
  keyboardManager = new KeyboardManager();
  hotkey = new Hotkey();
  autoSaver = new AutoSaver();
}
