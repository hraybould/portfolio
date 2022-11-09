import { durationFormatter } from "helpers/durationFormatter";
import wave from "assets/memoji/wave.png";

interface AboutMeProps {}

const DATE_OF_BIRTH = new Date("1994-12-16");

const ClosingTag = () => <span className="ClosingTag">&#x20;&#x2F;&#x3E;</span>;

export const AboutMe: React.FC<AboutMeProps> = () => {
  return (
    <div className="AboutMeSection">
      <h1 className="HiText CursiveFont">Hi</h1>
      <img className="ClippedImg" src={wave} alt="Memoji of Me, Harrison" />
      <div className="DisplayFlex">
        <div className="ImText CursiveFont LargeText">I'm &#8230;</div>
        <div>
          <h3 className="InfoText">
            Harrison
            <ClosingTag />
          </h3>
          <h3 className="InfoText">
            {durationFormatter({ start: DATE_OF_BIRTH, format: ["years"] })} old
            <ClosingTag />
          </h3>
          <h3 className="InfoText">
            a UK-based Web Developer
            <ClosingTag />
          </h3>
        </div>
      </div>
    </div>
  );
};
