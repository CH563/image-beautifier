import { Children, cloneElement, useEffect, useMemo } from 'react';
import { Frame } from 'leafer-ui';

const childrenInjectProps = (params, children) => {
    if (children instanceof Array) {
        return children.map((child) => {
            return Children.toArray(child).map((element) =>
                cloneElement(element, { ...params })
            );
        });
    } else {
        const dom = Children.toArray(children).map((element) =>
            cloneElement(element, { ...params })
        );
        return dom;
    }
};

export default ({ width, height, background, parent, children }) => {
    const frame = useMemo(() => {
        const fra = new Frame({
            width,
            height,
            overflow: 'hide',
            fill: background,
        });
        fra.name = 'frame';
        return fra;
    }, []);

    useEffect(() => {
        parent.add(frame);
    }, [parent]);

    useEffect(() => {
        frame.width = width;
        frame.height = height;
        frame.fill = background;
    }, [width, height, background]);

    useEffect(() => {
        return () => {
            frame.removeAll(true);
        };
    }, []);

    return <>{childrenInjectProps({ parent: frame }, children)}</>;
};
