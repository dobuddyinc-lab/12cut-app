const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;
const SHOPIFY_PRIVATE_TOKEN = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN;
const API_VERSION = process.env.SHOPIFY_API_VERSION || '2025-01';

type ShopifyFetchOptions = {
  query: string;
  variables?: Record<string, unknown>;
  isServer?: boolean;
};

export const shopifyFetch = async <T>({
  query,
  variables = {},
  isServer = false,
}: ShopifyFetchOptions): Promise<T> => {
  const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/${API_VERSION}/graphql.json`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (isServer && SHOPIFY_PRIVATE_TOKEN) {
    headers['Shopify-Storefront-Private-Token'] = SHOPIFY_PRIVATE_TOKEN;
  } else {
    headers['X-Shopify-Storefront-Access-Token'] = SHOPIFY_STOREFRONT_TOKEN;
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  if (json.errors) {
    console.error('Shopify API errors:', JSON.stringify(json.errors));
    throw new Error(json.errors[0]?.message || 'Shopify API error');
  }

  return json.data as T;
};

export const VARIANT_IDS: Record<string, string> = {
  single: process.env.NEXT_PUBLIC_VARIANT_SINGLE!,
  same2: process.env.NEXT_PUBLIC_VARIANT_SAME2!,
  mix2: process.env.NEXT_PUBLIC_VARIANT_MIX2!,
};

export const PLAN_INFO: Record<string, { name: string; price: number; description: string }> = {
  single: { name: '12컷 × 1', price: 50000, description: '12컷 슬라이드 필름 1세트 + 빈티지 뷰어 1개' },
  same2: { name: 'Same Story × 2', price: 90000, description: '동일 12컷 슬라이드 필름 2세트 + 빈티지 뷰어 2개' },
  mix2: { name: 'Two Stories', price: 140000, description: '서로 다른 12컷 슬라이드 필름 2세트 + 빈티지 뷰어 2개' },
};

export type Plan = keyof typeof VARIANT_IDS;

export type CartCreateResponse = {
  cartCreate: {
    cart: {
      id: string;
      checkoutUrl: string;
      lines: {
        edges: Array<{
          node: {
            id: string;
            quantity: number;
            merchandise: {
              id: string;
              title: string;
              product: { title: string };
              price: { amount: string; currencyCode: string };
            };
          };
        }>;
      };
    };
    userErrors: Array<{ field: string[]; message: string }>;
  };
};

export type ProductsResponse = {
  products: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        handle: string;
        description: string;
        variants: {
          edges: Array<{
            node: {
              id: string;
              title: string;
              price: { amount: string; currencyCode: string };
            };
          }>;
        };
        images: {
          edges: Array<{
            node: {
              url: string;
              altText: string | null;
            };
          }>;
        };
      };
    }>;
  };
};

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product { title }
                  price { amount currencyCode }
                }
              }
            }
          }
        }
      }
      userErrors { field message }
    }
  }
`;

const GET_PRODUCTS_QUERY = `
  query getProducts {
    products(first: 10) {
      edges {
        node {
          id
          title
          handle
          description
          variants(first: 5) {
            edges {
              node {
                id
                title
                price { amount currencyCode }
              }
            }
          }
          images(first: 3) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;

export const createCart = async (
  variantId: string,
  quantity = 1,
): Promise<CartCreateResponse> => {
  return shopifyFetch<CartCreateResponse>({
    query: CART_CREATE_MUTATION,
    variables: {
      input: {
        lines: [{ merchandiseId: variantId, quantity }],
      },
    },
    isServer: true,
  });
};

export const getProducts = async (): Promise<ProductsResponse> => {
  return shopifyFetch<ProductsResponse>({
    query: GET_PRODUCTS_QUERY,
    isServer: true,
  });
};
