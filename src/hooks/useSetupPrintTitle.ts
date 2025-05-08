import { useAppSelector } from "app/hooks";
import { CV_MODE } from "app/selectors";
import { useEffect } from "react";

/**
 * Rename the document while printing
 */
export const useSetupPrintTitle = () => {
  const cvMode = useAppSelector(CV_MODE);
  useEffect(() => {
    const originalTitle = document.title;
    const printTitle = `Harrison Raybould - ${cvMode ? "CV" : "Resume"}`;
    const changeTitle = () => {
      document.title = printTitle;
    };
    const changeTitleBack = () => {
      document.title = originalTitle;
    };
    window.addEventListener("beforeprint", changeTitle);
    window.addEventListener("afterprint", changeTitleBack);

    return () => {
      window.removeEventListener("beforeprint", changeTitle);
      window.removeEventListener("afterprint", changeTitleBack);
    };
  }, [cvMode]);
};
