'use client';

import { useState } from 'react';
import { X, Camera, MapPin, Tag, DollarSign, Type, Users, Calendar, FileText } from 'lucide-react';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'product' | 'group' | 'post';
  onSubmit: (data: any) => void;
}

export default function CreateModal({ isOpen, onClose, type, onSubmit }: CreateModalProps) {
  const [formData, setFormData] = useState<any>({});
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, images: imageFiles });
    onClose();
    setFormData({});
    setImageFiles([]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImageFiles(prev => [...prev, ...files]);
  };

  const renderProductForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">商品标题</label>
        <div className="relative">
          <Type className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            required
            placeholder="请输入商品标题"
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">价格</label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="number"
            required
            placeholder="0.00"
            value={formData.price || ''}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">成色</label>
        <select
          required
          value={formData.condition || ''}
          onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">请选择成色</option>
          <option value="全新">全新</option>
          <option value="99新">99新</option>
          <option value="95新">95新</option>
          <option value="9新">9新</option>
          <option value="8成新">8成新</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
        <div className="relative">
          <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <select
            required
            value={formData.category || ''}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">请选择分类</option>
            <option value="教材">教材</option>
            <option value="电子产品">电子产品</option>
            <option value="服装">服装</option>
            <option value="生活用品">生活用品</option>
            <option value="其他">其他</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">商品描述</label>
        <textarea
          rows={3}
          placeholder="请描述一下你的商品..."
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">商品图片</label>
        <div className="relative">
          <Camera className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        {imageFiles.length > 0 && (
          <div className="mt-2 text-sm text-gray-500">
            已选择 {imageFiles.length} 张图片
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
      >
        发布商品
      </button>
    </form>
  );

  const renderGroupForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">小组名称</label>
        <div className="relative">
          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            required
            placeholder="请输入小组名称"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
        <div className="relative">
          <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <select
            required
            value={formData.category || ''}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">请选择分类</option>
            <option value="学习类">学习类</option>
            <option value="运动类">运动类</option>
            <option value="艺术类">艺术类</option>
            <option value="娱乐类">娱乐类</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">小组简介</label>
        <textarea
          rows={3}
          placeholder="介绍一下你的小组..."
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">小组头像</label>
        <div className="relative">
          <Camera className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        {imageFiles.length > 0 && (
          <div className="mt-2 text-sm text-gray-500">
            已选择小组头像
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
      >
        创建小组
      </button>
    </form>
  );

  const renderPostForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">标题</label>
        <div className="relative">
          <Type className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            required
            placeholder="请输入标题"
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
        <div className="relative">
          <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <select
            required
            value={formData.category || ''}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">请选择分类</option>
            <option value="学习心得">学习心得</option>
            <option value="生活感悟">生活感悟</option>
            <option value="校园求助">校园求助</option>
            <option value="经验分享">经验分享</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">内容</label>
        <textarea
          rows={5}
          required
          placeholder="分享你的想法..."
          value={formData.content || ''}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">图片</label>
        <div className="relative">
          <Camera className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        {imageFiles.length > 0 && (
          <div className="mt-2 text-sm text-gray-500">
            已选择 {imageFiles.length} 张图片
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
      >
        发布内容
      </button>
    </form>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            {type === 'product' && '发布商品'}
            {type === 'group' && '创建小组'}
            {type === 'post' && '发布内容'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          {type === 'product' && renderProductForm()}
          {type === 'group' && renderGroupForm()}
          {type === 'post' && renderPostForm()}
        </div>
      </div>
    </div>
  );
}