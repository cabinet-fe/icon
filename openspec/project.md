# Project Context

## Purpose

Ultra Icon 是一个精美的 Vue 3 图标库项目，提供常规（normal）和彩色（colorful）两套图标组件。项目的主要目标是：

- 提供高质量的 SVG 图标组件库
- 支持按需引入和 Tree Shaking
- 提供完整的 TypeScript 类型定义
- 支持自定义颜色、大小等属性
- 通过 Monorepo 结构管理 SVG 源文件和 Vue 组件包

## Tech Stack

- **运行时**: Vue 3 (>= 3.4.21)
- **语言**: TypeScript 5.9+
- **包管理器**: Bun（推荐，也可使用 npm/yarn/pnpm）
- **构建工具**:
  - tsdown（用于构建 Vue 组件包）
  - unplugin-vue（Vue 单文件组件支持）
- **SVG 优化**: SVGO 3.3+
- **项目结构**: Monorepo（使用 workspaces）
- **代码格式化**: Prettier 3.6+
- **版本管理**: bumpp（用于版本发布）

## Project Conventions

### Code Style

- **语言**: 严格使用 TypeScript，启用严格模式
- **命名规范**:
  - SVG 文件：使用 kebab-case（如 `arrow-left.svg`）
  - Vue 组件：使用 PascalCase（如 `ArrowLeft`）
  - 变量和函数：使用 camelCase
- **文件组织**:
  - SVG 源文件位于 `packages/svg/normal/` 和 `packages/svg/colorful/`
  - Vue 组件位于 `packages/vue/src/`
  - 构建输出位于 `packages/vue/dist/`
- **代码格式**: 使用 Prettier 进行代码格式化
- **类型定义**: 所有导出都需要完整的 TypeScript 类型定义

### Architecture Patterns

- **Monorepo 结构**:
  - `packages/svg`: SVG 源文件包（`icon-svg`）
  - `packages/vue`: Vue 组件包（`@ultra/icon`）
  - `playground`: 开发和演示站点
- **构建流程**:
  - SVG 文件通过构建脚本自动生成 Vue 组件
  - 构建时从 SVG 源文件读取并转换为 Vue 单文件组件
  - 支持分别构建 `normal` 和 `colorful` 两个入口
- **导出策略**:
  - 主入口：`@ultra/icon` - 导出所有图标
  - 分类入口：`@ultra/icon/normal` 和 `@ultra/icon/colorful`
  - 源码入口：`@ultra/icon/source` - 用于开发调试
- **SVG 处理**:
  - 使用 SVGO 优化 SVG 文件
  - 移除 width/height 和 class 属性
  - 常规图标使用 `currentColor` 以支持颜色自定义

### Testing Strategy

- **开发测试**: 使用 `playground` 目录进行本地开发和测试
- **手动测试**: 在 playground 中启动开发服务器，手动验证图标显示
- **构建验证**: 构建 Vue 组件包后，在 playground 中测试导入和使用
- **无自动化测试**: 当前项目主要依赖手动测试和视觉验证

### Git Workflow

- **分支策略**:
  - `main`: 主分支，用于生产发布
  - `feature/*`: 新功能分支
  - `fix/*`: 修复分支
- **提交规范**: 使用约定式提交（Conventional Commits）
  - `feat: 添加新功能`
  - `fix: 修复问题`
  - `docs: 更新文档`
  - `style: 代码格式调整`
  - `refactor: 重构代码`
  - `test: 添加测试`
  - `chore: 构建或工具相关`
- **发布流程**: 使用 `bumpp` 自动更新版本号，然后发布到公共 npm registry

## Domain Context

- **图标分类**:
  - **常规图标（Normal）**: 线性图标，使用 `currentColor`，支持颜色自定义
  - **彩色图标（Colorful）**: 文件类型图标，包含固定颜色
- **图标命名**: SVG 文件名使用 kebab-case，转换为 Vue 组件时转为 PascalCase
- **组件属性**: Vue 图标组件支持标准的 SVG 属性（如 `width`, `height`, `fill`, `stroke` 等）
- **包发布**: 发布到公共 npm registry（`https://registry.npmjs.org/`）

## Important Constraints

- **Vue 版本**: 必须支持 Vue 3.4.21 及以上版本
- **Node.js 版本**: 需要 Node.js >= 22
- **包管理器**: 优先使用 Bun，但需要兼容 npm/yarn/pnpm
- **构建输出**: 必须生成 CommonJS 和 ES Module 两种格式
- **类型定义**: 必须生成完整的 TypeScript 类型定义文件（.d.ts）
- **SVG 优化**: 所有 SVG 文件必须经过 SVGO 优化
- **包发布**: 包发布到公共 npm registry，使用 `--access=public` 确保作用域包可以公开访问

## External Dependencies

- **Vue**: 作为 peer dependency，由使用者提供
- **SVGO**: 用于 SVG 文件优化和格式化
- **tsdown**: 用于构建和打包 Vue 组件
- **unplugin-vue**: 用于处理 Vue 单文件组件
- **npm registry**: `https://registry.npmjs.org/` - 公共 npm 包注册表，用于包发布
- **GitHub**: 代码托管和问题追踪（`https://github.com/cabinet-fe/icon`）
