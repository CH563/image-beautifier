import { makeAutoObservable } from 'mobx';

class Option {
    margin = 30;
    padding = 0;
    paddingBg = 'rgba(255,255,255,.85)';
    round = 10;
    shadow = 3;
    frame = 'none';
    ratio = 4 / 3;
    background = 'default_1';
    constructor() {
        makeAutoObservable(this);
    }
    setMargin(value) {
        this.margin = value;
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
    }
}

const option = new Option();
export default option;
