'use client';

import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

export default function UserMapView() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && mapRef.current) {
      // Leafletを動的にインポート
      import('leaflet').then((L) => {
        // カスタム自分位置アイコンを作成
        const myLocationIcon = L.divIcon({
          html: `
            <div style="position: relative; width: 40px; height: 40px;">
              <svg width="40" height="40" viewBox="0 0 40 40" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
                <!-- 外側の円（背景） -->
                <circle cx="20" cy="20" r="18" fill="#323232" opacity="0.9"/>
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
                border: 2px solid #323232;
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
          className: 'my-location-marker',
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        });

        // 地図を初期化（渋谷エリア - ユーザーの現在地）
        const userLocation = [35.6595, 139.7004] as [number, number];
        const map = L.map(mapRef.current!).setView(userLocation, 16);

        // OpenStreetMapタイルを追加
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // 自分の位置マーカーを追加
        const myMarker = L.marker(userLocation, { icon: myLocationIcon })
          .addTo(map);

        // 自分の位置のツールチップ
        const tooltip = L.tooltip({
          direction: 'top',
          offset: [0, -15],
          permanent: false,
          interactive: false,
          opacity: 0.95
        }).setContent(`
          <div style="font-family: sans-serif; min-width: 100px;">
            <div style="font-weight: bold; color: #323232; margin-bottom: 4px; font-size: 12px;">
              現在地
            </div>
            <div style="font-size: 11px; color: #323232; line-height: 1.4;">
              <div><strong>状態:</strong> 移動中</div>
              <div><strong>速度:</strong> 4.2 km/h</div>
              <div><strong>更新:</strong> ${new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>
            </div>
          </div>
        `);

        // マーカーにマウスオーバー時のみツールチップを表示
        myMarker.on('mouseover', () => {
          myMarker.bindTooltip(tooltip).openTooltip();
        });

        myMarker.on('mouseout', () => {
          myMarker.closeTooltip();
        });

        // 現在地ボタンの機能
        const locateControl = L.control({ position: 'topright' });
        locateControl.onAdd = () => {
          const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
          div.innerHTML = `
            <button style="
              width: 40px;
              height: 40px;
              background: #fff;
              border: 2px solid rgba(50, 50, 50, 0.2);
              border-radius: 4px;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <svg width="20" height="20" fill="#323232" viewBox="0 0 24 24">
                <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
              </svg>
            </button>
          `;
          div.onclick = () => {
            map.setView(userLocation, 16);
          };
          return div;
        };
        locateControl.addTo(map);
      });
    }
  }, []);

  return (
    <div className="relative h-full w-full">
      <div ref={mapRef} className="h-full w-full" />
    </div>
  );
}
