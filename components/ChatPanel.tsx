'use client';

import { useState } from 'react';

interface ChatPanelProps {
  personName: string;
  onClose: () => void;
}

export default function ChatPanel({ personName, onClose }: ChatPanelProps) {
  const [message, setMessage] = useState('');

  // 各人物ごとのチャット履歴
  const chatHistories: { [key: string]: any[] } = {
    '作業員A (田中)': [
      { id: 1, type: 'received', text: '渋谷駅前の状況はいかがですか？', time: '14:10' },
      { id: 2, type: 'sent', text: '渋谷駅前、人が多いですが順調です。交差点周辺の点検を進めています。', time: '14:12' },
      { id: 3, type: 'received', text: '了解です。安全に気をつけてください。', time: '14:15' },
      { id: 4, type: 'sent', text: 'はい、ありがとうございます。次は道玄坂方面に向かいます。', time: '14:20' },
    ],
    '作業員B (佐藤)': [
      { id: 1, type: 'sent', text: '代々木公園に到着しました。', time: '14:05' },
      { id: 2, type: 'received', text: 'お疲れ様です。公園内の巡回お願いします。', time: '14:07' },
      { id: 3, type: 'sent', text: '承知しました。現在北側エリアを確認中です。', time: '14:15' },
      { id: 4, type: 'received', text: '問題なければ次のポイントへ移動してください。', time: '14:19' },
      { id: 5, type: 'sent', text: '了解です。南側も確認してから移動します。', time: '14:21' },
    ],
    '作業員C (鈴木)': [
      { id: 1, type: 'received', text: '原宿駅周辺の様子を教えてください。', time: '14:08' },
      { id: 2, type: 'sent', text: '原宿駅、若干混雑していますが問題ありません。竹下通り方面も確認済みです。', time: '14:10' },
      { id: 3, type: 'received', text: 'ありがとうございます。次は明治神宮方面お願いします。', time: '14:13' },
      { id: 4, type: 'sent', text: 'わかりました。現在移動中です。15分ほどで到着予定です。', time: '14:18' },
    ],
    '管理者 (山田)': [
      { id: 1, type: 'sent', text: '本日の巡回ルート、問題なく進んでいます。', time: '14:00' },
      { id: 2, type: 'received', text: 'お疲れ様です。各チームの状況も確認お願いします。', time: '14:05' },
      { id: 3, type: 'sent', text: '全チーム順調です。表参道エリアは特に異常なしです。', time: '14:12' },
      { id: 4, type: 'received', text: '了解しました。引き続きよろしくお願いします。', time: '14:16' },
    ],
    '監督員 (高橋)': [
      { id: 1, type: 'received', text: '青山一丁目での作業状況を教えてください。', time: '13:50' },
      { id: 2, type: 'sent', text: '機器の点検作業を実施中です。あと30分ほどで完了予定です。', time: '13:55' },
      { id: 3, type: 'received', text: '承知しました。完了したら報告お願いします。', time: '14:00' },
      { id: 4, type: 'sent', text: '点検完了しました。すべて正常に動作しています。', time: '14:18' },
    ],
    '巡回員 (伊藤)': [
      { id: 1, type: 'sent', text: '恵比寿方面から渋谷に向かっています。', time: '14:15' },
      { id: 2, type: 'received', text: '了解です。渋谷到着したら連絡ください。', time: '14:17' },
      { id: 3, type: 'sent', text: 'わかりました。あと5分ほどで到着予定です。', time: '14:20' },
    ],
    '点検員 (渡辺)': [
      { id: 1, type: 'received', text: '渋谷センター街での点検作業お願いします。', time: '14:00' },
      { id: 2, type: 'sent', text: '承知しました。現在、機材を準備中です。', time: '14:05' },
      { id: 3, type: 'sent', text: '点検開始しました。混雑しているので時間がかかりそうです。', time: '14:15' },
      { id: 4, type: 'received', text: '無理せず安全第一でお願いします。', time: '14:20' },
      { id: 5, type: 'sent', text: 'ありがとうございます。慎重に進めます。', time: '14:23' },
    ],
  };

  const [messages, setMessages] = useState(chatHistories[personName] || []);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'sent',
        text: message,
        time: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed right-0 top-14 bottom-0 w-96 bg-white border-l border-[#323232]/10 shadow-lg z-40 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-[#323232]/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#00a89d] flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-[#323232]">{personName}</h3>
            <p className="text-xs text-[#323232]/60">オンライン</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#323232]/5 transition-colors text-[#00a89d]">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
            </svg>
          </button>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#323232]/5 transition-colors text-[#323232]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[75%] ${msg.type === 'sent' ? 'order-2' : 'order-1'}`}>
              <div
                className={`rounded-2xl px-4 py-2 ${
                  msg.type === 'sent'
                    ? 'bg-[#00a89d] text-white rounded-br-sm'
                    : 'bg-[#f5f5f5] text-[#323232] rounded-bl-sm'
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
              <p
                className={`text-[10px] text-[#323232]/50 mt-1 px-2 ${
                  msg.type === 'sent' ? 'text-right' : 'text-left'
                }`}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-[#323232]/10 p-4">
        <div className="flex items-end gap-2">
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#323232]/5 transition-colors text-[#323232]">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
          </button>
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="メッセージを入力"
              className="w-full px-4 py-2 border border-[#323232]/20 rounded-full text-sm text-[#323232] bg-white focus:outline-none focus:border-[#00a89d] resize-none max-h-24"
              rows={1}
            />
          </div>
          <button
            onClick={handleSendMessage}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#00a89d] hover:bg-[#00a89d]/90 transition-colors text-white"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
