'use server';

import { createCart, VARIANT_IDS, type Plan } from '@/lib/shopify';
import { redirect } from 'next/navigation';

export const handleCheckout = async (formData: FormData) => {
  const plan = (formData.get('plan') as Plan) || 'single';
  const variantId = VARIANT_IDS[plan];

  if (!variantId) {
    throw new Error(`Unknown plan: ${plan}`);
  }

  const data = await createCart(variantId);

  if (data.cartCreate.userErrors.length > 0) {
    console.error('Cart errors:', data.cartCreate.userErrors);
    throw new Error(data.cartCreate.userErrors[0].message);
  }

  redirect(data.cartCreate.cart.checkoutUrl);
};
