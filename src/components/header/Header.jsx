import { observer } from 'mobx-react-lite';
import { Button, ColorPicker, Divider, Tooltip } from 'antd';
import { icons } from 'lucide-react';
import Icon from '@components/Icon';
import { WidthDropdown } from '@components/header/WidthDropdown'
import { toDownloadFile } from '@utils/utils';
import stores from '@stores';

const toolList = ['Square', 'SquareFill', 'Circle', 'Slash', 'MoveDownLeft', 'Pencil', 'Smile'];

export default observer(() => {
    const exportPng = () => {
        stores.editor.app.tree.export('png', 0.9).then(result => {
            toDownloadFile(result.data, 'aa.png')
        })
    };
    const selectTool = (type) => {
        const { useTool } = stores.editor;
        stores.editor.setUseTool(useTool === type ? null : type);
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
                {toolList.map(item => {
                    let icon;
                    if (item.includes('Fill')) {
                        const type = item.replace('Fill', '');
                        const Icons = icons[type];
                        icon = <Icons size={16} fill='currentColor' />;
                    } else {
                        const Icons = icons[item];
                        icon = <Icons name={item} size={16} />;
                    }
                    return (
                        <Button
                            key={item}
                            type='text'
                            shape='circle'
                            icon={icon}
                            className={stores.editor.useTool === item && 'text-[#1677ff] bg-sky-100/50 hover:bg-sky-100 hover:text-[#1677ff]'}
                            onClick={() => selectTool(item)}
                        ></Button>
                    )
                })}
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
                    value={stores.editor.annotateColor}
                    onChange={(e) => stores.editor.setAnnotateColor(e.toHexString())}
                />
                <WidthDropdown defaultValue={stores.editor.strokeWidth} onChange={(e) => stores.editor.setStrokeWidth(e)} />
            </div>
        </div>
    );
});
