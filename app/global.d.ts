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
