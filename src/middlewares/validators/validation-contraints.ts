export const notEmpty = {
  bail: true,
  errorMessage: 'This field is required'
};

export const isNumeric = {
  bail: true,
  errorMessage: 'This field is invalid',
};

export const isEmail = {
  bail: true,
  errorMessage: 'This field is invalid'
};

export const isPrice = {
  bail: true,
  options: { min: 0 },
  errorMessage: 'This field is invalid',
};

export const isMobilePhone = {
  bail: true,
  errorMessage: 'This field is invalid'
};

export const isBoolean = {
  bail: true,
  errorMessage: 'This field is invalid',
};

export const isPasswordLength = {
  bail: true,
  options: { min: 6 },
  errorMessage: 'This field is too short'
};

export const isMobilePhoneLength = {
  bail: true,
  options: { max: 11, min: 11 },
  errorMessage: 'This field is invalid'
};
