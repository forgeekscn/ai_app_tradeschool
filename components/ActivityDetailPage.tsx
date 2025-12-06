'use client';

import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Phone,
  Mail,
  MessageCircle,
  Share2,
  Clock,
  Tag,
  Check,
  Info,
  User
} from 'lucide-react';
import { CarouselItem } from '@/types';

interface ActivityDetailPageProps {
  activityId: string;
  onBack: () => void;
}

// 模拟活动详情数据
const mockActivityDetails: Record<string, CarouselItem> = {
  '1': {
    id: '1',
    title: '校园歌手大赛',
    subtitle: '5月20日 大礼堂 不见不散',
    image: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/4ec7df524985d8bd3bc286a0826c154b.png',
    type: 'activity',
    description: '一年一度的校园歌手大赛即将拉开帷幕！这是展示同学们音乐才华的绝佳平台，也是校园文化生活的重要组成部分。无论你是专业歌手还是业余爱好者，只要你热爱音乐、勇于展示自己，都欢迎报名参加！',
    date: '2024年5月20日 19:00',
    location: '学校大礼堂',
    organizer: '学生会文艺部',
    images: [
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/4ec7df524985d8bd3bc286a0826c154b.png',
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/33c70e9ed532cc0fc68240e886002862.png'
    ],
    tags: ['音乐', '比赛', '文艺', '才艺'],
    registrationDeadline: '2024年5月15日',
    maxParticipants: 50,
    currentParticipants: 32,
    contactInfo: {
      phone: '13812345678',
      email: 'singer@campus.edu.cn',
      wechat: 'CampusSinger2024'
    },
    requirements: [
      '在校学生均可报名参加',
      '参赛选手需准备2首歌曲',
      '歌曲内容要求健康向上',
      '报名时需提供个人信息和参赛曲目',
      '决赛需自备伴奏（MP3格式）'
    ],
    schedule: [
      { time: '4月15日-5月15日', activity: '报名阶段' },
      { time: '5月16日-5月18日', activity: '初赛选拔' },
      { time: '5月19日', activity: '决赛彩排' },
      { time: '5月20日 19:00', activity: '正式演出' }
    ]
  },
  '2': {
    id: '2',
    title: '图书馆新书推荐',
    subtitle: '考研必备资料已上架',
    image: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/33c70e9ed532cc0fc68240e886002862.png',
    type: 'announcement',
    description: '图书馆最新到考研复习资料专区的书籍已经全部上架完成！包括历年真题解析、专业复习指导、考研英语词汇等热门资源。所有资料均可外借，欢迎同学们前来借阅学习。',
    date: '长期有效',
    location: '图书馆三楼考研专区',
    organizer: '图书馆学习资源部',
    images: [
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/33c70e9ed532cc0fc68240e886002862.png',
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/968274127b4a91ba6a1076009516f85b.png'
    ],
    tags: ['考研', '学习', '图书馆', '资料'],
    contactInfo: {
      phone: '010-12345678',
      email: 'library@campus.edu.cn'
    }
  },
  '3': {
    id: '3',
    title: '春季校运会',
    subtitle: '4月15日 田径场 期待你的参与',
    image: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/968274127b4a91ba6a1076009516f85b.png',
    type: 'event',
    description: '春季校运会是学校每年举办的重要体育盛事，旨在增强师生体质，弘扬体育精神。本届校运会设有田径、球类、体操等多个比赛项目，欢迎全体师生踊跃报名参与！',
    date: '2024年4月15日 8:00-17:00',
    location: '学校田径场',
    organizer: '体育部',
    images: [
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/968274127b4a91ba6a1076009516f85b.png',
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/2d772f18df0622879c6e8f4b52758ff6.png'
    ],
    tags: ['体育', '运动', '校运会', '健康'],
    registrationDeadline: '2024年4月10日',
    maxParticipants: 500,
    currentParticipants: 267,
    contactInfo: {
      phone: '13887654321',
      email: 'sports@campus.edu.cn'
    },
    requirements: [
      '全校师生均可报名参加',
      '根据健康状况选择合适项目',
      '参赛前需签署健康承诺书',
      '比赛当天需携带学生证',
      '自备运动装备和饮用水'
    ],
    schedule: [
      { time: '4月15日 8:00', activity: '开幕式' },
      { time: '4月15日 8:30-12:00', activity: '上午比赛' },
      { time: '4月15日 14:00-17:00', activity: '下午比赛' },
      { time: '4月15日 17:30', activity: '闭幕式暨颁奖典礼' }
    ]
  }
};

