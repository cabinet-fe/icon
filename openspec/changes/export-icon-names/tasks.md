## 1. 实现图标名称导出功能

- [x] 1.1 修改 `packages/vue/build/generate.ts`，在生成组件时同时收集图标名称
- [x] 1.2 创建名称导出源文件生成函数，生成 `src/names.ts` 文件，包含所有图标名称的数组
- [x] 1.3 修改 `packages/vue/build/build.ts`，添加 `names` 作为构建入口
- [x] 1.4 更新 `packages/vue/package.json`，添加 `./names` 导出路径配置
- [x] 1.5 确保构建后生成 `dist/names.js` 和 `dist/names.d.ts` 文件
- [x] 1.6 验证类型定义正确生成

## 2. 验证和测试

- [x] 2.1 在 playground 中测试导入和使用图标名称
- [x] 2.2 验证 TypeScript 类型推断正确
- [x] 2.3 验证构建后的 dist 文件包含名称导出
- [x] 2.4 检查 Tree Shaking 不受影响

## 3. 文档更新

- [x] 3.1 更新 README.md，添加图标名称导出的使用示例
- [x] 3.2 确保类型定义文档完整

