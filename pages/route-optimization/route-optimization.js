Page({
  data: {
    // 页面状态：'loading' | 'selecting' | 'thinking'
    currentState: 'loading',
    
    // 当前问题组索引
    currentQuestionGroup: 0,
    
    // 用户当前位置
    userLocation: null,
    // 是否已获取用户位置
    hasUserLocation: false,
    
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
        { title: '购物建议', desc: '购物推荐不够详细' },
        { title: '安全提醒', desc: '缺少安全注意事项' },
        { title: '天气考虑', desc: '没有考虑天气因素' }
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
    
    // 问题选中状态 - 使用对象管理每个问题的选中状态
    questionStates: {},
    
    // 选中的问题数量
    selectedCount: 0,
    
    // 选中的问题列表
    selectedQuestions: [],
    
    // 地图相关数据
    markers: [
      { 
        id: 1, 
        latitude: 31.2304, 
        longitude: 121.4737, 
        title: '起点 - 人民广场',
        width: 30,
        height: 30
      },
      { 
        id: 2, 
        latitude: 31.2260, 
        longitude: 121.4785, 
        title: '景点1 - 外滩',
        width: 30,
        height: 30
      },
      { 
        id: 3, 
        latitude: 31.2204, 
        longitude: 121.4837, 
        title: '景点2 - 豫园',
        width: 30,
        height: 30
      },
      { 
        id: 4, 
        latitude: 31.2350, 
        longitude: 121.4700, 
        title: '景点3 - 南京路',
        width: 30,
        height: 30
      },
      { 
        id: 5, 
        latitude: 31.2180, 
        longitude: 121.4900, 
        title: '景点4 - 陆家嘴',
        width: 30,
        height: 30
      }
    ],
    polyline: [{
      points: [
        { latitude: 31.2304, longitude: 121.4737 },  // 人民广场
        { latitude: 31.2350, longitude: 121.4700 },  // 南京路
        { latitude: 31.2260, longitude: 121.4785 },  // 外滩
        { latitude: 31.2204, longitude: 121.4837 },  // 豫园
        { latitude: 31.2180, longitude: 121.4900 }   // 陆家嘴
      ],
      color: '#FF6B6B',
      width: 4,
      arrowLine: true
    }],
    
    // 地图中心坐标
    mapCenter: {
      latitude: 31.2304,
      longitude: 121.4737
    },
    
    // 地图初始缩放级别
    mapScale: 12
  },

  onLoad() {
    // 立即初始化数据
    this.setData({
      currentState: 'loading'
    });
    
    // 请求位置权限并获取用户位置
    this.requestLocationPermission();
    
    // 页面加载时显示loading状态
    this.showLoadingState();
    
    // 延迟初始化地图，确保页面完全渲染
    setTimeout(() => {
      this.initMapData();
    }, 1000);
  },

  onShow() {
    // 每次页面显示时都重置选择状态
    this.setData({
      questionStates: {},
      selectedCount: 0,
      selectedQuestions: []
    });
  },

  // 请求位置权限并获取用户位置
  requestLocationPermission() {
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success: () => {
              console.log('位置权限获取成功');
              // 权限获取成功后，立即获取用户位置
              this.getUserLocation();
            },
            fail: () => {
              console.log('位置权限获取失败');
              wx.showModal({
                title: '需要位置权限',
                content: '为了显示地图，需要获取您的位置权限',
                showCancel: false
              });
            }
          });
        } else {
          console.log('已有位置权限');
          // 已有权限，直接获取用户位置
          this.getUserLocation();
        }
      }
    });
  },

  // 获取用户当前位置
  getUserLocation() {
    wx.showLoading({
      title: '获取位置中...',
      mask: true
    });

    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        console.log('获取用户位置成功:', res);
        const userLocation = {
          latitude: res.latitude,
          longitude: res.longitude
        };
        
        this.setData({
          userLocation: userLocation,
          hasUserLocation: true,
          mapCenter: userLocation // 地图中心设置为用户位置
        });
        
        wx.hideLoading();
        console.log('地图中心已设置为用户位置:', userLocation);
      },
      fail: (err) => {
        console.error('获取用户位置失败:', err);
        wx.hideLoading();
        wx.showToast({
          title: '获取位置失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },

  // 初始化地图数据
  initMapData() {
    console.log('初始化地图数据:', {
      markers: this.data.markers.length,
      polyline: this.data.polyline.length
    });
    
    // 如果已获取用户位置，延迟显示景点标记
    if (this.data.hasUserLocation) {
      setTimeout(() => {
        this.showAttractionMarkers();
      }, 1000); // 1秒后显示景点标记
    } else {
      // 如果还没获取到用户位置，等待位置获取完成
      setTimeout(() => {
        this.initMapData();
      }, 500);
    }
  },

  // 显示景点标记
  showAttractionMarkers() {
    console.log('显示景点标记');
    
    // 创建包含用户位置和景点的完整标记数组
    const allMarkers = [];
    
    // 不添加任何标记点，只保留路线
    // 清空标记数组，不显示绿色和红色标记
    allMarkers = [];
    
    // 更新地图数据
    this.setData({
      markers: allMarkers
    });
    
    console.log('标记点已隐藏，只显示路线');
    
    // 延迟显示路线
    setTimeout(() => {
      this.showRouteLine();
    }, 500);
  },

  // 显示路线
  showRouteLine() {
    console.log('显示路线');
    
    const polyline = [{
      points: [
        { latitude: 31.2304, longitude: 121.4737 },  // 人民广场
        { latitude: 31.2350, longitude: 121.4700 },  // 南京路
        { latitude: 31.2260, longitude: 121.4785 },  // 外滩
        { latitude: 31.2204, longitude: 121.4837 },  // 豫园
        { latitude: 31.2180, longitude: 121.4900 }   // 陆家嘴
      ],
      color: '#FF6B6B',
      width: 4,
      arrowLine: true
    }];
    
    this.setData({
      polyline: polyline
    });
    
    console.log('路线显示完成');
  },


  // 地图加载完成事件
  onMapLoad() {
    console.log('地图加载完成');
    
    // 如果已获取用户位置，显示景点标记
    if (this.data.hasUserLocation) {
      setTimeout(() => {
        this.showAttractionMarkers();
      }, 500);
    }
    
    wx.showToast({
      title: '地图加载完成',
      icon: 'success',
      duration: 1500
    });
  },

  // 地图错误事件
  onMapError(e) {
    console.error('地图加载错误:', e.detail);
    wx.showToast({
      title: '地图加载失败',
      icon: 'none',
      duration: 2000
    });
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
    // 强制重置选择状态
    this.setData({
      currentState: 'selecting',
      currentQuestions: this.data.questionGroups[this.data.currentQuestionGroup],
      questionStates: {},
      selectedCount: 0, // 重置选中的问题数量
      selectedQuestions: [] // 重置选中的问题列表
    });
  },

  // 选择/取消选择问题
  selectQuestion(e) {
    const index = e.currentTarget.dataset.index;
    
    // 获取当前选中的问题状态
    let questionStates = this.data.questionStates;
    
    // 检查问题是否已经选中
    const isSelected = questionStates[index] === true;
    
    if (isSelected) {
      // 如果已选中，则取消选中
      questionStates[index] = false;
    } else {
      // 如果未选中，则添加到选中列表
      questionStates[index] = true;
    }
    
    // 计算选中的问题数量
    const selectedCount = Object.keys(questionStates).filter(index => questionStates[index] === true).length;
    
    // 更新数据
    this.setData({
      questionStates: questionStates,
      selectedCount: selectedCount
    });
  },

  // 获取选中的问题索引数组
  getSelectedQuestions() {
    const questionStates = this.data.questionStates;
    const selectedQuestions = Object.keys(questionStates).filter(index => questionStates[index] === true);
    return selectedQuestions;
  },

  // 获取选中的问题数量
  getSelectedCount() {
    const questionStates = this.data.questionStates;
    const selectedCount = Object.keys(questionStates).filter(index => questionStates[index] === true).length;
    return selectedCount;
  },

  // 确认选择，进入AI思考状态
  confirmSelection() {
    const questionStates = this.data.questionStates;
    const selectedQuestions = Object.keys(questionStates).filter(index => questionStates[index] === true);
    
    if (selectedQuestions.length === 0) {
      wx.showToast({
        title: '请至少选择一个问题',
        icon: 'none'
      });
      return;
    }
    
    // 设置选中的问题列表
    this.setData({
      selectedQuestions: selectedQuestions
    });
    
    // 进入AI思考状态
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
      questionStates: {}, // 确保切换时重置选择状态
      selectedCount: 0, // 确保切换时重置选中的问题数量
      selectedQuestions: [] // 确保切换时重置选中的问题列表
    });
    
    wx.showToast({
      title: `已切换到第${nextGroup + 1}组问题`,
      icon: 'none'
    });
  },

  // 地图标记点击事件
  onMarkerTap(e) {
    const markerId = e.detail.markerId;
    console.log('点击了地图标记:', markerId);
    
    // 根据标记ID显示对应的景点信息
    const marker = this.data.markers.find(m => m.id === markerId);
    if (marker) {
      wx.showToast({
        title: marker.title,
        icon: 'none',
        duration: 2000
      });
    }
  },

  // 地图区域变化事件
  onRegionChange(e) {
    if (e.type === 'end') {
      console.log('地图区域变化:', e.detail);
    }
  },

  // 返回上一页
  goBack() {
    wx.navigateBack({
      delta: 1
    });
  }
});
