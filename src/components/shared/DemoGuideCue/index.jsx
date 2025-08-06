/**
 * Reusable Demo Guide Cue component
 * A simple wrapper around LeafyGreen's GuideCue
 */

import React, { useState, useRef, useEffect } from 'react';
import { GuideCue } from '@leafygreen-ui/guide-cue';

export default function DemoGuideCue({ 
    title, 
    children, 
    tooltipAlign = "bottom", 
    tooltipJustify = "start",
    disabled = false 
}) {
    const [guideOpen, setGuideOpen] = useState(false);
    const triggerRef = useRef(null);

    useEffect(() => {
        if (triggerRef.current && !disabled) {
            setGuideOpen(true);
        }
    }, [disabled]);

    return (
        <>
            <div ref={triggerRef} style={{ display: 'contents' }}>
                {/* This div acts as the trigger element for positioning */}
            </div>
            
            {guideOpen && triggerRef.current && (
                <GuideCue
                    open={guideOpen}
                    setOpen={setGuideOpen}
                    title={title}
                    refEl={triggerRef.current.parentElement}
                    numberOfSteps={1}
                    currentStep={1}
                    onPrimaryButtonClick={() => setGuideOpen(false)}
                    tooltipAlign={tooltipAlign}
                    tooltipJustify={tooltipJustify}
                >
                    {children}
                </GuideCue>
            )}
        </>
    );
}