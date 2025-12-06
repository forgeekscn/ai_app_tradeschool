'use client';

import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Heart,
  Share2,
  MessageCircle,
  MapPin,
  Clock,
  User,
  Star,
  Shield,
  Package,
  Camera
} from 'lucide-react';
import { Product } from '@/types';

interface ProductDetailPageProps {
  productId: string;
  onBack: () => void;
}

// 模拟商品详情数据
const mockProductDetails: Record<string, Product> = {
  '1': {
    id: '1',
    title: '高等数学（第七版）上下册',
    price: 35,
    condition: '99新',
    category: '教材',
    categoryColor: 'bg-red-500',
    image: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/a47adfb1154e237b5e996d4d29ef1206.png',
    images: [
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/a47adfb1154e237b5e996d4d29ef1206.png',
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/dd6f10550dd54b89a2b5e1752b5eca8d.png'
    ],
    description: '同济大学版高等数学第七版上下册，全新正版教材，仅翻阅过几次，无笔记无划痕，适合大一新生使用。原价68元，现价35元转让。包含配套习题解析，可以帮助学习。',
    seller: {
      id: 'seller1',
      name: '张同学',
      avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/avatar1.png',
      rating: 4.8,
      school: '清华大学'
    },
    location: '紫荆学生公寓',
    publishTime: '2小时前',
    viewCount: 156,
    favoriteCount: 23,
    status: 'available'
  },
  '2': {
    id: '2',
    title: '联想小新Pro14 2022款',
    price: 3200,
    condition: '95新',
    category: '电子产品',
    categoryColor: 'bg-blue-500',
    image: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/dd6f10550dd54b89a2b5e1752b5eca8d.png',
    images: [
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/dd6f10550dd54b89a2b5e1752b5eca8d.png',
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/433c181a83f5e27bbb82449f76374965.png'
    ],
    description: '联想小新Pro14，2022年购买，i5-1240P处理器，16GB内存，512GB固态硬盘，14英寸2.8K分辨率屏幕，重量轻，性能好。购买后主要用于学习，无游戏使用，成色很新。原价4999元，现价3200元转让。',
    seller: {
      id: 'seller2',
      name: '李同学',
      avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/avatar2.png',
      rating: 4.9,
      school: '北京大学'
    },
    location: '理科一号楼',
    publishTime: '1天前',
    viewCount: 289,
    favoriteCount: 45,
    status: 'available'
  },
  '3': {
    id: '3',
    title: 'Nike篮球鞋 44码',
    price: 280,
    condition: '9新',
    category: '服装',
    categoryColor: 'bg-green-500',
    image: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/433c181a83f5e27bbb82449f76374965.png',
    images: [
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/433c181a83f5e27bbb82449f76374965.png',
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/d7fce5cd87b753e51152f76d7750c85c.png'
    ],
    description: 'Nike Air Max篮球鞋，44码，仅穿过几次，鞋底磨损很少。透气性好，适合篮球运动和日常穿着。购买时599元，现价280元转让。鞋盒齐全，包装完好。',
    seller: {
      id: 'seller3',
      name: '王同学',
      avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/avatar3.png',
      rating: 4.7,
      school: '北京体育大学'
    },
    location: '体育馆附近',
    publishTime: '3小时前',
    viewCount: 98,
    favoriteCount: 15,
    status: 'available'
  },
  '4': {
    id: '4',
    title: '小米电水壶 1.7L',
    price: 45,
    condition: '99新',
    category: '生活用品',
    categoryColor: 'bg-yellow-500',
    image: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/d7fce5cd87b753e51152f76d7750c85c.png',
    images: [
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/d7fce5cd87b753e51152f76d7750c85c.png'
    ],
    description: '小米智能电水壶，1.7L大容量，304不锈钢内胆，12段温度调节。购买后使用不到一个月，因毕业转让。外观全新，功能完好，包装盒说明书齐全。',
    seller: {
      id: 'seller4',
      name: '刘同学',
      avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/avatar4.png',
      rating: 4.6,
      school: '中国人民大学'
    },
    location: '知行学生公寓',
    publishTime: '5小时前',
    viewCount: 67,
    favoriteCount: 8,
    status: 'available'
  },
  '5': {
    id: '5',
    title: '考研英语词汇书',
    price: 25,
    condition: '9新',
    category: '教材',
    categoryColor: 'bg-red-500',
    image: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/a47adfb1154e237b5e996d4d29ef1206.png',
    images: [
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/a47adfb1154e237b5e996d4d29ef1206.png'
    ],
    description: '红宝书考研英语词汇，2023最新版，包含5500个核心词汇。书本有少量笔记但不影响使用，重点词汇都有标注。适合2025考研学子使用。',
    seller: {
      id: 'seller5',
      name: '陈同学',
      avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/avatar5.png',
      rating: 4.8,
      school: '复旦大学'
    },
    location: '本部图书馆',
    publishTime: '1周前',
    viewCount: 234,
    favoriteCount: 32,
    status: 'available'
  },
  '6': {
    id: '6',
    title: '蓝牙耳机 白色',
    price: 120,
    condition: '95新',
    category: '电子产品',
    categoryColor: 'bg-blue-500',
    image: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/dd6f10550dd54b89a2b5e1752b5eca8d.png',
    images: [
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/dd6f10550dd54b89a2b5e1752b5eca8d.png',
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/433c181a83f5e27bbb82449f76374965.png'
    ],
    description: '华为FreeBuds 4i蓝牙耳机，白色，主动降噪，通透模式，22小时续航。购买3个月，音质出色，降噪效果很好。因换新耳机转让，配件齐全（耳机盒、充电线、说明书）。',
    seller: {
      id: 'seller6',
      name: '赵同学',
      avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/avatar6.png',
      rating: 4.9,
      school: '上海交通大学'
    },
    location: '闵行校区',
    publishTime: '2天前',
    viewCount: 189,
    favoriteCount: 28,
    status: 'available'
  }
};

