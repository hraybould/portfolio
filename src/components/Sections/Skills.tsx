import { useMemo, useState } from "react";
import { durationFormatter } from "helpers/durationFormatter";
import {
  SiAtom,
  SiBootstrap,
  SiCouchbase,
  SiCss3,
  SiDebian,
  SiDocker,
  SiEclipsemosquitto,
  SiFlask,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiJinja,
  SiJquery,
  SiLinux,
  SiLubuntu,
  SiMacos,
  SiMongodb,
  SiNodered,
  SiNotepadplusplus,
  SiNpm,
  SiPlotly,
  SiPostgresql,
  SiPrettier,
  SiPython,
  SiRabbitmq,
  SiRaspberrypi,
  SiReact,
  SiReactrouter,
  SiRedux,
  SiSass,
  SiSqlite,
  SiTypescript,
  SiUbuntu,
  SiVisualstudiocode,
  SiWindows,
} from "react-icons/si";
import useMedia from "use-media";
import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from "appHelpers";
import { shuffle } from "lodash";
import { Modal } from "components/Modal";
import { SwiperCarousel, SwiperCarouselSlide } from "components/SwiperCarousel";

interface SkillsProps {}

export const Skills: React.FC<SkillsProps> = () => {
  return (
    <div className="SkillsSection">
      <KeySkills />
      <SkillsSummary />
    </div>
  );
};

interface SkillProps {
  skill: SkillValue;
  smallerFontSizes?: boolean;
}

const Skill: React.FC<SkillProps> = ({ skill, smallerFontSizes }) => {
  return (
    <div className="DisplayFlex FlexColumn SmallGap JustifySpaceBetween FullWidth SkillTitle">
      <div className={smallerFontSizes ? "XLargeText" : "XXLargeText"}>
        {skill.icon({ title: buildSkillTitle(skill) })}
      </div>
      <div>
        <div className={smallerFontSizes ? "MediumText" : "LargeText"}>
          {skill.name}
        </div>
        {skill.subName && <div className="SmallText">({skill.subName})</div>}
      </div>
      <div className={smallerFontSizes ? undefined : "MediumText"}>
        {durationFormatter({
          start: skill.start,
          end: skill.end,
          format: ["years", "months"],
          delimiter: ", ",
        })}
      </div>
    </div>
  );
};

const KeySkills: React.FC = () => {
  const keySkills = getSkillsArray(ALL_SKILLS, true, true);
  return (
    <>
      <h3>Key Skills</h3>
      <SwiperCarousel>
        {keySkills.map((keySkill, keySkillIndex) => (
          <SwiperCarouselSlide key={keySkillIndex}>
            <Skill skill={keySkill} />
          </SwiperCarouselSlide>
        ))}
      </SwiperCarousel>
    </>
  );
};

const SkillsSummary: React.FC = () => {
  // Media Queries
  const largerThanMobile = useMedia({ minWidth: MOBILE_BREAKPOINT });
  const largerThanTablet = useMedia({ minWidth: TABLET_BREAKPOINT });
  // Memoised becuase useMedia causes shuffle to be called again
  const halfSkillsShuffled = useMemo(() => {
    const skills = getSkillsArray(ALL_SKILLS, undefined, true);
    return shuffle(skills.slice(0, Math.floor(skills.length / 2)));
  }, []);

  // State for Modal
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <h3>All Skills</h3>
      <div
        className={`DisplayFlex FlexWrap ${
          largerThanTablet ? "" : "MediumGap"
        }`}
      >
        {halfSkillsShuffled.map((skill, skillIndex) => (
          <div
            className={largerThanMobile ? "XLargeText" : "LargeText"}
            title={buildSkillTitle(skill)}
            key={skillIndex}
          >
            {skill.icon({ title: buildSkillTitle(skill) })}
          </div>
        ))}
        <div
          className="Btn"
          onClick={() => {
            setModalOpen(true);
          }}
          title={"Click to see more skills"}
        >
          See All Skills
        </div>
      </div>
      <Modal
        open={modalOpen}
        closeModal={closeModal}
        title={"All Skills"}
        contentClassName="Content SkillsSection"
      >
        {Object.keys(ALL_SKILLS).map((skillGroup, groupIndex) => {
          let skillsInGroup: SkillValue[] = [];
          ALL_SKILLS[skillGroup].forEach(pushToResult(skillsInGroup));
          return (
            <div key={groupIndex}>
              <h3>{skillGroup}</h3>
              <SwiperCarousel spaceBetween={20} pagination autoplay={false}>
                {sortSkillsByTime(skillsInGroup).map((skill, skillIndex) => (
                  <SwiperCarouselSlide key={skillIndex}>
                    <Skill skill={skill} smallerFontSizes />
                  </SwiperCarouselSlide>
                ))}
              </SwiperCarousel>
            </div>
          );
        })}
      </Modal>
    </>
  );
};

