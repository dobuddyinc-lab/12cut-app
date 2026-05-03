'use client';

import { Suspense, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { createCart, VARIANT_IDS, type Plan } from '@/lib/shopify';

const PLAN_INFO: Record<string, { name: string; price: number; description: string; shippingFee: number }> = {
  single: { name: '12컷 × 1', price: 50000, description: '12컷 슬라이드 필름 1세트 + 빈티지 뷰어 1개', shippingFee: 2500 },
  same2: { name: 'Same Story × 2', price: 90000, description: '동일 12컷 슬라이드 필름 2세트 + 빈티지 뷰어 2개', shippingFee: 0 },
  mix2: { name: 'Two Stories', price: 140000, description: '서로 다른 12컷 슬라이드 필름 2세트 + 빈티지 뷰어 2개', shippingFee: 0 },
};

const SHIPPING_INFO = [
  { label: '배송 업체', value: '우체국 택배' },
  { label: '배송 기간', value: '주문 제작 제품으로 제작일 포함 약 2~4일 (단체 및 대량 주문 시 제작 일정 상담 후 진행)' },
  { label: '묶음 배송', value: '당일 주문에 한해서 배송지, 수취인, 연락처가 동일한 경우\n(주문과 입금일자가 다른 경우 묶음 배송 불가)' },
  { label: '배송비', value: '2,500원 (50,000원 이상 무료 배송)' },
];

const formatPrice = (price: number): string =>
  price.toLocaleString('ko-KR') + '원';

const CartPage = () => {
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan') || 'single';
  const info = PLAN_INFO[plan] ?? PLAN_INFO.single;

  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalProduct = useMemo(() => info.price * quantity, [info.price, quantity]);
  const totalShipping = info.shippingFee;
  const totalPayment = totalProduct + totalShipping;

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleOrder = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const variantId = VARIANT_IDS[plan as Plan];
      if (!variantId) throw new Error(`Unknown plan: ${plan}`);

      const data = await createCart(variantId, quantity);

      if (data.cartCreate.userErrors.length > 0) {
        throw new Error(data.cartCreate.userErrors[0].message);
      }

      window.location.href = data.cartCreate.cart.checkoutUrl;
    } catch (err) {
      console.error('Checkout failed:', err);
      setError('체크아웃 생성에 실패했습니다. 다시 시도해주세요.');
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header title="장바구니" />

      <div className="flex flex-1 flex-col overflow-y-auto">
        {/* Plan Selector */}
        <div className="flex gap-2 overflow-x-auto px-4 py-3">
          {Object.entries(PLAN_INFO).map(([key, p]) => (
            <a
              key={key}
              href={`/cart?plan=${key}`}
              className={`flex-shrink-0 rounded-full border px-4 py-2 text-[12px] font-semibold transition-colors ${
                plan === key
                  ? 'border-[#F63237] bg-[#F63237] text-white'
                  : 'border-[#C4C4C4] bg-white text-[#555555] hover:border-[#999]'
              }`}
              style={{ fontFamily: 'Pretendard, sans-serif' }}
              tabIndex={0}
              aria-label={p.name}
            >
              {p.name}
            </a>
          ))}
        </div>

        {/* Cart Item */}
        <div className="flex gap-3 border-t border-[#E5E5E5] px-4 py-4">
          {/* Thumbnail */}
          <div className="h-[100px] w-[100px] flex-shrink-0 overflow-hidden rounded-[8px] bg-gradient-to-br from-[#F0F0F0] to-[#E0E0E0]">
            <div className="flex h-full w-full items-center justify-center">
              <span
                className="text-[14px] font-bold text-[#999]"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                12CUT
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-1 flex-col justify-between">
            <div className="flex flex-col gap-1">
              <span
                className="text-[14px] font-semibold leading-[140%] text-black"
                style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
              >
                {info.name}
              </span>
              <span
                className="text-[12px] font-medium leading-[140%] text-[#9D9D9D]"
                style={{ fontFamily: 'Pretendard, sans-serif' }}
              >
                {info.description}
              </span>
              <span
                className="text-[12px] font-medium leading-[140%] text-[#9D9D9D]"
                style={{ fontFamily: 'Pretendard, sans-serif' }}
              >
                배송비: {totalShipping > 0 ? formatPrice(totalShipping) : '무료'}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              {/* Quantity */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(-1)}
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-black/20"
                  tabIndex={0}
                  aria-label="수량 감소"
                >
                  <svg width="10" height="2" viewBox="0 0 10 2" fill="none" aria-hidden="true">
                    <path d="M0 1h10" stroke="#000" strokeWidth="1.5"/>
                  </svg>
                </button>
                <span
                  className="min-w-[16px] text-center text-[14px] font-medium text-black"
                  style={{ fontFamily: 'Pretendard, sans-serif' }}
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(1)}
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-black/20"
                  tabIndex={0}
                  aria-label="수량 증가"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M0 5h10M5 0v10" stroke="#000" strokeWidth="1.5"/>
                  </svg>
                </button>
              </div>
              {/* Price */}
              <span
                className="text-[16px] font-bold leading-[140%] text-black"
                style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
              >
                {formatPrice(totalProduct)}
              </span>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="mx-4 mt-4 rounded-[15px] border border-black p-4 shadow-sm">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-medium text-[#9D9D9D]" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                주문 건수
              </span>
              <span className="text-[14px] font-semibold text-[#9D9D9D]" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                {quantity} 개
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-medium text-[#9D9D9D]" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                총 상품 금액
              </span>
              <span className="text-[14px] font-semibold text-[#9D9D9D]" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                {formatPrice(totalProduct)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-medium text-[#9D9D9D]" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                총 배송비
              </span>
              <span className="text-[14px] font-semibold text-[#9D9D9D]" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                {totalShipping > 0 ? formatPrice(totalShipping) : '무료'}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-[#E5E5E5] pt-3">
              <span className="text-[14px] font-bold text-[#9D9D9D]" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                결제예정금액
              </span>
              <span className="text-[18px] font-bold text-[#F63237]" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                {formatPrice(totalPayment)}
              </span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-4 mt-3 rounded-[8px] bg-red-50 p-3 text-center text-[14px] font-medium text-[#F63237]">
            {error}
          </div>
        )}

        {/* Order Button */}
        <div className="px-4 py-4">
          <button
            type="button"
            onClick={handleOrder}
            disabled={isLoading}
            className={`flex h-[52px] w-full items-center justify-center rounded-[8px] text-[16px] font-semibold text-white transition-all ${
              isLoading
                ? 'cursor-wait bg-[#D9D9D9]'
                : 'bg-[#F63237] hover:bg-[#D42B2F] active:scale-[0.98]'
            }`}
            style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
            tabIndex={0}
            aria-label="결제하기"
          >
            {isLoading ? '처리 중...' : `${formatPrice(totalPayment)} 결제하기`}
          </button>
        </div>

        {/* Shipping Info */}
        <section className="border-t border-[#E5E5E5] px-4 py-5">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M16 3H1v13h15V3zM16 8h4l3 3v5h-7V8zM5.5 21a2 2 0 100-4 2 2 0 000 4zM18.5 21a2 2 0 100-4 2 2 0 000 4z" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span
                className="text-[16px] font-bold text-black"
                style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
              >
                배송 정보
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {SHIPPING_INFO.map((info) => (
                <div key={info.label} className="flex gap-3">
                  <span
                    className="w-[70px] flex-shrink-0 text-[12px] font-semibold text-[#555555]"
                    style={{ fontFamily: 'Pretendard, sans-serif' }}
                  >
                    {info.label}
                  </span>
                  <span
                    className="flex-1 whitespace-pre-line text-[12px] font-medium text-[#555555]"
                    style={{ fontFamily: 'Pretendard, sans-serif' }}
                  >
                    {info.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <BottomNav />
    </main>
  );
};

const CartPageWrapper = () => (
  <Suspense fallback={
    <main className="flex min-h-screen items-center justify-center bg-white">
      <span className="text-[14px] text-[#9D9D9D]">로딩 중...</span>
    </main>
  }>
    <CartPage />
  </Suspense>
);

export default CartPageWrapper;
