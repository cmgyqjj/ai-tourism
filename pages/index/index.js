// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const { withLogin, requireLogin } = require('../../utils/auth.js')

Component({
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
  },
  methods: {
    // 事件处理函数
    bindViewTap() {
      wx.navigateTo({
        url: '../logs/logs'
      })
    },
    onChooseAvatar(e) {
      const { avatarUrl } = e.detail
      const { nickName } = this.data.userInfo
      this.setData({
        "userInfo.avatarUrl": avatarUrl,
        hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
      })
    },
    onInputChange(e) {
      const nickName = e.detail.value
      const { avatarUrl } = this.data.userInfo
      this.setData({
        "userInfo.nickName": nickName,
        hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
      })
    },
    getUserProfile(e) {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      wx.getUserProfile({
        desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log(res)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    },
    
    // 悬浮框相关方法
    showAiModal() {
      // AI攻略需要登录
      withLogin(() => {
        this.setData({
          showModal: true
        })
      })
    },
    
    hideModal() {
      this.setData({
        showModal: false
      })
    },
    
    createNewTrip() {
      console.log('创建新行程')
      // 创建行程需要登录
      withLogin(() => {
        wx.navigateTo({
          url: '/pages/create-trip/create-trip'
        })
        this.hideModal()
      })
    },
    
    editPastPlans() {
      console.log('编辑过往方案')
      // 编辑过往方案需要登录
      withLogin(() => {
        wx.showToast({
          title: '编辑过往方案',
          icon: 'success'
        })
        this.hideModal()
      })
    },

    // 跳转到个人中心页面（先检查登录状态）
    goToLogin() {
      console.log('检查登录状态')
      
      // 使用认证工具检查登录状态，未登录时跳转到未登录页面
      withLogin(() => {
        wx.navigateTo({
          url: '/pages/user-center/user-center'
        })
      }, '/pages/user-center/user-center', '/pages/user-center-not-logged/user-center-not-logged')
    },

    // 查看行程详情（需要登录）
    viewTripDetail(e) {
      const tripId = e.currentTarget.dataset.tripId
      console.log('查看行程详情:', tripId)
      
      // 使用认证工具检查登录状态
      withLogin(() => {
        wx.navigateTo({
          url: `/pages/trip-detail/trip-detail?tripId=${tripId}`
        })
      }, `/pages/trip-detail/trip-detail?tripId=${tripId}`)
    },

    // 查看行程详情地图（需要登录）
    viewTripDetailMap() {
      console.log('查看行程详情地图')
      
      // 使用认证工具检查登录状态
      withLogin(() => {
        // 准备行程数据，模拟从问题页面收集的数据
        const tripData = {
          days: this.generateTripDays(),
          dayInfo: this.generateDayInfo(),
          tripInfo: {
            destination: '法意12日舒适游',
            duration: '12天',
            startDate: '2025年1月1日',
            endDate: '2025年1月12日',
            budget: '¥15000',
            tags: ['舒适游', '欧洲', '法意']
          }
        }
        
        // 跳转到行程详情地图页面
        wx.navigateTo({
          url: '/pages/trip-detail-map/trip-detail-map?tripData=' + encodeURIComponent(JSON.stringify(tripData))
        })
      }, '/pages/trip-detail-map/trip-detail-map')
    },

    // 添加新行程（需要登录）
    addNewTrip() {
      console.log('添加新行程')
      
      // 使用认证工具检查登录状态
      withLogin(() => {
        wx.navigateTo({
          url: '/pages/create-trip/create-trip'
        })
      }, '/pages/create-trip/create-trip')
    },

    // 查看灵感专题详情（需要登录）
    viewTopicDetail(e) {
      const topic = e.currentTarget.dataset.topic
      console.log('查看灵感专题:', topic)
      
      // 使用认证工具检查登录状态
      withLogin(() => {
        wx.showToast({
          title: '灵感专题功能开发中',
          icon: 'none'
        })
      })
    },

    // 查看更多灵感专题（需要登录）
    viewMoreTopics() {
      console.log('查看更多灵感专题')
      
      // 使用认证工具检查登录状态
      withLogin(() => {
        wx.showToast({
          title: '更多灵感专题功能开发中',
          icon: 'none'
        })
      })
    },

    // 显示搜索功能（需要登录）
    showSearch() {
      console.log('显示搜索功能')
      
      // 使用认证工具检查登录状态
      withLogin(() => {
        wx.showToast({
          title: '搜索功能开发中',
          icon: 'none'
        })
      })
    },

    // 查看行程计划（需要登录）
    viewTripPlans() {
      console.log('查看行程计划')
      
      // 使用认证工具检查登录状态
      withLogin(() => {
        wx.showToast({
          title: '行程计划功能开发中',
          icon: 'none'
        })
      })
    },

    // 分享功能
    onShareAppMessage() {
      const promise = new Promise(resolve => {
        setTimeout(() => {
          resolve({
            title: '我的旅行计划 - 去哪 Whatever',
            path: 'pages/index/index',
            imageUrl: '/images/img.png',
            withShareTicket: true,
            miniprogramType: 0,
            scene: 0,
          })
        }, 1000)
      })
      
      return {
        title: '我的旅行计划 - 去哪 Whatever',
        path: 'pages/index/index',
        imageUrl: '/images/img.png',
        withShareTicket: true,
        miniprogramType: 0,
        scene: 0,
        promise
      }
    },

    // 生成行程天数数据
    generateTripDays() {
      const days = 12 // 法意12日游
      const tripDays = []
      for (let i = 1; i <= days; i++) {
        tripDays.push({
          day: i,
          date: this.formatDate(i),
          route: '北京 > 巴黎 > 罗马',
          weather: this.getRandomWeather()
        })
      }
      return tripDays
    },

    // 生成日期信息
    formatDate(day) {
      // 从2025年1月1日开始计算
      const startDate = new Date(2025, 0, 1)
      const futureDate = new Date(startDate.getTime() + (day - 1) * 24 * 60 * 60 * 1000)
      const month = (futureDate.getMonth() + 1).toString().padStart(2, '0')
      const date = futureDate.getDate().toString().padStart(2, '0')
      return `${month}月${date}日`
    },

    // 获取随机天气
    getRandomWeather() {
      const weathers = ['☀️', '⛅', '🌧️', '❄️', '🌤️']
      return weathers[Math.floor(Math.random() * weathers.length)]
    },

    // 生成每日详情信息
    generateDayInfo() {
      return {
        route: '巴黎 > 罗马',
        flight: 'CA1234 北京-巴黎 08:00-12:00',
        accommodation: '巴黎香格里拉酒店 - 豪华套房',
        food: [
          {
            image: '/images/shoye/logo.png',
            name: '法式餐厅',
            price: 200,
            distance: 0.5,
            time: 10,
            location: '巴黎市中心'
          }
        ],
        attractions: [
          {
            image: '/images/shoye/logo.png',
            name: '埃菲尔铁塔',
            description: '巴黎地标建筑',
            distance: 1.2,
            time: 20,
            location: '巴黎7区'
          }
        ],
        hotels: [
          {
            image: '/images/shoye/logo.png',
            name: '巴黎香格里拉酒店',
            price: 1500,
            nights: 1
          }
        ]
      }
    },

    // 分享到朋友圈
    onShareTimeline() {
      return {
        title: '我的旅行计划 - 去哪 Whatever',
        imageUrl: '/images/img.png',
        query: 'from=timeline'
      }
    },
  },
})
