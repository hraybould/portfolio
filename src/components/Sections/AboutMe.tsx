import { durationFormatter } from "helpers/durationFormatter";
import wave from "assets/memoji/wave.png";

interface AboutMeProps {}

const DATE_OF_BIRTH = new Date("1994-12-16");

const ClosingTag = () => <span className="ClosingTag">&#x20;&#x2F;&#x3E;</span>;

export const AboutMe: React.FC<AboutMeProps> = () => {
  return (
    <div className="SectionInner AboutMeSection">
      <h1 className="HiText CursiveFont">Hi</h1>
      <img
        className="MarginAuto"
        src={wave}
        alt="Memoji of Me, Harrison"
        height="421"
        width="421"
      />
      <div className="DisplayFlex">
        <div className="XLargeText ImText CursiveFont">I'm &#8230;</div>
        <div>
          <div className="MediumText InfoText">
            Harrison
            <ClosingTag />
          </div>
          <div className="MediumText InfoText">
            {durationFormatter({ start: DATE_OF_BIRTH, format: ["years"] })} old
            <ClosingTag />
          </div>
          <div className="MediumText InfoText">
            a UK-based Web Developer
            <ClosingTag />
          </div>
        </div>
      </div>
    </div>
  );
};
