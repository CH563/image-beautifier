import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import Icon from '@components/Icon';
import { Button, Radio, Drawer } from 'antd';
import stores from '@stores';
import { windowDark, windowLight } from '@utils/windowsIcon';

export default observer(() => {
    const [showMore, setShowMore] = useState(false);
    const handelChange = (e) => {
        stores.option.setFrame(e.target.value)
    }
    return (
        <>
            <div className="[&_label]:font-semibold [&_label]:text-sm">
                <div className="flex justify-between items-center">
                    <label>Frame</label>
                    <Button
                        type="text"
                        size="small"
                        className="text-xs flex items-center opacity-80 m-0"
                        onClick={() => setShowMore(true)}
                    >More <Icon.ChevronRight size={16} /></Button>
                </div>
                <div className="py-3 [&_.ant-radio-wrapper_span]:p-0 [&_.ant-radio-wrapper_span]:px-1">
                    <Radio.Group
                        rootClassName="grid grid-cols-5"
                        onChange={handelChange}
                        value={stores.option.frame}
                    >
                        <Radio className="[&_.ant-radio]:hidden [&_span]:mr-0 [&_span]:block [&_span]:w-full" value='none'>
                            <div className="bg-gray-300/30 rounded-md h-8 overflow-hidden">
                                <div className="bg-slate-300/40 h-7 w-[85%] rounded-md shadow-md -mt-1 -ml-1"></div>
                            </div>
                        </Radio>
                        <Radio className="[&_.ant-radio]:hidden [&_span]:mr-0 [&_span]:block [&_span]:w-full" value='light'>
                            <div className="bg-gray-300/30 rounded-md h-8 overflow-hidden">
                                <div className="bg-slate-300/40 border-2 border-white/80 h-7 w-[85%] rounded-md shadow-md -mt-1 -ml-1"></div>
                            </div>
                        </Radio>
                        <Radio className="[&_.ant-radio]:hidden [&_span]:mr-0 [&_span]:block [&_span]:w-full" value='dark'>
                            <div className="bg-gray-300/30 rounded-md h-8 overflow-hidden">
                                <div className="bg-slate-300/40 border-2 border-black/40 h-7 w-[85%] rounded-md shadow-md -mt-1 -ml-1"></div>
                            </div>
                        </Radio>
                        <Radio className="[&_.ant-radio]:hidden [&_span]:mr-0 [&_span]:block [&_span]:w-full" value='macosBarLight'>
                            <div className="bg-gray-300/30 rounded-md h-8 overflow-hidden">
                                <div className="bg-slate-300/40 h-7 w-[85%] rounded-sm shadow-md mt-2 ml-3 overflow-hidden">
                                    <div
                                        className="h-1.5 bg-white/90 px-0.5 flex items-center gap-[1px] before:block before:rounded-full before:w-0.5 before:h-0.5 before:bg-red-500 after:w-0.5 after:h-0.5 after:bg-green-500"
                                    >
                                        <i className="block w-0.5 h-0.5 bg-yellow-500"></i>
                                    </div>
                                </div>
                            </div>
                        </Radio>
                        <Radio className="[&_.ant-radio]:hidden [&_span]:mr-0 [&_span]:block [&_span]:w-full" value='macosBarDark'>
                            <div className="bg-gray-300/30 rounded-md h-8 overflow-hidden">
                                <div className="bg-slate-300/40 h-7 w-[85%] rounded-sm shadow-md mt-2 ml-3 overflow-hidden">
                                    <div
                                        className="h-1.5 bg-black/90 px-0.5 flex items-center gap-[1px] before:block before:rounded-full before:w-0.5 before:h-0.5 before:bg-red-500 after:w-0.5 after:h-0.5 after:bg-green-500"
                                    >
                                        <i className="block w-0.5 h-0.5 bg-yellow-500"></i>
                                    </div>
                                </div>
                            </div>
                        </Radio>
                    </Radio.Group>
                </div>
            </div>
            <Drawer
                title=""
                placement="right"
                closable={false}
                mask={false}
                onClose={setShowMore}
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
                            onClick={() => setShowMore(false)}
                        >Back</Button>
                    </div>
                    <div className="h-0 flex-1 overflow-y-auto px-4 py-2">
                        <h4 className="text-sm font-bold py-2">Browser</h4>
                        <div className="py-3 [&_.ant-radio-wrapper_span]:p-0 [&_.ant-radio-wrapper_span]:px-1">
                            <Radio.Group
                                rootClassName="grid grid-cols-3"
                                onChange={handelChange}
                                value={stores.option.frame}
                            >
                                <Radio className="[&_.ant-radio]:hidden [&_span]:mr-0 [&_span]:block [&_span]:w-full" value='windowsBarLight'>
                                    <div className="bg-gray-300/30 rounded-md h-14 overflow-hidden">
                                        <div className="bg-slate-300/40 h-12 w-[85%] rounded-sm shadow-md mt-2 ml-3 overflow-hidden">
                                            <div className="bg-white/90 px-0.5">
                                                <div className="h-2.5" style={{
                                                backgroundImage: `url(${ windowDark })`,
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'right center',
                                                backgroundSize: 'auto 100%'
                                            }} />
                                            </div>
                                        </div>
                                    </div>
                                </Radio>
                                <Radio className="[&_.ant-radio]:hidden [&_span]:mr-0 [&_span]:block [&_span]:w-full" value='windowsBarDark'>
                                    <div className="bg-gray-300/30 rounded-md h-14 overflow-hidden">
                                        <div className="bg-slate-300/40 h-12 w-[85%] rounded-sm shadow-md mt-2 ml-3 overflow-hidden">
                                            <div className="bg-black/90 px-0.5">
                                                <div className="h-2.5" style={{
                                                    backgroundImage: `url(${ windowLight })`,
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundPosition: 'right center',
                                                    backgroundSize: 'auto 100%'
                                                }} />
                                            </div>
                                        </div>
                                    </div>
                                </Radio>
                            </Radio.Group>
                        </div>
                    </div>
                </div>
            </Drawer>
        </>
    );
});