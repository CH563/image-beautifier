import { makeAutoObservable } from 'mobx';
import demoPng from '@assets/demo.png';

class Editor {
    img = demoPng;
    app = null;
    constructor () {
        makeAutoObservable(this)
    }

    setApp(app) {
        this.app = app;
    }

    destroy() {
        this.app?.destroy();
        this.app = null;
    }
}

const editor = new Editor();
export default editor;