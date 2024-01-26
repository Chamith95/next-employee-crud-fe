import { Gender } from "./enums";

export function getGenderKeyByValue(value: string): string | undefined {
    return Object.keys(Gender).find(key => Gender[key as keyof typeof Gender] === value);
  }