/** Name and email collected on the Signup / Login page before the account form. */
export interface SignupInfo {
    name: string;
    email: string;
}

/** Account details step: title, password, and date of birth. */
export interface AccountInfo {
    title: string,
    password: string,
    dob: {
        day: string,
        month: string,
        year: string
    }
}

/** Address and contact fields on the "Enter Account Information" form. */
export interface AddressInfo {
    firstName: string,
    lastName: string,
    company: string,
    address: string,
    address2: string,
    country: string,
    state: string,
    city: string,
    zipcode: string,
    mobileNumber: string
}

/** Credentials used on the Signup / Login page (email + password). */
export interface SignInInfo {
    email: string;
    password: string
}