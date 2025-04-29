import { useAppDispatch, useAppSelector } from "app/hooks";
import { toggleMode } from "features/cv-resume/toggle-slice";
import { useCallback } from "react";

interface ResumeSwitchProps {}

export const ResumeSwitch: React.FC<ResumeSwitchProps> = () => {
  const cvMode = useAppSelector((state) => state.toggle.cvMode);

  const dispatch = useAppDispatch();
  const handleSwitch = useCallback(() => {
    dispatch(toggleMode());
  }, [dispatch]);

  return (
    <label className="switch NotForPrinting">
      <input type="checkbox" checked={cvMode} onChange={handleSwitch} />
      <span className="slider round"></span>
    </label>
  );
};
