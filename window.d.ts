import type { GetPriceIncludingTax } from "@utils/shared/getPriceIncludingTax";

export {};

type Regions = {
  [regionCode: string]: string;
};

interface CartProduct {
  image: string;
  names: string;
  price: number;
  quantity: number;
  tax: number;
  sku: string;
  tea_size: string!;
  tea_variant: string!;
  [key: string]: string | number;
}

type Cart = {
  tax: string;
  shippingCost: string;
  subTotal: string;
  total: string;
  updateUI: (cart: Cart) => void;
} & Record<string, Partial<CartProduct>>;

type Cookies = {
  country: string;
  [key: string]: string;
};

type CheckoutInfoField =
  | "first_name"
  | "last_name"
  | "email"
  | "city"
  | "country"
  | "postal_code"
  | "street"
  | "delivery_address"
  | "shipping_method"
  | "shipping_cost"
  | "kindness_cause";

type CheckoutInfo = Partial<Record<CheckoutInfoField, string>> &
  Record<string, string>;

declare global {
  interface Window {
    paymentID: string; // defined in CheckoutKindness.astro
    checkoutSuccessLink: string; // defined in CheckoutKindness.astro
    checkoutKindnessLink: string; // defined in CheckoutShipping.astro

    regions: Regions; // defined in SetUserRegion.astro
    userRegion: string; // defined in SetUserRegion.astro (SetUserRegionDev.astro for dev)

    requestedLocale: string; // defined in TranslationNotFoundRedirect.astro
    preferredLocale: string; // defined in SetPreferredLocale.astro
    availableLocales: string[]; // defined in SetPreferredLocale.astro
    alternateURLs: { [locale: string]: string }; // defined in BaseLayout.astro
    shouldDisplayExperimentals: boolean; // defined in BaseLayout.astro

    enableScrolling: () => void; // defined in Navbar.astro
    disableScrolling: () => void; // defined in Navbar.astro

    productPrice: number; // defined in ProductDetails.astro
    productVatPercentage: number; // defined in ProductDetails.astro

    getPriceIncludingTax: GetPriceIncludingTax; // defined in getPriceIncludingTax.ts; declared in CartStore.astro

    cart: Cart; // defined in CartStore.astro
    cookies: Cookies; // defined in Cookies.astro
    checkoutInfo: CheckoutInfo; // defined in CartStore.astro
    openCart: () => void; // defined in CartOverlay.astro
    addProductToCart: (id: string) => void; // defined in CartOverlay.astro
    replacePlaceholders: (
      content: string,
      data: Record<string, string | number>,
    ) => string; // defined in CartStore.astro

    listenToInputEvents: (
      tweakBtns: NodeListOf<HTMLButtonElement>,
      input: HTMLInputElement,
    ) => void; // defined in CartOverlay.astro

    removeTopNotification: (notification: HTMLElement) => void; // defined in NotificationAnimations.astro
    slideOutTopNotification: (notification: HTMLElement) => void; // defined in NotificationAnimations.astro
  }
}
