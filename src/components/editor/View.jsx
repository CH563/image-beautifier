import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { App, ResizeEvent, ZoomEvent, DragEvent, PointerEvent, Cursor } from 'leafer-ui';
import debounce from 'lodash/debounce';
import { addListener, removeListener } from 'resize-detector';
import rotatePng from '@assets/rotate.png';
import pencilPng from '@assets/pencil.png';
import stores from '@stores';
import FrameBox from './layers/FrameBox';
import Screenshot from './layers/Screenshot';
import Watermark from './layers/Watermark';
import ShapeLine from './layers/ShapeLine';
import { ScrollBar } from '@leafer-in/scroll'
import { nanoid } from '@utils/utils';
import HotKeys from './HotKeys';
import '@leafer-in/editor';
import '@leafer-in/view';

Cursor.set('pencil', { url: pencilPng });

export default observer(({target}) => {
    useEffect(() => {
        const app = new App({
            view: target,
            editor: {
                lockRatio: 'corner',
                stroke: '#3f99f7',
                skewable: false,
                hover: false,
                middlePoint: { cornerRadius: 100, width: 20, height: 6 },
                rotatePoint: {
                    width: 20,
                    height: 20,
                    fill: {
                        type: 'image',
                        url: rotatePng,
                    },
                },
            },
            tree: {
                usePartRender: true,
            },
            sky: {
                type: 'draw',
                usePartRender: true,
            },
        });
        new ScrollBar(app);

        stores.editor.setApp(app);

        app.tree.on(ZoomEvent.ZOOM, () => {
            stores.editor.setScale(app.tree.scale);
        });
        app.tree.on(ResizeEvent.RESIZE, () => {
            stores.editor.setScale(app.tree.scale);
        });

        
        let shapeId = null;
        const onStart = (arg) => {
            if (!stores.editor.useTool) return;
            const { target } = arg;
            const shape = stores.editor.getShape(target.id);
            if (shape) return;
            shapeId = nanoid();
            const size = arg.getPageBounds ? arg.getPageBounds() : arg.getPage();
            const type = stores.editor.useTool;
            const newShape = {
                id: shapeId,
                type,
                fill: stores.editor.annotateColor,
                strokeWidth: stores.editor.strokeWidth,
                zIndex: stores.editor.shapes.size + 1,
                ...size
            };
            return newShape;
        }
        app.tree.on(PointerEvent.DOWN, (arg) => {
            const type = stores.editor.useTool;
            if (type !== 'Step') return;
            const newShape = onStart(arg);
            if (!newShape) return;
            newShape.text = stores.editor.nextStep;
            newShape.editable = true;
            stores.editor.addShape(newShape);
            shapeId = null;
            stores.editor.setUseTool(null);
        });
        app.tree.on(DragEvent.START, (arg) => {
            const type = stores.editor.useTool;
            if (type === 'Step') return;
            const newShape = onStart(arg);
            if (!newShape) return;
            if (['Slash', 'MoveDownLeft', 'Pencil'].includes(type)) {
                newShape.points = [newShape.x, newShape.y];
            }
            stores.editor.addShape(newShape);
        });
        app.tree.on(DragEvent.DRAG, (arg) => {
            if (!stores.editor.useTool) return;
            if (!shapeId) return;
            const shape = stores.editor.getShape(shapeId);
            if (!shape) return;
            const size = arg.getPageBounds();
            const newShape = Object.assign({}, shape, size);
            const { points, type } = newShape;
            if (points && points.length) {
                const { x, y } = arg.getInnerTotal();
                const newX = x > 0 ? size.x + x : size.x;
                const newY = y > 0 ? size.y + y : size.y;
                if (type === 'Pencil') {
                    newShape.points = [...points, newX, newY];
                } else {
                    newShape.points = [points[0], points[1], newX, newY];
                }
            }
            stores.editor.addShape(newShape);
        });
        app.tree.on(DragEvent.END, () => {
            if (!stores.editor.useTool) return;
            if (!shapeId) return;
            const shape = stores.editor.getShape(shapeId);
            if (shape) {
                if ((shape.width === 0 || shape.height === 0) && !['Slash', 'MoveDownLeft', 'Pencil'].includes(shape.type)) {
                    stores.editor.removeShape(shape);
                } else {
                    stores.editor.addShape(Object.assign({}, shape, {editable: true}));
                }
            }
            shapeId = null;
            if (stores.editor.useTool !== 'Pencil') stores.editor.setUseTool(null);
        });
        // 监听容器变化
        const onResize = debounce(() => {
            const { width, height } = target.getBoundingClientRect();
            app.tree.zoom('fit', 100);
            if (stores.option.frameConf.width < width && stores.option.frameConf.height < height) {
                app.tree.zoom(1);
            }
        }, 10);

        addListener(target, onResize);

        return (() => {
            removeListener(target, onResize);
            stores.editor.destroy();
        });
    }, [target]);

    useEffect(() => {
        const timer = setTimeout(() => {
            const { width, height } = target.getBoundingClientRect();
            stores.editor.app.tree.zoom('fit', 100);
            if (stores.option.frameConf.width < width && stores.option.frameConf.height < height) {
                stores.editor.app.tree.zoom(1);
            }
            stores.editor.setScale(stores.editor.app.tree.scale);
        }, 20);
        return (() => {
            clearTimeout(timer);
        })
    }, [stores.option.frameConf.width, stores.option.frameConf.height]);

    if (!stores.editor.app?.tree) return null;
    return (<>
        <FrameBox parent={stores.editor.app.tree} cursor={stores.editor.cursor} {...stores.option.frameConf}>
            {stores.editor.shapesList.map((item) => {
                const { id, type } = item;
                const props = Object.assign({}, item, type === 'Magnifier' ? {snap: stores.editor.snap} : {});
                return <ShapeLine key={id} {...props} />;
            })}
            {stores.editor.img?.src && <Screenshot />}
            {stores.option.waterImg && <Watermark />}
        </FrameBox>
        <HotKeys />
    </>);
});
