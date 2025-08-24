Page({
    data: {
      // 用户信息
      userInfo: {
        avatar: 'https://ai-public.mastergo.com/ai/img_res/c1f76d3ef0a0d573caf9c713106c45f1.jpg',
        name: '小8的买买买',
        tag: '旅行遍布 27 个国家和地区',
        userId: '' // 用户ID
      },

      // 导航标签
      mainTabs: [
        { id: 'trips', name: '我的行程', active: true },
        { id: 'team', name: '团队行程', active: false },
        { id: 'guide', name: '出行攻略', active: false }
      ],

      yearTabs: [
        { id: 'all', name: '全部', active: true },
        { id: '2025', name: '2025', active: false },
        { id: '2024', name: '2024', active: false },
        { id: '2023', name: '2023', active: false },
        { id: '2022', name: '2022', active: false }
      ],

      // 我的行程列表
      myTripList: [
        {
          id: 1,
          image: 'https://ai-public.mastergo.com/ai/img_res/4eafde9839e06163ce2a790168c44071.jpg',
          title: '小8的买买买的法意行程',
          days: '12天',
          date: '2025-05-31出发'
        },
        {
          id: 2,
          image: 'https://ai-public.mastergo.com/ai/img_res/913b10a51bbbfe84586937327693871c.jpg',
          title: '小8的买买买的日本行程',
          days: '7天',
          date: '2025-04-31出发'
        },
        {
          id: 3,
          image: 'https://ai-public.mastergo.com/ai/img_res/913b10a51bbbfe84586937327693871c.jpg',
          title: '小8的买买买的日本行程',
          days: '7天',
          date: '2023-04-31出发'
        }
      ],

      // 团队行程列表（空）
      teamTripList: [],

      // 出行攻略列表（空）
      guideList: [],

      // 当前显示的列表
      tripList: []
    },

    onLoad(options) {
      console.log('个人中心页面加载完成', options);
      this.loadUserInfo();
      // 初始化显示我的行程
      this.setData({
        tripList: this.data.myTripList
      });
    },

    onShow() {
      console.log('个人中心页面显示');
    },

    // 返回上一页
    goBack() {
      wx.navigateBack({
        delta: 1
      })
    },

    onReady() {
      console.log('个人中心页面准备完成');
    },

    /**
     * 加载用户信息
     */
    loadUserInfo() {
      try {
        const userAvatar = wx.getStorageSync('userAvatar');
        const userInfo = wx.getStorageSync('userInfo');
        const userId = wx.getStorageSync('userId');

        if (userAvatar && userInfo) {
          this.setData({
            'userInfo.avatar': userAvatar,
            'userInfo.name': userInfo.nickName || '微信用户',
            'userInfo.userId': userId || userInfo.userId || '未获取到用户ID'
          });
        }
      } catch (e) {
        console.error('加载用户信息失败:', e);
      }
    },

    /**
     * 设置按钮点击事件
     */
    onSettingTap() {
      console.log('点击设置按钮');
      wx.showToast({
        title: '设置功能开发中',
        icon: 'none'
      });
    },

    /**
     * 立即制作按钮点击事件
     */
    onCreateTripTap() {
      console.log('点击立即制作按钮');
      wx.navigateTo({
        url: '/pages/create-trip/create-trip',
        success: () => {
          console.log('跳转到创建行程页面成功');
        },
        fail: (error) => {
          console.error('跳转到创建行程页面失败:', error);
          wx.showToast({
            title: '页面跳转失败',
            icon: 'none',
            duration: 2000
          });
        }
      });
    },

    /**
     * 主标签切换事件
     */
    onMainTabTap(e) {
      const index = e.currentTarget.dataset.index;
      const mainTabs = this.data.mainTabs.map((tab, i) => ({
        ...tab,
        active: i === index
      }));

      // 根据选中的标签显示不同的数据
      let currentList = [];
      switch (mainTabs[index].id) {
        case 'trips':
          currentList = this.data.myTripList;
          break;
        case 'team':
          currentList = this.data.teamTripList;
          break;
        case 'guide':
          currentList = this.data.guideList;
          break;
      }

      this.setData({
        mainTabs,
        tripList: currentList
      });
      console.log('切换到主标签:', mainTabs[index].name, '数据条数:', currentList.length);
    },

    /**
     * 年份标签切换事件
     */
    onYearTabTap(e) {
      const index = e.currentTarget.dataset.index;
      const yearTabs = this.data.yearTabs.map((tab, i) => ({
        ...tab,
        active: i === index
      }));

      // 根据选中的年份过滤当前显示的数据
      let filteredList = [];
      const selectedYear = yearTabs[index].id;

      if (selectedYear === 'all') {
        // 显示全部数据
        const activeMainTab = this.data.mainTabs.find(tab => tab.active);
        switch (activeMainTab.id) {
          case 'trips':
            filteredList = this.data.myTripList;
            break;
          case 'team':
            filteredList = this.data.teamTripList;
            break;
          case 'guide':
            filteredList = this.data.guideList;
            break;
        }
      } else {
        // 根据年份过滤数据（这里可以根据实际需求实现年份过滤逻辑）
        const activeMainTab = this.data.mainTabs.find(tab => tab.active);
        switch (activeMainTab.id) {
          case 'trips':
            filteredList = this.data.myTripList.filter(item => item.date && item.date.includes(selectedYear));
            break;
          case 'team':
            filteredList = this.data.teamTripList.filter(item => item.date && item.date.includes(selectedYear));
            break;
          case 'guide':
            filteredList = this.data.guideList.filter(item => item.date && item.date.includes(selectedYear));
            break;
        }
      }

      this.setData({
        yearTabs,
        tripList: filteredList
      });
      console.log('切换到年份标签:', yearTabs[index].name, '过滤后数据条数:', filteredList.length);
    },

    /**
     * 行程卡片点击事件
     */
    onTripCardTap(e) {
      const tripId = e.currentTarget.dataset.tripId;
      console.log('点击行程卡片:', tripId);

      wx.navigateTo({
        url: `/pages/trip-detail/trip-detail?tripId=${tripId}`,
        success: () => {
          console.log('跳转到行程详情页面成功');
        },
        fail: (error) => {
          console.error('跳转到行程详情页面失败:', error);
          wx.showToast({
            title: '页面跳转失败',
            icon: 'none',
            duration: 2000
          });
        }
      });
    },

    /**
     * 底部导航栏点击事件
     */
    onTabBarTap(e) {
      const tabType = e.currentTarget.dataset.type;
      console.log('点击底部导航:', tabType);

      switch (tabType) {
        case 'trips':
          // 已经在个人中心页面，不需要跳转
          break;
        case 'ai':
          wx.navigateTo({
            url: '/pages/create-trip/create-trip',
            success: () => {
              console.log('跳转到AI攻略页面成功');
            },
            fail: (error) => {
              console.error('跳转到AI攻略页面失败:', error);
              wx.showToast({
                title: '页面跳转失败',
                icon: 'none',
                duration: 2000
              });
            }
          });
          break;
        case 'plan':
          wx.navigateTo({
            url: '/pages/index/index',
            success: () => {
              console.log('跳转到行程计划页面成功');
            },
            fail: (error) => {
              console.error('跳转到行程计划页面失败:', error);
              wx.showToast({
                title: '页面跳转失败',
                icon: 'none',
                duration: 2000
              });
            }
          });
          break;
      }
    }
  });