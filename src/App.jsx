import { observer } from 'mobx-react-lite';
import Header from '@components/header/Header';
import Editor from '@components/editor/Editor';
import SideBar from '@components/sideBar/SideBar';

export default observer(() => {
  return (
    <>
      <div className="polka flex flex-col overflow-hidden antialiased w-full h-[100vh]">
        <Header />
        <div className="flex flex-col flex-1 h-0 md:flex-row md:items-stretch">
          <Editor />
          <SideBar />
        </div>
      </div>
    </>
  )
});