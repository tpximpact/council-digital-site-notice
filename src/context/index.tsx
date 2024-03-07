import { createContext, useState } from "react";
import { ContextApplicationProps } from "../../util/type";
import { defaultValue } from "./helper";

export const ContextApplication =
  createContext<ContextApplicationProps>(defaultValue);

function Context({ children }: any) {
  const [globalInfo, setGlobalInfo] = useState({});

  return (
    <ContextApplication.Provider
      value={{
        globalInfo,
        setGlobalInfo,
      }}
    >
      {children}
    </ContextApplication.Provider>
  );
}

export default Context;
