import { useMemo, useState } from "react";
import { durationFormatter } from "helpers/durationFormatter";
import useMedia from "use-media";
import { MOBILE_MIN_WIDTH, TABLET_MIN_WIDTH } from "appHelpers";
import { shuffle } from "lodash";
import { Modal } from "components/Modal";
import { SwiperCarousel, SwiperCarouselSlide } from "components/SwiperCarousel";
import {
  ALL_SKILLS,
  buildSkillTitle,
  getSkillsArray,
  pushToResult,
  SkillValue,
  sortSkillsByTime,
} from "./skillsHelpers";

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
  const slidesPerView = useSlidesPerView();
  return (
    <>
      <h3>Key Skills</h3>
      <SwiperCarousel slidesPerView={slidesPerView}>
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
  const largerThanMobile = useMedia(MOBILE_MIN_WIDTH);
  const largerThanTablet = useMedia(TABLET_MIN_WIDTH);
  // Memoised because useMedia causes shuffle to be called again
  const halfSkillsShuffled = useMemo(() => {
    const skills = getSkillsArray(ALL_SKILLS, undefined, true);
    return shuffle(skills.slice(0, Math.floor(skills.length / 2)));
  }, []);

  // State for Modal
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const closeModal = () => {
    setModalOpen(false);
  };

  const slidesPerView = useSlidesPerView();

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
              <SwiperCarousel
                spaceBetween={20}
                pagination
                autoplay={false}
                slidesPerView={slidesPerView}
              >
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

const useSlidesPerView = (): number => {
  // Media Queries
  const largerThanMobile = useMedia(MOBILE_MIN_WIDTH);
  const largerThanTablet = useMedia(TABLET_MIN_WIDTH);
  if (largerThanTablet) {
    return 4;
  }
  if (largerThanMobile) {
    return 3;
  }
  return 2;
};
