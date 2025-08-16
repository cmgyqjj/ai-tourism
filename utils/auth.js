/**
 * 认证工具函数
 * 用于检查用户登录状态和登录拦截
 */

/**
 * 检查用户是否已登录（根据头像判断）
 * @returns {boolean} 是否已登录
 */
function checkLoginStatus() {
  try {
    const userAvatar = wx.getStorageSync('userAvatar')
    const userInfo = wx.getStorageSync('userInfo')
    const isLoggedIn = wx.getStorageSync('isLoggedIn')
    
    // 根据头像和登录状态判断是否登录：如果有头像且用户信息存在且登录状态为true，则认为已登录
    return !!(userAvatar && userInfo && (userInfo.isLoggedIn || isLoggedIn))
  } catch (e) {
    console.error('检查登录状态失败:', e)
    return false
  }
}

/**
 * 获取当前用户信息
 * @returns {object|null} 用户信息对象，未登录时返回null
 */
function getCurrentUser() {
  try {
    const userAvatar = wx.getStorageSync('userAvatar')
    const userInfo = wx.getStorageSync('userInfo')
    const isLoggedIn = wx.getStorageSync('isLoggedIn')
    
    // 根据头像和登录状态判断是否登录
    if (userAvatar && userInfo && (userInfo.isLoggedIn || isLoggedIn)) {
      return {
        ...userInfo,
        avatarUrl: userAvatar
      }
    }
    return null
  } catch (e) {
    console.error('获取用户信息失败:', e)
    return null
  }
}

/**
 * 根据头像获取用户信息
 * @param {string} avatarUrl 头像URL
 * @returns {object|null} 用户信息对象，未找到时返回null
 */
function getUserByAvatar(avatarUrl) {
  try {
    const userInfo = wx.getStorageSync('userInfo')
    const storedAvatar = wx.getStorageSync('userAvatar')
    const isLoggedIn = wx.getStorageSync('isLoggedIn')
    
    // 如果头像匹配且用户已登录，返回用户信息
    if (storedAvatar === avatarUrl && userInfo && (userInfo.isLoggedIn || isLoggedIn)) {
      return {
        ...userInfo,
        avatarUrl: storedAvatar
      }
    }
    return null
  } catch (e) {
    console.error('根据头像获取用户信息失败:', e)
    return null
  }
}

/**
 * 获取当前页面路径（包含查询参数）
 * @returns {string} 当前页面路径
 */
function getCurrentPagePath() {
  try {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]
    
    if (currentPage) {
      const route = currentPage.route
      const options = currentPage.options
      
      if (options && Object.keys(options).length > 0) {
        const queryString = Object.keys(options)
          .map(key => `${key}=${options[key]}`)
          .join('&')
        return `/${route}?${queryString}`
      }
      
      return `/${route}`
    }
    
    return '/pages/index/index'
  } catch (e) {
    console.error('获取当前页面路径失败:', e)
    return '/pages/index/index'
  }
}

/**
 * 登录拦截器 - 如果未登录则跳转到欢迎页面
 * @param {string} redirectUrl 登录成功后要跳转的页面路径（可选）
 * @returns {boolean} 是否已登录
 */
function requireLogin(redirectUrl = null) {
  if (checkLoginStatus()) {
    return true
  }
  
  // 如果没有指定重定向URL，则使用当前页面路径
  let targetUrl = redirectUrl || getCurrentPagePath()
  
  // 确保URL格式正确
  if (targetUrl && !targetUrl.startsWith('/pages/')) {
    targetUrl = '/pages/index/index'
  }
  
  console.log('未登录，跳转到欢迎页面，重定向目标:', targetUrl)
  
  // 未登录，跳转到欢迎页面
  wx.navigateTo({
    url: `/pages/welcome/welcome?redirect=${encodeURIComponent(targetUrl)}`
  })
  
  return false
}

/**
 * 登录拦截器 - 如果未登录则跳转到指定页面，已登录则执行回调
 * @param {Function} callback 已登录时要执行的回调函数
 * @param {string} redirectUrl 登录成功后要跳转的页面路径（可选）
 * @param {string} notLoginPage 未登录时要跳转的页面路径（可选，默认为welcome页面）
 */
function withLogin(callback, redirectUrl = null, notLoginPage = '/pages/welcome/welcome') {
  if (checkLoginStatus()) {
    // 已登录，直接执行回调
    callback()
  } else {
    // 如果没有指定重定向URL，则使用当前页面路径
    let targetUrl = redirectUrl || getCurrentPagePath()
    
    // 确保URL格式正确
    if (targetUrl && !targetUrl.startsWith('/pages/')) {
      targetUrl = '/pages/index/index'
    }
    
    console.log('未登录，跳转到页面:', notLoginPage, '重定向目标:', targetUrl)
    
    // 未登录，跳转到指定页面
    wx.navigateTo({
      url: `${notLoginPage}?redirect=${encodeURIComponent(targetUrl)}`
    })
  }
}

/**
 * 退出登录
 */
function logout() {
  try {
    // 清除头像缓存
    wx.removeStorageSync('userAvatar')
    
    // 清除用户信息缓存
    wx.removeStorageSync('userInfo')
    
    // 清除登录状态
    wx.removeStorageSync('isLoggedIn')
    
    console.log('退出登录成功')
  } catch (e) {
    console.error('退出登录失败:', e)
  }
}

// 导出函数
module.exports = {
  checkLoginStatus,
  getCurrentUser,
  getUserByAvatar,
  getCurrentPagePath,
  requireLogin,
  withLogin,
  logout
} 