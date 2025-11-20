'use client';

import { useState } from 'react';
import UserMapView from '@/components/UserMapView';
import UserChatPanel from '@/components/UserChatPanel';

export default function UserPage() {
  const [activeTab, setActiveTab] = useState<'map' | 'chat'>('map');

  return (
    <div className="h-screen bg-[#fff] flex flex-col">
      {/* Header */}
      <div className="bg-[#00a89d] text-[#fff] px-4 py-3 flex items-center justify-center">
        <h1 className="text-lg font-semibold">モバロケ</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative overflow-hidden">
        {activeTab === 'map' ? (
          <UserMapView />
        ) : (
          <UserChatPanel onClose={() => {}} />
        )}
      </div>

      {/* Footer Navigation */}
      <div className="bg-[#00a89d] px-4 py-2 flex items-center justify-around">
        <button
          onClick={() => setActiveTab('map')}
          className={`flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-colors ${
            activeTab === 'map'
              ? 'text-[#fff] bg-[#fff]/20'
              : 'text-[#fff]/70 hover:bg-[#fff]/10 hover:text-[#fff]'
          }`}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <span className="text-xs font-medium">地図</span>
        </button>

        <button
          onClick={() => setActiveTab('chat')}
          className={`flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-colors ${
            activeTab === 'chat'
              ? 'text-[#fff] bg-[#fff]/20'
              : 'text-[#fff]/70 hover:bg-[#fff]/10 hover:text-[#fff]'
          }`}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
          </svg>
          <span className="text-xs font-medium">チャット</span>
        </button>
      </div>
    </div>
  );
}
