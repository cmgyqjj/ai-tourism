Page({
  data: {
    currentTab: 0,
    budgetExpanded: true,
    exclusiveExpanded: true,
    accommodationExpanded: true,
    transportationExpanded: true,
    coreDifferencesExpanded: true,

    // 导出长图相关配置
    exportWidth: 750,
    exportHeight: 0,

    // 已有方案数据
    existingPlans: [
      {
        id: 1,
        title: '高端舒适型',
        subtitle: '南方海滨度假',
        iconText: '💎',
        avatar: 'https://p0.meituan.net/hackathonqjj/066f1f168c7a71a45bf97c3771862cab74240.png',
        voted: true
      },
      {
        id: 2,
        title: '极致性价比',
        subtitle: '南方海滨度假',
        iconText: '￥',
        avatar: 'https://p0.meituan.net/hackathonqjj/0ec13a2a63f03daac48863d1fa57995f6194.png',
        voted: false
      },
      {
        id: 3,
        title: '网红打卡型',
        subtitle: '南方海滨度假',
        iconText: '📸',
        avatar: 'https://p0.meituan.net/hackathonqjj/0ec13a2a63f03daac48863d1fa57995f6194.png',
        voted: false
      },

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

    ],

    // 预算价格数据
    budgetItems: [
      {
        label: '总价',
        values: ['¥ 5.8w', '¥ 1.5w', '¥ 3.2w']
      },
      {
        label: '餐饮预算',
        values: ['¥ 1.2w', '¥ 4000', '¥ 8000']
      },
      {
        label: '酒店预算',
        values: ['¥ 3w', '¥ 6000', '¥ 1.5w']
      },

    ],

    // 独家体验数据
    exclusiveItems: [
      {
        label: '特色体验',
        values: ['私人红酒庄园', '唐人节街道表演', '当地民俗体验']
      },
      {
        label: '特色美食',
        values: ['米其林3星（观景位）', '市集自炊体验', '网红餐厅打卡']
      },
      {
        label: '特色交通',
        values: ['行李配送', '免费步行导览', '共享单车游览']
      }
    ],

    // 核心差异对比
    coreDifferences: [
      {
        label: '消费感受',
        values: ['无隐形消费', '极致省钱', '品质优先']
      },
      {
        label: '日均预算',
        values: ['¥2000/人', '¥500/人', '¥1500/人']
      },
      {
        label: '游玩体验',
        values: ['核心景点+慢体验', '经典景点全覆盖', '深度文化体验']
      },
      {
        label: '日均景点',
        values: ['1-2个', '5-7个', '3-4个']
      },
      {
        label: '日均步数',
        values: ['< 5000步', '> 12000步', '8000-10000步']
      },
      {
        label: '换酒店',
        values: ['2次(跨国仅1次)', '5次(跨国换酒店)', '3次(精选位置)']
      }
    ],

    // 住宿位置数据
    accommodationItems: [
      {
        label: '位置',
        values: ['核心区五星级酒店', '郊区经济连锁酒店', '市中心精品酒店']
      },
      {
        label: '时间',
        values: ['步行5分钟到景点', '地铁30分钟到景点', '步行15分钟到景点']
      }
    ],

    // 交通方式数据
    transportationItems: [
      {
        label: '主交通',
        values: ['高铁一等座', '跨国大巴', '高铁二等座']
      },
      {
        label: '市区内',
        values: ['市区专车接送', '市区地铁通票', '共享单车+步行']
      }
    ]
  },

  onLoad: function (options) {
    console.log('页面加载完成');
    this.loadPageData();
    this.setLayoutClass();
  },

  // 加载页面数据
  loadPageData: function() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });

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

      console.log('方案列表数据:', this.data.existingPlans);
      resolve();
    });
  },

  // 加载方案亮点
  loadPlanHighlights: function() {
    return new Promise((resolve, reject) => {
      // TODO: 调用后端API获取方案亮点
      // wx.request({

      //   url: 'https://your-api.com/api.com/api/plans/highlights',
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

      console.log('对比数据加载完成');
      resolve();
    });
  },

  // 返回上一页
  goBack: function() {
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
    
    wx.showLoading({
      title: newVoteStatus ? '投票中...' : '取消投票中...',
      mask: true
    });

    // TODO: 调用后端API更新投票状态
    // this.updateVoteStatus(planId, newVoteStatus).then(() => {
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



  // 微信分享接口 - 当用户点击分享按钮时自动调用
  onShareAppMessage: function() {
    console.log('🎯 分享功能被调用了！');
    
    const { existingPlans, currentTab } = this.data;
    
    // 生成分享标题
    let shareTitle = '行程PK对比报告';
    if (existingPlans && existingPlans.length > 0) {
      const planNames = existingPlans.map(plan => plan.title).join(' vs ');
      shareTitle = `${planNames} - 行程PK对比`;
    }
    
    // 生成分享描述
    let shareDesc = 'AI智能行程对比，帮你选择最佳旅行方案';
    if (existingPlans && existingPlans.length > 0) {
      shareDesc = `${existingPlans.length}个行程方案详细对比，包含预算、体验、住宿等全方位分析`;
    }
    
    // 生成分享路径
    const sharePath = `/pages/strategy-pk/strategy-pk?shared=true&timestamp=${Date.now()}`;
    
    // 如果有行程数据，添加到分享路径
    if (existingPlans && existingPlans.length > 0) {
      const planIds = existingPlans.map(plan => plan.id).join(',');
      sharePath += `&planIds=${planIds}`;
    }
    
    const shareData = {
      title: shareTitle,
      desc: shareDesc,
      path: sharePath,
      imageUrl: '/images/avatar1.png' // 可以替换为实际的分享图片
    };
    
    console.log('📤 分享数据:', shareData);
    
    return shareData;
  },

  // 分享到朋友圈
  onShareTimeline: function() {
    const { existingPlans } = this.data;
    
    let timelineTitle = '行程PK对比报告';
    if (existingPlans && existingPlans.length > 0) {
      const planNames = existingPlans.map(plan => plan.title).join(' vs ');
      timelineTitle = `${planNames} - 行程PK对比`;
    }
    
    return {
      title: timelineTitle,
      imageUrl: '/images/avatar1.png',
      query: `shared=true&timestamp=${Date.now()}`
    };
  },

  // 生成AI融合方案
  generateFusionPlan: function() {
    wx.showToast({
      title: '正在生成融合方案...',
      icon: 'loading',
      duration: 3000
    });
    
    setTimeout(() => {
      wx.showToast({
        title: '融合方案生成完成！',
        icon: 'success',
        duration: 2000
      });
      
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
    
    setTimeout(() => {
      console.log('设置后的布局类:', this.data.layoutClass);
    }, 100);
  },

  // 下拉刷新
  onPullDownRefresh: function() {
    this.loadPageData();
    wx.stopPullDownRefresh();
  },

  // ==================== 长图生成功能 ====================
  
  // 下载对比报告
  downloadReport: function() {
    wx.showLoading({ title: '正在生成对比图...' });
    this.generateComparisonImageNew();
  },

  // 生成简单测试图片
  generateSimpleTestImage: function() {
    const query = wx.createSelectorQuery().in(this);
    query.select('#exportCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res[0] || !res[0].node) {
        wx.hideLoading();
          wx.showToast({ title: 'Canvas获取失败', icon: 'none' });
          return;
        }

        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        
        // 设置画布尺寸
        canvas.width = 750;
        canvas.height = 1000;
        
        // 白色背景
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 750, 1000);
        
        // 绘制简单内容
        ctx.fillStyle = '#333333';
        ctx.font = '24px sans-serif';
        ctx.fillText('测试标题', 50, 50);
        
        ctx.font = '16px sans-serif';
        ctx.fillText('这是一个测试图片', 50, 100);
        
        // 绘制表格测试
        ctx.strokeStyle = '#cccccc';
        ctx.strokeRect(50, 150, 600, 40);
        ctx.fillText('表格标题', 60, 165);
        
        ctx.strokeRect(50, 190, 150, 40);
        ctx.fillText('标签1', 60, 205);
        
        ctx.strokeRect(200, 190, 150, 40);
        ctx.fillText('值1', 210, 205);
        
        ctx.strokeRect(350, 190, 150, 40);
        ctx.fillText('值2', 360, 205);
        
        // 导出图片
        wx.canvasToTempFilePath({
          canvas: canvas,
          x: 0,
          y: 0,
          width: 750,
          height: 1000,
          destWidth: 750,
          destHeight: 1000,
          fileType: 'jpg',
          quality: 0.9,
          success: (res) => {
            this.saveImageToAlbum(res.tempFilePath);
          },
          fail: (error) => {
      wx.hideLoading();
            console.error('导出失败:', error);
            wx.showToast({ title: '导出失败', icon: 'none' });
          }
        }, this);
      });
  },

  // 生成新的对比图（基于成功的简单绘制逻辑）
  generateComparisonImageNew: function() {
    console.log('=== 开始生成对比图 ===');
    console.log('页面数据:', this.data);
    console.log('已有方案:', this.data.existingPlans);
    console.log('方案亮点:', this.data.planHighlights);
    console.log('预算数据:', this.data.budgetItems);
    
    const query = wx.createSelectorQuery().in(this);
    query.select('#exportCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res[0] || !res[0].node) {
      wx.hideLoading();
          wx.showToast({ title: 'Canvas获取失败', icon: 'none' });
          return;
        }

        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        
        // 计算总高度
        let totalHeight = 100; // 顶部间距
        
        // 标题区域高度
        totalHeight += 60;
        
        // 已有方案区域高度
        if (this.data.existingPlans && this.data.existingPlans.length > 0) {
          totalHeight += 40; // 标题
          totalHeight += 120; // 方案卡片区域
          totalHeight += 30; // 底部间距
        }
        
        // 根据当前标签页确定要显示的内容
        const currentTab = this.data.currentTab || 0;
        let tables = [];
        
        if (currentTab === 0) {
          // 基本信息标签页
          tables = [
            { title: '方案亮点', data: this.data.planHighlights, type: 'highlights' },
            { title: '预算价格', data: this.data.budgetItems, type: 'budget' },
            { title: '独家体验', data: this.data.exclusiveItems, type: 'exclusive' },
            { title: '住宿安排', data: this.data.accommodationItems, type: 'accommodation' },
            { title: '交通方式', data: this.data.transportationItems, type: 'transportation' }
          ];
        } else if (currentTab === 1) {
          // 差异点标签页
          tables = [
            { title: '核心差异', data: this.data.coreDifferences, type: 'differences' },
         
          ];
        } else if (currentTab === 2) {
          // AI融合标签页
          tables = [
            { title: 'AI推荐', data: this.data.aiRecommendations || [], type: 'ai' }
          ];
        }
        
        console.log(`当前标签页: ${currentTab}, 将显示表格:`, tables.map(t => t.title));
        
        console.log('表格数据检查:');
        tables.forEach((table, index) => {
          console.log(`${index + 1}. ${table.title}:`, {
            hasData: !!table.data,
            dataLength: table.data ? table.data.length : 0,
            dataContent: table.data
          });
          
          if (table.data && table.data.length > 0) {
            totalHeight += 40; // 标题
            totalHeight += table.data.length * 45; // 数据行
            totalHeight += 30; // 底部间距
          }
        });
        
        console.log('计算的总高度:', totalHeight);
        
        // 设置画布尺寸
        canvas.width = 750;
        canvas.height = Math.max(totalHeight, 1000);
        
        console.log('Canvas尺寸设置完成:', canvas.width, 'x', canvas.height);
        
        // 绘制白色背景
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 750, canvas.height);
        console.log('白色背景绘制完成');
        
        let currentY = 50;
        
        // 绘制主标题 - 根据当前标签页显示不同标题
        ctx.fillStyle = '#333333';
        ctx.font = 'bold 24px sans-serif';
        
        let mainTitle = '行程对比报告';
        if (currentTab === 1) {
          mainTitle = '差异点对比报告';
        } else if (currentTab === 2) {
          mainTitle = 'AI融合对比报告';
        }
        
        ctx.fillText(mainTitle, 50, currentY);
        console.log('主标题绘制完成:', mainTitle, 'at (50,', currentY, ')');
        currentY += 60;
        
        // 绘制已有方案区域
        if (this.data.existingPlans && this.data.existingPlans.length > 0) {
          console.log('开始绘制已有方案区域');
          currentY = this.drawExistingPlans(ctx, 50, currentY);
          console.log('已有方案区域绘制完成，当前Y:', currentY);
          currentY += 30;
        }
        
        // 绘制各个表格
        tables.forEach((table, index) => {
          console.log(`开始绘制表格 ${index + 1}: ${table.title}`);
          if (table.data && table.data.length > 0) {
            // 特殊处理方案亮点数据
            if (table.type === 'highlights') {
              console.log('方案亮点特殊处理，原始数据:', table.data);
              // 检查数据结构
              if (table.data[0] && table.data[0].values) {
                console.log('方案亮点values:', table.data[0].values);
                // 确保每个方案都有亮点数据
                table.data[0].values.forEach((value, i) => {
                  console.log(`方案${i}亮点值:`, value);
                });
              }
            }
            
            currentY = this.drawSimpleTable(ctx, 50, currentY, table.title, table.data, table.type);
            console.log(`表格 ${table.title} 绘制完成，当前Y:`, currentY);
            currentY += 30; // 表格间距
          } else {
            console.log(`表格 ${table.title} 数据为空，跳过`);
          }
        });
        
        // 导出图片
        wx.canvasToTempFilePath({
          canvas: canvas,
          x: 0,
          y: 0,
          width: 750,
          height: canvas.height,
          destWidth: 750,
          destHeight: canvas.height,
          fileType: 'jpg',
          quality: 0.9,
          success: (res) => {
            this.saveImageToAlbum(res.tempFilePath);
          },
          fail: (error) => {
            wx.hideLoading();
            console.error('导出失败:', error);
            wx.showToast({ title: '导出失败', icon: 'none' });
          }
        }, this);
      });
  },

  // 绘制已有方案区域
  drawExistingPlans: function(ctx, x, y) {
    let currentY = y;
    
    // 绘制区域标题
    ctx.fillStyle = '#333333';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText('已有方案', x, currentY);
    currentY += 35;
    
    // 绘制方案卡片
    const planCount = this.data.existingPlans.length;
    const cardWidth = planCount > 0 ? (650 / planCount) : 200;
    const cardHeight = 100;
    
    this.data.existingPlans.forEach((plan, index) => {
      const cardX = x + index * (cardWidth + 20);
      
      // 绘制卡片背景
      ctx.fillStyle = '#f8f9fa';
      ctx.fillRect(cardX, currentY, cardWidth, cardHeight);
      ctx.strokeStyle = '#e0e0e0';
      ctx.strokeRect(cardX, currentY, cardWidth, cardHeight);
      
      // 绘制投票状态
      const voted = plan.voted || false;
      ctx.fillStyle = voted ? '#28a745' : '#ffc107';
      ctx.font = '12px sans-serif';
      ctx.fillText(voted ? '已投票' : '未投票', cardX + 10, currentY + 15);
      
      // 绘制方案标题
      ctx.fillStyle = '#333333';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText(plan.title || `方案${index + 1}`, cardX + 10, currentY + 35);
      
      // 绘制副标题
      ctx.font = '12px sans-serif';
      ctx.fillStyle = '#666666';
      ctx.fillText(plan.subtitle || '南方海滨度假', cardX + 10, currentY + 55);
      
      // 绘制描述
      if (plan.description) {
        ctx.font = '10px sans-serif';
        ctx.fillStyle = '#999999';
        // 截断过长的描述
        const maxLength = Math.floor((cardWidth - 20) / 8);
        const displayDesc = plan.description.length > maxLength ? 
          plan.description.substring(0, maxLength) + '...' : plan.description;
        ctx.fillText(displayDesc, cardX + 10, currentY + 75);
      }
    });
    
    return currentY + cardHeight;
  },

  // 绘制简单表格
  drawSimpleTable: function(ctx, x, y, title, dataItems, type) {
    console.log(`drawSimpleTable 开始: ${title}, 类型: ${type}, 数据:`, dataItems);
    console.log(`绘制位置: x=${x}, y=${y}`);
    
    let currentY = y;
    
    // 绘制表格标题
    ctx.fillStyle = '#333333';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText(title, x, currentY);
    console.log(`表格标题绘制完成: ${title} at (${x}, ${currentY})`);
    currentY += 35;
    
    // 对于方案亮点，不显示"项目"列，直接显示方案内容
    if (type === 'highlights') {
      const planCount = this.data.existingPlans.length;
      const valueWidth = planCount > 0 ? 650 / planCount : 200;
      
      // 绘制方案列表头
      this.data.existingPlans.forEach((plan, index) => {
        const headerX = x + index * valueWidth;
        ctx.fillStyle = '#f5f5f5';
        ctx.fillRect(headerX, currentY, valueWidth, 40);
        ctx.strokeRect(headerX, currentY, valueWidth, 40);
        
        ctx.fillStyle = '#333333';
        ctx.font = '14px sans-serif';
        ctx.fillText(plan.title || `方案${index + 1}`, headerX + 10, currentY + 25);
      });
      
      currentY += 40;
      
             // 绘制方案亮点内容
       if (dataItems && dataItems.length > 0) {
         console.log('方案亮点数据:', dataItems);
         
         // 直接绘制每个方案的亮点内容，不显示"项目"列
         // 确保方案亮点数量与已有方案数量一致
         const planCount = this.data.existingPlans.length;
         const maxItems = Math.min(dataItems.length, planCount);
         
         console.log(`方案数量: ${planCount}, 亮点数据数量: ${dataItems.length}, 实际绘制数量: ${maxItems}`);
         
         for (let colIndex = 0; colIndex < planCount; colIndex++) {
           const cellX = x + colIndex * valueWidth;
           ctx.fillStyle = '#ffffff';
           ctx.fillRect(cellX, currentY, valueWidth, 40);
           ctx.strokeRect(cellX, currentY, valueWidth, 40);
           
           ctx.fillStyle = '#333333';
           ctx.font = '14px sans-serif';
           
           // 获取要显示的亮点内容
           let displayValue = '';
           if (colIndex < maxItems && dataItems[colIndex]) {
             const item = dataItems[colIndex];
             if (item.tags && Array.isArray(item.tags) && item.tags.length > 0) {
               displayValue = item.tags.join('、'); // 将标签用"、"连接
               console.log(`方案${colIndex}亮点标签:`, item.tags, '连接后:', displayValue);
             } else {
               displayValue = String(item.content || ''); // 如果没有tags，回退到content
               console.log(`方案${colIndex}使用content作为回退:`, displayValue);
             }
           } else {
             // 如果亮点数据不足，显示默认内容
             displayValue = `方案${colIndex + 1}亮点`;
             console.log(`方案${colIndex}使用默认内容:`, displayValue);
           }
           
           console.log(`方案${colIndex}最终显示内容:`, displayValue);
           
           // 处理文本换行
           const maxWidth = valueWidth - 20;
           if (ctx.measureText(displayValue).width > maxWidth) {
             // 文本过长，需要换行
             let lines = [];
             let currentLine = '';
             for (let i = 0; i < displayValue.length; i++) {
               const testLine = currentLine + displayValue[i];
               if (ctx.measureText(testLine).width > maxWidth) {
                 lines.push(currentLine);
                 currentLine = displayValue[i];
               } else {
                 currentLine = testLine;
               }
             }
             if (currentLine) {
               lines.push(currentLine);
             }
             
             // 绘制多行文本
             lines.forEach((line, lineIndex) => {
               if (lineIndex < 2) { // 最多显示2行
                 ctx.fillText(line, cellX + 10, currentY + 15 + lineIndex * 20);
               }
             });
           } else {
             ctx.fillText(displayValue, cellX + 10, currentY + 25);
           }
           
           console.log(`方案${colIndex}亮点绘制完成:`, displayValue);
         }
         
         currentY += 40;
       }
     } else {
      // 其他表格保持原有逻辑
      const labelWidth = 120;
      const planCount = this.data.existingPlans.length;
      const valueWidth = planCount > 0 ? (650 - labelWidth) / planCount : 200;
      
      // 绘制表头
      ctx.fillStyle = '#f5f5f5';
      ctx.fillRect(x, currentY, labelWidth, 40);
      ctx.strokeStyle = '#ddd';
      ctx.strokeRect(x, currentY, labelWidth, 40);
      
      ctx.fillStyle = '#333333';
      ctx.font = '14px sans-serif';
      ctx.fillText('项目', x + 10, currentY + 25);
      
      // 绘制方案列表头
      this.data.existingPlans.forEach((plan, index) => {
        const headerX = x + labelWidth + index * valueWidth;
        ctx.fillStyle = '#f5f5f5';
        ctx.fillRect(headerX, currentY, valueWidth, 40);
        ctx.strokeRect(headerX, currentY, valueWidth, 40);
        
        ctx.fillStyle = '#333333';
        ctx.fillText(plan.title || `方案${index + 1}`, headerX + 10, currentY + 25);
      });
      
      currentY += 40;
      
      // 绘制数据行
      dataItems.forEach((item, rowIndex) => {
        const rowY = currentY + rowIndex * 40;
        
        // 标签列
        ctx.fillStyle = rowIndex % 2 === 0 ? '#ffffff' : '#fafafa';
        ctx.fillRect(x, rowY, labelWidth, 40);
        ctx.strokeRect(x, rowY, labelWidth, 40);
        
        ctx.fillStyle = '#333333';
        ctx.fillText(item.label || '项目', x + 10, rowY + 25);
        
        // 数据列
        if (item.values) {
          item.values.forEach((value, colIndex) => {
            const cellX = x + labelWidth + colIndex * valueWidth;
            ctx.fillStyle = rowIndex % 2 === 0 ? '#ffffff' : '#fafafa';
            ctx.fillRect(cellX, rowY, valueWidth, 40);
            ctx.strokeRect(cellX, rowY, valueWidth, 40);
            
            ctx.fillStyle = '#333333';
            // 处理特殊数据类型
            let displayValue = '';
            if (Array.isArray(value)) {
              displayValue = value.join('、');
        } else {
              displayValue = String(value || '');
            }
            
            // 处理文本换行
            const maxWidth = valueWidth - 20;
            if (ctx.measureText(displayValue).width > maxWidth) {
              // 文本过长，需要换行
              let lines = [];
              let currentLine = '';
              for (let i = 0; i < displayValue.length; i++) {
                const testLine = currentLine + displayValue[i];
                if (ctx.measureText(testLine).width > maxWidth) {
                  lines.push(currentLine);
                  currentLine = displayValue[i];
                } else {
                  currentLine = testLine;
                }
              }
              if (currentLine) {
                lines.push(currentLine);
              }
              
              // 绘制多行文本
              lines.forEach((line, lineIndex) => {
                if (lineIndex < 2) { // 最多显示2行
                  ctx.fillText(line, cellX + 10, rowY + 15 + lineIndex * 20);
                }
              });
            } else {
              ctx.fillText(displayValue, cellX + 10, rowY + 25);
            }
          });
        }
      });
      
      currentY += dataItems.length * 40;
    }
    
    return currentY;
  },

  // 生成对比图
  generateComparisonImage: function() {
    try {
      // 调试：打印当前数据
      console.log('=== 开始生成对比图 ===');
      console.log('方案数据:', this.data.existingPlans);
      console.log('预算数据:', this.data.budgetItems);
      console.log('独家体验数据:', this.data.exclusiveItems);
      console.log('亮点数据:', this.data.planHighlights);
      
      // 先测量内容，计算总高度
      const { boxes, totalHeight } = this.measureAllContent();
      
      console.log('生成盒子数量:', boxes.length);
      console.log('总高度:', totalHeight);
      
      // 设置画布高度
      this.setData({
        exportHeight: totalHeight
      });

      // 等待数据更新后渲染
      setTimeout(() => {
        this.renderAndExport(boxes, totalHeight);
      }, 100);

    } catch (error) {
      wx.hideLoading();
      console.error('生成对比图失败:', error);
      wx.showToast({
        title: '生成失败，请重试',
        icon: 'none'
      });
    }
  },

  // 测量所有内容，返回布局盒子
  measureAllContent: function() {
    const boxes = [];
    let y = 40; // 起始Y坐标
    
    // 1. 主标题
    boxes.push({
      x: 24, y, w: 702, h: 48,
      draw: (ctx) => {
        ctx.fillStyle = '#333';
        ctx.font = 'bold 24px sans-serif';
        ctx.fillText('行程方案PK对比报告', 24, y + 32);
      }
    });
    y += 48;

    // 2. 副标题
    boxes.push({
      x: 24, y, w: 702, h: 32,
      draw: (ctx) => {
        ctx.fillStyle = '#666';
        ctx.font = '16px sans-serif';
        ctx.fillText('基于AI智能分析的详细对比', 24, y + 22);
      }
    });
    y += 40;

    // 3. 方案卡片区域
    const planBoxes = this.layoutPlanCards(24, y);
    boxes.push(...planBoxes.boxes);
    y = planBoxes.yEnd + 40;

    // 4. 方案亮点表格
    if (this.data.planHighlights && this.data.planHighlights.length > 0) {
      const highlightBoxes = this.layoutDataTable(24, y, '方案亮点', this.data.planHighlights, 'highlights');
      boxes.push(...highlightBoxes.boxes);
      y = highlightBoxes.yEnd + 40;
    }

    // 5. 预算价格表格
    if (this.data.budgetItems && this.data.budgetItems.length > 0) {
      const budgetBoxes = this.layoutDataTable(24, y, '预算价格对比', this.data.budgetItems);
      boxes.push(...budgetBoxes.boxes);
      y = budgetBoxes.yEnd + 40;
    }

    // 6. 独家体验表格
    if (this.data.exclusiveItems && this.data.exclusiveItems.length > 0) {
      const exclusiveBoxes = this.layoutDataTable(24, y, '独家体验对比', this.data.exclusiveItems);
      boxes.push(...exclusiveBoxes.boxes);
      y = exclusiveBoxes.yEnd + 40;
    }

    // 7. 核心差异表格
    if (this.data.coreDifferences && this.data.coreDifferences.length > 0) {
      const coreBoxes = this.layoutDataTable(24, y, '核心差异对比', this.data.coreDifferences);
      boxes.push(...coreBoxes.boxes);
      y = coreBoxes.yEnd + 40;
    }

    // 8. 住宿位置表格
    if (this.data.accommodationItems && this.data.accommodationItems.length > 0) {
      const accommodationBoxes = this.layoutDataTable(24, y, '住宿位置对比', this.data.accommodationItems);
      boxes.push(...accommodationBoxes.boxes);
      y = accommodationBoxes.yEnd + 40;
    }

    // 9. 交通方式表格
    if (this.data.transportationItems && this.data.transportationItems.length > 0) {
      const transportBoxes = this.layoutDataTable(24, y, '交通方式对比', this.data.transportationItems);
      boxes.push(...transportBoxes.boxes);
      y = transportBoxes.yEnd + 40;
    }

    return { boxes, totalHeight: y };
  },

  // 布局方案卡片
  layoutPlanCards: function(xStart, yStart) {
    const boxes = [];
    let y = yStart;
    const cardWidth = 160;
    const cardHeight = 120;
    const gap = 20;
    const cardsPerRow = 4;
    
    // 区域标题
    boxes.push({
      x: xStart, y, w: 702, h: 32,
      draw: (ctx) => {
        ctx.fillStyle = '#333';
        ctx.font = 'bold 18px sans-serif';
        ctx.fillText('已有方案', xStart, y + 22);
      }
    });
    y += 40;

    // 方案卡片
    this.data.existingPlans.forEach((plan, index) => {
      const row = Math.floor(index / cardsPerRow);
      const col = index % cardsPerRow;
      const x = xStart + col * (cardWidth + gap);
      const cardY = y + row * (cardHeight + gap);

      // 卡片背景
      boxes.push({
        x, y: cardY, w: cardWidth, h: cardHeight,
        draw: (ctx) => {
          // 卡片背景
          ctx.fillStyle = '#fff';
          ctx.fillRect(x, cardY, cardWidth, cardHeight);
          ctx.strokeStyle = '#e0e0e0';
          ctx.lineWidth = 1;
          ctx.strokeRect(x, cardY, cardWidth, cardHeight);

          // 投票状态角标
          const statusColor = plan.voted ? '#FFD700' : '#333';
          ctx.fillStyle = statusColor;
    ctx.beginPath();
          ctx.arc(x + 20, cardY + 20, 8, 0, 2 * Math.PI);
          ctx.fill();

          // 方案图标
          ctx.fillStyle = '#333';
          ctx.font = '20px sans-serif';
          ctx.fillText(plan.iconText || '✈', x + cardWidth/2 - 10, cardY + 50);
    
    // 方案标题
          ctx.font = '14px sans-serif';
          ctx.fillText(plan.title, x + 10, cardY + 80);

          // 方案副标题
          ctx.fillStyle = '#666';
          ctx.font = '12px sans-serif';
          ctx.fillText(plan.subtitle || '', x + 10, cardY + 100);
        }
      });
    });

    const rows = Math.ceil(this.data.existingPlans.length / cardsPerRow);
    const yEnd = y + rows * (cardHeight + gap);
    
    return { boxes, yEnd };
  },

  // 通用数据表格布局函数
  layoutDataTable: function(xStart, yStart, title, dataItems, type) {
    console.log(`布局表格: ${title}`, dataItems);
    const boxes = [];
    let y = yStart;
    const rowHeight = 36;
    const colGap = 16;
    
    // 区域标题
    boxes.push({
      x: xStart, y, w: 702, h: 32,
      draw: (ctx) => {
        ctx.save();
        ctx.fillStyle = '#333333';
        ctx.font = 'bold 18px sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(title, xStart, y + 8);
        ctx.restore();
        console.log(`绘制标题: ${title} at (${xStart}, ${y})`);
      }
    });
    y += 40;

    // 计算列宽
    const labelColWidth = 120;
    const planColWidth = (702 - labelColWidth - colGap * 3) / Math.max(this.data.existingPlans.length, 1);

    // 表头
    boxes.push({
      x: xStart, y, w: labelColWidth, h: rowHeight,
      draw: (ctx) => {
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(xStart, y, labelColWidth, rowHeight);
        ctx.strokeStyle = '#e0e0e0';
        ctx.strokeRect(xStart, y, labelColWidth, rowHeight);
        
        ctx.fillStyle = '#333';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText('项目', xStart + 10, y + 24);
      }
    });

    // 方案列表头
    this.data.existingPlans.forEach((plan, index) => {
      const x = xStart + labelColWidth + colGap + index * (planColWidth + colGap);
      boxes.push({
        x, y, w: planColWidth, h: rowHeight,
        draw: (ctx) => {
          ctx.fillStyle = '#f8f9fa';
          ctx.fillRect(x, y, planColWidth, rowHeight);
          ctx.strokeStyle = '#e0e0e0';
          ctx.strokeRect(x, y, planColWidth, rowHeight);
          
          ctx.fillStyle = '#333';
          ctx.font = 'bold 14px sans-serif';
          ctx.fillText(plan.title, x + 10, y + 24);
        }
      });
    });
    y += rowHeight;

    // 数据行
    dataItems.forEach((item, rowIndex) => {
      // 特殊处理方案亮点类型
      if (type === 'highlights') {
        const plan = this.data.existingPlans[rowIndex];
        if (!plan) return;

        // 方案名称
        boxes.push({
          x: xStart, y, w: labelColWidth, h: rowHeight,
          draw: (ctx) => {
            ctx.fillStyle = rowIndex % 2 === 0 ? '#fff' : '#fafafa';
            ctx.fillRect(xStart, y, labelColWidth, rowHeight);
            ctx.strokeStyle = '#e0e0e0';
            ctx.strokeRect(xStart, y, labelColWidth, rowHeight);
            
            ctx.fillStyle = '#333';
            ctx.font = '14px sans-serif';
            ctx.fillText(plan.title, xStart + 10, y + 24);
          }
        });

        // 亮点内容
        const contentX = xStart + labelColWidth + colGap;
        boxes.push({
          x: contentX, y, w: planColWidth * 2, h: rowHeight,
          draw: (ctx) => {
            ctx.fillStyle = rowIndex % 2 === 0 ? '#fff' : '#fafafa';
            ctx.fillRect(contentX, y, planColWidth * 2, rowHeight);
            ctx.strokeStyle = '#e0e0e0';
            ctx.strokeRect(contentX, y, planColWidth * 2, rowHeight);
            
            ctx.fillStyle = '#333';
            ctx.font = '14px sans-serif';
            ctx.fillText(item.content || '', contentX + 10, y + 24);
          }
        });

        // 特色标签
        const tagsX = contentX + planColWidth * 2 + colGap;
        boxes.push({
          x: tagsX, y, w: planColWidth, h: rowHeight,
          draw: (ctx) => {
            ctx.fillStyle = rowIndex % 2 === 0 ? '#fff' : '#fafafa';
            ctx.fillRect(tagsX, y, planColWidth, rowHeight);
            ctx.strokeStyle = '#e0e0e0';
            ctx.strokeRect(tagsX, y, planColWidth, rowHeight);
            
            ctx.fillStyle = '#333';
            ctx.font = '14px sans-serif';
            const tagsText = (item.tags || []).join(', ');
            ctx.fillText(tagsText, tagsX + 10, y + 24);
          }
        });
      } else {
        // 普通数据表格
        // 标签列
        boxes.push({
          x: xStart, y, w: labelColWidth, h: rowHeight,
          draw: (ctx) => {
            ctx.save();
            // 背景
            ctx.fillStyle = rowIndex % 2 === 0 ? '#ffffff' : '#fafafa';
            ctx.fillRect(xStart, y, labelColWidth, rowHeight);
            // 边框
            ctx.strokeStyle = '#e0e0e0';
            ctx.lineWidth = 1;
            ctx.strokeRect(xStart, y, labelColWidth, rowHeight);
            // 文字
            ctx.fillStyle = '#333333';
            ctx.font = '14px sans-serif';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.fillText(item.label, xStart + 10, y + 12);
            ctx.restore();
            console.log(`绘制标签: ${item.label} at (${xStart}, ${y})`);
          }
        });

        // 数据列
        (item.values || []).forEach((value, colIndex) => {
          const x = xStart + labelColWidth + colGap + colIndex * (planColWidth + colGap);
          boxes.push({
            x, y, w: planColWidth, h: rowHeight,
            draw: (ctx) => {
              ctx.save();
              // 背景
              ctx.fillStyle = rowIndex % 2 === 0 ? '#ffffff' : '#fafafa';
              ctx.fillRect(x, y, planColWidth, rowHeight);
              // 边框
              ctx.strokeStyle = '#e0e0e0';
              ctx.lineWidth = 1;
              ctx.strokeRect(x, y, planColWidth, rowHeight);
              // 文字
              ctx.fillStyle = '#333333';
              ctx.font = '14px sans-serif';
              ctx.textAlign = 'left';
              ctx.textBaseline = 'top';
              ctx.fillText(value || '', x + 10, y + 12);
              ctx.restore();
              console.log(`绘制数据: ${value} at (${x}, ${y})`);
            }
      });
    });
      }

      y += rowHeight;
    });

    return { boxes, yEnd: y };
  },

  // 渲染并导出图片
  renderAndExport: function(boxes, totalHeight) {
    console.log('开始渲染图片，总高度:', totalHeight);
    console.log('盒子总数:', boxes.length);

    const query = wx.createSelectorQuery().in(this);
    query.select('#exportCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        console.log('Canvas查询结果:', res);
        
        if (!res[0] || !res[0].node) {
          console.error('Canvas节点获取失败');
          wx.hideLoading();
          wx.showToast({
            title: 'Canvas节点获取失败',
            icon: 'none'
          });
          return;
        }

        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        
        console.log('Canvas节点:', canvas);
        console.log('Canvas上下文:', ctx);
        
        // 设置画布尺寸
        const dpr = wx.getSystemInfoSync().pixelRatio || 2;
        const canvasWidth = 750;
        const canvasHeight = totalHeight;
        
        canvas.width = canvasWidth * dpr;
        canvas.height = canvasHeight * dpr;
        ctx.scale(dpr, dpr);
        
        console.log(`Canvas尺寸设置: ${canvasWidth}x${canvasHeight}, DPR: ${dpr}`);
        
        // 绘制白色背景
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        console.log('背景绘制完成');
        
        // 设置默认字体和样式
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillStyle = '#333333';
        ctx.font = '14px sans-serif';
        
        // 绘制测试文本
        ctx.fillText('测试文本', 50, 50);
        console.log('测试文本绘制完成');
        
        // 绘制所有盒子
        console.log('开始绘制盒子，总数:', boxes.length);
        boxes.forEach((box, index) => {
          try {
            // 重置样式
            ctx.fillStyle = '#333333';
            ctx.font = '14px sans-serif';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            
            box.draw(ctx);
            console.log(`盒子 ${index + 1} 绘制成功`);
          } catch (error) {
            console.error(`绘制盒子 ${index + 1} 失败:`, error);
          }
        });
        
        console.log('所有盒子绘制完成');
        
        // 导出图片
        this.exportCanvasImage(canvas, canvasHeight);
    });
  },

  // 导出Canvas为图片
  exportCanvasImage: function(canvas, height) {
    const dpr = 2;
      wx.canvasToTempFilePath({
      canvas: canvas,
        x: 0,
        y: 0,
      width: 750,
      height: height,
      destWidth: 750 * dpr,
      destHeight: height * dpr,
        fileType: 'jpg',
      quality: 0.9,
        success: (res) => {
        this.saveImageToAlbum(res.tempFilePath);
      },
      fail: (error) => {
        wx.hideLoading();
        console.error('导出图片失败:', error);
        wx.showToast({
          title: '导出失败，请重试',
          icon: 'none'
        });
      }
    }, this);
  },

  // 保存图片到相册
  saveImageToAlbum: async function(tempFilePath) {
    try {
      // 检查相册权限
      const setting = await wx.getSetting();
      if (!setting.authSetting['scope.writePhotosAlbum']) {
        try {
          await wx.authorize({ scope: 'scope.writePhotosAlbum' });
        } catch (error) {
          await wx.openSetting();
          const newSetting = await wx.getSetting();
          if (!newSetting.authSetting['scope.writePhotosAlbum']) {
            throw new Error('未授予相册权限');
          }
        }
      }

      // 保存到相册
      await wx.saveImageToPhotosAlbum({ filePath: tempFilePath });
      
      wx.hideLoading();
      wx.showToast({
        title: '对比图已保存到相册',
        icon: 'success'
      });
      
    } catch (error) {
      wx.hideLoading();
      console.error('保存到相册失败:', error);
        wx.showToast({
        title: '保存失败，请重试',
          icon: 'none'
        });
    }
  }
});