// const getKeySkillsObject = (allSkills: SkillObject): SkillObject => {
//   let keySkills: ReturnType<typeof getKeySkillsObject> = {};
//   Object.keys(ALL_SKILLS).forEach((skillGroup) => {
//     keySkills[skillGroup] = ALL_SKILLS[skillGroup].filter(
//       (skill) => skill.keySkill
//     );
//   });
//   return keySkills;
// };

/**
 * Recursively find skills and related skills
 *
 * @param arrayToPushTo An array object to push the results to.
 * **Note**: This object is an Array defined _outside_ of the loop callback,
 * this mutates the arrary outside, this function needn't retrun anything.
 * @param whichSkillsToGet Get skills based on `keySkill` value. Usage:
 *  - All skills (undefined)
 *  - Key Skills only (true)
 *  - No key skills (false)
 */
const pushToResult =
  (
    arrayToPushTo: ReturnType<typeof getSkillsArray>,
    whichSkillsToGet?: boolean
  ) =>
  (skill: SkillValue) => {
    if (whichSkillsToGet === undefined) {
      arrayToPushTo.push(skill);
    } else {
      if (skill.keySkill === whichSkillsToGet) {
        arrayToPushTo.push(skill);
      }
    }
    if (skill.libraries) {
      skill.libraries.forEach(pushToResult(arrayToPushTo, whichSkillsToGet));
    }
  };

/**
 *
 * @param skillsArray An array to sort.
 * **Note**: This is an "in-place" process according to the MDN Docs
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 * @returns The sorted array
 */
const sortSkillsByTime = (skillsArray: SkillValue[]) =>
  skillsArray.sort((a, b) => {
    // Another way:
    // Could use date-fns to calculate the differnce instead of valueOf()
    const aTime = a.end.valueOf() - a.start.valueOf();
    const bTime = b.end.valueOf() - b.start.valueOf();
    const aMinusB = aTime - bTime;
    switch (true) {
      case aMinusB < 0:
        return 1;
      case aMinusB > 0:
        return -1;
      case aMinusB === 0:
      default:
        return 0;
    }
  });

const getSkillsArray = (
  allSkills: SkillObject,
  whichSkillsToGet: boolean | undefined = undefined,
  sortByTimeFrame: boolean = false
): SkillValue[] => {
  let skills: ReturnType<typeof getSkillsArray> = [];
  Object.keys(allSkills).forEach((skillGroup) => {
    ALL_SKILLS[skillGroup].forEach(pushToResult(skills, whichSkillsToGet));
  });
  if (sortByTimeFrame) {
    sortSkillsByTime(skills);
  }
  return skills;
};

const buildSkillTitle = (skill: SkillValue): string => {
  if (skill.subName) {
    return `${skill.name} (${skill.subName})`;
  }
  return skill.name;
};

// List of Skills and Experience
const STARTED_STORMFRONT_RETAIL = new Date("2016-11-01");
const STARTED_MTC = new Date("2017-09-23");
const STARTED_QUORUM = new Date("2018-01-15");
const STARTED_ENCOMPASS_PROJECT = new Date("2018-03-01");
const FINISHED_ENCOMPASS_PROJECT = new Date("2020-03-01");
const STARTED_REACT = new Date("2021-01-17");
const STARTED_AVAMAE = new Date("2021-05-05");
const UNTIL_CURRENT = new Date();

/**
 * Information about different skills
 */
type SkillValue = {
  name: string;
  subName?: string;
  libraries?: SkillValue[];
  icon: React.FC;
  start: Date;
  end: Date;
  // stillInterestedIn: "Yes" | "No" | "Actively working on"
  keySkill?: boolean;
};
type SkillObject = Record<string, SkillValue[]>;

// TODO: link to Pluralsight skills proficiencies

/**
 * All skills with an estimated duration
 */
