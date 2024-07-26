import { Radio } from 'antd';
import backgroundConfig from '@utils/backgroundConfig';
import { cn } from '@utils/utils';

const isImg = ['cosmic', 'desktop'];

export const BackgroundSelect = ({ type, options, onChange, value }) => {
    let lists = [];
    if (options && options.length) {
        lists = options;
    } else {
        const arr = [];
        Object.keys(backgroundConfig).map((key) => {
            if (key.includes(type)) {
                arr.push({
                    key,
                    value: backgroundConfig[key],
                });
            }
        });
        lists = arr;
    }
    return (
        <Radio.Group
            onChange={(e) => onChange(e.target.value)}
            value={value}
            rootClassName={cn(
                'grid [&_span]:ps-0',
                isImg.includes(type) ? 'grid-cols-5 gap-y-1.5' : 'grid-cols-7 gap-y-3'
            )}
        >
            {lists.map((item, index) => (
                <Radio
                    key={index}
                    className='[&_.ant-radio]:hidden [&_span]:p-0 mr-0'
                    value={item.key}
                >
                    {isImg.includes(type) ? (
                        <div className={cn('w-12 h-8 rounded-md overflow-hidden')}>
                            <img src={`${item.value.class}&w=48`} className='w-full h-full object-cover object-center' />
                        </div>
                    ) : (
                        <div className={cn('w-8 h-8 rounded-full overflow-hidden', item.value.class)}></div>
                    )}
                </Radio>
            ))}
        </Radio.Group>
    );
};
