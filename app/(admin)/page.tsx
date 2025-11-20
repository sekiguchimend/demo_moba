'use client';

import { useState } from 'react';
import LeftPanel from '@/components/LeftPanel';
import MapView from '@/components/MapView';
import ChatPanel from '@/components/ChatPanel';

export default function Home() {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

  return (
    <>
      <LeftPanel />

      {/* Main Content Area */}
      <div className="fixed left-[384px] right-0 top-14 bottom-0">
        {/* Toolbar */}
        <div className="bg-white border-b border-[#323232]/10 px-4 py-2 flex items-center gap-2">
          {/* Icon Buttons */}
          <button className="w-10 h-10 flex items-center justify-center rounded hover:bg-[#323232]/5 transition-colors text-[#323232]">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
            </svg>
          </button>

          <button className="w-10 h-10 flex items-center justify-center rounded hover:bg-[#323232]/5 transition-colors text-[#323232]">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
            </svg>
          </button>

          <button className="w-10 h-10 flex items-center justify-center rounded hover:bg-[#323232]/5 transition-colors text-[#323232]">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
            </svg>
          </button>

          <div className="flex-1 mx-4">
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="住所を検索する"
                className="w-full px-4 py-2 pl-10 border border-[#323232]/20 rounded text-sm text-[#323232] bg-white focus:outline-none focus:border-[#00a89d]"
              />
              <svg className="w-5 h-5 text-[#323232]/40 absolute left-3 top-1/2 -translate-y-1/2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </div>
          </div>

          <button className="w-10 h-10 flex items-center justify-center rounded hover:bg-[#323232]/5 transition-colors text-[#323232]">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </button>
        </div>

        {/* Map Area */}
        <div className="h-[calc(100%-48px)]">
          <MapView onPersonClick={setSelectedPerson} />
        </div>
      </div>

      {/* Chat Panel */}
      {selectedPerson && (
        <ChatPanel
          personName={selectedPerson}
          onClose={() => setSelectedPerson(null)}
        />
      )}
    </>
  );
}
