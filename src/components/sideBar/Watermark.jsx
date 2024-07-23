import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Icon from '@components/Icon';
import { Radio, ColorPicker, Switch, Input } from 'antd';
import stores from '@stores';
import { text2Svg } from '@utils/utils';

export default observer(() => {
    const [useWater, setUseWater] = useState(false);
    const [waterCont, setWaterCont] = useState('ShotEasy');
    const [waterColor, setWaterColor] = useState('#00000030');
    const [direction, setDirection] = useState(45);
    const handleColorChange = (color) => {
        setWaterColor(typeof color === 'string' ? color : color.toRgbString());
    };
    useEffect(() => {
        if (useWater && waterCont.trim()) {
            const svgImg = text2Svg({
                text: waterCont,
                color: waterColor,
                angleDegrees: direction
            });
            stores.option.setWaterImg(svgImg);
        } else {
            stores.option.setWaterImg(null);
        }
    }, [useWater, waterCont, waterColor, direction]);
    return (
        <>
            <div className="[&_label]:font-semibold [&_label]:text-sm flex gap-4 items-center justify-between">
                <label>Watermark</label>
                <Switch defaultChecked={useWater} onChange={setUseWater} size="small" className="bg-slate-200" />
            </div>
            {useWater &&
                <div className="[&_label]:font-semibold [&_label]:text-xs grid gap-3 pl-2">
                    <Input defaultValue={waterCont} placeholder="Watermark content" onChange={(e) => setWaterCont(e.target.value)} />
                    <div className="flex items-center justify-between">
                        <label>Color</label>
                        <ColorPicker value={waterColor} onChange={handleColorChange} size="small" />
                    </div>
                    <div className="flex items-center justify-between">
                        <label>Direction</label>
                        <div>
                            <Radio.Group defaultValue={direction} onChange={(e) => setDirection(e.target.value)} size="small">
                                <Radio.Button value={-45}><Icon.ArrowUpRight size={16} className="mt-[3px]" /></Radio.Button>
                                <Radio.Button value={45}><Icon.ArrowDownRight size={16} className="mt-[3px]" /></Radio.Button>
                            </Radio.Group>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <label>Only Background</label>
                        <Switch size="small" onChange={(checked) => stores.option.setWaterIndex(checked ? -1 : 1)} className="bg-slate-200" />
                    </div>
                </div>
            }
        </>
    )
});