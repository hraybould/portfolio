import { AboutMe } from "./AboutMe";
import { Contact } from "./Contact";
import { Section } from "./models";
import { Resume } from "./Resume";
import { Skills } from "./Skills";

export const SectionsBuilder: React.FC = () => {
  return (
    <div className="SectionsWrapper">
      {ALL_SECTIONS.map(
        (section) =>
          section.sectionVisible && (
            <section id={section.id} key={section.titleText}>
              <div className="SectionInner">
                {section.titleVisible && <h2>{section.titleText}</h2>}
                {section.sectionContent}
              </div>
            </section>
          )
      )}
    </div>
  );
};

export const ALL_SECTIONS: Section[] = [
  {
    id: "about-me",
    titleText: "About Me",
    titleVisible: false,
    sectionContent: <AboutMe />,
    sectionVisible: true,
  },
  {
    id: "skills",
    titleText: "Skills",
    titleVisible: true,
    sectionContent: <Skills />,
    sectionVisible: true,
  },
  {
    id: "resume",
    titleVisible: true,
    titleText: "Resume",
    sectionContent: <Resume />,
    sectionVisible: false,
  },
  {
    id: "contact-me",
    titleText: "Contact",
    titleVisible: true,
    sectionContent: <Contact />,
    sectionVisible: true,
  },
];
