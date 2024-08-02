import { Button, Drawer } from 'antd';
import { observer } from 'mobx-react-lite';
import Icon from '@components/Icon';
import ColorPicker from '@components/ColorPicker';
import stores from '@stores';
import colorSvg from '@assets/color.svg';
import { BackgroundSelect } from './BackgroundSelect';

export default observer(({ showMore, onChange }) => {
    const onMoreClose = () => {
        onChange(false);
    }
    const handleCustom = (e) => {
        const color = e.toHexString();
        stores.option.frameConf.background = {
            type: 'solid',
            color
        }
    }
    const onSelectChange = (key) => {
        stores.option.setBackground(key);
    }
    return (
        <Drawer
            title=""
            placement="right"
            closable={false}
            mask={false}
            onClose={onMoreClose}
            open={showMore}
            getContainer={false}
            width="100%"
            className="[&_.ant-drawer-body]:p-0"
        >
            <div className="flex flex-col gap-2 h-full overflow-hidden">
                <div className="shrink-0 pt-4 px-4">
                    <Button
                        type="text"
                        size="small"
                        className="text-xs flex items-center opacity-80 m-0"
                        icon={<Icon.ChevronRight size={16} />}
                        iconPosition="end"
                        onClick={() => onChange(false)}
                    >Back</Button>
                </div>
                <div className="h-0 flex-1 overflow-y-auto px-4 py-2">
                    <h4 className="text-sm font-bold py-2">Custom</h4>
                    <div className="py-1">
                        <ColorPicker onChange={handleCustom}>
                            <Button type="default" size="small" shape="circle" icon={<img src={colorSvg} width={18} />} />
                        </ColorPicker>
                    </div>
                    <h4 className="text-sm font-bold py-2">Solid Colors</h4>
                    <BackgroundSelect type="solid" onChange={onSelectChange} value={stores.option.background} />
                    <h4 className="text-sm font-bold py-2">Gradients</h4>
                    <BackgroundSelect type="gradient" onChange={onSelectChange} value={stores.option.background} />
                    <h4 className="text-sm font-bold py-2">Cosmic Gradients</h4>
                    <BackgroundSelect type="cosmic" onChange={onSelectChange} value={stores.option.background} />
                    <h4 className="text-sm font-bold py-2">Desktop</h4>
                    <BackgroundSelect type="desktop" onChange={onSelectChange} value={stores.option.background} />
                </div>
            </div>
        </Drawer>
    )
});
