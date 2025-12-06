'use client';

import { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import CreateModal from '@/components/CreateModal';
import { Product } from '@/types';

const mockProducts: Product[] = [
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
  },
  {
    id: '5',
    title: '考研英语词汇书',
    price: 25,
    condition: '9新',
    category: '教材',
    categoryColor: 'bg-red-500',
    image: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/a47adfb1154e237b5e996d4d29ef1206.png'
  },
  {
    id: '6',
    title: '蓝牙耳机 白色',
    price: 120,
    condition: '95新',
    category: '电子产品',
    categoryColor: 'bg-blue-500',
    image: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/dd6f10550dd54b89a2b5e1752b5eca8d.png'
  }
];

const categories = [
  { id: 'all', name: '全部', color: 'bg-gray-500' },
  { id: 'textbook', name: '教材', color: 'bg-red-500' },
  { id: 'electronics', name: '电子产品', color: 'bg-blue-500' },
  { id: 'clothing', name: '服装', color: 'bg-green-500' },
  { id: 'daily', name: '生活用品', color: 'bg-yellow-500' }
];

export default function SecondHandTradePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('time');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [products, setProducts] = useState<Product[]>(mockProducts);

  const handleCreateProduct = (productData: any) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      title: productData.title,
      price: productData.price,
      condition: productData.condition,
      category: productData.category,
      categoryColor: getCategoryColor(productData.category),
      image: productData.images?.[0] ? URL.createObjectURL(productData.images[0]) : 'https://design.gemcoder.com/staticResource/echoAiSystemImages/placeholder.png'
    };

    setProducts(prev => [newProduct, ...prev]);
    alert('商品发布成功！');
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case '教材': return 'bg-red-500';
      case '电子产品': return 'bg-blue-500';
      case '服装': return 'bg-green-500';
      case '生活用品': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      <div className="container mx-auto px-4 py-4 space-y-4">
        {/* 搜索和筛选栏 */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="搜索商品..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 pl-10 pr-4 rounded-full bg-gray-100 focus:outline-none focus:search-focus transition-all duration-200 text-sm"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? `${category.color} text-white`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <button className="flex items-center space-x-1 text-gray-600 hover:text-primary">
              <Filter className="w-4 h-4" />
              <span className="text-sm">筛选</span>
            </button>
          </div>
        </div>

        {/* 商品网格 */}
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onFavorite={(productId) => console.log(`收藏商品：${productId}`)}
              onShare={(product) => alert(`分享商品：${product.title}\n价格：¥${product.price}\n（后续将实现分享功能）`)}
            />
          ))}
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
          type="product"
          onSubmit={handleCreateProduct}
        />

        {/* 加载更多 */}
        <div className="text-center py-4">
          <button className="text-primary text-sm hover:opacity-80 transition-opacity">
            加载更多商品
          </button>
        </div>
      </div>
    </div>
  );
}