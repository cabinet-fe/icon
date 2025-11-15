# Change: 导出图标名称

## Why

当前库只导出了图标组件，使用者无法方便地获取所有可用图标的名称列表。在 playground 中需要通过 `Object.keys()` 手动处理，这不够优雅且不利于类型推断。提供图标名称的导出可以让使用者：

- 在运行时查询可用图标
- 进行图标名称的验证
- 构建图标选择器等 UI 组件
- 获得更好的 TypeScript 类型支持

## What Changes

- **ADDED**: 创建专门的名称导出文件 `dist/names.js`，通过 `@ultra/icon/names` 路径导出
- **ADDED**: 导出 `iconNames` 对象，包含所有图标名称的数组
- **ADDED**: 分别导出 `normalIconNames` 和 `colorfulIconNames` 数组
- **ADDED**: 提供类型定义，确保类型安全
- **MODIFIED**: 构建流程，在生成组件时同时生成名称导出文件
- **MODIFIED**: `packages/vue/package.json` - 添加 `./names` 导出路径配置

## Impact

- **Affected specs**: 新增 `icon-names` 能力规范
- **Affected code**:
  - `packages/vue/build/generate.ts` - 修改生成逻辑，添加名称导出文件生成
  - `packages/vue/build/build.ts` - 添加名称文件的构建入口
  - `packages/vue/src/names.ts` - 新建名称导出源文件
  - `packages/vue/package.json` - 添加 `./names` 导出配置
