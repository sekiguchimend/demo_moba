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

        // ルートの座標を定義（渋谷→表参道→新宿）
        const routePoints: [number, number][] = [
          [35.6580, 139.7016], // 渋谷駅
          [35.6654, 139.7126], // 表参道
          [35.6895, 139.7006]  // 新宿駅
        ];

        // ルートラインを地図に追加
        const routeLine = L.polyline(routePoints, {
          color: '#ff0000',
          weight: 4,
          opacity: 0.8,
          smoothFactor: 1
        }).addTo(map);

        // ルート全体が見えるように地図の表示範囲を調整
        map.fitBounds(routeLine.getBounds(), { padding: [50, 50] });

        // 出発地マーカー
        const startIcon = L.divIcon({
          html: `
            <div style="
              width: 24px;
              height: 24px;
              background: #323232;
              border: 3px solid #fff;
              border-radius: 50%;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            "></div>
          `,
          className: 'start-marker',
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });
        L.marker(routePoints[0], { icon: startIcon })
          .bindTooltip('渋谷駅（出発）', { permanent: false, direction: 'top' })
          .addTo(map);

        // 経由地マーカー
        const waypointIcon = L.divIcon({
          html: `
            <div style="
              width: 20px;
              height: 20px;
              background: #fff;
              border: 3px solid #323232;
              border-radius: 50%;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            "></div>
          `,
          className: 'waypoint-marker',
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        });
        L.marker(routePoints[1], { icon: waypointIcon })
          .bindTooltip('表参道（経由）', { permanent: false, direction: 'top' })
          .addTo(map);

        // 目的地マーカー
        const endIcon = L.divIcon({
          html: `
            <div style="
              width: 24px;
              height: 24px;
              background: #323232;
              border: 3px solid #fff;
              border-radius: 50%;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
              position: relative;
            ">
              <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 8px;
                height: 8px;
                background: #fff;
                border-radius: 50%;
              "></div>
            </div>
          `,
          className: 'end-marker',
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });
        L.marker(routePoints[2], { icon: endIcon })
          .bindTooltip('新宿駅（目的地）', { permanent: false, direction: 'top' })
          .addTo(map);

        // 自分の位置マーカーを追加（現在地を渋谷付近に設定）
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
        const LocateControl = L.Control.extend({
          options: {
            position: 'topright'
          },
          onAdd: function () {
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
          }
        });
        new LocateControl().addTo(map);
      });
    }
  }, []);

  return (
    <div className="relative h-full w-full">
      <div ref={mapRef} className="h-full w-full" />

      {/* ルート簡易表示 */}
      <div className="absolute bottom-4 left-4 right-4 bg-[#fff] rounded-lg shadow-lg border border-[#323232]/10 p-4">
        <div className="flex items-start gap-3">
          {/* ルートアイコン */}
          <div className="flex-shrink-0 w-10 h-10 bg-[#323232] rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-[#fff]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
            </svg>
          </div>

          {/* ルート情報 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-sm font-semibold text-[#323232]">現在のルート</h3>
              <span className="text-xs px-2 py-0.5 bg-[#323232] text-[#fff] rounded-full">進行中</span>
            </div>

            <div className="space-y-1.5">
              {/* 出発地 */}
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#323232] rounded-full mt-1.5 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-[#323232]/60">出発</div>
                  <div className="text-sm text-[#323232] font-medium truncate">渋谷駅</div>
                </div>
              </div>

              {/* 経由地 */}
              <div className="flex items-start gap-2 pl-0.5">
                <div className="w-px h-4 bg-[#323232]/30 ml-0.5"></div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#323232]/50 rounded-full mt-1.5 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-[#323232]/60">経由</div>
                  <div className="text-sm text-[#323232] truncate">表参道</div>
                </div>
              </div>

              {/* 到着地 */}
              <div className="flex items-start gap-2 pl-0.5">
                <div className="w-px h-4 bg-[#323232]/30 ml-0.5"></div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#323232] rounded-full mt-1.5 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-[#323232]/60">目的地</div>
                  <div className="text-sm text-[#323232] font-medium truncate">新宿駅</div>
                </div>
              </div>
            </div>

            {/* 距離と時間 */}
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#323232]/10">
              <div className="flex items-center gap-1.5 text-xs text-[#323232]/70">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
                </svg>
                <span>約 2.5km</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#323232]/70">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                </svg>
                <span>残り 15分</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
