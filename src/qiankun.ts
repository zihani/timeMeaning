import { registerMicroApps, start } from 'qiankun'; // 导入 qiankun
// 1. 定义微应用列表
const microApps = [
  {
    name: 'hualang-app', // 微应用名称，唯一
    entry: '//localhost:5173', // 开发环境地址 + 生产环境地址
    container: '#micro-app-container', // 挂载到主应用的哪个容器节点
    activeRule: '/vue3', // 激活规则，当路由以 /vue3 开头时，加载这个微应用
    props: { 
        // 可以传递一些全局状态或方法给微应用
        routerBase: '/vue3' 
    }
  },
  // 可以注册更多微应用，如 React、Angular...
];

// 2. 注册微应用
registerMicroApps(microApps, {
  // 生命周期钩子，可选
  beforeLoad: (app) => {
    console.log('Before load', app.name);
  },
  beforeMount: (app) => {
    console.log('Before mount', app.name);
  }
});


// 3. 启动 qiankun
// { prefetch: true } 是预加载配置，可选
start({ prefetch: true, sandbox: { experimentalStyleIsolation: true } });