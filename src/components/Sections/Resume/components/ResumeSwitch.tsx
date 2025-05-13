import { useAppDispatch, useAppSelector } from "app/hooks";
import { CV_MODE } from "app/selectors";
import { toggleMode } from "features/cv-resume/toggle-slice";
import { useCallback } from "react";
import Popup from "reactjs-popup";
import { IoIosInformationCircle } from "react-icons/io";

interface ResumeSwitchProps {}

export const ResumeSwitch: React.FC<ResumeSwitchProps> = () => {
  const cvMode = useAppSelector(CV_MODE);

  const dispatch = useAppDispatch();
  const handleSwitch = useCallback(() => {
    dispatch(toggleMode());
  }, [dispatch]);

  return (
    <div className="DisplayFlex SmallGap">
      <label className="ResumeSwitch NotForPrinting">
        <input type="checkbox" checked={cvMode} onChange={handleSwitch} />
        <span className="Slider Rounded"></span>
      </label>
      <Popup
        trigger={
          <span className="Btn NoBorder NoPadding LargeText NotForPrinting">
            <IoIosInformationCircle className="Icon" />
          </span>
        }
        on="hover"
        position="bottom right"
        children="Switch between viewing (and printing) the the CV or Resume"
      />
    </div>
  );
};
