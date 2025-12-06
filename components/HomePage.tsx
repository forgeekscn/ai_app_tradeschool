'use client';

import { useState } from 'react';
import Carousel from '@/components/Carousel';
import QuickEntry from '@/components/QuickEntry';
import CommunityPostCard from '@/components/CommunityPostCard';
import InterestGroupCard from '@/components/InterestGroupCard';
import ProductCard from '@/components/ProductCard';
import { CarouselItem, CommunityPost, InterestGroup, Product } from '@/types';
import { ChevronRight } from 'lucide-react';
import { useNavigation } from '@/lib/NavigationContext';

// 模拟数据
const carouselData: CarouselItem[] = [
  {
    id: '1',
    title: '校园歌手大赛',
    subtitle: '5月20日 大礼堂 不见不散',
    image: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/4ec7df524985d8bd3bc286a0826c154b.png'
  },
  {
    id: '2',
    title: '图书馆新书推荐',
    subtitle: '考研必备资料已上架',
    image: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/33c70e9ed532cc0fc68240e886002862.png'
  },
  {
    id: '3',
    title: '春季校运会',
    subtitle: '4月15日 田径场 期待你的参与',
    image: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/968274127b4a91ba6a1076009516f85b.png'
  }
];

const communityPosts: CommunityPost[] = [
  {
    id: '1',
    author: {
      name: '学习小达人',
      avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/ee5f3265750f957acc83c020678f3b7c.png'
    },
    title: '考研英语复习经验分享',
    content: '分享一下我的考研英语复习方法，重点是真题的利用和单词的积累，希望对大家有帮助...',
    images: [
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/3b49b230431b77862de6137a55c16f1b.png',
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/3de86f974857c08aa1f72957ebb073e7.png',
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/2c6dea6bf2c697c05a73d07bc51416ad.png'
    ],
    likes: 128,
    comments: 36,
    shares: 12,
    views: 1250,
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
    content: '发现学校西门新开的一家麻辣烫，味道正宗，价格实惠，推荐给大家...',
    images: [
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/2d772f18df0622879c6e8f4b52758ff6.png',
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/0fe7839209d8696e0b104d6605e79aa3.png',
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/e7dea7dbbc809607e265c7e5cd8da61f.png'
    ],
    likes: 256,
    comments: 89,
    shares: 45,
    views: 3200,
    category: '生活感悟',
    timestamp: '昨天 18:30'
  }
];

const interestGroups: InterestGroup[] = [
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
  }
];

const products: Product[] = [
  {
    id: '1',
    title: '高等数学（第七版）上下册',
    price: 35,
    condition: '99新',
    category: '教材',
    categoryColor: 'bg-red-500',
    image: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/a47adfb1154e237b5e996d4d29ef1206.png'
  },
  {
    id: '2',
    title: '联想小新Pro14 2022款',
    price: 3200,
    condition: '95新',
    category: '电子产品',
    categoryColor: 'bg-blue-500',
    image: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/dd6f10550dd54b89a2b5e1752b5eca8d.png'
  },
  {
    id: '3',
    title: 'Nike篮球鞋 44码',
    price: 280,
    condition: '9新',
    category: '服装',
    categoryColor: 'bg-green-500',
    image: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/433c181a83f5e27bbb82449f76374965.png'
  },
  {
    id: '4',
    title: '小米电水壶 1.7L',
    price: 45,
    condition: '99新',
    category: '生活用品',
    categoryColor: 'bg-yellow-500',
    image: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/d7fce5cd87b753e51152f76d7750c85c.png'
  }
];

export default function HomePage() {
  const [groups, setGroups] = useState<InterestGroup[]>(interestGroups);
  const { setActiveTab, showActivityDetailPage } = useNavigation();

  const handleJoinGroup = (groupId: string) => {
    setGroups(prevGroups =>
      prevGroups.map(group =>
        group.id === groupId
          ? { ...group, isJoined: !group.isJoined, memberCount: group.isJoined ? group.memberCount - 1 : group.memberCount + 1 }
          : group
      )
    );
  };

  const handleCarouselClick = (item: CarouselItem) => {
    // 轮播图点击事件 - 跳转到对应的活动详情
    showActivityDetailPage(item.id);
  };

  const handleMoreClick = (section: string) => {
    switch (section) {
      case 'community':
        setActiveTab('contentCommunity');
        break;
      case 'groups':
        setActiveTab('interestGroup');
        break;
      case 'products':
        setActiveTab('secondHandTrade');
        break;
      default:
        break;
    }
  };

  const handlePostLike = (postId: string) => {
    // 首页内容点赞功能
    console.log(`点赞内容：${postId}`);
  };

  const handlePostComment = (postId: string) => {
    // 首页内容评论功能
    alert(`评论内容：${postId}\n（后续将实现评论功能）`);
  };

  const handlePostShare = (post: CommunityPost) => {
    // 首页内容分享功能
    alert(`分享内容：${post.title}\n（后续将实现分享功能）`);
  };

  const handleProductFavorite = (productId: string) => {
    // 首页商品收藏功能
    console.log(`收藏商品：${productId}`);
  };

  const handleProductShare = (product: Product) => {
    // 首页商品分享功能
    alert(`分享商品：${product.title}\n价格：¥${product.price}\n（后续将实现分享功能）`);
  };

  return (
    <div className="container mx-auto px-4 py-4 space-y-6">
      {/* 轮播图 */}
      <Carousel items={carouselData} onSlideClick={handleCarouselClick} />

      {/* 快捷入口 */}
      <QuickEntry />

      {/* 内容社区精选 */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">内容社区精选</h2>
          <button
            onClick={() => handleMoreClick('community')}
            className="text-primary text-sm flex items-center hover:opacity-80 transition-opacity"
          >
            更多
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="space-y-4">
          {communityPosts.map((post) => (
            <CommunityPostCard
              key={post.id}
              post={post}
              onLike={handlePostLike}
              onComment={handlePostComment}
              onShare={handlePostShare}
            />
          ))}
        </div>
      </section>

      {/* 兴趣小组推荐 */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">兴趣小组推荐</h2>
          <button
            onClick={() => handleMoreClick('groups')}
            className="text-primary text-sm flex items-center hover:opacity-80 transition-opacity"
          >
            更多
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="overflow-x-auto scrollbar-hide pb-2">
          <div className="flex space-x-4 min-w-max">
            {groups.map((group) => (
              <InterestGroupCard
                key={group.id}
                group={group}
                onJoinGroup={handleJoinGroup}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 二手交易热门商品 */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">二手交易热门</h2>
          <button
            onClick={() => handleMoreClick('products')}
            className="text-primary text-sm flex items-center hover:opacity-80 transition-opacity"
          >
            更多
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onFavorite={handleProductFavorite}
              onShare={handleProductShare}
            />
          ))}
        </div>
      </section>
    </div>
  );
}