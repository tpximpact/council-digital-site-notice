import { createContext, useState } from "react";
import { ContextApplicationProps } from "../../util/type";
import { defaultValue } from "./helper";

export const ContextApplication =
  createContext<ContextApplicationProps>(defaultValue);

function Context({ children }: any) {
  const [globalConfig, setGlobalConfig] = useState({});

  return (
    <ContextApplication.Provider
      value={{
        globalConfig,
        setGlobalConfig,
      }}
    >
      {children}
    </ContextApplication.Provider>
  );
}

export default Context;
