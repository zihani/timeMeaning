## 创建vue3
> [https://cn.vuejs.org/guide/introduction.html](https://cn.vuejs.org/guide/introduction.html)

```bash
npm create vue@latest 

```
```bash
✔ Project name: … <your-project-name>
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit testing? … No / Yes
✔ Add an End-to-End Testing Solution? … No / Cypress / Playwright
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes

Scaffolding project in ./<your-project-name>...
Done.
```
```bash
> cd <your-project-name>
> npm install
> npm run dev
> npm run build
```
## main.ts 挂载根组件
> vue3 可以创建多个根节点

```typescript
import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
// import App2 from './App2.vue'
import router from './router'
//createApp 根组件选择
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app') // 挂载到#app
// app.mount('#app2') // 可以创建多个挂在点
```
。
## SetUp()
> setup()函数是一个新的选项，用于替代Vue 2中的created()和mounted()等生命周期钩子函数。setup()函数是使用组合式API（Composition API）的一部分，它允许你更灵活地组织和重用代码。

```javascript
<script>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
export default {
  setup(){
    const count = ref(0)
    console.log(count)
    return {
      count
    }
  },
  mounted() {
    debugger
    this
    debugger
    console.log(this.count) // 0
  }
}
</script>
```
## 

