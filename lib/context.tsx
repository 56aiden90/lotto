import React, { createContext, ReactNode, useState, useEffect } from "react";
import { message } from "antd";

type AppMessageFunction = (
  content: string,
  duration?: number,
  onClose?: () => void
) => void;

interface AppMessage {
  info: AppMessageFunction;
  error: AppMessageFunction;
  warn: AppMessageFunction;
  success: AppMessageFunction;
}
interface AppContextType {
  me?: string | null;
  setMe: (me: string) => void;
  appMessage: AppMessage;
}
interface AppContextProviderProps {
  children?: ReactNode;
}
export const AppContext = createContext<AppContextType>({
  me: undefined,
  setMe: () => {},
  appMessage: {
    info: () => {},
    error: () => {},
    success: () => {},
    warn: () => {},
  },
});

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [me, setMe] = useState<string | null>();
  const [messageIds, setMessageIds] = useState<string[]>([]);
  const method = (
    name: "info" | "error" | "warn" | "success"
  ): AppMessageFunction => {
    return (content: string, duration?: number, onClose = () => {}) => {
      if (!messageIds.some((messageId) => messageId === content)) {
        setMessageIds([...messageIds, content]);
        message[name](content, duration, () => {
          setMessageIds(
            messageIds.filter((messageId) => messageId !== content)
          );
          onClose();
        });
      }
    };
  };

  const appMessage: AppMessage = {
    info: method("info"),
    error: method("error"),
    warn: method("warn"),
    success: method("success"),
  };

  useEffect(() => {
    if (!me) {
      // 로그인 정보가 없을 때 할 동작.
    }
  }, []);

  return (
    <AppContext.Provider value={{ me, setMe, appMessage }}>
      {children}
    </AppContext.Provider>
  );
};
