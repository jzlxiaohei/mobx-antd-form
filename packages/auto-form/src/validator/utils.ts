export function isStringAndNotEmpty(str: any) {
  const isString = typeof str === 'string';
  return isString && str;
}

export function isString(str: any) {
  return typeof str === 'string';
}

export function validateHasError(str: string | any) {
  if (isStringAndNotEmpty(str)) {
    return true;
  }

  return false;
}
