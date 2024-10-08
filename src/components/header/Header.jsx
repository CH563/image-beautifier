import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Divider, Tooltip } from 'antd';
import { icons } from 'lucide-react';
import Icon from '@components/Icon';
import ColorPicker from '@components/ColorPicker';
import { WidthDropdown } from '@components/header/WidthDropdown'
import { nanoid } from '@utils/utils';
import stores from '@stores';
import EmojiSelect from './EmojiSelect';
import Logo from './Logo';
import MediaLogo from './MediaLogo';

const toolList = ['Square', 'SquareFill', 'Circle', 'Slash', 'MoveDownLeft', 'Pencil', 'Magnifier', 'Step', 'Smile'];

export default observer(({headLeft, headRight}) => {
    const [isMove, setIsMove] = useState(false);
    // const handleUndo = () => {
    //     stores.editor.createSnap();
    // };
    const selectTool = (type) => {
        if (!stores.editor.isEditing) return;
        const { useTool } = stores.editor;
        stores.editor.setUseTool(useTool === type ? null : type);
        setIsMove(false);
        if (type === 'Magnifier') stores.editor.createSnap('init');
    }
    const handleSelectEmoji = (emoji) => {
        if (!stores.editor.isEditing) return;
        const x = stores.option.frameConf.width / 2 - 24;
        const y = stores.option.frameConf.height / 2 - 24;
        stores.editor.setUseTool(null);
        setIsMove(false);
        stores.editor.addShape({
            id: nanoid(),
            type: 'emoji',
            text: emoji,
            zIndex: stores.editor.shapes.size + 1,
            x,
            y,
            editable: true
        });
    }
    const toggleMove = () => {
        if (!stores.editor.isEditing) return;
        const is = !isMove;
        stores.editor.setUseTool(null);
        setIsMove(is);
        stores.editor.app.config.move.drag = is;
    }
    const handleSetTheme = () => {
        stores.editor.setTheme()
        localStorage.setItem('SHOTEASY_BEAUTIFIER_THEME', stores.editor.theme);
    }
    return (
        <div className='flex items-center justify-center shrink-0 gap-3 bg-white dark:bg-black py-2 px-5 border-b border-b-gray-50 dark:border-b-gray-700 shadow-sm relative z-[11] select-none'>
            <div className="flex-1">
                {headLeft ? headLeft : <Logo />}
            </div>
            {/* Todo */}
            {/* <div className='flex gap-1 justify-center items-center'>
                <Tooltip placement='bottom' arrow={false} title='Undo'>
                    <Button
                        type='text'
                        shape='circle'
                        icon={<Icon.Undo size={16} />}
                        onClick={handleUndo}
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
            <Divider type='vertical' /> */}
            <div className='flex gap-1 justify-center items-center'>
                {toolList.map(item => {
                    if (item === 'Smile') return (<EmojiSelect key={item} disabled={false} theme={stores.editor.isDark?'dark':'light'} toSelect={handleSelectEmoji} />);
                    let icon;
                    if (item.includes('Fill')) {
                        const type = item.replace('Fill', '');
                        const Icons = icons[type];
                        icon = <Icons size={16} fill='currentColor' />;
                    } else if (item === 'Magnifier') {
                        icon = <Icon.MessageCirclePlus size={16} />;
                    } else if (item === 'Step') {
                        icon = <div key={item} className="border text-xs border-black dark:border-white w-4 h-4 rounded-full text-center leading-4">{stores.editor.nextStep}</div>;
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
                            className={stores.editor.useTool === item && 'text-[#1a79ff] [&_.border]:border-[#1a79ff] bg-sky-100/50 hover:bg-sky-100 hover:text-[#1a79ff] [&_.border]:hover:text-[#1a79ff]'}
                            onClick={() => selectTool(item)}
                        />
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
                <Button
                    type="text"
                    shape='circle'
                    className={isMove && 'text-[#1677ff] bg-sky-100/50 hover:bg-sky-100 hover:text-[#1677ff]'}
                    icon={<Icon.Hand size={16} />}
                    onClick={toggleMove}
                />
            </div>
            {/* <Divider type='vertical' /> */}
            {headRight ? headRight :
                <MediaLogo>
                    <Button
                        type="text"
                        shape='circle'
                        icon={stores.editor.isDark ? <Icon.Moon size={16} /> : <Icon.Sun size={16} />}
                        onClick={handleSetTheme}
                    ></Button>
                </MediaLogo>
            }
        </div>
    );
});
