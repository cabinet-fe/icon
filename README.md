# Ultra Icon

<div align="center">
  <img src="./playground/public/logo.svg" alt="Icon Ultra Logo" width="120" height="120">
  <h1>Ultra Icon</h1>
  <p>一个精美的 Vue 图标库，提供常规和彩色图标供开发者使用</p>

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Vue 3](https://img.shields.io/badge/vue-3.x-green.svg)](https://vuejs.org/)

</div>

## 🌟 特性

- 🎨 **精美设计** - 包含常规和彩色两套图标
- 🔧 **Vue 3 支持** - 原生 Vue 3 组件
- 📦 **按需引入** - 支持 Tree Shaking，只打包使用的图标
- 🎯 **TypeScript 支持** - 完整的类型定义
- 🚀 **高性能** - SVG 图标，无需加载字体文件
- 🎪 **可定制** - 支持自定义颜色、大小等属性

## 📖 在线文档

访问我们的在线文档和图标预览：

**[https://cabinet-fe.github.io/icon/](https://cabinet-fe.github.io/icon/)**

## 🚀 快速开始

### 安装

使用 npm：

```bash
npm install @ultra/icon
```

使用 yarn：

```bash
yarn add @ultra/icon
```

使用 pnpm：

```bash
pnpm add @ultra/icon
```

使用 bun：

```bash
bun add @ultra/icon
```

### 使用方法

```vue
<template>
  <div>
    <!-- 常规图标 -->
    <Search />
    <User />
    <Setting />

    <!-- 彩色图标 -->
    <Word />
    <Excel />
    <Pdf />
  </div>
</template>

<script setup>
import { Search, User, Setting, Word, Excel, Pdf } from '@ultra/icon'

// 常规图标
// import { Search, User, Setting } from '@ultra/icon/normal'
// 彩色图标
// import { Word, Excel, Pdf } from '@ultra/icon/colorful'
</script>
```

### 获取图标名称列表

如果需要获取所有可用图标的名称列表，可以从 `@ultra/icon/names` 导入：

```typescript
import { iconNames, normalIconNames, colorfulIconNames } from '@ultra/icon/names'

// 获取所有图标名称
console.log(iconNames.normal)    // 常规图标名称数组
console.log(iconNames.colorful)  // 彩色图标名称数组

// 或分别导入
console.log(normalIconNames)     // 常规图标名称数组
console.log(colorfulIconNames)   // 彩色图标名称数组
```

## 📚 图标分类

### 常规图标 (Normal Icons)

包含各种常用的线性图标，如：

- 导航类：`ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`
- 操作类：`Add`, `Delete`, `Edit`, `Search`
- 界面类：`User`, `Setting`, `Bell`, `Calendar`
- 文件类：`Folder`, `FileAdd`, `Download`, `Upload`

### 彩色图标 (Colorful Icons)

包含各种彩色的文件类型图标，如：

- 文档类：`Word`, `Excel`, `PowerPoint`, `Pdf`
- 媒体类：`Image`, `Video`, `Archive`
- 其他类：`Folder`, `UnknownFile`

## 🛠️ 开发

### 环境要求

- Node.js >= 22
- Bun (推荐) 或 npm/yarn/pnpm

### 本地开发

1. 克隆项目：

```bash
git clone https://github.com/cabinet-fe/icon.git
```

2. 安装依赖：

```bash
bun install
```

3. 启动开发服务器：

```bash
cd playground
bun dev
```

4. 构建图标库：

```bash
cd packages/vue
bun run build
```

### 项目结构

```
icon/
├── packages/
│   ├── svg/           # SVG 源文件
│   │   ├── normal/    # 常规图标 SVG
│   │   └── colorful/  # 彩色图标 SVG
│   └── vue/           # Vue 组件包
│       ├── src/       # 生成的 Vue 组件
│       └── dist/      # 构建输出
├── playground/        # 文档和演示站点
└── README.md
```

## 🤝 贡献指南

我们欢迎所有形式的贡献！以下是参与贡献的方式：

### 报告问题

如果您发现了 bug 或有功能建议，请：

1. 查看 [Issues](https://github.com/cabinet-fe/icon/issues) 确认问题是否已存在
2. 创建新的 Issue，详细描述问题或建议
3. 提供复现步骤（如果是 bug）

### 提交代码

1. **Fork 项目**

   ```bash
   # 点击 GitHub 上的 Fork 按钮
   ```

2. **克隆你的 Fork**

   ```bash
   git clone https://github.com/your-username/icon.git
   cd icon
   ```

3. **创建功能分支**

   ```bash
   git checkout -b feature/your-feature-name
   # 或者修复分支
   git checkout -b fix/your-fix-name
   ```

4. **安装依赖**

   ```bash
   bun install
   ```

5. **进行更改**
   - 添加新图标：将 SVG 文件放入 `packages/svg/normal/` 或 `packages/svg/colorful/`
   - 修改现有图标：直接编辑对应的 SVG 文件
   - 修改代码：遵循现有的代码风格

6. **构建和测试**

   ```bash
   # 构建 Vue 组件
   cd packages/vue
   bun run build

   # 启动开发服务器测试
   cd ../../playground
   bun dev
   ```

7. **提交更改**

   ```bash
   git add .
   git commit -m "feat: 添加新的图标 xxx"
   # 或者
   git commit -m "fix: 修复图标 xxx 的显示问题"
   ```

8. **推送到 GitHub**

   ```bash
   git push origin feature/your-feature-name
   ```

9. **创建 Pull Request**
   - 在 GitHub 上创建 Pull Request
   - 详细描述您的更改
   - 等待代码审查

### 添加新图标

1. **准备 SVG 文件**
   - 确保 SVG 是优化过的（可使用 SVGO）
   - 使用 `currentColor` 作为颜色值（常规图标）
   - 文件名使用 kebab-case 格式

2. **放置文件**
   - 常规图标：`packages/svg/normal/your-icon.svg`
   - 彩色图标：`packages/svg/colorful/your-icon.svg`

3. **重新构建**

   ```bash
   cd packages/vue
   bun run build
   ```

4. **测试图标**
   - 在 playground 中测试新图标
   - 确保图标显示正确

### 代码规范

- 使用 TypeScript
- 遵循现有的代码风格
- 添加适当的注释
- 确保类型定义正确

### 提交信息规范

请使用以下格式的提交信息：

- `feat: 添加新功能`
- `fix: 修复问题`
- `docs: 更新文档`
- `style: 代码格式调整`
- `refactor: 重构代码`
- `test: 添加测试`
- `chore: 构建或工具相关`

## 📄 许可证

本项目基于 [MIT 许可证](LICENSE) 开源。

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者！

---

<div align="center">
  <p>如果这个项目对您有帮助，请考虑给我们一个 ⭐️</p>
  <p>Made with ❤️ by Cabinet FE Team</p>
</div>
