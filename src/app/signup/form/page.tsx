'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

type FormField = {
  id: string;
  label: string;
  required: boolean;
  type: string;
  placeholder: string;
  caption?: string;
};

const FORM_FIELDS: FormField[] = [
  {
    id: 'userId',
    label: '아이디',
    required: true,
    type: 'text',
    placeholder: '아이디',
    caption: '(영문소문자/숫자, 4~16자)',
  },
  {
    id: 'password',
    label: '비밀번호',
    required: true,
    type: 'password',
    placeholder: '비밀번호',
    caption: '(영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10자~16자)',
  },
  {
    id: 'passwordConfirm',
    label: '비밀번호 확인',
    required: true,
    type: 'password',
    placeholder: '비밀번호',
  },
  {
    id: 'name',
    label: '이름',
    required: true,
    type: 'text',
    placeholder: '이름',
  },
  {
    id: 'email',
    label: '이메일',
    required: true,
    type: 'email',
    placeholder: '이메일',
  },
];

const SignupFormPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [emailConsent, setEmailConsent] = useState(false);
  const [smsConsent, setSmsConsent] = useState(false);

  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const isFormValid = useMemo(() => {
    const requiredFields = ['userId', 'password', 'passwordConfirm', 'name', 'email', 'phone', 'zipcode', 'address'];
    return requiredFields.every((field) => formData[field]?.trim());
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    router.push('/login');
  };

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header title="회원가입" />

      <form
        onSubmit={handleSubmit}
        className="flex flex-1 flex-col gap-[30px] overflow-y-auto px-4 pb-4"
      >
        {/* Form Fields */}
        <div className="flex flex-col gap-[100px]">
          <div className="flex flex-col">
            <div className="flex flex-col gap-[30px]">
              {FORM_FIELDS.map((field) => (
                <div key={field.id} className="flex flex-col">
                  <div className="flex flex-col">
                    <div className="flex flex-col gap-[10px]">
                      {/* Label */}
                      <div className="flex items-center gap-[5px]">
                        <span
                          className="text-[14px] font-semibold leading-[135%] text-black"
                          style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
                        >
                          {field.label}
                          {field.required && <span className="text-[#F63237]"> *</span>}
                        </span>
                      </div>
                      {/* Input */}
                      <input
                        type={field.type}
                        value={formData[field.id] ?? ''}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        className="h-[50px] w-full rounded-[40px] border border-[#C4C4C4] bg-[#FAFAFA] px-5 text-[16px] font-semibold leading-[140%] text-[#0A0A0B] placeholder-[#9D9D9D] outline-none transition-colors focus:border-[#F63237]"
                        style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
                        tabIndex={0}
                        aria-label={field.label}
                      />
                      {/* Caption */}
                      {field.caption && (
                        <span
                          className="text-[10px] font-medium leading-[12px] text-[#C4C4C4]"
                          style={{ fontFamily: 'Pretendard, sans-serif' }}
                        >
                          {field.caption}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Email consent checkbox */}
                  {field.id === 'email' && (
                    <div className="mt-2 px-4">
                      <label className="flex cursor-pointer items-center gap-[7px]">
                        <button
                          type="button"
                          onClick={() => setEmailConsent(!emailConsent)}
                          className={`flex h-5 w-5 items-center justify-center rounded-[4px] border transition-colors ${
                            emailConsent ? 'border-[#F63237] bg-[#F63237]' : 'border-[#C4C4C4] bg-white'
                          }`}
                          tabIndex={0}
                          aria-label="정보/이벤트 메일 수신 동의"
                          aria-checked={emailConsent}
                          role="checkbox"
                        >
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                            <path d="M3 7.5L6.5 11L12 4" stroke={emailConsent ? '#FFFFFF' : '#9D9D9D'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        <span
                          className="text-[14px] font-medium leading-[135%] text-black"
                          style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
                        >
                          정보/이벤트 메일 수신에 동의합니다.
                        </span>
                      </label>
                    </div>
                  )}
                </div>
              ))}

              {/* Phone Number */}
              <div className="flex flex-col gap-[10px]">
                <div className="flex items-center gap-[5px]">
                  <span
                    className="text-[14px] font-semibold leading-[135%] text-black"
                    style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
                  >
                    휴대폰 번호<span className="text-[#F63237]"> *</span>
                  </span>
                </div>
                <input
                  type="tel"
                  value={formData.phone ?? ''}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="-없이 입력하세요."
                  className="h-[50px] w-full rounded-[40px] border border-[#C4C4C4] bg-[#FAFAFA] px-5 text-[16px] font-semibold leading-[140%] text-[#0A0A0B] placeholder-[#9D9D9D] outline-none transition-colors focus:border-[#F63237]"
                  style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
                  tabIndex={0}
                  aria-label="휴대폰 번호"
                />
                <div className="px-4">
                  <label className="flex cursor-pointer items-center gap-[7px]">
                    <button
                      type="button"
                      onClick={() => setSmsConsent(!smsConsent)}
                      className={`flex h-5 w-5 items-center justify-center rounded-[4px] border transition-colors ${
                        smsConsent ? 'border-[#F63237] bg-[#F63237]' : 'border-[#C4C4C4] bg-white'
                      }`}
                      tabIndex={0}
                      aria-label="정보/이벤트 SMS 수신 동의"
                      aria-checked={smsConsent}
                      role="checkbox"
                    >
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                        <path d="M3 7.5L6.5 11L12 4" stroke={smsConsent ? '#FFFFFF' : '#9D9D9D'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <span
                      className="text-[14px] font-medium leading-[135%] text-black"
                      style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
                    >
                      정보/이벤트 sms 수신에 동의합니다.
                    </span>
                  </label>
                </div>
              </div>

              {/* Address */}
              <div className="flex flex-col gap-[10px]">
                <div className="flex items-center gap-[5px]">
                  <span
                    className="text-[14px] font-semibold leading-[135%] text-black"
                    style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
                  >
                    주소<span className="text-[#F63237]"> *</span>
                  </span>
                </div>
                {/* Zipcode + Search */}
                <div className="flex items-center gap-[10px]">
                  <input
                    type="text"
                    value={formData.zipcode ?? ''}
                    onChange={(e) => handleChange('zipcode', e.target.value)}
                    placeholder="우편번호"
                    className="h-[50px] flex-1 rounded-[40px] border border-[#C4C4C4] bg-[#FAFAFA] px-5 text-[16px] font-semibold leading-[140%] text-[#0A0A0B] placeholder-[#9D9D9D] outline-none transition-colors focus:border-[#F63237]"
                    style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
                    tabIndex={0}
                    aria-label="우편번호"
                  />
                  <button
                    type="button"
                    className="flex h-[40px] items-center justify-center rounded-[50px] border border-[#555555] px-4"
                    tabIndex={0}
                    aria-label="주소찾기"
                  >
                    <span
                      className="whitespace-nowrap text-[12px] font-semibold leading-[140%] text-[#555555]"
                      style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
                    >
                      주소찾기
                    </span>
                  </button>
                </div>
                {/* Address */}
                <input
                  type="text"
                  value={formData.address ?? ''}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="주소"
                  className="h-[50px] w-full rounded-[40px] border border-[#C4C4C4] bg-[#FAFAFA] px-5 text-[16px] font-semibold leading-[140%] text-[#0A0A0B] placeholder-[#9D9D9D] outline-none transition-colors focus:border-[#F63237]"
                  style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
                  tabIndex={0}
                  aria-label="주소"
                />
                {/* Detail Address */}
                <input
                  type="text"
                  value={formData.addressDetail ?? ''}
                  onChange={(e) => handleChange('addressDetail', e.target.value)}
                  placeholder="상세주소"
                  className="h-[50px] w-full rounded-[40px] border border-[#C4C4C4] bg-[#FAFAFA] px-5 text-[16px] font-semibold leading-[140%] text-[#0A0A0B] placeholder-[#9D9D9D] outline-none transition-colors focus:border-[#F63237]"
                  style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
                  tabIndex={0}
                  aria-label="상세주소"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pb-4">
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
            aria-label="가입하기"
          >
            가입하기
          </button>
        </div>
      </form>

      <BottomNav />
    </main>
  );
};

export default SignupFormPage;
