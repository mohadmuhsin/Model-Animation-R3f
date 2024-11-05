import React, { createContext, useContext, useState } from "react";

const ConfiguratorContext = createContext();

export function ConfiguratorProvider({ children }) {
  const [isNight, setDay] = useState(false);
  return (
    <ConfiguratorContext.Provider
      value={{
        isNight,
        setDay,
      }}
    >
      {children}
    </ConfiguratorContext.Provider>
  );
}

export const useConfigurator = () => {
  return useContext(ConfiguratorContext);
};
