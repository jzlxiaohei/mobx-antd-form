export function isString(str: any) {
  return typeof str === 'string' || str instanceof String;
}

export function validateHasError(str: string | any) {
  if (isString(str) && str) {
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
