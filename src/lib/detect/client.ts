export const isAndroid = () => {
  if (!global.navigator) return undefined;
  const userAgent = navigator.userAgent;
  return userAgent.match(/Android/i);
};

export const isIphone = () => {
  if (!global.navigator) return undefined;
  const userAgent = navigator.userAgent;
  return userAgent.match(/iPhone/i);
};

export const isMobile = () => {
  return isAndroid() || isIphone();
};

export const isWindows = () => {
  if (!global.navigator) return undefined;
  const userAgent = navigator.userAgent;
  return userAgent.match(/Windows/i);
};

export const isMac = () => {
  if (!global.navigator) return undefined;
  const userAgent = navigator.userAgent;
  return userAgent.match(/Mac/i);
};

export const isLinux = () => {
  if (!global.navigator) return undefined;
  const userAgent = navigator.userAgent;
  return userAgent.match(/Linux/i);
};

export const isDesktop = () => {
  return isWindows() || isMac() || isLinux();
};
