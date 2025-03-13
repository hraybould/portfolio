import { TABLET_MIN_WIDTH } from "appHelpers";
import { NAVBAR_HEADER_ID } from "components/Header/models";
import { ALL_SECTIONS } from "components/Sections/Sections";
import { useOnClickOutside } from "hooks";
import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import useMedia from "use-media";

interface NavigationProps {}

export const Navigation: React.FC<NavigationProps> = () => {
  const [navVisible, setNavVisible] = useState<boolean>(false);
  const largerThanTablet = useMedia(TABLET_MIN_WIDTH);
  const hideNavbar = () => {
    if (!largerThanTablet) {
      setNavVisible(false);
    }
  };
  const ref = useOnClickOutside(hideNavbar, true);

  useEffect(() => {
    // Reset Navbar Visibility State
    setNavVisible(!!largerThanTablet);
    // Add listener, the scroll process closes the navbar on tablet devices
    if (!largerThanTablet) {
      document.addEventListener("scroll", hideNavbar);
    } else {
      document.removeEventListener("scroll", hideNavbar);
    }
    // Cleanup listener on unmount
    return () => {
      document.removeEventListener("scroll", hideNavbar);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [largerThanTablet]);

  return (
    <>
      <div className="HamburgerMenuWrapper">
        <GiHamburgerMenu
          size={25}
          className={"Icon Btn NoPadding NoBorder"}
          onClick={() => {
            setNavVisible((p) => !p);
          }}
        />
      </div>
      <nav ref={ref} className={navVisible ? "NavVisible" : undefined}>
        <ul>
          {ALL_SECTIONS.map(
            (section) =>
              section.sectionVisible && (
                <li key={section.id}>
                  <span
                    className="NavLink"
                    onClick={scrollIntoView(section.id)}
                  >
                    {section.titleText}
                  </span>
                </li>
              )
          )}
          {/* {ALL_SECTIONS.some((section) => section.sectionPrintable) && (
            <li className="NotRealNavLink">
              <span
                className="Btn NoBorder MinimalPadding"
                onClick={window.print}
              >
                Print Page
              </span>
            </li>
          )} */}
        </ul>
      </nav>
    </>
  );
};

const scrollIntoView =
  (section: (typeof ALL_SECTIONS)[number]["id"], callback?: VoidFunction) =>
  () => {
    // Find Section element
    const sectionElement = document.getElementById(section);
    const top = sectionElement ? sectionElement.getBoundingClientRect().top : 0;
    // Find header element
    const headerElement = document.getElementById(NAVBAR_HEADER_ID);
    const headerHeight = headerElement
      ? headerElement.getBoundingClientRect().height
      : 0;
    // Scroll to section
    window.scrollBy({
      top: top - headerHeight,
    });
    // If a callback exists,
    callback && callback();
  };
