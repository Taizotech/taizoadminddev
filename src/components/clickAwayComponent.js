import React, { useEffect, useRef, useState } from "react";

function ClickAwayComponent({ onClickAway, children }) {
  const elementRef = useRef(null);
  const [isElementClicked, setIsElementClicked] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        setIsElementClicked(false);
        if (onClickAway) {
          onClickAway();
        }
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClickAway]);

  return (
    <div>
      <div ref={elementRef}>{children}</div>
    </div>
  );
}

export default ClickAwayComponent;
