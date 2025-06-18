<template>
  <div class="app" :style="{ '--stroke-width': strokeWidth }">
    <!-- 头部 -->
    <header class="header">
      <div class="header-content">
        <div class="logo">
          <div class="logo-icon">
            <svg
              width="32"
              height="32"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="url(#gradient1)"
                stroke-width="3"
                fill="none"
              />
              <rect
                x="14"
                y="14"
                width="6"
                height="6"
                rx="1"
                fill="url(#gradient2)"
              />
              <rect
                x="22"
                y="14"
                width="6"
                height="6"
                rx="1"
                fill="url(#gradient2)"
              />
              <rect
                x="30"
                y="14"
                width="6"
                height="6"
                rx="1"
                fill="url(#gradient2)"
              />
              <rect
                x="14"
                y="22"
                width="6"
                height="6"
                rx="1"
                fill="url(#gradient3)"
              />
              <rect
                x="22"
                y="22"
                width="6"
                height="6"
                rx="1"
                fill="url(#gradient1)"
              />
              <rect
                x="30"
                y="22"
                width="6"
                height="6"
                rx="1"
                fill="url(#gradient3)"
              />
              <rect
                x="14"
                y="30"
                width="6"
                height="6"
                rx="1"
                fill="url(#gradient2)"
              />
              <rect
                x="22"
                y="30"
                width="6"
                height="6"
                rx="1"
                fill="url(#gradient2)"
              />
              <rect
                x="30"
                y="30"
                width="6"
                height="6"
                rx="1"
                fill="url(#gradient2)"
              />
              <defs>
                <linearGradient
                  id="gradient1"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" style="stop-color: #3b82f6" />
                  <stop offset="100%" style="stop-color: #1d4ed8" />
                </linearGradient>
                <linearGradient
                  id="gradient2"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" style="stop-color: #8b5cf6" />
                  <stop offset="100%" style="stop-color: #7c3aed" />
                </linearGradient>
                <linearGradient
                  id="gradient3"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" style="stop-color: #06b6d4" />
                  <stop offset="100%" style="stop-color: #0891b2" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div class="logo-text">
            <h1>Icon Ultra</h1>
            <span class="subtitle">Beautiful icon library</span>
          </div>
        </div>
        <div class="search-container">
          <div class="search-box">
            <svg
              class="search-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索图标..."
              class="search-input"
            />
          </div>
        </div>
      </div>
    </header>

    <div class="main-container">
      <!-- 侧边栏 -->
      <aside class="sidebar">
        <div class="sidebar-content">
          <div class="section">
            <h3>分类</h3>
            <ul class="category-list">
              <li
                v-for="category in categories"
                :key="category.key"
                :class="{ active: activeCategory === category.key }"
                @click="setActiveCategory(category.key)"
                class="category-item"
              >
                <span class="category-name">{{ category.name }}</span>
                <span class="category-count">{{ category.count }}</span>
              </li>
            </ul>
          </div>

          <div class="section">
            <h3>自定义</h3>
            <div class="customizer">
              <div class="control-group">
                <label>大小</label>
                <input
                  v-model="iconSize"
                  type="range"
                  min="16"
                  max="40"
                  class="range-slider"
                />
                <span class="value">{{ iconSize }}px</span>
              </div>
              <div class="control-group">
                <label>线条粗细</label>
                <input
                  v-model="strokeWidth"
                  type="range"
                  min="1"
                  max="3"
                  step="0.5"
                  class="range-slider"
                />
                <span class="value">{{ strokeWidth }}px</span>
              </div>
              <div class="control-group">
                <label>颜色</label>
                <input v-model="iconColor" type="color" class="color-picker" />
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- 主内容区 -->
      <main class="content">
        <div class="content-header">
          <div class="results-info">
            <span class="results-count">{{ getTotalIconCount() }} 个图标</span>
            <span v-if="searchQuery" class="search-query"
              >搜索 "{{ searchQuery }}"</span
            >
          </div>
        </div>

        <!-- 分组显示 -->
        <div v-if="filteredIcons.grouped" class="grouped-icons">
          <div
            v-for="group in filteredIcons.groups"
            :key="group.title"
            class="icon-group"
          >
            <h3 class="group-title">{{ group.title }}</h3>
            <div class="icons-grid">
              <div
                v-for="(icon, key) in group.icons"
                :key="String(key)"
                :data-tooltip="String(key)"
                @click="copyIconName(String(key))"
                class="icon-item"
              >
                <div class="icon-wrapper">
                  <component
                    :is="icon"
                    class="icon"
                    :style="{
                      width: `${iconSize}px`,
                      height: `${iconSize}px`,
                      color: iconColor
                    }"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 常规显示 -->
        <div v-else class="icons-grid">
          <div
            v-for="(icon, key) in filteredIcons.icons"
            :key="String(key)"
            :data-tooltip="String(key)"
            @click="copyIconName(String(key))"
            class="icon-item"
          >
            <div class="icon-wrapper">
              <component
                :is="icon"
                class="icon"
                :style="{
                  width: `${iconSize}px`,
                  height: `${iconSize}px`,
                  color: iconColor
                }"
              />
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <div v-if="isEmpty()" class="empty-state">
          <div class="empty-icon">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
              <line x1="9" y1="9" x2="15" y2="15" />
              <line x1="15" y1="9" x2="9" y2="15" />
            </svg>
          </div>
          <h3>没有找到图标</h3>
          <p>尝试使用不同的搜索关键词</p>
        </div>
      </main>
    </div>

    <!-- 复制提示 -->
    <div v-if="showCopyToast" class="toast">已复制: {{ copiedIconName }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, reactive } from 'vue'
