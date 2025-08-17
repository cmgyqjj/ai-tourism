// featured-topics.js
Page({
  data: {
    activeTab: 'oneday' // 默认显示一日游选项卡
  },

  onLoad(options) {
    console.log('精选专题页面加载')
  },

  onShow() {
    console.log('精选专题页面显示')
  },

  // 返回上一页
  goBack() {
    wx.navigateBack({
      delta: 1
    })
  },

  // 切换选项卡
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab
    console.log('切换到选项卡:', tab)
    
    this.setData({
      activeTab: tab
    })
  },

  // 查看一日游详情
  viewOneDayDetail(e) {
    const title = e.currentTarget.dataset.title
    console.log('查看一日游详情:', title)
    
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    })
  },

  // 查看精选专题详情
  viewFeaturedDetail(e) {
    const title = e.currentTarget.dataset.title
    console.log('查看精选专题详情:', title)
    
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    })
  },

  // 分享功能
  onShareAppMessage() {
    return {
      title: '精选专题 - 去哪 Whatever',
      path: 'pages/featured-topics/featured-topics',
      imageUrl: '/images/shoye/logo.png'
    }
  },

  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: '精选专题 - 去哪 Whatever',
      imageUrl: '/images/shoye/logo.png'
    }
  }
}) 