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
  },
  
  // 组件生命周期
  attached() {
    console.log('首页组件加载')
    this.initUserInfo()
    this.checkTeamInvite()
  },
  
  pageLifetimes: {
    show() {
      console.log('首页页面显示')
      this.initUserInfo()
      this.checkTeamInvite()
    }
  },
  methods: {
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
    
    // 检查团队邀请
    checkTeamInvite() {
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]
      const options = currentPage.options
      
      if (options && options.teamId) {
        console.log('检测到团队邀请:', options.teamId)
        this.setData({ currentTeamId: options.teamId })
        
        // 检查登录状态
        const userId = wx.getStorageSync('userId')
        if (!userId) {
          // 未登录，跳转登录页并带redirect回传
          const redirect = encodeURIComponent(`/pages/index/index?teamId=${options.teamId}`)
          wx.navigateTo({
            url: `/pages/login-placeholder/login-placeholder?redirect=${redirect}`
          })
          return
        }
        
        // 已登录，拉取团队详情
        this.fetchTeamDetail(options.teamId)
      }
    },
    
    // 拉取团队详情
    fetchTeamDetail(teamId) {
      wx.showLoading({ title: '加载中...' })
      
      // 调用团队详情接口
      wx.request({
        url: `https://meituan.mynatapp.cc/api/teams/detail?teamId=${teamId}`,
        method: 'GET',
        success: (res) => {
          wx.hideLoading()
          
          if (res.data && res.data.code === 0) {
            const teamData = res.data.data
            
            // 检查团队是否满员
            if (teamData.memberCount >= teamData.maxMembers) {
              // 显示满员提示弹窗
              this.setData({
                'fullTeamModal.open': true
              })
            } else {
              // 显示正常邀请弹窗
              this.setData({
                teamInfo: teamData,
                'invite.open': true
              })
            }
            
            console.log('团队详情获取成功:', teamData)
          } else {
            wx.showToast({
              title: res.data?.msg || '获取团队信息失败',
              icon: 'none',
              duration: 2000
            })
          }
        },
        fail: (error) => {
          wx.hideLoading()
          console.error('获取团队详情失败:', error)
          wx.showToast({
            title: '网络错误，请重试',
            icon: 'none',
            duration: 2000
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
        wx.navigateTo({
          url: '/pages/featured-topics/featured-topics'
        })
      }, '/pages/featured-topics/featured-topics')
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

    // 跳转到行程计划页面
    goToPlan() {
      console.log('跳转到行程计划页面')
      
      // 使用认证工具检查登录状态
      withLogin(() => {
        wx.navigateTo({
          url: '/pages/trip-plans/trip-plans'
        })
      }, '/pages/trip-plans/trip-plans')
    },

    // 分享功能
    onShareAppMessage() {
      const promise = new Promise(resolve => {
        setTimeout(() => {
          resolve({
            title: '我的旅行计划 - 去哪 Whatever',
            path: 'pages/index/index',
            imageUrl: 'https://p0.meituan.net/hackathonqjj/0ec13a2a63f03daac48863d1fa57995f6194.png',
            withShareTicket: true,
            miniprogramType: 0,
            scene: 0,
          })
        }, 1000)
      })
      
      return {
        title: '我的旅行计划 - 去哪 Whatever',
        path: 'pages/index/index',
        imageUrl: 'https://p0.meituan.net/hackathonqjj/0ec13a2a63f03daac48863d1fa57995f6194.png',
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
        imageUrl: 'https://p0.meituan.net/hackathonqjj/0ec13a2a63f03daac48863d1fa57995f6194.png',
        query: 'from=timeline'
      }
    },
    
    // 团队邀请相关方法
    // 接受邀请
    acceptInvite() {
      const { teamInfo, currentTeamId } = this.data
      const userId = wx.getStorageSync('userId')
      
      if (!userId) {
        wx.showToast({
          title: '请先登录',
          icon: 'none',
          duration: 2000
        })
        return
      }
      
      // 设置loading状态
      this.setData({ 'invite.loading': true })
      
      // 调用加入接口
      wx.request({
        url: `https://meituan.mynatapp.cc/api/teams/join?teamId=${currentTeamId}&userId=${userId}`,
        method: 'POST',
        success: (res) => {
          this.setData({ 'invite.loading': false })
          
          if (res.data && res.data.code === 0) {
            wx.showToast({
              title: '加入成功！',
              icon: 'success',
              duration: 2000
            })
            
            // 关闭弹窗
            this.setData({ 'invite.open': false })
            
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
    
    // 拒绝邀请
    declineInvite() {
      const { currentTeamId } = this.data
      
      // 可选：上报拒绝
      const userId = wx.getStorageSync('userId')
      if (userId) {
        wx.request({
          url: `https://meituan.mynatapp.cc/api/teams/decline?teamId=${currentTeamId}&userId=${userId}`,
          method: 'POST',
          success: (res) => {
            console.log('拒绝邀请上报成功:', res.data)
          },
          fail: (error) => {
            console.error('拒绝邀请上报失败:', error)
          }
        })
      }
      
      // 关闭弹窗
      this.closeInviteModal()
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
      const { teamInfo, currentTeamId } = this.data
      
      // 构建行程信息
      const tripInfo = {
        destination: teamInfo.place,
        duration: teamInfo.duration,
        companionCount: (teamInfo.maxMembers - 1).toString(),
        currentUser: {
          avatarUrl: wx.getStorageSync('userInfo')?.avatarUrl || '',
          nickName: wx.getStorageSync('userInfo')?.nickName || '我'
        },
        teamId: currentTeamId
      }
      
      // 跳转到第一个问题页面
      wx.navigateTo({
        url: `/pages/trip-questions-1/trip-questions-1?tripInfo=${encodeURIComponent(JSON.stringify(tripInfo))}`
      })
    },
  },
})
