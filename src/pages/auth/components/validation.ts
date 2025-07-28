export const validateEmail = (value: string) => {
  const pattern = /^[\w.-]+@(gmail\.com|mail\.ru)$/;
  return !pattern.test(value)
    ? "Please enter a valid email ending with @gmail.com or @mail.ru."
    : "";
};

export const validatePassword = (value: string) => {
  return value.length < 8 ? "Password must be at least 8 characters long." : "";
};
