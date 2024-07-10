import { makeAutoObservable } from 'mobx';

class Editor {
    constructor () {
        makeAutoObservable(this)
    }
}

const editor = new Editor();
export default editor;