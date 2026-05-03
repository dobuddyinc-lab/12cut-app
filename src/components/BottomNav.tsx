'use client';

import Link from 'next/link';

const BottomNav = () => {
  return (
    <nav
      className="flex h-[80px] items-start border-t border-[#D2D2D2] bg-white pt-3"
      style={{ backdropFilter: 'blur(100px)' }}
    >
      <Link
        href="/"
        className="flex flex-1 flex-col items-center gap-1"
        tabIndex={0}
        aria-label="카테고리"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="#939393" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span
          className="text-[10px] font-medium leading-[12px] text-[#939393]"
          style={{ fontFamily: 'Pretendard, sans-serif' }}
        >
          category
        </span>
      </Link>
      <Link
        href="/"
        className="flex flex-1 flex-col items-center gap-1"
        tabIndex={0}
        aria-label="홈"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10.5z" stroke="#939393" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span
          className="text-[10px] font-medium leading-[12px] text-[#939393]"
          style={{ fontFamily: 'Pretendard, sans-serif' }}
        >
          home
        </span>
      </Link>
      <Link
        href="/login"
        className="flex flex-1 flex-col items-center gap-1"
        tabIndex={0}
        aria-label="마이페이지"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="8" r="4" stroke="#939393" strokeWidth="2"/>
          <path d="M4 20c0-3.31 3.58-6 8-6s8 2.69 8 6" stroke="#939393" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span
          className="text-[10px] font-medium leading-[12px] text-[#939393]"
          style={{ fontFamily: 'Pretendard, sans-serif' }}
        >
          my
        </span>
      </Link>
    </nav>
  );
};

export default BottomNav;
