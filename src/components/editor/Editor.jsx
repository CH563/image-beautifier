import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import View from './View';
import Zoom from './Zoom';

export default observer(() => {
    const [target, setTarget] = useState(null);

    return (
        <div className='md:w-0 md:flex-1 overflow-hidden select-none relative'>
            <div className="w-full h-full relative z-0" ref={
                (node) => setTarget(node)
            }>
                {target && <View target={target} />}
            </div>
            <Zoom />
        </div>
    );
});