import * as normalIcons from '../../packages/vue/src/normal/index.js'
import * as colorfulIcons from '../../packages/vue/src/colorful/index.js'

// 响应式状态
const searchQuery = ref('')
const activeCategory = ref('all')
const iconSize = ref(32)
const strokeWidth = ref(2)
const iconColor = ref('#000000')
const showCopyToast = ref(false)
const copiedIconName = ref('')

// 处理图标名称，去除 Vue 后缀，转为kebab-case（用于显示）
const processIconName = (name: string) => {
  return name
    .replace(/Vue$/, '')
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '')
}

// 处理图标名称，去除 Vue 后缀，保持大驼峰（用于复制）
const getOriginalIconName = (name: string) => {
  return name.replace(/Vue$/, '')
}

// 合并所有图标并处理名称
const allIcons = computed(() => {
  const processed: any = {}

  Object.entries(normalIcons).forEach(([key, value]) => {
    const cleanName = processIconName(key)
    processed[cleanName] = value
  })

  Object.entries(colorfulIcons).forEach(([key, value]) => {
    const cleanName = processIconName(key)
    processed[cleanName] = value
  })

  return processed
})

// 处理普通图标
const processedNormalIcons = computed(() => {
  const processed: any = {}
  Object.entries(normalIcons).forEach(([key, value]) => {
    const cleanName = processIconName(key)
    processed[cleanName] = value
  })
  return processed
})

// 处理彩色图标
const processedColorfulIcons = computed(() => {
  const processed: any = {}
  Object.entries(colorfulIcons).forEach(([key, value]) => {
    const cleanName = processIconName(key)
    processed[cleanName] = value
  })
  return processed
})

// 创建显示名称到原始名称的映射
const iconNameMapping = computed(() => {
  const mapping: Record<string, string> = {}

  Object.keys(normalIcons).forEach(key => {
    const displayName = processIconName(key)
    const originalName = getOriginalIconName(key)
    mapping[displayName] = originalName
  })

  Object.keys(colorfulIcons).forEach(key => {
    const displayName = processIconName(key)
    const originalName = getOriginalIconName(key)
    mapping[displayName] = originalName
  })

  return mapping
})

// 分类配置
const categories = computed(() => [
  {
    key: 'all',
    name: '全部',
    count: Object.keys(allIcons.value).length
  },
  {
    key: 'normal',
    name: '常规图标',
    count: Object.keys(processedNormalIcons.value).length
  },
  {
    key: 'colorful',
    name: '彩色图标',
    count: Object.keys(processedColorfulIcons.value).length
  }
])

// 过滤图标
const filteredIcons = computed(() => {
  // 如果是全部分类且没有搜索，返回分组数据
  if (activeCategory.value === 'all' && !searchQuery.value) {
    return {
      grouped: true,
      groups: [
        {
          title: '常规图标',
          icons: processedNormalIcons.value
        },
        {
          title: '彩色图标',
          icons: processedColorfulIcons.value
        }
      ]
    }
  }

  let icons = allIcons.value

  // 按分类过滤
  if (activeCategory.value === 'normal') {
    icons = processedNormalIcons.value
  } else if (activeCategory.value === 'colorful') {
    icons = processedColorfulIcons.value
  }

  // 按搜索词过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    const filtered: any = {}
    Object.keys(icons).forEach(key => {
      if (key.toLowerCase().includes(query)) {
        filtered[key] = icons[key]
      }
    })
    return { grouped: false, icons: filtered }
  }

  return { grouped: false, icons }
})

// 设置活跃分类
const setActiveCategory = (category: string) => {
  activeCategory.value = category
}

// 获取图标总数
const getTotalIconCount = () => {
  const result = filteredIcons.value
  if (result.grouped && result.groups) {
    return result.groups.reduce(
      (total, group) => total + Object.keys(group.icons).length,
      0
    )
  }
  return Object.keys(result.icons || {}).length
}

// 判断是否为空状态
const isEmpty = () => {
  return getTotalIconCount() === 0
}

