import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import View from './View';
import Icon from '@components/Icon';
import { Button, Dropdown } from 'antd';

const items = [
    {
        key: 1,
        label: '50%'
    },
    {
        key: 2,
        label: '100%'
    },
    {
        key: 3,
        label: '200%'
    },
    {
        key: 4,
        label: 'Fit'
    }
]
export default observer(() => {
    const [target, setTarget] = useState(null);

    return (
        <div className='md:w-0 md:flex-1 overflow-hidden select-none relative'>
            <div className="w-full h-full relative z-0" ref={
                (node) => setTarget(node)
            }>
                {target && <View target={target} />}
            </div>
            <div className="absolute z-10 bottom-4 right-4 flex items-center bg-white overflow-hidden rounded-full shadow-md">
                <Button type="text" icon={<Icon.ZoomIn size={16} />} />
                <Dropdown menu={{ items }} placement="top">
                    <Button type="text">100%</Button>
                </Dropdown>
                <Button type="text" icon={<Icon.ZoomOut size={16} />} />
            </div>
        </div>
    );
});
