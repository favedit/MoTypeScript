import {Objects} from '../../../runtime/common/lang/Objects';
import {Linker} from '../../../runtime/common/reflect/Linker';
import {FApplication as FBaseApplication} from '../../../runtime/framework/FApplication';
import {FDeviceConsole} from '../../../runtime/ui/console/FDeviceConsole';
import {FTransactionConsole} from '../transaction/FTransactionConsole';
import {FCommandConsole} from '../command/FCommandConsole';
import {FSelectionConsole} from '../selection/FSelectionConsole';
import {SSettings} from './SSettings';

//==========================================================
// <T>编辑器应用程序。</T>
//==========================================================
export class FApplication extends FBaseApplication {
   // 设备管理器
   @Linker(FDeviceConsole)
   protected _deviceConsole: FDeviceConsole;
   // 命令管理器
   @Linker(FCommandConsole)
   protected _commandConsole: FCommandConsole;
   // 选择管理器
   @Linker(FSelectionConsole)
   protected _selectionConsole: FSelectionConsole;
   // 事务管理器
   @Linker(FTransactionConsole)
   protected _transactionConsole: FTransactionConsole;

   //==========================================================
   // <T>构造处理</T>
   //==========================================================
   public constructor() {
      super();
   }

   //==========================================================
   // <T>配置处理。</T>
   //==========================================================
   public setup(settings: SSettings) {
      super.setup(settings);
      // 设置环境
      this._deviceConsole.setup(settings.hWindow);
   }

   //==========================================================
   // <T>构造处理</T>
   //==========================================================
   public newDocument() {
   }

   public openDocument() {
   }

   public saveDocument() {
   }

   public closeDocument() {
   }
}