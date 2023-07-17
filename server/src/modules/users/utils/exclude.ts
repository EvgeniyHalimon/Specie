import { IUser } from '../../../shared/types/types';

export function exclude(
  user: IUser,
  keys: string[],
) {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key)),
  );
}