'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

type TermItem = {
  id: string;
  label: string;
  required: boolean;
  hasDetail: boolean;
  detailType: 'link' | 'expand';
};

const TERMS: TermItem[] = [
  { id: 'service', label: '12cut 서비스 이용약관', required: true, hasDetail: true, detailType: 'link' },
  { id: 'privacy', label: '개인정보 처리방침', required: true, hasDetail: true, detailType: 'link' },
  { id: 'phone', label: '휴대폰 본인 확인 서비스', required: true, hasDetail: true, detailType: 'expand' },
  { id: 'marketing', label: '마케팅 정보 수신', required: false, hasDetail: true, detailType: 'link' },
];

const CheckIcon = ({ checked }: { checked: boolean }) => (
  <div
    className={`flex h-5 w-5 items-center justify-center rounded-[4px] border transition-colors ${
      checked ? 'border-[#F63237] bg-[#F63237]' : 'border-[#C4C4C4] bg-white'
    }`}
  >
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path
        d="M3 7.5L6.5 11L12 4"
        stroke={checked ? '#FFFFFF' : '#9D9D9D'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

const ChevronRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M9 6l6 6-6 6" stroke="#0A0A0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronDown = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 9l6 6 6-6" stroke="#0A0A0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TermsPage = () => {
  const router = useRouter();
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const allChecked = useMemo(
    () => TERMS.every((t) => checked[t.id]),
    [checked],
  );

  const allRequiredChecked = useMemo(
    () => TERMS.filter((t) => t.required).every((t) => checked[t.id]),
    [checked],
  );

  const handleToggleAll = () => {
    if (allChecked) {
      setChecked({});
    } else {
      const next: Record<string, boolean> = {};
      TERMS.forEach((t) => { next[t.id] = true; });
      setChecked(next);
    }
  };

  const handleToggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleNext = () => {
    if (!allRequiredChecked) return;
    router.push('/signup/form');
  };

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header title="회원가입" />

      <div className="flex flex-1 flex-col gap-[70px]">
        <div className="flex flex-col gap-[30px]">
          {/* Title */}
          <div className="flex flex-col gap-[40px]">
            <div className="px-4 pb-5">
              <p
                className="text-[24px] font-semibold leading-[140%] text-[#555555]"
                style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
              >
                12cut 이용을 위한{'\n'}
                약관에 <span className="text-[#F63237]">동의</span>해주세요.
              </p>
            </div>

            {/* Terms Checkboxes */}
            <div className="flex flex-col">
              <div className="flex flex-col gap-[5px] px-4">
                {/* All Agree */}
                <button
                  type="button"
                  onClick={handleToggleAll}
                  className="flex h-[50px] items-center gap-[10px] py-[10px]"
                  tabIndex={0}
                  aria-label="모든 약관에 동의하기"
                  aria-checked={allChecked}
                  role="checkbox"
                >
                  <CheckIcon checked={allChecked} />
                  <span
                    className="text-[16px] font-medium leading-[18px] text-black"
                    style={{ fontFamily: 'Pretendard, sans-serif' }}
                  >
                    모든 약관에 동의하기
                  </span>
                </button>

                {/* Separator */}
                <div className="h-px w-full bg-[#D9D9D9]" />

                {/* Individual Terms */}
                {TERMS.map((term) => (
                  <div
                    key={term.id}
                    className="flex h-[50px] items-center"
                  >
                    <button
                      type="button"
                      onClick={() => handleToggle(term.id)}
                      className="flex flex-1 items-center gap-[10px] py-[10px]"
                      tabIndex={0}
                      aria-label={`${term.required ? '(필수)' : '(선택)'} ${term.label}`}
                      aria-checked={!!checked[term.id]}
                      role="checkbox"
                    >
                      <CheckIcon checked={!!checked[term.id]} />
                      <span
                        className="text-[16px] font-medium leading-[18px] text-black"
                        style={{ fontFamily: 'Pretendard Variable, Pretendard, sans-serif' }}
                      >
                        ({term.required ? '필수' : '선택'}) {term.label}
                      </span>
                    </button>
                    {term.hasDetail && (
                      <button
                        type="button"
                        className="flex-shrink-0"
                        tabIndex={0}
                        aria-label={`${term.label} 상세 보기`}
                      >
                        {term.detailType === 'expand' ? <ChevronDown /> : <ChevronRight />}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Next Button */}
          <div className="flex justify-center px-4">
            <button
              type="button"
              onClick={handleNext}
              disabled={!allRequiredChecked}
              className={`flex h-[52px] w-[343px] items-center justify-center rounded-[8px] text-[16px] font-semibold leading-[140%] text-white transition-all ${
                allRequiredChecked
                  ? 'bg-[#F63237] hover:bg-[#D42B2F] active:scale-[0.98]'
                  : 'cursor-not-allowed bg-[#D9D9D9]'
              }`}
              style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
              tabIndex={0}
              aria-label="다음"
            >
              다음
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </main>
  );
};

export default TermsPage;
