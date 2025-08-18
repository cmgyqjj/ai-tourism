    Page({
    data: {
        selectedDay: 1,
        sidebarOpen: false, // 侧边栏开关状态
        showShareModal: false, // 分享弹窗状态
        shareStats: {
            wechatCount: 0,    // 微信分享次数
            timelineCount: 0,  // 朋友圈分享次数
            copyCount: 0       // 复制链接次数
        },
        
        // 行程标题和时长
        tripTitle: '法意12日游',
        tripDuration: '12天11晚',
        
        // 地图相关数据
        mapCenter: {
        longitude: 116.397128,
        latitude: 39.916527
        },
        mapScale: 12,
        mapMarkers: [],
        mapPolyline: [],
        
        // 参与者信息
        participants: [
        { 
            avatar: '/images/avatar1.png',
            isCurrentUser: true,
            name: '当前用户'
        },
        { 
            avatar: '/images/avatar2.png',
            isCurrentUser: false,
            name: '搭子1'
        },
        { 
            avatar: '/images/avatar3.png',
            isCurrentUser: false,
            name: '搭子2'
        },
        { 
            avatar: '/images/avatar4.png',
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
            route: '北京 > 巴黎',
            weather: '🌧️'
        },
        {
            day: 3,
            date: '05月07日',
            route: '北京 > 巴黎',
            weather: '☁️'
        },
        {
            day: 4,
            date: '05月08日',
            route: '北京 > 巴黎',
            weather: '☀️'
        }
        ],
        
        // 当前选中日期的行程信息
        currentDayInfo: {
        route: '北京—巴黎',
        flight: '机场 巴黎 - 戴高乐机场',
        accommodation: '住宿建议 巴黎景区附近 (1,7,9区)',
        food: [
            {
            name: '花神咖啡馆',
            price: '100',
            distance: '3.2',
            time: '15',
            location: 'Café de Flore, Paris',
            image: '/images/cafe.jpg'
            }
        ],
        attractions: [
            {
            name: '塞纳河',
            description: '夜游塞纳河拍照打卡',
            distance: '1.2',
            time: '5',
            location: 'Seine River, Paris',
            image: '/images/seine.jpg'
            }
        ],
        hotels: [
            {
            name: 'Prais万豪(第7',
            nights: '1',
            price: '1028',
            image: '/images/hotel.jpg'
            }
        ]
        }
    },

    onLoad(options) {
        console.log('行程详情地图页面加载完成', options);
        
        // 如果有传入的行程数据，则使用传入的数据
        if (options.tripData) {
        try {
            const tripData = JSON.parse(decodeURIComponent(options.tripData));
            console.log('接收到的行程数据:', tripData);
            
            // 更新行程天数数据
            this.setData({
            tripDays: tripData.days || this.data.tripDays,
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
        
        // 生成标题：目的地 + X日游
        const tripTitle = `${destination}${days}日游`;
        
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
            avatar: `/images/avatar${i}.png`,
            isCurrentUser: false,
            name: `搭子${i}`
        });
        }
        
        this.setData({
        participants
        });
        
        console.log('更新参与者数据:', participants);
    },

    /**
     * 初始化地图数据
     */
    initMapData() {
        // 生成示例地图标记点
        const markers = [
        {
            id: 1,
            longitude: 116.397128,
            latitude: 39.916527,
            title: '起点',
            width: 40,
            height: 40,
            callout: {
                content: '📍 起点',
                color: '#ffffff',
                fontSize: 14,
                borderRadius: 4,
                bgColor: '#00ff00',
                padding: 8,
                display: 'ALWAYS'
            }
        },
        {
            id: 2,
            longitude: 116.407128,
            latitude: 39.926527,
            title: '景点1',
            width: 40,
            height: 40,
            callout: {
                content: '📍 景点1',
                color: '#ffffff',
                fontSize: 14,
                borderRadius: 4,
                bgColor: '#ff6b6b',
                padding: 8,
                display: 'ALWAYS'
            }
        },
        {
            id: 3,
            longitude: 116.417128,
            latitude: 39.936527,
            title: '景点2',
            width: 40,
            height: 40,
            callout: {
                content: '📍 景点2',
                color: '#ffffff',
                fontSize: 14,
                borderRadius: 4,
                bgColor: '#ff6b6b',
                padding: 8,
                display: 'ALWAYS'
            }
        }
        ];
        
        // 生成路线连线
        const polyline = [
        {
            points: [
            { longitude: 116.397128, latitude: 39.916527 },
            { longitude: 116.407128, latitude: 39.926527 },
            { longitude: 116.417128, latitude: 39.936527 }
            ],
            color: '#FF6B6B',
            width: 4,
            arrowLine: true
        }
        ];
        
        this.setData({
        mapMarkers: markers,
        mapPolyline: polyline
        });
        
        console.log('地图数据初始化完成');
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
     * 地图标记点击事件
     */
    onMarkerTap(e) {
        const markerId = e.detail.markerId;
        console.log('点击了地图标记:', markerId);
        
        // 这里可以根据标记ID显示对应的景点信息
        wx.showToast({
        title: `点击了标记${markerId}`,
        icon: 'none'
        });
    },

    /**
     * 地图区域变化事件
     */
    onRegionChange(e) {
        if (e.type === 'end') {
        console.log('地图区域变化:', e.detail);
        }
    },

    /**
     * 地图加载完成事件
     */
    onMapLoad(e) {
        console.log('地图加载完成:', e.detail);
        // 地图加载完成后，确保标记点和路线显示
        this.setData({
            mapMarkers: this.data.mapMarkers,
            mapPolyline: this.data.mapPolyline
        });
    },

    /**
     * 分享行程
     */
    shareTrip() {
        console.log('分享行程');
        wx.showToast({
        title: '分享功能开发中',
        icon: 'none'
        });
    },

    /**
     * 查看行程详情
     */
    viewTripDetails() {
        console.log('查看行程详情');
        wx.showToast({
        title: '行程详情功能开发中',
        icon: 'none'
        });
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
        
        // 这里可以根据选择的日期加载对应的行程信息
        this.loadDayInfo(day);
    },

    /**
     * 加载指定日期的行程信息
     */
    loadDayInfo(day) {
        console.log('加载第', day, '天的行程信息');
        
        // 这里可以根据日期从服务器或本地存储加载对应的行程信息
        // 暂时使用模拟数据
        const dayInfo = {
        route: `第${day}天路线`,
        flight: day === 1 ? '机场 巴黎 - 戴高乐机场' : null,
        accommodation: '住宿建议 巴黎景区附近 (1,7,9区)',
        food: [
            {
            name: '花神咖啡馆',
            price: '100',
            distance: '3.2',
            time: '15',
            location: 'Café de Flore, Paris',
            image: '/images/cafe.jpg'
            }
        ],
        attractions: [
            {
            name: '塞纳河',
            description: '夜游塞纳河拍照打卡',
            distance: '1.2',
            time: '5',
            location: 'Seine River, Paris',
            image: '/images/seine.jpg'
            }
        ],
        hotels: [
            {
            name: 'Prais万豪(第7',
            nights: '1',
            price: '1028',
            image: '/images/hotel.jpg'
            }
        ]
        };
        
        this.setData({
        currentDayInfo: dayInfo
        });
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
     * 导航到指定位置
     */
    navigateToLocation(e) {
        const location = e.currentTarget.dataset.location;
        console.log('导航到位置:', location);
        
        // 这里可以调用地图导航功能
        wx.showToast({
        title: '导航功能开发中',
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
        itemList: ['编辑', '删除', '分享'],
        success: (res) => {
            console.log('选择了操作:', res.tapIndex);
            switch (res.tapIndex) {
            case 0:
                this.editItem(index);
                break;
            case 1:
                this.deleteItem(index);
                break;
            case 2:
                this.shareItem(index);
                break;
            }
        }
        });
    },

    /**
     * 编辑项目
     */
    editItem(index) {
        console.log('编辑项目:', index);
        wx.showToast({
        title: '编辑功能开发中',
        icon: 'none'
        });
    },

    /**
     * 删除项目
     */
    deleteItem(index) {
        console.log('删除项目:', index);
        wx.showModal({
        title: '确认删除',
        content: '确定要删除这个项目吗？',
        success: (res) => {
            if (res.confirm) {
            wx.showToast({
                title: '删除成功',
                icon: 'success'
            });
            }
        }
        });
    },

    /**
     * 分享项目
     */
    shareItem(index) {
        console.log('分享项目:', index);
        wx.showToast({
        title: '分享功能开发中',
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
        console.log('侧边栏状态:', this.data.sidebarOpen);
    },

    /**
     * 路线优化
     */
    onRouteOptimization() {
        console.log('点击路线优化');
        wx.showToast({
        title: '正在跳转路线优化...',
        icon: 'loading',
        duration: 1500
        });
        
        setTimeout(() => {
        this.toggleSidebar(); // 关闭侧边栏
        // 跳转到路线优化页面
        wx.navigateTo({
            url: '/pages/route-optimization/route-optimization',
            success: () => {
            console.log('跳转路线优化页面成功');
            },
            fail: (error) => {
            console.error('跳转路线优化页面失败:', error);
            wx.showToast({
                title: '页面跳转失败',
                icon: 'none'
            });
            }
        });
        }, 1500);
    },

    /**
     * 攻略PK
     */
    onStrategyPK() {
        console.log('点击攻略PK');
        wx.showToast({
        title: '正在跳转攻略PK...',
        icon: 'loading',
        duration: 1500
        });
        
        setTimeout(() => {
        this.toggleSidebar(); // 关闭侧边栏
        // 跳转到攻略PK页面
        wx.navigateTo({
            url: '/pages/strategy-pk/strategy-pk',
            success: () => {
            console.log('跳转攻略PK页面成功');
            },
            fail: (error) => {
            console.error('跳转攻略PK页面失败:', error);
            wx.showToast({
                title: '页面跳转失败',
                icon: 'none'
            });
            }
        });
        }, 1500);
    },

    /**
     * 团队攻略
     */
    onTeamStrategy() {
        console.log('点击团队攻略');
        wx.showToast({
        title: '正在跳转团队攻略...',
        icon: 'loading',
        duration: 1500
        });
        
        setTimeout(() => {
        this.toggleSidebar(); // 关闭侧边栏
        // 跳转到团队攻略页面
        wx.navigateTo({
            url: '/pages/team-strategy/team-strategy',
            success: () => {
            console.log('跳转团队攻略页面成功');
            },
            fail: (error) => {
            console.error('跳转团队攻略页面失败:', error);
            wx.showToast({
                title: '页面跳转失败',
                icon: 'none'
            });
            }
        });
        }, 1500);
    },

    /**
     * 分享好友
     */
    onShareFriends() {
        console.log('点击分享好友');
        this.setData({
            showShareModal: true
        });
        this.toggleSidebar(); // 关闭侧边栏
    },

    // 显示分享弹窗
    showShareModal() {
        console.log('显示分享弹窗')
        this.setData({
            showShareModal: true
        })
    },

    // 隐藏分享弹窗
    hideShareModal() {
        this.setData({
            showShareModal: false
        })
    },

    // 分享给好友
    shareToFriend() {
        console.log('分享给好友')
        
        // 隐藏分享弹窗
        this.hideShareModal()
        
        // 显示分享提示
        wx.showToast({
            title: '请点击分享按钮',
            icon: 'none',
            duration: 2000
        })
    },

    // 分享到朋友圈
    shareToTimeline() {
        console.log('分享到朋友圈')
        const { tripTitle, tripDuration } = this.data
        
        // 隐藏分享弹窗
        this.hideShareModal()

        // 启用朋友圈分享
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareTimeline'],
            success: () => {
                wx.showToast({
                    title: '请点击右上角分享到朋友圈',
                    icon: 'none',
                    duration: 3000
                })
            },
            fail: (err) => {
                console.error('朋友圈分享失败', err)
                wx.showToast({
                    title: '朋友圈分享暂时不可用',
                    icon: 'none'
                })
            }
        })
    },

    // 复制链接
    copyLink() {
        console.log('复制链接')
        const { tripTitle, tripDuration, tripDays, participants } = this.data
        
        // 隐藏分享弹窗
        this.hideShareModal()

        // 生成更丰富的分享内容
        const shareUrl = `https://miniprogram.com/pages/trip-detail-map/trip-detail-map?tripId=${Date.now()}&shared=true&type=copy`
        let shareText = `${tripTitle} - 详细行程攻略，包含地图路线和景点推荐`
        
        // 如果有队友，显示团队信息
        if (participants && participants.length > 1) {
            shareText = `【团队攻略】${tripTitle} - ${participants.length}人同行，${tripDays ? tripDays.length : 0}天行程`
        }
        
        // 添加更多攻略信息
        if (tripDays && tripDays.length > 0) {
            shareText += `\n\n行程亮点：`
            shareText += `\n• ${tripDays.length}天${tripDays.length - 1}晚精心规划`
            shareText += `\n• 地图路线导航`
            shareText += `\n• 景点推荐攻略`
            shareText += `\n• 美食住宿建议`
        }
        
        wx.setClipboardData({
            data: `${shareText}\n\n查看详情：${shareUrl}`,
            success: () => {
                // 记录复制链接行为
                this.recordShareAction('copy');
                
                wx.showModal({
                    title: '链接已复制',
                    content: '攻略链接已复制到剪贴板，你可以粘贴到其他应用分享给朋友',
                    showCancel: false,
                    confirmText: '知道了'
                })
            },
            fail: (err) => {
                console.error('复制失败', err)
                wx.showToast({
                    title: '复制失败，请重试',
                    icon: 'none'
                })
            }
        })
    },

    // 阻止事件冒泡
    stopPropagation() {
        // 空函数，用于阻止事件冒泡
    },

    // 记录分享行为
    recordShareAction(shareType) {
        const { tripTitle, tripDuration, tripDays, participants } = this.data;
        
        // 更新分享统计
        const shareStats = { ...this.data.shareStats };
        switch (shareType) {
            case 'wechat':
                shareStats.wechatCount++;
                break;
            case 'timeline':
                shareStats.timelineCount++;
                break;
            case 'copy':
                shareStats.copyCount++;
                break;
        }
        
        this.setData({ shareStats });
        
        console.log('分享行为记录:', {
            type: shareType,
            tripTitle,
            tripDuration,
            tripDays: tripDays ? tripDays.length : 0,
            participants: participants ? participants.length : 0,
            shareStats,
            timestamp: new Date().toISOString()
        });
        
        // 这里可以添加数据统计或上报逻辑
        // 比如记录分享次数、分享类型等
    },

    // 处理分享后的回调
    onShareSuccess(shareType) {
        wx.showToast({
            title: '分享成功！',
            icon: 'success',
            duration: 2000
        });
        
        // 记录分享成功
        this.recordShareAction(shareType);
        
        // 隐藏分享弹窗
        this.hideShareModal();
    },

    // 分享按钮点击事件（调试用）
    onShareButtonTap() {
        console.log('🎯 分享按钮被点击了！');
        console.log('当前分享弹窗状态:', this.data.showShareModal);
        console.log('当前页面数据:', {
            tripTitle: this.data.tripTitle,
            tripDuration: this.data.tripDuration,
            tripDays: this.data.tripDays,
            participants: this.data.participants
        });
        
        // 显示提示
        wx.showToast({
            title: '准备分享...',
            icon: 'loading',
            duration: 1000
        });
    },

    // 分享功能 - 微信分享接口
    onShareAppMessage() {
        console.log('=== 分享函数被调用了 ===');
        console.log('当前页面数据:', this.data);
        
        const { tripTitle, tripDuration, tripDays, participants } = this.data;
        
        // 检查必要数据是否存在
        if (!tripTitle || !tripDuration) {
            console.log('⚠️ 分享数据不完整:', { tripTitle, tripDuration });
            console.log('使用默认分享内容');
            
            return {
                title: 'AI智能路线规划',
                desc: '基于AI算法的智能旅行攻略生成器',
                path: '/pages/trip-detail-map/trip-detail-map',
                imageUrl: '/images/avatar1.png'
            };
        }
        
        console.log('✅ 分享数据完整:', { tripTitle, tripDuration, tripDays, participants });
        
        // 生成更吸引人的分享标题
        let shareTitle = `${tripTitle} - ${tripDuration}详细攻略`
        
        // 如果有队友，显示团队信息
        if (participants && participants.length > 1) {
            shareTitle = `【团队攻略】${tripTitle} - ${participants.length}人同行`
        }
        
        // 生成分享描述
        let shareDesc = `详细行程攻略，包含地图路线和景点推荐`
        if (tripDays && tripDays.length > 0) {
            shareDesc = `${tripDays.length}天${tripDays.length - 1}晚详细攻略，地图路线+景点推荐+美食住宿`
        }
        
        const shareData = {
            title: shareTitle,
            desc: shareDesc,
            path: `/pages/trip-detail-map/trip-detail-map?tripId=${Date.now()}&shared=true`,
            imageUrl: '/images/avatar1.png'
        };
        
        console.log('📤 返回分享数据:', shareData);
        
        // 注意：不要在这里记录分享行为，因为这只是准备分享内容
        // 真正的分享成功应该在用户选择好友并发送后
        // this.recordShareAction('wechat');
        
        return shareData;
    },

    // 分享成功回调 - 当用户真正分享成功后会被调用
    onShareAppMessageSuccess(res) {
        console.log('🎉 分享真正成功了！', res);
        
        // 记录分享成功
        this.recordShareAction('wechat');
        
        // 显示成功提示
        wx.showToast({
            title: '分享成功！',
            icon: 'success',
            duration: 2000
        });
        
        // 隐藏分享弹窗
        this.hideShareModal();
    },

    // 分享到朋友圈 - 朋友圈分享接口
    onShareTimeline() {
        const { tripTitle, tripDuration, tripDays, participants } = this.data
        
        // 生成朋友圈分享标题
        let timelineTitle = `${tripTitle} - ${tripDuration}详细攻略`
        
        // 如果有队友，显示团队信息
        if (participants && participants.length > 1) {
            timelineTitle = `【团队攻略】${tripTitle} - ${participants.length}人同行，${tripDays ? tripDays.length : 0}天行程`
        }
        
        return {
            title: timelineTitle,
            imageUrl: '/images/avatar1.png',
            query: `tripId=${Date.now()}&shared=true&type=timeline`
        }
    }
});