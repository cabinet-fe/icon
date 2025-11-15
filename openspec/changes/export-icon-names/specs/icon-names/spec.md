## ADDED Requirements

### Requirement: 图标名称导出
库 SHALL 导出所有可用图标的名称列表，以便使用者在运行时查询和验证图标名称。

#### Scenario: 从专门的文件导入所有图标名称
- **WHEN** 使用者从 `@ultra/icon/names` 导入 `iconNames`
- **THEN** 获得包含 `normal` 和 `colorful` 两个数组的对象
- **AND** `iconNames.normal` 包含所有常规图标的名称数组
- **AND** `iconNames.colorful` 包含所有彩色图标的名称数组

#### Scenario: 从专门的文件导入分类图标名称
- **WHEN** 使用者从 `@ultra/icon/names` 导入 `normalIconNames`
- **THEN** 获得常规图标名称的字符串数组
- **WHEN** 使用者从 `@ultra/icon/names` 导入 `colorfulIconNames`
- **THEN** 获得彩色图标名称的字符串数组

#### Scenario: 专门的文件路径配置
- **WHEN** 使用者导入 `@ultra/icon/names`
- **THEN** 从构建后的 `dist/names.js` 文件加载
- **AND** 类型定义从 `dist/names.d.ts` 加载
- **AND** 主入口文件不包含名称导出，保持入口文件简洁

#### Scenario: 类型安全
- **WHEN** 使用者导入图标名称
- **THEN** TypeScript 能够正确推断类型
- **AND** 名称数组的类型为 `readonly string[]` 或 `string[]`
- **AND** 类型定义文件（.d.ts）中包含正确的类型声明

#### Scenario: 名称格式一致性
- **WHEN** 导出图标名称
- **THEN** 名称格式与导出的组件名称一致（PascalCase）
- **AND** 名称数组中的顺序与导出顺序一致

#### Scenario: 构建时生成
- **WHEN** 运行构建命令
- **THEN** 图标名称从 SVG 文件自动生成
- **AND** 名称导出与组件导出保持同步
- **AND** 添加新图标时名称列表自动更新

