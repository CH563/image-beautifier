export const captureScreen = async () => {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        const video = document.createElement('video');
        video.srcObject = mediaStream;
        video.play();

        // 等待视频帧稳定
        await new Promise((resolve) => (video.onplaying = resolve));

        // 创建canvas并绘制当前视频帧
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0);

        // 获取屏幕截图
        const screenshot = canvas.toDataURL('image/png');

        // 停止媒体流
        video.srcObject.getTracks().forEach((track) => track.stop());

        return screenshot;
    } catch (err) {
        console.log('Error capturing screen:', err);
    }
};