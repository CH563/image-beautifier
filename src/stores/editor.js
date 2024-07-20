import { makeAutoObservable, toJS } from 'mobx';

class Editor {
    img = {};
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

    get cursor() {
        return this.useTool === 'Pencil' ? 'pencil' : this.useTool ? 'crosshair' : 'auto'
    }

    setImg(value) {
        this.img = value;
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
        if (value) {
            this.setSelect(false);
        } else {
            this.setSelect(true);
        }
    }

    setSelect(value) {
        if (!this.app) return;
        this.app.editor.app.config.move.drag = false;
        this.app.editor.hittable = value;
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