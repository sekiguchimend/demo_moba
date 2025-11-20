'use client';

import { useState, useRef } from 'react';

interface UserChatPanelProps {
  onClose: () => void;
}

interface Message {
  id: number;
  type: 'sent' | 'received';
  text?: string;
  image?: string;
  time: string;
}

export default function UserChatPanel({ onClose }: UserChatPanelProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, type: 'received', text: '現在地を共有しています。何かあればこちらからご連絡ください。', time: '14:00' },
  ]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // メッセージテンプレート
  const messageTemplates = [
    '到着しました。',
    '少し遅れます。',
    '了解しました。',
  ];

  const handleSendMessage = () => {
    if (message.trim() || selectedImage) {
      const newMessage: Message = {
        id: messages.length + 1,
        type: 'sent',
        text: message.trim() || undefined,
        image: selectedImage || undefined,
        time: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      setSelectedImage(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTemplateClick = (template: string) => {
    setMessage(template);
  };

  return (
    <div className="h-full bg-[#fff] flex flex-col">
      {/* Header */}
      <div className="bg-[#fff] border-b border-[#323232]/10 px-4 py-3 flex items-center gap-3">
        <svg className="w-8 h-8 text-[#323232]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
        <div>
          <h3 className="font-semibold text-sm text-[#323232]">管理者</h3>
          <p className="text-xs text-[#323232]/60">オンライン</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#fff]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[75%]`}>
              <div
                className={`rounded-2xl ${msg.image ? 'p-1' : 'px-4 py-2'} ${
                  msg.type === 'sent'
                    ? 'bg-[#323232] text-[#fff] rounded-br-sm'
                    : 'bg-[#323232]/10 text-[#323232] rounded-bl-sm'
                }`}
              >
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="Sent image"
                    className="rounded-xl max-w-full h-auto max-h-64 object-cover"
                  />
                )}
                {msg.text && (
                  <p className={`text-sm leading-relaxed ${msg.image ? 'px-3 py-2' : ''}`}>
                    {msg.text}
                  </p>
                )}
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
      <div className="border-t border-[#323232]/10 p-4 bg-[#fff]">
        {/* Message Templates */}
        <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
          {messageTemplates.map((template, index) => (
            <button
              key={index}
              onClick={() => handleTemplateClick(template)}
              className="flex-shrink-0 px-3 py-1.5 text-xs font-medium text-[#323232] bg-[#fff] border border-[#323232]/20 rounded-full hover:bg-[#323232]/5 transition-colors"
            >
              {template}
            </button>
          ))}
        </div>

        {/* Image Preview */}
        {selectedImage && (
          <div className="mb-3 relative inline-block">
            <img
              src={selectedImage}
              alt="Preview"
              className="rounded-lg max-h-32 object-cover border border-[#323232]/20"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-[#323232] text-[#fff] rounded-full flex items-center justify-center hover:bg-[#323232]/80 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        <div className="flex items-end gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#323232]/5 transition-colors text-[#323232]"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
          </button>
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="メッセージを入力"
              className="w-full px-4 py-2 border border-[#323232]/20 rounded-full text-sm text-[#323232] bg-[#fff] focus:outline-none focus:border-[#323232] resize-none max-h-24"
              rows={1}
            />
          </div>
          <button
            onClick={handleSendMessage}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#323232] hover:bg-[#323232]/90 transition-colors text-[#fff]"
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
