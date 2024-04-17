"use client";
// ============================================================
// osuのoauth認証トークンをグローバルで共有するプロバイダ
// ============================================================
import { ReactNode, createContext, useContext } from "react";

const OsuTokenContext = createContext<string>("");

interface OsuTokenProviderProps {
  token: string;
  children: ReactNode;
}

const OsuTokenProvider = (props: OsuTokenProviderProps) => {
  const { token, children } = props;

  return (
    <OsuTokenContext.Provider value={token}>
      {children}
    </OsuTokenContext.Provider>
  );
};

export default OsuTokenProvider;

export const useOsuToken = () => {
  const context = useContext(OsuTokenContext);
  return context;
};
