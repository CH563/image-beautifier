import { makeAutoObservable, toJS } from 'mobx';
import backgroundConfig from '@utils/backgroundConfig';

class Option {
    scale = 1;
    scaleX = false;
    scaleY = false;
    padding = 0;
    paddingBg = 'rgba(255,255,255, 100)';
    round = 10;
    shadow = 3;
    frame = 'none';
    frameMode = 'cover';
    background = 'default_1';
    align = 'center';
    waterImg = null;
    waterIndex = 1;
    size = {
        type: 'auto',
        title: 'Auto'
    };
    frameConf = {
        width: 800,
        height: 600,
        background: {
            type: 'linear',
            from: 'left',
            to: 'right',
            stops: ['#6366f1', '#a855f7', '#ec4899']
        }
    }
    constructor() {
        makeAutoObservable(this);
    }

    get waterSvg() {
        return toJS(this.waterImg);
    }

    get mode() {
        return this.frame === 'none' || this.frame.includes('Bar') ? 'cover' : this.frameMode;
    }

    setScale(value) {
        this.scale = value;
    }

    setPadding(value) {
        this.padding = value;
    }

    setPaddingBg(value) {
        this.paddingBg = value;
    }

    setRound(value) {
        this.round = value;
    }

    setShadow(value) {
        this.shadow = value;
    }

    setFrame(value) {
        this.frame = value;
    }

    setFrameMode(value) {
        this.frameMode = value;
    }

    setFrameSize(width, height) {
        if (!width || !height) return;
        this.frameConf.width = width;
        this.frameConf.height = height;
    }

    setAlign(value) {
        this.align = value;
    }

    setSize(value) {
        this.size.type = value.type;
        this.size.title = value.title;
        this.setFrameSize(value.width, value.height)
    }

    setBackground(value) {
        this.background = value;
        this.frameConf.background = backgroundConfig[value].fill;
    }
    toggleFlip(type) {
        if (type === 'x') {
            this.scaleX = !this.scaleX;
        }
        if (type === 'y') {
            this.scaleY = !this.scaleY;
        }
    }
    setWaterImg(value) {
        this.waterImg = value;
    }
    setWaterIndex(value) {
        this.waterIndex = value;
    }
}

const option = new Option();
export default option;
