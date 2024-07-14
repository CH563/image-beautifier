import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import View from './View';


export default observer(() => {
    const [target, setTarget] = useState(null);

    return (
        <div className='md:w-0 md:flex-1 overflow-hidden select-none'>
            <div className="w-full h-full" ref={
                (node) => setTarget(node)
            }>
                {target && <View target={target} />}
            </div>
        </div>
    );
});
