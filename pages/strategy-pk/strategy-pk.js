Page({
  data: {
    currentTab: 0,
    budgetExpanded: true,
    exclusiveExpanded: true,
    accommodationExpanded: true,
    transportationExpanded: true,

    // 差异点展开状态
    coreDifferencesExpanded: true,

    // 已有方案数据
    existingPlans: [
      {
        id: 1,
        title: '高端舒适型',
        subtitle: '南方海滨度假',
        iconText: '💎',
        avatar: '/images/denglu/Ai.png',
        voted: true
      },
      {
        id: 2,
        title: '极致性价比',
        subtitle: '南方海滨度假',
        iconText: '￥',
        avatar: '/images/avatar2.png',
        voted: false
      },
      {
        id: 3,
        title: '网红打卡型',
        subtitle: '南方海滨度假',
        iconText: '📸',
        avatar: '/images/avatar3.png',
        voted: false
      },
      {
        id: 4,
        title: '深度文化型',
        subtitle: '南方海滨度假',
        iconText: '🏛️',
        avatar: '/images/denglu/Ai.png',
        voted: true
      }
    ],

    // 方案亮点数据
    planHighlights: [
      {
        id: 1,
        content: '应该把时间浪费在美好的事物上',
        tags: ['全程五星', '景点包车接送', '私人导览']
      },
      {
        id: 2,
        content: '省的就是赚的，省下的钱可以买手信',
        tags: ['经济连锁', '景点自由行', '公共交通']
      },
      {
        id: 3,
        content: '网红景点打卡，记录美好时光',
        tags: ['热门景点', '拍照圣地', '社交分享']
      },
      {
        id: 4,
        content: '深入了解当地文化，体验不一样的风情',
        tags: ['文化体验', '历史探索', '民俗活动']
      }
    ],

    // 预算价格数据
    budgetItems: [
      {
        label: '总价',
        values: ['¥ 5.8w', '¥ 1.5w', '¥ 3.2w', '¥ 4.5w', '¥ 4.5w']
      },
      {
        label: '餐饮预算',
        values: ['¥ 1.2w', '¥ 4000', '¥ 8000','¥ 6000', '¥ 4.5w']
      },
      {
        label: '酒店预算',
        values: ['¥ 3w', '¥ 6000', '¥ 1.5w', '¥ 2.2w', '¥ 4.5w']
      }
    ],

    // 独家体验数据
    exclusiveItems: [
      {
        label: '特色体验',
        values: ['私人红酒庄园', '唐人节街道表演', '当地民俗体验', '文化讲座体验']
      },
      {
        label: '特色美食',
        values: ['米其林3星（观景位）', '市集自炊体验', '网红餐厅打卡', '传统手工制作']
      },
      {
        label: '特色交通',
        values: ['行李配送', '免费步行导览', '共享单车游览', '文化导览车']
      }
    ],

    // 核心差异对比
    coreDifferences: [
      {
        label: '消费感受',
        values: ['无隐形消费', '极致省钱', '品质优先', '性价比高']
      },
      {
        label: '日均预算',
        values: ['¥2000/人', '¥500/人', '¥1500/人', '¥800/人']
      },
      {
        label: '游玩体验',
        values: ['核心景点+慢体验', '经典景点全覆盖', '深度文化体验', '网红打卡路线']
      },
      {
        label: '日均景点',
        values: ['1-2个', '5-7个', '3-4个', '4-6个']
      },
      {
        label: '日均步数',
        values: ['< 5000步', '> 12000步', '8000-10000步', '6000-8000步']
      },
      {
        label: '换酒店',
        values: ['2次(跨国仅1次)', '5次(跨国换酒店)', '3次(精选位置)', '4次(便捷交通)']
      }
    ],

    // 住宿位置数据
    accommodationItems: [
      {
        label: '位置',
        values: ['核心区五星级酒店', '郊区经济连锁酒店', '市中心精品酒店', '文化区特色民宿']
      },
      {
        label: '时间',
        values: ['步行5分钟到景点', '地铁30分钟到景点', '步行15分钟到景点', '步行10分钟到景点']
      }
    ],

    // 交通方式数据
    transportationItems: [
      {
        label: '主交通',
        values: ['高铁一等座', '跨国大巴', '高铁二等座', '高铁商务座']
      },
      {
        label: '市区内',
        values: ['市区专车接送', '市区地铁通票', '共享单车+步行', '文化导览车+步行']
      }
    ]
  },

  onLoad: function (options) {
    // 页面加载时的初始化
    console.log('页面加载完成');
    
    // 调用API获取数据
    this.loadPageData();
    
    // 根据方案数量设置布局类
    this.setLayoutClass();
  },

  // 加载页面数据
  loadPageData: function() {
    // 显示加载状态
    wx.showLoading({
      title: '加载中...',
      mask: true
    });

    // 并行调用多个API
    Promise.all([
      this.loadPlans(),
      this.loadPlanHighlights(),
      this.loadCompareData()
    ]).then(() => {
      wx.hideLoading();
      console.log('所有数据加载完成');
    }).catch((error) => {
      wx.hideLoading();
      console.error('数据加载失败:', error);
      wx.showToast({
        title: '数据加载失败',
        icon: 'none'
      });
    });
  },

  // 加载方案列表
  loadPlans: function() {
    return new Promise((resolve, reject) => {
      // TODO: 调用后端API获取方案列表
      // wx.request({
      //   url: 'https://your-api.com/api/plans',
      //   method: 'GET',
      //   success: (res) => {
      //     if (res.data.code === 200) {
      //       this.setData({
      //         existingPlans: res.data.data
      //       });
      //       resolve();
      //     } else {
      //       reject(new Error(res.data.message));
      //     }
      //   },
      //   fail: reject
      // });

      // 暂时使用本地数据，等后端接口ready后替换
      console.log('方案列表数据:', this.data.existingPlans);
      resolve();
    });
  },

  // 加载方案亮点
  loadPlanHighlights: function() {
    return new Promise((resolve, reject) => {
      // TODO: 调用后端API获取方案亮点
      // wx.request({
      //   url: 'https://your-api.com/api/plans/highlights',
      //   method: 'GET',
      //   success: (res) => {
      //     if (res.data.code === 200) {
      //       this.setData({
      //         planHighlights: res.data.data
      //       });
      //       resolve();
      //     } else {
      //       reject(new Error(res.data.message));
      //     }
      //   },
      //   fail: reject
      // });

      // 暂时使用本地数据，等后端接口ready后替换
      console.log('方案亮点数据:', this.data.planHighlights);
      resolve();
    });
  },

  // 加载对比数据
  loadCompareData: function() {
    return new Promise((resolve, reject) => {
      // TODO: 调用后端API获取对比数据
      // wx.request({
      //   url: 'https://your-api.com/api/plans/compare',
      //   method: 'GET',
      //   success: (res) => {
      //     if (res.data.code === 200) {
      //       const compareData = res.data.data;
      //       this.setData({
      //         budgetItems: compareData.budgetItems || this.data.budgetItems,
      //         exclusiveItems: compareData.exclusiveItems || this.data.exclusiveItems,
      
      //         accommodationItems: compareData.accommodationItems || this.data.accommodationItems,
      //         transportationItems: compareData.transportationItems || this.data.transportationItems
      //       });
      //       resolve();
      //     } else {
      //       reject(new Error(res.data.message));
      //     }
      //   },
      //   fail: reject
      // });

      // 暂时使用本地数据，等后端接口ready后替换
      console.log('对比数据加载完成');
      resolve();
    });
  },

  // 添加或删除方案时重新计算布局
  updatePlansAndLayout: function(newPlans) {
    this.setData({
      existingPlans: newPlans
    });
    this.setLayoutClass();
  },

  // 返回上一页
  goBack: function() {
    wx.navigateBack();
  },

  // 关闭页面
  closePage: function() {
    wx.navigateBack();
  },

  // 切换标签页
  switchTab: function(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentTab: parseInt(index)
    });
  },

  // 投票功能
  toggleVote: function(e) {
    const planId = e.currentTarget.dataset.id;
    const plans = this.data.existingPlans;
    const currentPlan = plans.find(p => p.id === planId);
    const newVoteStatus = !currentPlan.voted;
    
    // 显示加载状态
    wx.showLoading({
      title: newVoteStatus ? '投票中...' : '取消投票中...',
      mask: true
    });

    // TODO: 调用后端API更新投票状态
    // this.updateVoteStatus(planId, newVoteStatus).then(() => {
    //   // 更新前端状态
    //   plans.forEach(plan => {
    //     if (plan.id === planId) {
    //       plan.voted = newVoteStatus;
    //     }
    //   });
    //   
    //   this.setData({
    //     existingPlans: plans
    //   });
    //   
    //   wx.hideLoading();
    //   wx.showToast({
    //     title: newVoteStatus ? '投票成功' : '取消投票',
    //     icon: 'success',
    //     duration: 1500
    //   });
    // }).catch((error) => {
    //   wx.hideLoading();
    //   console.error('投票失败:', error);
    //   wx.showToast({
    //     title: '投票失败，请重试',
    //     icon: 'none'
    //   });
    // });

    // 暂时使用本地数据，等后端接口ready后替换
    plans.forEach(plan => {
      if (plan.id === planId) {
        plan.voted = newVoteStatus;
      }
    });
    
    this.setData({
      existingPlans: plans
    });

    wx.hideLoading();
    wx.showToast({
      title: newVoteStatus ? '投票成功' : '取消投票',
      icon: 'success',
      duration: 1500
    });
  },

  // 更新投票状态API
  updateVoteStatus: function(planId, voteStatus) {
    return new Promise((resolve, reject) => {
      const url = voteStatus 
        ? `https://your-api.com/api/plans/${planId}/vote`      // 投票
        : `https://your-api.com/api/plans/${planId}/vote`;     // 取消投票
      
      wx.request({
        url: url,
        method: voteStatus ? 'POST' : 'DELETE',
        header: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer ' + wx.getStorageSync('token') // 如果需要认证
        },
        success: (res) => {
          if (res.data.code === 200) {
            resolve(res.data);
          } else {
            reject(new Error(res.data.message || '投票失败'));
          }
        },
        fail: reject
      });
    });
  },

  // 切换核心差异展开状态
  toggleCoreDifferences: function() {
    this.setData({
      coreDifferencesExpanded: !this.data.coreDifferencesExpanded
    });
  },

  // 切换预算价格展开状态
  toggleBudget: function() {
    this.setData({
      budgetExpanded: !this.data.budgetExpanded
    });
  },

  // 切换独家体验展开状态
  toggleExclusive: function() {
    this.setData({
      exclusiveExpanded: !this.data.exclusiveExpanded
    });
  },

  // 切换住宿位置展开状态
  toggleAccommodation: function() {
    this.setData({
      accommodationExpanded: !this.data.accommodationExpanded
    });
  },

  // 切换交通方式展开状态
  toggleTransportation: function() {
    this.setData({
      transportationExpanded: !this.data.transportationExpanded
    });
  },

  // 下载报告
  downloadReport: function() {
    wx.showToast({
      title: '正在生成报告...',
      icon: 'loading',
      duration: 2000
    });
    
    // 这里可以添加实际的下载逻辑
    setTimeout(() => {
      wx.showToast({
        title: '报告已保存到相册',
        icon: 'success',
        duration: 2000
      });
    }, 2000);
  },

  // 分享行程
  shareItinerary: function() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
    
    wx.showToast({
      title: '请选择分享方式',
      icon: 'none',
      duration: 1500
    });
  },

  // 分享给朋友
  onShareAppMessage: function() {
    return {
      title: '行程PK对比 - 找到最适合的旅行方案',
      path: '/pages/strategy-pk/strategy-pk'
    };
  },

  // 分享到朋友圈
  onShareTimeline: function() {
    return {
      title: '行程PK对比 - 找到最适合的旅行方案'
    };
  },

  // 生成AI融合方案
  generateFusionPlan: function() {
    wx.showToast({
      title: '正在生成融合方案...',
      icon: 'loading',
      duration: 3000
    });
    
    // 这里可以调用AI算法生成融合方案
    setTimeout(() => {
      wx.showToast({
        title: '融合方案生成完成！',
        icon: 'success',
        duration: 2000
      });
      
      // 可以在这里跳转到融合结果页面或显示结果
      console.log('AI融合方案生成完成');
    }, 3000);
  },

  // 根据方案数量设置布局类
  setLayoutClass: function() {
    const planCount = this.data.existingPlans.length;
    let layoutClass = '';
    
    if (planCount === 1) {
      layoutClass = 'one-plan';
    } else if (planCount === 2) {
      layoutClass = 'two-plans';
    } else if (planCount === 3) {
      layoutClass = 'three-plans';
    } else if (planCount === 4) {
      layoutClass = 'four-plans';
    } else if (planCount >= 5) {
      layoutClass = 'five-plus';
    }
    
    console.log('方案数量:', planCount, '布局类:', layoutClass);
    console.log('当前数据:', this.data.existingPlans);
    
    this.setData({
      layoutClass: layoutClass
    });
    
    // 延迟检查布局类是否设置成功
    setTimeout(() => {
      console.log('设置后的布局类:', this.data.layoutClass);
    }, 100);
  },

  // 刷新页面数据
  refreshData: function() {
    console.log('刷新页面数据');
    this.loadPageData();
  },

  // 下拉刷新
  onPullDownRefresh: function() {
    this.refreshData();
    wx.stopPullDownRefresh();
  },

  // 页面显示时刷新数据（可选）
  onShow: function() {
    // 如果需要在页面显示时刷新数据，可以取消注释下面这行
    // this.refreshData();
  }
});