export default function ActivityDetailPage({ activityId, onBack }: ActivityDetailPageProps) {
  const [activity, setActivity] = useState<CarouselItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    // 模拟加载活动详情
    setIsLoading(true);
    setTimeout(() => {
      const activityData = mockActivityDetails[activityId] || {
        ...mockActivityDetails['1'],
        id: activityId,
        title: '活动加载中...',
        description: '活动详细信息正在加载中...'
      };
      setActivity(activityData);
      setIsLoading(false);
    }, 500);
  }, [activityId]);

  const handleRegister = () => {
    const newRegisteredState = !isRegistered;
    setIsRegistered(newRegisteredState);
    alert(newRegisteredState ? '报名成功！' : '已取消报名');
  };

  const handleShare = () => {
    if (activity) {
      alert(`分享活动：${activity.title}\n${activity.date}\n（后续将实现分享功能）`);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/api/searchImage?query=' + encodeURIComponent(activity?.title || 'activity') + '&width=400&height=300';
  };

  const images = activity?.images || [activity?.image].filter(Boolean);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-500">加载中...</p>
        </div>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">活动不存在或已结束</p>
          <button
            onClick={onBack}
            className="text-primary hover:opacity-80 transition-opacity"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  const typeColors: Record<string, string> = {
    'activity': 'bg-blue-500',
    'announcement': 'bg-green-500',
    'event': 'bg-orange-500'
  };

  const typeLabels: Record<string, string> = {
    'activity': '活动',
    'announcement': '公告',
    'event': '赛事'
  };

  return (
    <div className="flex-1 overflow-y-auto bg-white animate-fadeIn">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 bg-white border-b border-gray-100 z-10 animate-slideUp">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-medium text-gray-800">活动详情</h1>
          <button
            onClick={handleShare}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 活动封面 */}
      <div className="relative">
        <div className="aspect-video bg-gray-50 relative overflow-hidden">
          {images.length > 0 && (
            <img
              src={images[currentImageIndex]}
              alt={activity.title}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          )}

          {/* 图片指示器 */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}

          {/* 类型标签 */}
          {activity.type && (
            <div className="absolute top-4 right-4">
              <span className={`${typeColors[activity.type] || 'bg-gray-500'} text-white text-xs px-2 py-1 rounded-full`}>
                {typeLabels[activity.type]}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 活动信息 */}
      <div className="p-4 space-y-4 animate-slideUp" style={{ animationDelay: '0.1s' }}>
        <div>
          <h1 className="text-xl font-bold text-gray-800 mb-2">{activity.title}</h1>
          <div className="flex items-center justify-between mb-2">
            <p className="text-lg text-primary font-medium">{activity.subtitle}</p>
          </div>
        </div>

        {/* 标签 */}
        {activity.tags && activity.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {activity.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full flex items-center space-x-1">
                <Tag className="w-3 h-3" />
                <span>{tag}</span>
              </span>
            ))}
          </div>
        )}

        {/* 活动描述 */}
        {activity.description && (
          <div className="bg-gray-50 rounded-xl p-4 animate-slideUp" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-medium text-gray-800 mb-2 flex items-center">
              <Info className="w-4 h-4 mr-2" />
              活动介绍
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {activity.description}
            </p>
          </div>
        )}

        {/* 基本信息 */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3 animate-slideUp" style={{ animationDelay: '0.3s' }}>
          <h3 className="font-medium text-gray-800 mb-3">基本信息</h3>

          {activity.date && (
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{activity.date}</span>
            </div>
          )}

          {activity.location && (
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{activity.location}</span>
            </div>
          )}

          {activity.organizer && (
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <User className="w-4 h-4 text-primary" />
              <span>主办方：{activity.organizer}</span>
            </div>
          )}
        </div>

        {/* 报名信息 */}
        {activity.type !== 'announcement' && (
          <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3 animate-slideUp" style={{ animationDelay: '0.4s' }}>
            <h3 className="font-medium text-gray-800 mb-3">报名信息</h3>

          {activity.registrationDeadline && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">报名截止</span>
              <span className="text-sm font-medium text-gray-800">{activity.registrationDeadline}</span>
            </div>
          )}

          {activity.maxParticipants && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">参与人数</span>
              <span className="text-sm font-medium text-gray-800">
                {activity.currentParticipants || 0} / {activity.maxParticipants}
              </span>
            </div>
          )}

          {activity.maxParticipants && activity.currentParticipants && (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(activity.currentParticipants / activity.maxParticipants) * 100}%` }}
              />
            </div>
          )}
        </div>
        )}

        {/* 时间安排 */}
        {activity.schedule && activity.schedule.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3 animate-slideUp" style={{ animationDelay: '0.5s' }}>
            <h3 className="font-medium text-gray-800 mb-3">时间安排</h3>
            <div className="space-y-2">
              {activity.schedule.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 text-sm">
                  <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-gray-600 flex-shrink-0">{item.time}</span>
                  <span className="text-gray-800 font-medium">{item.activity}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 参与要求 */}
        {activity.requirements && activity.requirements.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3 animate-slideUp" style={{ animationDelay: '0.6s' }}>
            <h3 className="font-medium text-gray-800 mb-3">参与要求</h3>
            <div className="space-y-2">
              {activity.requirements.map((requirement, index) => (
                <div key={index} className="flex items-start space-x-2 text-sm">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{requirement}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 联系方式 */}
        {activity.contactInfo && (
          <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3 animate-slideUp" style={{ animationDelay: '0.7s' }}>
            <h3 className="font-medium text-gray-800 mb-3">联系方式</h3>
            <div className="space-y-2">
              {activity.contactInfo.phone && (
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>{activity.contactInfo.phone}</span>
                </div>
              )}
              {activity.contactInfo.email && (
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>{activity.contactInfo.email}</span>
                </div>
              )}
              {activity.contactInfo.wechat && (
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <MessageCircle className="w-4 h-4 text-primary" />
                  <span>微信：{activity.contactInfo.wechat}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 底部操作栏 */}
      {activity.type !== 'announcement' && (
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 animate-slideUp" style={{ animationDelay: '0.8s' }}>
          <button
            onClick={handleRegister}
            disabled={!activity.registrationDeadline || new Date(activity.registrationDeadline) < new Date()}
            className={`w-full py-3 rounded-full font-medium transition-colors flex items-center justify-center space-x-2 ${
              !activity.registrationDeadline || new Date(activity.registrationDeadline) < new Date()
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : isRegistered
                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  : 'bg-primary text-white hover:bg-primary/90'
            }`}
          >
            {isRegistered ? '已报名' : activity.registrationDeadline ? '立即报名' : '报名已结束'}
          </button>
        </div>
      )}
    </div>
  );
}