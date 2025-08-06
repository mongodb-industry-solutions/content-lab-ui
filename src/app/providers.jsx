"use client";

/**
 * Leafygreen provider component
 */

import LeafyGreenProvider from "@leafygreen-ui/leafygreen-provider";

export function Providers({ children }) { 

  return (
    <LeafyGreenProvider baseFontSize={13}>
      {children}
    </LeafyGreenProvider>
  );
}

export default Providers;