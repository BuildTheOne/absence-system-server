import { ZodType } from 'zod';

export const filterResult = <T extends ZodType>(
  schema: T,
  rawData: any | any[]
) => {
  if (Array.isArray(rawData)) {
    return rawData.map((data) => schema.parse(data));
  }
  return schema.parse(rawData);
};
