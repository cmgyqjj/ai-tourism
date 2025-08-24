Page({
  data: {
    selectedDay: 1,
    sidebarOpen: false, // 侧边栏开关状态
    showShareModal: false, // 分享弹窗状态
    shareStats: {
      wechatCount: 0    // 微信分享次数
    },

    // 行程标题和时长 - 改成团队版
    tripTitle: '团队版: 法意瑞12日游',
    tripDuration: '12天11晚',
    
    // 地图相关数据
    mapCenter: {
      longitude: 116.397128,
      latitude: 39.916527
    },
    mapScale: 12,
    mapMarkers: [],
    mapPolyline: [],
    
    // 参与者信息 - 团队版
    participants: [
      { 
        avatar: 'https://p0.meituan.net/hackathonqjj/066f1f168c7a71a45bf97c3771862cab74240.png',
        isCurrentUser: true,
        name: '当前用户'
      },
      { 
        avatar: 'https://p0.meituan.net/hackathonqjj/066f1f168c7a71a45bf97c3771862cab74240.png',
        isCurrentUser: false,
        name: '搭子1'
      },
      { 
        avatar: 'https://p0.meituan.net/hackathonqjj/066f1f168c7a71a45bf97c3771862cab74240.png',
        isCurrentUser: false,
        name: '搭子2'
      },
      { 
        avatar: 'https://p0.meituan.net/hackathonqjj/066f1f168c7a71a45bf97c3771862cab74240.png',
        isCurrentUser: false,
        name: '搭子3'
      }
    ],
    
    // 行程天数信息
    tripDays: [
      {
        day: 1,
        date: '05月05日',
        route: '北京 > 巴黎',
        weather: '☀️'
      },
      {
        day: 2,
        date: '05月06日',
        route: '巴黎',
        weather: '🌧️'
      },
      {
        day: 3,
        date: '05月07日',
        route: '巴黎',
        weather: '☁️'
      },
      {
        day: 4,
        date: '05月08日',
        route: '巴黎 > 米兰',
        weather: '☀️'
      },
      {
        day: 5,
        date: '05月09日',
        route: '米兰',
        weather: '☀️'
      },
      {
        day: 6,
        date: '05月10日',
        route: '米兰 > 罗马',
        weather: '☀️'
      },
      {
        day: 7,
        date: '05月11日',
        route: '罗马',
        weather: '☀️'
      },
      {
        day: 8,
        date: '05月12日',
        route: '罗马',
        weather: '☀️'
      },
      {
        day: 9,
        date: '05月13日',
        route: '罗马 > 佛罗伦萨',
        weather: '☀️'
      },
      {
        day: 10,
        date: '05月14日',
        route: '佛罗伦萨',
        weather: '☀️'
      },
      {
        day: 11,
        date: '05月15日',
        route: '佛罗伦萨 > 威尼斯',
        weather: '☀️'
      },
      {
        day: 12,
        date: '05月16日',
        route: '威尼斯 > 北京',
        weather: '☀️'
      }
    ],
    
    // All day info data structure
    allDayInfo: [
      {
        day: 1,
        route: '北京—巴黎',
        flight: '机场 巴黎 - 戴高乐机场',
        accommodation: '住宿建议 巴黎景区附近 (1,7,9区)',
        items: [
          {
            type: 'food',
            icon: '🍽️',
            category: '美食',
            name: '花神咖啡馆',
            price: '100',
            description: '正宗法式咖啡和甜点',
            image: 'https://p0.meituan.net/hackathonqjj/066f1f168c7a71a45bf97c3771862cab74240.png',
            location: 'Café de Flore, Paris',
            distance: '3.2',
            time: '15'
          },
          {
            type: 'attraction',
            icon: '🏔️',
            category: '景点',
            name: '塞纳河',
            description: '夜游塞纳河拍照打卡',
            image: '/images/seine.jpg',
            location: 'Seine River, Paris',
            distance: '1.2',
            time: '5'
          },
          {
            type: 'hotel',
            icon: '🏨',
            category: '住宿',
            name: 'Prais万豪(第7区)',
            nights: '1',
            price: '1028',
            description: '豪华酒店，位置优越',
            image: '/images/hotel.jpg',
            location: 'Marriott Hotel, Paris',
            distance: '2.1',
            time: '8'
          }
        ]
      },
      {
        day: 2,
        route: '巴黎',
        flight: null,
        accommodation: '住宿建议 巴黎市中心 (1,2区)',
        items: [
          {
            type: 'attraction',
            icon: '🏔️',
            category: '景点',
            name: '埃菲尔铁塔',
            description: '巴黎标志性建筑，必打卡',
            image: '/images/eiffel.jpg',
            location: 'Eiffel Tower, Paris',
            distance: '0.8',
            time: '3'
          },
          {
            type: 'food',
            icon: '🍽️',
            category: '美食',
            name: '米其林餐厅',
            price: '200',
            description: '精致法式料理',
            image: '/images/restaurant.jpg',
            location: 'Michelin Restaurant, Paris',
            distance: '1.5',
            time: '10'
          }
        ]
      },
      {
        day: 3,
        route: '巴黎',
        flight: null,
        accommodation: '住宿建议 巴黎市中心 (1,2区)',
        items: [
          {
            type: 'attraction',
            icon: '🏔️',
            category: '景点',
            name: '卢浮宫',
            description: '世界著名艺术博物馆',
            image: '/images/louvre.jpg',
            location: 'Louvre Museum, Paris',
            distance: '1.0',
            time: '4'
          }
        ]
      }
    ],
    
    // Current selected day's trip info
    currentDayInfo: {
        route: '',
        flight: null,
        accommodation: '',
        items: []
    }
  },

  onLoad(options) {
    console.log('团队攻略页面加载完成', options);
    
    // 如果有传入的行程数据，则使用传入的数据
    if (options.tripData) {
      try {
        const tripData = JSON.parse(decodeURIComponent(options.tripData));
        console.log('接收到的行程数据:', tripData);
        
        // 更新行程天数数据
        this.setData({
          tripDays: tripData.days || this.data.tripDays,
          allDayInfo: tripData.allDayInfo || this.data.allDayInfo, // Added this line
          currentDayInfo: tripData.dayInfo || this.data.currentDayInfo
        });
        
        console.log('设置后的tripDays:', this.data.tripDays);
        
        // 如果有行程信息，更新参与者数据
        if (tripData.tripInfo) {
          this.updateParticipants(tripData.tripInfo);
        }
        
        // 动态生成行程标题和时长
        this.generateTripTitle();
        
        // 初始化地图数据
        this.initMapData();
        
      } catch (e) {
        console.error('解析行程数据失败:', e);
      }
    } else {
      // 没有传入数据时，使用默认数据并初始化地图
      console.log('没有传入行程数据，使用默认数据');
      this.generateTripTitle();
      this.initMapData();
    }

    // 加载第一天的行程信息
    this.loadDayInfo(1);

    // 调试：打印当前数据状态
    console.log('=== 页面加载完成后的数据状态 ===');
    console.log('tripDays:', this.data.tripDays);
    console.log('tripTitle:', this.data.tripTitle);
    console.log('currentDayInfo:', this.data.currentDayInfo);
  },

  /**
   * 生成行程标题和时长
   */
  generateTripTitle() {
    const { tripDays } = this.data;
    console.log('generateTripTitle - tripDays:', tripDays);
    
    const days = tripDays.length;
    const nights = Math.max(0, days - 1);
    
    console.log('计算的天数:', days, '晚数:', nights);
    
    // 从第一个行程的路线中提取目的地
    let destination = '未知目的地';
    if (tripDays.length > 0 && tripDays[0].route) {
      const routeParts = tripDays[0].route.split('>');
      if (routeParts.length > 1) {
        destination = routeParts[1].trim();
      } else {
        destination = routeParts[0].trim();
      }
    }
    
    // 生成标题：团队版 + 目的地 + X日游
    const tripTitle = `团队版: ${destination}${days}日游`;
    
    // 生成长度：X天X晚
    const tripDuration = `${days}天${nights}晚`;
    
    this.setData({
      tripTitle,
      tripDuration
    });
    
    console.log('生成的行程标题:', tripTitle, '时长:', tripDuration);
  },

  /**
   * 更新参与者数据
   */
  updateParticipants(tripInfo) {
    const { companionCount, currentUser } = tripInfo;
    const totalCount = parseInt(companionCount) + 1; // 包括当前用户
    
    // 获取当前用户信息
    const userInfo = wx.getStorageSync('userInfo') || {};
    
    // 生成参与者列表
    const participants = [];
    
    // 第一个是当前用户
    participants.push({
      avatar: userInfo.avatarUrl || '/images/default-avatar.png',
      isCurrentUser: true,
      name: userInfo.nickName || '当前用户'
    });
    
    // 添加搭子
    for (let i = 1; i < totalCount; i++) {
      participants.push({
        avatar: `/images/avatar${i + 1}.png`,
        isCurrentUser: false,
        name: `搭子${i}`
      });
    }
    
    this.setData({
      participants
    });
    
    console.log('更新后的参与者:', participants);
  },

  /**
   * 初始化地图数据
   */
  initMapData() {
    // 这里可以根据行程数据初始化地图标记和路线
    console.log('初始化地图数据');
    
    // 示例：设置地图中心点为巴黎
    this.setData({
      mapCenter: {
        longitude: 2.3522,
        latitude: 48.8566
      }
    });
  },

  /**
   * 返回上一页
   */
  goBack() {
    wx.navigateBack({
      delta: 1
    });
  },

  /**
   * 查看行程详情
   */
  viewTripDetails() {
    console.log('查看行程详情');
    
  },

  /**
   * 选择日期
   */
  selectDay(e) {
    const day = e.currentTarget.dataset.day;
    console.log('选择第', day, '天');
    
    this.setData({
      selectedDay: day
    });
    
    // 加载对应日期的行程信息
    this.loadDayInfo(day);
  },

  /**
   * 加载指定日期的行程信息
   */
  loadDayInfo(day) {
    console.log('加载第', day, '天的行程信息');
    
    // 直接从 allDayInfo 中获取对应天数的行程信息
    const existingDayInfo = this.data.allDayInfo.find(item => item.day === day);

    if (!existingDayInfo) {
      console.error('未找到第', day, '天的行程信息');
      return;
    }

    // 直接使用 allDayInfo 中的数据，因为它已经包含了正确的结构
    const dayInfo = {
      route: existingDayInfo.route || '',
      flight: existingDayInfo.flight || null,
      accommodation: existingDayInfo.accommodation || '',
      items: existingDayInfo.items || []
    };

    // Update the current selected day's trip info
    this.setData({
      currentDayInfo: dayInfo
    });

    console.log('更新后的currentDayInfo:', dayInfo);
  },

  /**
   * 切换住宿建议展开状态
   */
  toggleAccommodation() {
    console.log('切换住宿建议展开状态');
    wx.showToast({
      title: '住宿建议展开功能开发中',
      icon: 'none'
    });
  },

  /**
   * 显示项目菜单
   */
  showItemMenu(e) {
    const index = e.currentTarget.dataset.index;
    console.log('显示项目菜单:', index);
    
    wx.showActionSheet({
      itemList: ['查看详情', '添加到收藏', '分享'],
      success: (res) => {
        console.log('选择的操作:', res.tapIndex);
        switch (res.tapIndex) {
          case 0:
            this.viewItemDetail(index);
            break;
          case 1:
            this.addToFavorites(index);
            break;
          case 2:
            this.shareItem(index);
            break;
        }
      }
    });
  },

  /**
   * 查看项目详情
   */
  viewItemDetail(index) {
    const item = this.data.currentDayInfo.items[index];
    console.log('查看项目详情:', item);
    
    wx.showToast({
      title: '详情功能开发中',
      icon: 'none'
    });
  },

  /**
   * 添加到收藏
   */
  addToFavorites(index) {
    const item = this.data.currentDayInfo.items[index];
    console.log('添加到收藏:', item);
    
    wx.showToast({
      title: '已添加到收藏',
      icon: 'success'
    });
  },

  /**
   * 分享项目
   */
  shareItem(index) {
    const item = this.data.currentDayInfo.items[index];
    console.log('分享项目:', item);
    
    wx.showToast({
      title: '分享功能开发中',
      icon: 'none'
    });
  },

  /**
   * 导航到位置
   */
  navigateToLocation(e) {
    const location = e.currentTarget.dataset.location;
    console.log('导航到位置:', location);
    
    wx.showToast({
      title: '导航功能开发中',
      icon: 'none'
    });
  },

  /**
   * 切换侧边栏
   */
  toggleSidebar() {
    this.setData({
      sidebarOpen: !this.data.sidebarOpen
    });
  },

  /**
   * 路线优化 - 跳转到路线优化页面
   */
  onRouteOptimization() {
    console.log('跳转到路线优化页面');

    // 跳转到路线优化页面
    wx.navigateTo({
      url: '/pages/route-optimization/route-optimization',
      success: () => {
        console.log('成功跳转到路线优化页面');
      },
      fail: (error) => {
        console.error('跳转失败:', error);
        wx.showToast({
          title: '跳转失败，请重试',
          icon: 'none'
        });
      }
    });
  },

  /**
   * 攻略PK - 跳转到攻略PK页面
   */
  onStrategyPK() {
    console.log('跳转到攻略PK页面');

    // 跳转到攻略PK页面
    wx.navigateTo({
      url: '/pages/strategy-pk/strategy-pk',
      success: () => {
        console.log('成功跳转到攻略PK页面');
      },
      fail: (error) => {
        console.error('跳转失败:', error);
        wx.showToast({
          title: '跳转失败，请重试',
          icon: 'none'
        });
      }
    });
  },

  /**
   * 团队攻略
   */
  onTeamStrategy() {
    console.log('团队攻略');
    wx.showToast({
      title: '团队攻略功能开发中',
      icon: 'none'
    });
  },

  /**
   * 分享给朋友
   */
  onShareFriends() {
    console.log('分享给朋友');
    this.setData({
      showShareModal: true
    });
  },

  /**
   * 显示分享弹窗
   */
  showShareModal() {
    this.setData({
      showShareModal: true
    });
  },

  /**
   * 隐藏分享弹窗
   */
  hideShareModal() {
    this.setData({
      showShareModal: false
    });
  },

  /**
   * 阻止事件冒泡
   */
  stopPropagation() {
    // 阻止事件冒泡
  },

  /**
   * 分享到微信
   */
  shareToFriend() {
    console.log('分享到微信');
    this.updateWechatShareCount();
    wx.showToast({
      title: '分享成功',
      icon: 'success'
    });
    this.hideShareModal();
  },





  /**
   * 更新微信分享统计
   */
  updateWechatShareCount() {
    const shareStats = { ...this.data.shareStats };
    shareStats.wechatCount++;
    this.setData({
      shareStats
    });
    console.log('微信分享统计更新:', shareStats);
  },

  /**
   * 分享按钮点击
   */
  onShareButtonTap() {
    this.showShareModal();
  },

  /**
   * 地图标记点击
   */
  onMarkerTap(e) {
    console.log('地图标记点击:', e.detail);
  },

  /**
   * 地图区域变化
   */
  onRegionChange(e) {
    if (e.type === 'end') {
      console.log('地图区域变化:', e.detail);
    }
  },

  /**
   * 地图加载完成
   */
  onMapLoad(e) {
    console.log('地图加载完成:', e.detail);
  },

  onShow() {
    console.log('团队攻略页面显示');
    console.log('当前tripDays数据:', this.data.tripDays);

    // 重新加载当前选中天数的信息
    this.loadDayInfo(this.data.selectedDay);
  },

  onHide() {
    console.log('团队攻略页面隐藏');
  },

  onUnload() {
    console.log('团队攻略页面卸载');
  },

  /**
   * 分享到微信
   */
  onShareAppMessage() {
    return {
      title: this.data.tripTitle,
      path: '/pages/team-strategy/team-strategy',
      imageUrl: '/images/share-cover.jpg'
    };
  },


});
