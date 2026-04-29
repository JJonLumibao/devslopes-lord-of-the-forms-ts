export const capitalize = (val: string) => {
  return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
};

export type PhoneInputState = [string, string, string, string];

export const formatPhoneNumber = (phone: string) => {
    return `${phone.slice(0,2)}-${phone.slice(2,4)}-${phone.slice(4,6)}-${phone.slice(6)}`;
}