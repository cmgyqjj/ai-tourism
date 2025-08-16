Page({
  data: {
    isThinking: false, // 初始加载状态为非思考状态
    selectedQuestions: [], // 存储选中的问题索引
    questions: [
      { title: '答非所问', desc: '需求和策略完全不相关' },
      { title: '信息错误', desc: '地址/营业时间等旧数据' },
      { title: '逻辑混乱', desc: '步骤前后矛盾，比如"先到终点"' },
      { title: '景点路线', desc: '跟我给的信息不一致' },
      { title: '预算调整', desc: '想提高/降低预算' }
    ],
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

  // 辅助函数：检查问题是否被选中
  isQuestionSelected(index) {
    const { selectedQuestions } = this.data;
    return Array.isArray(selectedQuestions) && selectedQuestions.includes(index);
  },

  // 辅助函数：检查是否有选中的问题
  hasSelectedQuestions() {
    const { selectedQuestions } = this.data;
    return Array.isArray(selectedQuestions) && selectedQuestions.length > 0;
  },

  onLoad() {
    // 页面加载时可以模拟一个加载过程
    this.simulateLoad();
  },

  simulateLoad() {
    // 假设模拟加载时间为2秒钟
    setTimeout(() => {
      // 加载完成后，更新 isThinking 状态为 false
      this.setData({
        isThinking: false // 更新为加载完成状态，显示问题选择
      });
    }, 2000); // 模拟的加载时间
  },

  // 选择/取消选择问题
  selectQuestion(e) {
    const index = e.currentTarget.dataset.index;
    let { selectedQuestions } = this.data;
  
    // 确保 selectedQuestions 是一个数组
    if (!Array.isArray(selectedQuestions)) {
      selectedQuestions = [];  // 如果不是数组，则重置为空数组
    }
  
    console.log("selectedQuestions:", selectedQuestions); // 正确打印 selectedQuestions
  
    // 如果问题已经选中，则取消选中
    if (selectedQuestions.includes(index)) {
      const questionIndex = selectedQuestions.indexOf(index);
      selectedQuestions.splice(questionIndex, 1);
    } else {
      // 如果问题未选中，则添加到选中列表
      selectedQuestions.push(index);
    }
  
    // 更新选中的问题
    this.setData({
      selectedQuestions: [...selectedQuestions]
    });
  },

  // 确认按钮，开始AI思考
  startThinking() {
    this.setData({
      isThinking: true // 显示AI思考状态
    });

    // 模拟AI思考过程
    setTimeout(() => {
      this.setData({
        isThinking: false, // 思考完成
        selectedQuestions: [] // 清空选中的问题
      });
      wx.showToast({
        title: 'AI思考完成',
        icon: 'success'
      });
    }, 2000); // 模拟思考需要2秒
  },

  // 换一批问题
  changeBatch() {
    console.log('换一批问题');

    // 重置选中状态
    this.setData({
      selectedQuestions: []  // 清空已选问题
    });

    // 这里可以添加换一批的逻辑，比如重新请求数据
    wx.showToast({
      title: '换一批功能待实现',
      icon: 'none'
    });
  },

  // 返回上一页
  returnToPrevious() {
    wx.navigateBack();
  }
});
