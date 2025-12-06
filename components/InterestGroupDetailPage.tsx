'use client';

import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Users,
  Calendar,
  MapPin,
  Share2,
  MessageCircle,
  Heart,
  Settings,
  Camera,
  Clock,
  Star,
  BookOpen,
  Target,
  Trophy
} from 'lucide-react';
import { InterestGroup, Activity, Comment } from '@/types';

interface InterestGroupDetailPageProps {
  groupId: string;
  onBack: () => void;
}

// 模拟兴趣小组详情数据
const mockGroupDetails: Record<string, InterestGroup> = {
  '1': {
    id: '1',
    name: '篮球爱好者联盟',
    category: '运动类',
    memberCount: 156,
    image: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/433c181a83f5e27bbb82449f76374965.png',
    isJoined: false,
    description: '欢迎加入篮球爱好者联盟！我们是一个充满活力的篮球社区，致力于推广篮球运动，提高球技，结交志同道合的朋友。无论你是新手还是老手，都能在这里找到属于自己的位置。',
    creator: {
      name: '张明',
      avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/avatar1.png',
      school: '清华大学'
    },
    createTime: '2024年3月',
    tags: ['篮球', '运动', '团队', '竞技'],
    recentActivities: [
      '本周五晚7点体育馆打球',
      '新成员篮球基础培训',
      '校内3V3篮球比赛报名'
    ],
    members: [
      {
        name: '张明',
        avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/avatar1.png',
        joinTime: '2024年3月'
      },
      {
        name: '李华',
        avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/avatar2.png',
        joinTime: '2024年4月'
      },
      {
        name: '王芳',
        avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/avatar3.png',
        joinTime: '2024年5月'
      }
    ],
    posts: 48,
    images: [
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/433c181a83f5e27bbb82449f76374965.png',
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/dd6f10550dd54b89a2b5e1752b5eca8d.png'
    ],
    rules: [
      '尊重每一位成员，保持友好交流',
      '按时参加集体活动，有事提前请假',
      '积极参与小组讨论和活动组织',
      '遵守体育道德，文明打球'
    ],
    location: '校内体育馆'
  },
  '2': {
    id: '2',
    name: '校园篮球队',
    category: '运动类',
    memberCount: 86,
    image: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/1326b672ece1b8bf4f07070dcc16eedf.png',
    isJoined: false,
    description: '校园篮球队是学校官方认可的体育组织，致力于培养篮球人才，代表学校参加各类比赛。我们有着严格的训练体系，专业的教练指导，和浓厚的团队文化。',
    creator: {
      name: '王教练',
      avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/coach1.png',
      school: '体育部'
    },
    createTime: '2023年9月',
    tags: ['篮球队', '比赛', '专业训练', '校队'],
    recentActivities: [
      '每周一三五下午训练',
      '备战校内联赛',
      '新生队员选拔赛'
    ],
    members: [
      {
        name: '王教练',
        avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/coach1.png',
        joinTime: '2023年9月'
      },
      {
        name: '队长张伟',
        avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/captain1.png',
        joinTime: '2023年10月'
      }
    ],
    posts: 32,
    images: [
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/1326b672ece1b8bf4f07070dcc16eedf.png'
    ],
    rules: [
      '按时参加训练，不得无故缺席',
      '服从教练安排和指导',
      '维护校队荣誉，展现良好风貌',
      '团队协作，共同进步'
    ],
    location: '体育中心'
  },
  '3': {
    id: '3',
    name: '光影摄影社',
    category: '艺术类',
    memberCount: 64,
    image: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/6973e873b5dcf0c293cbf91c1250fb92.png',
    isJoined: true,
    description: '光影摄影社是校园内最具影响力的摄影组织之一。我们用镜头记录校园生活的美好瞬间，用光影诉说动人的故事。无论你是摄影新手还是老手，都能在这里找到创作的乐趣。',
    creator: {
      name: '李影',
      avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/photographer1.png',
      school: '美术学院'
    },
    createTime: '2023年10月',
    tags: ['摄影', '艺术', '光影', '创作'],
    recentActivities: [
      '秋季摄影采风活动',
      '校园风光摄影展',
      '摄影技术分享会'
    ],
    members: [
      {
        name: '李影',
        avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/photographer1.png',
        joinTime: '2023年10月'
      },
      {
        name: '王光',
        avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/photographer2.png',
        joinTime: '2023年11月'
      }
    ],
    posts: 89,
    images: [
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/6973e873b5dcf0c293cbf91c1250fb92.png',
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/photo1.png',
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/photo2.png'
    ],
    rules: [
      '尊重原创，保护版权',
      '器材使用要爱护',
      '积极参与活动创作',
      '分享技巧，共同提高'
    ],
    location: '艺术楼摄影室'
  },
  '4': {
    id: '4',
    name: '电影爱好者',
    category: '娱乐类',
    memberCount: 92,
    image: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/2836ffe5cc6be259b773876967b0bcc1.png',
    isJoined: false,
    description: '电影爱好者协会是一个以电影鉴赏、交流、创作为核心的文化社团。我们定期举办电影放映、导演见面会、影评大赛等活动，为电影爱好者提供交流平台。',
    creator: {
      name: '赵导演',
      avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/director1.png',
      school: '文学院'
    },
    createTime: '2024年1月',
    tags: ['电影', '艺术', '文化', '鉴赏'],
    recentActivities: [
      '周末电影夜活动',
      '经典电影回顾展',
      '原创短片大赛'
    ],
    members: [
      {
        name: '赵导演',
        avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/director1.png',
        joinTime: '2024年1月'
      },
      {
        name: '小马',
        avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/movie1.png',
        joinTime: '2024年2月'
      }
    ],
    posts: 156,
    images: [
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/2836ffe5cc6be259b773876967b0bcc1.png'
    ],
    rules: [
      '文明观影，尊重他人',
      '积极参与讨论交流',
      '保护版权，支持正版',
      '包容不同观点'
    ],
    location: '学生活动中心'
  },
  '5': {
    id: '5',
    name: '英语角',
    category: '学习类',
    memberCount: 75,
    image: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/b44e4586753b70a79fced67bfedc7a08.png',
    isJoined: false,
    description: '英语角是一个致力于提升英语口语和交流能力的学习平台。我们通过丰富的活动形式，创造轻松的英语学习环境，帮助同学们在实际交流中提高英语水平。',
    creator: {
      name: 'Emma老师',
      avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/teacher1.png',
      school: '外国语学院'
    },
    createTime: '2023年9月',
    tags: ['英语', '学习', '口语', '交流'],
    recentActivities: [
      '英语口语练习',
      '主题英语角活动',
      '英语学习经验分享'
    ],
    members: [
      {
        name: 'Emma老师',
        avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/teacher1.png',
        joinTime: '2023年9月'
      },
      {
        name: '小明',
        avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/student1.png',
        joinTime: '2023年10月'
      }
    ],
    posts: 78,
    images: [
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/b44e4586753b70a79fced67bfedc7a08.png'
    ],
    rules: [
      '用英语交流，营造良好氛围',
      '尊重不同口音和水平',
      '积极参与，勇于开口',
      '互相帮助，共同进步'
    ],
    location: '外语角'
  },
  '6': {
    id: '6',
    name: '吉他社',
    category: '艺术类',
    memberCount: 45,
    image: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/2836ffe5cc6be259b773876967b0bcc1.png',
    isJoined: false,
    description: '吉他社是一个以吉他演奏和音乐交流为核心的文艺社团。无论你是零基础的新手还是有一定基础的爱好者，都能在这里找到属于自己的音乐世界。',
    creator: {
      name: '音乐才子',
      avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/musician1.png',
      school: '音乐学院'
    },
    createTime: '2024年2月',
    tags: ['吉他', '音乐', '弹唱', '创作'],
    recentActivities: [
      '吉他基础教学',
      '音乐创作分享',
      '校园音乐节筹备'
    ],
    members: [
      {
        name: '音乐才子',
        avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/musician1.png',
        joinTime: '2024年2月'
      },
      {
        name: '小李',
        avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/music1.png',
        joinTime: '2024年3月'
      }
    ],
    posts: 34,
    images: [
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/2836ffe5cc6be259b773876967b0bcc1.png',
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/guitar1.png'
    ],
    rules: [
      '爱护社团器材和设备',
      '尊重不同音乐风格',
      '积极参与社团活动',
      '用音乐传递正能量'
    ],
    location: '音乐教室'
  },
  '7': {
    id: '7',
    name: '跑步俱乐部',
    category: '运动类',
    memberCount: 103,
    image: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/1326b672ece1b8bf4f07070dcc16eedf.png',
    isJoined: true,
    description: '跑步俱乐部是一个热爱运动、追求健康的体育社团。我们通过定期的跑步训练、参加马拉松比赛等活动，推广跑步文化，提高同学们的身体素质。',
    creator: {
      name: '长跑达人',
      avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/runner1.png',
      school: '体育学院'
    },
    createTime: '2023年8月',
    tags: ['跑步', '健身', '马拉松', '健康'],
    recentActivities: [
      '每日晨跑训练',
      '城市马拉松报名',
      '跑步技巧分享'
    ],
    members: [
      {
        name: '长跑达人',
        avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/runner1.png',
        joinTime: '2023年8月'
      },
      {
        name: '健康生活',
        avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/runner2.png',
        joinTime: '2023年9月'
      }
    ],
    posts: 67,
    images: [
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/1326b672ece1b8bf4f07070dcc16eedf.png'
    ],
    rules: [
      '坚持训练，不轻易放弃',
      '注意运动安全，预防受伤',
      '团队互助，共同进步',
      '传播健康生活理念'
    ],
    location: '体育场'
  },
  '8': {
    id: '8',
    name: '考研交流群',
    category: '学习类',
    memberCount: 256,
    image: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/b44e4586753b70a79fced67bfedc7a08.png',
    isJoined: false,
    description: '考研交流群是为准备考研的同学搭建的学习交流平台。我们提供最新的考研资讯、学习资料、经验分享，帮助同学们在考研路上不再孤单，一起实现研究生梦想。',
    creator: {
      name: '考研学长',
      avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/student2.png',
      school: '研究生院'
    },
    createTime: '2023年6月',
    tags: ['考研', '学习', '资料', '交流'],
    recentActivities: [
      '考研政策解读会',
      '专业课复习指导',
      '模拟考试安排'
    ],
    members: [
      {
        name: '考研学长',
        avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/student2.png',
        joinTime: '2023年6月'
      },
      {
        name: '学霸同学',
        avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/student3.png',
        joinTime: '2023年7月'
      }
    ],
    posts: 234,
    images: [
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/b44e4586753b70a79fced67bfedc7a08.png',
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/study1.png'
    ],
    rules: [
      '专注学习，不偏离主题',
      '分享优质学习资源',
      '相互鼓励，共同进步',
      '保护个人信息安全'
    ],
    location: '考研自习室'
  }
};

