import { Product } from './Product';
import { KeyboardManager } from '../util/KeyboardManager';
import { Hotkey } from './setting/Hotkey';
import { AutoSaver } from './setting/AutoSaver';
export declare class Professional extends Product {
    keyboardManager: KeyboardManager;
    hotkey: Hotkey;
    autoSaver: AutoSaver;
}
