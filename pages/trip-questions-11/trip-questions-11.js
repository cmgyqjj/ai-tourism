// trip-questions-11.js
Page({
  data: {
    // 页面标题 - 动态生成
    pageTitle: '',
    
    // 当前步骤
    currentStep: 12,
    totalSteps: 13,
    
    // 行程信息
    tripInfo: {
      destination: '',
      duration: '',
      companionCount: '',
      currentUser: {
        avatarUrl: '',
        nickName: ''
      }
    },
    
    // 用户头像 - 动态生成
    userAvatars: [],
    
    // 问题数据
    question: {
      title: '你的每日活动倾向: (单选)',
      options: [
        { id: 1, text: '轻松躺平 (上午10点后出发,每日≤3个景点)', icon: '', selected: false },
        { id: 2, text: '高效打卡 (早出晚归,经典景点全覆盖)', icon: '', selected: false },
        { id: 3, text: '平衡型 (上午深度游玩,下午自由活动)', icon: '', selected: false }
      ]
    },
    
    // 已选择的选项
    selectedOptions: []
  },

  onLoad(options) {
    console.log('trip-questions-11页面加载，参数:', options)
    
    // 检查登录状态
    const { requireLogin } = require('../../utils/auth.js')
    if (!requireLogin()) {
      return
    }
    
    // 处理传递的行程信息
    if (options.tripInfo) {
      try {
        const tripInfo = JSON.parse(decodeURIComponent(options.tripInfo))
        this.setData({
          tripInfo: tripInfo
        })
        
        // 生成动态页面标题
        this.generatePageTitle()
        
        // 生成用户头像列表
        this.generateUserAvatars()
        
        console.log('接收到的行程信息:', tripInfo)
      } catch (error) {
        console.error('解析行程信息失败:', error)
        // 使用默认标题
        this.setData({
          pageTitle: '创建行程'
        })
      }
    } else {
      // 没有行程信息时使用默认标题
      this.setData({
        pageTitle: '创建行程'
      })
    }
    
    // 初始化页面数据
    this.initPageData()
  },

  // 生成动态页面标题
  generatePageTitle() {
    const { destination, duration, companionCount } = this.data.tripInfo
    
    if (destination && duration && companionCount) {
      // 格式化搭子数量显示
      let companionText = ''
      if (companionCount === '1') {
        companionText = '1人'
      } else if (companionCount === '2') {
        companionText = '2人组'
      } else {
        companionText = `${companionCount}人组`
      }
      
      // 格式化时长显示，只显示天数
      let durationText = ''
      if (duration.includes('天')) {
        // 如果已经是"X天"格式，直接使用
        durationText = duration
      } else if (duration.includes('年') && duration.includes('月') && duration.includes('日')) {
        // 如果是完整日期格式，提取天数
        const daysMatch = duration.match(/(\d+)天/)
        if (daysMatch) {
          durationText = daysMatch[1] + '日'
        } else {
          durationText = '几日'
        }
      } else {
        // 其他格式，尝试提取数字
        const numberMatch = duration.match(/(\d+)/)
        if (numberMatch) {
          durationText = numberMatch[1] + '日'
        } else {
          durationText = '几日'
        }
      }
      
      // 生成标题：目的地 + 几日游 + 搭子数量
      const pageTitle = `${destination}${durationText}游 (${companionText})`
      
      this.setData({
        pageTitle: pageTitle
      })
      
      console.log('生成的页面标题:', pageTitle)
    } else {
      // 信息不完整时使用默认标题
      this.setData({
        pageTitle: '创建行程'
      })
    }
  },

  // 生成用户头像列表
  generateUserAvatars() {
    const { companionCount, currentUser } = this.data.tripInfo
    
    if (!companionCount) return
    
    const companionCountNum = parseInt(companionCount) || 0
    const avatars = []
    
    // 第一个头像始终是当前用户
    avatars.push({
      id: 1,
      type: 'current',
      name: currentUser.nickName || '我',
      avatarUrl: currentUser.avatarUrl || '',
      isCurrentUser: true
    })
    
    // 根据搭子数量添加其他头像
    if (companionCountNum > 0) {
      // 添加搭子头像
      for (let i = 1; i <= companionCountNum; i++) {
        avatars.push({
          id: i + 1,
          type: 'companion',
          name: `搭子${i}`,
          avatarUrl: '',
          isCurrentUser: false
        })
      }
    }
    
    this.setData({
      userAvatars: avatars
    })
    
    console.log('生成的用户头像:', avatars)
  },

  // 初始化页面数据
  initPageData() {
    // 从缓存中恢复已选择的选项
    const savedOptions = wx.getStorageSync('tripQuestions11SelectedOptions') || []
    if (savedOptions.length > 0) {
      const updatedOptions = this.data.question.options.map(option => ({
        ...option,
        selected: savedOptions.includes(option.id)
      }))
      
      this.setData({
        question: { ...this.data.question, options: updatedOptions },
        selectedOptions: savedOptions
      })
      
      console.log('恢复已选择的选项:', savedOptions)
    }
  },

  // 选择选项
  selectOption(e) {
    const { optionId } = e.currentTarget.dataset
    const { question, selectedOptions } = this.data
    
    // 更新选项状态
    const updatedOptions = question.options.map(option => {
      if (option.id === optionId) {
        return { ...option, selected: !option.selected }
      }
      return option
    })
    
    // 更新已选择的选项列表
    let newSelectedOptions = []
    if (selectedOptions.includes(optionId)) {
      // 取消选择
      newSelectedOptions = selectedOptions.filter(id => id !== optionId)
    } else {
      // 添加选择
      newSelectedOptions = [...selectedOptions, optionId]
    }
    
    this.setData({
      question: { ...question, options: updatedOptions },
      selectedOptions: newSelectedOptions
    })
    
    // 保存到缓存
    wx.setStorageSync('tripQuestions11SelectedOptions', newSelectedOptions)
    
    console.log('选择选项:', optionId, '已选择数量:', newSelectedOptions.length)
  },

  // 下一步
  nextStep() {
    const { selectedOptions, tripInfo } = this.data
    
    if (selectedOptions.length === 0) {
      wx.showToast({
        title: '请至少选择一个选项',
        icon: 'none'
      })
      return
    }
    
    // 保存选择结果
    const selectedTexts = this.data.question.options
      .filter(option => selectedOptions.includes(option.id))
      .map(option => option.text)
    
    console.log('选择的每日活动倾向:', selectedTexts)
    
    // 将行程信息传递给下一个页面
      const nextPageUrl = '/pages/trip-questions-12/trip-questions-12?tripInfo=' + encodeURIComponent(JSON.stringify(tripInfo))
      
      // 跳转到下一个问题页面
      wx.navigateTo({
        url: nextPageUrl
      })
  },

  // 返回上一页
  goBack() {
    wx.navigateBack({
      delta: 1
    })
  },

  // 页面显示
  onShow() {
    console.log('trip-questions-11页面显示')
  },

  // 页面隐藏
  onHide() {
    console.log('trip-questions-11页面隐藏')
  }
})