'use client';

import { ShoppingBag, Users, MessageSquare, Calendar } from 'lucide-react';
import { QuickEntry } from '@/types';
import { useNavigation } from '@/lib/NavigationContext';

const quickEntries: QuickEntry[] = [
  { id: 'second-hand', title: '二手交易', icon: 'ShoppingBag', color: 'text-primary', bgColor: 'bg-blue-100' },
  { id: 'interest-groups', title: '兴趣小组', icon: 'Users', color: 'text-secondary', bgColor: 'bg-green-100' },
  { id: 'community', title: '内容社区', icon: 'MessageSquare', color: 'text-accent', bgColor: 'bg-yellow-100' },
  { id: 'activities', title: '校园活动', icon: 'Calendar', color: 'text-purple-500', bgColor: 'bg-purple-100' },
];

export default function QuickEntryGrid() {
  const { setActiveTab } = useNavigation();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShoppingBag':
        return <ShoppingBag className="text-xl" />;
      case 'Users':
        return <Users className="text-xl" />;
      case 'MessageSquare':
        return <MessageSquare className="text-xl" />;
      case 'Calendar':
        return <Calendar className="text-xl" />;
      default:
        return <ShoppingBag className="text-xl" />;
    }
  };

  const handleEntryClick = (entryId: string) => {
    switch (entryId) {
      case 'second-hand':
        setActiveTab('secondHandTrade');
        break;
      case 'interest-groups':
        setActiveTab('interestGroup');
        break;
      case 'community':
        setActiveTab('contentCommunity');
        break;
      case 'activities':
        // 暂时显示提示，后续可以跳转到活动页面
        alert('校园活动功能开发中，敬请期待！');
        break;
      default:
        break;
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {quickEntries.map((entry) => (
        <button
          key={entry.id}
          onClick={() => handleEntryClick(entry.id)}
          className="flex flex-col items-center p-3 bg-white rounded-xl shadow-sm card-hover hover:scale-105 transition-transform duration-200"
        >
          <div className={`w-12 h-12 rounded-full ${entry.bgColor} flex items-center justify-center ${entry.color} mb-2`}>
            {getIcon(entry.icon)}
          </div>
          <span className="text-sm text-gray-700">{entry.title}</span>
        </button>
      ))}
    </div>
  );
}