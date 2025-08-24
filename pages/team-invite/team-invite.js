// team-invite.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0fMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const { withLogin, requireLogin } = require('../../utils/auth.js')

Page({
  data: {
    motto: 'Hello World',
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
    showModal: false, // 控制悬浮框显示
    
    // URL参数
    urlParams: {
      userId: '',
      teamId: ''
    },
    
    // 团队邀请弹窗相关
    invite: {
      open: false,
      loading: false
    },
    teamInfo: null, // 团队详情数据
    currentTeamId: '', // 当前邀请的团队ID
    
    // 满员提示弹窗
    fullTeamModal: {
      open: false
    },
    
    // 团队邀请弹窗
    teamInviteModal: {
      show: false,
      initiatorAvatar: 'https://ai-public.mastergo.com/ai/img_res/c1f76d3ef0a0d573caf9c713106c45f1.jpg', // 发起人头像
      teammateAvatar: '', // 队友头像（当前用户）
      teamName: '爱玩旅行攻略',
      tripInfo: '法意12日游',
      teamId: ''
    },
    
    // API调用状态
    apiStatus: {
      loading: false,
      canJoin: false,
      error: ''
    }
  },
  
  // 页面生命周期
  onLoad(options) {
    console.log('团队邀请页面加载，参数:', options)
    
    // 获取URL参数
    if (options.userId && options.teamId) {
      this.setData({
        'urlParams.userId': options.userId,
        'urlParams.teamId': options.teamId,
        'teamInviteModal.teamId': options.teamId
      })
      
      // 调用API检查是否可以加入团队
      this.checkTeamJoinStatus(options.teamId, options.userId)
    }
    
    this.initUserInfo()
  },
  
  onShow() {
    console.log('团队邀请页面显示')
    this.initUserInfo()
  },
  
  // 初始化用户信息
  initUserInfo() {
    // 尝试从本地存储获取用户信息
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo && userInfo.avatarUrl) {
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true
      })
      console.log('从本地存储获取到用户信息:', userInfo)
    } else {
      // 如果没有本地存储的用户信息，尝试获取用户信息
      this.tryGetUserInfo()
    }
  },
  
  // 尝试获取用户信息
  tryGetUserInfo() {
    wx.getUserInfo({
      success: (res) => {
        console.log('获取用户信息成功:', res.userInfo)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        // 保存到本地存储
        wx.setStorageSync('userInfo', res.userInfo)
      },
      fail: (err) => {
        console.log('获取用户信息失败:', err)
        // 使用默认头像
        this.setData({
          userInfo: {
            avatarUrl: defaultAvatarUrl,
            nickName: ''
          },
          hasUserInfo: false
        })
      }
    })
  },
  
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  
  // 显示团队邀请弹窗
  showTeamInviteModal() {
    this.setData({
      'teamInviteModal.show': true
    })
  },
  
  // 隐藏团队邀请弹窗
  hideTeamInviteModal() {
    this.setData({
      'teamInviteModal.show': false
    })
  },
  
  // 接受邀请
  acceptInvite() {
    if (!this.data.hasUserInfo) {
      // 如果用户未登录，跳转到未登录页面
      wx.navigateTo({
        url: '/pages/user-center-not-logged/user-center-not-logged',
        success: () => {
          console.log('跳转到用户未登录页面成功')
          this.hideTeamInviteModal()
        },
        fail: (error) => {
          console.error('跳转到用户未登录页面失败:', error)
        }
      })
    } else {
      // 如果用户已登录，调用加入团队API
      console.log('用户已登录，接受邀请')
      this.joinTeam()
    }
  },
  
  // 拒绝邀请
  rejectInvite() {
    this.hideTeamInviteModal()
    wx.showToast({
      title: '已拒绝邀请',
      icon: 'none'
    })
  },
  
  /**
   * 检查团队加入状态
   */
  checkTeamJoinStatus(teamId, userId) {
    console.log('检查团队加入状态:', { teamId, userId })
    
    this.setData({
      'apiStatus.loading': true
    })
    
    wx.request({
      url: `https://meituan.mynatapp.cc/api/teams/${teamId}/${userId}/join`,
      method: 'POST',
      success: (res) => {
        console.log('检查团队加入状态API响应:', res)
        this.setData({
          'apiStatus.loading': false
        })
        
        if (res.data && res.data.code === 0) {
          // 可以加入
          this.setData({
            'apiStatus.canJoin': true
          })
          console.log('可以加入团队')
        } else {
          // 无法加入
          this.setData({
            'apiStatus.canJoin': false,
            'apiStatus.error': res.data?.msg || '无法加入团队'
          })
          console.log('无法加入团队:', res.data?.msg)
        }
      },
      fail: (error) => {
        console.error('检查团队加入状态失败:', error)
        this.setData({
          'apiStatus.loading': false,
          'apiStatus.canJoin': false,
          'apiStatus.error': '网络错误，请重试'
        })
      }
    })
  },
  
  /**
   * 加入团队
   */
  joinTeam() {
    const { urlParams } = this.data
    
    if (!urlParams.teamId) {
      wx.showToast({
        title: '团队ID无效',
        icon: 'none'
      })
      return
    }
    
    // 显示加载状态
    this.setData({ 'invite.loading': true })
    
    wx.request({
      url: `https://meituan.mynatapp.cc/api/teams/${urlParams.teamId}/join`,
      method: 'POST',
      data: {
        userId: wx.getStorageSync('userId')
      },
      success: (res) => {
        console.log('加入团队API响应:', res)
        
        if (res.data && res.data.code === 0) {
          wx.showToast({
            title: '加入成功！',
            icon: 'success',
            duration: 2000
          })
          
          // 关闭弹窗
          this.hideTeamInviteModal()
          
          // 延迟跳转到问答页面
          setTimeout(() => {
            this.navigateToQuestions()
          }, 2000)
        } else {
          wx.showToast({
            title: res.data?.msg || '加入失败',
            icon: 'none',
            duration: 2000
          })
        }
        
        this.setData({ 'invite.loading': false })
      },
      fail: (error) => {
        this.setData({ 'invite.loading': false })
        console.error('加入团队失败:', error)
        wx.showToast({
          title: '网络错误，请重试',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  
  // 关闭邀请弹窗
  closeInviteModal() {
    this.setData({ 'invite.open': false })
  },
  
  // 关闭满员弹窗
  closeFullTeamModal() {
    this.setData({ 'fullTeamModal.open': false })
  },
  
  // 点击背景关闭弹窗
  onModalBackgroundTap() {
    this.closeInviteModal()
    this.closeFullTeamModal()
  },
  
  // 阻止事件冒泡
  stopPropagation() {
    // 空函数，用于阻止事件冒泡
  },
  
  // 跳转到问答页面
  navigateToQuestions() {
    // 从URL参数获取团队ID
    const { urlParams } = this.data
    
    // 从本地存储获取行程信息，如果没有则使用默认值
    const tripInfo = wx.getStorageSync('currentTripInfo') || {
      destination: '未知目的地',
      duration: '未知时长',
      companionCount: '0',
      currentUser: {
        avatarUrl: wx.getStorageSync('userInfo')?.avatarUrl || '',
        nickName: wx.getStorageSync('userInfo')?.nickName || '我'
      },
      teamId: urlParams.teamId
    }
    
    // 确保teamId是最新的
    tripInfo.teamId = urlParams.teamId
    
    // 保存到缓存
    wx.setStorageSync('currentTripInfo', tripInfo)
    console.log('保存到缓存的行程信息:', tripInfo)
    
    // 跳转到第一个问题页面
    wx.navigateTo({
      url: '/pages/trip-questions-1/trip-questions-1'
    })
  }
})
