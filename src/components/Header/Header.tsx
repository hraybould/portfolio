import { Navigation } from "components/Navigation";
import mac from "assets/memoji/mac.png";
import { headerId } from "./models";
import React, { useEffect, useState } from "react";

export const Header: React.FC = () => {
  // Determines if a user has scrolled from the top of the page
  // A user may click the Image to scroll to the top
  // This is done my adding the Clickable class
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);

  useEffect(() => {
    const scrollListener = () => {
      setHasScrolled(!!window.scrollY);
    };
    // Add Event listener
    document.addEventListener("scroll", scrollListener);
    // Cleanup listener on unmount
    return () => {
      document.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <header id={headerId}>
      <img
        className={`MeMoji ${hasScrolled ? "Clickable" : ""}`}
        src={mac}
        alt="MeMoji Icon of me"
        onClick={() => {
          if (hasScrolled) {
            window.scrollTo({ top: 0 });
          } else {
            console.debug("You clicked the image, but I won't do anything");
          }
        }}
      />
      <Navigation />
    </header>
  );
};
