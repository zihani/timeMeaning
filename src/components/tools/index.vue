<script setup lang="ts">
import { onMounted,onUnmounted, ref,type Ref,watch,reactive ,markRaw} from "vue";
import BenerateList from '@/components/tools/generateList.vue'
import { useToolsStore } from '@/stores/useToolsStore'
const toolsStore = useToolsStore()

defineProps(['modelValue']);
let activeIndex = ref('table')
let config = {
    type: activeIndex, // 菜单类型
    status: 'init',  // init 初始化  edit保证数据存储刷新不丢失  complete 生成完成
    loding: false  // false结束加载  true 加载中。。。 
}
const form = reactive({
  vueType: '',
  vueApiType: 'Options',
  vueComponents: 'element',
})
let vueTypeOptions = ref([{value:"vue2",label:"vue2"},{value:"vue3",label:"vue3"}])
let vueApiTypeOptions = ref([{value:"Options",label:"Options API"},{value:"Composition",label:"Composition API"}])
let vueComponentsOptions = ref([{value:"element",label:"element"},{value:"element-plus",label:"element-plus"}])
const handleSelect = (key: string, keyPath: string[]) => {
  activeIndex.value = key
}
const visibleChangeVueType  = (() =>{
     if( form.vueType === 'vue2') {
        vueApiTypeOptions.value = [{value:"Options",label:"Options API"}]
        return
    }
     vueApiTypeOptions.value = [{value:"Options",label:"Options API"},{value:"Composition",label:"Composition API"}]
})
const createTableComponent = (() =>{
    // let staticArray = markRaw(toolsStore.tableRow)
    console.log('toolsStore.tableRow')
    console.log(toolsStore.tableRow)
    console.log('toolsStore.tableRow')
    // toolsStore.addTableRow()
    toolsStore.getTableRow()
    // 选择一个vue 版本 2x 3x
    // 选择一个组合式api 选择式api
    // 使用的组件库 
    // 跳转到代码显示页面 添加拷贝按钮提升开发效率
    console.log(form.vueType)
})
const handleSubmit = (payload) => {
  console.log(payload.value) // 接收子组件数据
}
</script>
<template>
     <div style="padding-top: 80px; color:black;">
       <el-form :model="form" label-width="120px">
            <el-row>
                <el-col :span="6">  
                    <el-form-item label="vue版本" :rules="[{
                        type: 'vueType',
                        required: true,
                        message: '请选择一个版本',
                        trigger: 'blur'
                    }]">
                        <el-select
                            v-model="form.vueType"
                            class="m-2"
                            placeholder="Select"
                            size="large"
                            style="width: 240px"
                            @visible-change="visibleChangeVueType"
                        >
                            <el-option
                            v-for="item in vueTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="api模式" :rules="[{
                        type: 'vueApiType',
                        required: true,
                        message: '请选择api模式',
                        trigger: 'blur',
                    }]">
                        <el-select
                            v-model="form.vueApiType"
                            class="m-2"
                            placeholder="Select"
                            size="large"
                            style="width: 240px"
                        >
                            <!---->
                            <el-option
                            v-for="item in vueApiTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="组件库" :rules="[{
                        type: 'vueComponents',
                        required: true,
                        message: '请选择组件库',
                        trigger: 'blur',
                    }]">
                        <el-select
                        v-model="form.vueComponents"
                        class="m-2"
                        placeholder="Select"
                        size="large"
                        style="width: 240px"
                        >
                            <el-option
                            v-for="item in vueComponentsOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="createTableComponent">生成</el-button>
                </el-col>
            </el-row>
        </el-form>
         <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
        >
            <el-menu-item index="table"> 表格设计生成 </el-menu-item>
            <el-menu-item index="from">表单设计</el-menu-item>
        </el-menu>
        <BenerateList @submit="handleSubmit" :config="config" v-if='activeIndex==="table"' />
     </div>
</template>
<style>
</style>