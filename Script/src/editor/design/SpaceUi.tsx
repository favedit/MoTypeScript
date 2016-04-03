import {Container} from './plugin/dui/Container';
import {React} from './plugin/dui/React';
import {ToolBarUi} from './frame/ToolBarUi';

export class SpaceUi extends Container {
   public render() {
      return <ToolBarUi></ToolBarUi>
   }
}