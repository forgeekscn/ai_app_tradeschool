'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import HomePage from '../components/HomePage';
import SecondHandTradePage from '../components/SecondHandTradePage';
import InterestGroupPage from '../components/InterestGroupPage';
import ContentCommunityPage from '../components/ContentCommunityPage';
import PersonalCenterPage from '../components/PersonalCenterPage';
import ProductDetailPage from '../components/ProductDetailPage';
import InterestGroupDetailPage from '../components/InterestGroupDetailPage';
import ContentCommunityDetailPage from '../components/ContentCommunityDetailPage';
import ActivityDetailPage from '../components/ActivityDetailPage';
import FloatingBanner from '../components/FloatingBanner';
import { NavigationProvider } from '../lib/NavigationContext';
import { useNavigation } from '../lib/NavigationContext';

function AppContent() {
  const {
    activeTab,
    showProductDetail,
    currentProductId,
    hideProductDetailPage,
    showInterestGroupDetail,
    currentGroupId,
    hideInterestGroupDetailPage,
    showContentDetail,
    currentPostId,
    hideContentDetailPage,
    showActivityDetail,
    currentActivityId,
    hideActivityDetailPage,
    showAnyDetail
  } = useNavigation();

  const renderContent = () => {
    // 商品详情页
    if (showProductDetail && currentProductId) {
      return (
        <div className="min-h-screen bg-white flex flex-col">
          <ProductDetailPage
            productId={currentProductId}
            onBack={hideProductDetailPage}
          />
        </div>
      );
    }

    // 兴趣小组详情页
    if (showInterestGroupDetail && currentGroupId) {
      return (
        <div className="min-h-screen bg-white flex flex-col">
          <InterestGroupDetailPage
            groupId={currentGroupId}
            onBack={hideInterestGroupDetailPage}
          />
        </div>
      );
    }

    // 内容社区详情页
    if (showContentDetail && currentPostId) {
      return (
        <div className="min-h-screen bg-white flex flex-col">
          <ContentCommunityDetailPage
            postId={currentPostId}
            onBack={hideContentDetailPage}
          />
        </div>
      );
    }

    // 活动详情页
    if (showActivityDetail && currentActivityId) {
      return (
        <div className="min-h-screen bg-white flex flex-col">
          <ActivityDetailPage
            activityId={currentActivityId}
            onBack={hideActivityDetailPage}
          />
        </div>
      );
    }

    // 主页面内容
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'secondHandTrade':
        return <SecondHandTradePage />;
      case 'interestGroup':
        return <InterestGroupPage />;
      case 'contentCommunity':
        return <ContentCommunityPage />;
      case 'personalCenter':
        return <PersonalCenterPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {activeTab === 'home' && !showAnyDetail && <FloatingBanner />}
      {!showAnyDetail && <Header />}
      <main className="flex-1 overflow-hidden">
        {renderContent()}
      </main>
      {!showAnyDetail && <Footer />}
    </div>
  );
}

export default function CampusLifeApp() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}