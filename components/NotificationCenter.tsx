'use client';

import { useState, useEffect } from 'react';
import {
  Bell,
  X,
  Check,
  Settings,
  Filter,
  Trash2,
  Clock,
  MessageSquare,
  ShoppingBag,
  Users,
  Heart,
  UserPlus,
  Info
} from 'lucide-react';
import { Notification } from '@/types';
import { useNavigation } from '@/lib/NavigationContext';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

// 模拟通知数据
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: '校园歌手大赛即将开始',
    content: '您报名的校园歌手大赛将于明天晚上7点在大礼堂举行，请准时参加。',
    type: 'activity',
    timestamp: '2小时前',
    read: false,
    avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/avatar1.png',
    userName: '学生会文艺部',
    targetId: '1',
    targetType: 'activity',
    targetTitle: '校园歌手大赛'
  },
  {
    id: '2',
    title: '有人评论了你的内容',
    content: '学习小达人评论了你的帖子："这个方法很有用，我也试试看"',
    type: 'comment',
    timestamp: '4小时前',
    read: false,
    avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/avatar2.png',
    userName: '学习小达人',
    targetId: '1',
    targetType: 'post',
    targetTitle: '考研英语复习经验分享'
  },
  {
    id: '3',
    title: '新的二手商品上架',
    content: '你关注的"考研必备资料"卖家发布了新商品，快来看看吧！',
    type: 'trade',
    timestamp: '1天前',
    read: true,
    avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/avatar3.png',
    userName: '考研资料站',
    targetId: '5',
    targetType: 'product',
    targetTitle: '考研必备资料套装'
  },
  {
    id: '4',
    title: '兴趣小组更新动态',
    content: '篮球爱好者联盟发布了新活动：周末篮球友谊赛，快来报名参加！',
    type: 'group',
    timestamp: '2天前',
    read: true,
    avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/avatar4.png',
    userName: '篮球爱好者联盟',
    targetId: '1',
    targetType: 'group',
    targetTitle: '篮球爱好者联盟'
  },
  {
    id: '5',
    title: '系统通知',
    content: '平台将于本周日凌晨2点进行系统维护，预计持续2小时。',
    type: 'system',
    timestamp: '3天前',
    read: true,
    avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/system.png'
  },
  {
    id: '6',
    title: '获得了新的关注',
    content: '摄影爱好者关注了你的账号，现在你可以查看他的动态了。',
    type: 'follow',
    timestamp: '5天前',
    read: true,
    avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/avatar5.png',
    userName: '摄影爱好者'
  },
  {
    id: '7',
    title: '内容获得点赞',
    content: '你的帖子"校园春色摄影作品分享"获得了15个赞',
    type: 'like',
    timestamp: '1周前',
    read: true,
    avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/avatar6.png'
  }
];

const typeColors: Record<string, string> = {
  system: 'bg-gray-500',
  activity: 'bg-blue-500',
  community: 'bg-green-500',
  trade: 'bg-orange-500',
  group: 'bg-purple-500',
  comment: 'bg-blue-400',
  like: 'bg-red-500',
  follow: 'bg-yellow-500'
};

const typeIcons: Record<string, React.ReactNode> = {
  system: <Info className="w-4 h-4" />,
  activity: <Clock className="w-4 h-4" />,
  community: <MessageSquare className="w-4 h-4" />,
  trade: <ShoppingBag className="w-4 h-4" />,
  group: <Users className="w-4 h-4" />,
  comment: <MessageSquare className="w-4 h-4" />,
  like: <Heart className="w-4 h-4" />,
  follow: <UserPlus className="w-4 h-4" />
};

const typeLabels: Record<string, string> = {
  system: '系统',
  activity: '活动',
  community: '社区',
  trade: '二手',
  group: '小组',
  comment: '评论',
  like: '点赞',
  follow: '关注'
};

