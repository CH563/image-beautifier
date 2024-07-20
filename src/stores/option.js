import { makeAutoObservable } from 'mobx';
import backgroundConfig from '@utils/backgroundConfig';

class Option {
    scale = 1;
    padding = 0;
    paddingBg = 'rgba(255,255,255, 100)';
    round = 10;
    shadow = 3;
    frame = 'none';
    ratio = 4 / 3;
    background = 'default_1';
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

    setRatio(value) {
        this.ratio = value;
    }

    setBackground(value) {
        this.background = value;
        this.frameConf.background = backgroundConfig[value].fill;
    }
}

const option = new Option();
export default option;
