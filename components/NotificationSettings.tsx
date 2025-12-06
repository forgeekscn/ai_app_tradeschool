'use client';

import { useState } from 'react';
import {
  X,
  Bell,
  Volume2,
  VolumeX,
  Moon,
  Sun,
  Mail,
  MessageSquare,
  ShoppingBag,
  Users,
  Heart,
  UserPlus,
  Info,
  Check,
  ChevronRight,
  Clock
} from 'lucide-react';

interface NotificationSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sound: boolean;
  types: {
    system: boolean;
    activity: boolean;
    community: boolean;
    trade: boolean;
    group: boolean;
    comment: boolean;
    like: boolean;
    follow: boolean;
  };
  frequency: 'realtime' | 'hourly' | 'daily' | 'weekly';
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

export default function NotificationSettings({ isOpen, onClose }: NotificationSettingsProps) {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email: true,
    push: true,
    sound: true,
    types: {
      system: true,
      activity: true,
      community: true,
      trade: true,
      group: true,
      comment: true,
      like: false,
      follow: true
    },
    frequency: 'realtime',
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '08:00'
    }
  });

  const updatePreference = (key: keyof NotificationPreferences, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [key]: typeof value === 'object' && key in prev && typeof prev[key] === 'object' ? { ...prev[key] as any, ...value } : value
    }));
  };

  const updateTypeSetting = (type: keyof NotificationPreferences['types']) => {
    updatePreference('types', {
      ...preferences.types,
      [type]: !preferences.types[type]
    });
  };

  const saveSettings = () => {
    // 这里可以保存到本地存储或发送到后端
    localStorage.setItem('notificationPreferences', JSON.stringify(preferences));
    alert('通知设置已保存！');
    onClose();
  };

  const typeConfig = [
    { key: 'system', icon: Info, label: '系统通知', desc: '系统维护、更新等重要信息' },
    { key: 'activity', icon: Clock, label: '活动通知', desc: '活动开始、报名提醒等' },
    { key: 'community', icon: MessageSquare, label: '社区动态', desc: '内容发布、评论回复等' },
    { key: 'trade', icon: ShoppingBag, label: '二手交易', desc: '商品上架、价格变动等' },
    { key: 'group', icon: Users, label: '兴趣小组', desc: '小组活动、成员邀请等' },
    { key: 'comment', icon: MessageSquare, label: '评论回复', desc: '有人回复你的评论' },
    { key: 'like', icon: Heart, label: '点赞互动', desc: '内容或评论获得点赞' },
    { key: 'follow', icon: UserPlus, label: '新增关注', desc: '有人关注你的账号' }
  ];

  const frequencyOptions = [
    { value: 'realtime', label: '实时', desc: '立即收到通知' },
    { value: 'hourly', label: '每小时', desc: '每小时汇总通知' },
    { value: 'daily', label: '每天', desc: '每天晚上9点汇总' },
    { value: 'weekly', label: '每周', desc: '每周日晚上汇总' }
  ];

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

      {/* 设置面板 */}
      <div className="absolute top-16 right-4 w-96 bg-white rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
        {/* 标题栏 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">通知设置</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 设置内容 */}
        <div className="p-4 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* 通知方式 */}
          <div>
            <h3 className="text-sm font-medium text-gray-800 mb-3 flex items-center">
              <Bell className="w-4 h-4 mr-2" />
              通知方式
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">邮件通知</span>
                </div>
                <button
                  onClick={() => updatePreference('email', !preferences.email)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    preferences.email ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      preferences.email ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">推送通知</span>
                </div>
                <button
                  onClick={() => updatePreference('push', !preferences.push)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    preferences.push ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      preferences.push ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Volume2 className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">声音提醒</span>
                </div>
                <button
                  onClick={() => updatePreference('sound', !preferences.sound)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    preferences.sound ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      preferences.sound ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* 通知类型 */}
          <div>
            <h3 className="text-sm font-medium text-gray-800 mb-3">通知类型</h3>
            <div className="space-y-2">
              {typeConfig.map((type) => (
                <div key={type.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full ${typeColors[type.key]} flex items-center justify-center text-white`}>
                      <type.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{type.label}</p>
                      <p className="text-xs text-gray-500">{type.desc}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => updateTypeSetting(type.key as keyof NotificationPreferences['types'])}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      preferences.types[type.key as keyof NotificationPreferences['types']] ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        preferences.types[type.key as keyof NotificationPreferences['types']] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 通知频率 */}
          <div>
            <h3 className="text-sm font-medium text-gray-800 mb-3 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              通知频率
            </h3>
            <div className="space-y-2">
              {frequencyOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updatePreference('frequency', option.value)}
                  className={`w-full text-left p-3 rounded-lg border ${
                    preferences.frequency === option.value
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-gray-200 hover:border-gray-300'
                  } transition-colors`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-800">{option.label}</div>
                    {preferences.frequency === option.value && (
                      <Check className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{option.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* 免打扰模式 */}
          <div>
            <h3 className="text-sm font-medium text-gray-800 mb-3 flex items-center">
              <Moon className="w-4 h-4 mr-2" />
              免打扰模式
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">启用免打扰</p>
                  <p className="text-xs text-gray-500">在指定时间段内不显示通知</p>
                </div>
                <button
                  onClick={() => updatePreference('quietHours', {
                    ...preferences.quietHours,
                    enabled: !preferences.quietHours.enabled
                  })}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    preferences.quietHours.enabled ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      preferences.quietHours.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              {preferences.quietHours.enabled && (
                <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <input
                    type="time"
                    value={preferences.quietHours.start}
                    onChange={(e) => updatePreference('quietHours', {
                      ...preferences.quietHours,
                      start: e.target.value
                    })}
                    className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-primary"
                  />
                  <span className="text-sm text-gray-600">至</span>
                  <input
                    type="time"
                    value={preferences.quietHours.end}
                    onChange={(e) => updatePreference('quietHours', {
                      ...preferences.quietHours,
                      end: e.target.value
                    })}
                    className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-primary"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            取消
          </button>
          <button
            onClick={saveSettings}
            className="flex-1 py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            保存设置
          </button>
        </div>
      </div>
    </div>
  );
}

// 类型颜色映射
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