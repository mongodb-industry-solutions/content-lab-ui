"use client";

/**
 * Leafygreen provider component
 */

import LeafyGreenProvider from "@leafygreen-ui/leafygreen-provider";

export function Providers({ children }) { 

  return (
    <LeafyGreenProvider baseFontSize={16}>
      {children}
    </LeafyGreenProvider>
  );
}

export default Providers;