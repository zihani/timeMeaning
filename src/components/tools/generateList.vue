<script setup lang="ts">
import { onMounted, onUnmounted, ref,type Ref, watch, reactive } from "vue";
import type { PropType } from 'vue';
import { useToolsStore } from '@/stores/useToolsStore'
const toolsStore = useToolsStore()
defineProps({
  config: {
    type: Object as PropType<{
      type: string;
      status: string;
      loding: Boolean;
    }>,
    required: true
  }
});
const emit = defineEmits(['submit', 'update'])
let field = ref('')
let fieldName = ref('')
// toolsStore.getTableRow()
// function addrow1() {
//     return ref(toolsStore.tableRow)
// }
// 读取状态管理
let addrow = ref(toolsStore.tableRow)
const onAddRow = (()=>{
    toolsStore.tableRow.push({field:"",fieldName:""})
    // addrow = ref(toolsStore.tableRow)
    // console.log('toolsStore.tableRow')
    // console.log(toolsStore.tableRow)
    // console.log('toolsStore.tableRow')
    // toolsStore.addTableRow(toolsStore.tableRow)
    // addrow.value.push({field:"",fieldName:""})
    // emit('submit', addrow)
})
const createTableComponent = (() =>{
    try {
        // 选择一个vue 版本 2x 3x
        // 选择一个组合式api 选择式api
        // 使用的组件库 
        // 跳转到代码显示页面 添加拷贝按钮提升开发效率
        for (const item of addrow._rawValue) {
            console.log(item)
        }
        // 使用模版字符串生成代码结构
        
        // console.log(addrow._rawValue.length)
    } catch (error) {
        console.log(error)
    }
})
</script>
<template>
    <div style="padding-top: 80px; color:black;">
       <el-form :model="form" label-width="120px" v-show="true">
            <el-row>
                <el-col :span="6">  
                     <el-button type="primary" @click="onAddRow">新增列</el-button> 
                </el-col>
                <el-col>
                    <el-button type="primary" @click="createTableComponent">生成列表代码</el-button> 
                </el-col>
            </el-row>
            <el-row v-for="(item, key ) in addrow" :key="key">
                <el-col :span="6">  
                    <el-form-item label="字段:" :rules="[{
                        type: 'field',
                        required: true,
                        message: '请填写字段!',
                        trigger: 'blur'
                    }]">
                        <el-input v-model="item.field" placeholder="Please input" />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="字段名称:"  :rules="[{
                        type: 'fieldName',
                        required: true,
                        message: '请填写字段名称!',
                        trigger: 'blur'
                    }]">
                        <el-input v-model="item.fieldName" placeholder="Please input" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">  
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<style scoped>
  
</style>