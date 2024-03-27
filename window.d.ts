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

interface Product {
  sku: string;
  Price: number;
  VatPercentage: number;
  image: string;
  titles: string;
  names: string;
  tea_weight: string;
  tea_variant: string;
  tea_size: string;
  stock_amount: number;
  in_stock_date: string;
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
  preferredLocale: string;
  isAuthenticated: string;
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
  | "address_tag";

type CheckoutInfo = Partial<Record<CheckoutInfoField, string>> &
  Record<string, string>;

declare global {
  interface Window {
    paymentID: string; // defined in CheckoutKindness.astro
    checkoutKindnessLink: string; // defined in CheckoutShipping.astro

    regions: Regions; // defined in SetUserRegion.astro
    userRegion: string; // defined in SetUserRegion.astro (SetUserRegionDev.astro for dev)

    requestedLocale: string; // defined in TranslationNotFoundRedirect.astro
    preferredLocale: string; // defined in SetPreferredLocale.astro
    availableLocales: string[]; // defined in SetPreferredLocale.astro
    alternateURLs: { [locale: string]: string }; // defined in BaseLayout.astro
    shouldDisplayExperimentals: boolean; // defined in BaseLayout.astro

    toggleSidebar: () => void; // defined in Navbar.astro
    sidebarOpened: boolean; // defined in Navbar.astro
    profileMenuOpened: boolean; // defined in ProfileMenu.tsx
    localizationMenuOpened: boolean; // defined in Navbar.astro

    enableScrolling: () => void; // defined in Navbar.astro
    disableScrolling: () => void; // defined in Navbar.astro

    productPrice: number; // defined in ProductDetails.astro
    productVatPercentage: number; // defined in ProductDetails.astro

    products: Record<string, Product>; // defined in CartStore.astro
    getPriceIncludingTax: GetPriceIncludingTax; // defined in getPriceIncludingTax.ts; declared in CartStore.astro

    cart: Cart; // defined in CartStore.astro
    cookies: Cookies; // defined in Cookies.astro
    checkoutInfo: CheckoutInfo; // defined in CartStore.astro
    crowdfundingInfo: crowdfundingInfo; // defined in crowdfundingPayment.astro
    openCart: () => void; // defined in CartOverlay.astro
    updateCartOverlay: (id: string) => void; // defined in CartOverlay.astro
    addProductToCart: (sku: string, quantity?: number) => void; // defined in CartStore.astro
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

    hideAllPaymentInfo: () => void; // defined in CheckoutPayment.astro
    togglePaymentCardVisibility: (selectedCountry: string) => void; // defined in CheckoutPayment.astro
  }
}
