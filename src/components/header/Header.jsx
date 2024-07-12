import { observer } from 'mobx-react-lite';
import { Button, ColorPicker, Divider, Tooltip } from 'antd';
import Icon from '@components/Icon';
import { WidthDropdown } from '@components/header/WidthDropdown'
import { useState } from 'react';
import { toDownloadFile } from '@utils/utils';
import stores from '@stores';

export default observer(() => {
    const [annotateColor, setAnnotateColor] = useState('#ffffff');
    const [width, setWidth] = useState(1);
    const exportPng = () => {
        stores.editor.app.tree.export('png', 0.9).then(result => {
            toDownloadFile(result.data, 'aa.png')
        })
    }
    return (
        <div className='flex items-center justify-center shrink-0 gap-3 bg-white py-2 px-5 border-b border-b-gray-50 shadow-sm relative z-[11]'>
            <div className='flex gap-1 justify-center items-center'>
                <Tooltip placement='bottom' arrow={false} title='Undo'>
                    <Button
                        type='text'
                        shape='circle'
                        icon={<Icon.Undo size={16} />}
                        onClick={exportPng}
                    ></Button>
                </Tooltip>
                <Tooltip placement='bottom' arrow={false} title='Redo'>
                    <Button
                        type='text'
                        shape='circle'
                        icon={<Icon.Redo size={16} />}
                    ></Button>
                </Tooltip>
            </div>
            <Divider type='vertical' />
            <div className='flex gap-1 justify-center items-center'>
                <Button
                    type='text'
                    shape='circle'
                    icon={<Icon.Square size={16} />}
                ></Button>
                <Button
                    type='text'
                    shape='circle'
                    icon={<Icon.Square size={16} fill='currentColor' />}
                ></Button>
                <Button
                    type='text'
                    shape='circle'
                    icon={<Icon.Circle size={16} />}
                ></Button>
                <Button
                    type='text'
                    shape='circle'
                    icon={<Icon.Slash size={16} />}
                ></Button>
                <Button
                    type='text'
                    shape='circle'
                    icon={<Icon.MoveDownLeft size={16} />}
                ></Button>
                <Button
                    type='text'
                    shape='circle'
                    icon={<Icon.Pencil size={16} />}
                ></Button>
                <Button
                    type='text'
                    shape='circle'
                    icon={<Icon.Smile size={16} />}
                ></Button>
            </div>
            <Divider type='vertical' />
            <div className='flex gap-1 justify-center items-center'>
                <ColorPicker
                    size='small'
                    presets={[
                        {
                            label: 'Recommended',
                            colors: [
                                '#ffffff',
                                '#444444',
                                '#df4b26',
                                '#1677ff',
                                '#52C41A',
                                '#FA8C16',
                                '#FADB14',
                                '#EB2F96',
                                '#722ED1',
                            ],
                        },
                    ]}
                    value={annotateColor}
                    onChange={(e) => setAnnotateColor(e.toHexString())}
                />
                <WidthDropdown defaultValue={width} onChange={setWidth} />
            </div>
        </div>
    );
});
