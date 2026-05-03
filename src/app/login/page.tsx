'use client';

import Link from 'next/link';
import { useState } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

const SNS_BUTTONS = [
  {
    id: 'kakao',
    label: '카카오 로그인',
    bg: '#FEE500',
    icon: (
      <svg width="17" height="16" viewBox="0 0 17 16" fill="none" aria-hidden="true">
        <path d="M8.5 0C3.81 0 0 3.13 0 7c0 2.48 1.64 4.66 4.12 5.89l-1.05 3.84a.3.3 0 0 0 .46.33l4.38-2.9c.19.01.39.02.59.02 4.69 0 8.5-3.13 8.5-7S13.19 0 8.5 0z" fill="#000000"/>
      </svg>
    ),
  },
  {
    id: 'naver',
    label: '네이버 로그인',
    bg: '#03C75A',
    icon: (
      <svg width="17" height="15" viewBox="0 0 17 15" fill="none" aria-hidden="true">
        <path d="M11.36 8.05L5.41 0H0v15h5.64V6.95L11.59 15H17V0h-5.64v8.05z" fill="#FFFFFF"/>
      </svg>
    ),
  },
  {
    id: 'facebook',
    label: '페이스북 로그인',
    bg: '#0C60F5',
    icon: (
      <svg width="8" height="16" viewBox="0 0 8 16" fill="none" aria-hidden="true">
        <path d="M5.2 16V8.7h2.5l.4-2.9H5.2V4c0-.8.2-1.4 1.4-1.4H8.2V.1C7.9 0 7 0 6 0 3.9 0 2.4 1.3 2.4 3.7v2.1H0v2.9h2.4V16h2.8z" fill="#FFFFFF"/>
      </svg>
    ),
  },
  {
    id: 'google',
    label: 'Google 로그인',
    bg: '#DCDCDC',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
  },
  {
    id: 'apple',
    label: 'Apple 로그인',
    bg: '#DCDCDC',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#000000" aria-hidden="true">
        <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
      </svg>
    ),
  },
];

const LoginPage = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [saveId, setSaveId] = useState(false);

  const isFormValid = userId.trim().length > 0 && password.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header title="로그인" />

      <form
        onSubmit={handleSubmit}
        className="flex flex-1 flex-col gap-[70px] px-4"
      >
        <div className="flex flex-col gap-[30px]">
          <div className="flex flex-col">
            <div className="flex flex-col gap-[5px]">
              <div className="flex flex-col">
                <div className="flex flex-col items-center gap-[10px]">
                  <div className="w-[343px]">
                    <input
                      type="text"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      placeholder="아이디"
                      className="h-[50px] w-full rounded-[40px] border border-[#C4C4C4] bg-[#FAFAFA] px-5 text-[16px] font-semibold leading-[140%] text-[#0A0A0B] placeholder-[#9D9D9D] outline-none transition-colors focus:border-[#F63237]"
                      style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
                      tabIndex={0}
                      aria-label="아이디 입력"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-[10px]">
                  <div className="w-[343px]">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="비밀번호"
                      className="h-[50px] w-full rounded-[40px] border border-[#C4C4C4] bg-[#FAFAFA] px-5 text-[16px] font-semibold leading-[140%] text-[#0A0A0B] placeholder-[#9D9D9D] outline-none transition-colors focus:border-[#F63237]"
                      style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
                      tabIndex={0}
                      aria-label="비밀번호 입력"
                    />
                  </div>
                </div>
              </div>

              <div className="px-4 py-2">
                <label className="flex cursor-pointer items-center gap-[7px]">
                  <button
                    type="button"
                    onClick={() => setSaveId(!saveId)}
                    className="flex h-5 w-5 items-center justify-center rounded-[4px] border border-[#C4C4C4] bg-white transition-colors"
                    tabIndex={0}
                    aria-label="아이디 저장"
                    aria-checked={saveId}
                    role="checkbox"
                  >
                    {saveId && (
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                        <path d="M3 7.5L6.5 11L12 4" stroke="#F63237" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                  <span
                    className="text-[14px] font-medium leading-[135%] text-black"
                    style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
                  >
                    아이디 저장
                  </span>
                </label>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <button
                type="submit"
                disabled={!isFormValid}
                className={`flex h-[52px] w-[343px] items-center justify-center rounded-[8px] text-[16px] font-semibold leading-[140%] text-white transition-all ${
                  isFormValid
                    ? 'bg-[#F63237] hover:bg-[#D42B2F] active:scale-[0.98]'
                    : 'cursor-not-allowed bg-[#D9D9D9]'
                }`}
                style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
                tabIndex={0}
                aria-label="로그인"
              >
                로그인
              </button>

              <div className="flex items-center gap-5 px-4 py-5">
                <Link
                  href="/signup"
                  className="text-center text-[14px] font-semibold leading-[140%] text-[#555555]"
                  style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
                  tabIndex={0}
                  aria-label="회원가입"
                >
                  회원가입
                </Link>
                <div className="h-[10px] w-px bg-[#B5B3B3]" />
                <button
                  type="button"
                  className="text-center text-[14px] font-semibold leading-[140%] text-[#555555]"
                  style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
                  tabIndex={0}
                  aria-label="아이디 찾기"
                >
                  아이디 찾기
                </button>
                <div className="h-[10px] w-px bg-[#B5B3B3]" />
                <button
                  type="button"
                  className="text-center text-[14px] font-semibold leading-[140%] text-[#555555]"
                  style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
                  tabIndex={0}
                  aria-label="비밀번호 찾기"
                >
                  비밀번호 찾기
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[30px]">
            <div className="flex flex-col">
              <div className="flex items-center justify-center px-4 py-5">
                <span
                  className="text-center text-[14px] font-semibold uppercase leading-[140%] text-[#555555]"
                  style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
                >
                  sns 계정으로 로그인하기
                </span>
              </div>
              <div className="flex items-center justify-center gap-5">
                {SNS_BUTTONS.map((sns) => (
                  <button
                    key={sns.id}
                    type="button"
                    className="flex h-11 w-11 items-center justify-center rounded-full transition-transform hover:scale-110 active:scale-95"
                    style={{ backgroundColor: sns.bg }}
                    tabIndex={0}
                    aria-label={sns.label}
                  >
                    {sns.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>

      <BottomNav />
    </main>
  );
};

export default LoginPage;
