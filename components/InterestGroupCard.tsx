'use client';

import { InterestGroup } from '@/types';
import { useNavigation } from '@/lib/NavigationContext';

interface InterestGroupCardProps {
  group: InterestGroup;
  onJoinGroup: (groupId: string) => void;
}

export default function InterestGroupCard({ group, onJoinGroup }: InterestGroupCardProps) {
  const { showInterestGroupDetailPage } = useNavigation();

  const handleCardClick = () => {
    // 跳转到兴趣小组详情页
    showInterestGroupDetailPage(group.id);
  };

  const handleJoinGroup = (e: React.MouseEvent) => {
    e.stopPropagation(); // 阻止事件冒泡
    onJoinGroup(group.id);
  };

  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-sm card-hover cursor-pointer group"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img
          src={group.image}
          alt={group.name}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/api/searchImage?query=' + encodeURIComponent(group.name) + ' group activity&width=200&height=160';
          }}
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white text-gray-800 px-3 py-1.5 rounded-full text-sm font-medium">
            查看详情
          </div>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-gray-800 text-sm mb-1 line-clamp-1 group-hover:text-primary transition-colors">
          {group.name}
        </h3>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-500">
            {group.category} · {group.memberCount}人
          </span>
        </div>
        <button
          onClick={handleJoinGroup}
          className={`w-full py-1.5 text-xs rounded-full transition-colors ${
            group.isJoined
              ? 'bg-primary text-white'
              : 'text-primary border border-primary hover:bg-primary hover:text-white'
          }`}
        >
          {group.isJoined ? '已加入' : '加入小组'}
        </button>
        <div className="mt-2 text-xs text-gray-400 text-center">
          点击查看详情
        </div>
      </div>
    </div>
  );
}