import { observer } from 'mobx-react-lite';
import Icon from '@components/Icon';
import { Upload, Button, Tooltip } from 'antd';
import { supportImg, getImage, cn } from '@utils/utils';
import stores from '@stores';
import usePaste from '@hooks/usePaste';
import { captureScreen } from '@utils/captureScreen';

const { Dragger } = Upload;

export default observer(() => {
    const getFile = async (file, type = 'blob') => {
        const DOMURL = window.URL || window.webkitURL || window;
        const imgUrl = type === 'blob' ? DOMURL.createObjectURL(file) : file;
        const image = await getImage(imgUrl);
        const width = Math.round(image.width);
        const height = Math.round(image.height);
        stores.editor.setImg({
            src: imgUrl,
            width,
            height,
            type: type === 'blob' ? file.type : 'image/png',
            name: type === 'blob' ? file.name : 'ShotEasy.png'
        });
        if (stores.option.size.type === 'auto') {
            const margin = Math.round(width * 0.2);
            stores.option.setFrameSize(width + margin, height + margin);
        }
    }
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
                    rootClassName="p-4 rounded-md bg-white block shadow-sm"
                >
                    <div className="text-center p-10">
                        <p className="text-2xl my-2 opacity-60"><Icon.ImagePlus className="mx-auto" size={36} /></p>
                        <p className="text-sm px-4">Click or Drag image to this area<br/>or Paste image</p>
                    </div>
                </Dragger>
                <div className="flex justify-between mt-4 py-4 px-6 rounded-md bg-white shadow-sm">
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
            </div>
        </div>
    )
});