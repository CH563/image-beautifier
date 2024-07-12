import { makeAutoObservable } from 'mobx';

class Editor {
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