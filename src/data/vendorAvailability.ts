const unavailableDatesByVendor: Record<string, string[]> = {
  "1": ["2026-05-15", "2026-06-12"],
  "2": ["2026-05-10", "2026-05-17"],
  "3": ["2026-04-20", "2026-04-27"],
  "4": ["2026-05-22", "2026-05-29"],
  "5": ["2026-06-01"],
  "6": ["2026-05-05"],
  "7": ["2026-05-30"],
  "8": ["2026-05-18"],
  "9": ["2026-05-11"],
  "10": ["2026-05-19"],
  "17": ["2026-05-14"],
  "18": ["2026-05-16"],
  "201": ["2026-05-24"],
  "202": ["2026-06-07"],
  "203": ["2026-06-14"],
  "301": ["2026-05-21"],
  "302": ["2026-05-28"],
  "303": ["2026-06-11"],
};

const toIsoDate = (value: string) => new Date(value).toISOString().slice(0, 10);

export const isVendorAvailableOnDate = (vendorId: string, isoDate: string): boolean => {
  if (!isoDate) return true;
  const blocked = unavailableDatesByVendor[vendorId] ?? [];
  return !blocked.includes(toIsoDate(isoDate));
};

export const getVendorUnavailableDates = (vendorId: string): string[] => unavailableDatesByVendor[vendorId] ?? [];
