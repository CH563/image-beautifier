export default class UndoRedoManager {
    constructor(options) {
        this.options = Object.assign(
            {
                limit: 50,
                onChange: () => {},
            },
            options || {}
        );

        // 数据堆
        this._stacks = [];
        // 指针位置
        this._pointer = -1;
    }

    get current() {
        return this._stacks[this._pointer];
    }

    get canUndo() {
        return this._pointer > 0;
    }

    get canRedo() {
        return this._pointer < this._stacks.length - 1;
    }

    get count() {
        return this._stacks.length;
    }

    get stacks() {
        return this._stacks;
    }

    destroy() {
        this._stacks = null;
        this.options = null;
        this._pointer = null;
    }

    add(data) {
        if (!this._stacks) {
            return;
        }
        // 应该删除指针之后的记录
        this._stacks.splice(
            this._pointer + 1,
            this._stacks.length - this._pointer - 1
        );
        if (this._stacks.length === this.options.limit) {
            // 存储达到上限，删除第一个
            this._stacks.shift();
            this._pointer = this.options.limit - 1;
        } else {
            this._pointer++;
        }
        this._stacks.push(data);
        this.options.onChange(this);
        return this.current;
    }

    undo() {
        if (!this.canUndo) {
            console.warn('not can undo');
            return;
        }
        this._pointer--;
        this.options.onChange(this);
        return this.current;
    }

    redo() {
        if (!this.canRedo) {
            console.warn('not can redo');
            return;
        }
        this._pointer++;
        this.options.onChange(this);
        return this.current;
    }
}
