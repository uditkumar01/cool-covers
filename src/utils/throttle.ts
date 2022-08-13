export const throttle = (callback: Function, delay: number) => {
  let timeout: NodeJS.Timeout | null = null;
  const timeoutCallback = () => {
    if (updatedArgs !== null) {
      callback(...updatedArgs);
      updatedArgs = null;
      setTimeout(timeoutCallback, delay);
    }
    timeout = null;
  };
  let updatedArgs: any[] | null = null;

  return (...args: any[]) => {
    if (timeout !== null) {
      updatedArgs = args;
      return;
    }

    timeout = setTimeout(timeoutCallback, delay);
  };
};
