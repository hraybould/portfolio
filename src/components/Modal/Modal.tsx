import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Transition } from "react-transition-group";
import { useOnClickOutside } from "hooks";
import { MODAL_PORTAL_ID } from "appHelpers";
import { IoCloseSharp } from "react-icons/io5";

interface ModalProps {
  open: boolean;
  closeModal: VoidFunction;
  actionButton?: React.ReactNode;
  title: string;
  fullSize?: boolean;
  className?: string;
  hideCancelButton?: boolean;
  contentClassName?: string;
  customFooter?: React.ReactNode;
  ignoreClickOutside?: boolean;
}

export const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({
  open,
  closeModal,
  title,
  actionButton,
  hideCancelButton,
  fullSize,
  className = "",
  contentClassName = "Content",
  customFooter,
  ignoreClickOutside = false,
  children,
}) => {
  const [delayedOpen, setDelayedOpen] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setDelayedOpen(true);
      }, 1);
    }
  }, [open]);

  const ref = useOnClickOutside(closeModal, true);
  const nodeRef = useRef<HTMLElement>(null);

  const portalContent = (
    <Transition
      in={open && delayedOpen}
      timeout={100}
      onEntered={lockBodyScroll}
      onExited={unlockBodyScroll}
      mountOnEnter
      unmountOnExit
      nodeRef={nodeRef}
    >
      {(state) => (
        <div
          className={"ModalUnderlay " + state}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={`Modal ${className} ${fullSize ? "FullSize" : ""}`}
            ref={ignoreClickOutside ? undefined : ref}
          >
            <div className="Inner">
              {/* Modal Header START */}
              <div className="Top DisplayFlex JustifySpaceBetween">
                <h2 className="Title">{title}</h2>
                <IoCloseSharp
                  className="Icon Cross"
                  size={25}
                  onClick={closeModal}
                />
              </div>
              {/* Modal Header END */}

              {/* Modal Content START */}
              <div className={contentClassName}>{children}</div>
              {/* Modal Content END */}

              {/* Modal Footer START */}
              {customFooter ? (
                customFooter
              ) : (
                <div className="Bottom Buttons">
                  {actionButton ? (
                    <>
                      {!hideCancelButton && (
                        <button
                          type="button"
                          className="Btn BtnCancel"
                          onClick={closeModal}
                        >
                          Cancel
                        </button>
                      )}
                      {actionButton}
                    </>
                  ) : (
                    <button
                      type="button"
                      className="Btn BtnCancel"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  )}
                </div>
              )}
              {/* Modal Footer END */}
            </div>
          </div>
        </div>
      )}
    </Transition>
  );

  const modalPortal = document.getElementById(MODAL_PORTAL_ID);
  if (modalPortal) {
    return ReactDOM.createPortal(portalContent, modalPortal);
  }

  return null;
};

// Helpers
const lockBodyScroll = () => {
  document.body.style.overflow = "hidden";
};

const unlockBodyScroll = () => {
  document.body.style.overflow = "auto";
};
