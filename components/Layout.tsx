import React from 'react';
import Sidebar from './Sidebar.tsx';
import Header from './Header.tsx';
import { ViewType } from '../types.ts';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  onSearch: (term: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setActiveView, onSearch }) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background-light">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <Header activeView={activeView} onSearch={onSearch} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 no-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;