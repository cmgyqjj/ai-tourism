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
        tripTitle: '法意瑞12日游',
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
            avatar: '/images/https://p0.meituan.net/hackathonqjj/066f1f168c7a71a45bf97c3771862cab74240.png',
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
        
        // 所有天数的行程信息集合
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
                        distance: '3.2',
                        time: '15',
                        location: 'Café de Flore, Paris',
                        image: 'https://p0.meituan.net/hackathonqjj/066f1f168c7a71a45bf97c3771862cab74240.png'
                    },
                    {
                        type: 'attraction',
                        icon: '🏔️',
                        category: '景点',
                        name: '塞纳河',
                        description: '夜游塞纳河拍照打卡',
                        distance: '1.2',
                        time: '5',
                        location: 'Seine River, Paris',
                        image: '/images/cafe.png'
                    },
                    {
                        type: 'hotel',
                        icon: '🛏️',
                        category: '住宿推荐',
                        name: 'Prais万豪(第7区)',
                        nights: '1',
                        price: '1028',
                        image: '/images/cafe.png',
                        distance: '2.1',
                        time: '8',
                        location: 'Marriott Hotel, Paris'
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
                        icon: '🗼',
                        category: '景点',
                        name: '埃菲尔铁塔',
                        description: '巴黎地标建筑',
                        distance: '2.5',
                        time: '20',
                        location: 'Eiffel Tower, Paris',
                        image: '/images/cafe.png'
                    },
                    {
                        type: 'food',
                        icon: '🥐',
                        category: '美食',
                        name: '法式面包店',
                        price: '15',
                        distance: '0.8',
                        time: '5',
                        location: 'French Bakery, Paris',
                        image: '/images/cafe.png'
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
                        icon: '🏛️',
                        category: '景点',
                        name: '卢浮宫',
                        description: '世界著名艺术博物馆',
                        distance: '1.8',
                        time: '25',
                        location: 'Louvre Museum, Paris',
                        image: '/images/cafe.png'
                    },
                    {
                        type: 'food',
                        icon: '🍷',
                        category: '美食',
                        name: '法式餐厅',
                        price: '180',
                        distance: '0.5',
                        time: '8',
                        location: 'French Restaurant, Paris',
                        image: '/images/cafe.png'
                    },
                    {
                        type: 'checkin',
                        icon: '📸',
                        category: '打卡点',
                        name: '凯旋门',
                        description: '巴黎标志性建筑，拿破仑时期建造',
                        distance: '2.1',
                        time: '18',
                        location: 'Arc de Triomphe, Paris',
                        image: '/images/cafe.png'
                    }
                ]
            },
            {
                day: 4,
                route: '巴黎—米兰',
                flight: '机场 米兰 - 马尔彭萨机场',
                accommodation: '住宿建议 米兰市中心 (1,2区)',
                items: [
                    {
                        type: 'food',
                        icon: '🍽️',
                        category: '美食',
                        name: '米兰大教堂餐厅',
                        price: '150',
                        distance: '0.5',
                        time: '8',
                        location: 'Duomo Restaurant, Milan',
                        image: '/images/cafe.png'
                    },
                    {
                        type: 'attraction',
                        icon: '🏔️',
                        category: '景点',
                        name: '米兰大教堂',
                        description: '哥特式建筑杰作',
                        distance: '0.3',
                        time: '3',
                        location: 'Duomo di Milano, Milan',
                        image: '/images/cafe.png'
                    }
                ]
            },
            {
                day: 5,
                route: '米兰',
                flight: null,
                accommodation: '住宿建议 米兰市中心 (1,2区)',
                items: [
                    {
                        type: 'attraction',
                        icon: '🎭',
                        category: '景点',
                        name: '斯卡拉歌剧院',
                        description: '世界著名歌剧院',
                        distance: '1.2',
                        time: '15',
                        location: 'La Scala, Milan',
                        image: '/images/cafe.png'
                    },
                    {
                        type: 'food',
                        icon: '🍕',
                        category: '美食',
                        name: '正宗意式披萨',
                        price: '25',
                        distance: '0.6',
                        time: '10',
                        location: 'Authentic Italian Pizza, Milan',
                        image: '/images/cafe.png'
                    }
                ]
            },
            {
                day: 6,
                route: '米兰—罗马',
                flight: '机场 罗马 - 菲乌米奇诺机场',
                accommodation: '住宿建议 罗马古城区 (1,2区)',
                items: [
                    {
                        type: 'food',
                        icon: '🍽️',
                        category: '美食',
                        name: '罗马传统餐厅',
                        price: '120',
                        distance: '0.8',
                        time: '12',
                        location: 'Traditional Roman Restaurant',
                        image: '/images/cafe.png'
                    },
                    {
                        type: 'attraction',
                        icon: '🏔️',
                        category: '景点',
                        name: '斗兽场',
                        description: '古罗马竞技场遗址',
                        distance: '1.5',
                        time: '20',
                        location: 'Colosseum, Rome',
                        image: '/images/cafe.png'
                    }
                ]
            },
            {
                day: 7,
                route: '罗马',
                flight: null,
                accommodation: '住宿建议 罗马古城区 (1,2区)',
                items: [
                    {
                        type: 'attraction',
                        icon: '⛪',
                        category: '景点',
                        name: '梵蒂冈博物馆',
                        description: '天主教艺术宝库',
                        distance: '2.0',
                        time: '30',
                        location: 'Vatican Museums, Vatican City',
                        image: '/images/cafe.png'
                    },
                    {
                        type: 'food',
                        icon: '🍝',
                        category: '美食',
                        name: '罗马意面',
                        price: '18',
                        distance: '0.4',
                        time: '8',
                        location: 'Roman Pasta Restaurant',
                        image: '/images/cafe.png'
                    }
                ]
            },
            {
                day: 8,
                route: '罗马',
                flight: null,
                accommodation: '住宿建议 罗马古城区 (1,2区)',
                items: [
                    {
                        type: 'attraction',
                        icon: '🏛️',
                        category: '景点',
                        name: '万神殿',
                        description: '古罗马建筑奇迹',
                        distance: '1.8',
                        time: '15',
                        location: 'Pantheon, Rome',
                        image: '/images/cafe.png'
                    },
                    {
                        type: 'food',
                        icon: '🍦',
                        category: '美食',
                        name: '意式冰淇淋',
                        price: '8',
                        distance: '0.3',
                        time: '5',
                        location: 'Italian Gelato Shop',
                        image: '/images/cafe.png'
                    }
                ]
            },
            {
                day: 9,
                route: '罗马—佛罗伦萨',
                flight: '机场 佛罗伦萨 - 佩雷托拉机场',
                accommodation: '住宿建议 佛罗伦萨老城区',
                items: [
                    {
                        type: 'food',
                        icon: '🍽️',
                        category: '美食',
                        name: '托斯卡纳餐厅',
                        price: '130',
                        distance: '0.6',
                        time: '10',
                        location: 'Tuscany Restaurant, Florence',
                        image: '/images/cafe.png'
                    },
                    {
                        type: 'attraction',
                        icon: '🏛️',
                        category: '景点',
                        name: '圣母百花大教堂',
                        description: '文艺复兴建筑代表',
                        distance: '0.4',
                        time: '5',
                        location: 'Cathedral of Santa Maria del Fiore',
                        image: '/images/cafe.png'
                    }
                ]
            },
            {
                day: 10,
                route: '佛罗伦萨',
                flight: null,
                accommodation: '住宿建议 佛罗伦萨老城区',
                items: [
                    {
                        type: 'attraction',
                        icon: '🎨',
                        category: '景点',
                        name: '乌菲兹美术馆',
                        description: '文艺复兴艺术殿堂',
                        distance: '0.8',
                        time: '25',
                        location: 'Uffizi Gallery, Florence',
                        image: '/images/cafe.png'
                    },
                    {
                        type: 'food',
                        icon: '🥩',
                        category: '美食',
                        name: '托斯卡纳牛排',
                        price: '45',
                        distance: '0.5',
                        time: '12',
                        location: 'Tuscany Steakhouse',
                        image: '/images/cafe.png'
                    }
                ]
            },
            {
                day: 11,
                route: '佛罗伦萨—威尼斯',
                flight: '机场 威尼斯 - 马可波罗机场',
                accommodation: '住宿建议 威尼斯主岛',
                items: [
                    {
                        type: 'food',
                        icon: '🍽️',
                        category: '美食',
                        name: '威尼斯海鲜餐厅',
                        price: '180',
                        distance: '0.7',
                        time: '15',
                        location: 'Venetian Seafood Restaurant',
                        image: '/images/cafe.png'
                    },
                    {
                        type: 'attraction',
                        icon: '🏛️',
                        category: '景点',
                        name: '圣马可广场',
                        description: '威尼斯地标广场',
                        distance: '0.5',
                        time: '8',
                        location: 'Piazza San Marco, Venice',
                        image: '/images/cafe.png'
                    }
                ]
            },
            {
                day: 12,
                route: '威尼斯—北京',
                flight: '机场 北京 - 首都国际机场',
                accommodation: '返程',
                items: [
                    {
                        type: 'attraction',
                        icon: '🚣',
                        category: '体验',
                        name: '贡多拉游船',
                        description: '威尼斯传统交通工具',
                        distance: '0.2',
                        time: '10',
                        location: 'Gondola Ride, Venice',
                        image: '/images/cafe.png'
                    },
                    {
                        type: 'food',
                        icon: '🍰',
                        category: '美食',
                        name: '威尼斯甜点',
                        price: '12',
                        distance: '0.3',
                        time: '5',
                        location: 'Venetian Pastry Shop',
                        image: '/images/cafe.png'
                    }
                ]
            }
        ],
        
        // 当前选中天数的行程信息
        currentDayInfo: {
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
                    distance: '3.2',
                    time: '15',
                    location: 'Café de Flore, Paris',
                    image: '/images/cafe.png'
                },
                {
                    type: 'attraction',
                    icon: '🏔️',
                    category: '景点',
                    name: '塞纳河',
                    description: '夜游塞纳河拍照打卡',
                    distance: '1.2',
                    time: '5',
                    location: 'Seine River, Paris',
                    image: '/images/cafe.png'
                },
                {
                    type: 'hotel',
                    icon: '🛏️',
                    category: '住宿推荐',
                    name: 'Prais万豪(第7区)',
                    nights: '1',
                    price: '1028',
                    image: '/images/cafe.png',
                    distance: '2.1',
                    time: '8',
                    location: 'Marriott Hotel, Paris'
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
                allDayInfo: tripData.allDayInfo || this.data.allDayInfo,
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
        
        // 分析行程路线，生成更合适的标题
        let tripTitle = '欧洲多国游';
        if (tripDays.length > 0) {
            // 收集所有目的地
            const destinations = new Set();
            tripDays.forEach(day => {
                if (day.route) {
                    const cities = day.route.split('>').map(city => city.trim());
                    cities.forEach(city => {
                        if (city && city !== '北京') {
                            destinations.add(city);
                        }
                    });
                }
            });
            
            // 根据目的地生成标题
            const destinationArray = Array.from(destinations);
            if (destinationArray.length === 1) {
                tripTitle = `${destinationArray[0]}${days}日游`;
            } else if (destinationArray.length === 2) {
                tripTitle = `${destinationArray[0]}${destinationArray[1]}${days}日游`;
            } else if (destinationArray.length >= 3) {
                tripTitle = `法意瑞${days}日游`;
            }
        }
        
        // 生成长度：X天X晚
        const tripDuration = `${days}天${nights}晚`;
        
        this.setData({
            tripTitle,
            tripDuration
        });
        
        console.log('生成的行程标题:', tripTitle, '时长:', tripDuration);
    },

    /**
     * 页面显示事件
     */
    onShow() {
        console.log('页面显示事件触发');
        console.log('当前tripDays数据:', this.data.tripDays);
        
        // 强制重新设置数据，确保显示正确
        const freshTripDays = [
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
        ];
        
        this.setData({
            tripDays: freshTripDays
        });

        
        // 重新生成标题
        this.generateTripTitle();
        
        // 重新加载当前选中天数的信息
        this.loadDayInfo(this.data.selectedDay);
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
        
        // 调试：打印当前选中的天数对应的路线
        const selectedTripDay = this.data.tripDays.find(item => item.day === day);
        console.log('选中的天数路线:', selectedTripDay ? selectedTripDay.route : '未找到');
        
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
        
        // 直接从 allDayInfo 中获取对应天数的行程信息
        const dayInfo = this.data.allDayInfo.find(item => item.day === day);
        
        if (!dayInfo) {
            console.error('未找到第', day, '天的行程信息');
            return;
        }
        // 更新当前选中天数的行程信息
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