'use client';

import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

interface MapViewProps {
  onPersonClick: (personName: string) => void;
}

export default function MapView({ onPersonClick }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && mapRef.current) {
      // Leafletを動的にインポート
      import('leaflet').then((L) => {
        // カスタム人型アイコンを作成
        const personIcon = L.divIcon({
          html: `
            <div style="position: relative; width: 40px; height: 40px;">
              <svg width="40" height="40" viewBox="0 0 40 40" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
                <!-- 外側の円（背景） -->
                <circle cx="20" cy="20" r="18" fill="#00a89d" opacity="0.9"/>
                <!-- 人型アイコン -->
                <g transform="translate(20, 20)">
                  <!-- 頭 -->
                  <circle cx="0" cy="-6" r="4" fill="white"/>
                  <!-- 体 -->
                  <line x1="0" y1="-2" x2="0" y2="6" stroke="white" stroke-width="2" stroke-linecap="round"/>
                  <!-- 腕 -->
                  <line x1="-5" y1="0" x2="5" y2="0" stroke="white" stroke-width="2" stroke-linecap="round"/>
                  <!-- 左足 -->
                  <line x1="0" y1="6" x2="-3" y2="10" stroke="white" stroke-width="2" stroke-linecap="round"/>
                  <!-- 右足 -->
                  <line x1="0" y1="6" x2="3" y2="10" stroke="white" stroke-width="2" stroke-linecap="round"/>
                </g>
              </svg>
              <!-- 脈打つアニメーション -->
              <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 40px;
                height: 40px;
                border: 2px solid #00a89d;
                border-radius: 50%;
                animation: pulse 2s infinite;
              "></div>
            </div>
            <style>
              @keyframes pulse {
                0% {
                  transform: translate(-50%, -50%) scale(1);
                  opacity: 1;
                }
                50% {
                  transform: translate(-50%, -50%) scale(1.5);
                  opacity: 0.5;
                }
                100% {
                  transform: translate(-50%, -50%) scale(1);
                  opacity: 1;
                }
              }
            </style>
          `,
          className: 'person-marker',
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        });

        // 地図を初期化（渋谷エリア）
        const map = L.map(mapRef.current!).setView([35.6595, 139.7004], 14);

        // OpenStreetMapタイルを追加
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // 人のマーカーを追加（リアルタイム監視対象者）
        const people = [
          {
            lat: 35.6595,
            lng: 139.7004,
            name: '作業員A (田中)',
            status: '移動中',
            speed: '4.2 km/h',
            lastUpdate: '14:23:15'
          },
          {
            lat: 35.6830,
            lng: 139.6990,
            name: '作業員B (佐藤)',
            status: '停止中',
            speed: '0 km/h',
            lastUpdate: '14:21:30'
          },
          {
            lat: 35.6702,
            lng: 139.7026,
            name: '作業員C (鈴木)',
            status: '移動中',
            speed: '5.8 km/h',
            lastUpdate: '14:20:05'
          },
          {
            lat: 35.6654,
            lng: 139.7100,
            name: '管理者 (山田)',
            status: '移動中',
            speed: '3.5 km/h',
            lastUpdate: '14:19:42'
          },
          {
            lat: 35.6693,
            lng: 139.7155,
            name: '監督員 (高橋)',
            status: '作業中',
            speed: '0 km/h',
            lastUpdate: '14:18:20'
          },
          {
            lat: 35.6617,
            lng: 139.7040,
            name: '巡回員 (伊藤)',
            status: '移動中',
            speed: '6.1 km/h',
            lastUpdate: '14:22:50'
          },
          {
            lat: 35.6580,
            lng: 139.7016,
            name: '点検員 (渡辺)',
            status: '点検中',
            speed: '0 km/h',
            lastUpdate: '14:23:00'
          },
        ];

        people.forEach(person => {
          const marker = L.marker([person.lat, person.lng], { icon: personIcon })
            .addTo(map);

          // ツールチップ（ホバー時のみ表示）
          const tooltip = L.tooltip({
            direction: 'top',
            offset: [0, -15],
            permanent: false,
            interactive: false,
            opacity: 0.95
          }).setContent(`
            <div style="font-family: sans-serif; min-width: 120px;">
              <div style="font-weight: bold; color: #00a89d; margin-bottom: 4px; font-size: 12px;">
                ${person.name}
              </div>
              <div style="font-size: 11px; color: #323232; line-height: 1.4;">
                <div><strong>状態:</strong> ${person.status}</div>
                <div><strong>速度:</strong> ${person.speed}</div>
                <div><strong>更新:</strong> ${person.lastUpdate}</div>
              </div>
            </div>
          `);

          // マーカーにマウスオーバー時のみツールチップを表示
          marker.on('mouseover', function() {
            this.bindTooltip(tooltip).openTooltip();
          });

          marker.on('mouseout', function() {
            this.closeTooltip();
          });

          // マーカーをクリックしたときに直接チャットを開く（ツールチップは閉じる）
          marker.on('click', (e) => {
            marker.closeTooltip();
            onPersonClick(person.name);
            L.DomEvent.stopPropagation(e);
          });
        });

        // リアルタイム更新をシミュレート（実際のアプリケーションではWebSocketなどを使用）
        const simulateMovement = () => {
          // ここに実際のリアルタイムデータ更新ロジックを追加
        };

        setInterval(simulateMovement, 5000); // 5秒ごとに更新
      });
    }
  }, []);

  return (
    <div className="relative h-full w-full">
      <div ref={mapRef} className="h-full w-full" />

      {/* Map Controls */}
      <div className="absolute right-4 top-4 space-y-2 z-[1000]">
        <div className="bg-white rounded-lg shadow-md border border-[#323232]/10 overflow-hidden">
          <button className="w-10 h-10 flex items-center justify-center border-b border-[#323232]/10 hover:bg-[#323232]/5 transition-colors text-[#323232]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          <button className="w-10 h-10 flex items-center justify-center hover:bg-[#323232]/5 transition-colors text-[#323232]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
        </div>

        <button className="w-10 h-10 bg-white rounded-lg shadow-md border border-[#323232]/10 flex items-center justify-center hover:bg-[#323232]/5 transition-colors text-[#323232]">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
          </svg>
        </button>

        <button className="w-10 h-10 bg-white rounded-lg shadow-md border border-[#323232]/10 flex items-center justify-center hover:bg-[#323232]/5 transition-colors text-[#323232]">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
