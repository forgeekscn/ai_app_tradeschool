'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/components/HomePage';
import SecondHandTradePage from '@/components/SecondHandTradePage';
import InterestGroupPage from '@/components/InterestGroupPage';
import ContentCommunityPage from '@/components/ContentCommunityPage';
import PersonalCenterPage from '@/components/PersonalCenterPage';
import ProductDetailPage from '@/components/ProductDetailPage';
import InterestGroupDetailPage from '@/components/InterestGroupDetailPage';
import ContentCommunityDetailPage from '@/components/ContentCommunityDetailPage';
import ActivityDetailPage from '@/components/ActivityDetailPage';
import { NavigationProvider } from '@/lib/NavigationContext';
import { useNavigation } from '@/lib/NavigationContext';

function AppContent() {
  const [showBanner, setShowBanner] = useState(true);

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
      {/* 内联浮动横幅 */}
      {showBanner && (
        <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-2 sm:py-3">
              <div className="flex items-center space-x-2 sm:space-x-4 flex-1">
                <div className="flex-shrink-0">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-purple-200"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-xs sm:text-sm text-purple-100 font-medium">
                  该demo代码完全由AI在一天内生成并上线，见
                  <a
                    href="https://github.com/forgeekscn/ai_app_tradeschool"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-100 hover:text-white underline font-semibold transition-colors duration-200"
                  >
                    https://github.com/forgeekscn/ai_app_tradeschool
                  </a>
                </p>
              </div>
              <button
                onClick={() => setShowBanner(false)}
                className="flex-shrink-0 ml-2 sm:ml-4 text-purple-200 hover:text-white transition-colors duration-200 p-1 rounded-md hover:bg-purple-700/50"
                aria-label="关闭横幅"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
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