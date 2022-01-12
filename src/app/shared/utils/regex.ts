export const regex: {
  email: RegExp;
  password: RegExp;
  number: RegExp;
} = {
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password:
    /^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{8,}$/,
  number: /^\d+$/,
};

export const regexErrors: {
  email: string;
  password: string;
  number: string;
} = {
  email: 'Invalid email',
  password:
    'The password must contain an uppercase letter, a lowercase letter, a number and a special character',
  number: 'Only enter numbers',
};
