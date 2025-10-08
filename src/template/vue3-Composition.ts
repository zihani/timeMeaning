
// Vue3组合式API模板生成器
function generateVue3Template(options = {}) {
  const {
    componentName = 'MyComponent',
    props = [],
    setupReturn = [],
    imports = ["ref", "computed"],
    lifecycleHooks = ["onMounted"],
    methods = [],
    template = '<div>{{ count }}</div>'
  } = options;

  // 生成import语句
  const importStatements = imports.length > 0 
    ? `import { ${imports.join(', ')} } from 'vue'`
    : '';

  // 生成props类型定义
  const propsDeclaration = props.length > 0
    ? `const props = defineProps({\n${props.map(p => `  ${p.name}: ${p.type}`).join(',\n')}\n})`
    : '';

  // 生成setup返回内容
  const setupReturnContent = setupReturn.length > 0
    ? `return {\n${setupReturn.map(item => `  ${item}`).join(',\n')}\n}`
    : '';

  // 生成生命周期钩子
  const lifecycleCode = lifecycleHooks.map(hook => {
    return `  ${hook}(() => {\n    // ${hook} 逻辑\n  })`;
  }).join('\n');

  // 生成方法
  const methodsCode = methods.map(method => {
    return `  const ${method.name} = ${method.isAsync ? 'async ' : ''}() => {\n    ${method.body || '// 方法实现'}\n  }`;
  }).join('\n\n');

  return `<script setup>
${importStatements}

${propsDeclaration}

${methodsCode}

${lifecycleCode}

${setupReturnContent}
</script>

<template>
  ${template}
</template>

<style scoped>
/* 组件样式 */
</style>`;
}

// 使用示例
export const template = generateVue3Template({
  componentName: 'Counter',
  props: [{ name: 'initialValue', type: 'Number' }],
  imports: ['ref', 'onMounted', 'computed'],
  setupReturn: ['count', 'increment'],
  lifecycleHooks: ['onMounted'],
  methods: [{
    name: 'increment',
    body: 'count.value++'
  }],
  template: '<button @click="increment">{{ count }}</button>'
});

console.log(template);
