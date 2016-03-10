import {FObjects} from '../../../runtime/common/lang/FObjects';
import {ALinker} from '../../../runtime/common/reflect/ALinker';
import {FApplication as FBaseApplication} from '../../../runtime/framework/FApplication';
import {FCommandConsole} from '../command/FCommandConsole';
import {FSelectionConsole} from '../selection/FSelectionConsole';
import {FTransactionConsole} from '../transaction/FTransactionConsole';

//==========================================================
// <T>编辑器应用程序。</T>
//==========================================================
export class FApplication extends FBaseApplication {
   // 命令管理器
   @ALinker(FCommandConsole)
   protected _commandConsole: FCommandConsole = null;
   // 选择管理器
   @ALinker(FSelectionConsole)
   protected _selectionConsole: FSelectionConsole = null;
   // 事务管理器
   @ALinker(FTransactionConsole)
   protected _transactionConsole: FTransactionConsole = null;

   //==========================================================
   // <T>构造处理</T>
   //==========================================================
   public constructor() {
      super();
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