export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-[#fff] border-b border-[#323232]/10 shadow-md z-50 flex items-center justify-between px-4">
      {/* Left side - Logo and Title */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-[#00a89d] rounded flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
          </svg>
        </div>
        <h1 className="text-base font-medium text-[#323232]">モバイルクリエイト</h1>
      </div>

      {/* Right side - Navigation Links */}
      <div className="flex items-center gap-4">
        <button className="text-sm text-[#00a89d] hover:underline font-medium">
          アンケート
        </button>
        <button className="text-sm text-[#00a89d] hover:underline font-medium flex items-center gap-1">
          <span>ログアウト</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </header>
  );
}
