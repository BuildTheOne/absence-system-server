const companyMessage = [
  'COMPANY_NOT_FOUND',
  'COMPANY_ALREADY_EXIST',
  'COMPANY_REQUIRED',
] as const;

export const CompanyMessage = Object.fromEntries(
  companyMessage.map((k) => [k, `message.company.${k.toLowerCase()}`])
) as {
  [K in (typeof companyMessage)[number]]: string;
};
