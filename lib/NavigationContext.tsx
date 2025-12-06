'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { NavItem } from '@/types';

interface NavigationContextType {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  navItems: NavItem[];

  // 商品详情页
  showProductDetail: boolean;
  currentProductId: string | null;
  showProductDetailPage: (productId: string) => void;
  hideProductDetailPage: () => void;

  // 兴趣小组详情页
  showInterestGroupDetail: boolean;
  currentGroupId: string | null;
  showInterestGroupDetailPage: (groupId: string) => void;
  hideInterestGroupDetailPage: () => void;

  // 内容社区详情页
  showContentDetail: boolean;
  currentPostId: string | null;
  showContentDetailPage: (postId: string) => void;
  hideContentDetailPage: () => void;

  // 活动详情页
  showActivityDetail: boolean;
  currentActivityId: string | null;
  showActivityDetailPage: (activityId: string) => void;
  hideActivityDetailPage: () => void;

  // 通用返回
  showAnyDetail: boolean;
  hideAllDetailPages: () => void;
}

const defaultNavItems: NavItem[] = [
  { id: 'home', label: '首页', icon: 'Home', isActive: true },
  { id: 'secondHandTrade', label: '二手交易', icon: 'ShoppingBag', isActive: false },
  { id: 'interestGroup', label: '兴趣小组', icon: 'Users', isActive: false },
  { id: 'contentCommunity', label: '内容社区', icon: 'MessageSquare', isActive: false },
  { id: 'personalCenter', label: '我的', icon: 'User', isActive: false },
];

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState('home');
  const [navItems, setNavItems] = useState(defaultNavItems);

  // 商品详情页状态
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);

  // 兴趣小组详情页状态
  const [showInterestGroupDetail, setShowInterestGroupDetail] = useState(false);
  const [currentGroupId, setCurrentGroupId] = useState<string | null>(null);

  // 内容社区详情页状态
  const [showContentDetail, setShowContentDetail] = useState(false);
  const [currentPostId, setCurrentPostId] = useState<string | null>(null);

  // 活动详情页状态
  const [showActivityDetail, setShowActivityDetail] = useState(false);
  const [currentActivityId, setCurrentActivityId] = useState<string | null>(null);

  const handleSetActiveTab = (tabId: string) => {
    setActiveTab(tabId);
    setNavItems(prevItems =>
      prevItems.map(item => ({
        ...item,
        isActive: item.id === tabId
      }))
    );
  };

  // 商品详情页方法
  const showProductDetailPage = (productId: string) => {
    hideAllDetailPages(); // 隐藏所有其他详情页
    setCurrentProductId(productId);
    setShowProductDetail(true);
  };

  const hideProductDetailPage = () => {
    setShowProductDetail(false);
    setCurrentProductId(null);
  };

  // 兴趣小组详情页方法
  const showInterestGroupDetailPage = (groupId: string) => {
    hideAllDetailPages(); // 隐藏所有其他详情页
    setCurrentGroupId(groupId);
    setShowInterestGroupDetail(true);
  };

  const hideInterestGroupDetailPage = () => {
    setShowInterestGroupDetail(false);
    setCurrentGroupId(null);
  };

  // 内容社区详情页方法
  const showContentDetailPage = (postId: string) => {
    hideAllDetailPages(); // 隐藏所有其他详情页
    setCurrentPostId(postId);
    setShowContentDetail(true);
  };

  const hideContentDetailPage = () => {
    setShowContentDetail(false);
    setCurrentPostId(null);
  };

  // 活动详情页方法
  const showActivityDetailPage = (activityId: string) => {
    hideAllDetailPages(); // 隐藏所有其他详情页
    setCurrentActivityId(activityId);
    setShowActivityDetail(true);
  };

  const hideActivityDetailPage = () => {
    setShowActivityDetail(false);
    setCurrentActivityId(null);
  };

  // 隐藏所有详情页
  const hideAllDetailPages = () => {
    setShowProductDetail(false);
    setShowInterestGroupDetail(false);
    setShowContentDetail(false);
    setShowActivityDetail(false);
    setCurrentProductId(null);
    setCurrentGroupId(null);
    setCurrentPostId(null);
    setCurrentActivityId(null);
  };

  // 计算是否有任何详情页显示
  const showAnyDetail = showProductDetail || showInterestGroupDetail || showContentDetail || showActivityDetail;

  return (
    <NavigationContext.Provider value={{
      activeTab,
      setActiveTab: handleSetActiveTab,
      navItems,

      // 商品详情页
      showProductDetail,
      currentProductId,
      showProductDetailPage,
      hideProductDetailPage,

      // 兴趣小组详情页
      showInterestGroupDetail,
      currentGroupId,
      showInterestGroupDetailPage,
      hideInterestGroupDetailPage,

      // 内容社区详情页
      showContentDetail,
      currentPostId,
      showContentDetailPage,
      hideContentDetailPage,

      // 活动详情页
      showActivityDetail,
      currentActivityId,
      showActivityDetailPage,
      hideActivityDetailPage,

      // 通用
      showAnyDetail,
      hideAllDetailPages
    }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}