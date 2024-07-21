import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import Icon from '@components/Icon';
import { InputNumber, Button, Tooltip } from 'antd';
import stores from '@stores';

export default observer(() => {
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    return (
        <div className='flex gap-2 items-center py-2 font-normal'>
            <InputNumber
                min={1}
                value={width}
                onChange={setWidth}
                placeholder={stores.option.frameConf.width}
                prefix={<span className='opacity-60 mx-1'>W</span>}
                className='flex-1'
            />
            <span className='text-xs opacity-50'>x</span>
            <InputNumber
                min={1}
                value={height}
                onChange={setHeight}
                placeholder={stores.option.frameConf.height}
                prefix={<span className='opacity-60 mx-1'>H</span>}
                className='flex-1'
            />
            <Button
                type='primary'
                shape='circle'
                icon={<Icon.Check size={18} />}
                disabled={!width || !height}
            ></Button>
            <Tooltip title="Auto size">
                <Button
                    type='primary'
                    shape='circle'
                    icon={<Icon.Maximize size={18} />}
                ></Button>
            </Tooltip>
        </div>
    );
});
