# 截图美化工具

![preview](https://github.com/CH563/image-beautifier/blob/main/preview.png)

预览地址：[https://screenshot.shoteasy.fun/](https://screenshot.shoteasy.fun/)

## 安装

```bash
npm install image-beautifier
```

## 例子

React 组件

```jsx
import { ImageBeautifier } from 'image-beautifier';
import 'image-beautifier/lib/style.css';

function App() {
  return (<ImageBeautifier />);
}
```

- 用于截图美化
- 图片批注
- 修改尺寸，预设各个社媒平台发布的尺寸模板
- 方框，圆圈，箭头，Emoji表情等各种尺寸的批注
- 添加水印


TODO:

- Redo / Undo 步骤记录
- 设备套壳（macbook/iphone等）
- 接入Unsplash背景图
- 文字卡片
- 代码美化卡片
- GIF动画

将使用于谷歌截图插件： [ShotEasy](https://chromewebstore.google.com/detail/nmppkehciohcgcehlnifgeokgioidknh)

使用框架

[LeaferJs](https://github.com/leaferjs/ui)

