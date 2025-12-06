'use client';

import { Home, ShoppingBag, Users, MessageSquare, User } from 'lucide-react';
import { useNavigation } from '@/lib/NavigationContext';

export default function Footer() {
  const { navItems, setActiveTab } = useNavigation();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home':
        return <Home className="text-xl mb-1" />;
      case 'ShoppingBag':
        return <ShoppingBag className="text-xl mb-1" />;
      case 'Users':
        return <Users className="text-xl mb-1" />;
      case 'MessageSquare':
        return <MessageSquare className="text-xl mb-1" />;
      case 'User':
        return <User className="text-xl mb-1" />;
      default:
        return <Home className="text-xl mb-1" />;
    }
  };

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <footer className="bg-white tab-shadow py-2 z-10 sticky bottom-0">
      <nav className="container mx-auto">
        <ul className="flex justify-around">
          {navItems.map((item) => (
            <li key={item.id} className="flex flex-col items-center py-1 px-2">
              <button
                onClick={() => handleNavClick(item.id)}
                className={`flex flex-col items-center text-sm transition-colors ${
                  item.isActive ? 'text-primary active-menu' : 'text-gray-600 hover:text-primary'
                }`}
              >
                {getIcon(item.icon)}
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}