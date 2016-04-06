import {Container} from './plugin/dui/Container';
import {ToolBar} from './plugin/dui/toolbar/ToolBar';
import {ToolButton} from './plugin/dui/toolbar/ToolButton';
import {React} from './plugin/dui/React';

export class ToolBarUi extends Container {

    public onButtonCreateClick(sender, event) {
        debugger
    }

    public render() {
        return <ToolBar>
            <ToolButton icon='tools.create' label='新建' onclick='onButtonCreateClick'></ToolButton>
            <ToolButton icon='tools.preview' label='打开'></ToolButton>
            <ToolButton icon='tools.save' label='保存'></ToolButton>
        </ToolBar>;
    }
}