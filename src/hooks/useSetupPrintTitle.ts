import { useEffect } from "react";

/**
 * Rename the document while printing
 */
export const useSetupPrintTitle = () => {
  useEffect(() => {
    const originalDocumentTitle = document.title;
    const printDocumentTitle = "Harrison Raybould - Resume";
    const changeTitle = () => {
      document.title = printDocumentTitle;
    };
    const changeTitleBack = () => {
      document.title = originalDocumentTitle;
    };
    window.addEventListener("beforeprint", changeTitle);
    window.addEventListener("afterprint", changeTitleBack);

    return () => {
      window.removeEventListener("beforeprint", changeTitle);
      window.removeEventListener("afterprint", changeTitleBack);
    };
  }, []);
};