export default function ProductDetailPage({ productId, onBack }: ProductDetailPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 模拟加载商品详情
    setIsLoading(true);
    setTimeout(() => {
      const productData = mockProductDetails[productId] || {
        ...mockProductDetails['1'], // 默认使用第一个商品数据
        id: productId,
        title: '商品加载中...',
        description: '商品详细信息正在加载中...'
      };
      setProduct(productData);
      setIsLoading(false);
    }, 500);
  }, [productId]);

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    alert(isFavorited ? '已取消收藏' : '已添加到收藏');
  };

  const handleShare = () => {
    if (product) {
      alert(`分享：${product.title}\n价格：¥${product.price}\n（后续将实现分享功能）`);
    }
  };

  const handleContactSeller = () => {
    if (product) {
      alert(`联系卖家：${product.seller?.name}\n（后续将实现聊天功能）`);
    }
  };

  const handlePurchase = () => {
    if (product) {
      alert(`购买商品：${product.title}\n价格：¥${product.price}\n（后续将实现交易流程）`);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/api/searchImage?query=' + encodeURIComponent(product?.title || 'product') + '&width=400&height=300';
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center animate-fadeIn">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-500">加载中...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex-1 flex items-center justify-center animate-fadeIn">
        <div className="text-center">
          <p className="text-gray-500 mb-4">商品不存在或已下架</p>
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

  const images = product.images || [product.image];

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
          <h1 className="font-medium text-gray-800">商品详情</h1>
          <div className="flex space-x-2">
            <button
              onClick={handleFavorite}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isFavorited ? 'bg-red-50 text-red-500' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
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

      {/* 商品图片展示 */}
      <div className="relative">
        <div className="aspect-square bg-gray-50 relative overflow-hidden">
          <img
            src={images[currentImageIndex]}
            alt={product.title}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />

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

          {/* 状态标签 */}
          {product.status && product.status !== 'available' && (
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                product.status === 'sold'
                  ? 'bg-gray-500 text-white'
                  : 'bg-orange-500 text-white'
              }`}>
                {product.status === 'sold' ? '已售出' : '已预定'}
              </span>
            </div>
          )}

          {/* 分类标签 */}
          <div className="absolute top-4 right-4">
            <span className={`${product.categoryColor} text-white text-xs px-2 py-1 rounded-full`}>
              {product.category}
            </span>
          </div>
        </div>

        {/* 图片缩略图 */}
        {images.length > 1 && (
          <div className="p-4 flex space-x-2 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  index === currentImageIndex
                    ? 'border-primary scale-105 shadow-md'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/api/searchImage?query=' + encodeURIComponent(product.title) + '&width=64&height=64';
                  }}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 商品信息 */}
      <div className="p-4 space-y-4 animate-slideUp">
        {/* 标题和价格 */}
        <div className="animate-slideUp" style={{ animationDelay: '0.1s' }}>
          <h1 className="text-xl font-bold text-gray-800 mb-2">{product.title}</h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold text-primary">¥{product.price}</span>
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {product.condition}
              </span>
            </div>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{product.publishTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{product.viewCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 商品描述 */}
        {product.description && (
          <div className="bg-gray-50 rounded-xl p-4 animate-slideUp" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-medium text-gray-800 mb-2 flex items-center">
              <Package className="w-4 h-4 mr-2" />
              商品描述
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
              {product.description}
            </p>
          </div>
        )}

        {/* 交易信息 */}
        <div className="flex items-center justify-between py-3 border-b border-gray-100 animate-slideUp" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{product.location || '校内交易'}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Shield className="w-4 h-4" />
            <span>当面交易</span>
          </div>
        </div>

        {/* 卖家信息 */}
        {product.seller && (
          <div className="bg-white rounded-xl border border-gray-100 p-4 animate-slideUp" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-800 flex items-center">
                <User className="w-4 h-4 mr-2" />
                卖家信息
              </h3>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium text-gray-800">
                  {product.seller.rating}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden">
                  <img
                    src={product.seller.avatar}
                    alt={product.seller.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/api/searchImage?query=' + encodeURIComponent(product.seller?.name || 'seller') + '&width=48&height=48';
                    }}
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{product.seller.name}</p>
                  <p className="text-sm text-gray-500">{product.seller.school}</p>
                </div>
              </div>
              <button
                onClick={handleContactSeller}
                className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-colors flex items-center space-x-1"
              >
                <MessageCircle className="w-4 h-4" />
                <span>联系卖家</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 底部操作栏 */}
      <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 space-y-3 animate-slideUp" style={{ animationDelay: '0.5s' }}>
        <div className="flex items-center space-x-3 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Heart className="w-4 h-4" />
            <span>{product.favoriteCount || 0}人收藏</span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>{product.viewCount}人浏览</span>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={handleContactSeller}
            className="flex-1 py-3 border border-primary text-primary rounded-full font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>私聊</span>
          </button>
          <button
            onClick={handlePurchase}
            disabled={product.status !== 'available'}
            className={`flex-1 py-3 rounded-full font-medium transition-colors flex items-center justify-center space-x-2 ${
              product.status === 'available'
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span>我想要</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Eye 图标组件
function Eye({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}