// 复制图标名称（大驼峰格式）
const copyIconName = async (iconName: string) => {
  try {
    const originalName = iconNameMapping.value[iconName] || iconName
    await navigator.clipboard.writeText(originalName)
    copiedIconName.value = originalName
    showCopyToast.value = true
    setTimeout(() => {
      showCopyToast.value = false
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

.app {
  min-height: 100vh;
  background-color: #fafafa;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  overflow: visible;
}

/* 头部样式 */
.header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
  height: 88px; /* 明确设置头部高度 */
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  flex-shrink: 0;
}

.logo-text h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
}

.logo-text .subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  display: block;
  margin-top: 0.25rem;
}

.search-container {
  flex: 1;
  max-width: 400px;
  margin-left: 2rem;
}

.search-box {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
}

.search-input {
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: white;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* 主容器 */
.main-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 2rem;
  padding: 2rem;
  padding-left: 320px; /* 为固定侧边栏留出空间 */
}

/* 侧边栏样式 */
.app .sidebar {
  width: 280px;
  flex-shrink: 0;
  position: fixed !important; /* 强制固定侧边栏 */
  left: 2rem;
  top: 120px; /* 头部高度 + 边距 */
  height: calc(100vh - 140px);
  overflow-y: auto;
  z-index: 50;
}

.sidebar-content {
  background: white;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  overflow: hidden;
}

.section {
  padding: 1.5rem;
  border-bottom: 1px solid #f3f4f6;
}

.section:last-child {
  border-bottom: none;
}

.section h3 {
  margin: 0 0 1rem 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.category-item:hover {
  background-color: #f9fafb;
}

.category-item.active {
  background-color: #eff6ff;
  color: #2563eb;
}

.category-name {
  font-size: 0.875rem;
  font-weight: 500;
}

.category-count {
  font-size: 0.75rem;
  color: #6b7280;
  background: #f3f4f6;
  padding: 0.125rem 0.5rem;
  border-radius: 1rem;
}

.category-item.active .category-count {
  background: #dbeafe;
  color: #2563eb;
}

/* 自定义控制器 */
.customizer {
  space-y: 1rem;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.control-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  min-width: 80px; /* 增加最小宽度 */
  flex-shrink: 0; /* 防止收缩 */
}

.range-slider {
  flex: 1;
  appearance: none;
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  outline: none;
  margin: 0 0.5rem; /* 增加左右边距 */
}

.range-slider::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  background: #3b82f6;
  border-radius: 50%;
  cursor: pointer;
}

.range-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: #3b82f6;
  border-radius: 50%;
  cursor: pointer;
  border: none;
}

.value {
  font-size: 0.75rem;
  color: #6b7280;
  min-width: 45px; /* 增加最小宽度 */
  text-align: right;
  flex-shrink: 0; /* 防止收缩 */
}

.color-picker {
  width: 40px;
  height: 32px;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  cursor: pointer;
  background: none;
  padding: 0;
}

/* 主内容区 */
.content {
  flex: 1;
  min-width: 0;
  overflow: visible;
}

.content-header {
  margin-bottom: 1.5rem;
}

.results-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.results-count {
  font-weight: 500;
  color: #374151;
}

.search-query {
  color: #3b82f6;
}

/* 分组样式 */
.grouped-icons {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.icon-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.group-title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e5e7eb;
}

/* 图标网格 */
.icons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(72px, 1fr));
  gap: 0.75rem;
  overflow: visible;
}

.icon-item {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 0.75rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.icon-item:hover {
  border-color: #3b82f6;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

/* Tooltip 样式 */
.icon-item {
  overflow: visible;
}

.icon-item::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #111827;
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s;
  z-index: 9999;
  pointer-events: none;
  margin-bottom: 8px;
}

.icon-item::before {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #111827;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s;
  z-index: 9999;
  pointer-events: none;
  margin-bottom: 2px;
}

.icon-item:hover::after,
.icon-item:hover::before {
  opacity: 1;
  visibility: visible;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: #f9fafb;
  border-radius: 0.375rem;
}

.icon {
  transition: all 0.2s;
  stroke-width: var(--stroke-width, 2);
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #6b7280;
}

.empty-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
}

.empty-state p {
  margin: 0;
  font-size: 0.875rem;
}

/* 提示消息 */
.toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: #111827;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  z-index: 1000;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .search-container {
    margin-left: 0;
    max-width: none;
    width: 100%;
  }

  .main-container {
    flex-direction: column;
    padding: 1rem;
    padding-left: 1rem; /* 移动端恢复正常padding */
    gap: 1rem;
  }

  .sidebar {
    width: 100%;
    position: static; /* 移动端取消固定 */
    height: auto;
    left: auto;
    top: auto;
  }

  .icons-grid {
    grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
    gap: 0.5rem;
  }

  .icon-item {
    padding: 0.5rem;
  }

  .icon-wrapper {
    width: 40px;
    height: 40px;
  }

  /* 移动端 tooltip 调整 */
  .icon-item::after {
    font-size: 0.6875rem;
    padding: 0.25rem 0.5rem;
    margin-bottom: 6px;
  }
}
</style>
