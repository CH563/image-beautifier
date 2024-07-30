import { message } from 'antd';
import { observer } from 'mobx-react-lite';
import Header from '@components/header/Header';
import Editor from '@components/editor/Editor';
import SideBar from '@components/sideBar/SideBar';
import Init from '@components/init/Init';
import stores from '@stores';
import useSetImg from '@hooks/useSetImg';
import { cn } from '@utils/utils';
import '@style/main.css';

export default observer(({ defaultImg, headLeft, headRight, boxClassName = '' }) => {
  const getFile = useSetImg(stores);
  const workplace = stores.editor.img?.src ? <Editor /> : <Init />
  const [messageApi, contextHolder] = message.useMessage();
  stores.editor.setMessage(messageApi);
  if (defaultImg) getFile(defaultImg, 'dataURL');
  return (
    <>
      {contextHolder}
      <div className={cn("polka flex flex-col overflow-hidden antialiased w-full h-[100vh]", boxClassName)}>
        <Header headLeft={headLeft} headRight={headRight} />
        <div className="flex flex-col flex-1 h-0 md:flex-row md:items-stretch">
          {workplace}
          <SideBar />
        </div>
      </div>
    </>
  )
});