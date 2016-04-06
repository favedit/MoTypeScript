import {React} from './plugin/dui/React';
import {Container} from './plugin/dui/Container';
import {FrameSetUi} from './frame/scene/FrameSetUi';

export class MainUi extends Container {

   public render() {
      return <FrameSetUi/>
   }
}