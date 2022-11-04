import { Sections } from "components/Sections/models";

export const Navigation: React.FC<{}> = () => {
  return (
    <nav>
      <ul>
        {(Object.keys(Sections) as Array<keyof typeof Sections>).map(
          (section) => {
            return (
              <li key={Sections[section]}>
                <span className="NavLink" onClick={scrollIntoView(section)}>
                  {section}
                </span>
              </li>
            );
          }
        )}
      </ul>
    </nav>
  );
};

const scrollIntoView = (section: keyof typeof Sections) => () => {
  const elementId = `#${Sections[section]}`;
  const element = document.getElementById(elementId);
  if (element) {
    // element.scrollIntoView();
    const { top } = element.getBoundingClientRect();
    // 5rem to pixels
    const remInPx = 1.6 * 50;
    window.scrollBy({
      top: top - remInPx,
      behavior: "smooth",
    });
  }
};