// 模拟活动数据
const mockActivities: Activity[] = [
  {
    id: '1',
    title: '周末友谊赛',
    description: '篮球3V3友谊赛，欢迎大家参加！',
    date: '2024-12-08 14:00',
    location: '体育馆',
    participantCount: 12,
    images: ['https://design.gemcoder.com/staticResource/echoAiSystemImages/433c181a83f5e27bbb82449f76374965.png'],
    creator: {
      name: '张明',
      avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/avatar1.png'
    },
    status: 'upcoming'
  },
  {
    id: '2',
    title: '新成员培训',
    description: '为新加入的成员提供基础篮球技能培训',
    date: '2024-12-09 16:00',
    location: '训练馆',
    participantCount: 8,
    creator: {
      name: '李华',
      avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/avatar2.png'
    },
    status: 'upcoming'
  }
];

export default function InterestGroupDetailPage({ groupId, onBack }: InterestGroupDetailPageProps) {
  const [group, setGroup] = useState<InterestGroup | null>(null);
  const [activeTab, setActiveTab] = useState('info');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isJoined, setIsJoined] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // 模拟加载兴趣小组详情
    setIsLoading(true);
    setTimeout(() => {
      const groupData = mockGroupDetails[groupId] || {
        ...mockGroupDetails['1'],
        id: groupId,
        name: '兴趣小组加载中...',
        description: '小组详细信息正在加载中...'
      };
      setGroup(groupData);
      setIsJoined(groupData.isJoined);
      setIsLoading(false);
    }, 500);
  }, [groupId]);

  const handleJoinGroup = () => {
    const newJoinedState = !isJoined;
    setIsJoined(newJoinedState);
    if (group) {
      setGroup({
        ...group,
        isJoined: newJoinedState,
        memberCount: newJoinedState ? group.memberCount + 1 : group.memberCount - 1
      });
    }
    alert(newJoinedState ? '成功加入小组！' : '已退出小组');
  };

  const handleShare = () => {
    if (group) {
      alert(`分享小组：${group.name}\n成员：${group.memberCount}人\n（后续将实现分享功能）`);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/api/searchImage?query=' + encodeURIComponent(group?.name || 'group') + '&width=400&height=200';
  };

  const images = group?.images || [group?.image].filter(Boolean);

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

  if (!group) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">小组不存在或已解散</p>
          <button
            onClick={onBack}
            className="text-primary hover:opacity-80 transition-opacity"
          >
            返回列表
          </button>
        </div>
      </div>
    );
  }

  const categoryColors: Record<string, string> = {
    '学习类': 'bg-blue-500',
    '运动类': 'bg-green-500',
    '艺术类': 'bg-purple-500',
    '娱乐类': 'bg-orange-500'
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
          <h1 className="font-medium text-gray-800">小组详情</h1>
          <div className="flex space-x-2">
            <button
              onClick={handleLike}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isLiked ? 'bg-red-50 text-red-500' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* 小组封面 */}
      <div className="relative">
        <div className="aspect-video bg-gray-50 relative overflow-hidden">
          {images.length > 0 && (
            <img
              src={images[currentImageIndex]}
              alt={group.name}
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

          {/* 分类标签 */}
          <div className="absolute top-4 right-4">
            <span className={`${categoryColors[group.category] || 'bg-gray-500'} text-white text-xs px-2 py-1 rounded-full`}>
              {group.category}
            </span>
          </div>
        </div>
      </div>

      {/* 小组基本信息 */}
      <div className="p-4 space-y-4 animate-slideUp" style={{ animationDelay: '0.1s' }}>
        <div>
          <h1 className="text-xl font-bold text-gray-800 mb-2">{group.name}</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{group.memberCount}人</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{group.createTime}</span>
            </div>
            {group.location && (
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{group.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* 标签 */}
        {group.tags && group.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {group.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* 小组描述 */}
        {group.description && (
          <div className="bg-gray-50 rounded-xl p-4 animate-slideUp" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-medium text-gray-800 mb-2 flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              小组介绍
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {group.description}
            </p>
          </div>
        )}
      </div>

      {/* Tab切换 */}
      <div className="sticky top-16 bg-white border-b border-gray-100 z-10">
        <div className="flex">
          {[
            { id: 'info', label: '小组信息', icon: BookOpen },
            { id: 'members', label: '成员', icon: Users },
            { id: 'activities', label: '活动', icon: Calendar },
            { id: 'rules', label: '规则', icon: Target }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <div className="flex items-center justify-center space-x-1">
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tab内容 */}
      <div className="p-4 animate-slideUp" style={{ animationDelay: '0.3s' }}>
        {activeTab === 'info' && (
          <div className="space-y-4">
            {/* 创建者信息 */}
            {group.creator && (
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <h3 className="font-medium text-gray-800 mb-3">创建者</h3>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden">
                    <img
                      src={group.creator.avatar}
                      alt={group.creator.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/api/searchImage?query=' + encodeURIComponent(group.creator?.name || 'user') + '&width=48&height=48';
                      }}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{group.creator.name}</p>
                    <p className="text-sm text-gray-500">{group.creator.school}</p>
                  </div>
                </div>
              </div>
            )}

            {/* 统计信息 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
                <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">{group.posts || 0}</p>
                <p className="text-sm text-gray-600">帖子数</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
                <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">{group.memberCount}</p>
                <p className="text-sm text-gray-600">成员数</p>
              </div>
            </div>

            {/* 最近活动 */}
            {group.recentActivities && group.recentActivities.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  最近活动
                </h3>
                <div className="space-y-2">
                  {group.recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>{activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'members' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-800">小组成员 ({group.memberCount})</h3>
              {group.isJoined && (
                <button className="text-primary text-sm hover:opacity-80 transition-opacity">
                  邀请好友
                </button>
              )}
            </div>

            {group.members && group.members.length > 0 ? (
              <div className="space-y-3">
                {group.members.map((member, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-white rounded-xl border border-gray-100 p-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/api/searchImage?query=' + encodeURIComponent(member.name) + '&width=40&height=40';
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{member.name}</p>
                      <p className="text-xs text-gray-500">{member.joinTime}加入</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>暂无成员信息</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'activities' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-800">小组活动</h3>
              {group.isJoined && (
                <button className="text-primary text-sm hover:opacity-80 transition-opacity">
                  发起活动
                </button>
              )}
            </div>

            {mockActivities.length > 0 ? (
              <div className="space-y-3">
                {mockActivities.map((activity) => (
                  <div key={activity.id} className="bg-white rounded-xl border border-gray-100 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-800">{activity.title}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        activity.status === 'upcoming' ? 'bg-blue-100 text-blue-600' :
                        activity.status === 'ongoing' ? 'bg-green-100 text-green-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {activity.status === 'upcoming' ? '即将开始' :
                         activity.status === 'ongoing' ? '进行中' : '已结束'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{activity.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{activity.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{activity.participantCount}人</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>暂无活动安排</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'rules' && (
          <div className="space-y-4">
            <h3 className="font-medium text-gray-800 mb-3">小组规则</h3>

            {group.rules && group.rules.length > 0 ? (
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <div className="space-y-3">
                  {group.rules.map((rule, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 text-sm">{rule}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Target className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>暂无规则说明</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 底部操作栏 */}
      <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 animate-slideUp" style={{ animationDelay: '0.5s' }}>
        <div className="flex space-x-3">
          <button
            onClick={() => alert('聊天功能开发中...')}
            className={`flex-1 py-3 rounded-full font-medium transition-colors flex items-center justify-center space-x-2 ${
              isJoined
                ? 'border border-primary text-primary hover:bg-gray-50'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>{isJoined ? '小组聊天' : '加入后可聊天'}</span>
          </button>
          <button
            onClick={handleJoinGroup}
            className={`flex-1 py-3 rounded-full font-medium transition-colors ${
              isJoined
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-primary text-white hover:bg-primary/90'
            }`}
          >
            {isJoined ? '退出小组' : '加入小组'}
          </button>
        </div>
      </div>
    </div>
  );
}