export default function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const { showContentDetailPage, showInterestGroupDetailPage, showProductDetailPage, showActivityDetailPage } = useNavigation();

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    if (isOpen) {
      // 打开通知中心时，可以将所有通知标记为已读
      // setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    }
  }, [isOpen]);

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleClearNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleNotificationClick = (notification: Notification) => {
    // 标记为已读
    handleMarkAsRead(notification.id);

    // 根据通知类型跳转到相应页面
    if (notification.actionUrl) {
      alert(`跳转到：${notification.actionUrl}`);
      return;
    }

    switch (notification.targetType) {
      case 'activity':
        if (notification.targetId) {
          showActivityDetailPage(notification.targetId);
        }
        break;
      case 'post':
        if (notification.targetId) {
          showContentDetailPage(notification.targetId);
        }
        break;
      case 'product':
        if (notification.targetId) {
          showProductDetailPage(notification.targetId);
        }
        break;
      case 'group':
        if (notification.targetId) {
          showInterestGroupDetailPage(notification.targetId);
        }
        break;
      default:
        break;
    }
  };

  const filteredNotifications = activeFilter === 'all'
    ? notifications
    : notifications.filter(n => n.type === activeFilter);

  const handleNotificationAction = (action: string, notification?: Notification) => {
    switch (action) {
      case 'read':
        if (notification) {
          handleMarkAsRead(notification.id);
        }
        break;
      case 'unread':
        if (notification) {
          setNotifications(prev =>
            prev.map(n =>
              n.id === notification.id ? { ...n, read: false } : n
            )
          );
        }
        break;
      case 'delete':
        if (notification) {
          handleClearNotification(notification.id);
        }
        break;
      default:
        break;
    }
  };

  const formatTime = (timestamp: string) => {
    // 由于mock数据中已经是相对时间字符串，直接返回
    // 在实际应用中，这里应该处理ISO格式的时间戳
    return timestamp;
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* 背景遮罩 */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* 通知面板 */}
      <div className="absolute top-16 right-4 w-96 max-h-[80vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
        {/* 标题栏 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">通知中心</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 工具栏 */}
        <div className="flex items-center justify-between p-3 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="text-sm text-gray-700 bg-transparent border-none focus:outline-none"
            >
              <option value="all">全部通知</option>
              <option value="system">系统通知</option>
              <option value="activity">活动通知</option>
              <option value="community">社区动态</option>
              <option value="trade">二手交易</option>
              <option value="group">兴趣小组</option>
              <option value="comment">评论回复</option>
              <option value="like">点赞互动</option>
              <option value="follow">新增关注</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-xs text-primary hover:text-primary/80 transition-colors"
              >
                全部已读
              </button>
            )}
            <button
              onClick={handleClearAll}
              className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
            >
              清空全部
            </button>
          </div>
        </div>

        {/* 通知列表 */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(80vh - 200px)' }}>
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>暂无{activeFilter === 'all' ? '' : typeLabels[activeFilter]}通知</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start space-x-3 p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="relative">
                    {notification.avatar ? (
                      <img
                        src={notification.avatar}
                        alt={notification.userName || '用户'}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/api/searchImage?query=' + encodeURIComponent(notification.userName || 'user') + '&width=40&height=40';
                        }}
                      />
                    ) : (
                      <div className={`w-10 h-10 rounded-full ${typeColors[notification.type]} flex items-center justify-center`}>
                        {typeIcons[notification.type]}
                      </div>
                    )}
                    {!notification.read && (
                      <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        {notification.type && (
                          <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-xs ${typeColors[notification.type]} text-white`}>
                            {typeIcons[notification.type]}
                            <span>{typeLabels[notification.type]}</span>
                          </span>
                        )}
                        {notification.userName && (
                          <span className="text-sm font-medium text-gray-800">
                            {notification.userName}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatTime(notification.timestamp)}
                      </span>
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">
                      {notification.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {notification.content}
                    </p>
                    {notification.targetTitle && (
                      <div className="mt-2 text-xs text-gray-500">
                        相关：{notification.targetTitle}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 底部操作栏 */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">共 {notifications.length} 条通知</span>
              {unreadCount > 0 && (
                <span className="text-primary font-medium">{unreadCount} 条未读</span>
              )}
            </div>
            <button className="text-gray-500 hover:text-gray-700 transition-colors flex items-center space-x-1">
              <Settings className="w-4 h-4" />
              <span>通知设置</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}