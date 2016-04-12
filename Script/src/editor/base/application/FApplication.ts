import {Objects} from '../../../runtime/common/lang/Objects';
import {Linker} from '../../../runtime/common/reflect/Linker';
import {Application as BaseApplication} from '../../../runtime/framework/Application';
import {DeviceService} from '../../../runtime/ui/service/DeviceService';
import {FTransactionConsole} from '../transaction/FTransactionConsole';
import {FCommandConsole} from '../command/FCommandConsole';
import {FSelectionConsole} from '../selection/FSelectionConsole';
import {Settings} from './Settings';

//==========================================================
// <T>编辑器应用程序。</T>
//==========================================================
export class Application extends BaseApplication {
   // 设备管理器
   @Linker(DeviceService)
   protected _deviceService: DeviceService;
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
   public setup(settings: Settings) {
      super.setup(settings);
      // 设置环境
      this._deviceService.setup(settings.hWindow);
      this._deviceService.resizeListeners.register(this, this.onResize);
   }

   //==========================================================
   // <T>改变大小事件</T>
   //==========================================================
   public onResize(sender, event) {
      var views = this.views;
      var count = views.count();
      for (var i = 0; i < count; i++) {
         var view = views.at(i);
         view.onResize(sender, event);
      }
   }

   //==========================================================
   // <T>构造处理</T>
   //==========================================================
   public newDocument() {
   }

   public openDocument(guid?: string) {
   }

   public saveDocument() {
   }

   public closeDocument() {
   }
}