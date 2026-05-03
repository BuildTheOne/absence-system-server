import { compare, genSalt, hash } from 'bcryptjs';

export const generateHash = async (str: string, salt: number = 10) => {
  return await hash(str, await genSalt(salt));
};

export const compareHash = async (plainSrt: string, hashStr: string) => {
  return await compare(plainSrt, hashStr);
};
