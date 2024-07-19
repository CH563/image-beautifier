import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import Icon from '@components/Icon';
import { Button, Slider, Radio, ColorPicker } from 'antd';
import stores from '@stores';
import backgroundConfig from '@utils/backgroundConfig';
import { cn } from '@utils/utils';


export default observer(() => {
    const [showMore, setShowMore] = useState(false);
    const onBgChange = (e) => {
        const key = e.target.value;
        stores.option.setBackground(key);
    }
    return (
        <div className="bg-white flex flex-col gap-2 p-4 md:w-[340px] border-l border-l-gray-50 shadow-lg relative z-10 select-none">
            <div className="[&_label]:font-semibold [&_label]:text-sm">
                <label>Quick</label>
                <div className="flex gap-4 items-center py-2">
                    <Button
                        type='text'
                        shape='circle'
                        icon={<Icon.Crop size={18} />}
                    ></Button>
                    <Button
                        type='text'
                        shape='circle'
                        icon={<Icon.FlipHorizontal2 size={18} />}
                    ></Button>
                    <Button
                        type='text'
                        shape='circle'
                        icon={<Icon.FlipVertical2 size={18} />}
                    ></Button>
                    <Button
                        type='text'
                        shape='circle'
                        icon={<Icon.Sunset size={18} />}
                    ></Button>
                </div>
            </div>
            <div className="[&_label]:font-semibold [&_label]:text-sm">
                <label>Scale</label>
                <Slider
                    min={0.1}
                    max={2}
                    step={0.1}
                    onChange={(e) => stores.option.setScale(e)}
                    value={typeof stores.option.scale === 'number' ? stores.option.scale : 1}
                />
            </div>
            <div className="[&_label]:font-semibold [&_label]:text-sm">
                <div className="flex justify-between">
                    <label>Padding</label>
                    <ColorPicker value={stores.option.paddingBg} onChange={(e) => stores.option.setPaddingBg(e.toRgbString())} size="small" />
                </div>
                <Slider
                    min={0}
                    max={60}
                    onChange={(e) => stores.option.setPadding(e)}
                    value={typeof stores.option.padding === 'number' ? stores.option.padding : 0}
                />
            </div>
            <div className="[&_label]:font-semibold [&_label]:text-sm">
                <label>Rounded</label>
                <Slider
                    min={0}
                    max={20}
                    onChange={(e) => stores.option.setRound(e)}
                    value={typeof stores.option.round === 'number' ? stores.option.round : 0}
                />
            </div>
            <div className="[&_label]:font-semibold [&_label]:text-sm">
                <label>Shadow</label>
                <Slider
                    min={0}
                    max={6}
                    onChange={(e) => stores.option.setShadow(e)}
                    value={typeof stores.option.shadow === 'number' ? stores.option.shadow : 0}
                />
            </div>
            <div className="[&_label]:font-semibold [&_label]:text-sm">
                <div className="flex justify-between items-center">
                    <label>Background</label>
                    <Button
                        type="text"
                        size="small"
                        className="text-xs flex items-center opacity-80 m-0"
                        onClick={() => setShowMore(true)}
                    >More <Icon.ChevronRight size={16} /></Button>
                </div>
                <div className="py-3">
                    <Radio.Group
                        onChange={onBgChange} value={stores.option.background}
                        rootClassName="grid grid-cols-7 [&_span]:ps-0"
                    >
                        <Radio className="[&_.ant-radio]:hidden [&_span]:p-0 mr-0" value='default_1'>
                            <div className={cn("w-8 h-8 rounded-full", backgroundConfig.default_1.class)}></div>
                        </Radio>
                        {Object.keys(backgroundConfig).map((key, index) => {
                            if (key.includes('default') && key !== 'default_1') return (
                                <Radio key={key} className="[&_.ant-radio]:hidden [&_span]:p-0 mr-0" value={key}>
                                    <div className={cn("w-8 h-8 rounded-full", backgroundConfig[key].class)}></div>
                                </Radio>
                            )
                        })}
                    </Radio.Group>
                </div>
            </div>
        </div>
    )
});