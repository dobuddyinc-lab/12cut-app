'use client';

import { useRouter } from 'next/navigation';

type HeaderProps = {
  title: string;
  showBack?: boolean;
};

const Header = ({ title, showBack = true }: HeaderProps) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <header className="flex h-[54px] items-center justify-between px-[14px] pl-[11px]">
      {showBack ? (
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-[15px]"
          tabIndex={0}
          aria-label="뒤로 가기"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 19l-7-7 7-7" stroke="#0A0A0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      ) : (
        <div className="w-6" />
      )}
      <h1
        className="text-center text-[20px] font-semibold leading-[30px] text-[#0A0A0B]"
        style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.04em' }}
      >
        {title}
      </h1>
      <div className="w-6" />
    </header>
  );
};

export default Header;
