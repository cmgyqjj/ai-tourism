// trip-plans.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
  },

  onLoad(options) {
    console.log('行程计划页面加载')
    this.initUserInfo()
  },

  onShow() {
    console.log('行程计划页面显示')
    this.initUserInfo()
  },

  // 返回上一页
  goBack() {
    wx.navigateBack({
      delta: 1
    })
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
      // 如果没有本地存储的用户信息，使用默认头像
      this.setData({
        userInfo: {
          avatarUrl: defaultAvatarUrl,
          nickName: ''
        },
        hasUserInfo: false
      })
    }
  },

  // 查看行程详情地图
  viewTripDetailMap() {
    console.log('查看行程详情地图')
    
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

  // 分享功能
  onShareAppMessage() {
    return {
      title: '行程计划 - 去哪 Whatever',
      path: 'pages/trip-plans/trip-plans',
      imageUrl: '/images/shoye/logo.png'
    }
  },

  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: '行程计划 - 去哪 Whatever',
      imageUrl: '/images/shoye/logo.png'
    }
  }
}) 