import { useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import Icon from '@components/Icon';
import { Button, Tooltip, Modal } from 'antd';
import stores from '@stores';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

export default observer(() => {
    const cropperRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCrop = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
            const canvas = cropperRef.current?.cropper.getCroppedCanvas();
            if (canvas) {
                const { width, height } = canvas;
                const imgUrl = canvas.toDataURL();
                stores.editor.setImg(Object.assign({}, stores.editor.img, {
                    src: imgUrl,
                    width,
                    height,
                }));
                if (stores.option.size.type === 'auto') {
                    const margin = width * 0.2;
                    stores.option.setFrameSize(width + margin, height + margin);
                }
            }
        }
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Tooltip title='Crop Image'>
                <Button
                    type='text'
                    shape='circle'
                    icon={<Icon.Crop size={18} />}
                    onClick={handleCrop}
                ></Button>
            </Tooltip>
            <Modal
                title='Cropper'
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                destroyOnClose={true}
            >
                <Cropper
                    ref={cropperRef}
                    style={{ height: 400, width: "100%" }}
                    zoomTo={0.5}
                    initialAspectRatio={stores.editor.img.width / stores.editor.img.height}
                    src={stores.editor.img.src}
                    dragMode="move"
                    viewMode={1}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={false}
                    responsive={true}
                    autoCropArea={1}
                    checkOrientation={false}
                    guides={true}
                />
            </Modal>
        </>
    );
});
