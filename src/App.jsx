import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
import Icon from '@components/Icon';

export default observer(() => {
  return (
    <>
      <div className="polka flex flex-col overflow-hidden antialiased w-full h-[100vh]">
        {/* header */}
        <div className="flex flex-col md:flex-row md:justify-between items-center shrink-0 gap-1 bg-white py-2 px-5 border-b border-b-gray-50 shadow-sm relative z-[11]">
          <div className="flex flex-1 gap-1 justify-center items-center">
              <Button
                type="text"
                shape="circle"
                icon={<Icon.Square size={16} />}
              ></Button>
              <Button
                type="text"
                shape="circle"
                icon={<Icon.Square size={16} fill="currentColor" />}
              ></Button>
              <Button
                type="text"
                shape="circle"
                icon={<Icon.Circle size={16} />}
              ></Button>
              <Button
                type="text"
                shape="circle"
                icon={<Icon.Slash size={16} />}
              ></Button>
              <Button
                type="text"
                shape="circle"
                icon={<Icon.MoveDownLeft size={16} />}
              ></Button>
              <Button
                type="text"
                shape="circle"
                icon={<Icon.Pencil size={16} />}
              ></Button>
              <Button
                type="text"
                shape="circle"
                icon={<Icon.Smile size={16} />}
              ></Button>
          </div>
        </div>
      </div>
    </>
  )
});