'use client';

import { useState } from 'react';

export default function LeftPanel() {
  const [selectedLocation, setSelectedLocation] = useState('東京都渋谷区');
  const [isDataListOpen, setIsDataListOpen] = useState(true);
  const [tasks, setTasks] = useState([
    { id: 1, text: '渋谷エリアの巡回点検を実施', checked: true },
    { id: 2, text: '新宿駅周辺の監視強化', checked: true },
    { id: 3, text: '池袋方面の状況確認', checked: false },
    { id: 4, text: '品川区の定期報告書作成', checked: false },
  ]);

  const dataItems = [
    {
      id: 1,
      number: '作業員A (田中)',
      date: '2024-12-18',
      time: '14:23:15',
      speed: '4.2 km/h',
      distance: '850 m',
      location: '渋谷駅前',
    },
    {
      id: 2,
      number: '作業員B (佐藤)',
      date: '2024-12-18',
      time: '14:21:30',
      speed: '0 km/h',
      distance: '0 m',
      location: '代々木公園',
    },
    {
      id: 3,
      number: '作業員C (鈴木)',
      date: '2024-12-18',
      time: '14:20:05',
      speed: '5.8 km/h',
      distance: '1.2 km',
      location: '原宿駅',
    },
    {
      id: 4,
      number: '管理者 (山田)',
      date: '2024-12-18',
      time: '14:19:42',
      speed: '3.5 km/h',
      distance: '600 m',
      location: '表参道',
    },
    {
      id: 5,
      number: '監督員 (高橋)',
      date: '2024-12-18',
      time: '14:18:20',
      speed: '0 km/h',
      distance: '0 m',
      location: '青山一丁目',
    },
  ];

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, checked: !task.checked } : task
    ));
  };

  return (
    <div className="fixed left-16 top-14 bottom-0 w-80 bg-[#fff] border-r border-[#323232]/10 overflow-y-auto z-30">
      {/* Top Toolbar */}
      <div className="flex items-center gap-0.5 px-2 py-2.5 border-b border-[#323232]/10 bg-[#f5f5f5]">
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
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded hover:bg-[#323232]/5 transition-colors text-[#323232]">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
          </svg>
        </button>
      </div>

      {/* Controls */}
      <div className="p-3">
        {/* Location Dropdown */}
        <div className="mb-2">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full px-2 py-1.5 border border-[#323232]/20 rounded text-xs text-[#323232] bg-white focus:outline-none focus:border-[#00a89d]"
          >
            <option value="東京都渋谷区">東京都渋谷区</option>
            <option value="東京都新宿区">東京都新宿区</option>
            <option value="東京都港区">東京都港区</option>
            <option value="東京都品川区">東京都品川区</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-3">
          <button className="flex-1 px-2 py-1.5 bg-[#00a89d] text-white text-xs rounded hover:bg-[#00a89d]/90 transition-colors flex items-center justify-center gap-1">
            <span className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#00a89d] text-[10px]">✓</span>
            </span>
            実施
          </button>
          <button className="flex-1 px-2 py-1.5 bg-white border border-[#323232]/20 text-[#323232] text-xs rounded hover:bg-[#323232]/5 transition-colors">
            廃棄
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="px-3 pb-3">
        <div className="space-y-1.5">
          {tasks.map((task) => (
            <label
              key={task.id}
              className="flex items-start gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={task.checked}
                onChange={() => toggleTask(task.id)}
                className="mt-0.5 w-3.5 h-3.5 rounded border-[#323232]/30 text-[#00a89d] focus:ring-[#00a89d] focus:ring-offset-0"
              />
              <span className="text-xs text-[#323232] flex-1 leading-tight group-hover:text-[#00a89d] transition-colors">
                {task.text}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Data Confirmation Section */}
      <div className="border-t border-[#323232]/10">
        <div className="bg-[#00a89d] text-white">
          <button
            onClick={() => setIsDataListOpen(!isDataListOpen)}
            className="w-full px-3 py-2.5 text-xs font-medium flex items-center justify-between hover:bg-[#00a89d]/90 transition-colors"
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>データ確認</span>
            </div>
            <svg
              className={`w-3 h-3 transition-transform ${isDataListOpen ? 'rotate-180' : ''}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Data Items List */}
        {isDataListOpen && (
          <div className="bg-white divide-y divide-[#323232]/10">
            {dataItems.map((item) => (
              <div
                key={item.id}
                className="p-3 hover:bg-[#323232]/5 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-2.5">
                  {/* Icon */}
                  <div className="w-7 h-7 rounded-full bg-[#f5a623] flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-xs font-semibold text-[#323232]">
                        {item.number}
                      </span>
                      {item.location && (
                        <span className="text-[10px] text-[#323232]/50">{item.location}</span>
                      )}
                    </div>
                    <div className="text-[10px] text-[#323232]/60 space-y-0.5">
                      <div>{item.date} {item.time}</div>
                      <div className="flex items-center gap-3">
                        <span>{item.speed}</span>
                        {item.distance && <span>{item.distance}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
