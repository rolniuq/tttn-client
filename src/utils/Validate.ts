export const ValidatePhone = (phone: string) => {
  if (!phone.match(/(84|0[3|5|7|8|9])+([0-9]{8,9})\b/)) {
    return false;
  }
  return true;
};

export const ValidateEmail = (email: string) => {
  if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    return false;
  }
  return true;
};

export const ComparePassword = (password: string, cPassword: string) => {
  if (password !== cPassword) {
    return false;
  }
  return true;
};
