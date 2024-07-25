import { ColorPicker, Button } from 'antd';
import { TinyColor } from '@ctrl/tinycolor';
import Icon from '@components/Icon';

export default (props) => {
    const useDropper = () => {
        if (!window.EyeDropper) return;
        const eyeDropper = new EyeDropper();
        eyeDropper.open().then((result) => {
            const color = result.sRGBHex;
            props?.onChange && props.onChange(new TinyColor(color));
        }).catch((e) => {
            console.log(e);
        });
    }
    return <ColorPicker
        {...props}
        panelRender={(panel) => (
            <>
                {window.EyeDropper && <div className="mb-1">
                    <Button type="text" shape="circle" size="small" icon={<Icon.Pipette size={16} />} onClick={useDropper} />
                </div>}
                {panel}
            </>
        )}
    />
};