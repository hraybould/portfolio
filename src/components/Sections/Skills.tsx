import { durationFormatter } from "helpers/durationFormatter";
import React from "react";
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

interface SkillsProps {}

export const Skills: React.FC<SkillsProps> = () => {
  return (
    <div className="SkillsSection">
      <KeySkills />
      <h3>All Skills</h3>
      Click **here** to see a full list of skills
    </div>
  );
  // return (
  //   <div className="DisplayFlex FlexColumn MediumGap">
  //     {Object.keys(ALL_SKILLS).map((skillGroup) => (
  //       <React.Fragment key={skillGroup}>
  //         {ALL_SKILLS[skillGroup].map((skill, index) => (
  //           <Skill key={`${skillGroup}_${index}`} skill={skill} />
  //         ))}
  //       </React.Fragment>
  //     ))}
  //   </div>
  // );
};

interface SkillProps {
  skill: SkillValue;
}

const Skill: React.FC<SkillProps> = ({ skill }) => {
  return (
    <div className="DisplayFlex FlexColumn SmallGap JustifySpaceBetween FullWidth">
      <div className="XXLargeText">{skill.icon}</div>
      <div className="LargeText">{skill.name}</div>
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

const KeySkills: React.FC = () => {
  const keySkills = getKeySkillsArray(ALL_SKILLS, true);
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
        className="mySwiper"
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
  (arrayToPushTo: ReturnType<typeof getKeySkillsArray>) =>
  (skill: SkillValue | NonNullable<SkillValue["libraries"]>[number]) => {
    if (skill.keySkill) {
      arrayToPushTo.push(skill);
    }
    if (skill.libraries) {
      skill.libraries.forEach(pushToResult(arrayToPushTo));
    }
  };

const getKeySkillsArray = (
  allSkills: SkillObject,
  sortByTimeFrame: boolean = false
): SkillValue[] => {
  let keySkills: ReturnType<typeof getKeySkillsArray> = [];
  Object.keys(allSkills).forEach((skillGroup) => {
    ALL_SKILLS[skillGroup].forEach(pushToResult(keySkills));
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

// List of Skills and Experience
// type SkillType = {
//   name: string;
//   icon: React.ReactNode;
//   iconPath?: string;
//   detail?: string;
//   start: Date;
//   end: Date;
// };

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
  icon?: React.ReactNode;
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
// TODO: Over 5 years, stop counting in months
// TODO: Over 10 years, leave as 10+ years
const ALL_SKILLS: SkillObject = {
  Languages: [
    {
      name: "JavaScript",
      subName: "ECMAScript",
      icon: <SiJavascript />,
      start: STARTED_CO2,
      end: UNTIL_CURRENT,
      keySkill: true,
      libraries: [
        {
          name: "React",
          icon: <SiReact />,
          start: STARTED_REACT,
          end: UNTIL_CURRENT,
          keySkill: true,
        },
        {
          name: "React-Redux",
          icon: <SiRedux />,
          start: STARTED_AVAMAE,
          end: UNTIL_CURRENT,
          keySkill: true,
        },
        {
          name: "React-Router",
          icon: <SiReactrouter />,
          start: STARTED_AVAMAE,
          end: UNTIL_CURRENT,
        },
        {
          name: "TypeScript",
          subName: "A superset of JavaScript",
          icon: <SiTypescript />,
          start: STARTED_AVAMAE,
          end: UNTIL_CURRENT,
          keySkill: true,
        },
        {
          name: "JQuery",
          icon: <SiJquery />,
          start: STARTED_CO2,
          end: FINISHED_ENCOMPASS_PROJECT,
        },
      ],
    },
    {
      name: "HTML",
      subName: "HTML5",
      icon: <SiHtml5 />,
      start: STARTED_CO2,
      end: UNTIL_CURRENT,
      keySkill: true,
    },
    {
      name: "CSS",
      subName: "CSS3",
      icon: <SiCss3 />,
      start: STARTED_CO2,
      end: UNTIL_CURRENT,
      keySkill: true,
      libraries: [
        {
          name: "SCSS",
          subName: "Sass-Dart",
          icon: <SiSass />,
          start: STARTED_AVAMAE,
          end: UNTIL_CURRENT,
          keySkill: true,
        },
      ],
    },
    {
      name: "Python",
      icon: <SiPython />,
      start: STARTED_MTC,
      end: STARTED_AVAMAE,
      libraries: [
        {
          name: "Flask",
          icon: <SiFlask />,
          start: STARTED_CO2,
          end: STARTED_AVAMAE,
        },
        {
          name: "Jinja",
          icon: <SiJinja />,
          start: STARTED_CO2,
          end: STARTED_AVAMAE,
        },
        {
          name: "Plotly",
          icon: <SiPlotly />,
          start: STARTED_MTC,
          end: STARTED_AVAMAE,
        },
      ],
    },
  ],
  "Software & Other Libraries": [
    {
      name: "NodeRED",
      icon: <SiNodered />,
      start: STARTED_ENCOMPASS_PROJECT,
      end: STARTED_AVAMAE,
    },
    {
      name: "NPM",
      icon: <SiNpm />,
      start: STARTED_REACT,
      end: UNTIL_CURRENT,
    },
    {
      name: "Bootstrap",
      icon: <SiBootstrap />,
      start: STARTED_CO2,
      end: STARTED_AVAMAE,
    },
    {
      name: "Git",
      icon: <SiGit />,
      start: STARTED_MTC,
      end: UNTIL_CURRENT,
      keySkill: true,
    },
    {
      name: "RabbitMQ",
      icon: <SiRabbitmq />,
      start: STARTED_CO2,
      end: STARTED_AVAMAE,
    },
    {
      name: "Mosquitto",
      subName: "MQTT",
      icon: <SiEclipsemosquitto />,
      start: STARTED_CO2,
      end: STARTED_AVAMAE,
    },
    {
      name: "Docker",
      icon: <SiDocker />,
      start: STARTED_ENCOMPASS_PROJECT,
      end: STARTED_AVAMAE,
    },
  ],
  Databases: [
    {
      name: "PostgreSQL",
      icon: <SiPostgresql />,
      start: STARTED_CO2,
      end: STARTED_AVAMAE,
    },
    {
      name: "SQlite",
      icon: <SiSqlite />,
      start: STARTED_CO2,
      end: UNTIL_CURRENT,
    },
    {
      name: "CouchBase",
      icon: <SiCouchbase />,
      start: STARTED_ENCOMPASS_PROJECT,
      end: STARTED_AVAMAE,
    },
    {
      name: "MongoDB",
      icon: <SiMongodb />,
      start: STARTED_ENCOMPASS_PROJECT,
      end: STARTED_AVAMAE,
    },
  ],
  "Operating Systems": [
    {
      name: "Linux",
      icon: <SiLinux />,
      start: STARTED_MTC,
      end: STARTED_AVAMAE,
      keySkill: true,
      libraries: [
        {
          name: "Ubuntu",
          icon: <SiUbuntu />,
          start: STARTED_MTC,
          end: STARTED_AVAMAE,
        },
        {
          name: "Debian",
          icon: <SiDebian />,
          start: STARTED_MTC,
          end: STARTED_AVAMAE,
        },
        {
          name: "Lubuntu",
          icon: <SiLubuntu />,
          start: STARTED_MTC,
          end: STARTED_AVAMAE,
        },
        {
          name: "RaspberryPi",
          icon: <SiRaspberrypi />,
          start: STARTED_MTC,
          end: STARTED_AVAMAE,
        },
      ],
    },
    {
      name: "Windows",
      icon: <SiWindows />,
      start: new Date("2010-12-16"),
      end: UNTIL_CURRENT,
      keySkill: true,
    },
    {
      name: "MacOS",
      icon: <SiMacos />,
      start: STARTED_STORMFRONT_RETAIL,
      end: UNTIL_CURRENT,
    },
  ],
  Editors: [
    {
      name: "Visual Studio Code",
      icon: <SiVisualstudiocode />,
      start: STARTED_AVAMAE,
      end: UNTIL_CURRENT,
      libraries: [
        {
          name: "Prettier",
          icon: <SiPrettier />,
          start: STARTED_AVAMAE,
          end: UNTIL_CURRENT,
        },
      ],
    },
    {
      name: "Atom",
      icon: <SiAtom />,
      start: STARTED_MTC,
      end: STARTED_AVAMAE,
    },
    {
      name: "Notepad++",
      icon: <SiNotepadplusplus />,
      start: STARTED_MTC,
      end: UNTIL_CURRENT,
    },
  ],
};
