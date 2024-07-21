import { useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import Icon from '@components/Icon';
import { Popover, InputNumber, Button } from 'antd';
import stores from '@stores';
import { cn } from '@utils/utils';

const list = [
    {
        width: 1920,
        height: 1080,
        w: 16,
        h: 9
    },
    {
        width: 1920,
        height: 1280,
        w: 3,
        h: 2
    },
    {
        width: 1920,
        height: 1440,
        w: 4,
        h: 3
    },
    {
        width: 1920,
        height: 1536,
        w: 5,
        h: 4
    },
    {
        width: 1920,
        height: 1920,
        w: 1,
        h: 1
    },
    {
        width: 1080,
        height: 1350,
        w: 4,
        h: 5
    },
    {
        width: 1080,
        height: 1440,
        w: 3,
        h: 4
    },
    {
        width: 1080,
        height: 1620,
        w: 2,
        h: 3
    },
    {
        width: 1080,
        height: 1920,
        w: 9,
        h: 16
    }
]

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
    const title = (
        <div className="flex gap-2 items-center py-2 font-normal">
            <InputNumber
                min={1}
                placeholder={stores.option.frameConf.width}
                prefix={<span className="opacity-60 mx-1">W</span>}
                className="flex-1"
            />
            <span className="text-xs opacity-50">x</span>
            <InputNumber
                min={1}
                placeholder={stores.option.frameConf.height}
                prefix={<span className="opacity-60 mx-1">H</span>}
                className="flex-1"
            />
            <Button
                type="primary"
                shape="round"
                icon={<Icon.Check size={18} />}
            ></Button>
        </div>
    );
    const content = (
        <div className="border-t border-gray-200 py-2 divide-y">
            <section className="flex flex-wrap items-end pb-2">
                {list.map((item, index) => (
                    <Button key={index} type="text" className="flex-[33%] p-3 h-auto flex-col gap-0">
                        <div className="py-2 px-3 w-full">
                            <div
                                className='border border-black/50 bg-black/10 w-full flex items-center justify-center rounded-md opacity-75'
                                style={{ aspectRatio: item.w / item.h }}
                            ><span>{item.w} : {item.h}</span></div>
                        </div>
                        <div className="text-xs overflow-hidden text-gray-500">{item.width} x {item.height}</div>
                    </Button>
                ))}
            </section>
            <section className="flex flex-wrap items-end">
                {list.map((item, index) => (
                    <Button key={index} type="text" className="flex-[33%] p-3 h-auto flex-col gap-0">
                        <div className="py-2 px-3 w-full">
                            <div
                                className='border border-black/50 bg-black/10 w-full flex items-center justify-center rounded-md opacity-75'
                                style={{ aspectRatio: item.w / item.h }}
                            ><span>{item.w} : {item.h}</span></div>
                        </div>
                        <div className="text-xs overflow-hidden text-gray-500">{item.width} x {item.height}</div>
                    </Button>
                ))}
            </section>
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
            <div className={cn('px-3 py-1.5 border border-gray-200 gap-3 shadow-sm overflow-hidden max-h-12 rounded-md hover:border-blue-500 [&_svg]:hover:text-blue-500 cursor-pointer flex items-center', open && 'shadow-md')} ref={box}>
                <div
                    className='border border-black/50 bg-black/10 w-4 rounded-sm'
                    style={{ aspectRatio: 800 / 600 }}
                />
                <div className='text-xs'>
                    <div className='font-semibold leading-3 mb-0.5'>Auto</div>
                    <div className='text-gray-500 leading-3'>
                        {stores.option.frameConf.width} x{' '}
                        {stores.option.frameConf.height} px
                    </div>
                </div>
                <div className='flex-1'></div>
                {open ? <Icon.ChevronUp size={16} /> : <Icon.ChevronDown size={16} />}
            </div>
        </Popover>
    );
});
