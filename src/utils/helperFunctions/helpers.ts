export const stopFuncDefaultPropagation = (
  e: React.MouseEvent<HTMLButtonElement>,
  func: Function
) => {
  e.stopPropagation();
  func();
};
