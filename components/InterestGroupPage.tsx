'use client';

import { useState } from 'react';
import { Search, Plus, Users, Calendar, MessageSquare } from 'lucide-react';
import InterestGroupCard from '@/components/InterestGroupCard';
import CreateModal from '@/components/CreateModal';
import { InterestGroup } from '@/types';

const mockGroups: InterestGroup[] = [
  {
    id: '1',
    name: '编程爱好者',
    category: '学习类',
    memberCount: 128,
    image: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/037ee62b415c873e7aa56d79a4ab4601.png',
    isJoined: false
  },
  {
    id: '2',
    name: '校园篮球队',
    category: '运动类',
    memberCount: 86,
    image: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/1326b672ece1b8bf4f07070dcc16eedf.png',
    isJoined: false
  },
  {
    id: '3',
    name: '光影摄影社',
    category: '艺术类',
    memberCount: 64,
    image: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/6973e873b5dcf0c293cbf91c1250fb92.png',
    isJoined: true
  },
  {
    id: '4',
    name: '电影爱好者',
    category: '娱乐类',
    memberCount: 92,
    image: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/2836ffe5cc6be259b773876967b0bcc1.png',
    isJoined: false
  },
  {
    id: '5',
    name: '英语角',
    category: '学习类',
    memberCount: 75,
    image: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/b44e4586753b70a79fced67bfedc7a08.png',
    isJoined: false
  },
  {
    id: '6',
    name: '吉他社',
    category: '艺术类',
    memberCount: 45,
    image: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/2836ffe5cc6be259b773876967b0bcc1.png',
    isJoined: false
  },
  {
    id: '7',
    name: '跑步俱乐部',
    category: '运动类',
    memberCount: 103,
    image: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/1326b672ece1b8bf4f07070dcc16eedf.png',
    isJoined: true
  },
  {
    id: '8',
    name: '考研交流群',
    category: '学习类',
    memberCount: 256,
    image: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/b44e4586753b70a79fced67bfedc7a08.png',
    isJoined: false
  }
];

const categories = [
  { id: 'all', name: '全部' },
  { id: 'study', name: '学习类' },
  { id: 'sports', name: '运动类' },
  { id: 'arts', name: '艺术类' },
  { id: 'entertainment', name: '娱乐类' }
];

export default function InterestGroupPage() {
  const [groups, setGroups] = useState<InterestGroup[]>(mockGroups);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('discover');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreateGroup = (groupData: any) => {
    const newGroup: InterestGroup = {
      id: Date.now().toString(),
      name: groupData.name,
      category: groupData.category,
      memberCount: 1,
      image: groupData.images?.[0] ? URL.createObjectURL(groupData.images[0]) : 'https://design.gemcoder.com/staticResource/echoAiSystemImages/group-placeholder.png',
      isJoined: true
    };

    setGroups(prev => [newGroup, ...prev]);
    alert('小组创建成功！');
  };

  const handleJoinGroup = (groupId: string) => {
    setGroups(prevGroups =>
      prevGroups.map(group =>
        group.id === groupId
          ? { ...group, isJoined: !group.isJoined, memberCount: group.isJoined ? group.memberCount - 1 : group.memberCount + 1 }
          : group
      )
    );
  };

  const filteredGroups = groups.filter(group => {
    const matchesCategory = selectedCategory === 'all' ||
      (selectedCategory === 'study' && group.category === '学习类') ||
      (selectedCategory === 'sports' && group.category === '运动类') ||
      (selectedCategory === 'arts' && group.category === '艺术类') ||
      (selectedCategory === 'entertainment' && group.category === '娱乐类');

    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const myGroups = groups.filter(group => group.isJoined);

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      <div className="container mx-auto px-4 py-4 space-y-4">
        {/* 搜索框 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="搜索兴趣小组..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 pl-10 pr-4 rounded-full bg-gray-100 focus:outline-none focus:search-focus transition-all duration-200 text-sm"
          />
        </div>

        {/* Tab切换 */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('discover')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'discover'
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            发现小组
          </button>
          <button
            onClick={() => setActiveTab('my')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'my'
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            我的小组
          </button>
        </div>

        {activeTab === 'discover' && (
          <>
            {/* 分类筛选 */}
            <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* 小组列表 */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-800">推荐小组</h3>
              <div className="grid grid-cols-2 gap-4">
                {filteredGroups.map((group) => (
                  <InterestGroupCard
                    key={group.id}
                    group={group}
                    onJoinGroup={handleJoinGroup}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'my' && (
          <div className="space-y-4">
            {myGroups.length > 0 ? (
              <>
                <h3 className="font-medium text-gray-800">我的小组</h3>
                <div className="space-y-4">
                  {myGroups.map((group) => (
                    <div key={group.id} className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="flex items-center space-x-3">
                        <img
                          src={group.image}
                          alt={group.name}
                          className="w-16 h-16 rounded-lg object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/api/searchImage?query=' + encodeURIComponent(group.name) + ' group&width=64&height=64';
                          }}
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{group.name}</h4>
                          <p className="text-sm text-gray-500">{group.category} · {group.memberCount}人</p>
                        </div>
                        <button
                          onClick={() => handleJoinGroup(group.id)}
                          className="px-4 py-2 text-sm bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors"
                        >
                          退出小组
                        </button>
                      </div>
                      <div className="flex items-center space-x-6 mt-3 pt-3 border-t border-gray-100">
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-primary">
                          <MessageSquare className="w-4 h-4" />
                          <span className="text-sm">消息</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-primary">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">活动</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-primary">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">成员</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">你还没有加入任何小组</p>
                <button className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
                  发现小组
                </button>
              </div>
            )}
          </div>
        )}

        {/* 创建小组按钮 */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="fixed bottom-24 right-4 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors z-20"
        >
          <Plus className="w-6 h-6" />
        </button>

        {/* 创建模态框 */}
        <CreateModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          type="group"
          onSubmit={handleCreateGroup}
        />
      </div>
    </div>
  );
}