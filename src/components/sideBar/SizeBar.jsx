import { useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import Icon from '@components/Icon';
import { Popover, Button } from 'antd';
import stores from '@stores';
import { cn } from '@utils/utils';
import sizeConfig from '@utils/sizeConfig';
import CustomSize from './CustomSize';


export default observer(() => {
    const box = useRef(null);
    const [open, setOpen] = useState(false);
    const [height, setHeight] = useState(500);
    const hide = () => {
        setOpen(false);
    };
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
        if (newOpen && box.current) {
            const { height, y } = box.current.getBoundingClientRect();
            const h = document.body.clientHeight - height - y - 80;
            setHeight(h);
        }
    };
    const checkSelected = (key, item) => {
        if (key !== stores.option.size.type) return false;
        if (item.height !== stores.option.frameConf.height) return false;
        if (item.width !== stores.option.frameConf.width) return false;
        return true;
    }
    const onSet = (value) => {
        hide();
        if (value.type === 'auto' && stores.editor.img.width) {
            const margin = Math.round(stores.editor.img.width * 0.2);
            stores.option.setSize({...value, width: stores.editor.img.width + margin, height: stores.editor.img.height + margin});
            return;
        }
        stores.option.setSize(value);
    };
    const toSelected = (key, title, item) => {
        hide();
        stores.option.setSize({
            type: key,
            title: `${ title }${ item.title ? ` ${item.title} `:' ' }${ item.w } : ${ item.h }`,
            width: item.width,
            height: item.height
        });
    }
    const isShowSize = stores.editor.img?.src || stores.option.size.type !== 'auto';
    const title = <CustomSize type={stores.option.size.type} frameWidth={stores.option.frameConf.width} frameHeight={stores.option.frameConf.height} onSet={onSet} />;
    const content = (
        <div className="border-t border-gray-200 py-2 divide-y">
            {sizeConfig.map(item => (
                <div key={item.key}>
                    {item.key !== 'default' && <div className="font-semibold pt-2">{item.title}</div>}
                    <section className="flex flex-wrap items-end pb-2">
                        {item.lists.map((child, index) => (
                            <Button
                                key={index}
                                type="text"
                                className="flex-[33%] p-3 h-auto flex-col gap-0 disabled:bg-blue-500/5 disabled:border-blue-500 disabled:cursor-default disabled:text-black"
                                disabled={checkSelected(item.key, child)}
                                onClick={() => toSelected(item.key, item.title, child)}>
                                <div className="py-2 px-3 w-full">
                                    <div
                                        className='border border-black/50 bg-black/10 w-full flex items-center justify-center rounded-md opacity-75'
                                        style={{ aspectRatio: child.w / child.h }}
                                    ><span>{child.w} : {child.h}</span></div>
                                </div>
                                {child.title && <div className="text-xs">{child.title}</div>}
                                <div className="text-xs overflow-hidden text-gray-500">{child.width} x {child.height}</div>
                            </Button>
                        ))}
                    </section>
                </div>
            ))}
        </div>
    );
    return (
        <Popover
            content={content}
            title={title}
            trigger='click'
            arrow={false}
            placement="bottomRight"
            open={open}
            overlayClassName="[&_.ant-popover-inner]:h-full [&_.ant-popover-inner]:overflow-x-hidden [&_.ant-popover-inner]:overflow-y-auto [&_.ant-popover-content]:h-full"
            overlayStyle={{
                width: '400px',
                height: `${height}px`
            }}
            onOpenChange={handleOpenChange}
        >
            <div className={cn('px-3 py-1.5 border shrink-0 border-gray-200 gap-3 shadow-sm overflow-hidden max-h-12 rounded-md hover:border-blue-500 [&_svg]:hover:text-blue-500 cursor-pointer flex items-center', open && 'shadow-md')} ref={box}>
                <div
                    className='border border-black/50 bg-black/10 w-4 rounded-sm'
                    style={{ aspectRatio: stores.option.frameConf.width / stores.option.frameConf.height }}
                />
                <div className='text-xs'>
                    <div className='font-semibold leading-3 mb-0.5'>{stores.option.size.title}</div>
                    {!isShowSize ? 
                        <div className='text-gray-500 leading-3'>Adaptive screenshot size</div> :
                        <div className='text-gray-500 leading-3'>
                            {stores.option.frameConf.width} x {stores.option.frameConf.height} px
                        </div>
                    }
                </div>
                <div className='flex-1'></div>
                {open ? <Icon.ChevronUp size={16} /> : <Icon.ChevronDown size={16} />}
            </div>
        </Popover>
    );
});
