import { useState } from 'react';
import { Button, Popover } from 'antd';
import Icon from '@components/Icon';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

export default ({disabled = false, toSelect, locale='en'}) => {
    const [open, setOpen] = useState(false);
    const hide = () => {
        setOpen(false);
    };
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };
    const onEmojiSelect = (e) => {
        toSelect(e.native);
        hide();
    }
    return (
        <Popover
        content={<Picker data={data} locale={locale} onEmojiSelect={onEmojiSelect} previewPosition='none' />}
        title=""
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
        >
            <Button
                type="text"
                shape="circle"
                disabled={disabled}
                icon={<Icon.Smile size={16} />}
            ></Button>
        </Popover>
    )
}