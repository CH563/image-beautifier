import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import Icon from '@components/Icon';
import { Button, Tooltip, Popover, Segmented, ConfigProvider } from 'antd';
import stores from '@stores';

export default observer(() => {
    const [open, setOpen] = useState(false);
    const [format, setFormat] = useState('PNG');
    const [ratio, setRatio] = useState(1);
    const hide = () => {
        setOpen(false);
    };
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };
    const content = (<div>
        <div className="p-2 [&_.ant-segmented]:w-full [&_.ant-segmented-item]:w-[33%]">
            <div className="text-xs text-gray-400 mb-2">Format</div>
            <Segmented
                options={['JPG', 'PNG', 'WEBP']}
                size="middle"
                onChange={setFormat}
            />
            <div className="text-xs text-gray-400 mt-2 mb-2">Pixel Ratio</div>
            <Segmented
                options={[{value: 1, icon: '1x'},{value: 2, icon: '2x'},{value: 3, icon: '3x'}]}
                size="middle"
                onChange={setRatio}
            />
            {stores.option.frameConf.width &&
                <div className="text-xs p-3 mt-4 flex justify-between bg-black/5 rounded-md">
                    <span className="text-gray-400">Download Size</span>
                    <span className="text-gray-700">{stores.option.frameConf.width * ratio} x {stores.option.frameConf.height * ratio}</span>
                </div>
            }
        </div>
    </div>)
    return (
        <div className='shrink-0 py-4 px-8 flex gap-4 justify-center items-center'>
            <ConfigProvider
                theme={{
                    components: {
                        Button: {
                            colorPrimary: '#000',
                            algorithm: true, // 启用算法
                        },
                    },
                }}
            >
                <div className='ant-space-compact flex flex-1'>
                    <Tooltip placement='top' title={<span>Download</span>}>
                        <Button
                            type='primary'
                            size='large'
                            icon={<Icon.ImageDown size={18} />}
                            className='rounded-se-none flex-1 rounded-ee-none me-[-1px] hover:z-[1] border-r-white/30'
                        >
                            <div className='leading-4 px-2'>
                                <div className='text-sm leading-4 font-semibold'>
                                    Download
                                </div>
                                <div className='text-xs'>{ratio}x as {format}</div>
                            </div>
                        </Button>
                    </Tooltip>
                    <Tooltip placement='top' title={<span>Copy</span>}>
                        <Button
                            type='primary'
                            size='large'
                            icon={<Icon.Copy size={18} />}
                            className='rounded-ss-none rounded-es-none border-l-white/30'
                        />
                    </Tooltip>
                </div>
            </ConfigProvider>
            <Popover
                content={content}
                trigger='click'
                arrow={false}
                placement="topRight"
                open={open}
                overlayStyle={{
                    width: '320px',
                }}
                onOpenChange={handleOpenChange}
            >
                <Button size='large' icon={<Icon.Settings2 size={18} />} />
            </Popover>
        </div>
    );
});
