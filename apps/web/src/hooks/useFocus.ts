export const useFocus = () => {
  const addListener = (input: HTMLInputElement) => {
    const handler = () => {
      input.focus();
    };
    window.addEventListener("custom-focus", handler);
    return () => {
      window.removeEventListener("custom-focus", handler);
    };
  };
  const focus = () => {
    window.dispatchEvent(new Event("custom-focus"));
  };
  return { addListener, focus };
};
