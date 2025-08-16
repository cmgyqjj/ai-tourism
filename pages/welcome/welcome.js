Page({
  data: {
    agreed: false,
    redirectUrl: null,
    isPhoneLogin: false,
    phoneNumber: '138****8888', // 示例手机号，中间用XXX隐藏
    isLoading: false,
    avatarUrl: null // 新增：用于存储用户选择的头像URL
  },

  onLoad(options) {
    console.log('欢迎页面加载完成', options);
    
    // 检查是否有重定向URL
    if (options.redirect) {
      this.setData({
        redirectUrl: decodeURIComponent(options.redirect)
      });
      console.log('设置重定向URL:', this.data.redirectUrl);
    }
  },

  onShow() {
    console.log('欢迎页面显示');
  },

  onReady() {
    console.log('欢迎页面准备完成');
  },

  /**
   * 检查用户是否同意协议
   */
  checkAgreement() {
    if (!this.data.agreed) {
      wx.showModal({
        title: '提示',
        content: '请先阅读并同意用户协议和隐私政策',
        showCancel: false,
        confirmText: '我知道了'
      });
      return false;
    }
    return true;
  },

  /**
   * 头像选择回调
   */
  onChooseAvatar(e) {
    console.log('头像选择回调:', e);
    
    if (this.data.isLoading) {
      console.log('正在登录中，请稍候');
      return;
    }

    if (e.detail.avatarUrl) {
      console.log('用户选择了头像:', e.detail.avatarUrl);
      
      // 保存头像信息到本地缓存
      wx.setStorageSync('userAvatar', e.detail.avatarUrl);
      console.log('头像已缓存:', e.detail.avatarUrl);
      
      // 保存头像信息到页面数据
      this.setData({
        avatarUrl: e.detail.avatarUrl,
        isLoading: true
      });
      
      // 显示加载提示
      wx.showLoading({
        title: '登录中...',
        mask: true
      });
      
      // 直接进行登录（使用头像信息）
      this.loginWithAvatar(e.detail.avatarUrl);
    } else {
      console.log('用户取消选择头像');
      wx.showToast({
        title: '请选择头像',
        icon: 'none',
        duration: 2000
      });
    }
  },

  /**
   * 使用头像进行登录
   */
  loginWithAvatar(avatarUrl) {
    console.log('使用头像进行登录:', avatarUrl);
    
    // 模拟登录成功（实际项目中这里应该调用后端接口）
    setTimeout(() => {
      console.log('登录成功');
      
      // 保存用户信息到本地缓存
      const userInfo = {
        avatarUrl: avatarUrl,
        loginTime: new Date().getTime(),
        isLoggedIn: true,
        userId: `user_${Date.now()}`, // 生成用户ID
        nickName: '微信用户' // 默认昵称
      };
      
      // 分别缓存头像和用户信息
      wx.setStorageSync('userAvatar', avatarUrl);
      wx.setStorageSync('userInfo', userInfo);
      wx.setStorageSync('isLoggedIn', true);
      
      console.log('用户信息已缓存:', userInfo);
      console.log('头像已缓存:', avatarUrl);
      
      // 隐藏加载提示
      wx.hideLoading();
      
      // 重置加载状态
      this.setData({
        isLoading: false
      });
      
      // 显示登录成功提示
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 1500
      });
      
      // 延迟跳转，让用户看到成功提示
      setTimeout(() => {
        this.navigateAfterLogin();
      }, 1500);
    }, 2000);
  },

  /**
   * 登录成功后跳转
   */
  navigateAfterLogin() {
    console.log('登录成功，准备跳转');
    
    // 在重定向之前调用接口
    this.callTestEnvApi(() => {
      // 接口调用完成后的回调，执行重定向逻辑
      this.executeRedirect();
    });
  },

  /**
   * 调用test/env接口
   */
  callTestEnvApi(callback) {
    console.log('开始调用localhost:10000/test/env接口');
    
    wx.request({
      url: 'http://localhost:10000/test/env',
      method: 'GET',
      success: (res) => {
        console.log('test/env接口调用成功，返回值:', res.data);
        console.log('完整响应对象:', res);
        
        // 调用回调函数继续执行重定向
        if (callback && typeof callback === 'function') {
          callback();
        }
      },
      fail: (error) => {
        console.error('test/env接口调用失败:', error);
        
        // 即使接口调用失败，也继续执行重定向
        if (callback && typeof callback === 'function') {
          callback();
        }
      }
    });
  },

  /**
   * 执行重定向逻辑
   */
  executeRedirect() {
    if (this.data.redirectUrl) {
      console.log('跳转到重定向页面:', this.data.redirectUrl);
      
      // 验证URL格式
      let targetUrl = this.data.redirectUrl;
      
      // 确保URL以/开头
      if (!targetUrl.startsWith('/')) {
        targetUrl = '/' + targetUrl;
      }
      
      // 检查是否是有效的页面路径
      if (!targetUrl.startsWith('/pages/')) {
        console.error('无效的重定向URL:', targetUrl);
        this.navigateToDefault();
        return;
      }
      
      console.log('处理后的重定向URL:', targetUrl);
      
      wx.redirectTo({
        url: targetUrl,
        success: () => {
          console.log('跳转到重定向页面成功');
        },
        fail: (error) => {
          console.error('跳转到重定向页面失败:', error);
          // 跳转失败时，跳转到默认页面
          this.navigateToDefault();
        }
      });
    } else {
      this.navigateToDefault();
    }
  },

  /**
   * 跳转到默认页面
   */
  navigateToDefault() {
    console.log('跳转到默认首页');
    wx.redirectTo({
      url: '/pages/index/index',
      success: () => {
        console.log('跳转到首页成功');
      },
      fail: (error) => {
        console.error('跳转到首页失败:', error);
        wx.showToast({
          title: '页面跳转失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },

  /**
   * 协议勾选状态切换事件
   */
  onAgreementToggle() {
    console.log('协议勾选框被点击');
    const newAgreed = !this.data.agreed;
    this.setData({
      agreed: newAgreed
    });
    console.log('协议勾选状态已切换为:', newAgreed);
  },

  /**
   * 隐私政策链接点击事件
   */
  onPrivacyPolicy() {
    console.log('点击隐私政策链接');
    wx.showModal({
      title: '隐私政策',
      content: '这里是隐私政策的内容，您可以在这里查看详细的隐私保护条款。',
      showCancel: false,
      confirmText: '我知道了'
    });
  },

  /**
   * 用户协议链接点击事件
   */
  onUserAgreement() {
    console.log('点击用户协议链接');
    wx.showModal({
      title: '用户协议',
      content: '这里是用户协议的内容，您可以在这里查看详细的使用条款。',
      showCancel: false,
      confirmText: '我知道了'
    });
  },

  /**
   * AI万登录
   */
  onAiwanLogin() {
    console.log('点击AI万登录');
    if (!this.checkAgreement()) {
      return;
    }
    
    // 跳转到登录占位页面
    wx.navigateTo({
      url: '/pages/login-placeholder/login-placeholder',
      success: () => {
        console.log('跳转到登录占位页面成功');
      },
      fail: (error) => {
        console.error('跳转到登录占位页面失败:', error);
        wx.showToast({
          title: '页面跳转失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },

  /**
   * 微信登录
   */
  onWechatLogin() {
    console.log('点击微信登录');
    if (!this.checkAgreement()) {
      return;
    }
    
    // 跳转到登录占位页面
    wx.navigateTo({
      url: '/pages/login-placeholder/login-placeholder',
      success: () => {
        console.log('跳转到登录占位页面成功');
      },
      fail: (error) => {
        console.error('跳转到登录占位页面失败:', error);
        wx.showToast({
          title: '页面跳转失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },

  /**
   * 微信一键登录
   */
  onWechatOneClickLogin(e) {
    console.log('微信一键登录回调:', e);
    
    // 检查是否同意协议
    if (!this.checkAgreement()) {
      return;
    }
    
    if (this.data.isLoading) {
      console.log('正在登录中，请稍候');
      return;
    }

    // 检查用户是否授权
    if (e.detail.errMsg !== 'getUserInfo:ok') {
      console.log('用户拒绝授权:', e.detail.errMsg);
      wx.showToast({
        title: '需要授权才能登录',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    this.setData({ isLoading: true });
    wx.showLoading({ title: '登录中...', mask: true });
    
    // 获取用户信息
    const userInfo = e.detail.userInfo;
    console.log('获取到用户信息:', userInfo);
    
    // 模拟微信一键登录
    setTimeout(() => {
      console.log('微信一键登录成功');
      wx.hideLoading();
      this.setData({ isLoading: false });
      
      // 保存用户信息到本地缓存
      wx.setStorageSync('userInfo', userInfo);
      wx.setStorageSync('userAvatar', userInfo.avatarUrl);
      wx.setStorageSync('isLoggedIn', true);
      wx.setStorageSync('loginType', 'wechat_one_click');
      
      console.log('用户信息已缓存:', userInfo);
      
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 1500
      });
      
      setTimeout(() => {
        this.navigateAfterLogin();
      }, 1500);
    }, 2000);
  },

  /**
   * 手机号登录
   */
  onPhoneLogin() {
    console.log('点击手机号登录');
    if (!this.checkAgreement()) {
      return;
    }
    
    // 跳转到登录占位页面
    wx.navigateTo({
      url: '/pages/login-placeholder/login-placeholder',
      success: () => {
        console.log('跳转到登录占位页面成功');
      },
      fail: (error) => {
        console.error('跳转到登录占位页面失败:', error);
        wx.showToast({
          title: '页面跳转失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },

  /**
   * 其他登录方式
   */
  onOtherLogin() {
    console.log('点击其他登录方式');
    if (!this.checkAgreement()) {
      return;
    }
    
    // 跳转到登录占位页面
    wx.navigateTo({
      url: '/pages/login-placeholder/login-placeholder',
      success: () => {
        console.log('跳转到登录占位页面成功');
      },
      fail: (error) => {
        console.error('跳转到登录占位页面失败:', error);
        wx.showToast({
          title: '页面跳转失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },

  /**
   * Apple登录
   */
  onAppleLogin() {
    console.log('点击Apple登录');
    if (!this.checkAgreement()) {
      return;
    }
    
    // 跳转到登录占位页面
    wx.navigateTo({
      url: '/pages/login-placeholder/login-placeholder',
      success: () => {
        console.log('跳转到登录占位页面成功');
      },
      fail: (error) => {
        console.error('跳转到登录占位页面失败:', error);
        wx.showToast({
          title: '页面跳转失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  }
}); 