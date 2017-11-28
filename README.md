# Mung

### 2017-11-28 修改了ios的状态栏问题，和ios单机反馈，ios版添加图片下载到相册，Android端暂时不加

------------------------end----------------------------

### 1. Mung：是一个基于React-Native编写，使用豆瓣开源API开发的一个项目。

![image](https://github.com/mochixuan/Mung/blob/master/Ui/ui/ic_launcher.png?raw=true)

-------------------

### 2. 功能概述

- **数据保存** ：支持断网加载缓存数据。
- **主题换肤** ：现在只支持切换主题颜色，本项目没几张图片。
- **查看电影详情** ：支持查看电影详情包括评论。
- **一键搜索**： 支持标签和语句查找相关的电影。

-------------------

### 3. 运行结果图

![image](https://github.com/mochixuan/Mung/blob/master/Ui/ppt/icon_ppt1.png?raw=true)
![image](https://github.com/mochixuan/Mung/blob/master/Ui/ppt/icon_ppt2.png?raw=true)

-------------------

### 4. 使用到的框架

- **react-native-linear-gradient** ：实现渐变背景
- **react-native-root-toast** ：实现兼容Android和IOS的提出提示
- **react-native-splash-screen** ：实现用优雅的方式解决白屏
- **react-native-star-rating** ：实现评分等级
- **react-native-swiper** ：实现Banner功能
- **realm** : 实现数据存储和版本控制

-------------------

### 5. 优缺点

* 最初想这个项目的时候是想找一个开源的、资源多的、免费的API，实现一个功能比较多的React-Native项目，当在网上找了很久没有找到满意的最后选择了豆瓣Api毕竟开源。
* 项目几乎全部使用纯原生的React-Native，只有上面一些UI框架是使用开源的，本项目比较适合于刚学完基础，项目没有使用Redux等框架去管理状态。
* 由于前期写的比较慢，第一个界面搞电影卡片的设计搞的时间比较久，一直纠结怎样布局好看点，和颜色的选择，还有对网络那块的封装，所以写了很久才写了这点功能，Api资源开发的也比较少，很多都需要商务权限和登入，所以功能比较少。
* 图片浏览那块图片无法实现手指拉大和缩小，找了一些框架，实现后效果不错，但左右滑时会出现无法滑动问题所以暂时放弃了。
* 如果有资源的话，后期有时间加上新闻和音乐模块。
* 由于没有Mac所以没有编译IOS版，但代码都是兼容两个移动端的，里面的所以三方和原生的框架都是选用了兼容双平台的框架，有时间会安装一个黑苹果，如果成功，后期编译出IOS版。

-------------------

### 6. [Android下载安装Mung](https://fir.im/gc58)

### 7. 后续有好的Api的话会持续更新

-------------------

### 8.已经完美兼容iOS和Android，iOS模拟器运行成功，由于没有开发者账号无法打包，但项目在iOS模拟器上是成功的。