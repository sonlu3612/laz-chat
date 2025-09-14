import { isEmail, matches } from "validator";

const firstNameRegex = /^[A-Za-z]+(?:[-\s][A-Za-z]+)*$/;
const lastNameRegex = /^[A-Za-z]+(?:[-\s][A-Za-z]+)*$/;
const phoneNumberRegex = /^[0-9]{10}$/;
const passwordRegex_HasLowercase = /[a-z]/;
const passwordRegex_HasUppercase = /[A-Z]/;
const passwordRegex_HasDigit = /\d/;
const passwordRegex_HasUniqueChar = /[@$!%*?&]/;

export const validateFirstName = (firstName) => {
  if (!firstName.trim()) {
    return "First name is required.";
  }

  if (firstName.length > 20) {
    return "First name cannot exceed 20 characters.";
  }

  if (!matches(firstName, firstNameRegex)) {
    return "First name can only contain letters and cannot start or end with a space or a hyphen.";
  }

  return "";
};

export const validateLastName = (lastName) => {
  if (!lastName.trim()) {
    return "Last name is required.";
  }

  if (lastName.length > 20) {
    return "Last name cannot exceed 20 characters.";
  }

  if (!matches(lastName, lastNameRegex)) {
    return "Last name can only contain letters cannot start or end with a space or a hyphen.";
  }

  return "";
};

export const validateEmail = (email) => {
  if (!email.trim()) {
    return "Email is required.";
  }

  if (!isEmail(email)) {
    return "Email is not valid";
  }

  return "";
};

export const validatePhoneNumber = (phoneNumber) => {
  if (!phoneNumber.trim()) {
    return "PhoneNumber is required.";
  }

  if (!(phoneNumber.length == 10)) {
    return "PhoneNumber must be 10 digits.";
  }

  if (!matches(phoneNumber, phoneNumberRegex)) {
    return "Phone Number can only contain letters and numbers.";
  }

  return "";
};

export const validatePassword = (password) => {
  if (!password.trim()) {
    return "Password is required.";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters long.";
  }

  if (password.length > 20) {
    return "Password cannot exceed 20 characters.";
  }

  if (!matches(password, passwordRegex_HasLowercase)) {
    return "Password needs at least 1 digit, 1 lowercase, 1 uppercase and 1 unique char(@, $, !, %, *, ?, &)";
  }

  if (!matches(password, passwordRegex_HasUppercase)) {
    return "Password needs at least 1 digit, 1 lowercase, 1 uppercase and 1 unique char(@, $, !, %, *, ?, &)";
  }

  if (!matches(password, passwordRegex_HasDigit)) {
    return "Password needs at least 1 digit, 1 lowercase, 1 uppercase and 1 unique char(@, $, !, %, *, ?, &)";
  }

  if (!matches(password, passwordRegex_HasUniqueChar)) {
    return "Password needs at least 1 digit, 1 lowercase, 1 uppercase and 1 unique char(@, $, !, %, *, ?, &)";
  }

  return "";
};

export const validateConfirmPassword = (
  password,
  passwordError,
  confirmPassword
) => {
  // Because password field is invalid so we don't need to check confirmPassword
  if (passwordError != "") {
    return "";
  }

  if (!confirmPassword.trim()) {
    return "Confirm Password is required.";
  }

  if (
    confirmPassword.length < 6 ||
    confirmPassword.length > 20 ||
    password !== confirmPassword
  ) {
    return "Confirm Password must match the Password";
  }

  return "";
};
