import { allCities } from "./all-cities";

export function isEmailValid(emailAddress: string) {
    // eslint-disable-next-line no-useless-escape
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return !!emailAddress.match(regex);
}

export function isCityValid(city: string) {
    return allCities.includes(city.charAt(0).toUpperCase() + city.slice(1).toLowerCase());
}

export function isPhoneValid(phoneNumber: string) {
    return /^\d{7}$/.test(phoneNumber);
}