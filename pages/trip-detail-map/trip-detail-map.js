    Page({
    data: {
        selectedDay: 1,
        sidebarOpen: false, // 侧边栏开关状态
        showShareModal: false, // 分享弹窗状态
        shareStats: {
            wechatCount: 0    // 微信分享次数
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
        
        // 当前选中天数的行程信息
        currentDayInfo: {
            route: '',
            flight: null,
            accommodation: '',
            items: []
        },

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
            route: '',
            flight: null,
            accommodation: '',
            items: []
        }
    },

    onLoad(options) {
        console.log('行程详情地图页面加载完成', options);
        
        // 如果有传入的行程数据，则使用传入的数据
        if (options.tripData) {
        try {
            const tripData = JSON.parse(decodeURIComponent(options.tripData));
            console.log('接收到的行程数据:', tripData);
            
            // 处理从新接口获取的数据
            if (tripData.newPlanData) {
                this.processNewPlanData(tripData);
                // 新接口数据已经包含了地图数据，不需要重新初始化
            } else if (tripData.rawPlanData) {
                // 处理原有格式的数据
                this.processBackupPlanData(tripData);
                // 原有格式需要初始化地图
                this.initMapData();
            } else {
                // 处理原有格式的数据
                this.processOriginalTripData(tripData);
                // 原有格式需要初始化地图
                this.initMapData();
            }
            
            // 只有在没有新接口数据时才生成默认标题
            if (!tripData.newPlanData && !tripData.rawPlanData) {
                this.generateTripTitle();
            }
            
        } catch (e) {
            console.error('解析行程数据失败:', e);
            // 解析失败时使用默认数据
            this.generateTripTitle();
            this.initMapData();
        }
        } else {
        // 没有传入数据时，使用默认数据并初始化地图
        console.log('没有传入行程数据，使用默认数据');
        this.generateTripTitle();
        this.initMapData();
        }
        
        // 调试：打印当前数据状态
        console.log('=== 页面加载完成后的数据状态 ===');
        console.log('tripDays:', this.data.tripDays);
        console.log('tripTitle:', this.data.tripTitle);
        console.log('currentDayInfo:', this.data.currentDayInfo);
        
        // 如果有数据，加载第一天的行程信息
        if (this.data.allDayInfo && this.data.allDayInfo.length > 0) {
            this.loadDayInfo(1);
        }
    },

    /**
     * 处理从新接口获取的行程数据
     */
    processNewPlanData(tripData) {
        console.log('处理新接口数据:', tripData);
        
        const newPlanData = tripData.newPlanData;
        console.log('newPlanData详情:', newPlanData);
        console.log('scheduleCount:', newPlanData.scheduleCount);
        console.log('cities:', newPlanData.cities);
        console.log('planTitle:', newPlanData.planTitle);
        
        // 构建行程天数数据
        const tripDays = [];
        for (let i = 0; i < newPlanData.scheduleCount; i++) {
            const dayNumber = i + 1;
            const city = newPlanData.cities[i] || '未知城市';
            
            tripDays.push({
                day: dayNumber,
                date: this.generateDateFromDay(dayNumber),
                route: city,
                weather: '☀️' // 默认天气
            });
        }
        
        console.log('生成的tripDays:', tripDays);
        
        // 构建详细的天数信息
        const allDayInfo = [];
        for (let i = 0; i < newPlanData.scheduleCount; i++) {
            const dayNumber = i + 1;
            const city = newPlanData.cities[i] || '未知城市';
            
            allDayInfo.push({
                day: dayNumber,
                route: city,
                flight: newPlanData.transports[i] || null,
                accommodation: newPlanData.hotels[i] || '',
                items: this.generateNewDayItems(newPlanData, i),
                // 添加更多详细信息
                morning: {
                    项目名称: newPlanData.morningActivities[i] || '',
                    交通情况: newPlanData.morningTransports[i] || ''
                },
                afternoon: {
                    项目名称: newPlanData.afternoonActivities[i] || '',
                    交通情况: newPlanData.afternoonTransports[i] || ''
                },
                evening: {
                    项目名称: newPlanData.eveningActivities[i] || '',
                    交通情况: newPlanData.eveningTransports[i] || ''
                },
                breakfast: {
                    餐厅名称: newPlanData.breakfastRestaurants[i] || '',
                    人均消费: newPlanData.breakfastCosts[i] || 0
                },
                lunch: {
                    餐厅名称: newPlanData.lunchRestaurants[i] || '',
                    人均消费: newPlanData.lunchCosts[i] || 0
                },
                dinner: {
                    餐厅名称: newPlanData.dinnerRestaurants[i] || '',
                    人均消费: newPlanData.dinnerCosts[i] || 0
                },
                dailyCost: this.calculateDailyCost(newPlanData, i),
                tips: newPlanData.tips[i] || ''
            });
        }
        
        // 更新页面数据 - 完全替换所有数据
        this.setData({
            selectedDay: 1, // 确保第一天被选中
            tripDays: tripDays,
            allDayInfo: allDayInfo,
            currentDayInfo: allDayInfo[0] || this.data.currentDayInfo,
            tripTitle: newPlanData.planTitle || '个性化行程',
            tripDuration: `${newPlanData.scheduleCount}天${Math.max(0, newPlanData.scheduleCount - 1)}晚`,
            // 添加预算信息
            totalBudget: newPlanData.totalBudget || '未知',
            // 添加亮点信息
            highlights: newPlanData.highlights || [],
            // 添加特色体验
            specialExperience: newPlanData.specialExperience || '未知',
            // 添加其他信息
            planSummary: newPlanData.planSummary || '',
            costFeeling: newPlanData.costFeeling || '',
            dailyBudget: newPlanData.dailyBudget || '',
            experience: newPlanData.experience || ''
        });
        
        console.log('=== 新接口数据处理完成 ===');
        console.log('设置的tripTitle:', newPlanData.planTitle || '个性化行程');
        console.log('设置的tripDays:', tripDays);
        console.log('设置的allDayInfo:', allDayInfo);
        console.log('设置的currentDayInfo:', allDayInfo[0]);
        
        // 更新参与者信息
        if (tripData.tripInfo) {
            this.updateParticipants(tripData.tripInfo);
        }
        
        // 更新地图数据
        this.updateMapDataFromNewPlan(newPlanData);
        
        console.log('处理后的新接口行程数据:', {
            tripDays: tripDays,
            allDayInfo: allDayInfo
        });
        
        // 加载第一天的行程信息
        this.loadDayInfo(1);
    },

    /**
     * 获取随机图片URL
     */
    getRandomImage() {
        const imageUrls = [
            'https://p0.meituan.net/hackathonqjj/b0b3f56d5243193c30b25383bdfc06fe8617.jpg',
            'https://p0.meituan.net/hackathonqjj/91d9acff677c4c2e3a0e49bff62958469687.jpg',
            'https://p0.meituan.net/hackathonqjj/36e106545213901be68225209dc792f98111.jpg',
            'https://p0.meituan.net/hackathonqjj/06d1221cd56e11868d74d78a3c19ccbe7893.jpg',
            'https://p0.meituan.net/hackathonqjj/8853e9ee246b137f340fcfc263c3232913795.jpg',
            'https://p0.meituan.net/hackathonqjj/7e8f249b7226f05e59a767190a7cec0710394.jpg',
            'https://p0.meituan.net/hackathonqjj/1018f08cf1fafd49a1dc515017ad4bb410433.jpg',
            'https://p0.meituan.net/hackathonqjj/3641e32f49005c73b14eeac0141b21799571.jpg',
            'https://p0.meituan.net/hackathonqjj/370fabbb8fbc38a2845c965632952d3d6456.jpg',
            'https://p0.meituan.net/hackathonqjj/c5205a9621d09841f6e788c25de547f010610.jpg',
            'https://p0.meituan.net/hackathonqjj/f61396fc083191fa7c63934c1feecc428802.jpg',
            'https://p0.meituan.net/hackathonqjj/660548731143f53f1bd52b90bfcd33bb11831.jpg',
            'https://p0.meituan.net/hackathonqjj/f44f509b45e69ca3d9bd22918b2a3fc69254.jpg',
            'https://p0.meituan.net/hackathonqjj/066f1f168c7a71a45bf97c3771862cab74240.png',
            'https://p0.meituan.net/hackathonqjj/2d287c0699d66732e751a23fdfc35a459621.jpg',
            'https://p0.meituan.net/hackathonqjj/763ca8195649603bde6abaf8904d5cf67077.jpg',
            'https://p0.meituan.net/hackathonqjj/48867a7d438c39f6d4d3127c47974e7d9783.jpg',
            'https://p0.meituan.net/hackathonqjj/3482b71e416958d6c6f44a71ab45d07411168.jpg',
            'https://p0.meituan.net/hackathonqjj/2628893e3d859ceb76a5c9a23e05013f10034.jpg',
            'https://p0.meituan.net/hackathonqjj/4cb9ccccacbe00b24f974efcfca3593f9887.jpg',
            'https://p1.meituan.net/hackathonqjj/df2198a131a3317216c1b90d9899a9a710103.jpg',
            'https://p0.meituan.net/hackathonqjj/41e3167e843855c3417227b45edbe35d12163.jpg',
            'https://p0.meituan.net/hackathonqjj/9d364bb5a0c540d3d8b1f0b8270cb89d9870.jpg',
            'https://p0.meituan.net/hackathonqjj/11da78369f9230d7942fa0dfbf69fb5511205.jpg',
            'https://p1.meituan.net/hackathonqjj/997494569b8683af39e09003466740d78966.jpg',
            'https://p1.meituan.net/hackathonqjj/2c3e428daa842dcfc21027b3e0c8a06f11131.jpg',
            'https://p0.meituan.net/hackathonqjj/3cd75b633a7c2c02c4f8fd8802a991a810255.jpg',
            'https://p0.meituan.net/hackathonqjj/81ccfc8d3fc50d6a261b9fd66577c24a8744.jpg'
        ];
        
        // 随机选择一个图片URL
        const randomIndex = Math.floor(Math.random() * imageUrls.length);
        return imageUrls[randomIndex];
    },

    /**
     * 安全截断文本
     */
    truncateText(text, maxLength = 20) {
        if (!text || typeof text !== 'string') {
            return text || '';
        }
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    },

    /**
     * 根据天数生成日期
     */
    generateDateFromDay(dayNumber) {
        const now = new Date();
        const futureDate = new Date(now.getTime() + (dayNumber - 1) * 24 * 60 * 60 * 1000);
        const month = (futureDate.getMonth() + 1).toString().padStart(2, '0');
        const date = futureDate.getDate().toString().padStart(2, '0');
        return `${month}月${date}日`;
    },

    /**
     * 计算每日费用
     */
    calculateDailyCost(newPlanData, dayIndex) {
        const breakfastCost = newPlanData.breakfastCosts[dayIndex] || 0;
        const lunchCost = newPlanData.lunchCosts[dayIndex] || 0;
        const dinnerCost = newPlanData.dinnerCosts[dayIndex] || 0;
        
        // 可以添加其他费用，如门票、交通等
        return breakfastCost + lunchCost + dinnerCost;
    },

    /**
     * 生成新接口的每日项目
     */
    generateNewDayItems(newPlanData, dayIndex) {
        const items = [];
        
        // 1. 早通勤（如果有跨城市交通）
        if (newPlanData.transports[dayIndex] && 
            newPlanData.transports[dayIndex] !== '市内交通' && 
            newPlanData.transports[dayIndex] !== '市内电车') {
            items.push({
                type: 'flight',
                icon: '✈️',
                category: '交通',
                name: this.truncateText(newPlanData.transports[dayIndex], 10),
                description: '交通安排',
                distance: '0.0',
                time: '0',
                location: '交通信息',
                image: this.getRandomImage(),
                showFullDesc: false
            });
        }
        
        // 2. 早餐
        if (newPlanData.breakfastRestaurants[dayIndex]) {
            items.push({
                type: 'food',
                icon: '🍳',
                category: '早餐',
                name: this.truncateText(newPlanData.breakfastRestaurants[dayIndex], 10),
                price: newPlanData.breakfastCosts[dayIndex]?.toString() || '0',
                distance: '0.1',
                time: '5',
                location: newPlanData.breakfastRestaurants[dayIndex],
                image: this.getRandomImage(),
                showFullDesc: false
            });
        }
        
        // 3. 上午景点
        if (newPlanData.morningActivities[dayIndex]) {
            items.push({
                type: 'attraction',
                icon: '🏛️',
                category: '景点',
                name: this.truncateText(newPlanData.morningActivities[dayIndex], 10),
                description: this.truncateText(newPlanData.morningTransports[dayIndex] || '', 15),
                distance: '0.5',
                time: '15',
                location: newPlanData.morningActivities[dayIndex],
                image: this.getRandomImage(),
                showFullDesc: false
            });
        }
        
        // 4. 午通勤（市内交通）
        if (newPlanData.afternoonTransports[dayIndex] && 
            newPlanData.afternoonTransports[dayIndex] !== '园区内步行' && 
            newPlanData.afternoonTransports[dayIndex] !== '步行') {
            items.push({
                type: 'flight',
                icon: '🚇',
                category: '交通',
                name: this.truncateText(newPlanData.afternoonTransports[dayIndex], 10),
                description: '前往下午景点',
                distance: '0.3',
                time: '10',
                location: '市内交通',
                image: this.getRandomImage(),
                showFullDesc: false
            });
        }
        
        // 5. 中餐
        if (newPlanData.lunchRestaurants[dayIndex]) {
            items.push({
                type: 'food',
                icon: '🍽️',
                category: '午餐',
                name: this.truncateText(newPlanData.lunchRestaurants[dayIndex], 10),
                price: newPlanData.lunchCosts[dayIndex]?.toString() || '0',
                distance: '0.3',
                time: '8',
                location: newPlanData.lunchRestaurants[dayIndex],
                image: this.getRandomImage(),
                showFullDesc: false
            });
        }
        
        // 6. 下午景点
        if (newPlanData.afternoonActivities[dayIndex]) {
            items.push({
                type: 'attraction',
                icon: '🎭',
                category: '景点',
                name: this.truncateText(newPlanData.afternoonActivities[dayIndex], 10),
                description: this.truncateText(newPlanData.afternoonTransports[dayIndex] || '', 15),
                distance: '0.8',
                time: '20',
                location: newPlanData.afternoonActivities[dayIndex],
                image: this.getRandomImage(),
                showFullDesc: false
            });
        }
        
        // 7. 晚通勤（市内交通）
        if (newPlanData.eveningTransports[dayIndex] && 
            newPlanData.eveningTransports[dayIndex] !== '园区内步行' && 
            newPlanData.eveningTransports[dayIndex] !== '步行') {
            items.push({
                type: 'flight',
                icon: '🚇',
                category: '交通',
                name: this.truncateText(newPlanData.eveningTransports[dayIndex], 10),
                description: '前往晚上景点',
                distance: '0.4',
                time: '12',
                location: '市内交通',
                image: this.getRandomImage(),
                showFullDesc: false
            });
        }
        
        // 8. 晚餐
        if (newPlanData.dinnerRestaurants[dayIndex] && newPlanData.dinnerRestaurants[dayIndex] !== '无') {
            items.push({
                type: 'food',
                icon: '🍷',
                category: '晚餐',
                name: this.truncateText(newPlanData.dinnerRestaurants[dayIndex], 20),
                price: newPlanData.dinnerCosts[dayIndex]?.toString() || '0',
                distance: '0.5',
                time: '10',
                location: newPlanData.dinnerRestaurants[dayIndex],
                image: this.getRandomImage(),
                showFullDesc: false
            });
        }
        
        // 9. 晚上景点
        if (newPlanData.eveningActivities[dayIndex] && newPlanData.eveningActivities[dayIndex] !== '无') {
            items.push({
                type: 'attraction',
                icon: '🌙',
                category: '景点',
                name: this.truncateText(newPlanData.eveningActivities[dayIndex], 10),
                description: this.truncateText(newPlanData.eveningTransports[dayIndex] || '', 15),
                distance: '1.2',
                time: '25',
                location: newPlanData.eveningActivities[dayIndex],
                image: this.getRandomImage(),
                showFullDesc: false
            });
        }
        
        // 10. 住宿
        if (newPlanData.hotels[dayIndex] && newPlanData.hotels[dayIndex] !== '无') {
            items.push({
                type: 'hotel',
                icon: '🏨',
                category: '住宿',
                name: this.truncateText(newPlanData.hotels[dayIndex], 10),
                description: '住宿建议',
                distance: '0.2',
                time: '3',
                location: newPlanData.hotels[dayIndex],
                image: this.getRandomImage(),
                showFullDesc: false
            });
        }
        
        return items;
    },

    /**
     * 处理从备用接口获取的行程数据
     */
    processBackupPlanData(tripData) {
        console.log('处理备用接口数据:', tripData);
        
        const rawPlanData = tripData.rawPlanData;
        const tripArrangements = tripData.tripArrangements || rawPlanData.行程安排 || [];
        
        // 构建行程天数数据
        const tripDays = tripArrangements.map((day, index) => {
            const dayNumber = index + 1;
            const dateInfo = day.日期 || `第${dayNumber}天`;
            const city = day.城市 || '未知城市';
            
            return {
                day: dayNumber,
                date: this.extractDateFromString(dateInfo),
                route: city,
                weather: '☀️' // 默认天气
            };
        });
        
        // 构建详细的天数信息
        const allDayInfo = tripArrangements.map((day, index) => {
            const dayNumber = index + 1;
            const city = day.城市 || '未知城市';
            
            return {
                day: dayNumber,
                route: city,
                flight: day.交通方式 || null,
                accommodation: day.住宿地点 || '',
                items: this.generateDayItems(day),
                // 添加更多详细信息
                morning: day.游玩项目?.上午 || {},
                afternoon: day.游玩项目?.下午 || {},
                evening: day.游玩项目?.晚上 || {},
                breakfast: day.餐饮?.早餐 || {},
                lunch: day.餐饮?.午餐 || {},
                dinner: day.餐饮?.晚餐 || {},
                dailyCost: day.费用?.日均总费用 || 0,
                tips: day.小贴士和注意事项 || ''
            };
        });
        
        // 更新页面数据 - 完全替换所有数据
        this.setData({
            selectedDay: 1, // 确保第一天被选中
            tripDays: tripDays,
            allDayInfo: allDayInfo,
            currentDayInfo: allDayInfo[0] || this.data.currentDayInfo,
            tripTitle: rawPlanData.行程关键信息?.方案标题 || '个性化行程',
            tripDuration: `${tripArrangements.length}天${Math.max(0, tripArrangements.length - 1)}晚`,
            // 添加预算信息
            totalBudget: rawPlanData.行程关键信息?.预算价格?.总价 || '未知',
            // 添加亮点信息
            highlights: rawPlanData.行程关键信息?.方案亮点?.亮点 || [],
            // 添加特色体验
            specialExperience: rawPlanData.独家体验?.特色体验 || []
        });
        
        console.log('=== 备用接口数据处理完成 ===');
        console.log('设置的tripTitle:', rawPlanData.行程关键信息?.方案标题 || '个性化行程');
        console.log('设置的tripDays:', tripDays);
        console.log('设置的allDayInfo:', allDayInfo);
        console.log('设置的currentDayInfo:', allDayInfo[0]);
        
        // 更新参与者信息
        if (tripData.tripInfo) {
            this.updateParticipants(tripData.tripInfo);
        }
        
        // 更新地图数据
        this.updateMapDataFromPlan(tripArrangements);
        
        console.log('处理后的行程数据:', {
            tripDays: tripDays,
            allDayInfo: allDayInfo
        });
    },

    /**
     * 根据新接口数据更新地图
     */
    updateMapDataFromNewPlan(newPlanData) {
        if (!newPlanData || !newPlanData.cities || newPlanData.cities.length === 0) {
            return;
        }
        
        // 提取所有城市信息
        const cities = newPlanData.cities.filter(city => city);
        const uniqueCities = [...new Set(cities)];
        
        // 生成地图标记点（这里使用模拟坐标，实际应用中应该根据城市名获取真实坐标）
        const markers = uniqueCities.map((city, index) => ({
            id: index + 1,
            longitude: 116.397128 + (index * 0.01), // 模拟坐标
            latitude: 39.916527 + (index * 0.01),
            title: city,
            width: 40,
            height: 40,
            callout: {
                content: `📍 ${city}`,
                color: '#ffffff',
                fontSize: 14,
                borderRadius: 4,
                bgColor: '#00ff00',
                padding: 8,
                display: 'ALWAYS'
            }
        }));
        
        // 生成路线连线
        const polyline = [{
            points: markers.map(marker => ({
                longitude: marker.longitude,
                latitude: marker.latitude
            })),
            color: '#FF6B6B',
            width: 4,
            arrowLine: true
        }];
        
        // 更新地图中心点为第一个城市
        const mapCenter = markers.length > 0 ? {
            longitude: markers[0].longitude,
            latitude: markers[0].latitude
        } : this.data.mapCenter;
        
        this.setData({
            mapMarkers: markers,
            mapPolyline: polyline,
            mapCenter: mapCenter
        });
        
        console.log('新接口地图数据更新完成:', { markers, polyline, mapCenter });
    },

    /**
     * 根据行程数据更新地图
     */
    updateMapDataFromPlan(tripArrangements) {
        if (!tripArrangements || tripArrangements.length === 0) {
            return;
        }
        
        // 提取所有城市信息
        const cities = tripArrangements.map(day => day.城市).filter(city => city);
        const uniqueCities = [...new Set(cities)];
        
        // 生成地图标记点（这里使用模拟坐标，实际应用中应该根据城市名获取真实坐标）
        const markers = uniqueCities.map((city, index) => ({
            id: index + 1,
            longitude: 116.397128 + (index * 0.01), // 模拟坐标
            latitude: 39.916527 + (index * 0.01),
            title: city,
            width: 40,
            height: 40,
            callout: {
                content: `📍 ${city}`,
                color: '#ffffff',
                fontSize: 14,
                borderRadius: 4,
                bgColor: '#00ff00',
                padding: 8,
                display: 'ALWAYS'
            }
        }));
        
        // 生成路线连线
        const polyline = [{
            points: markers.map(marker => ({
                longitude: marker.longitude,
                latitude: marker.latitude
            })),
            color: '#FF6B6B',
            width: 4,
            arrowLine: true
        }];
        
        // 更新地图中心点为第一个城市
        const mapCenter = markers.length > 0 ? {
            longitude: markers[0].longitude,
            latitude: markers[0].latitude
        } : this.data.mapCenter;
        
        this.setData({
            mapMarkers: markers,
            mapPolyline: polyline,
            mapCenter: mapCenter
        });
        
        console.log('地图数据更新完成:', { markers, polyline, mapCenter });
    },

    /**
     * 处理原有格式的行程数据
     */
    processOriginalTripData(tripData) {
        console.log('处理原有格式数据:', tripData);
        
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
    },

    /**
     * 从日期字符串中提取日期信息
     */
    extractDateFromString(dateString) {
        // 匹配日期格式：第1天（2025-06-01）
        const dateMatch = dateString.match(/\((\d{4}-\d{2}-\d{2})\)/);
        if (dateMatch) {
            const date = new Date(dateMatch[1]);
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${month}月${day}日`;
        }
        
        // 如果没有日期信息，返回默认格式
        return `${(new Date().getMonth() + 1).toString().padStart(2, '0')}月${new Date().getDate().toString().padStart(2, '0')}日`;
    },

    /**
     * 切换描述展开/收起状态
     */
    toggleDescription(e) {
        const index = e.currentTarget.dataset.index;
        const items = this.data.currentDayInfo.items;
        
        if (items[index]) {
            items[index].showFullDesc = !items[index].showFullDesc;
            
            this.setData({
                'currentDayInfo.items': items
            });
        }
    },

    /**
     * 生成每日行程项目
     */
    generateDayItems(day) {
        const items = [];
        
        // 添加上午项目
        if (day.游玩项目?.上午) {
            const morning = day.游玩项目.上午;
            items.push({
                type: 'attraction',
                icon: '🏛️',
                category: '景点',
                name: this.truncateText(morning.项目名称 || '上午项目', 10),
                description: this.truncateText(morning.交通情况 || '', 15),
                distance: '0.5',
                time: '15',
                location: morning.项目名称 || '',
                image: this.getRandomImage(),
                showFullDesc: false
            });
        }
        
        // 添加下午项目
        if (day.游玩项目?.下午) {
            const afternoon = day.游玩项目.下午;
            items.push({
                type: 'attraction',
                icon: '🎭',
                category: '景点',
                name: this.truncateText(afternoon.项目名称 || '下午项目', 10),
                description: this.truncateText(afternoon.交通情况 || '', 15),
                distance: '0.8',
                time: '20',
                location: afternoon.项目名称 || '',
                image: this.getRandomImage(),
                showFullDesc: false
            });
        }
        
        // 添加晚上项目
        if (day.游玩项目?.晚上) {
            const evening = day.游玩项目.晚上;
            items.push({
                type: 'attraction',
                icon: '🌙',
                category: '景点',
                name: this.truncateText(evening.项目名称 || '晚上项目', 10),
                description: this.truncateText(evening.交通情况 || '', 15),
                distance: '1.2',
                time: '25',
                location: evening.项目名称 || '',
                image: this.getRandomImage(),
                showFullDesc: false
            });
        }
        
        // 添加餐饮信息
        if (day.餐饮?.早餐) {
            const breakfast = day.餐饮.早餐;
            items.push({
                type: 'food',
                icon: '🍳',
                category: '早餐',
                name: this.truncateText(breakfast.餐厅名称 || '早餐', 10),
                price: breakfast.人均消费?.toString() || '0',
                distance: '0.1',
                time: '5',
                location: breakfast.餐厅名称 || '',
                image: this.getRandomImage(),
                showFullDesc: false
            });
        }
        
        if (day.餐饮?.午餐) {
            const lunch = day.餐饮.午餐;
            items.push({
                type: 'food',
                icon: '🍽️',
                category: '午餐',
                name: this.truncateText(lunch.餐厅名称 || '午餐', 20),
                price: lunch.人均消费?.toString() || '0',
                distance: '0.3',
                time: '8',
                location: lunch.餐厅名称 || '',
                image: this.getRandomImage(),
                showFullDesc: false
            });
        }
        
        if (day.餐饮?.晚餐) {
            const dinner = day.餐饮.晚餐;
            items.push({
                type: 'food',
                icon: '🍷',
                category: '晚餐',
                name: this.truncateText(dinner.餐厅名称 || '晚餐', 20),
                price: dinner.人均消费?.toString() || '0',
                distance: '0.5',
                time: '10',
                location: dinner.餐厅名称 || '',
                image: this.getRandomImage(),
                showFullDesc: false
            });
        }
        
        // 添加住宿信息
        if (day.住宿地点) {
            items.push({
                type: 'hotel',
                icon: '🏨',
                category: '住宿',
                name: this.truncateText(day.住宿地点, 20),
                description: '住宿建议',
                distance: '0.2',
                time: '3',
                location: day.住宿地点,
                image: this.getRandomImage(),
                showFullDesc: false
            });
        }
        
        // 添加交通信息
        if (day.交通方式 && day.交通方式 !== '市内地铁' && day.交通方式 !== '市内电车') {
            items.push({
                type: 'flight',
                icon: '✈️',
                category: '交通',
                name: this.truncateText(day.交通方式, 20),
                description: '交通安排',
                distance: '0.0',
                time: '0',
                location: '交通信息',
                image: this.getRandomImage(),
                showFullDesc: false
            });
        }
        
        return items;
    },

    /**
     * 生成行程标题和时长
     */
    generateTripTitle() {
        // 如果已经有备用接口设置的标题，就不要覆盖
        if (this.data.tripTitle && this.data.tripTitle !== '个性化行程') {
            console.log('已有备用接口标题，跳过生成:', this.data.tripTitle);
            return;
        }
        
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
        const existingDayInfo = this.data.allDayInfo.find(item => item.day === day);

        if (!existingDayInfo) {
            console.error('未找到第', day, '天的行程信息');
            return;
        }

        // 使用备用接口的完整数据结构
        const dayInfo = {
            route: existingDayInfo.route || '',
            flight: existingDayInfo.flight || null,
            accommodation: existingDayInfo.accommodation || '',
            items: existingDayInfo.items || [],
            // 添加更多详细信息
            morning: existingDayInfo.morning || {},
            afternoon: existingDayInfo.afternoon || {},
            evening: existingDayInfo.evening || {},
            breakfast: existingDayInfo.breakfast || {},
            lunch: existingDayInfo.lunch || {},
            dinner: existingDayInfo.dinner || {},
            dailyCost: existingDayInfo.dailyCost || 0,
            tips: existingDayInfo.tips || ''
        };

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



    // 阻止事件冒泡
    stopPropagation() {
        // 空函数，用于阻止事件冒泡
    },

    // 记录分享行为
    recordShareAction() {
        const { tripTitle, tripDuration, tripDays, participants } = this.data;
        
        // 更新微信分享统计
        const shareStats = { ...this.data.shareStats };
        shareStats.wechatCount++;
        
        this.setData({ shareStats });
        
        console.log('微信分享记录:', {
            tripTitle,
            tripDuration,
            tripDays: tripDays ? tripDays.length : 0,
            participants: participants ? participants.length : 0,
            shareStats,
            timestamp: new Date().toISOString()
        });
        
        // 这里可以添加数据统计或上报逻辑
    },

    // 处理分享后的回调
    onShareSuccess() {
        wx.showToast({
            title: '分享成功！',
            icon: 'success',
            duration: 2000
        });
        
        // 记录分享成功
        this.recordShareAction();
        
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
        this.recordShareAction();
        
        // 显示成功提示
        wx.showToast({
            title: '分享成功！',
            icon: 'success',
            duration: 2000
        });
        
        // 隐藏分享弹窗
        this.hideShareModal();
    },


});