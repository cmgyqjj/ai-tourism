Page({
  data: {
    // 页面状态：'loading' | 'selecting' | 'thinking'
    currentState: 'loading',
    
    // 当前问题组索引
    currentQuestionGroup: 0,
    
    // 三组问题数据 (总共15个问题)
    questionGroups: [
      // 第一组问题
      [
        { title: '时间安排', desc: '行程时间安排不合理' },
        { title: '交通方式', desc: '推荐的交通方式不合适' },
        { title: '住宿选择', desc: '酒店位置或价格不合适' },
        { title: '餐饮推荐', desc: '餐厅选择不符合口味' },
        { title: '景点顺序', desc: '景点游览顺序需要调整' }
      ],
      // 第二组问题
      [
        { title: '预算控制', desc: '总体预算超出或不够合理' },
        { title: '文化体验', desc: '缺少当地文化体验项目' },
        { title: '购物建议', desc: '购物地点或商品推荐不当' },
        { title: '安全提醒', desc: '缺少安全注意事项' },
        { title: '天气考虑', desc: '没有考虑天气因素影响' }
      ],
      // 第三组问题
      [
        { title: '语言沟通', desc: '缺少语言沟通建议' },
        { title: '特殊需求', desc: '没有考虑特殊人群需求' },
        { title: '紧急情况', desc: '缺少紧急情况处理方案' },
        { title: '当地习俗', desc: '没有提及当地风俗禁忌' },
        { title: '网络通讯', desc: '缺少网络和通讯建议' }
      ]
    ],
    
    // 当前显示的问题
    currentQuestions: [],
    
    // 选中的问题索引
    selectedQuestions: [],
    
    // 地图相关数据
    markers: [
      { id: 1, latitude: 31.2304, longitude: 121.4737, title: '起点' },
      { id: 2, latitude: 31.2204, longitude: 121.4837, title: '终点' }
    ],
    polyline: [{
      points: [
        { latitude: 31.2304, longitude: 121.4737 },
        { latitude: 31.2260, longitude: 121.4785 },
        { latitude: 31.2204, longitude: 121.4837 }
      ]
    }]
  },

  onLoad() {
    console.log('路线优化页面加载');
    // 确保selectedQuestions初始化为空数组
    this.setData({
      selectedQuestions: []
    });
    // 页面加载时显示loading状态
    this.showLoadingState();
  },

  // 显示初始加载状态
  showLoadingState() {
    this.setData({
      currentState: 'loading'
    });
    
    // 模拟加载过程，2秒后进入问题选择状态
    setTimeout(() => {
      this.showQuestionSelectionState();
    }, 2000);
  },

  // 显示问题选择状态
  showQuestionSelectionState() {
    this.setData({
      currentState: 'selecting',
      currentQuestions: this.data.questionGroups[this.data.currentQuestionGroup],
      selectedQuestions: [] // 确保初始化为空数组
    });
  },

  // 选择/取消选择问题
  selectQuestion(e) {
    const index = e.currentTarget.dataset.index;
    // 确保selectedQuestions是数组
    let selectedQuestions = Array.isArray(this.data.selectedQuestions) ? [...this.data.selectedQuestions] : [];
    
    console.log('点击问题索引:', index, '当前选中:', selectedQuestions);
    
    // 如果问题已经选中，则取消选中
    if (selectedQuestions.includes(index)) {
      selectedQuestions = selectedQuestions.filter(i => i !== index);
      console.log('取消选择问题:', index);
    } else {
      // 如果问题未选中，则添加到选中列表
      selectedQuestions.push(index);
      console.log('选择问题:', index);
    }
    
    console.log('更新后选中:', selectedQuestions);
    
    this.setData({
      selectedQuestions: selectedQuestions
    }, () => {
      // 在setData完成后打印确认
      console.log('setData完成，当前selectedQuestions:', this.data.selectedQuestions);
    });
  },

  // 确认选择，直接进入AI思考状态
  confirmSelection() {
    if (!Array.isArray(this.data.selectedQuestions) || this.data.selectedQuestions.length === 0) {
      wx.showToast({
        title: '请至少选择一个问题',
        icon: 'none'
      });
      return;
    }
    
    // 直接进入AI思考状态
    this.startAIThinking();
  },

  // 开始AI思考
  startAIThinking() {
    this.setData({
      currentState: 'thinking'
    });
    
    // 模拟AI思考过程，3秒后完成
    setTimeout(() => {
      this.showQuestionSelectionState(); // 思考完成后返回问题选择状态
      wx.showToast({
        title: 'AI优化完成',
        icon: 'success'
      });
    }, 3000);
  },

  // 返回问题选择状态
  returnToSelection() {
    this.showQuestionSelectionState();
  },

  // 换一批问题
  changeBatch() {
    let nextGroup = (this.data.currentQuestionGroup + 1) % this.data.questionGroups.length;
    
    this.setData({
      currentQuestionGroup: nextGroup,
      currentQuestions: this.data.questionGroups[nextGroup],
      selectedQuestions: []
    });
    
    wx.showToast({
      title: `已切换到第${nextGroup + 1}组问题`,
      icon: 'none'
    });
  },

  // 检查问题是否被选中
  isQuestionSelected(index) {
    return Array.isArray(this.data.selectedQuestions) && this.data.selectedQuestions.includes(index);
  },

  // 检查是否有选中的问题
  hasSelectedQuestions() {
    return Array.isArray(this.data.selectedQuestions) && this.data.selectedQuestions.length > 0;
  },

  // 获取问题项的CSS类名
  getQuestionItemClass(index) {
    if (this.isQuestionSelected(index)) {
      return 'question-item selected';
    }
    return 'question-item';
  },

  // 返回上一页
  goBack() {
    wx.navigateBack({
      delta: 1
    });
  }
});
