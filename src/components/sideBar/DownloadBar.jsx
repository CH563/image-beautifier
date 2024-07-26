import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import Icon from '@components/Icon';
import { Button, Tooltip, Popover, Segmented, ConfigProvider, Popconfirm } from 'antd';
import stores from '@stores';
import { toDownloadFile, nanoid, modKey } from '@utils/utils';
import useKeyboardShortcuts from '@hooks/useKeyboardShortcuts';

export default observer(() => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [format, setFormat] = useState('png');
    const [ratio, setRatio] = useState(1);
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };
    const toDownload = async () => {
        if (!stores.editor.isEditing) return;
        if (loading) return;
        const option = {
            pixelRatio: ratio
        };
        if (['jpg', 'webp'].includes(format)) {
            option.quality = 0.9;
            option.fill = '#ffffff';
        }
        const key = nanoid();
        setLoading(true);
        stores.editor.message.open({
            key,
            type: 'loading',
            content: 'Downloading...',
        });
        await stores.editor.app.tree.export(format, option).then(result => {
            let name = `ShotEasy`;
            if (ratio > 1) name += `@${ ratio }`;
            toDownloadFile(result.data, `${ name }.${ format }`);
            stores.editor.message.open({
                key,
                type: 'success',
                content: 'Download Success!',
            });
        }).catch(() => {
            stores.editor.message.open({
                key,
                type: 'error',
                content: 'Download failed!',
            });
        })
        setLoading(false);
    };
    const toCopy = async () => {
        if (!stores.editor.isEditing) return;
        if (loading) return;
        const key = nanoid();
        setLoading(true);
        stores.editor.message.open({
            key,
            type: 'loading',
            content: 'Copying...',
        });
        await stores.editor.app.tree.export('png', { blob: true, pixelRatio: ratio }).then(async result => {
            const { data } = result;
            await navigator.clipboard.write([
                new ClipboardItem({
                    [data.type]: data,
                }),
            ]);
            stores.editor.message.open({
                key,
                type: 'success',
                content: 'Copy Success!',
            });
        }).catch(() => {
            stores.editor.message.open({
                key,
                type: 'error',
                content: 'Copy failed!',
            });
        });
        setLoading(false);
    }
    const confirm = () => {
        stores.editor.clearImg();
    }
    useKeyboardShortcuts(() => toDownload(), () => toCopy(), [toDownload, toCopy]);
    const content = (<div>
        <div className="p-2 [&_.ant-segmented]:w-full [&_.ant-segmented-item]:w-[33%]">
            <div className="text-xs text-gray-400 mb-2">Format</div>
            <Segmented
                options={['png', 'jpg' , 'webp']}
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
        <div className='shrink-0 py-4 px-6 flex gap-2 justify-center items-center'>
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
                    <Tooltip placement='top' title={<span>Download {modKey} + S</span>}>
                        <Button
                            type='primary'
                            size='large'
                            loading={loading}
                            icon={<Icon.ImageDown size={18} />}
                            className='rounded-se-none flex-1 rounded-ee-none me-[-1px] hover:z-[1] border-r-white/30'
                            onClick={toDownload}
                        >
                            <div className='leading-4 px-2'>
                                <div className='text-sm leading-4 font-semibold'>
                                    Download
                                </div>
                                <div className='text-xs'>{ratio}x as {format.toLocaleUpperCase()}</div>
                            </div>
                        </Button>
                    </Tooltip>
                    <Tooltip placement='top' title={<span>Copy {modKey} + C</span>}>
                        <Button
                            type='primary'
                            size='large'
                            icon={<Icon.Copy size={18} />}
                            loading={loading}
                            className='rounded-ss-none rounded-es-none border-l-white/30'
                            onClick={toCopy}
                        />
                    </Tooltip>
                </div>
            </ConfigProvider>
            <div className="flex items-center gap-1">
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
                {stores.editor.img?.src && 
                    <Popconfirm
                        title="Delete the screenshot"
                        description="Are you sure to delete this screenshot?"
                        onConfirm={confirm}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button size='large' icon={<Icon.Trash2 size={18} />} />
                    </Popconfirm>
                }
            </div>
        </div>
    );
});
