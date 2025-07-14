"use client";

/**
 * Leafygreen provider component
 */

import LeafyGreenProvider, { useDarkMode } from "@leafygreen-ui/leafygreen-provider";

export function Providers({ children }) {
  const { darkMode } = useDarkMode(); 

  return (
    <LeafyGreenProvider baseFontSize={16} darkMode={darkMode}>
      {children}
    </LeafyGreenProvider>
  );
}

export default Providers;