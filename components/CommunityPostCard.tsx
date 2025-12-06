'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { CommunityPost } from '@/types';
import { useNavigation } from '@/lib/NavigationContext';

interface CommunityPostCardProps {
  post: CommunityPost;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (post: CommunityPost) => void;
}

export default function CommunityPostCard({ post, onLike, onComment, onShare }: CommunityPostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const { showContentDetailPage } = useNavigation();

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikeCount(prev => newLikedState ? prev + 1 : prev - 1);
    onLike?.(post.id);
  };

  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation();
    onComment?.(post.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare?.(post);
  };

  const handleCardClick = () => {
    // 跳转到内容详情页
    showContentDetailPage(post.id);
  };
  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-sm card-hover cursor-pointer group"
      onClick={handleCardClick}
    >
      <div className="p-4">
        <div className="flex items-center mb-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-10 h-10 rounded-full object-cover hover:opacity-80 transition-opacity cursor-pointer"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/api/searchImage?query=' + encodeURIComponent(post.author.name + ' avatar') + '&width=40&height=40';
            }}
            onClick={(e) => {
              e.stopPropagation();
              alert(`跳转到作者主页：${post.author.name}\n（后续将实现用户主页）`);
            }}
          />
          <div className="ml-3">
            <h4
              className="font-medium text-gray-800 hover:text-primary transition-colors cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                alert(`跳转到作者主页：${post.author.name}\n（后续将实现用户主页）`);
              }}
            >
              {post.author.name}
            </h4>
            <p className="text-xs text-gray-500">{post.timestamp}</p>
          </div>
        </div>

        <h3 className="font-medium text-gray-800 mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.content}</p>

        {post.images.length > 0 && (
          <div className={`grid gap-2 mb-3 ${
            post.images.length === 1 ? 'grid-cols-1' :
            post.images.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
          }`}>
            {post.images.slice(0, 3).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${post.title} ${index + 1}`}
                className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/api/searchImage?query=' + encodeURIComponent(post.title) + '&width=120&height=80';
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  alert(`查看大图：${post.title} 图片${index + 1}\n（后续将实现图片预览功能）`);
                }}
              />
            ))}
          </div>
        )}

        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 transition-colors ${
                isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{likeCount}</span>
            </button>
            <button
              onClick={handleComment}
              className="flex items-center space-x-1 text-gray-500 hover:text-primary transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{post.comments}</span>
            </button>
            <button
              onClick={handleShare}
              className="text-gray-500 hover:text-primary transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
          <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">{post.category}</span>
        </div>

        {/* 查看详情提示 */}
        <div className="text-center text-xs text-gray-400 pt-2">
          点击查看详情
        </div>
      </div>
    </div>
  );
}