export {};

interface CartProduct {
  image: string;
  names: string;
  price: number;
  quantity: number;
  tax: number;
  sku: string;
  tea_size: string;
  tea_variant: string;
}

declare global {
  interface Window {
    companyName: string; // defined in CheckoutShipping.astro

    requestedLocale: string; // defined in TranslationNotFoundRedirect.astro
    preferredLocale: string; // defined in SetPreferredLocale.astro (Layout.astro for 404)
    availableLocales: string[]; // defined in SetPreferredLocale.astro (Layout.astro for 404)

    enableScrolling: () => void; // defined in Navbar.astro
    disableScrolling: () => void; // defined in Navbar.astro

    baseProductTitle: string; // defined in ProductDetails.astro

    cart: Record<string, CartProduct>; // defined in CartStore.astro
    checkoutInfo: Record<string, string>; // defined in CartStore.astro
    openCart: () => void; // defined in CartOverlay.astro
    addProductToCart: (id: string) => void; // defined in CartOverlay.astro
    replacePlaceholders: (
      content: string,
      data: Record<string, string | number>
    ) => string; // defined in CartStore.astro

    listenToInputEvents: (
      tweakBtns: NodeListOf<HTMLButtonElement>,
      input: HTMLInputElement
    ) => void; // defined in CartOverlay.astro

    removeTopNotification: (notification: HTMLElement) => void; // defined in NotificationAnimations.astro
    slideOutTopNotification: (notification: HTMLElement) => void; // defined in NotificationAnimations.astro
  }
}
