import { observer } from 'mobx-react-lite';
import Icon from '@components/Icon';
import { Upload, Button, Tooltip } from 'antd';
import { supportImg, cn } from '@utils/utils';
import stores from '@stores';
import usePaste from '@hooks/usePaste';
import useSetImg from '@hooks/useSetImg';
import { captureScreen } from '@utils/captureScreen';
import demoPng from '@assets/demo.png';

const { Dragger } = Upload;

export default observer(() => {
    const getFile = useSetImg(stores);
    const beforeUpload = async (file) => {
        await getFile(file);
        return Promise.reject();
    }
    const onCapture = async () => {
        const dataURL = await captureScreen();
        if (!dataURL) return;
        getFile(dataURL, 'dataURL');
    }
    const comingSoon = () => {
        stores.editor.message.info('Developing, Coming soon!');
    }
    const handleTry = () => {
        getFile(demoPng, 'dataURL');
    }
    usePaste((file) => {
        getFile(file);
    });
    return (
        <div className='md:w-0 md:flex-1 flex flex-col justify-center items-center overflow-hidden select-none relative'>
            <div className={cn('max-w-[600px]', stores.editor.invalid && 'invalid')}>
                <Dragger
                    accept={supportImg.join(',')}
                    name="file"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    rootClassName="p-4 rounded-md bg-white dark:bg-black dark:text-gray-400 block shadow-sm"
                >
                    <div className="text-center p-10">
                        <p className="text-2xl my-2 opacity-60"><Icon.ImagePlus className="mx-auto" size={36} /></p>
                        <p className="text-sm px-4">Click or Drag image to this area<br/>or Paste image</p>
                    </div>
                </Dragger>
                <div className="flex justify-between mt-2 py-4 px-6 rounded-md bg-white dark:bg-black shadow-sm">
                    <Tooltip placement='top' arrow={false} title='Take a screenshot of desktop windows'>
                        <Button shape="round" type="default" size="large" icon={<Icon.Camera size={20} />} onClick={onCapture} />
                    </Tooltip>
                    <Tooltip placement='top' arrow={false} title='Beautify text'>
                        <Button shape="round" type="default" size="large" icon={<Icon.Type size={20} />} onClick={comingSoon} />
                    </Tooltip>
                    <Tooltip placement='top' arrow={false} title='Beautify Code'>
                        <Button shape="round" type="default" size="large" icon={<Icon.CodeXml size={20} onClick={comingSoon} />} />
                    </Tooltip>
                    <Tooltip placement='top' arrow={false} title='Create gif animate'>
                        <Button shape="round" type="default" size="large" icon={<Icon.ImagePlay size={20} onClick={comingSoon} />} />
                    </Tooltip>
                </div>
                <button className="w-full mt-1 rounded-md bg-white dark:bg-black border border-dotted dark:border-gray-700 shadow-sm flex justify-between items-center p-1 hover:bg-slate-50 dark:hover:bg-gray-900 hover:px-1.5" onClick={handleTry}>
                    <div className="overflow-hidden rounded-sm w-8">
                        <img src={demoPng} className="w-full" />
                    </div>
                    <div className="text-xs text-gray-500">
                        Give it a try ✨
                    </div>
                </button>
            </div>
        </div>
    )
});