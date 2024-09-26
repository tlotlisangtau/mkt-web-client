// global.d.ts
declare global {
  interface Window {
    fbAsyncInit: () => void;
  }
  const FB: {
    init: (options: {
      appId: string;
      cookie: boolean;
      xfbml: boolean;
      version: string;
    }) => void;
    login: (
      callback: (response: any) => void,
      options?: { scope: string }
    ) => void;
    getLoginStatus: (callback: (response: any) => void) => void;
  };
}
export {};


// src/types/global.d.ts
export {};

declare global {
  interface Window {
    google: any; // You can replace `any` with a more specific type if available
  }
}

declare namespace google {
  namespace accounts {
    namespace id {
      interface CredentialResponse {
        credential: string;
      }
      function initialize(options: {
        client_id: string;
        callback: (response: CredentialResponse) => void;
      }): void;
      function renderButton(
        parent: HTMLElement,
        options: { theme: string; size: string }
      ): void;
      function prompt(): void;
    }
  }
}
