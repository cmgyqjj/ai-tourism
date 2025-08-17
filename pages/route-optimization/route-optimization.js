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
    console.log('路线优化页面加载');
    
    // 请求位置权限
    this.requestLocationPermission();
    
    // 确保selectedQuestions初始化为空数组
    this.setData({
      selectedQuestions: []
    });
    
    // 页面加载时显示loading状态
    this.showLoadingState();
    
    // 延迟初始化地图，确保页面完全渲染
    setTimeout(() => {
      this.initMapData();
    }, 1000);
  },

  // 请求位置权限
  requestLocationPermission() {
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success: () => {
              console.log('位置权限获取成功');
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
        }
      }
    });
  },

  // 初始化地图数据
  initMapData() {
    console.log('初始化地图数据:', {
      markers: this.data.markers.length,
      polyline: this.data.polyline.length
    });
    
    // 延迟初始化地图，确保页面完全加载
    setTimeout(() => {
      this.forceMapUpdate();
    }, 500);
  },

  // 强制更新地图
  forceMapUpdate() {
    console.log('强制更新地图');
    
    // 保存原始地图数据
    const originalMarkers = [
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
    ];
    
    const originalPolyline = [{
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
    
    // 先清空地图数据
    this.setData({
      markers: [],
      polyline: []
    }, () => {
      // 延迟重新设置数据，强制地图重新渲染
      setTimeout(() => {
        this.setData({
          markers: originalMarkers,
          polyline: originalPolyline
        });
        console.log('地图数据已强制更新:', {
          markers: originalMarkers.length,
          polyline: originalPolyline.length
        });
        
        // 强制地图重新渲染
        this.forceMapRender();
        
        // 再次检查地图状态
        setTimeout(() => {
          this.checkMapDisplay();
        }, 500);
      }, 200);
    });
  },

  // 强制地图重新渲染
  forceMapRender() {
    console.log('强制地图重新渲染');
    
    // 使用选择器查询地图组件
    const query = wx.createSelectorQuery();
    query.select('#routeMap').fields({ node: true, size: true }).exec((res) => {
      if (res[0] && res[0].node) {
        console.log('找到地图节点，尝试强制渲染');
        // 这里可以尝试强制刷新地图
      }
    });
    
    // 延迟重新设置地图数据，确保渲染
    setTimeout(() => {
      this.setData({
        markers: this.data.markers,
        polyline: this.data.polyline
      });
      console.log('地图数据重新设置完成');
    }, 100);
  },

  // 检查地图显示状态
  checkMapDisplay() {
    const query = wx.createSelectorQuery();
    query.select('#routeMap').fields({ node: true, size: true }).exec((res) => {
      if (res[0]) {
        console.log('地图组件已找到:', res[0]);
        console.log('地图尺寸:', res[0].size);
      } else {
        console.log('地图组件未找到');
      }
    });
  },

  // 地图加载完成事件
  onMapLoad() {
    console.log('地图加载完成');
    
    // 强制刷新地图数据
    this.refreshMapData();
    
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

  // 强制刷新地图数据
  refreshMapData() {
    console.log('强制刷新地图数据');
    
    // 重新设置地图数据
    const markers = [
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
    ];
    
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
      markers: [],
      polyline: []
    }, () => {
      // 延迟重新设置数据，强制地图重新渲染
      setTimeout(() => {
        this.setData({
          markers: markers,
          polyline: polyline
        });
        console.log('地图数据已刷新:', {
          markers: markers.length,
          polyline: polyline.length
        });
      }, 100);
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
  },

  // 测试地图功能
  testMap() {
    console.log('测试地图功能');
    
    // 显示当前地图数据
    console.log('当前地图数据:', {
      markers: this.data.markers,
      polyline: this.data.polyline
    });
    
    // 尝试刷新地图
    this.refreshMapData();
    
    // 显示测试提示
    wx.showToast({
      title: '地图测试中...',
      icon: 'loading',
      duration: 2000
    });
  }
});
