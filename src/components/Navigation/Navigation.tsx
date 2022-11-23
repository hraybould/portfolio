import { headerId } from "components/Header/models";
import { ALL_SECTIONS } from "components/Sections/Sections";
import React from "react";

interface NavigationProps {
  position: "Centred" | "Hamburger";
}

export const Navigation: React.FC<NavigationProps> = ({ position }) => {
  return (
    <nav className={position}>
      <ul>
        {ALL_SECTIONS.map(
          (section, index) =>
            section.sectionVisible && (
              <React.Fragment key={section.id}>
                {/* Add Spacer if index greater than 0 */}
                {!!index && <span className="NavSpacer">&#x2F;&#x2F;</span>}
                <li>
                  <span
                    className="NavLink"
                    onClick={scrollIntoView(section.id)}
                  >
                    {section.titleText}
                  </span>
                </li>
              </React.Fragment>
            )
        )}
      </ul>
    </nav>
  );
};

const scrollIntoView = (section: typeof ALL_SECTIONS[number]["id"]) => () => {
  // Find Section element
  const sectionElement = document.getElementById(section);
  const top = sectionElement ? sectionElement.getBoundingClientRect().top : 0;
  // Find header element
  const headerElement = document.getElementById(headerId);
  const headerHeight = headerElement
    ? headerElement.getBoundingClientRect().height
    : 0;
  // Scroll to section
  window.scrollBy({
    top: top - headerHeight,
  });
  if (sectionElement) {
  }
};
