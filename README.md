# uni-io

## 特性

- [x] 支持 Promise API
- [x] 支持 async/await
- [x] 拦截请求和响应
- [x] 自定义配置请求实例
- [x] 多种 Method 方法请求
- [ ] Typescript 开发
- [ ] 支持 RequestTask 操作

## 安装

### 插件市场

在插件市场右上角选择 `使用HBuilder X 导入插件` 或者 `下载插件ZIP`

### NPM

```bash
# 如果您的项目是HBuilder X创建的，根目录又没有package.json文件的话，请先执行如下命令：
# npm init -y
# 安装
npm install uni-io --save
```

## 实例

新建 `request.js` 文件（文件名可自定义）用于处理拦截器、接口根地址、默认配置等

```js
// request.js
import { createService } from 'uni-io' // 引入 uni-ajax 模块
const service = createService(config) // 创建请求实例
service.interceptors.request.use(onFulfilled, onRejected) // 添加请求拦截器
service.interceptors.response.use(onFulfilled, onRejected) // 添加响应拦截器
export default service // 导出创建后的实例
```

## 使用

### 请求方法

```js
// 常规方法
service.request()
// 请求方法别名
service.get(url, data[, options])
service.post(url, data[, options])
service.put(url, data[, options])
service.delete(url, data[, options])
```

<!--
### RequestTask

```JavaScript
const request = ajax()                  // 请求方法每项皆可
request.abort()                         // 中断请求任务
request.onHeadersReceived(callback)     // 监听 HTTP Response Header 事件
request.offHeadersReceived(callback)    // 取消监听 HTTP Response Header 事件
``` -->
