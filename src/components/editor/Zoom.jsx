import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import Icon from '@components/Icon';
import { Button, Dropdown } from 'antd';
import stores from '@stores';

const items = [
    {
        key: 0.5,
        label: '50%'
    },
    {
        key: 1,
        label: '100%'
    },
    {
        key: 1.5,
        label: '150%'
    },
    {
        key: 2,
        label: '200%'
    }
];

export default observer(() => {
    const handleZoom = (key) => {
        stores.editor.app?.tree.zoom(key);
        stores.editor.setScale(stores.editor.app.tree.scale);
    }
    const handleMenuClick = (item) => {
        const num = Number(item.key);
        if (num === 4) {
            stores.editor.app?.tree.zoom('fit', 100);
        } else {
            stores.editor.app?.tree.zoom(num);
        }
        stores.editor.setScale(stores.editor.app.tree.scale);
    }
    return (
        <div className="absolute z-10 bottom-4 gap-2 right-4 flex items-center ">
            <div className="flex bg-white dark:bg-black overflow-hidden rounded-full shadow-md">
                <Button type="text" icon={<Icon.ZoomIn size={16} />} onClick={() => handleZoom('in')} />
                <Dropdown menu={{ items, onClick: handleMenuClick }} placement="top">
                    <Button type="text">{stores.editor.scale}%</Button>
                </Dropdown>
                <Button type="text" icon={<Icon.ZoomOut size={16} />} onClick={() => handleZoom('out')} />
            </div>
            <div className="rounded-full bg-white dark:bg-black shadow-md overflow-hidden">
                <Button type="text" icon={<Icon.Maximize size={16} />} onClick={() => handleMenuClick({key: 4})} />
            </div>
        </div>
    )
});