'use client';

import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  User,
  Clock,
  Eye,
  MoreHorizontal,
  Send,
  Camera,
  MapPin,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { CommunityPost, Comment } from '@/types';

interface ContentCommunityDetailPageProps {
  postId: string;
  onBack: () => void;
}

// 模拟内容社区详情数据
const mockPostDetails: Record<string, CommunityPost> = {
  '1': {
    id: '1',
    author: {
      name: '张小明',
      avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/avatar1.png',
      school: '清华大学',
      major: '计算机科学与技术'
    },
    title: '分享我的高效学习方法：番茄工作法',
    content: '大家好！今天想和大家分享一个改变我学习效率的方法——番茄工作法。这个方法让我从一个拖延症患者变成了高效学习者，希望能帮助到有需要的朋友！',
    detailedContent: `大家好！今天想和大家分享一个改变我学习效率的方法——番茄工作法。

## 什么是番茄工作法？

番茄工作法是一种时间管理方法，由弗朗西斯科·西里洛在1980年代末创立。使用番茄工作法，选择一个待完成的任务，将番茄时间设为25分钟，专注工作，中途不允许做任何与该任务无关的事，直到番茄钟响起，然后进行短暂休息（5分钟），每4个番茄时段后休息15-25分钟。

## 我的实践心得

### 1. 准备阶段
- 明确任务清单：每天早上列出当天要完成的任务
- 估算时间：为每个任务估算所需时间
- 准备工具：计时器、待办清单、笔记本

### 2. 执行阶段
- 25分钟专注时间：关闭手机通知，远离干扰
- 5分钟休息：站起来走动，喝杯水，看看窗外
- 循环进行：每完成4个番茄钟后，进行15-25分钟长休息

### 3. 注意事项
- 遇到紧急事情：暂停当前番茄钟，处理完再重新开始
- 任务完成前：如果任务提前完成，可以用于复盘或复习
- 保持节奏：不要在休息时间思考工作相关的事

## 带来的改变

### 学习效率提升
- 专注力明显增强
- 学习时间利用率提高
- 任务完成质量更好

### 心理状态改善
- 减少焦虑感
- 增强成就感
- 工作与生活更平衡

### 习惯养成
- 培养了良好的时间管理习惯
- 提高了自控能力
- 养成了定期休息的习惯

## 推荐工具

1. **Forest**：专注森林，让你在学习的同时种树
2. **番茄ToDo**：专门的番茄工作法应用
3. **番茄钟**：简单实用的计时器应用
4. **Notion**：可以结合番茄钟和任务管理

## 给新手的建议

1. **循序渐进**：刚开始可以先尝试2-3个番茄钟
2. **记录反馈**：记录每天完成情况，不断优化
3. **灵活调整**：根据个人情况调整时间和休息比例
4. **坚持下去**：习惯养成需要时间，至少坚持21天

希望我的分享能对大家有所帮助！如果你也有好的学习方法，欢迎在评论区交流讨论。让我们一起成为更好的自己！💪`,
    images: [
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/a47adfb1154e237b5e996d4d29ef1206.png',
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/dd6f10550dd54b89a2b5e1752b5eca8d.png',
      'https://design.gemcoder.com/staticResource/echoAiSystemImages/433c181a83f5e27bbb82449f76374965.png'
    ],
    likes: 156,
    comments: 42,
    shares: 28,
    views: 892,
    category: '学习心得',
    timestamp: '2小时前',
    tags: ['学习方法', '时间管理', '效率提升', '经验分享'],
    isLiked: false,
    isSaved: false
  },
  '2': {
    id: '2',
    author: {
      name: '李雨晴',
      avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/avatar2.png',
      school: '北京大学',
      major: '心理学'
    },
    title: '校园求助：关于专业选择的困惑',
    content: '最近在专业选择上遇到了一些困惑，希望能够得到大家的建议和建议...',
    detailedContent: `最近在专业选择上遇到了一些困惑，希望能够得到大家的建议和建议。

## 目前的情况

我现在是大二的学生，目前主修心理学专业，最近开始对计算机科学产生了浓厚的兴趣。一方面，我对心理学很感兴趣，并且在这个专业投入了很多时间；另一方面，计算机科学的发展前景和挑战也很吸引我。

## 具体的困惑

### 1. 转专业的风险
- 已经学习了两年心理学，转专业意味着要从头开始
- 可能需要多读一年本科
- 之前投入的时间成本如何计算

### 2. 兴趣与就业的平衡
- 心理学是我真正的兴趣所在
- 但担心就业前景不够好
- 计算机虽然就业好，但我担心自己只是三分钟热度

### 3. 能力匹配问题
- 我的数学基础一般，能学好计算机吗？
- 心理学的研究能力是否在其他领域也有用？

### 4. 未来规划
- 如果继续心理学，可以考虑考研继续深造
- 如果转计算机，可能需要准备很多基础知识

## 希望得到的建议

1. 有类似经历的同学是如何选择的？
2. 心理学+计算机的交叉领域有哪些发展机会？
3. 如何判断自己是否真的适合计算机专业？
4. 在做重大选择时，大家考虑的主要因素是什么？

希望大家能够分享自己的经历和建议，谢谢大家！🙏`,
    images: [],
    likes: 89,
    comments: 67,
    shares: 12,
    views: 445,
    category: '校园求助',
    timestamp: '5小时前',
    tags: ['专业选择', '困惑求助', '心理咨询'],
    isLiked: true,
    isSaved: true
  }
};

