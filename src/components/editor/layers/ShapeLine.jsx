import { useEffect, useMemo } from 'react';
import { Rect, Ellipse, Line } from 'leafer-ui';

export default ({ parent, type, id, width, height, x, y, fill, strokeWidth, zIndex, points, editable }) => {
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
        if (type === 'Slash') {
            return new Line({
                id,
                points,
                zIndex,
                stroke: fill,
                strokeWidth
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
        parent.add(shape);
        return (() => {
            shape.remove();
        })
    }, [parent]);
    return null;
}