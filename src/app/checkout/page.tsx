'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

type OrderItem = {
  id: string;
  name: string;
  color: string;
  colorHex: string;
  price: number;
  quantity: number;
  shippingFee: number;
};

const ORDER_ITEMS: OrderItem[] = [
  { id: '1', name: '12cut. red', color: '색상', colorHex: '#E74C3C', price: 50000, quantity: 1, shippingFee: 2500 },
];

const formatPrice = (price: number): string =>
  price.toLocaleString('ko-KR') + '원';

const SectionTitle = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
  <div className="flex items-center gap-2 pb-4">
    {icon}
    <span
      className="text-[16px] font-bold text-black"
      style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
    >
      {title}
    </span>
  </div>
);

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    receiverName: '',
    receiverPhone: '',
    zipcode: '',
    address: '',
    addressDetail: '',
    memo: '배송 전 연락 바랍니다.',
  });

  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const totalProduct = ORDER_ITEMS.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalShipping = ORDER_ITEMS.reduce((sum, item) => sum + item.shippingFee, 0);
  const totalPayment = totalProduct + totalShipping;

  const PAYMENT_METHODS = [
    { id: 'card', label: '신용카드' },
    { id: 'bank', label: '무통장 입금' },
    { id: 'phone', label: '핸드폰 결제' },
    { id: 'kakao', label: '카카오페이' },
    { id: 'naver', label: '네이버페이' },
  ];

  const handleSubmit = () => {
    // Shopify checkout redirect
  };

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header title="주문/결제" />

      <div className="flex flex-1 flex-col overflow-y-auto">
        {/* Order Items */}
        <section className="border-b border-[#E5E5E5] px-4 py-5">
          <SectionTitle
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
            title="주문 상품"
          />
          {ORDER_ITEMS.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="h-[80px] w-[80px] flex-shrink-0 rounded-[8px] bg-gradient-to-br from-[#F0F0F0] to-[#E0E0E0]">
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-[10px] text-[#999]">12CUT</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <span
                  className="text-[14px] font-semibold text-black"
                  style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
                >
                  {item.name}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-[12px] font-medium text-[#9D9D9D]">{item.color}</span>
                  <div className="h-3 w-3 rounded-full border border-[#00000010]" style={{ backgroundColor: item.colorHex }} />
                </div>
                <span className="text-[12px] font-medium text-[#9D9D9D]">수량: {item.quantity}개</span>
                <span
                  className="text-[16px] font-bold text-black"
                  style={{ fontFamily: 'Pretendard, sans-serif' }}
                >
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            </div>
          ))}
        </section>

        {/* Shipping Address */}
        <section className="border-b border-[#E5E5E5] px-4 py-5">
          <SectionTitle
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M16 3H1v13h15V3zM16 8h4l3 3v5h-7V8zM5.5 21a2 2 0 100-4 2 2 0 000 4zM18.5 21a2 2 0 100-4 2 2 0 000 4z" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
            title="배송지 정보"
          />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label
                className="text-[14px] font-semibold text-black"
                style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
              >
                받는 사람<span className="text-[#F63237]"> *</span>
              </label>
              <input
                type="text"
                value={formData.receiverName}
                onChange={(e) => handleChange('receiverName', e.target.value)}
                placeholder="이름"
                className="h-[50px] w-full rounded-[40px] border border-[#C4C4C4] bg-[#FAFAFA] px-5 text-[16px] font-semibold text-[#0A0A0B] placeholder-[#9D9D9D] outline-none transition-colors focus:border-[#F63237]"
                style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
                tabIndex={0}
                aria-label="받는 사람 이름"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-[14px] font-semibold text-black"
                style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
              >
                연락처<span className="text-[#F63237]"> *</span>
              </label>
              <input
                type="tel"
                value={formData.receiverPhone}
                onChange={(e) => handleChange('receiverPhone', e.target.value)}
                placeholder="-없이 입력하세요."
                className="h-[50px] w-full rounded-[40px] border border-[#C4C4C4] bg-[#FAFAFA] px-5 text-[16px] font-semibold text-[#0A0A0B] placeholder-[#9D9D9D] outline-none transition-colors focus:border-[#F63237]"
                style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
                tabIndex={0}
                aria-label="연락처"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-[14px] font-semibold text-black"
                style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
              >
                배송지<span className="text-[#F63237]"> *</span>
              </label>
              <div className="flex items-center gap-[10px]">
                <input
                  type="text"
                  value={formData.zipcode}
                  onChange={(e) => handleChange('zipcode', e.target.value)}
                  placeholder="우편번호"
                  className="h-[50px] flex-1 rounded-[40px] border border-[#C4C4C4] bg-[#FAFAFA] px-5 text-[16px] font-semibold text-[#0A0A0B] placeholder-[#9D9D9D] outline-none transition-colors focus:border-[#F63237]"
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
                    className="whitespace-nowrap text-[12px] font-semibold text-[#555555]"
                    style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
                  >
                    주소찾기
                  </span>
                </button>
              </div>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="주소"
                className="h-[50px] w-full rounded-[40px] border border-[#C4C4C4] bg-[#FAFAFA] px-5 text-[16px] font-semibold text-[#0A0A0B] placeholder-[#9D9D9D] outline-none transition-colors focus:border-[#F63237]"
                style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
                tabIndex={0}
                aria-label="주소"
              />
              <input
                type="text"
                value={formData.addressDetail}
                onChange={(e) => handleChange('addressDetail', e.target.value)}
                placeholder="상세주소"
                className="h-[50px] w-full rounded-[40px] border border-[#C4C4C4] bg-[#FAFAFA] px-5 text-[16px] font-semibold text-[#0A0A0B] placeholder-[#9D9D9D] outline-none transition-colors focus:border-[#F63237]"
                style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
                tabIndex={0}
                aria-label="상세주소"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-[14px] font-semibold text-black"
                style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
              >
                배송 메모
              </label>
              <select
                value={formData.memo}
                onChange={(e) => handleChange('memo', e.target.value)}
                className="h-[50px] w-full appearance-none rounded-[40px] border border-[#C4C4C4] bg-[#FAFAFA] px-5 text-[16px] font-semibold text-[#0A0A0B] outline-none transition-colors focus:border-[#F63237]"
                style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
                tabIndex={0}
                aria-label="배송 메모"
              >
                <option value="배송 전 연락 바랍니다.">배송 전 연락 바랍니다.</option>
                <option value="부재 시 경비실에 맡겨주세요.">부재 시 경비실에 맡겨주세요.</option>
                <option value="문 앞에 놓아주세요.">문 앞에 놓아주세요.</option>
                <option value="">직접 입력</option>
              </select>
            </div>
          </div>
        </section>

        {/* Payment Method */}
        <section className="border-b border-[#E5E5E5] px-4 py-5">
          <SectionTitle
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="1" y="4" width="22" height="16" rx="2" stroke="#000" strokeWidth="1.5"/>
                <path d="M1 10h22" stroke="#000" strokeWidth="1.5"/>
              </svg>
            }
            title="결제 수단"
          />
          <div className="flex flex-col gap-3">
            {PAYMENT_METHODS.map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => setPaymentMethod(method.id)}
                className="flex items-center gap-3"
                tabIndex={0}
                aria-label={method.label}
                role="radio"
                aria-checked={paymentMethod === method.id}
              >
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
                    paymentMethod === method.id ? 'border-[#F63237]' : 'border-[#C4C4C4]'
                  }`}
                >
                  {paymentMethod === method.id && (
                    <div className="h-2.5 w-2.5 rounded-full bg-[#F63237]" />
                  )}
                </div>
                <span
                  className="text-[14px] font-medium text-black"
                  style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
                >
                  {method.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Payment Summary */}
        <section className="px-4 py-5">
          <SectionTitle
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
            title="결제 금액"
          />
          <div className="rounded-[15px] border border-black p-4 shadow-sm">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-medium text-[#9D9D9D]" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                  상품 금액
                </span>
                <span className="text-[14px] font-semibold text-[#9D9D9D]" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                  {formatPrice(totalProduct)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-medium text-[#9D9D9D]" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                  배송비
                </span>
                <span className="text-[14px] font-semibold text-[#9D9D9D]" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                  {formatPrice(totalShipping)}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-[#E5E5E5] pt-3">
                <span className="text-[14px] font-bold text-[#9D9D9D]" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                  총 결제 금액
                </span>
                <span className="text-[18px] font-bold text-[#F63237]" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                  {formatPrice(totalPayment)}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Submit Button */}
        <div className="px-4 pb-6">
          <button
            type="button"
            onClick={handleSubmit}
            className="flex h-[52px] w-full items-center justify-center rounded-[8px] bg-[#F63237] text-[16px] font-semibold text-white transition-all hover:bg-[#D42B2F] active:scale-[0.98]"
            style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
            tabIndex={0}
            aria-label="결제하기"
          >
            {formatPrice(totalPayment)} 결제하기
          </button>
        </div>
      </div>

      <BottomNav />
    </main>
  );
};

export default CheckoutPage;
