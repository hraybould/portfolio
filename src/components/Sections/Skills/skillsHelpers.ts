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
import {
  STARTED_STORMFRONT_RETAIL,
  STARTED_MTC,
  STARTED_AVAMAE,
} from "../keyDates";

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
export const pushToResult =
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
export const sortSkillsByTime = (skillsArray: SkillValue[]) =>
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

export const getSkillsArray = (
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

export const buildSkillTitle = (skill: SkillValue): string => {
  if (skill.subName) {
    return `${skill.name} (${skill.subName})`;
  }
  return skill.name;
};

// List of Skills and Experience
// MTC Projects
const STARTED_QUORUM = new Date("2018-01-15");
const STARTED_ENCOMPASS_PROJECT = new Date("2018-03-01");
const FINISHED_ENCOMPASS_PROJECT = new Date("2020-03-01");
// Other Important Dates
const STARTED_REACT = new Date("2021-01-17");
const STARTED_REACT_NATIVE = new Date("2023-07-01");
// Date today
const UNTIL_CURRENT = new Date();

/**
 * Information about different skills
 */
export type SkillValue = {
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
export const ALL_SKILLS: SkillObject = {
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
        {
          name: "React Native",
          icon: SiReact,
          start: STARTED_REACT_NATIVE,
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
