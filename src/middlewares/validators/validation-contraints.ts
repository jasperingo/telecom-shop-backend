
export const notEmpty = {
  bail: true,
  errorMessage: 'This field is required'
};

export const isEmail = {
  bail: true,
  errorMessage: 'This field is invalid'
};

export const isMobilePhone = {
  bail: true,
  errorMessage: 'This field is invalid'
};

export const isPasswordLength = {
  bail: true,
  options: { min: 6 },
  errorMessage: 'This field is too short'
};
