export function isStringAndNotEmpty(str: any) {
  const isString = typeof str === 'string' || str instanceof String;
  return isString && str;
}

export function validateHasError(str: string | any) {
  if (isStringAndNotEmpty(str)) {
    return {
      error: true,
      message: str,
    };
  }

  return {
    error: false,
    message: '',
  };
}
