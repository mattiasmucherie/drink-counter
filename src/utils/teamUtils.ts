import { userDrinkInfo } from "./../constants/types/index";
export const sortOnTotal = (usersDrink: userDrinkInfo[]) =>
  usersDrink.sort((a: userDrinkInfo, b: userDrinkInfo) => b.total - a.total);
