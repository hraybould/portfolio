import { AboutMe } from "./AboutMe";
import { Contact } from "./Contact";
import { Sections } from "./models";
import { Resume } from "./Resume";
import { Skills } from "./Skills";

export const SectionsBuilder: React.FC = () => {
  return (
    <div className="SectionsWrapper">
      {(Object.keys(Sections) as Array<keyof typeof Sections>).map(
        (section) => (
          <section id={section} key={section}>
            <h2>{section}</h2>
            {getSectionContent(section)}
          </section>
        )
      )}
    </div>
  );
};

const getSectionContent = (
  section: keyof typeof Sections
): JSX.Element | null => {
  switch (section) {
    case "About Me":
      return <AboutMe />;
    case "Contact":
      return <Contact />;
    case "Resume":
      return <Resume />;
    case "Skills":
      return <Skills />;
    default:
      console.warn("No component to render");
      return null;
  }
};
