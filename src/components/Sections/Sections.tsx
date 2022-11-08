import { AboutMe } from "./AboutMe";
import { Contact } from "./Contact";
import { SectionsStructure } from "./models";
import { Resume } from "./Resume";
import { Skills } from "./Skills";

export const SectionsBuilder: React.FC = () => {
  return (
    <div className="SectionsWrapper">
      {(Object.keys(ALL_SECTIONS) as Array<keyof typeof ALL_SECTIONS>).map(
        (section) =>
          ALL_SECTIONS[section].sectionVisible && (
            <section id={section} key={section}>
              {ALL_SECTIONS[section].titleVisible && <h2>{section}</h2>}
              {ALL_SECTIONS[section].content}
            </section>
          )
      )}
    </div>
  );
};

export const ALL_SECTIONS: SectionsStructure = {
  "About Me": {
    id: "about-me",
    titleVisible: false,
    content: <AboutMe />,
    sectionVisible: true,
  },
  Skills: {
    id: "skills",
    titleVisible: true,
    content: <Skills />,
    sectionVisible: true,
  },
  Resume: {
    id: "resume",
    titleVisible: true,
    content: <Resume />,
    sectionVisible: false,
  },
  Contact: {
    id: "contact",
    titleVisible: true,
    content: <Contact />,
    sectionVisible: true,
  },
};
