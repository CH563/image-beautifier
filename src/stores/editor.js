import { makeAutoObservable, toJS, action } from 'mobx';
import { maxBy } from 'lodash';

let timer;
class Editor {
    img = {};
    invalid = false;
    app = null;
    scale = 100;
    useTool = null;
    annotateColor = '#ff0000';
    strokeWidth = 4;
    shapes = new Map();
    message = null;
    constructor () {
        makeAutoObservable(this)
    }

    get shapesList() {
        return Array.from(toJS(this.shapes).values());
    }

    get cursor() {
        return this.useTool === 'Pencil' ? 'pencil' : this.useTool ? 'crosshair' : 'auto'
    }

    get isEditing() {
        const is = !!this.app?.tree;
        if (!is) {
            this.message.info('Please add a image');
            this.setInvalid();
        }
        return is;
    }

    get nextStep() {
        const steps = this.shapesList.filter(e => e.type === 'Step');
        const maxItem = maxBy(steps, (item) => Number(item.text));
        if (maxItem?.text) return Number(maxItem.text) + 1;
        return 1;
    }

    setInvalid() {
        clearTimeout(timer);
        this.invalid = true;
        timer = setTimeout(action(() => {
            this.invalid = false;
        }), 200);
    }

    setImg(value) {
        this.img = value;
    }

    setMessage(value) {
        this.message = value;
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

    clearImg() {
        this.img = {};
    }

    destroy() {
        this.app?.destroy(true);
        this.app = null;
        this.shapes.clear();
        this.setUseTool(null);
    }
}

const editor = new Editor();
export default editor;