import { makeAutoObservable, toJS, action, runInAction } from 'mobx';
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
    theme = 'light';
    clearFun = null;
    snap = null;
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

    get isDark() {
        return this.theme === 'dark';
    }

    createSnap(type) {
        if (type === 'init' && this.snap?.data) return;
        if (type !== 'init' && this.snap === null) return;
        const ex = async () => {
            const frame = this.app?.tree?.children[0];
            if (!frame) return;
            frame.children.map(child => {
                if (child.id !== 'screenshot-box') {
                    child.visible = false;
                }
            });
            const image = await frame.export('png', { pixelRatio: 2 }).catch(() => null);
            frame.children.map(child => child.visible = true);
            runInAction(() => {
                this.snap = image;
            });
        };
        ex();
    }

    setTheme(value) {
        if (value === this.theme) return;
        runInAction(() => {
            if (value) {
                this.theme = value;
            } else {
                this.theme = this.isDark ? 'light' : 'dark';
            }
        });
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
        if (this.snap && this.shapesList.every(e => e.type !== 'Magnifier')) {
            this.snap = null;
        }
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
        if (!this.app?.editor) return;
        const { list } = this.app.editor;
        if (!list.length) return;
        for (let item of list) {
            const shape = this.shapes.get(item.id);
            if (shape) shape.fill = color;
        }
    }

    setStrokeWidth(value) {
        this.strokeWidth = value;
        if (!this.app?.editor) return;
        const { list } = this.app.editor;
        if (!list.length) return;
        for (let item of list) {
            const shape = this.shapes.get(item.id);
            if (shape) shape.strokeWidth = value;
        }
    }

    setClearFun(value) {
        this.clearFun = value;
    }

    clearImg() {
        this.img = {};
    }

    destroy() {
        this.app?.destroy(true);
        this.app = null;
        this.snap = null;
        this.shapes.clear();
        this.setUseTool(null);
    }
}

const editor = new Editor();
export default editor;