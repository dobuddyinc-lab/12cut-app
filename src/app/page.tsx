'use client';

import { useEffect } from 'react';

const LANDING_URL = process.env.NEXT_PUBLIC_LANDING_URL || 'https://12cut.pages.dev';

const Home = () => {
  useEffect(() => {
    window.location.href = LANDING_URL;
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-white">
      <span className="text-[14px] text-[#9D9D9D]">리다이렉트 중...</span>
    </main>
  );
};

export default Home;
