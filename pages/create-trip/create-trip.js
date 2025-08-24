// create-trip.js
Page({
  data: {
    showSelector: false,
    showTimeSelector: false,
    selectedDestination: '',
    flexibleDurationText: '', // 灵活天数显示文本
    companionCount: '', // 旅行搭子数量
    userAvatar: '', // 当前用户头像，为空时显示占位符
    remainingCompanions: 0, // 还需要添加的搭子数量
    companionAvatars: [], // 搭子头像列表
    hasShared: false, // 是否已经分享过
    tabType: 'single', // 'single' 或 'multiple'
    searchKeyword: '',
    currentCategory: 'current',
    currentCategoryName: '当前位置',
    currentTeamId: '', // 当前团队ID
    hasCreatedTeam: false, // 是否已经通过分享创建了团队
    teamInfo: {
      id: '',
      name: '',
      destination: '',
      duration: '',
      maxMembers: 4
    },
    // 多选目的地相关数据
    selectedDestinations: [], // 多选模式下已选择的目的地
    // 时间选择器相关数据
    isFlexible: false,
    selectedDays: 0,
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth() + 1,
    calendarDays: [],
    selectedRange: {
      start: null,
      end: null,
      display: '',
      days: 0
    },
    categories: [
      { key: 'history', name: '历史/热门' },
      { key: 'domestic', name: '国内' },
      { key: 'international', name: '国际/中国港澳台' },
      { key: 'asia', name: '中国港澳台、日韩' },
      { key: 'southeast', name: '东南亚' },
      { key: 'europe', name: '欧洲' },
      { key: 'americas', name: '美洲' },
      { key: 'visa', name: '免签落地签' },
      { key: 'islands', name: '精选海岛' }
    ],
    destinationsData: {
      history: [
        { id: 7, name: '东京', codes: 'NRT、HND' },
        { id: 8, name: '曼谷', codes: 'BKK、DMK' },
        { id: 9, name: '巴黎', codes: 'CDG、ORY' },
        { id: 10, name: '罗马', codes: 'FCO' },
        { id: 11, name: '香港', codes: 'HKG' }
      ],
      domestic: [
        { id: 15, name: '深圳', codes: 'SZX' },
        { id: 16, name: '成都', codes: 'CTU' },
        { id: 17, name: '杭州', codes: 'HGH' },
        { id: 18, name: '西安', codes: 'XIY' },
        { id: 19, name: '重庆', codes: 'CKG' }
      ],
      international: [
        { id: 21, name: '香港', codes: 'HKG' },
        { id: 22, name: '澳门', codes: 'MFM' },
        { id: 23, name: '台北', codes: 'TPE' },
        { id: 24, name: '首尔', codes: 'ICN、GMP' },
        { id: 25, name: '大阪', codes: 'KIX' }
      ],
      asia: [
        { id: 26, name: '香港', codes: 'HKG' },
        { id: 27, name: '澳门', codes: 'MFM' },
        { id: 28, name: '台北', codes: 'TPE' },
        { id: 29, name: '首尔', codes: 'ICN、GMP' },
        { id: 30, name: '东京', codes: 'NRT、HND' },
        { id: 31, name: '大阪', codes: 'KIX' }
      ],
      southeast: [
        { id: 32, name: '曼谷', codes: 'BKK、DMK' },
        { id: 33, name: '新加坡', codes: 'SIN' },
        { id: 34, name: '吉隆坡', codes: 'KUL' },
        { id: 35, name: '马尼拉', codes: 'MNL' },
        { id: 36, name: '胡志明市', codes: 'SGN' }
      ],
      europe: [
        { id: 37, name: '巴黎', codes: 'CDG、ORY' },
        { id: 38, name: '伦敦', codes: 'LHR、LGW' },
        { id: 39, name: '罗马', codes: 'FCO' },
        { id: 40, name: '米兰', codes: 'MXP' },
        { id: 41, name: '阿姆斯特丹', codes: 'AMS' }
      ],
      americas: [
        { id: 42, name: '纽约', codes: 'JFK、LGA' },
        { id: 43, name: '洛杉矶', codes: 'LAX' },
        { id: 44, name: '旧金山', codes: 'SFO' },
        { id: 45, name: '多伦多', codes: 'YYZ' },
        { id: 46, name: '温哥华', codes: 'YVR' }
      ],
      visa: [
        { id: 47, name: '济州岛', codes: 'CJU' },
        { id: 48, name: '普吉岛', codes: 'HKT' },
        { id: 49, name: '巴厘岛', codes: 'DPS' },
        { id: 50, name: '马尔代夫', codes: 'MLE' },
        { id: 51, name: '塞班岛', codes: 'SPN' }
      ],
      islands: [
        { id: 52, name: '济州岛', codes: 'CJU' },
        { id: 53, name: '普吉岛', codes: 'HKT' },
        { id: 54, name: '巴厘岛', codes: 'DPS' },
        { id: 55, name: '马尔代夫', codes: 'MLE' },
        { id: 56, name: '塞班岛', codes: 'SPN' }
      ]
    },
    currentDestinations: []
  },

  onLoad(options) {
    console.log('create-trip页面加载，参数:', options)
    
    // 检查登录状态
    const { requireLogin } = require('../../utils/auth.js')
    if (!requireLogin()) {
      return
    }
    
    // 初始化页面数据
    this.initPageData()
    
    // 生成日历数据
    this.generateCalendarDays()
    
    // 获取用户头像
    this.getUserAvatar()
  },

  onShow() {
    // 页面显示时，恢复已选择的目的地状态
    const savedSelectedDestinations = wx.getStorageSync('createTripSelectedDestinations') || []
    if (savedSelectedDestinations.length > 0) {
      this.setData({
        selectedDestinations: savedSelectedDestinations,
        tabType: 'multiple' // 如果有已选择的目的地，自动切换到多选模式
      })
      
      // 重新加载当前分类的目的地，保持选择状态
      this.loadCategoryDestinations(this.data.currentCategory)
      
      console.log('页面显示，恢复已选择目的地数量:', savedSelectedDestinations.length, '切换到多选模式')
    }
    
    // 验证搭子数量，确保不超过3
    if (this.data.companionCount) {
      const count = parseInt(this.data.companionCount)
      if (count > 3) {
        this.setData({
          companionCount: '3',
          remainingCompanions: 3
        })
        wx.showToast({
          title: '搭子数量已调整为3人',
          icon: 'none',
          duration: 2000
        })
      }
    }
  },

  onHide() {
    // 页面隐藏时，保存已选择的目的地状态
    if (this.data.selectedDestinations.length > 0) {
      wx.setStorageSync('createTripSelectedDestinations', this.data.selectedDestinations)
      console.log('页面隐藏，保存已选择目的地数量:', this.data.selectedDestinations.length)
    }
  },

  // 初始化页面数据
  initPageData() {
    // 设置默认分类为历史/热门，并初始化对应的目的地数据
    const historyDestinations = this.data.destinationsData.history.map(item => ({
      ...item,
      selected: false
    }))
    
    this.setData({
      currentCategory: 'history',
      currentCategoryName: '历史/热门',
      currentDestinations: historyDestinations || [],
      selectedDestinations: [] // 确保初始化为空数组
    })
    
    console.log('页面数据初始化完成，已选择目的地数量:', this.data.selectedDestinations.length)
  },

  // 显示目的地选择器
  showDestinationSelector() {
    // 每次打开选择器时，确保显示历史/热门分类的数据，并保持已选择状态
    const historyDestinations = this.data.destinationsData.history.map(item => ({
      ...item,
      selected: this.data.selectedDestinations.some(selected => selected.id === item.id)
    }))
    
    this.setData({
      showSelector: true,
      currentCategory: 'history',
      currentCategoryName: '历史/热门',
      currentDestinations: historyDestinations || []
    })
    
    // 添加调试信息
    console.log('目的地选择器已打开，当前分类:', this.data.currentCategory)
    console.log('当前目的地数量:', this.data.currentDestinations.length)
    console.log('已选择的目的地数量:', this.data.selectedDestinations.length)
    
    // 延迟执行，确保DOM已渲染
    setTimeout(() => {
      this.checkScrollableElements()
    }, 100)
  },

  // 隐藏目的地选择器
  hideDestinationSelector() {
    this.setData({
      showSelector: false,
      searchKeyword: ''
    })
    
    // 保持已选择的目的地状态，不清空
    console.log('隐藏目的地选择器，已选择目的地数量保持:', this.data.selectedDestinations.length)
  },

  // 显示时间选择器
  showTimeSelector() {
    this.setData({
      showTimeSelector: true,
      isFlexible: false,
      selectedDays: 0,
      selectedRange: { start: null, end: null, display: '', days: 0 }
    })
    this.generateCalendarDays()
  },

  // 隐藏时间选择器
  hideTimeSelector() {
    this.setData({
      showTimeSelector: false
    })
  },

  // 阻止事件冒泡
  stopPropagation() {
    // 空函数，用于阻止事件冒泡
  },

  // 触摸事件处理 - 改善滑动体验
  onTouchStart(e) {
    // 记录触摸开始位置
    this.touchStartY = e.touches[0].clientY
    this.touchStartX = e.touches[0].clientX
  },

  onTouchMove(e) {
    // 记录触摸移动位置
    this.touchMoveY = e.touches[0].clientY
    this.touchMoveX = e.touches[0].clientX
    
    // 计算触摸移动距离
    const deltaY = Math.abs(this.touchMoveY - this.touchStartY)
    const deltaX = Math.abs(this.touchMoveX - this.touchStartX)
    
    // 如果垂直移动距离大于水平移动距离，说明是垂直滑动
    if (deltaY > deltaX && deltaY > 10) {
      // 注释掉preventDefault，避免影响输入框交互
      // e.preventDefault()
    }
  },

  onTouchEnd(e) {
    // 触摸结束，可以在这里添加一些逻辑
    this.touchStartY = null
    this.touchStartX = null
    this.touchMoveY = null
    this.touchMoveX = null
  },

  // 检查可滚动元素
  checkScrollableElements() {
    try {
      // 检查分类侧边栏
      const categorySidebar = this.selectComponent('#categorySidebar')
      if (categorySidebar) {
        console.log('分类侧边栏元素找到')
      }
      
      // 检查目的地列表
      const destinationList = this.selectComponent('#destinationList')
      if (destinationList) {
        console.log('目的地列表元素找到')
      }
      
      // 检查是否有足够的内容来触发滚动
      const categories = this.data.categories
      const currentDestinations = this.data.currentDestinations
      
      console.log('分类数量:', categories.length)
      console.log('当前目的地数量:', currentDestinations.length)
      
      if (categories.length > 5) {
        console.log('分类数量足够，应该可以滚动')
      }
      
      if (currentDestinations.length > 8) {
        console.log('目的地数量足够，应该可以滚动')
      }
      
    } catch (error) {
      console.error('检查可滚动元素时出错:', error)
    }
  },

  // 切换标签页
  switchTab(e) {
    const { type } = e.currentTarget.dataset
    
    // 无论切换到哪种模式，都保持已选择的目的地状态
    this.setData({
      tabType: type
    })
    
    // 重新加载当前分类的目的地，保持选择状态
    this.loadCategoryDestinations(this.data.currentCategory)
    
    console.log('切换标签页到:', type, '已选择的目的地数量:', this.data.selectedDestinations.length)
  },

  // 选择分类
  selectCategory(e) {
    const { category } = e.currentTarget.dataset
    const categoryItem = this.data.categories.find(item => item.key === category)
    
    this.setData({
      currentCategory: category,
      currentCategoryName: categoryItem.name
    })
    
    // 加载对应分类的目的地数据，保持已选择状态
    this.loadCategoryDestinations(category)
  },

  // 加载分类目的地数据，保持已选择状态
  loadCategoryDestinations(category) {
    const destinations = this.data.destinationsData[category] || []
    const destinationsWithSelection = destinations.map(item => ({
      ...item,
      selected: this.data.selectedDestinations.some(selected => selected.id === item.id)
    }))
    
    this.setData({
      currentDestinations: destinationsWithSelection
    })
    
    console.log('加载分类:', category, '目的地数量:', destinations.length, '已选择状态保持:', this.data.selectedDestinations.length)
  },

  // 选择目的地
  selectDestination(e) {
    const { destination } = e.currentTarget.dataset
    
    if (this.data.tabType === 'single') {
      // 单选模式
      this.setData({
        selectedDestination: destination.name,
        showSelector: false,
        searchKeyword: ''
      })
      
      wx.showToast({
        title: `已选择${destination.name}`,
        icon: 'success'
      })
    } else {
      // 多选模式
      const isCurrentlySelected = destination.selected
      
      if (isCurrentlySelected) {
        // 如果当前已选中，则从已选择列表中移除
        const newSelectedDestinations = this.data.selectedDestinations.filter(item => item.id !== destination.id)
        
        this.setData({
          selectedDestinations: newSelectedDestinations
        })
        
        // 更新当前分类的目的地选择状态
        const currentDestinations = this.data.currentDestinations.map(item => {
          if (item.id === destination.id) {
            return { ...item, selected: false }
          }
          return item
        })
        
        this.setData({
          currentDestinations: currentDestinations
        })
        
        wx.showToast({
          title: `已移除${destination.name}`,
          icon: 'none',
          duration: 1000
        })
      } else {
        // 如果当前未选中，则添加到已选择列表
        const newSelectedDestinations = [...this.data.selectedDestinations, destination]
        
        this.setData({
          selectedDestinations: newSelectedDestinations
        })
        
        // 更新当前分类的目的地选择状态
        const currentDestinations = this.data.currentDestinations.map(item => {
          if (item.id === destination.id) {
            return { ...item, selected: true }
          }
          return item
        })
        
        this.setData({
          currentDestinations: currentDestinations
        })
        
        wx.showToast({
          title: `已添加${destination.name}`,
          icon: 'success',
          duration: 1000
        })
      }
      
      console.log('多选模式 - 已选择目的地数量:', this.data.selectedDestinations.length)
    }
  },

  // 确认多选目的地
  confirmMultipleDestinations() {
    const { selectedDestinations } = this.data
    
    if (selectedDestinations.length === 0) {
      wx.showToast({
        title: '请至少选择一个目的地',
        icon: 'none'
      })
      return
    }
    
    // 将多选目的地合并为显示文本
    const destinationNames = selectedDestinations.map(item => item.name).join('、')
    
    this.setData({
      selectedDestination: destinationNames,
      showSelector: false,
      searchKeyword: ''
    })
    
    // 保持已选择的目的地状态，不清空，以便用户可以继续修改
    console.log('确认多选目的地完成，已选择目的地数量保持:', selectedDestinations.length)
    
    wx.showToast({
      title: `已选择${selectedDestinations.length}个目的地`,
      icon: 'success'
    })
  },

  // 搜索输入
  onSearchInput(e) {
    const keyword = e.detail.value
    this.setData({
      searchKeyword: keyword
    })
    
    // 实现搜索逻辑
    this.filterDestinations(keyword)
  },

  // 过滤目的地
  filterDestinations(keyword) {
    if (!keyword) {
      // 如果搜索关键词为空，显示当前分类的所有目的地，保持多选状态
      this.loadCategoryDestinations(this.data.currentCategory)
      return
    }
    
    // 根据关键词过滤目的地，保持多选状态
    const allDestinations = this.data.destinationsData[this.data.currentCategory] || []
    const filtered = allDestinations.filter(item => 
      item.name.toLowerCase().includes(keyword.toLowerCase()) ||
      item.codes.toLowerCase().includes(keyword.toLowerCase())
    )
    
    const filteredWithSelection = filtered.map(item => ({
      ...item,
      selected: this.data.selectedDestinations.some(selected => selected.id === item.id)
    }))
    
    this.setData({
      currentDestinations: filteredWithSelection
    })
    
    console.log('搜索过滤:', keyword, '过滤后目的地数量:', filtered.length, '已选择状态保持:', this.data.selectedDestinations.length)
  },

  // 返回上一页
  goBack() {
    if (this.data.showSelector) {
      this.hideDestinationSelector()
    } else if (this.data.showTimeSelector) {
      this.hideTimeSelector()
    } else {
      wx.navigateBack({
        delta: 1
      })
    }
  },

  // 保存行程
  saveTrip() {
    wx.showToast({
      title: '保存成功',
      icon: 'success'
    })
  },

  // 时间选择器相关方法
  // 切换固定/灵活日期类型
  switchDateType(e) {
    const { type } = e.currentTarget.dataset
    const isFlexible = type === 'flexible'
    
    this.setData({
      isFlexible: isFlexible,
      selectedDays: isFlexible ? 0 : this.data.selectedDays,
      selectedRange: isFlexible ? this.data.selectedRange : { start: null, end: null, display: '', days: 0 }
    })
    
    // 重新生成日历天数
    this.generateCalendarDays()
  },

  // 切换灵活日期开关
  toggleFlexible() {
    const isFlexible = !this.data.isFlexible
    
    this.setData({
      isFlexible: isFlexible,
      selectedDays: isFlexible ? 0 : this.data.selectedDays,
      selectedRange: isFlexible ? this.data.selectedRange : { start: null, end: null, display: '', days: 0 }
    })
    
    // 重新生成日历天数
    this.generateCalendarDays()
  },

  // 选择灵活天数
  selectDays(e) {
    const { days } = e.currentTarget.dataset
    this.setData({
      selectedDays: days
    })
    
    // 选择天数后，重新生成日历天数以更新UI
    this.generateCalendarDays()
  },

  // 生成日历天数
  generateCalendarDays() {
    const { currentYear, currentMonth, selectedRange } = this.data
    const days = []
    
    console.log('生成日历天数:', { currentYear, currentMonth })
    
    // 获取当月第一天和最后一天
    const firstDay = new Date(currentYear, currentMonth - 1, 1)
    const lastDay = new Date(currentYear, currentMonth, 0)
    
    // 获取当月第一天是星期几（0-6，0代表周日）
    const firstDayOfWeek = firstDay.getDay()
    
    // 获取上个月的最后几天
    const prevMonthLastDay = new Date(currentYear, currentMonth - 1, 0).getDate()
    
    // 添加上个月的最后几天
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i
      const date = new Date(currentYear, currentMonth - 2, day)
      const dayObj = {
        date: date.getTime(),
        day: day,
        isCurrentMonth: false,
        isSelected: this.isDateSelected(date),
        isInRange: this.isDateInRange(date),
        isToday: this.isToday(date),
        isHoliday: this.isHoliday(date)
      }
      days.push(dayObj)
      console.log('上个月日期:', dayObj)
    }
    
    // 添加当月的所有天
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(currentYear, currentMonth - 1, i)
      const dayObj = {
        date: date.getTime(),
        day: i,
        isCurrentMonth: true,
        isSelected: this.isDateSelected(date),
        isInRange: this.isDateInRange(date),
        isToday: this.isToday(date),
        isHoliday: this.isHoliday(date)
      }
      days.push(dayObj)
      console.log('当月日期:', dayObj)
    }
    
    // 添加下个月的前几天
    const daysNeeded = 42 - days.length // 6行 * 7天
    for (let i = 1; i <= daysNeeded; i++) {
      const date = new Date(currentYear, currentMonth, i)
      const dayObj = {
        date: date.getTime(),
        day: i,
        isCurrentMonth: false,
        isSelected: this.isDateSelected(date),
        isInRange: this.isDateInRange(date),
        isToday: this.isToday(date),
        isHoliday: this.isHoliday(date)
      }
      days.push(dayObj)
      console.log('下个月日期:', dayObj)
    }
    
    console.log('生成的日历天数总数:', days.length)
    console.log('前5个日期对象:', days.slice(0, 5))
    
    this.setData({
      calendarDays: days
    })
  },

  // 检查是否是今天
  isToday(date) {
    const today = new Date()
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear()
  },

  // 检查是否是节假日
  isHoliday(date) {
    // 这里可以根据实际需求添加节假日判断逻辑
    // 例如春节、国庆等
    const month = date.getMonth() + 1
    const day = date.getDate()
    
    // 示例：春节期间（农历需要转换）
    if (month === 2 && day >= 1 && day <= 4) {
      return true
    }
    
    return false
  },

  // 检查日期是否被选中
  isDateSelected(date) {
    const { selectedRange } = this.data
    if (!selectedRange.start && !selectedRange.end) return false
    
    const dateTime = date.getTime()
    return (selectedRange.start && dateTime === selectedRange.start.getTime()) ||
           (selectedRange.end && dateTime === selectedRange.end.getTime())
  },

  // 检查日期是否在选中范围内
  isDateInRange(date) {
    const { selectedRange } = this.data
    if (!selectedRange.start || !selectedRange.end) return false
    
    const dateTime = date.getTime()
    const startTime = selectedRange.start.getTime()
    const endTime = selectedRange.end.getTime()
    
    return dateTime > startTime && dateTime < endTime
  },

  // 选择日期
  selectDate(e) {
    const { date } = e.currentTarget.dataset
    const selectedDate = new Date(parseInt(date))
    
    console.log('选择日期:', { 
      date, 
      selectedDate, 
      isCurrentMonth: e.currentTarget.dataset.isCurrentMonth 
    })
    
    // 只允许选择当前月份的日期
    if (!e.currentTarget.dataset.isCurrentMonth) {
      console.log('不是当前月份，忽略选择')
      return
    }
    
    let { selectedRange } = this.data
    
    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      // 第一次选择或重新选择
      selectedRange = { 
        start: selectedDate, 
        end: null, 
        display: '', 
        days: 0 
      }
      console.log('选择开始日期:', selectedRange)
    } else if (selectedRange.start && !selectedRange.end) {
      // 选择结束日期
      if (selectedDate >= selectedRange.start) {
        selectedRange.end = selectedDate
      } else {
        selectedRange.end = selectedRange.start
        selectedRange.start = selectedDate
      }
      selectedRange.days = this.calculateDays(selectedRange.start, selectedRange.end)
      selectedRange.display = this.formatDateRange(selectedRange.start, selectedRange.end)
      console.log('选择结束日期:', selectedRange)
    }
    
    this.setData({
      selectedRange: selectedRange
    })
    
    this.generateCalendarDays()
  },

  // 计算天数差
  calculateDays(start, end) {
    if (!start || !end) return 0
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
  },

  // 格式化日期范围
  formatDateRange(start, end) {
    if (!start || !end) return ''
    const formatDate = (date) => {
      if (!date || isNaN(date.getTime())) return ''
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
    }
    return `${formatDate(start)} - ${formatDate(end)}`
  },

  // 上个月
  previousMonth() {
    let { currentYear, currentMonth } = this.data
    if (currentMonth === 1) {
      currentMonth = 12
      currentYear--
    } else {
      currentMonth--
    }
    
    this.setData({
      currentYear,
      currentMonth
    })
    this.generateCalendarDays()
  },

  // 下个月
  nextMonth() {
    let { currentYear, currentMonth } = this.data
    if (currentMonth === 12) {
      currentMonth = 1
      currentYear++
    } else {
      currentMonth++
    }
    
    this.setData({
      currentYear,
      currentMonth
    })
    this.generateCalendarDays()
  },

  // 确认时间选择
  confirmTimeSelection() {
    const { isFlexible, selectedDays, selectedRange } = this.data
    
    if (isFlexible) {
      // 灵活天数模式
      if (selectedDays <= 0) {
        wx.showToast({
          title: '请选择旅行天数',
          icon: 'none'
        })
        return
      }
      
      this.setData({
        flexibleDurationText: `${selectedDays}天`,
        showTimeSelector: false
      })
      
      wx.showToast({
        title: '天数选择完成',
        icon: 'success'
      })
    } else {
      // 固定日期模式
      if (!selectedRange.end) {
        wx.showToast({
          title: '请选择结束日期',
          icon: 'none'
        })
        return
      }
      
      this.setData({
        flexibleDurationText: selectedRange.display,
        showTimeSelector: false
      })
      
      wx.showToast({
        title: '时间选择完成',
        icon: 'success'
      })
    }
  },

  // 旅行搭子数量输入
  onCompanionInput(e) {
    console.log('搭子数量输入事件触发:', e.detail.value)
    let companionCount = e.detail.value
    
    // 限制输入长度和类型
    if (companionCount.length > 1) {
      companionCount = companionCount.slice(0, 1)
    }
    
    // 只允许数字输入
    if (!/^\d*$/.test(companionCount)) {
      companionCount = companionCount.replace(/\D/g, '')
    }
    
    // 限制最大数量为3
    const count = parseInt(companionCount) || 0
    if (count > 3) {
      companionCount = '3'
      wx.showToast({
        title: '最多只能添加3个搭子',
        icon: 'none',
        duration: 2000
      })
    }
    
    const remainingCompanions = Math.max(0, parseInt(companionCount))
    
    // 生成搭子头像列表
    const companionAvatars = []
    for (let i = 0; i < parseInt(companionCount); i++) {
      companionAvatars.push({
        id: i + 1,
        avatarUrl: '', // 暂时为空，后续可以通过分享获取
        placeholder: `+` // 占位符文本
      })
    }

    this.setData({
      companionCount,
      remainingCompanions,
      companionAvatars,
      hasShared: false // 重置分享状态
    })
    
    console.log('搭子数量已更新:', companionCount, '剩余搭子数:', remainingCompanions, '搭子头像:', companionAvatars)
  },

  // 搭子数量输入框获得焦点
  onCompanionFocus(e) {
    console.log('搭子数量输入框获得焦点')
  },

  // 搭子数量输入框失去焦点
  onCompanionBlur(e) {
    console.log('搭子数量输入框失去焦点，当前值:', e.detail.value)
  },

  // 获取用户头像
  getUserAvatar() {
    try {
      // 尝试从缓存中获取用户信息
      const userInfo = wx.getStorageSync('userInfo')
      if (userInfo && userInfo.avatarUrl) {
        this.setData({
          userAvatar: userInfo.avatarUrl
        })
      } else {
        // 如果没有缓存，尝试获取用户信息
        wx.getUserProfile({
          desc: '用于显示用户头像',
          success: (res) => {
            const avatarUrl = res.userInfo.avatarUrl
            // 保存到缓存
            wx.setStorageSync('userInfo', res.userInfo)
            this.setData({
              userAvatar: avatarUrl
            })
          },
          fail: (err) => {
            console.log('获取用户信息失败:', err)
            // 使用默认头像
            this.setData({
              userAvatar: ''
            })
          }
        })
      }
    } catch (error) {
      console.log('获取用户头像失败:', error)
      // 使用默认头像
      this.setData({
        userAvatar: ''
      })
    }
  },

  // 分享微信群 - 现在使用 open-type="share" 按钮，会自动调用 onShareAppMessage
  shareToWeChatGroup() {
    // 检查是否已填写必要信息
    if (!this.data.selectedDestination || !this.data.flexibleDurationText || !this.data.companionCount) {
      wx.showToast({
        title: '请先完善行程信息',
        icon: 'none'
      })
      return
    }

    // 生成行程ID（实际项目中应该由后端生成）
    const tripId = 'trip_' + Date.now()
    
    // 保存行程信息到本地存储（实际项目中应该保存到后端）
    const tripInfo = {
      id: tripId,
      destination: this.data.selectedDestination,
      duration: this.data.flexibleDurationText,
      companionCount: parseInt(this.data.companionCount),
      createTime: new Date().toISOString(),
      creator: wx.getStorageSync('userInfo')?.nickName || '未知用户'
    }
    
    try {
      wx.setStorageSync('trip_' + tripId, tripInfo)
      console.log('行程信息已保存:', tripInfo)
      
      // 保存当前行程ID到页面数据中，供 onShareAppMessage 使用
      this.setData({
        currentTripId: tripId
      })
      
      wx.showToast({
        title: '行程信息已保存，点击分享按钮即可分享',
        icon: 'success',
        duration: 2000
      })
    } catch (error) {
      console.error('保存行程信息失败:', error)
      wx.showToast({
        title: '保存失败，请重试',
        icon: 'error'
      })
    }
  },
  // 复制分享链接
  copyShareLink(tripId) {
    const shareUrl = `https://your-domain.com/trip-detail?tripId=${tripId}`
    
    wx.setClipboardData({
      data: shareUrl,
      success: () => {
        wx.showToast({
          title: '链接已复制',
          icon: 'success'
        })
      }
    })
  },

  // 自己搞定
  doItMyself() {
    console.log('用户选择自己搞定')
    
    // 检查是否已填写必要信息
    if (!this.data.selectedDestination || !this.data.flexibleDurationText || !this.data.companionCount) {
      wx.showToast({
        title: '请先完善行程信息',
        icon: 'none'
      })
      return
    }

    // 验证搭子数量不超过3
    const companionCount = parseInt(this.data.companionCount)
    if (companionCount > 3) {
      wx.showToast({
        title: '搭子数量不能超过3人',
        icon: 'none'
      })
      return
    }

    // 获取当前用户信息
    const userInfo = wx.getStorageSync('userInfo') || {}
    const userId = wx.getStorageSync('userId')
    
    if (!userId) {
      wx.showToast({
        title: '用户信息不完整，请重新登录',
        icon: 'none'
      })
      return
    }
    
    // 检查是否已经通过分享创建了团队
    if (this.data.hasCreatedTeam) {
      console.log('团队已通过分享创建，直接跳转')
      this.navigateToQuestions()
      return
    }
    
    // 无论搭子数量多少，都调用创建团队接口
    // 显示加载提示
    wx.showLoading({
      title: '创建行程中...',
      mask: true
    })

    // 调用创建团队接口
    this.createTeam(userId, companionCount+1, this.data.flexibleDurationText, this.data.selectedDestination)
  },

  /**
   * 计算天数
   */
  calculateDays() {
    let days = 0
    if (this.data.flexibleDurationText.includes('天')) {
      // 灵活天数模式：提取数字
      const daysMatch = this.data.flexibleDurationText.match(/(\d+)天/)
      days = daysMatch ? parseInt(daysMatch[1]) : 0
    } else if (this.data.selectedRange && this.data.selectedRange.days) {
      // 固定日期模式：使用已计算的天数
      days = this.data.selectedRange.days
    } else {
      // 尝试从flexibleDurationText中提取数字
      const numberMatch = this.data.flexibleDurationText.match(/(\d+)/)
      days = numberMatch ? parseInt(numberMatch[1]) : 0
    }
    return days
  },

  /**
   * 调用创建团队接口
   */
  createTeam(creatorId, maxMembers, expireTime, place) {
    console.log('开始调用创建团队接口，参数:', { creatorId, maxMembers, expireTime, place })
    
    wx.request({
      url: `https://meituan.mynatapp.cc/api/teams/create?creatorId=${creatorId}&maxMembers=${maxMembers}&expireTime=${encodeURIComponent(expireTime)}&place=${encodeURIComponent(place)}`,
      method: 'POST',
      success: (res) => {
        console.log('创建团队接口调用成功，返回值:', res.data)
        console.log('完整响应对象:', res)
        
        // 隐藏加载提示
        wx.hideLoading()
        
        // 处理接口返回结果
        if (res.data && res.data.code === 0) {
          wx.showToast({
            title: '行程创建成功',
            icon: 'success',
            duration: 1500
          })
          
          // 保存团队ID到页面数据中
          if (res.data.data && res.data.data.teamId) {
            this.setData({
              currentTeamId: res.data.data.teamId,
              hasCreatedTeam: true // 标记已经创建了团队
            })
            console.log('团队ID已保存:', res.data.data.teamId)
          }

          // 构建行程信息
          const tripInfo = {
            destination: this.data.selectedDestination,
            duration: this.data.flexibleDurationText,
            days: this.calculateDays(), // 计算天数
            companionCount: this.data.companionCount,
            currentUser: {
              avatarUrl: wx.getStorageSync('userInfo')?.avatarUrl || '',
              nickName: wx.getStorageSync('userInfo')?.nickName || '我'
            },
            teamId: res.data.data?.teamId || null // 保存团队ID
          }
          
          // 保存到本地存储
          wx.setStorageSync('currentTripInfo', tripInfo)
          console.log('行程信息已保存到本地存储:', tripInfo)

          // 延迟跳转，让用户看到成功提示
          setTimeout(() => {
            this.navigateToQuestions()
          }, 1500)
        } else {
          wx.showToast({
            title: res.data?.msg || '创建行程失败',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: (error) => {
        console.error('创建团队接口调用失败:', error)
        
        // 隐藏加载提示
        wx.hideLoading()
        
        wx.showToast({
          title: '网络请求失败，请重试',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  /**
   * 为分享功能调用创建团队接口
   */
  createTeamForShare(creatorId, maxMembers, expireTime, place) {
    console.log('开始为分享调用创建团队接口，参数:', { creatorId, maxMembers, expireTime, place })
    
    wx.request({
      url: `https://meituan.mynatapp.cc/api/teams/create?creatorId=${creatorId}&maxMembers=${maxMembers}&expireTime=${encodeURIComponent(expireTime)}&place=${encodeURIComponent(place)}`,
      method: 'POST',
      success: (res) => {
        console.log('分享创建团队接口调用成功，返回值:', res.data)
        console.log('完整响应对象:', res)
        
        // 隐藏加载提示
        wx.hideLoading()
        
        // 处理接口返回结果
        if (res.data && res.data.code === 0) {
          wx.showToast({
            title: '行程创建成功，可以开始分享了',
            icon: 'success',
            duration: 2000
          })
          
          // 保存团队ID到页面数据中，供分享使用
          if (res.data.data && res.data.data.teamId) {
            this.setData({
              currentTeamId: res.data.data.teamId,
              hasCreatedTeam: true // 标记已经创建了团队
            })
            console.log('团队ID已保存:', res.data.data.teamId)
            console.log('团队已创建标记:', true)

            // 保存行程信息到本地存储
            const tripInfo = {
              destination: this.data.selectedDestination,
              duration: this.data.flexibleDurationText,
              days: this.calculateDays(), // 计算天数
              companionCount: this.data.companionCount,
              teamId: res.data.data.teamId,
              currentUser: {
                avatarUrl: wx.getStorageSync('userInfo')?.avatarUrl || '',
                nickName: wx.getStorageSync('userInfo')?.nickName || '我'
              }
            }
            wx.setStorageSync('currentTripInfo', tripInfo)
            wx.setStorageSync('tripInfo', tripInfo)
            console.log('分享行程信息已保存到本地存储:', tripInfo)
          }
        } else {
          wx.showToast({
            title: res.data?.msg || '创建行程失败',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: (error) => {
        console.error('分享创建团队接口调用失败:', error)
        
        // 隐藏加载提示
        wx.hideLoading()
        
        wx.showToast({
          title: '网络请求失败，请重试',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  /**
   * 直接跳转到问题页面（不调用接口）
   */
  navigateToQuestions() {
    // 检查必要信息是否完整
    if (!this.data.selectedDestination || !this.data.flexibleDurationText || !this.data.companionCount) {
      wx.showToast({
        title: '请先完善行程信息',
        icon: 'none'
      })
      return
    }

    // 计算天数
    let days = 0
    if (this.data.flexibleDurationText.includes('天')) {
      // 灵活天数模式：提取数字
      const daysMatch = this.data.flexibleDurationText.match(/(\d+)天/)
      days = daysMatch ? parseInt(daysMatch[1]) : 0
    } else if (this.data.selectedRange && this.data.selectedRange.days) {
      // 固定日期模式：使用已计算的天数
      days = this.data.selectedRange.days
    } else {
      // 尝试从flexibleDurationText中提取数字
      const numberMatch = this.data.flexibleDurationText.match(/(\d+)/)
      days = numberMatch ? parseInt(numberMatch[1]) : 0
    }

    // 构建行程信息
    const tripInfo = {
      destination: this.data.selectedDestination,
      duration: this.data.flexibleDurationText,
      days: days, // 添加天数字段
      companionCount: this.data.companionCount,
      currentUser: {
        avatarUrl: wx.getStorageSync('userInfo')?.avatarUrl || '',
        nickName: wx.getStorageSync('userInfo')?.nickName || '我'
      }
    }
    
    // 直接存储到缓存，供所有问题页面使用
    wx.setStorageSync('currentTripInfo', tripInfo)
    console.log('行程信息已保存到缓存:', tripInfo)

    // 跳转到第一个问题页面（不再传递tripInfo参数）
    wx.navigateTo({
      url: '/pages/trip-questions-1/trip-questions-1'
    })
  },

  // 分享功能
  onShareAppMessage() {
    // 检查是否有行程信息
    if (!this.data.selectedDestination || !this.data.flexibleDurationText || !this.data.companionCount) {
      return {
        title: '邀请你一起规划旅行',
        path: '/pages/create-trip/create-trip',
        imageUrl: 'https://p0.meituan.net/hackathonqjj/730cb1b192741b985e8c3546b4edf5a6227855.png'
      }
    }

    // 获取搭子数量
    const companionCount = parseInt(this.data.companionCount)

    // 如果搭子数量为0，不应该分享，直接返回
    if (companionCount === 0) {
      return {
        title: '邀请你一起规划旅行',
        path: '/pages/create-trip/create-trip',
        imageUrl: 'https://p0.meituan.net/hackathonqjj/730cb1b192741b985e8c3546b4edf5a6227855.png'
      }
    }

    // 设置分享状态为true
    this.setData({
      hasShared: true
    })

    // 获取当前用户信息
    const userId = wx.getStorageSync('userId')
    if (!userId) {
      wx.showToast({
        title: '用户信息不完整，请重新登录',
        icon: 'none'
      })
      return {
        title: '邀请你一起规划旅行',
        path: '/pages/create-trip/create-trip',
        imageUrl: 'https://p0.meituan.net/hackathonqjj/730cb1b192741b985e8c3546b4edf5a6227855.png'
      }
    }

    // 显示加载提示
    wx.showLoading({
      title: '创建行程中...',
      mask: true
    })

    // 调用创建团队接口
    this.createTeamForShare(userId, companionCount+1, this.data.flexibleDurationText, this.data.selectedDestination)

    // 使用已经保存的行程ID，如果没有则生成新的
    let tripId = this.data.currentTripId
    if (!tripId) {
      tripId = 'trip_' + Date.now()
      
      // 保存行程信息
      const tripInfo = {
        id: tripId,
        destination: this.data.selectedDestination,
        duration: this.data.flexibleDurationText,
        companionCount: parseInt(this.data.companionCount),
        createTime: new Date().toISOString(),
        creator: wx.getStorageSync('userInfo')?.nickName || '未知用户'
      }
      
      try {
        wx.setStorageSync('trip_' + tripId, tripInfo)
        // 保存到页面数据中
        this.setData({
          currentTripId: tripId
        })
      } catch (error) {
        console.error('保存行程信息失败:', error)
      }
    }

    // 如果已经有团队ID，使用真实的团队ID；否则使用临时ID（后续会被更新）
    const teamId = this.data.currentTeamId || tripId

    return {
      title: `邀请你加入${this.data.selectedDestination}${this.data.flexibleDurationText}旅行`,
      path: `/pages/team-invite/team-invite?userId=${userId}&teamId=${teamId}`,
      imageUrl: 'https://p0.meituan.net/hackathonqjj/730cb1b192741b985e8c3546b4edf5a6227855.png',
    }
  },

  // 分享到朋友圈
  onShareTimeline() {
    if (!this.data.selectedDestination || !this.data.flexibleDurationText || !this.data.companionCount) {
      return {
        title: '邀请你一起规划旅行',
        imageUrl: 'https://p0.meituan.net/hackathonqjj/730cb1b192741b985e8c3546b4edf5a6227855.png',
      }
    }

    // 使用已经保存的行程ID，如果没有则生成新的
    let tripId = this.data.currentTripId
    if (!tripId) {
      tripId = 'trip_' + Date.now()
      
      // 保存行程信息
      const tripInfo = {
        id: tripId,
        destination: this.data.selectedDestination,
        duration: this.data.flexibleDurationText,
        companionCount: parseInt(this.data.companionCount),
        createTime: new Date().toISOString(),
        creator: wx.getStorageSync('userInfo')?.nickName || '未知用户'
      }
      
      try {
        wx.setStorageSync('trip_' + tripId, tripInfo)
        // 保存到页面数据中
        this.setData({
          currentTripId: tripId
        })
      } catch (error) {
        console.error('保存行程信息失败:', error)
      }
    }

    return {
      title: `邀请你加入${this.data.selectedDestination}${this.data.flexibleDurationText}旅行`,
      imageUrl: 'https://p0.meituan.net/hackathonqjj/730cb1b192741b985e8c3546b4edf5a6227855.png',
      query: `tripId=${tripId}`
    }
  },

  // 多选目的地相关辅助方法
  
  // 获取所有已选择的目的地（跨分类）
  getAllSelectedDestinations() {
    return this.data.selectedDestinations
  },

  // 检查目的地是否已被选择
  isDestinationSelected(destinationId) {
    return this.data.selectedDestinations.some(item => item.id === destinationId)
  },

  // 添加目的地到选择列表
  addDestination(destination) {
    const { selectedDestinations } = this.data
    if (!selectedDestinations.some(item => item.id === destination.id)) {
      const newSelectedDestinations = [...selectedDestinations, destination]
      this.setData({
        selectedDestinations: newSelectedDestinations
      })
      return true
    }
    return false
  },

  // 从选择列表中移除目的地
  removeDestination(destinationId) {
    const { selectedDestinations } = this.data
    const newSelectedDestinations = selectedDestinations.filter(item => item.id !== destinationId)
    
    // 更新当前分类的目的地选择状态
    const currentDestinations = this.data.currentDestinations.map(item => {
      if (item.id === destinationId) {
        return { ...item, selected: false }
      }
      return item
    })
    
    this.setData({
      selectedDestinations: newSelectedDestinations,
      currentDestinations: currentDestinations
    })
    
    // 显示移除提示
    const removedDestination = selectedDestinations.find(item => item.id === destinationId)
    if (removedDestination) {
      wx.showToast({
        title: `已移除${removedDestination.name}`,
        icon: 'none',
        duration: 1000
      })
    }
    
    console.log('移除目的地:', destinationId, '剩余已选择数量:', newSelectedDestinations.length)
  },

  // 清空所有已选择的目的地
  clearAllSelectedDestinations() {
    this.setData({
      selectedDestinations: [],
      currentDestinations: this.data.currentDestinations.map(item => ({
        ...item,
        selected: false
      }))
    })
  },

  // 获取已选择目的地的统计信息
  getSelectedDestinationsStats() {
    const { selectedDestinations } = this.data
    const stats = {
      total: selectedDestinations.length,
      byCategory: {}
    }
    
    // 按分类统计
    this.data.categories.forEach(category => {
      const categoryDestinations = selectedDestinations.filter(item => {
        // 检查目的地是否属于当前分类
        return this.data.destinationsData[category.key]?.some(catItem => catItem.id === item.id)
      })
      stats.byCategory[category.key] = categoryDestinations.length
    })
    
    return stats
  },

  // 验证多选目的地的合理性
  validateMultipleDestinations() {
    const { selectedDestinations } = this.data
    
    if (selectedDestinations.length === 0) {
      return { valid: false, message: '请至少选择一个目的地' }
    }
    
    if (selectedDestinations.length > 10) {
      return { valid: false, message: '最多只能选择10个目的地' }
    }
    
    // 检查是否有重复的目的地（虽然理论上不应该有）
    const uniqueIds = new Set(selectedDestinations.map(item => item.id))
    if (uniqueIds.size !== selectedDestinations.length) {
      return { valid: false, message: '存在重复的目的地选择' }
    }
    
    return { valid: true, message: '选择有效' }
  }
}) 