// trip-detail.js
Page({
  data: {
    tripId: '',
    tripInfo: null,
    isLoading: true,
    isJoined: false,
    companions: [],
    showJoinModal: false
  },

  onLoad(options) {
    console.log('trip-detail页面加载，参数:', options)
    
    // 检查登录状态
    const { requireLogin } = require('../../utils/auth.js')
    if (!requireLogin()) {
      return
    }
    
    // 从分享链接中获取行程ID
    if (options.tripId) {
      this.setData({
        tripId: options.tripId
      })
      this.loadTripDetail(options.tripId)
    } else if (options.scene) {
      // 处理扫码进入的情况
      this.handleScene(options.scene)
    } else {
      wx.showToast({
        title: '无效的分享链接',
        icon: 'error'
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    }
  },

  // 处理扫码场景
  handleScene(scene) {
    try {
      // 解码场景值
      const decodedScene = decodeURIComponent(scene)
      console.log('解码后的场景值:', decodedScene)
      
      // 这里可以根据实际业务逻辑解析场景值
      // 假设场景值格式为: tripId=xxx
      if (decodedScene.includes('tripId=')) {
        const tripId = decodedScene.split('tripId=')[1]
        this.setData({
          tripId: tripId
        })
        this.loadTripDetail(tripId)
      } else {
        wx.showToast({
          title: '无效的分享链接',
          icon: 'error'
        })
      }
    } catch (error) {
      console.error('处理场景值失败:', error)
      wx.showToast({
        title: '链接解析失败',
        icon: 'error'
      })
    }
  },

  // 加载行程详情
  loadTripDetail(tripId) {
    console.log('加载行程详情:', tripId)
    
    // 模拟加载数据
    setTimeout(() => {
      const mockTripInfo = {
        id: tripId,
        destination: '东京',
        duration: '5天',
        startDate: '2024-03-15',
        endDate: '2024-03-19',
        companionCount: 4,
        currentCompanions: 2,
        description: '春季樱花季东京之旅，体验日本传统文化与现代都市的完美融合。',
        itinerary: [
          { day: 1, title: '抵达东京', activities: ['成田机场', '酒店入住', '浅草寺'] },
          { day: 2, title: '东京市区游', activities: ['东京塔', '银座购物', '秋叶原'] },
          { day: 3, title: '迪士尼乐园', activities: ['东京迪士尼乐园一日游'] },
          { day: 4, title: '富士山一日游', activities: ['富士山五合目', '忍野八海'] },
          { day: 5, title: '返程', activities: ['上野公园', '机场返程'] }
        ],
        budget: '8000-12000元',
        tags: ['樱花季', '文化体验', '购物', '美食']
      }
      
      this.setData({
        tripInfo: mockTripInfo,
        isLoading: false,
        companions: [
          { id: 1, name: '小明', avatar: '/images/chengdu-panda.svg', isCreator: true },
          { id: 2, name: '小红', avatar: '/images/shanghai-night.svg', isCreator: false }
        ]
      })
    }, 1000)
  },

  // 加入行程
  joinTrip() {
    console.log('用户请求加入行程:', this.data.tripId)
    
    // 检查用户是否已登录
    const userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      wx.showModal({
        title: '提示',
        content: '请先登录后再加入行程',
        confirmText: '去登录',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login'
            })
          }
        }
      })
      return
    }

    // 检查是否已满员
    if (this.data.tripInfo.currentCompanions >= this.data.tripInfo.companionCount) {
      wx.showToast({
        title: '行程已满员',
        icon: 'none'
      })
      return
    }

    // 显示加入确认弹窗
    this.setData({
      showJoinModal: true
    })
  },

  // 确认加入
  confirmJoin() {
    console.log('确认加入行程')
    
    // 模拟加入成功
    wx.showLoading({
      title: '加入中...'
    })
    
    setTimeout(() => {
      wx.hideLoading()
      
      // 更新本地数据
      const newCompanion = {
        id: Date.now(),
        name: '新成员',
        avatar: '/images/beijing-food.svg',
        isCreator: false
      }
      
      const companions = [...this.data.companions, newCompanion]
      const currentCompanions = this.data.tripInfo.currentCompanions + 1
      
      this.setData({
        companions: companions,
        'tripInfo.currentCompanions': currentCompanions,
        isJoined: true,
        showJoinModal: false
      })
      
      wx.showToast({
        title: '加入成功！',
        icon: 'success'
      })
    }, 1500)
  },

  // 取消加入
  cancelJoin() {
    this.setData({
      showJoinModal: false
    })
  },

  // 阻止事件冒泡
  stopPropagation() {
    // 空函数，用于阻止事件冒泡
  },

  // 返回上一页
  goBack() {
    wx.navigateBack()
  },

  // 分享功能
  onShareAppMessage() {
    const { tripInfo } = this.data
    if (!tripInfo) {
      return {
        title: '邀请你加入我的旅行计划',
        path: '/pages/trip-detail/trip-detail',
        imageUrl: '/images/img.png'
      }
    }
    
    return {
      title: `邀请你加入${tripInfo.destination}${tripInfo.duration}旅行`,
      path: `/pages/index/index?teamId=${tripInfo.id}`,
      imageUrl: '/images/img.png'
    }
  },

  // 分享到朋友圈
  onShareTimeline() {
    const { tripInfo } = this.data
    if (!tripInfo) {
      return {
        title: '邀请你加入我的旅行计划',
        imageUrl: '/images/img.png',
      }
    }
    
    return {
      title: `邀请你加入${tripInfo.destination}${tripInfo.duration}旅行`,
      imageUrl: '/images/img.png',
      query: `tripId=${tripInfo.id}`
    }
  }
}) 