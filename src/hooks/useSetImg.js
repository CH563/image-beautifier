import { getImage, getMargin } from '@utils/utils';

export default (stores) => {
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
            const margin = getMargin(width, height);
            stores.option.setFrameSize(width + margin, height + margin);
        }
    }
    return getFile;
}