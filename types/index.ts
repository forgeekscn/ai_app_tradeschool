// 轮播图数据类型
export interface CarouselItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  type?: 'activity' | 'announcement' | 'event';
  description?: string;
  date?: string;
  location?: string;
  organizer?: string;
  images?: string[];
  tags?: string[];
  registrationDeadline?: string;
  maxParticipants?: number;
  currentParticipants?: number;
  contactInfo?: {
    phone?: string;
    email?: string;
    wechat?: string;
  };
  requirements?: string[];
  schedule?: Array<{
    time: string;
    activity: string;
  }>;
}

// 社区内容类型
export interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    school?: string;
    major?: string;
  };
  title: string;
  content: string;
  images: string[];
  likes: number;
  comments: number;
  shares: number;
  views: number;
  category: string;
  timestamp: string;
  tags?: string[];
  isLiked?: boolean;
  isSaved?: boolean;
  detailedContent?: string;
}

// 兴趣小组类型
export interface InterestGroup {
  id: string;
  name: string;
  category: string;
  memberCount: number;
  image: string;
  isJoined: boolean;
  description?: string;
  creator?: {
    name: string;
    avatar: string;
    school?: string;
  };
  createTime?: string;
  tags?: string[];
  recentActivities?: string[];
  members?: Array<{
    name: string;
    avatar: string;
    joinTime: string;
  }>;
  posts?: number;
  images?: string[];
  rules?: string[];
  location?: string;
}

// 二手商品类型
export interface Product {
  id: string;
  title: string;
  price: number;
  condition: string;
  category: string;
  image: string;
  categoryColor: string;
  description?: string;
  images?: string[];
  seller?: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    school: string;
  };
  location?: string;
  publishTime?: string;
  viewCount?: number;
  favoriteCount?: number;
  status?: 'available' | 'sold' | 'reserved';
}

// 导航项类型
export interface NavItem {
  id: string;
  label: string;
  icon: string;
  isActive: boolean;
}

// 快捷入口类型
export interface QuickEntry {
  id: string;
  title: string;
  icon: string;
  color: string;
  bgColor: string;
}

// 评论类型
export interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
  isLiked?: boolean;
}

// 活动类型
export interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  participantCount: number;
  images?: string[];
  creator: {
    name: string;
    avatar: string;
  };
  status?: 'upcoming' | 'ongoing' | 'ended';
}

// 通知类型
export interface Notification {
  id: string;
  title: string;
  content: string;
  type: 'system' | 'activity' | 'community' | 'trade' | 'group' | 'comment' | 'like' | 'follow';
  timestamp: string;
  read: boolean;
  avatar?: string;
  userName?: string;
  targetId?: string;
  targetType?: string;
  targetTitle?: string;
  actionUrl?: string;
  metadata?: Record<string, any>;
}