// 模拟评论数据
const mockComments: Comment[] = [
  {
    id: '1',
    author: {
      name: '王学姐',
      avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/avatar3.png'
    },
    content: '番茄工作法真的很棒！我坚持了半年，感觉专注力提升了很多。建议刚开始可以从3-4个番茄钟开始，慢慢增加。',
    timestamp: '1小时前',
    likes: 12,
    isLiked: false
  },
  {
    id: '2',
    author: {
      name: '李同学',
      avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/avatar4.png'
    },
    content: '我也在使用这个方法，配合Forest应用，效果很好。特别是对于像我这样手机控的人来说，真的很有用！',
    timestamp: '1.5小时前',
    likes: 8,
    isLiked: false,
    replies: [
      {
        id: '3',
        author: {
          name: '楼主',
          avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/avatar1.png'
        },
        content: 'Forest确实很棒，我也是用它来专注的！看着自己种的森林一天天长大很有成就感。',
        timestamp: '1小时前',
        likes: 3,
        isLiked: false
      }
    ]
  },
  {
    id: '4',
    author: {
      name: '张老师',
      avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/avatar5.png'
    },
    content: '作为教育工作者，我要为你的分享点赞！番茄工作法确实是经过科学验证的有效方法。你的总结很全面，希望能帮助到更多同学。',
    timestamp: '2小时前',
    likes: 25,
    isLiked: true
  }
];

