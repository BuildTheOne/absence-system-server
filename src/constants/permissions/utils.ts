import { permissionActionTypeEnum } from '@/db/schema';

type LowercaseArray<T extends readonly string[]> = {
  [K in keyof T]: T[K] extends string ? Lowercase<T[K]> : T[K];
};

function toLowercaseList<T extends readonly string[]>(
  arr: T
): LowercaseArray<T> {
  return arr.map((s) => s.toLowerCase()) as any;
}

export const PermissionActionList = toLowercaseList(
  permissionActionTypeEnum.enumValues
);
