import type { PluginConfig } from 'svgo'

export const commonPlugins: PluginConfig[] = [
  // 基础优化
  'cleanupAttrs',
  'removeDoctype',
  'removeXMLProcInst',
  'removeComments',
  'removeMetadata',
  'removeTitle',
  'removeDesc',
  'removeUselessDefs',
  'removeEditorsNSData',
  'removeEmptyAttrs',
  'removeHiddenElems',
  'removeEmptyText',
  'removeEmptyContainers',
  'removeViewBox',
  'cleanupEnableBackground',
  'convertStyleToAttrs',
  'convertColors',
  'convertPathData',
  'convertTransform',
  'removeUnknownsAndDefaults',
  'removeNonInheritableGroupAttrs',
  'removeUselessStrokeAndFill',
  'removeUnusedNS',
  'cleanupIds',
  'cleanupNumericValues',
  'moveElemsAttrsToGroup',
  'moveGroupAttrsToElems',
  'collapseGroups',
  'removeRasterImages',
  'mergePaths',
  'convertShapeToPath',
  'sortAttrs',

  // 移除尺寸
  'removeDimensions',

  // 移除 class 属性
  {
    name: 'removeAttrs',
    params: {
      attrs: ['class']
    }
  },

  // 移除所有 fill 属性
  {
    name: 'removeAttrs',
    params: {
      attrs: ['fill']
    }
  }
]

export const pureColorPlugins: PluginConfig[] = [
  // 添加 fill="currentColor" 到 svg 元素
  // {
  //   name: 'addAttributesToSVGElement',
  //   params: {
  //     attributes: [
  //       {
  //         fill: 'currentColor'
  //       }
  //     ]
  //   }
  // }
]
