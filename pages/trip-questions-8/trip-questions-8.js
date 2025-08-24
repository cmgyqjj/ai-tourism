// trip-questions-8.js
Page({
  data: {
    // 页面标题 - 动态生成
    pageTitle: '',
    
    // 当前步骤
    currentStep: 7,
    totalSteps: 11,
    
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
      title: '住宿1晚你接受的价格区间是? ',
      options: [
        { id: 1, text: '¥ 100–500 (经济型)', selected: false },
        { id: 2, text: '¥ 500–1000 (性价比型)', selected: false },
        { id: 3, text: '¥ 1000–1500 (舒适型)', selected: false },
        { id: 4, text: '¥ 1500–2000 (品质型)', selected: false },
        { id: 5, text: '¥ 2000–4000 (高端型)', selected: false },
        { id: 6, text: '¥ 4000以上 (奢华型)', selected: false }
      ]
    },
    
    // 已选择的选项
    selectedOptions: []
  },

  onLoad(options) {
    console.log('trip-questions-8页面加载，参数:', options)
    
    // 检查登录状态
    const { requireLogin } = require('../../utils/auth.js')
    if (!requireLogin()) {
      return
    }
    
        // 直接从缓存中读取行程信息
    this.loadTripInfoFromCache()
    
    // 初始化页面数据
    this.initPageData()
  },

  // 从缓存中加载行程信息
  loadTripInfoFromCache() {
    const tripInfo = wx.getStorageSync('currentTripInfo')
    
    if (tripInfo && tripInfo.destination && tripInfo.duration) {
      this.setData({
        tripInfo: tripInfo
      })
      
      // 生成动态页面标题
      this.generatePageTitle()
      
      // 生成用户头像列表
      this.generateUserAvatars()
      
      console.log('从缓存加载的行程信息:', tripInfo)
    } else {
      console.error('缓存中没有找到有效的行程信息')
      wx.showToast({
        title: '请先创建行程',
        icon: 'none',
        duration: 2000
      })
      
      // 延迟返回创建行程页面
      setTimeout(() => {
        wx.navigateBack()
      }, 2000)
    }
  },

  // 生成动态页面标题
  generatePageTitle() {
    const { destination, duration, companionCount } = this.data.tripInfo
    
    if (destination && duration && companionCount) {
      // 格式化搭子数量显示
      let companionText = ''
      const companionCountNum = parseInt(companionCount) || 0
      const totalPeople = companionCountNum + 1 // 搭子数量 + 自己
      
      if (totalPeople === 1) {
        companionText = '1人'
      } else if (totalPeople === 2) {
        companionText = '2人组'
      } else {
        companionText = `${totalPeople}人组`
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
    const savedOptions = wx.getStorageSync('tripQuestions8SelectedOptions') || []
    console.log('从缓存恢复选项:', savedOptions)
    
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
      console.log('选项状态已恢复，下一步按钮应该可用')
    } else {
      console.log('没有缓存的选项，所有选项都是未选择状态')
    }
  },

  // 选择选项
  selectOption(e) {
    const { optionId } = e.currentTarget.dataset
    const { question, selectedOptions } = this.data
    
    console.log('点击选项:', optionId, '当前已选择:', selectedOptions)
    
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
    
    // 保存到缓存 - 存储完整的选项信息
    const selectedOptionDetails = this.data.question.options
      .filter(option => newSelectedOptions.includes(option.id))
      .map(option => ({
        id: option.id,
        text: option.text,
        icon: option.icon
      }))
    
    wx.setStorageSync('tripQuestions8SelectedOptions', selectedOptionDetails)
    
    console.log('选择选项:', optionId, '已选择数量:', newSelectedOptions.length, '新选择列表:', newSelectedOptions)
    console.log('保存到缓存的选项详情:', selectedOptionDetails)
    console.log('选项状态已更新，下一步按钮应该变为可用状态')
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
    
    console.log('选择的住宿预算范围:', selectedTexts)
    
    // 直接跳转到下一个问题页面（不再传递tripInfo参数）
    wx.redirectTo({
      url: '/pages/trip-questions-9/trip-questions-9',
      success: () => {
        console.log('跳转到第9个问题页面成功')
      },
      fail: (error) => {
        console.error('跳转到第9个问题页面失败:', error)
        wx.showToast({
          title: '页面跳转失败',
          icon: 'none',
          duration: 2000
        })
      }
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
    console.log('trip-questions-8页面显示')
  },

  // 页面隐藏
  onHide() {
    console.log('trip-questions-8页面隐藏')
  }
})