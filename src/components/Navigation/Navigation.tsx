import { headerId } from "components/Header/models";
import { ALL_SECTIONS } from "components/Sections/Sections";

export const Navigation: React.FC<{}> = () => {
  return (
    <nav>
      <ul>
        {(Object.keys(ALL_SECTIONS) as Array<keyof typeof ALL_SECTIONS>).map(
          (section) =>
            ALL_SECTIONS[section].sectionVisible && (
              <li key={section}>
                <span className="NavLink" onClick={scrollIntoView(section)}>
                  {section}
                </span>
              </li>
            )
        )}
      </ul>
    </nav>
  );
};

const scrollIntoView = (section: keyof typeof ALL_SECTIONS) => () => {
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
