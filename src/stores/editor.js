import { makeAutoObservable, toJS } from 'mobx';
import demoPng from '@assets/demo.png';

class Editor {
    img = demoPng;
    app = null;
    scale = 100;
    useTool = null;
    annotateColor = '#ff0000';
    strokeWidth = 4;
    shapes = new Map();
    constructor () {
        makeAutoObservable(this)
    }

    get shapesList() {
        return Array.from(toJS(this.shapes).values());
    }

    getShape(id) {
        return this.shapes.get(id);
    }

    addShape(shape) {
        this.shapes.set(shape.id, shape);
    }

    removeShape(shape) {
        this.shapes.delete(shape.id);
    }

    setApp(app) {
        this.app = app;
    }

    setScale(value) {
        this.scale = parseInt(value * 100);
    }

    setUseTool(value) {
        this.useTool = value;
    }

    setAnnotateColor(color) {
        this.annotateColor = color;
    }

    setStrokeWidth(value) {
        this.strokeWidth = value;
    }

    destroy() {
        this.app?.destroy();
        this.app = null;
    }
}

const editor = new Editor();
export default editor;