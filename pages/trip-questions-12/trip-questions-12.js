// trip-questions-12.js
Page({
  data: {
    // 页面标题 - 动态生成
    pageTitle: '',
    
    // 当前步骤
    currentStep: 11,
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
      title: '是否有需要特别照顾的情况?(多选)',
      options: [
        { id: 1, text: '同行有儿童 (需亲子设施)', icon: '', selected: false },
        { id: 2, text: '同行有老人/行动不便者 (需无障碍通道)', icon: '', selected: false },
        { id: 3, text: '摄影爱好者 (需标注最佳拍摄时间/点位)', icon: '', selected: false },
        { id: 4, text: '可能会来经期 (不能水上运动)', icon: '', selected: false },
        { id: 5, text: '其他 (例如:中间会安排当地朋友见面等)', icon: '', selected: false }
      ]
    },
    
    // 已选择的选项
    selectedOptions: [],
    
    // 是否显示完成按钮
    showCompletionButtons: false
  },

  onLoad(options) {
    console.log('trip-questions-12页面加载，参数:', options)
    
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
    const savedOptions = wx.getStorageSync('tripQuestions12SelectedOptions') || []
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
    
    wx.setStorageSync('tripQuestions12SelectedOptions', selectedOptionDetails)
    
    console.log('选择选项:', optionId, '已选择数量:', newSelectedOptions.length)
    console.log('保存到缓存的选项详情:', selectedOptionDetails)
    
    // 检查是否所有问题都已完成
    this.checkCompletionStatus()
  },

  // 检查完成状态
  checkCompletionStatus() {
    // 这里可以添加更多的完成条件检查
    // 暂时简单判断是否选择了选项
    if (this.data.selectedOptions.length > 0) {
      this.setData({
        showCompletionButtons: true
      })
      console.log('显示完成按钮')
    }
  },

  // 生成行程
  generateTrip() {
    console.log('生成行程')
    
    // 检查tripInfo是否完整
    if (!this.data.tripInfo || !this.data.tripInfo.destination || !this.data.tripInfo.duration) {
      wx.showToast({
        title: '行程信息不完整，请返回重新创建',
        icon: 'none',
        duration: 3000
      })
      return
    }
    
    // 收集所有问题的答案
    const allAnswers = this.collectAllQuestionAnswers()
    console.log('收集到的所有问题答案:', allAnswers)
    
    // 获取用户ID
    const userId = wx.getStorageSync('userId')
    if (!userId) {
      wx.showToast({
        title: '用户信息不完整，请重新登录',
        icon: 'none',
        duration: 2000
      })
      return
    }
    
    // 显示加载提示
    wx.showLoading({
      title: '正在生成行程...',
      mask: true
    })
    
    // 调用生成行程接口
    this.callGenerateTripApi(userId, allAnswers)
  },

  /**
   * 收集所有问题的答案
   */
  collectAllQuestionAnswers() {
    // 动态收集所有缓存的问题和答案
    const allAnswers = {}
    
    // 定义新的问题编号顺序（跳过6和7）
    const questionNumbers = [1, 2, 3, 3.5, 4, 5, 8, 9, 10, 11, 12]
    
    for (let questionNumber of questionNumbers) {
      let cacheKey = ''
      
      if (questionNumber === 3.5) {
        // 处理3.5的情况
        cacheKey = 'tripQuestions3_5SelectedOptions'
      } else {
        cacheKey = `tripQuestions${questionNumber}SelectedOptions`
      }
      
      const answers = wx.getStorageSync(cacheKey) || []
      if (answers.length > 0) {
        // 获取选项框里面的具体内容
        const answerTexts = answers.map(answer => {
          // 如果answer是对象，获取其text属性（选项框的内容）
          if (typeof answer === 'object' && answer.text) {
            return answer.text
          }
          // 如果answer是字符串，直接使用
          else if (typeof answer === 'string') {
            return answer
          }
          // 其他情况，尝试获取其他可能的属性
          else if (typeof answer === 'object') {
            return answer.content || answer.name || answer.value || JSON.stringify(answer)
          }
          // 最后兜底
          else {
            return String(answer)
          }
        }).join('#') // 使用#进行分割拼接
        
        // 使用问题页面的实际标题作为键
        const questionTitle = this.getQuestionTitle(questionNumber)
        allAnswers[questionTitle] = answerTexts
        console.log(`${questionTitle}的答案:`, answerTexts)
      } else {
        const questionTitle = this.getQuestionTitle(questionNumber)
        allAnswers[questionTitle] = '未回答'
        console.log(`${questionTitle}: 未回答`)
      }
    }
    
    return allAnswers
  },

  /**
   * 根据问题编号获取对应的标题
   */
  getQuestionTitle(questionNumber) {
    const titles = {
      1: '你和本次同行人的关系?(多选)',
      2: 'Pick你的旅行偏好 (多选)',
      3: 'Pick你的交通方式 (多选)',
      3.5: '希望本次是什么旅行主题? (多选)',
      4: '本次旅行有哪些是你个人特别想去的「人生必去景点」?(多选)',
      5: '以下哪些体验会严重影响你的旅行心情? (Ai将优化行程,避免踩雷)',
      8: '住宿1晚你接受的价格区间是? ',
      9: '每日就餐你最在意的是? (单选)',
      10: '在外每餐预算是? (单选)',
      11: '你的每日活动倾向?(单选)',
      12: '是否有需要特别照顾的情况?(多选)'
    }
    return titles[questionNumber] || `问题${questionNumber}`
  },

  /**
   * 调用生成行程接口
   */
  callGenerateTripApi(userId, content) {
    console.log('开始调用生成行程接口，参数:', { userId, content })
    
    // 将content转换为JSON字符串
    const contentJson = JSON.stringify(content)
    
    // 获取目的地和天数信息
    const destination = this.data.tripInfo.destination || ''
    const days = this.generateTripDays()
    
    wx.request({
      url: `https://meituan.mynatapp.cc/api/preferences/user?content=${encodeURIComponent(contentJson)}&userId=${userId}&ext=null&destination=${encodeURIComponent(destination)}&days=${days}`,
      method: 'POST',
      timeout: 1000, // 设置超时时间为10分钟（600000毫秒）
      success: (res) => {
        console.log('生成行程接口调用成功，返回值:', res.data)
        console.log('完整响应对象:', res)
        
        // 隐藏加载提示
        wx.hideLoading()
        
        // 处理接口返回结果
        if (res.data && res.data.code === 0) {
          wx.showToast({
            title: '行程生成成功！',
            icon: 'success',
            duration: 2000
          })
          
          // 准备行程数据
          const tripData = {
            destination: this.data.tripInfo.destination, // 添加目的地
            days: this.generateTripDays(), // 使用计算的天数
            dayInfo: this.generateDayInfo(),
            tripInfo: this.data.tripInfo // 传递完整的行程信息
          }
          
          console.log('准备跳转，行程数据:', tripData)
          console.log('tripInfo详情:', this.data.tripInfo)
          
          // 延迟跳转，让用户看到成功提示
          setTimeout(() => {
            wx.redirectTo({
              url: '/pages/trip-detail-map/trip-detail-map?tripData=' + encodeURIComponent(JSON.stringify(tripData))
            })
          }, 2000)
        } else {
          wx.showToast({
            title: res.data?.msg || '生成行程失败',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: (error) => {
        console.error('生成行程接口调用失败:', error)
        
        // 隐藏加载提示
        wx.hideLoading()
        
        // 尝试调用备用接口查询最新行程
        this.callBackupApi(userId)
      }
    })
  },

  /**
   * 调用备用接口查询最新行程
   */
  callBackupApi(userId) {
    console.log('开始调用备用接口查询最新行程，userId:', userId)
    
    wx.showLoading({
      title: '查询最新行程...',
      mask: true
    })
    
    wx.request({
      url: `https://meituan.mynatapp.cc/api/plans/tripsNew?userId=${userId}`,
      method: 'GET',
      timeout: 30000, // 30秒超时
      success: (res) => {
        console.log('备用接口调用成功，返回值:', res.data)
        
        // 隐藏加载提示
        wx.hideLoading()
        
        // 处理接口返回结果
        if (res.data && res.data.code === 0 && res.data.data) {
          // 新接口返回的是对象，不是数组
          const planData = res.data.data
          console.log('获取到新接口行程数据:', planData)
          
          // 解析行程内容
          this.parseAndProcessPlan(planData)
        } else {
          wx.showToast({
            title: '没有找到可用行程',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: (error) => {
        console.error('备用接口调用失败:', error)
        
        // 隐藏加载提示
        wx.hideLoading()
        
        wx.showToast({
          title: '查询失败，请重试',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  /**
   * 解析并处理行程数据
   */
  parseAndProcessPlan(plan) {
    try {
      console.log('解析新接口返回的行程数据:', plan)
      
      // 新接口直接返回结构化数据，不需要解析contentJson
      const tripData = this.extractNewTripData(plan)
      
      // 显示成功提示
      wx.showToast({
        title: '获取行程成功！',
        icon: 'success',
        duration: 2000
      })
      
      // 延迟跳转，让用户看到成功提示
      setTimeout(() => {
        wx.redirectTo({
          url: '/pages/trip-detail-map/trip-detail-map?tripData=' + encodeURIComponent(JSON.stringify(tripData))
        })
      }, 2000)
      
    } catch (error) {
      console.error('解析行程数据失败:', error)
      wx.showToast({
        title: '行程数据格式错误',
        icon: 'none',
        duration: 2000
      })
    }
  },

  /**
   * 从新接口数据中提取行程信息
   */
  extractNewTripData(plan) {
    console.log('开始提取新接口数据，plan:', plan)
    
    const tripInfo = this.data.tripInfo || {}
    
    // 构建行程数据
    const tripData = {
      destination: plan.destination || '未知目的地',
      days: plan.scheduleCount || 0,
      tripInfo: {
        ...tripInfo,
        title: plan.planTitle || '个性化行程',
        totalBudget: plan.totalBudget || '未知',
        highlights: plan.highlights || [],
        specialExperience: plan.specialExperience || '未知'
      },
      // 添加新接口的完整数据
      newPlanData: plan
    }
    
    console.log('提取的新接口行程数据:', tripData)
    console.log('数据验证:', {
      destination: tripData.destination,
      days: tripData.days,
      title: tripData.tripInfo.title,
      hasNewPlanData: !!tripData.newPlanData
    })
    
    return tripData
  },

  /**
   * 从行程安排生成天数信息
   */
  generateDayInfoFromPlan(tripArrangements) {
    return tripArrangements.map((day, index) => {
      const dayNumber = index + 1
      const dateInfo = day.日期 || `第${dayNumber}天`
      const city = day.城市 || '未知城市'
      
      return {
        day: dayNumber,
        date: this.extractDateFromString(dateInfo),
        city: city,
        route: day.交通方式 || '',
        accommodation: day.住宿地点 || '',
        morning: day.游玩项目?.上午 || {},
        afternoon: day.游玩项目?.下午 || {},
        evening: day.游玩项目?.晚上 || {},
        breakfast: day.餐饮?.早餐 || {},
        lunch: day.餐饮?.午餐 || {},
        dinner: day.餐饮?.晚餐 || {},
        dailyCost: day.费用?.日均总费用 || 0,
        tips: day.小贴士和注意事项 || ''
      }
    })
  },

  /**
   * 从日期字符串中提取日期信息
   */
  extractDateFromString(dateString) {
    // 匹配日期格式：第1天（2025-06-01）
    const dateMatch = dateString.match(/\((\d{4}-\d{2}-\d{2})\)/)
    if (dateMatch) {
      const date = new Date(dateMatch[1])
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      return `${month}月${day}日`
    }
    
    // 如果没有日期信息，返回默认格式
    return `${(new Date().getMonth() + 1).toString().padStart(2, '0')}月${new Date().getDate().toString().padStart(2, '0')}日`
  },

  // 生成行程天数数据
  generateTripDays() {
    const { duration, days } = this.data.tripInfo
    console.log('原始duration值:', duration, '类型:', typeof duration)
    console.log('原始days值:', days, '类型:', typeof days)
    console.log('完整的tripInfo:', this.data.tripInfo)
    
    // 优先使用days字段
    if (days && days > 0) {
      console.log('使用days字段:', days)
      return days
    }
    
    let calculatedDays = 12 // 默认值
    
    if (!duration) {
      console.error('duration为空，使用默认值12天')
    } else if (typeof duration === 'string') {
      // 检查是否是日期范围格式（如：2025年1月1日 - 2025年1月12日）
      const dateRangeMatch = duration.match(/(\d{4})年(\d{1,2})月(\d{1,2})日\s*-\s*(\d{4})年(\d{1,2})月(\d{1,2})日/)
      
      if (dateRangeMatch) {
        // 解析日期范围
        const startYear = parseInt(dateRangeMatch[1])
        const startMonth = parseInt(dateRangeMatch[2])
        const startDay = parseInt(dateRangeMatch[3])
        const endYear = parseInt(dateRangeMatch[4])
        const endMonth = parseInt(dateRangeMatch[5])
        const endDay = parseInt(dateRangeMatch[6])
        
        const startDate = new Date(startYear, startMonth - 1, startDay)
        const endDate = new Date(endYear, endMonth - 1, endDay)
        
        // 计算天数差（包含开始和结束日期）
        const timeDiff = endDate.getTime() - startDate.getTime()
        calculatedDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1
        
        console.log('日期范围解析:', {
          startDate: startDate.toDateString(),
          endDate: endDate.toDateString(),
          calculatedDays: calculatedDays
        })
      } else if (duration.includes('天')) {
        // 灵活天数模式：提取数字
        const daysMatch = duration.match(/(\d+)天/)
        if (daysMatch) {
          calculatedDays = parseInt(daysMatch[1])
          console.log('灵活天数模式，提取到天数:', calculatedDays)
        }
      } else {
        // 尝试提取其他数字
        const numberMatch = duration.match(/(\d+)/)
        if (numberMatch) {
          calculatedDays = parseInt(numberMatch[1])
          console.log('其他格式，提取到数字:', calculatedDays)
        }
      }
    }
    
    console.log('最终计算的天数:', calculatedDays)
    return calculatedDays
  },

  // 生成日期信息
  formatDate(day) {
    const { duration } = this.data.tripInfo
    
    // 检查是否有日期范围信息
    const dateRangeMatch = duration.match(/(\d{4})年(\d{1,2})月(\d{1,2})日\s*-\s*(\d{4})年(\d{1,2})月(\d{1,2})日/)
    
    if (dateRangeMatch) {
      // 使用实际的开始日期
      const startYear = parseInt(dateRangeMatch[1])
      const startMonth = parseInt(dateRangeMatch[2])
      const startDay = parseInt(dateRangeMatch[3])
      const startDate = new Date(startYear, startMonth - 1, startDay)
      
      // 从开始日期计算，第1天就是开始日期，第2天是开始日期+1天，以此类推
      const futureDate = new Date(startDate.getTime() + (day - 1) * 24 * 60 * 60 * 1000)
      const month = (futureDate.getMonth() + 1).toString().padStart(2, '0')
      const date = futureDate.getDate().toString().padStart(2, '0')
      return `${month}月${date}日`
    } else {
      // 如果没有日期范围，从今天开始计算
      const now = new Date()
      const futureDate = new Date(now.getTime() + (day - 1) * 24 * 60 * 60 * 1000)
      const month = (futureDate.getMonth() + 1).toString().padStart(2, '0')
      const date = futureDate.getDate().toString().padStart(2, '0')
      return `${month}月${date}日`
    }
  },

  // 获取随机天气
  getRandomWeather() {
    const weathers = ['☀️', '☁️', '🌧️', '⛅']
    return weathers[Math.floor(Math.random() * weathers.length)]
  },

  // 生成当天行程信息
  generateDayInfo() {
    console.log('generateDayInfo - tripInfo:', this.data.tripInfo)
    console.log('generateDayInfo - destination:', this.data.tripInfo?.destination)
    
    return {
      route: this.data.tripInfo?.destination || '北京—巴黎',
      flight: '机场 巴黎 - 戴高乐机场',
      accommodation: '住宿建议 巴黎景区附近 (1,7,9区)',
      food: [
        {
          name: '花神咖啡馆',
          price: '100',
          distance: '3.2',
          time: '15',
          location: 'Café de Flore, Paris',
          image: 'https://p0.meituan.net/hackathonqjj/066f1f168c7a71a45bf97c3771862cab74240.png'
        }
      ],
      attractions: [
        {
          name: '塞纳河',
          description: '夜游塞纳河拍照打卡',
          distance: '1.2',
          time: '5',
          location: 'Seine River, Paris',
          image: '/images/seine.jpg'
        }
      ],
      hotels: [
        {
          name: 'Prais万豪(第7',
          nights: '1',
          price: '1028',
          image: '/images/hotel.jpg'
        }
      ]
    }
  },

  // 重做一遍
  redoQuestions() {
    console.log('重做一遍')
    
    wx.showModal({
      title: '确认重做',
      content: '确定要重新回答所有问题吗？',
      success: (res) => {
        if (res.confirm) {
          // 清除所有缓存的问题答案
          this.clearAllQuestionAnswers()
          
          // 跳转到第一个问题页面
          const firstPageUrl = '/pages/trip-questions-1/trip-questions-1?tripInfo=' + encodeURIComponent(JSON.stringify(this.data.tripInfo))
          
          wx.redirectTo({
            url: firstPageUrl
          })
        }
      }
    })
  },

  // 清除所有问题答案
  clearAllQuestionAnswers() {
    // 清除所有问题页面的缓存
    const questionPages = [
      'tripQuestions1SelectedOptions',
      'tripQuestions2SelectedOptions',
      'tripQuestions3SelectedOptions',
      'tripQuestions3_5SelectedOptions', // 3.5页面
      'tripQuestions4SelectedOptions',
      'tripQuestions5SelectedOptions',
      'tripQuestions6SelectedOptions',
      'tripQuestions7SelectedOptions',
      'tripQuestions8SelectedOptions',
      'tripQuestions9SelectedOptions',
      'tripQuestions10SelectedOptions',
      'tripQuestions11SelectedOptions',
      'tripQuestions12SelectedOptions'
    ]
    
    questionPages.forEach(key => {
      wx.removeStorageSync(key)
    })
    
    // 清除创建行程页面的缓存
    wx.removeStorageSync('createTripSelectedDestinations')
    
    console.log('已清除所有问题答案缓存')
  },




  // 返回上一页
  goBack() {
    wx.navigateBack({
      delta: 1
    })
  },

  // 页面显示
  onShow() {
    console.log('trip-questions-12页面显示')
  },

  // 页面隐藏
  onHide() {
    console.log('trip-questions-12页面隐藏')
  }
})