import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import Icon from '@components/Icon';
import { Button, Popover } from 'antd';
import { cn } from '@utils/utils';
import stores from '@stores';

const cols = ['top-left', 'top', 'top-right', 'left', 'center', 'right', 'bottom-left', 'bottom', 'bottom-right'];

export default observer(() => {
    const [open, setOpen] = useState(false);
    const hide = () => {
        setOpen(false);
    };
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };
    const handleSelect = (value) => {
        stores.option.setAlign(value);
    }
    const content = (
        <div className={cn("flex flex-wrap w-24 position-block", stores.option.align)}>
            {cols.map(item => (
                <div key={item} className="w-8 h-8 border border-[var(--c-br)] rounded-sm hover:bg-[var(--c-wb)] cursor-pointer" onClick={() => handleSelect(item)}></div>
            ))}
        </div>
    )
    return (
        <Popover
            content={content}
            trigger='click'
            arrow={false}
            placement="bottomRight"
            overlayClassName={cn("shoteasy-components", stores.editor.isDark && 'dark-mode')}
            open={open}
            onOpenChange={handleOpenChange}
        >
            <Button
                type='text'
                shape='circle'
                className={cn(open && "shadow-md")}
                icon={<Icon.LayoutGrid size={18} />}
            ></Button>
        </Popover>
    )
})