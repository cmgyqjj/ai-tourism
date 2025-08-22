Page({
  data: {
    currentTab: 0,
    budgetExpanded: true,
    exclusiveExpanded: true,
    accommodationExpanded: true,
    transportationExpanded: true,
    coreDifferencesExpanded: true,

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
      {
        id: 4,
        title: '深度文化型',
        subtitle: '南方海滨度假',
        iconText: '🏛️',
        avatar: 'https://p0.meituan.net/hackathonqjj/0ec13a2a63f03daac48863d1fa57995f6194.png',
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
        values: ['¥ 5.8w', '¥ 1.5w', '¥ 3.2w', '¥ 4.5w']
      },
      {
        label: '餐饮预算',
        values: ['¥ 1.2w', '¥ 4000', '¥ 8000','¥ 6000']
      },
      {
        label: '酒店预算',
        values: ['¥ 3w', '¥ 6000', '¥ 1.5w', '¥ 2.2w']
      },

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

  // 下载报告
  downloadReport: function() {
    wx.showToast({
      title: '正在生成对比图...',
      icon: 'loading',
      duration: 2000
    });
    
    this.generateComparisonImage();
  },

  // 生成对比图
  generateComparisonImage() {
    console.log('🚀 开始生成对比图...');
    
    const ctx = wx.createCanvasContext('comparisonCanvas');
    console.log('✅ Canvas上下文创建成功');
    
    const canvasWidth = 600;
    const canvasHeight = 800;
    console.log(`📏 Canvas尺寸设置: ${canvasWidth} × ${canvasHeight}`);
    
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    console.log('🧹 画布清空完成');
    
    ctx.setFillStyle('#ffffff');
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    console.log('🎨 背景色设置完成');
    
    ctx.setFillStyle('#333333');
    ctx.setFontSize(24);
    ctx.setTextAlign('center');
    ctx.fillText('行程对比报告', canvasWidth / 2, 40);
    console.log('📝 标题绘制完成');
    
    ctx.setStrokeStyle('#e0e0e0');
    ctx.setLineWidth(1);
    ctx.beginPath();
    ctx.moveTo(30, 60);
    ctx.lineTo(canvasWidth - 30, 60);
    ctx.stroke();
    console.log('➖ 分隔线绘制完成');
    
    let currentY = 80;
    console.log(`📍 当前绘制位置Y: ${currentY}`);
    
    // 绘制已有方案（只显示前2个）
    if (this.data.existingPlans && this.data.existingPlans.length > 0) {
      console.log(`📋 开始绘制已有方案，共${this.data.existingPlans.length}个`);
      ctx.setFillStyle('#333333');
      ctx.setFontSize(18);
      ctx.setTextAlign('left');
      ctx.fillText('已有方案', 30, currentY);
      currentY += 30;
      
      const plansToShow = this.data.existingPlans.slice(0, 2);
      console.log(`🎯 将绘制前${plansToShow.length}个方案`);
      
      plansToShow.forEach((plan, index) => {
        console.log(`📌 绘制方案${index + 1}: ${plan.title}`);
        
        ctx.setFillStyle('#f8f9fa');
        ctx.fillRect(30, currentY, canvasWidth - 60, 80);
        ctx.setStrokeStyle('#e0e0e0');
        ctx.strokeRect(30, currentY, canvasWidth - 60, 80);
        
        const statusText = plan.voted ? '已投票' : '未投票';
        const statusColor = plan.voted ? '#FFD700' : '#007AFF';
        ctx.setFillStyle(statusColor);
        ctx.setFontSize(12);
        ctx.fillText(statusText, 45, currentY + 20);
        
        ctx.setFillStyle('#333333');
        ctx.setFontSize(16);
        ctx.fillText(plan.title, 45, currentY + 45);
        
        ctx.setFontSize(14);
        ctx.setFillStyle('#666666');
        ctx.fillText(plan.subtitle, 45, currentY + 65);
        
        currentY += 100;
        console.log(`✅ 方案${index + 1}绘制完成，当前Y位置: ${currentY}`);
      });
    } else {
      console.log('⚠️ 没有找到已有方案数据');
    }
    
    // 绘制方案亮点（只显示前2个）
    if (this.data.planHighlights && this.data.planHighlights.length > 0) {
      console.log(`✨ 开始绘制方案亮点，共${this.data.planHighlights.length}个`);
      ctx.setFillStyle('#333333');
      ctx.setFontSize(18);
      ctx.setTextAlign('left');
      ctx.fillText('方案亮点', 30, currentY);
      currentY += 30;
      
      const highlightsToShow = this.data.planHighlights.slice(0, 2);
      console.log(`🎯 将绘制前${highlightsToShow.length}个亮点`);
      
      highlightsToShow.forEach((highlight, index) => {
        console.log(`💡 绘制亮点${index + 1}: ${highlight.content}`);
        
        ctx.setFillStyle('#f8f9fa');
        ctx.fillRect(30, currentY, canvasWidth - 60, 60);
        ctx.setStrokeStyle('#e0e0e0');
        ctx.strokeRect(30, currentY, canvasWidth - 60, 60);
        
        ctx.setFillStyle('#333333');
        ctx.setFontSize(14);
        ctx.fillText(highlight.content, 45, currentY + 25);
        
        if (highlight.tags && highlight.tags.length > 0) {
          ctx.setFontSize(12);
          ctx.setFillStyle('#007AFF');
          const tagsText = highlight.tags.slice(0, 3).join(' ');
          ctx.fillText(tagsText, 45, currentY + 45);
          console.log(`🏷️ 标签内容: ${tagsText}`);
        }
        
        currentY += 80;
        console.log(`✅ 亮点${index + 1}绘制完成，当前Y位置: ${currentY}`);
      });
    } else {
      console.log('⚠️ 没有找到方案亮点数据');
    }
    
    // 绘制预算对比（简化显示）
    if (this.data.budgetItems && this.data.budgetItems.length > 0) {
      console.log(`💰 开始绘制预算对比，共${this.data.budgetItems.length}项`);
      ctx.setFillStyle('#333333');
      ctx.setFontSize(18);
      ctx.setTextAlign('left');
      ctx.fillText('预算对比', 30, currentY);
      currentY += 30;
      
      const budgetToShow = this.data.budgetItems.slice(0, 2);
      console.log(`🎯 将绘制前${budgetToShow.length}项预算`);
      
      budgetToShow.forEach((item, index) => {
        console.log(`📊 绘制预算项${index + 1}: ${item.label}`);
        ctx.setFontSize(14);
        ctx.setFillStyle('#333333');
        ctx.fillText(item.label, 45, currentY);
        
        ctx.setFontSize(12);
        ctx.setFillStyle('#666666');
        ctx.fillText(`方案A: ${item.values[0]}`, 45, currentY + 20);
        if (item.values[1]) {
          ctx.fillText(`方案B: ${item.values[1]}`, 45, currentY + 35);
        }
        
        currentY += 50;
        console.log(`✅ 预算项${index + 1}绘制完成，当前Y位置: ${currentY}`);
      });
    } else {
      console.log('⚠️ 没有找到预算数据');
    }
    
    // 绘制底部信息
    ctx.setFillStyle('#999999');
    ctx.setFontSize(12);
    ctx.setTextAlign('center');
    const currentTime = new Date().toLocaleString('zh-CN');
    ctx.fillText(`生成时间: ${currentTime}`, canvasWidth / 2, canvasHeight - 20);
    console.log(`⏰ 底部时间信息绘制完成: ${currentTime}`);
    
    console.log('🎨 所有内容绘制完成，开始调用ctx.draw()...');
    
    ctx.draw(false, () => {
      console.log('✅ Canvas绘制完成，等待500ms后转换为图片...');
      
      setTimeout(() => {
        console.log('🔄 开始将Canvas转换为图片...');
        
        wx.canvasToTempFilePath({
          canvasId: 'comparisonCanvas',
          width: canvasWidth,
          height: canvasHeight,
          destWidth: canvasWidth,
          destHeight: canvasHeight,
          fileType: 'png',
          quality: 0.8,
          success: (res) => {
            console.log('🎉 Canvas转图片成功!');
            console.log('📁 临时文件路径:', res.tempFilePath);
            console.log('📏 图片尺寸:', res.width, '×', res.height);
            
            console.log('💾 开始保存图片到相册...');
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: () => {
                console.log('✅ 图片保存到相册成功!');
                wx.showToast({
                  title: '对比图已保存到相册',
                  icon: 'success',
                  duration: 2000
                });
              },
              fail: (err) => {
                console.error('❌ 保存到相册失败:', err);
                if (err.errMsg.includes('auth deny')) {
                  console.log('🚫 权限被拒绝，显示权限提示');
                  wx.showModal({
                    title: '权限提示',
                    content: '需要相册权限才能保存图片，请在设置中开启',
                    showCancel: false,
                    confirmText: '知道了'
                  });
                } else {
                  console.log('⚠️ 其他保存失败原因，显示重试提示');
                  wx.showToast({
                    title: '保存失败，请重试',
                    icon: 'none'
                  });
                }
              }
            });
          },
          fail: (err) => {
            console.error('❌ Canvas转图片失败:', err);
            console.error('错误详情:', err.errMsg);
            wx.showToast({
              title: '生成图片失败',
              icon: 'none'
            });
          }
        });
      }, 500);
    });
  },
  // 分享行程  // 分享行程
//   shareItinerary: function() {
//     console.log(' 分享按钮被点击了！');
    
//     // 显示分享提示
//     wx.showToast({
//       title: '分享功能已启用',
//       icon: 'success',
//       duration: 1500
//     });
    
//     console.log('✅ 分享功能已启用');
//   },

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
  }
});
