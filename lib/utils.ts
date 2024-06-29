import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stripTrailingVariable(str: string) {
  return str.replace(/ Variable$/, '');
}

export function getProseMirror() {
  const elements = document.getElementsByClassName('ProseMirror');
  if (elements.length > 1) {
    console.error(
      "There is more than one HTML element with the class 'ProseMirror'!"
    );
  }
  const prosemirror = elements[0] as HTMLDivElement;
  return prosemirror;
}

export function pixelsToCm(px: number) {
  return (px / 96) * 2.54;
}

export function isNumber(str: string): boolean {
  return /^[+-]?\d+(\.\d+)?$/.test(str);
}
