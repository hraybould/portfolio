import { durationFormatter } from "helpers/durationFormatter";

interface SkillsProps {}

export const Skills: React.FC<SkillsProps> = () => {
  return (
    <div>
      {ALLS_SKILLS.map((skill) => (
        <Skill key={skill.name} skill={skill} />
      ))}
    </div>
  );
};

interface SkillProps {
  skill: SkillType;
}

const Skill: React.FC<SkillProps> = ({ skill }) => {
  return (
    <div className="DisplayFlex">
      <h3>{skill.name}</h3>
      <div>
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

// List of Skills and Experience
type SkillType = {
  name: string;
  iconPath?: string;
  detail?: string;
  start: Date;
  end: Date;
};

const ALLS_SKILLS: SkillType[] = [
  {
    name: "JavaScript",
    start: new Date("2018-09-01"),
    end: new Date("2021-05-05"),
  },
  {
    name: "JQuery",
    start: new Date("2018-09-01"),
    end: new Date("2021-05-05"),
  },
  {
    name: "HTML",
    start: new Date("2018-09-01"),
    end: new Date(),
    detail: "HTML5",
  },
  {
    name: "CSS",
    start: new Date("2018-09-01"),
    end: new Date(),
    detail: "CSS3",
  },
  {
    name: "React",
    start: new Date("2021-01-17"),
    end: new Date(),
    detail: "State, Hooks,",
  },
  {
    name: "TypeScript",
    start: new Date("2021-05-05"),
    end: new Date(),
  },
  {
    name: "React-Redux",
    start: new Date("2021-05-05"),
    end: new Date(),
  },
];
