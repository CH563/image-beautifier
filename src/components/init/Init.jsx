import { observer } from 'mobx-react-lite';
import Icon from '@components/Icon';
import { Upload, Button, Tooltip } from 'antd';
import { supportImg, getImage } from '@utils/utils';
import stores from '@stores';
import usePaste from '@hooks/usePaste';

const { Dragger } = Upload;

export default observer(() => {
    const getFile = async (file) => {
        const imgUrl = window.URL.createObjectURL(file);
        const image = await getImage(imgUrl)
        stores.editor.setImg({
            src: imgUrl,
            width: image.width,
            height: image.height,
            type: file.type,
            name: file.name
        });
        if (stores.option.size.type === 'auto') {
            const margin = image.width * 0.1;
            stores.option.setFrameSize(image.width + margin, image.height + margin);
        }
    }
    const beforeUpload = async (file) => {
        await getFile(file);
        return Promise.reject();
    }
    usePaste((file) => {
        getFile(file);
    });
    return (
        <div className='md:w-0 md:flex-1 flex flex-col justify-center items-center overflow-hidden select-none relative'>
            <div className="max-w-[600px]">
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
                    <Tooltip placement='top' arrow={false} title='Take a screenshot'>
                        <Button shape="round" type="default" size="large" icon={<Icon.Camera size={20} />} />
                    </Tooltip>
                    <Tooltip placement='top' arrow={false} title='Beautify text'>
                        <Button shape="round" type="default" size="large" icon={<Icon.Type size={20} />} />
                    </Tooltip>
                    <Tooltip placement='top' arrow={false} title='Beautify Code'>
                        <Button shape="round" type="default" size="large" icon={<Icon.CodeXml size={20} />} />
                    </Tooltip>
                    <Tooltip placement='top' arrow={false} title='Create gif animate'>
                        <Button shape="round" type="default" size="large" icon={<Icon.ImagePlay size={20} />} />
                    </Tooltip>
                </div>
            </div>
        </div>
    )
});