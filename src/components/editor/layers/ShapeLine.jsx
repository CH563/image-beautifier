import { useEffect, useMemo } from 'react';
import { Rect, Ellipse, Line, Text, PropertyEvent } from 'leafer-ui';
import { Arrow } from '@leafer-in/arrow';
import debounce from 'lodash/debounce';
import { numSvg } from '@utils/utils';

export default ({ parent, type, id, width, height, x, y, fill, strokeWidth, zIndex, points, editable, text, snap }) => {
    const shape = useMemo(() => {
        const defaultOption = { id, x, y, zIndex }
        if (type === 'SquareFill') {
            return new Rect({
                cornerRadius: 8,
                width,
                height,
                fill,
                ...defaultOption
            });
        }
        if (type === 'Circle') {
            return new Ellipse({
                stroke: fill,
                strokeWidth,
                width,
                height,
                ...defaultOption
            });
        }
        if (type === 'Magnifier') {
            return new Ellipse({
                stroke: '#ffffff90',
                strokeWidth,
                strokeAlign: 'outside',
                width,
                height,
                shadow: {
                    x: 4,
                    y: 4,
                    blur: 6,
                    color: '#00000010',
                    box: true
                },
                ...defaultOption
            });
        }
        if (type === 'Slash') {
            return new Line({
                id,
                points,
                zIndex,
                stroke: fill,
                strokeWidth
            });
        }
        if (type === 'MoveDownLeft') {
            return new Arrow({
                id,
                points,
                zIndex,
                strokeCap: 'round',
                strokeJoin: 'round',
                stroke: fill,
                strokeWidth
            });
        }
        if (type === 'Pencil') {
            return new Line({
                id,
                points,
                zIndex,
                curve: true,
                stroke: fill,
                strokeWidth
            });
        }
        if (type === 'Step') {
            return new Ellipse({
                ...defaultOption,
                width: 32,
                height: 32,
                stroke: '#ffffff90',
                strokeWidth,
                strokeAlign: 'outside',
                lockRatio: true,
                shadow: {
                    x: 1,
                    y: 1,
                    blur: 2,
                    color: '#00000045',
                    box: true
                },
                fill: [
                    {
                        type: 'solid',
                        color: fill
                    },
                    {
                        type: 'image',
                        url: numSvg(text),
                        format: 'svg',
                        align: 'center'
                    }
                ]
            })
        }
        if (type === 'emoji') {
            return new Text({
                id,
                zIndex,
                text,
                resizeFontSize: true,
                fontSize: 48
            });
        }
        return new Rect({
            cornerRadius: 8,
            stroke: fill,
            strokeWidth,
            width,
            height,
            ...defaultOption
        });
    }, [parent]);

    useEffect(() => {
        if (['Slash', 'MoveDownLeft', 'Pencil'].includes(type)) {
            shape.points = points;
        } else if (type === 'Step') {
            //
        } else {
            shape.x = x;
            shape.y = y;
            shape.width = width;
            shape.height = height;
        }
    }, [x, y, width, height]);

    useEffect(() => {
        shape.editable = !!editable;
    }, [editable]);

    useEffect(() => {
        const offset = {x:0,y:0};
        const fillBg = debounce(() => {
            const x = -shape.x * 2 - shape.width / 2;
            const y = -shape.y * 2 - shape.height / 2;
            if (offset.x === x && offset.y === y) return;
            offset.x = x;
            offset.y = y;
            shape.fill = [
                { type: 'solid', color: '#ffffff' },
                {
                    type: 'image',
                    url: snap.data,
                    mode: 'clip',
                    size: {
                        width: snap.width,
                        height: snap.height
                    },
                    offset
                },
                {
                    type: 'linear',
                    from: 'top',
                    to: 'bottom',
                    stops: [
                        { offset: 0, color: '#ffffffaa' },
                        { offset: 0.48, color: '#ffffff00'}
                    ]
                }
            ];
        }, 10);
        shape.on(PropertyEvent.CHANGE, (arg) => {
            if (!snap?.data) return;
            if (!['x', 'y', 'width', 'height'].includes(arg.attrName)) return;
            fillBg();
        });
        parent.add(shape);
        return (() => {
            shape.off(PropertyEvent.CHANGE);
            shape.remove();
        })
    }, [parent]);
    return null;
}