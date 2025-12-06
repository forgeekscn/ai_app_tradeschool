'use client';

import { useState } from 'react';
import { Search, Plus, Heart, MessageCircle, Share2, TrendingUp } from 'lucide-react';
import CommunityPostCard from '@/components/CommunityPostCard';
import CreateModal from '@/components/CreateModal';
import { CommunityPost } from '@/types';

const mockPosts: CommunityPost[] = [
  {
    id: '1',
    author: {
      name: '学习小达人',
      avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/ee5f3265750f957acc83c020678f3b7c.png'
    },
    title: '考研英语复习经验分享',
    content: '分享一下我的考研英语复习方法，重点是真题的利用和单词的积累，希望对大家有帮助。首先，背单词要讲究方法，不要死记硬背...',
    images: [
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/3b49b230431b77862de6137a55c16f1b.png',
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/3de86f974857c08aa1f72957ebb073e7.png',
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/2c6dea6bf2c697c05a73d07bc51416ad.png'
    ],
    likes: 128,
    comments: 36,
    shares: 15,
    views: 456,
    category: '学习心得',
    timestamp: '2小时前'
  },
  {
    id: '2',
    author: {
      name: '校园美食家',
      avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/b11608a180ab59817262646e9187ef03.png'
    },
    title: '学校周边美食探店',
    content: '发现学校西门新开的一家麻辣烫，味道正宗，价格实惠，推荐给大家。他们家的汤底很香，食材也很新鲜...',
    images: [
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/2d772f18df0622879c6e8f4b52758ff6.png',
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/0fe7839209d8696e0b104d6605e79aa3.png'
    ],
    likes: 256,
    comments: 89,
    shares: 42,
    views: 789,
    category: '生活感悟',
    timestamp: '昨天 18:30'
  },
  {
    id: '3',
    author: {
      name: '摄影爱好者',
      avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/ee5f3265750f957acc83c020678f3b7c.png'
    },
    title: '校园春色摄影作品分享',
    content: '春天来了，校园里的花开得正美。今天在校园里拍了一些照片，分享给大家。拍摄时间是下午四点左右，光线正好...',
    images: [
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/968274127b4a91ba6a1076009516f85b.png',
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/4ec7df524985d8bd3bc286a0826c154b.png',
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/33c70e9ed532cc0fc68240e886002862.png'
    ],
    likes: 189,
    comments: 45,
    shares: 67,
    views: 923,
    category: '经验分享',
    timestamp: '3天前'
  },
  {
    id: '4',
    author: {
      name: '求助小白',
      avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/b11608a180ab59817262646e9187ef03.png'
    },
    title: '求助：关于课程设计的几个问题',
    content: '最近在做一个课程设计，遇到了几个技术问题想请教一下大家。主要是关于数据库设计和前端优化的部分...',
    images: [],
    likes: 23,
    comments: 67,
    shares: 12,
    views: 345,
    category: '校园求助',
    timestamp: '5小时前'
  }
];

const categories = [
  { id: 'all', name: '全部' },
  { id: 'study', name: '学习心得' },
  { id: 'life', name: '生活感悟' },
  { id: 'help', name: '校园求助' },
  { id: 'experience', name: '经验分享' }
];

const sortOptions = [
  { id: 'time', name: '最新发布' },
  { id: 'hot', name: '最热门' },
  { id: 'like', name: '点赞最多' }
];

export default function ContentCommunityPage() {
  const [posts, setPosts] = useState<CommunityPost[]>(mockPosts);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('time');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreatePost = (postData: any) => {
    const newPost: CommunityPost = {
      id: Date.now().toString(),
      author: {
        name: '我',
        avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/default-avatar.png'
      },
      title: postData.title,
      content: postData.content,
      images: postData.images?.map((file: File) => URL.createObjectURL(file)) || [],
      likes: 0,
      comments: 0,
      shares: 0,
      views: 0,
      category: postData.category,
      timestamp: '刚刚'
    };

    setPosts(prev => [newPost, ...prev]);
    alert('内容发布成功！');
  };

  const handleLikePost = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === categories.find(c => c.id === selectedCategory)?.name;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'hot':
        return (b.likes + b.comments) - (a.likes + a.comments);
      case 'like':
        return b.likes - a.likes;
      case 'time':
      default:
        return 0; // 保持原始顺序
    }
  });

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      <div className="container mx-auto px-4 py-4 space-y-4">
        {/* 搜索框 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="搜索内容、作者或话题..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 pl-10 pr-4 rounded-full bg-gray-100 focus:outline-none focus:search-focus transition-all duration-200 text-sm"
          />
        </div>

        {/* 分类和排序 */}
        <div className="flex items-center justify-between">
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

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm text-gray-600 bg-gray-100 border-0 rounded-full px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            {sortOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        {/* 热门话题 */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-3">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="font-medium text-gray-800">热门话题</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {['#考研经验', '#校园美食', '#课程设计', '#摄影技巧', '#英语学习'].map((topic) => (
              <button
                key={topic}
                className="px-3 py-1 bg-white/70 text-primary text-sm rounded-full hover:bg-white transition-colors"
                onClick={() => setSearchQuery(topic)}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* 内容列表 */}
        <div className="space-y-4">
          {sortedPosts.map((post) => (
            <CommunityPostCard
              key={post.id}
              post={post}
              onLike={handleLikePost}
              onComment={(postId) => alert(`跳转到评论页面：${postId}\n（后续将实现评论功能）`)}
              onShare={(post) => alert(`分享内容：${post.title}\n（后续将实现分享功能）`)}
            />
          ))}
        </div>

        {/* 加载更多 */}
        <div className="text-center py-4">
          <button className="text-primary text-sm hover:opacity-80 transition-opacity">
            加载更多内容
          </button>
        </div>

        {/* 发布按钮 */}
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
          type="post"
          onSubmit={handleCreatePost}
        />
      </div>
    </div>
  );
}