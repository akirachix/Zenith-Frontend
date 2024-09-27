'use client';
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { Home, BarChart2, Users, Settings, ChartLine } from 'lucide-react';
const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const SidebarItem = ({ icon, label, path }: { icon: React.ReactNode, label: string, path: string }) => {
    const isActive = pathname === path;
    return (
      <div
        onClick={() => router.push(path)}
        className={`flex items-center py-2 px-4 rounded cursor-pointer ${
          isActive ? 'bg-[#008FFF]' : 'hover:bg-[#008FFF] transition-colors duration-200'
        }`} >
        {icon}
        <span className="ml-3 text-lg">{label}</span>
      </div>
    );
  };
  return (
    <div className="w-100 bg-[#008FFF] text-white p-5 h-screen font-serif ">
      <div className="flex items-center mb-[100px]">
        <Image src="/images/logo.png" alt="AquaSense Logo" width={200} height={200} className="mr-20" />
      </div>
      <nav className="space-y-9">
        <SidebarItem icon={<Home size={24} />} label="Home" path="/dashboard"/>
        <SidebarItem icon={<ChartLine size={20} />} label="RealTimeVisualization" path="/realtime" />
        <SidebarItem icon={<BarChart2 size={24} />} label="System Performance"  path="/"/>
        <SidebarItem icon={<Users size={24} />} label="User" path="/user" />
        <SidebarItem icon={<Settings size={24} />} label="Settings" path="/settings" />
      </nav>
    </div>
  );
};
export default Sidebar;