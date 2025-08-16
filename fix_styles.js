// 修复第4-13个问题页面样式的脚本
const fs = require('fs');
const path = require('path');

// 需要修复样式的页面
const pages = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

// 页面配置
const pageConfigs = {
  4: { type: 'grid', hasCountryGroup: true }, // 人生必去景点 - 网格布局，有国家分组
  5: { type: 'list', hasCountryGroup: false }, // 旅行心情影响因素 - 垂直列表
  6: { type: 'list', hasCountryGroup: false, hasDescription: true }, // 住宿关注点 - 垂直列表，有描述
  7: { type: 'list', hasCountryGroup: false }, // 住宿预算安排 - 垂直列表
  8: { type: 'grid', hasCountryGroup: false }, // 住宿价格区间 - 网格布局
  9: { type: 'list', hasCountryGroup: false }, // 就餐偏好 - 垂直列表
  10: { type: 'grid', hasCountryGroup: false }, // 就餐预算 - 网格布局
  11: { type: 'list', hasCountryGroup: false }, // 每日活动倾向 - 垂直列表
  12: { type: 'list', hasCountryGroup: false }, // 特殊需求 - 垂直列表
  13: { type: 'final', hasCountryGroup: false } // 完成问卷 - 最终页面
};

// 生成统一的样式内容
function generateUnifiedStyles(pageNumber, config) {
  let optionsStyles = '';
  
  if (config.type === 'grid') {
    // 网格布局样式（与第1-3页一致）
    optionsStyles = `/* 选项网格 - 流式布局 */
.options-grid {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
}

.option-item {
  background-color: #ffffff;
  border: 2rpx solid #e5e7eb;
  border-radius: 50rpx;
  padding: 20rpx 28rpx;
  display: flex;
  align-items: center;
  gap: 12rpx;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
  min-height: 58rpx;
  min-width: 150rpx;
  flex-shrink: 0;
  margin: 0 20rpx 20rpx 0;
  text-align: center;
}

.option-item:hover {
  transform: translateY(-2rpx);
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
}

.option-item.selected {
  background-color: #000000;
  border-color: #000000;
  color: #ffffff;
  text-align: center;
}

.option-icon {
  font-size: 32rpx;
  margin-right: 8rpx;
}

.option-text {
  font-size: 28rpx;
  font-weight: 500;
  line-height: 1.3;
  white-space: nowrap;
  text-align: center;
}

.option-item.selected .option-text {
  color: #ffffff;
  text-align: center;
}`;
  } else if (config.type === 'list') {
    // 垂直列表样式（与第1-3页的垂直选项一致）
    optionsStyles = `/* 选项列表 - 垂直排列 */
.options-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.option-item {
  background-color: #ffffff;
  border: 2rpx solid #e5e7eb;
  border-radius: 24rpx;
  padding: 32rpx;
  display: flex;
  align-items: flex-start;
  gap: 24rpx;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
  min-height: 80rpx;
}

.option-item:hover {
  transform: translateY(-2rpx);
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
}

.option-item.selected {
  background-color: #000000;
  border-color: #000000;
  color: #ffffff;
}

.option-icon {
  font-size: 40rpx;
  flex-shrink: 0;
  margin-top: 4rpx;
}

.option-content {
  flex: 1;
}

.option-text {
  font-size: 28rpx;
  font-weight: 500;
  line-height: 1.4;
  color: #374151;
  display: block;
  margin-bottom: 8rpx;
}

.option-description {
  font-size: 24rpx;
  color: #6b7280;
  line-height: 1.3;
  display: block;
}

.option-item.selected .option-text {
  color: #ffffff;
}

.option-item.selected .option-description {
  color: #d1d5db;
}`;
  } else if (config.type === 'final') {
    // 最终页面样式
    optionsStyles = `/* 最终页面样式 */
.final-message {
  text-align: center;
  padding: 48rpx;
  background-color: #ffffff;
  border-radius: 24rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}

.final-message text {
  font-size: 32rpx;
  color: #374151;
  line-height: 1.5;
}`;
  }
  
  // 国家分组样式（如果需要）
  let countryGroupStyles = '';
  if (config.hasCountryGroup) {
    countryGroupStyles = `
/* 国家分组样式 */
.country-section {
  margin-bottom: 48rpx;
}

.country-header {
  display: flex;
  align-items: center;
  margin-bottom: 24rpx;
  gap: 16rpx;
}

.country-flag {
  font-size: 32rpx;
}

.country-name {
  font-size: 28rpx;
  font-weight: 600;
  color: #374151;
}`;
  }
  
  return `/* trip-questions-${pageNumber}.wxss */
page {
  background: linear-gradient(180deg, #facc15 0%, #fef3c7 100%);
  min-height: 100vh;
}

.container {
  min-height: 100vh;
  padding-bottom: 120rpx;
}

/* 顶部导航栏 */
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 96rpx;
  background-color: #ffffff;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.nav-left {
  position: absolute;
  left: 24rpx;
  top: 56rpx;
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-icon {
  font-size: 40rpx;
  color: #000000;
  font-weight: bold;
}

.nav-title {
  flex: 1;
  top: 56rpx;
  right:20%;
  text-align: center;
}

.nav-title text {
  font-size: 36rpx;
  font-weight: 700;
  color: #000000;
}

.nav-right {
  position: absolute;
  right: 32rpx;
  top: 32rpx;
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-avatars {
  display: flex;
  top:100rpx;
  right:120rpx;
  align-items: center;
  position: relative;
}

.user-avatar {
  width: 60rpx;
  height: 60rpx;
  background-color: #f3f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2rpx solid #e5e7eb;
  overflow: hidden;
  position: relative;
  z-index: 1;
  flex-shrink: 0;
}

.user-avatar:nth-child(2) {
  margin-left: -15rpx;
  z-index: 2;
}

.user-avatar:nth-child(3) {
  margin-left: -15rpx;
  z-index: 3;
}

.user-avatar:nth-child(4) {
  margin-left: -15rpx;
  z-index: 4;
}

.avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.avatar-icon {
  font-size: 32rpx;
}

/* 主要内容区域 */
.main-content {
  bottom: 550rpx;
  padding: 32rpx 48rpx;
  padding-top: 160rpx; /* 为固定导航栏留出空间 */
  position: relative;
  left: 20rpx;
}

/* 进度指示器 */
.progress-badge {
  position: absolute;
  top: 160rpx;
  right: 80rpx;
  background-color: transparent;
  padding: 12rpx 24rpx;
  border-radius: 20rpx;
  border: 2rpx solid #000000;
}

.progress-badge text {
  font-size: 24rpx;
  font-weight: 600;
  color: #000000;
}

/* 问题区域 */
.question-section {
  margin-top: 0; /* 减少顶部边距 */
  background-color: transparent;
  border-radius: 32rpx;
  padding: 48rpx 0;
}

.question-header {
  display: flex;
  align-items: center;
  margin-bottom: 48rpx;
  gap: 24rpx;
}

.question-avatar {
  width: 80rpx;
  height: 80rpx;
  background-color: transparent;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  margin-right: 20rpx;
}

.question-avatar .avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.question-avatar .avatar-icon {
  font-size: 48rpx;
}

.question-content {
  flex: 1;
}

.question-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #000000;
  line-height: 1.4;
}

${countryGroupStyles}

${optionsStyles}

/* 底部按钮区域 */
.bottom-section {
  margin-top: 64rpx;
  padding: 0;
}

.next-button {
  width: 100%;
  height: 96rpx;
  background-color: #e5e7eb;
  border: none;
  border-radius: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.next-button.active {
  background-color: #000000;
}

.next-button text {
  font-size: 32rpx;
  font-weight: 600;
  color: #6b7280;
}

.next-button.active text {
  color: #ffffff;
}

.next-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 响应式调整 */
@media (max-width: 750rpx) {
  .option-item {
    min-height: 70rpx;
    padding: 16rpx 20rpx;
  }
  
  .option-text {
    font-size: 26rpx;
  }
  
  .option-description {
    font-size: 22rpx;
  }
}`;
}

// 修复页面样式
function fixPageStyles(pageNumber, config) {
  const wxssPath = `pages/trip-questions-${pageNumber}/trip-questions-${pageNumber}.wxss`;
  
  // 生成统一的样式
  const unifiedStyles = generateUnifiedStyles(pageNumber, config);
  
  // 写入文件
  fs.writeFileSync(wxssPath, unifiedStyles);
  
  console.log(`页面 ${pageNumber} 样式修复完成`);
}

// 主函数
function main() {
  console.log('开始修复第4-13个问题页面的样式...');
  
  pages.forEach(pageNumber => {
    const config = pageConfigs[pageNumber];
    console.log(`修复页面 ${pageNumber} 样式...`);
    
    fixPageStyles(pageNumber, config);
  });
  
  console.log('所有页面样式修复完成！');
}

// 运行脚本
main(); 