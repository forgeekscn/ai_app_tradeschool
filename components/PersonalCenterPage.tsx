'use client';

import { useState } from 'react';
import {
  User,
  Settings,
  Heart,
  MessageSquare,
  Package,
  Users,
  Star,
  ChevronRight,
  Edit,
  Camera,
  Award,
  ShoppingBag,
  BookOpen,
  TrendingUp
} from 'lucide-react';
import ProfileEditModal from './ProfileEditModal';

export default function PersonalCenterPage() {
  const [activeTab, setActiveTab] = useState('posts');
  const [showEditModal, setShowEditModal] = useState(false);
  const [userInfo, setUserInfo] = useState({
    userId: 'user_123',
    nickname: '学习小达人',
    avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/ee5f3265750f957acc83c020678f3b7c.png',
    realName: '张同学',
    studentId: '202101001',
    school: '某某大学',
    major: '计算机科学与技术',
    grade: '大三',
    isVerified: true,
    level: 3,
    points: 1250,
    rating: 4.8,
    description: '热爱学习，喜欢分享经验，希望能帮助到更多的同学！',
    joinTime: '2023-09-01',
    loginDays: 128
  });

  const handleAvatarUpload = () => {
    alert('更换头像功能\n（后续将实现图片上传功能）');
  };

  const handleProfileEdit = () => {
    setShowEditModal(true);
  };

  const handleProfileSave = (newUserInfo: any) => {
    setUserInfo(prev => ({ ...prev, ...newUserInfo }));
    alert('个人资料已更新！');
  };

  const handleMenuItemClick = (itemId: string) => {
    switch (itemId) {
      case 'my-posts':
        alert('我的发布页面\n（后续将实现我的发布列表）');
        break;
      case 'my-likes':
        alert('我的点赞页面\n（后续将实现我的点赞列表）');
        break;
      case 'my-comments':
        alert('我的评论页面\n（后续将实现我的评论列表）');
        break;
      case 'my-products':
        alert('我的商品页面\n（后续将实现我的商品管理）');
        break;
      case 'my-groups':
        alert('我的小组页面\n（后续将实现我的小组列表）');
        break;
      case 'my-ratings':
        alert('我的评价页面\n（后续将实现我的评价列表）');
        break;
      case 'settings':
        alert('设置页面\n（后续将实现设置功能）');
        break;
      default:
        break;
    }
  };

  const handleStatClick = (statType: string) => {
    alert(`查看${statType}详情\n（后续将实现${statType}列表页面）`);
  };

  const handleOtherFunction = (functionName: string) => {
    switch (functionName) {
      case 'about':
        alert('关于我们页面\n（后续将实现关于我们功能）');
        break;
      case 'feedback':
        alert('意见反馈功能\n（后续将实现意见反馈表单）');
        break;
      case 'help':
        alert('帮助中心页面\n（后续将实现帮助中心）');
        break;
      case 'logout':
        if (confirm('确定要退出登录吗？')) {
          alert('已退出登录\n（后续将实现真实的登出逻辑）');
        }
        break;
      default:
        break;
    }
  };

  const stats = {
    posts: 15,
    likes: 456,
    comments: 128,
    followers: 89,
    following: 67
  };

  const menuItems = [
    { id: 'my-posts', icon: Edit, label: '我的发布', badge: 3 },
    { id: 'my-likes', icon: Heart, label: '我的点赞', badge: null },
    { id: 'my-comments', icon: MessageSquare, label: '我的评论', badge: 12 },
    { id: 'my-products', icon: Package, label: '我的商品', badge: 5 },
    { id: 'my-groups', icon: Users, label: '我的小组', badge: null },
    { id: 'my-ratings', icon: Star, label: '我的评价', badge: null },
    { id: 'settings', icon: Settings, label: '设置', badge: null }
  ];

  const achievementBadges = [
    { id: 1, name: '活跃用户', icon: TrendingUp, color: 'bg-blue-500', earned: true },
    { id: 2, name: '优质卖家', icon: ShoppingBag, color: 'bg-green-500', earned: true },
    { id: 3, name: '学习达人', icon: BookOpen, color: 'bg-purple-500', earned: true },
    { id: 4, name: '社区贡献者', icon: Award, color: 'bg-yellow-500', earned: false }
  ];

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      <div className="container mx-auto px-4 py-4 space-y-4">
        {/* 用户信息卡片 */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* 背景和头像 */}
          <div className="relative h-32 bg-gradient-to-r from-primary/20 to-secondary/20">
            <button
              onClick={handleAvatarUpload}
              className="absolute top-4 right-4 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
            >
              <Camera className="w-4 h-4 text-gray-600" />
            </button>
            <div className="absolute -bottom-10 left-4">
              <div className="relative">
                <img
                  src={userInfo.avatar}
                  alt={userInfo.nickname}
                  className="w-20 h-20 rounded-full border-4 border-white object-cover cursor-pointer hover:opacity-80 transition-opacity"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/api/searchImage?query=' + encodeURIComponent(userInfo.nickname) + ' avatar&width=80&height=80';
                  }}
                  onClick={handleAvatarUpload}
                />
                {userInfo.isVerified && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 用户信息 */}
          <div className="pt-12 pb-4 px-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                  <span>{userInfo.nickname}</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">Lv.{userInfo.level}</span>
                </h2>
                <p className="text-sm text-gray-500">{userInfo.school} · {userInfo.major}</p>
              </div>
              <button
                onClick={handleProfileEdit}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Edit className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-3">{userInfo.description}</p>

            {/* 统计数据 */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              <button
                onClick={() => handleStatClick('我的发布')}
                className="text-center hover:bg-gray-50 rounded-lg py-2 transition-colors"
              >
                <div className="text-lg font-bold text-gray-800">{stats.posts}</div>
                <div className="text-xs text-gray-500">发布</div>
              </button>
              <button
                onClick={() => handleStatClick('我的获赞')}
                className="text-center hover:bg-gray-50 rounded-lg py-2 transition-colors"
              >
                <div className="text-lg font-bold text-gray-800">{stats.likes}</div>
                <div className="text-xs text-gray-500">获赞</div>
              </button>
              <button
                onClick={() => handleStatClick('我的评论')}
                className="text-center hover:bg-gray-50 rounded-lg py-2 transition-colors"
              >
                <div className="text-lg font-bold text-gray-800">{stats.comments}</div>
                <div className="text-xs text-gray-500">评论</div>
              </button>
              <button
                onClick={() => handleStatClick('我的粉丝')}
                className="text-center hover:bg-gray-50 rounded-lg py-2 transition-colors"
              >
                <div className="text-lg font-bold text-gray-800">{stats.followers}</div>
                <div className="text-xs text-gray-500">粉丝</div>
              </button>
              <button
                onClick={() => handleStatClick('我的关注')}
                className="text-center hover:bg-gray-50 rounded-lg py-2 transition-colors"
              >
                <div className="text-lg font-bold text-gray-800">{stats.following}</div>
                <div className="text-xs text-gray-500">关注</div>
              </button>
            </div>

            {/* 积分和等级 */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Award className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-sm font-medium text-gray-800">积分 {userInfo.points}</div>
                  <div className="text-xs text-gray-500">连续登录 {userInfo.loginDays} 天</div>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                信用分 {userInfo.rating} ⭐
              </div>
            </div>
          </div>
        </div>

        {/* 功能菜单 */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuItemClick(item.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center space-x-3">
                <item.icon className="w-5 h-5 text-primary" />
                <span className="text-gray-800">{item.label}</span>
              </div>
              <div className="flex items-center space-x-2">
                {item.badge && (
                  <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                    {item.badge}
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </button>
          ))}
        </div>

        {/* 成就徽章 */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="font-medium text-gray-800 mb-3">我的成就</h3>
          <div className="grid grid-cols-4 gap-3">
            {achievementBadges.map((badge) => (
              <div
                key={badge.id}
                className={`text-center p-3 rounded-lg ${
                  badge.earned
                    ? 'bg-gradient-to-br from-gray-50 to-gray-100'
                    : 'bg-gray-100 opacity-50'
                }`}
              >
                <div className={`w-10 h-10 ${badge.earned ? badge.color : 'bg-gray-300'} rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <badge.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-xs text-gray-700">{badge.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 其他功能 */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <button
            onClick={() => handleOtherFunction('about')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <span className="text-gray-800">关于我们</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
          <button
            onClick={() => handleOtherFunction('feedback')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <span className="text-gray-800">意见反馈</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
          <button
            onClick={() => handleOtherFunction('help')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <span className="text-gray-800">帮助中心</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
          <button
            onClick={() => handleOtherFunction('logout')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-red-600"
          >
            <span>退出登录</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 编辑个人资料模态框 */}
        <ProfileEditModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          userInfo={userInfo}
          onSave={handleProfileSave}
        />
      </div>
    </div>
  );
}