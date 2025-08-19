Page({
  data: {
    currentImage: 'https://p0.meituan.net/hackathonqjj/be4b8277a45d1b49fb4be2fbd2ca383f143340.png',
    isFirstImage: true,
    redirectUrl: null
  },

  onLoad(options) {
    console.log('登录占位页面加载完成', options);
    
    // 保存重定向参数
    if (options.redirect) {
      this.setData({
        redirectUrl: decodeURIComponent(options.redirect)
      });
      console.log('设置重定向URL:', this.data.redirectUrl);
    }
    
    // 3秒后显示第一次提示
    setTimeout(() => {
      this.showFirstTip();
    }, 2000);
  },

  onShow() {
    console.log('登录占位页面显示');
  },

  onReady() {
    console.log('登录占位页面准备完成');
  },

  /**
   * 显示第一次提示
   */
  showFirstTip() {
    console.log('显示第一次提示');
    wx.showModal({
      title: '提示',
      content: '该登录方式待开发，请优先使用微信一键登录',
      showCancel: false,
      confirmText: '我知道了',
      success: () => {
        // 用户确认后，3秒后切换背景图
        setTimeout(() => {
          this.switchBackgroundImage();
        }, 100);
      }
    });
  },

  /**
   * 切换背景图片
   */
  switchBackgroundImage() {
    console.log('切换背景图片');
    this.setData({
      currentImage: 'https://p0.meituan.net/hackathonqjj/fab633f7efe4a68b209796245716f751116309.png',
      isFirstImage: false
    });
    
    // 3秒后显示第二次提示
    setTimeout(() => {
      this.showSecondTip();
    }, 1500);
  },

  /**
   * 显示第二次提示
   */
  showSecondTip() {
    console.log('显示第二次提示');
    wx.showModal({
      title: '提示',
      content: '该登录方式待开发，请优先使用微信一键登录',
      showCancel: false,
      confirmText: '我知道了',
      success: () => {
        // 用户确认后，跳转到首页
        setTimeout(() => {
          this.navigateToHome();
        }, 100);
      }
    });
  },

  /**
   * 跳转到首页
   */
  navigateToHome() {
    console.log('跳转到首页');
    
    // 使用保存的重定向URL或默认首页
    let redirectUrl = this.data.redirectUrl || '/pages/index/index';
    
    // 确保redirectUrl格式正确
    if (redirectUrl && !redirectUrl.startsWith('/pages/')) {
      redirectUrl = '/pages/index/index';
    }
    
    console.log('重定向目标:', redirectUrl);
    
    wx.redirectTo({
      url: redirectUrl,
      success: () => {
        console.log('跳转到目标页面成功');
      },
      fail: (error) => {
        console.error('跳转到目标页面失败:', error);
        wx.showToast({
          title: '页面跳转失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  }
}); 