const ALL_SKILLS: SkillObject = {
  Languages: [
    {
      name: "JavaScript",
      subName: "ECMAScript",
      icon: SiJavascript,
      start: STARTED_QUORUM,
      end: UNTIL_CURRENT,
      keySkill: true,
      libraries: [
        {
          name: "React",
          icon: SiReact,
          start: STARTED_REACT,
          end: UNTIL_CURRENT,
          keySkill: true,
        },
        {
          name: "TypeScript",
          icon: SiTypescript,
          start: STARTED_AVAMAE,
          end: UNTIL_CURRENT,
          keySkill: true,
        },
      ],
    },
    {
      name: "HTML",
      subName: "HTML5",
      icon: SiHtml5,
      start: STARTED_QUORUM,
      end: UNTIL_CURRENT,
      keySkill: true,
    },
    {
      name: "CSS",
      subName: "CSS3",
      icon: SiCss3,
      start: STARTED_QUORUM,
      end: UNTIL_CURRENT,
      keySkill: true,
      libraries: [
        {
          name: "SCSS",
          subName: "Dart Sass",
          icon: SiSass,
          start: STARTED_AVAMAE,
          end: UNTIL_CURRENT,
          keySkill: true,
        },
      ],
    },
    {
      name: "Python",
      icon: SiPython,
      start: STARTED_MTC,
      end: STARTED_AVAMAE,
    },
  ],
  "Software & Other Libraries": [
    // JS Related
    {
      name: "React-Redux",
      icon: SiRedux,
      start: STARTED_AVAMAE,
      end: UNTIL_CURRENT,
      keySkill: true,
    },
    {
      name: "React-Router",
      icon: SiReactrouter,
      start: STARTED_AVAMAE,
      end: UNTIL_CURRENT,
    },
    {
      name: "JQuery",
      icon: SiJquery,
      start: STARTED_QUORUM,
      end: FINISHED_ENCOMPASS_PROJECT,
    },
    {
      name: "NPM",
      icon: SiNpm,
      start: STARTED_REACT,
      end: UNTIL_CURRENT,
    },
    {
      name: "NodeRED",
      subName: "Low-code Platform",
      icon: SiNodered,
      start: STARTED_ENCOMPASS_PROJECT,
      end: STARTED_AVAMAE,
    },
    // Python Related
    {
      name: "Flask",
      subName: "Python",
      icon: SiFlask,
      start: STARTED_QUORUM,
      end: STARTED_AVAMAE,
    },
    {
      name: "Jinja",
      subName: "Python",
      icon: SiJinja,
      start: STARTED_QUORUM,
      end: STARTED_AVAMAE,
    },
    {
      name: "Plotly",
      subName: "Python",
      icon: SiPlotly,
      start: STARTED_MTC,
      end: STARTED_AVAMAE,
    },
    // Other
    {
      name: "Bootstrap",
      icon: SiBootstrap,
      start: STARTED_QUORUM,
      end: STARTED_AVAMAE,
    },
    {
      name: "Git",
      icon: SiGit,
      start: STARTED_MTC,
      end: UNTIL_CURRENT,
      keySkill: true,
    },
    {
      name: "RabbitMQ",
      icon: SiRabbitmq,
      start: STARTED_QUORUM,
      end: STARTED_AVAMAE,
    },
    {
      name: "Mosquitto",
      subName: "MQTT",
      icon: SiEclipsemosquitto,
      start: STARTED_QUORUM,
      end: STARTED_AVAMAE,
    },
    {
      name: "Docker",
      icon: SiDocker,
      start: STARTED_ENCOMPASS_PROJECT,
      end: STARTED_AVAMAE,
    },
  ],
  Databases: [
    {
      name: "PostgreSQL",
      icon: SiPostgresql,
      start: STARTED_QUORUM,
      end: STARTED_AVAMAE,
    },
    {
      name: "SQlite",
      icon: SiSqlite,
      start: STARTED_QUORUM,
      end: UNTIL_CURRENT,
    },
    {
      name: "CouchBase",
      icon: SiCouchbase,
      start: STARTED_ENCOMPASS_PROJECT,
      end: STARTED_AVAMAE,
    },
    {
      name: "MongoDB",
      icon: SiMongodb,
      start: STARTED_ENCOMPASS_PROJECT,
      end: STARTED_AVAMAE,
    },
  ],
  "Operating Systems": [
    {
      name: "Linux",
      icon: SiLinux,
      start: STARTED_MTC,
      end: STARTED_AVAMAE,
      keySkill: true,
      libraries: [
        {
          name: "Ubuntu",
          icon: SiUbuntu,
          start: STARTED_MTC,
          end: STARTED_AVAMAE,
        },
        {
          name: "Debian",
          icon: SiDebian,
          start: STARTED_MTC,
          end: STARTED_AVAMAE,
        },
        {
          name: "Lubuntu",
          icon: SiLubuntu,
          start: STARTED_MTC,
          end: STARTED_AVAMAE,
        },
        {
          name: "RaspberryPi",
          icon: SiRaspberrypi,
          start: STARTED_MTC,
          end: STARTED_AVAMAE,
        },
      ],
    },
    {
      name: "Windows",
      icon: SiWindows,
      start: new Date("2010-12-16"),
      end: UNTIL_CURRENT,
      keySkill: true,
    },
    {
      name: "MacOS",
      icon: SiMacos,
      start: STARTED_STORMFRONT_RETAIL,
      end: UNTIL_CURRENT,
    },
  ],
  Editors: [
    {
      name: "Visual Studio Code",
      icon: SiVisualstudiocode,
      start: STARTED_AVAMAE,
      end: UNTIL_CURRENT,
      libraries: [
        {
          name: "Prettier",
          icon: SiPrettier,
          start: STARTED_AVAMAE,
          end: UNTIL_CURRENT,
        },
      ],
    },
    {
      name: "Atom",
      icon: SiAtom,
      start: STARTED_MTC,
      end: STARTED_AVAMAE,
    },
    {
      name: "Notepad++",
      icon: SiNotepadplusplus,
      start: STARTED_MTC,
      end: UNTIL_CURRENT,
    },
  ],
};
