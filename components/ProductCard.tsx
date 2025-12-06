'use client';

import { Heart, Share2 } from 'lucide-react';
import { Product } from '@/types';
import { useState } from 'react';
import { useNavigation } from '@/lib/NavigationContext';

interface ProductCardProps {
  product: Product;
  onFavorite?: (productId: string) => void;
  onShare?: (product: Product) => void;
}

export default function ProductCard({ product, onFavorite, onShare }: ProductCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const { showProductDetailPage } = useNavigation();

  const handleCardClick = () => {
    // 跳转到商品详情页
    showProductDetailPage(product.id);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavoritedState = !isFavorited;
    setIsFavorited(newFavoritedState);
    onFavorite?.(product.id);
    alert(newFavoritedState ? `已收藏：${product.title}` : `已取消收藏：${product.title}`);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare?.(product);
  };
  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-sm card-hover cursor-pointer group"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/api/searchImage?query=' + encodeURIComponent(product.title) + '&width=200&height=160';
          }}
        />
        <span className={`absolute top-2 left-2 ${product.categoryColor} text-white text-xs px-2 py-1 rounded-full`}>
          {product.category}
        </span>

        {/* 快捷操作按钮 */}
        <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleFavorite}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isFavorited
                ? 'bg-red-500 text-white'
                : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            className="w-8 h-8 rounded-full bg-white/80 text-gray-600 hover:bg-white hover:text-primary transition-colors flex items-center justify-center"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* 查看详情提示 */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white text-gray-800 px-3 py-1.5 rounded-full text-sm font-medium">
            查看详情
          </div>
        </div>
      </div>

      <div className="p-3">
        <h3 className="font-medium text-gray-800 text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-primary font-bold text-lg">¥{product.price}</span>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{product.condition}</span>
        </div>
        <div className="mt-2 text-xs text-gray-400">
          点击查看详情
        </div>
      </div>
    </div>
  );
}