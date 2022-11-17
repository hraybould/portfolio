import { useEffect, useRef } from "react";

/**
 * A simple hook to monitor if a user has clicked off a given component
 *
 * @param callback Callback to run when the user clicks outside the `ref`
 * element.
 * @param callOnEsc Boolean as to whether or not to call `callback` if the
 * "Escape" key was pressed.
 * @param exceptions An Array of exceptions to ignore if they are interacted
 * with.
 * @returns A `ref` to bind to the target element being monitored
 */
export const useOnClickOutside = (
  callback: () => void,
  callOnEsc: boolean,
  exceptions?: string[]
) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const eventTarget = e.target as Node;
      // Check the click is inside the exceptions
      if (exceptions && clickInsideExceptions(exceptions, eventTarget)) {
        return;
      }
      // If we we haven't set the node yet, or a click occurs within the target, return.
      if (ref.current == null || ref.current.contains(eventTarget)) {
        return;
      }
      // If the click is a left click and outside the target,
      // run the callback.
      if (e.buttons === 1) {
        callback();
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      const eventTarget = e.target as Node;
      // Check the click is inside the exceptions
      if (exceptions && clickInsideExceptions(exceptions, eventTarget)) {
        return;
      }
      if (ref.current != null && callOnEsc) {
        if (e.key === "Escape") {
          callback();
        }
      }
    };
    const handleTouch = (e: TouchEvent) => {
      const eventTarget = e.target as Node;
      // Check the click is inside the exceptions
      if (exceptions && clickInsideExceptions(exceptions, eventTarget)) {
        return;
      }
      // If we we haven't set the node yet, or a click occurs within the target, return.
      if (ref.current == null || ref.current.contains(eventTarget)) {
        return;
      } else {
        callback();
      }
    };
    // Add event listener.
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchend", handleTouch);
    document.addEventListener("keydown", handleEsc);
    // Tear down event listener on cleanup.
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchend", handleTouch);
      document.removeEventListener("keydown", handleEsc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, callOnEsc]);

  return ref;
};

const clickInsideExceptions = (exceptionsIds: string[], eventTarget: Node) =>
  exceptionsIds.some((id) =>
    document.getElementById(id)?.contains(eventTarget)
  );
