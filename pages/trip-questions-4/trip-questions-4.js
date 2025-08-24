// trip-questions-4.js
Page({
  data: {
    // 页面标题 - 动态生成
    pageTitle: '',
    
    // 当前步骤
    currentStep: 5,
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
      title: '本次旅行有哪些是你个人特别想去的「人生必去景点」?(多选)',
      options: [
        // 法国景点
        { id: 1, text: '埃菲尔铁塔', icon: '', country: '法国', selected: false },
        { id: 2, text: '卢浮宫', icon: '️', country: '法国', selected: false },
        { id: 3, text: '凡尔赛宫', icon: '', country: '法国', selected: false },
        { id: 4, text: '普罗旺斯', icon: '', country: '法国', selected: false },
        { id: 5, text: '尼斯海滩', icon: '️', country: '法国', selected: false },
        { id: 6, text: '戛纳', icon: '', country: '法国', selected: false },
        { id: 7, text: '花神咖啡馆', icon: '', country: '法国', selected: false },
        { id: 8, text: '奥赛博物馆', icon: '', country: '法国', selected: false },
        { id: 9, text: '其他/没想好', icon: '', country: '法国', selected: false },
        
        // 意大利景点
        { id: 10, text: '罗马斗兽场', icon: '️', country: '意大利', selected: false },
        { id: 11, text: '比萨斜塔', icon: '', country: '意大利', selected: false },
        { id: 12, text: '圣马可广场', icon: '', country: '意大利', selected: false },
        { id: 13, text: '五渔村', icon: '', country: '意大利', selected: false },
        { id: 14, text: '许愿池', icon: '', country: '意大利', selected: false },
        { id: 15, text: '万神殿', icon: '️', country: '意大利', selected: false },
        { id: 16, text: '真理之口', icon: '', country: '意大利', selected: false },
        { id: 17, text: '米兰大教堂', icon: '', country: '意大利', selected: false },
        { id: 18, text: '其他/没想好', icon: '', country: '意大利', selected: false }
      ]
    },
    
    // 已选择的选项
    selectedOptions: []
  },

  onLoad(options) {
    console.log('trip-questions-4页面加载，参数:', options)
    
    // 检查登录状态
    const { requireLogin } = require('../../utils/auth.js')
    if (!requireLogin()) {
      return
    }
    
    // 处理传递的行程信息
    if (options.tripInfo) {
      try {
        const tripInfo = JSON.parse(decodeURIComponent(options.tripInfo))
        console.log('解析后的tripInfo:', tripInfo)
        
        if (tripInfo && Object.keys(tripInfo).length > 0) {
          this.setData({
            tripInfo: tripInfo
          })
          
          // 生成动态页面标题
          this.generatePageTitle()
          
          // 生成用户头像列表
          this.generateUserAvatars()
          
          console.log('接收到的行程信息:', tripInfo)
        } else {
          console.error('tripInfo数据为空或无效')
          wx.showToast({
            title: '行程信息无效，请重新开始',
            icon: 'none'
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 3
            })
          }, 2000)
          return
        }
      } catch (error) {
        console.error('解析行程信息失败:', error)
        wx.showToast({
          title: '行程信息解析失败，请重新开始',
          icon: 'none'
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 3
          })
        }, 2000)
        return
      }
    } else {
      // 没有行程信息时返回上一页
      console.error('没有接收到tripInfo参数')
      wx.showToast({
        title: '缺少行程信息，请重新开始',
        icon: 'none'
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 3
        })
      }, 2000)
      return
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
    const savedOptions = wx.getStorageSync('tripQuestions4SelectedOptions') || []
    console.log('从缓存恢复选项:', savedOptions)
    
    if (savedOptions.length > 0) {
      // 提取ID列表用于恢复选中状态
      const savedOptionIds = savedOptions.map(option => option.id)
      
      const updatedOptions = this.data.question.options.map(option => ({
        ...option,
        selected: savedOptionIds.includes(option.id)
      }))
      
      this.setData({
        question: { ...this.data.question, options: updatedOptions },
        selectedOptions: savedOptionIds
      })
      
      console.log('恢复已选择的选项ID:', savedOptionIds)
      console.log('恢复已选择的选项详情:', savedOptions)
    } else {
      console.log('没有缓存的选项，所有选项都是未选择状态')
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
    
    // 保存到缓存 - 存储完整的选项信息
    const selectedOptionDetails = this.data.question.options
      .filter(option => newSelectedOptions.includes(option.id))
      .map(option => ({
        id: option.id,
        text: option.text,
        icon: option.icon
      }))
    
    wx.setStorageSync('tripQuestions4SelectedOptions', selectedOptionDetails)
    
    console.log('选择选项:', optionId, '已选择数量:', newSelectedOptions.length)
    console.log('保存到缓存的选项详情:', selectedOptionDetails)
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
    
    console.log('选择的人生必去景点:', selectedTexts)
    
    // 将行程信息传递给下一个页面
    const nextPageUrl = `/pages/trip-questions-5/trip-questions-5?tripInfo=${encodeURIComponent(JSON.stringify(tripInfo))}`
    
    // 跳转到下一个问题页面
    wx.redirectTo({
      url: nextPageUrl,
      success: () => {
        console.log('跳转到第5个问题页面成功')
      },
      fail: (error) => {
        console.error('跳转到第5个问题页面失败:', error)
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
    console.log('trip-questions-4页面显示')
  },

  // 页面隐藏
  onHide() {
    console.log('trip-questions-4页面隐藏')
  }
}) 