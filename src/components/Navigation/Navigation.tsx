import { headerId } from "components/Header/models";
import { Sections } from "components/Sections/models";

export const Navigation: React.FC<{}> = () => {
  return (
    <nav>
      <ul>
        {(Object.keys(Sections) as Array<keyof typeof Sections>).map(
          (section) => (
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

const scrollIntoView = (section: keyof typeof Sections) => () => {
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
