'use client';

import { useState } from 'react';
import { Search, Bell, Settings } from 'lucide-react';
import { useNavigation } from '@/lib/NavigationContext';
import NotificationCenter from './NotificationCenter';
import NotificationSettings from './NotificationSettings';

export default function Header() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const { setActiveTab } = useNavigation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // 暂时跳转到内容社区搜索，后续可以实现专门的搜索页面
      setActiveTab('contentCommunity');
      alert(`搜索功能：正在搜索 "${searchQuery}"\n（后续将跳转到专门的搜索结果页面）`);
    }
  };

  const handleNotificationClick = () => {
    setShowNotificationCenter(true);
  };

  const handleNotificationSettings = () => {
    setShowNotificationSettings(true);
  };

  return (
    <>
      <header className="bg-white nav-shadow z-10 sticky top-0">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* 应用Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7V12C2 16.5 4.23 20.68 7.62 23.15L12 24L16.38 23.15C19.77 20.68 22 16.5 22 12V7L12 2Z" fill="white" opacity="0.9"/>
                <path d="M9 12L11 14L15 10" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <span className="text-lg font-bold text-dark hidden sm:block">
              校园生活
            </span>
          </div>

          {/* 搜索框 */}
          <form onSubmit={handleSearch} className={`flex-1 mx-4 relative transition-transform duration-200 ${searchFocused ? 'scale-105' : ''}`}>
            <input
              type="text"
              placeholder="搜索商品、小组或内容..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 px-4 pl-10 rounded-full bg-gray-100 focus:outline-none focus:search-focus transition-all duration-200 text-sm"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </form>

          {/* 右侧菜单按钮 */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleNotificationClick}
              className="text-gray-600 hover:text-primary transition-colors relative p-1 rounded-full hover:bg-gray-100"
              title="通知中心"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={handleNotificationSettings}
              className="text-gray-600 hover:text-primary transition-colors p-1 rounded-full hover:bg-gray-100"
              title="通知设置"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* 通知中心 */}
      <NotificationCenter
        isOpen={showNotificationCenter}
        onClose={() => setShowNotificationCenter(false)}
      />

      {/* 通知设置 */}
      <NotificationSettings
        isOpen={showNotificationSettings}
        onClose={() => setShowNotificationSettings(false)}
      />
    </>
  );
}