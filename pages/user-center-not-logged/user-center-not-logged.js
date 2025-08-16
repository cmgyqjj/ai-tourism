Page({
  data: {
    // 页面数据
  },

  onLoad(options) {
    console.log('个人中心未登录页面加载完成', options);
  },

  onShow() {
    console.log('个人中心未登录页面显示');
  },

  onReady() {
    console.log('个人中心未登录页面准备完成');
  },

  /**
   * 点击图片跳转到登录页面
   */
  onImageTap() {
    console.log('点击图片，跳转到登录页面');
    
    // 获取重定向参数
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    let redirectUrl = currentPage.options.redirect || '/pages/user-center/user-center';
    
    // 确保redirectUrl格式正确
    if (redirectUrl && !redirectUrl.startsWith('/pages/')) {
      redirectUrl = '/pages/user-center/user-center';
    }
    
    console.log('重定向目标:', redirectUrl);
    
    wx.navigateTo({
      url: `/pages/welcome/welcome?redirect=${encodeURIComponent(redirectUrl)}`,
      success: () => {
        console.log('跳转到登录页面成功');
      },
      fail: (error) => {
        console.error('跳转到登录页面失败:', error);
        wx.showToast({
          title: '页面跳转失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  }
}); 