export default function ContentCommunityDetailPage({ postId, onBack }: ContentCommunityDetailPageProps) {
  const [post, setPost] = useState<CommunityPost | null>(null);
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    // 模拟加载帖子详情
    setIsLoading(true);
    setTimeout(() => {
      const postData = mockPostDetails[postId] || {
        ...mockPostDetails['1'],
        id: postId,
        title: '内容加载中...',
        content: '帖子详细信息正在加载中...'
      };
      setPost(postData);
      setIsLiked(postData.isLiked || false);
      setIsSaved(postData.isSaved || false);
      setIsLoading(false);
    }, 500);
  }, [postId]);

  const handleLike = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    if (post) {
      setPost({
        ...post,
        likes: newLikedState ? post.likes + 1 : post.likes - 1,
        isLiked: newLikedState
      });
    }
  };

  const handleSave = () => {
    const newSavedState = !isSaved;
    setIsSaved(newSavedState);
    alert(newSavedState ? '已收藏此帖子' : '已取消收藏');
  };

  const handleShare = () => {
    if (post) {
      alert(`分享帖子：${post.title}\n作者：${post.author.name}\n（后续将实现分享功能）`);
    }
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: {
          name: '当前用户',
          avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/avatar-current.png'
        },
        content: newComment,
        timestamp: '刚刚',
        likes: 0,
        isLiked: false
      };
      setComments([comment, ...comments]);
      setNewComment('');
      alert('评论发表成功！');
    }
  };

  const handleReplySubmit = (parentId: string) => {
    if (replyContent.trim()) {
      const reply: Comment = {
        id: Date.now().toString(),
        author: {
          name: '当前用户',
          avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/avatar-current.png'
        },
        content: replyContent,
        timestamp: '刚刚',
        likes: 0,
        isLiked: false
      };

      setComments(comments.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), reply]
          };
        }
        return comment;
      }));

      setReplyContent('');
      setReplyingTo(null);
      alert('回复发表成功！');
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/api/searchImage?query=' + encodeURIComponent(post?.title || 'content') + '&width=400&height=300';
  };

  const images = post?.images || [];

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-500">加载中...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">帖子不存在或已删除</p>
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

  const categoryColors: Record<string, string> = {
    '学习心得': 'bg-blue-500',
    '生活感悟': 'bg-green-500',
    '校园求助': 'bg-orange-500',
    '经验分享': 'bg-purple-500'
  };

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
          <h1 className="font-medium text-gray-800">内容详情</h1>
          <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 内容展示 */}
      <div className="p-4 space-y-4">
        {/* 作者信息 */}
        <div className="flex items-center justify-between animate-slideUp" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/api/searchImage?query=' + encodeURIComponent(post.author.name) + '&width=40&height=40';
                }}
              />
            </div>
            <div>
              <p className="font-medium text-gray-800">{post.author.name}</p>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                {post.author.school && <span>{post.author.school}</span>}
                {post.author.major && <span>• {post.author.major}</span>}
                <span>• {post.timestamp}</span>
              </div>
            </div>
          </div>
          <button className="px-3 py-1 bg-primary text-white text-sm rounded-full hover:bg-primary/90 transition-colors">
            + 关注
          </button>
        </div>

        {/* 帖子标题和分类 */}
        <div className="animate-slideUp" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center space-x-2 mb-2">
            <span className={`${categoryColors[post.category] || 'bg-gray-500'} text-white text-xs px-2 py-1 rounded-full`}>
              {post.category}
            </span>
            {post.tags && post.tags.map((tag, index) => (
              <span key={index} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
          <h1 className="text-xl font-bold text-gray-800 mb-3">{post.title}</h1>
        </div>

        {/* 图片展示 */}
        {images.length > 0 && (
          <div className="animate-slideUp" style={{ animationDelay: '0.3s' }}>
            <div className="aspect-video bg-gray-50 rounded-xl overflow-hidden relative">
              <img
                src={images[currentImageIndex]}
                alt={post.title}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />

              {/* 图片指示器 */}
              {images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
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
            </div>

            {/* 图片缩略图 */}
            {images.length > 1 && (
              <div className="flex space-x-2 mt-3 overflow-x-auto">
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
                      alt={`${post.title} ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      onError={handleImageError}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 内容正文 */}
        <div className="animate-slideUp" style={{ animationDelay: '0.4s' }}>
          <div className="prose prose-sm max-w-none">
            {post.detailedContent ? (
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {post.detailedContent}
              </div>
            ) : (
              <p className="text-gray-700 leading-relaxed">{post.content}</p>
            )}
          </div>
        </div>

        {/* 统计信息 */}
        <div className="flex items-center justify-between py-3 border-t border-gray-100 text-sm text-gray-500 animate-slideUp" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{post.views}浏览</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{post.likes}点赞</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4" />
              <span>{post.comments}评论</span>
            </div>
            <div className="flex items-center space-x-1">
              <Share2 className="w-4 h-4" />
              <span>{post.shares}分享</span>
            </div>
          </div>
        </div>

        {/* 互动按钮 */}
        <div className="flex items-center space-x-4 py-3 border-t border-gray-100 animate-slideUp" style={{ animationDelay: '0.6s' }}>
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
              isLiked
                ? 'bg-red-50 text-red-500'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            <span className="text-sm">{isLiked ? '已点赞' : '点赞'}</span>
          </button>

          <button
            onClick={handleSave}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
              isSaved
                ? 'bg-yellow-50 text-yellow-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            <span className="text-sm">{isSaved ? '已收藏' : '收藏'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-sm">分享</span>
          </button>
        </div>

        {/* 评论区 */}
        <div className="border-t border-gray-100 pt-4 animate-slideUp" style={{ animationDelay: '0.7s' }}>
          <h3 className="font-medium text-gray-800 mb-4">评论 ({comments.length})</h3>

          {/* 评论输入框 */}
          <div className="flex items-end space-x-3 p-3 bg-gray-50 rounded-xl mb-4">
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
              <img
                src="https://design.gemcoder.com/staticResource/echoAiSystemImages/avatar-current.png"
                alt="当前用户"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/api/searchImage?query=current+user&width=32&height=32';
                }}
              />
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="写下你的评论..."
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg resize-none focus:outline-none focus:border-primary transition-colors"
                rows={2}
              />
            </div>
            <button
              onClick={handleCommentSubmit}
              disabled={!newComment.trim()}
              className={`p-2 rounded-lg transition-colors ${
                newComment.trim()
                  ? 'bg-primary text-white hover:bg-primary/90'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* 评论列表 */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-white border border-gray-100 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                    <img
                      src={comment.author.avatar}
                      alt={comment.author.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/api/searchImage?query=' + encodeURIComponent(comment.author.name) + '&width=32&height=32';
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-gray-800">{comment.author.name}</p>
                      <p className="text-xs text-gray-500">{comment.timestamp}</p>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">{comment.content}</p>

                    {/* 回复按钮和点赞 */}
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <button
                        onClick={() => {
                          if (replyingTo === comment.id) {
                            setReplyingTo(null);
                            setReplyContent('');
                          } else {
                            setReplyingTo(comment.id);
                            setReplyContent(`@${comment.author.name} `);
                          }
                        }}
                        className="hover:text-primary transition-colors"
                      >
                        回复
                      </button>
                      <button className="hover:text-primary transition-colors">
                        <Heart className={`w-3 h-3 inline mr-1 ${comment.isLiked ? 'fill-current text-red-500' : ''}`} />
                        {comment.likes}
                      </button>
                    </div>

                    {/* 回复输入框 */}
                    {replyingTo === comment.id && (
                      <div className="mt-3 flex items-end space-x-2">
                        <textarea
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder={`回复 ${comment.author.name}...`}
                          className="flex-1 px-2 py-1 text-sm bg-gray-50 border border-gray-200 rounded resize-none focus:outline-none focus:border-primary"
                          rows={2}
                        />
                        <button
                          onClick={() => handleReplySubmit(comment.id)}
                          disabled={!replyContent.trim()}
                          className={`px-3 py-1 text-sm rounded transition-colors ${
                            replyContent.trim()
                              ? 'bg-primary text-white hover:bg-primary/90'
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          回复
                        </button>
                      </div>
                    )}

                    {/* 子评论 */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-3 space-y-3 pl-4 border-l-2 border-gray-100">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex items-start space-x-2">
                            <div className="w-6 h-6 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                              <img
                                src={reply.author.avatar}
                                alt={reply.author.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = '/api/searchImage?query=' + encodeURIComponent(reply.author.name) + '&width=24&height=24';
                                }}
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <p className="font-medium text-gray-800 text-sm">{reply.author.name}</p>
                                <p className="text-xs text-gray-500">{reply.timestamp}</p>
                              </div>
                              <p className="text-gray-700 text-sm">{reply.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}