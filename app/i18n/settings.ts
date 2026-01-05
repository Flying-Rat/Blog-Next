export const fallbackLng = "en";
export const languages = ["en", "cs"] as const;
export type Language = (typeof languages)[number];
