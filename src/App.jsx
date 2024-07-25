import { useEffect } from 'react';
import { message } from 'antd';
import { observer } from 'mobx-react-lite';
import Header from '@components/header/Header';
import Editor from '@components/editor/Editor';
import SideBar from '@components/sideBar/SideBar';
import Init from '@components/init/Init';
import stores from '@stores';

export default observer(() => {
  const workplace = stores.editor.img?.src ? <Editor /> : <Init />
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    stores.editor.setMessage(messageApi);
  }, [messageApi]);
  return (
    <>
      {contextHolder}
      <div className="polka flex flex-col overflow-hidden antialiased w-full h-[100vh]">
        <Header />
        <div className="flex flex-col flex-1 h-0 md:flex-row md:items-stretch">
          {workplace}
          <SideBar />
        </div>
      </div>
    </>
  )
});