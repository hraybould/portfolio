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
// Swiper is split into many separate imports
// TODO: consider refactor
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/navigation";
import "swiper/scss/autoplay";
import useMedia from "use-media";
import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from "appHelpers";
import { shuffle } from "lodash";

interface SkillsProps {}

export const Skills: React.FC<SkillsProps> = () => {
  const skills = getSkillsArray(ALL_SKILLS, undefined, true);
  const halfSkillsShuffled = shuffle(
    skills.slice(0, Math.floor(skills.length / 2))
  );
  return (
    <div className="SkillsSection">
      <KeySkills keySkills={skills.filter((s) => s.keySkill)} />
      <SkillsSummary skills={halfSkillsShuffled} />
    </div>
  );
};

interface SkillProps {
  skill: SkillValue;
}

const Skill: React.FC<SkillProps> = ({ skill }) => {
  return (
    <div className="DisplayFlex FlexColumn SmallGap JustifySpaceBetween FullWidth SkillTitle">
      <div className="XXLargeText">{skill.icon}</div>
      <div>
        <div className="LargeText">{skill.name}</div>
        {skill.subName && <div className="SmallText">({skill.subName})</div>}
      </div>
      <div className="MediumText">
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

interface KeySkillsProps {
  keySkills: SkillValue[];
}
const KeySkills: React.FC<KeySkillsProps> = ({ keySkills }) => {
  return (
    <>
      <h3>Key Skills</h3>
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        // Each module may need some props with it
        modules={[Autoplay, Navigation, Pagination]}
        // Navigation Props - START
        navigation={true}
        keyboard
        // Navigation Props - END
        // Pagination Props - START
        pagination={{
          clickable: true,
          dynamicBullets: true,
          // dynamicMainBullets: 3,
        }}
        // Pagination Props - END
        // Loop Props - START
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop
        loopFillGroupWithBlank
        // Loop Props - END
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {keySkills.map((keySkill, keySkillIndex) => (
          <SwiperSlide key={keySkillIndex}>
            <Skill skill={keySkill} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

interface SkillsSummaryProps {
  skills: SkillValue[];
}
const SkillsSummary: React.FC<SkillsSummaryProps> = ({ skills }) => {
  const largerThanMobile = useMedia({ minWidth: MOBILE_BREAKPOINT });
  const largerThanTablet = useMedia({ minWidth: TABLET_BREAKPOINT });
  return (
    <>
      <h3>All Skills</h3>
      <div
        className={`DisplayFlex ${
          largerThanTablet ? "" : "MediumGap"
        } FlexWrap`}
      >
        {skills.map((skill, skillIndex) => (
          <div
            className={largerThanMobile ? "XLargeText" : "LargeText"}
            title={buildSkillTitle(skill)}
            key={skillIndex}
          >
            {skill.icon}
          </div>
        ))}
        <div
          className="Btn Clickable Hoverable SeeAllSkills"
          onClick={() => {
            console.log("clicked");
          }}
        >
          See All Skills
        </div>
      </div>
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

const pushToResult =
  (
    arrayToPushTo: ReturnType<typeof getSkillsArray>,
    whichSkillsToGet: boolean | undefined
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

const getSkillsArray = (
  allSkills: SkillObject,
  whichSkillsToGet: boolean | undefined = undefined,
  sortByTimeFrame: boolean = false
): SkillValue[] => {
  let keySkills: ReturnType<typeof getSkillsArray> = [];
  Object.keys(allSkills).forEach((skillGroup) => {
    ALL_SKILLS[skillGroup].forEach(pushToResult(keySkills, whichSkillsToGet));
  });
  if (sortByTimeFrame) {
    keySkills.sort((a, b) => {
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
  }
  return keySkills;
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
const STARTED_CO2 = new Date("2018-01-15");
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
  icon: React.ReactNode;
  start: Date;
  end: Date;
  // stillInterestedIn: "Yes" | "No" | "Actively working on"
  keySkill?: boolean;
};
type SkillObject = Record<string, SkillValue[]>;

// TODO: refine start and end dates
// Make full list into Modal component with Swipers
// filterable by time/proficiency/currently-interested
// TODO: link to Pluralsight skills proficiencies
const ALL_SKILLS: SkillObject = {
  Languages: [
    {
      name: "JavaScript",
      subName: "ECMAScript",
      icon: <SiJavascript title="JavaScript (ECMAScript)" />,
      start: STARTED_CO2,
      end: UNTIL_CURRENT,
      keySkill: true,
      libraries: [
        {
          name: "React",
          icon: <SiReact title={"React"} />,
          start: STARTED_REACT,
          end: UNTIL_CURRENT,
          keySkill: true,
        },
        {
          name: "React-Redux",
          icon: <SiRedux title={"React-Redux"} />,
          start: STARTED_AVAMAE,
          end: UNTIL_CURRENT,
          keySkill: true,
        },
        {
          name: "React-Router",
          icon: <SiReactrouter title={"React-Router"} />,
          start: STARTED_AVAMAE,
          end: UNTIL_CURRENT,
        },
        {
          name: "TypeScript",
          icon: <SiTypescript title={"TypeScript"} />,
          start: STARTED_AVAMAE,
          end: UNTIL_CURRENT,
          keySkill: true,
        },
        {
          name: "JQuery",
          icon: <SiJquery title={"JQuery"} />,
          start: STARTED_CO2,
          end: FINISHED_ENCOMPASS_PROJECT,
        },
      ],
    },
    {
      name: "HTML",
      subName: "HTML5",
      icon: <SiHtml5 title="HTML (HTML5)" />,
      start: STARTED_CO2,
      end: UNTIL_CURRENT,
      keySkill: true,
    },
    {
      name: "CSS",
      subName: "CSS3",
      icon: <SiCss3 title="CSS (CSS3)" />,
      start: STARTED_CO2,
      end: UNTIL_CURRENT,
      keySkill: true,
      libraries: [
        {
          name: "SCSS",
          subName: "Dart Sass",
          icon: <SiSass title="SCSS (Dart Sass)" />,
          start: STARTED_AVAMAE,
          end: UNTIL_CURRENT,
          keySkill: true,
        },
      ],
    },
    {
      name: "Python",
      icon: <SiPython title={"Python"} />,
      start: STARTED_MTC,
      end: STARTED_AVAMAE,
      libraries: [
        {
          name: "Flask",
          icon: <SiFlask title={"Flask"} />,
          start: STARTED_CO2,
          end: STARTED_AVAMAE,
        },
        {
          name: "Jinja",
          icon: <SiJinja title={"Jinja"} />,
          start: STARTED_CO2,
          end: STARTED_AVAMAE,
        },
        {
          name: "Plotly",
          icon: <SiPlotly title={"Plotly"} />,
          start: STARTED_MTC,
          end: STARTED_AVAMAE,
        },
      ],
    },
  ],
  "Software & Other Libraries": [
    {
      name: "NodeRED",
      icon: <SiNodered title={"NodeRED"} />,
      start: STARTED_ENCOMPASS_PROJECT,
      end: STARTED_AVAMAE,
    },
    {
      name: "NPM",
      icon: <SiNpm title={"NPM"} />,
      start: STARTED_REACT,
      end: UNTIL_CURRENT,
    },
    {
      name: "Bootstrap",
      icon: <SiBootstrap title={"Bootstrap"} />,
      start: STARTED_CO2,
      end: STARTED_AVAMAE,
    },
    {
      name: "Git",
      icon: <SiGit title={"Git"} />,
      start: STARTED_MTC,
      end: UNTIL_CURRENT,
      keySkill: true,
    },
    {
      name: "RabbitMQ",
      icon: <SiRabbitmq title={"RabbitMQ"} />,
      start: STARTED_CO2,
      end: STARTED_AVAMAE,
    },
    {
      name: "Mosquitto",
      subName: "MQTT",
      icon: <SiEclipsemosquitto title="Mosquitto (MQTT)" />,
      start: STARTED_CO2,
      end: STARTED_AVAMAE,
    },
    {
      name: "Docker",
      icon: <SiDocker title={"Docker"} />,
      start: STARTED_ENCOMPASS_PROJECT,
      end: STARTED_AVAMAE,
    },
  ],
  Databases: [
    {
      name: "PostgreSQL",
      icon: <SiPostgresql title={"PostgreSQL"} />,
      start: STARTED_CO2,
      end: STARTED_AVAMAE,
    },
    {
      name: "SQlite",
      icon: <SiSqlite title={"SQlite"} />,
      start: STARTED_CO2,
      end: UNTIL_CURRENT,
    },
    {
      name: "CouchBase",
      icon: <SiCouchbase title={"CouchBase"} />,
      start: STARTED_ENCOMPASS_PROJECT,
      end: STARTED_AVAMAE,
    },
    {
      name: "MongoDB",
      icon: <SiMongodb title={"MongoDB"} />,
      start: STARTED_ENCOMPASS_PROJECT,
      end: STARTED_AVAMAE,
    },
  ],
  "Operating Systems": [
    {
      name: "Linux",
      icon: <SiLinux title={"Linux"} />,
      start: STARTED_MTC,
      end: STARTED_AVAMAE,
      keySkill: true,
      libraries: [
        {
          name: "Ubuntu",
          icon: <SiUbuntu title={"Ubuntu"} />,
          start: STARTED_MTC,
          end: STARTED_AVAMAE,
        },
        {
          name: "Debian",
          icon: <SiDebian title={"Debian"} />,
          start: STARTED_MTC,
          end: STARTED_AVAMAE,
        },
        {
          name: "Lubuntu",
          icon: <SiLubuntu title={"Lubuntu"} />,
          start: STARTED_MTC,
          end: STARTED_AVAMAE,
        },
        {
          name: "RaspberryPi",
          icon: <SiRaspberrypi title={"RaspberryPi"} />,
          start: STARTED_MTC,
          end: STARTED_AVAMAE,
        },
      ],
    },
    {
      name: "Windows",
      icon: <SiWindows title={"Windows"} />,
      start: new Date("2010-12-16"),
      end: UNTIL_CURRENT,
      keySkill: true,
    },
    {
      name: "MacOS",
      icon: <SiMacos title={"MacOS"} />,
      start: STARTED_STORMFRONT_RETAIL,
      end: UNTIL_CURRENT,
    },
  ],
  Editors: [
    {
      name: "Visual Studio Code",
      icon: <SiVisualstudiocode title={"Visual Studio Code"} />,
      start: STARTED_AVAMAE,
      end: UNTIL_CURRENT,
      libraries: [
        {
          name: "Prettier",
          icon: <SiPrettier title={"Prettier"} />,
          start: STARTED_AVAMAE,
          end: UNTIL_CURRENT,
        },
      ],
    },
    {
      name: "Atom",
      icon: <SiAtom title={"Atom"} />,
      start: STARTED_MTC,
      end: STARTED_AVAMAE,
    },
    {
      name: "Notepad++",
      icon: <SiNotepadplusplus title={"Notepad++"} />,
      start: STARTED_MTC,
      end: UNTIL_CURRENT,
    },
  ],
};
