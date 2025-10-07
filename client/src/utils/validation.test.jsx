import { describe, expect, test } from "vitest";
import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePhoneNumber,
  validatePassword,
  validateConfirmPassword,
} from "./validation";

describe("validateFirstName", () => {
  test("should return error when firstName is empty", () => {
    expect(validateFirstName("")).toBe("First name is required.");
    expect(validateFirstName("   ")).toBe("First name is required.");
  });

  test("should return error when firstName exceeds 20 characters", () => {
    expect(validateFirstName("A".repeat(21))).toBe(
      "First name cannot exceed 20 characters."
    );
  });

  test("should return error when firstName contains invalid characters", () => {
    expect(validateFirstName("John123")).toBe(
      "First name can only contain letters and cannot start or end with a space or a hyphen."
    );
    expect(validateFirstName("John@Doe")).toBe(
      "First name can only contain letters and cannot start or end with a space or a hyphen."
    );
  });

  test("should return error when firstName starts or ends with hyphen", () => {
    expect(validateFirstName("-John")).toBe(
      "First name can only contain letters and cannot start or end with a space or a hyphen."
    );
    expect(validateFirstName("John-")).toBe(
      "First name can only contain letters and cannot start or end with a space or a hyphen."
    );
  });

  test("should return error when firstName starts or ends with space", () => {
    expect(validateFirstName(" John")).toBe(
      "First name can only contain letters and cannot start or end with a space or a hyphen."
    );
    expect(validateFirstName("John ")).toBe(
      "First name can only contain letters and cannot start or end with a space or a hyphen."
    );
  });

  test("should return empty string for valid firstName", () => {
    expect(validateFirstName("John")).toBe("");
    expect(validateFirstName("Hưng")).toBe("");
    expect(validateFirstName("Jean-Paul")).toBe("");
    expect(validateFirstName("Mary Jane")).toBe("");
    expect(validateFirstName("O'Connor")).toBe("");
  });

  test("should return empty string for valid firstName with exactly 20 characters", () => {
    expect(validateFirstName("A".repeat(20))).toBe("");
  });
});

describe("validateLastName", () => {
  test("should return error when lastName is empty", () => {
    expect(validateLastName("")).toBe("Last name is required.");
    expect(validateLastName("   ")).toBe("Last name is required.");
  });

  test("should return error when lastName exceeds 20 characters", () => {
    expect(validateLastName("A".repeat(21))).toBe(
      "Last name cannot exceed 20 characters."
    );
  });

  test("should return error when lastName contains invalid characters", () => {
    expect(validateLastName("Smith123")).toBe(
      "Last name can only contain letters cannot start or end with a space or a hyphen."
    );
    expect(validateLastName("Smith@Doe")).toBe(
      "Last name can only contain letters cannot start or end with a space or a hyphen."
    );
  });

  test("should return error when lastName starts or ends with hyphen", () => {
    expect(validateLastName("-Smith")).toBe(
      "Last name can only contain letters cannot start or end with a space or a hyphen."
    );
    expect(validateLastName("Smith-")).toBe(
      "Last name can only contain letters cannot start or end with a space or a hyphen."
    );
  });

  test("should return error when lastName starts or ends with space", () => {
    expect(validateLastName(" Smith")).toBe(
      "Last name can only contain letters cannot start or end with a space or a hyphen."
    );
    expect(validateLastName("Smith ")).toBe(
      "Last name can only contain letters cannot start or end with a space or a hyphen."
    );
  });

  test("should return empty string for valid lastName", () => {
    expect(validateLastName("Smith")).toBe("");
    expect(validateLastName("Nguyễn")).toBe("");
    expect(validateLastName("Van-Der-Berg")).toBe("");
    expect(validateLastName("De La Cruz")).toBe("");
  });

  test("should return empty string for valid lastName with exactly 20 characters", () => {
    expect(validateLastName("A".repeat(20))).toBe("");
  });
});

describe("validateEmail", () => {
  test("should return error when email is empty", () => {
    expect(validateEmail("")).toBe("Email is required.");
    expect(validateEmail("   ")).toBe("Email is required.");
  });

  test("should return error when email is not valid", () => {
    expect(validateEmail("invalid")).toBe("Email is not valid");
    expect(validateEmail("invalid@")).toBe("Email is not valid");
    expect(validateEmail("@invalid.com")).toBe("Email is not valid");
    expect(validateEmail("invalid@.com")).toBe("Email is not valid");
    expect(validateEmail("invalid@domain")).toBe("Email is not valid");
    expect(validateEmail("invalid domain@test.com")).toBe("Email is not valid");
  });

  test("should return empty string for valid email", () => {
    expect(validateEmail("test@example.com")).toBe("");
    expect(validateEmail("user.name@domain.com")).toBe("");
    expect(validateEmail("user+tag@example.co.uk")).toBe("");
    expect(validateEmail("test123@test-domain.com")).toBe("");
  });
});

describe("validatePhoneNumber", () => {
  test("should return error when phoneNumber is empty", () => {
    expect(validatePhoneNumber("")).toBe("PhoneNumber is required.");
    expect(validatePhoneNumber("   ")).toBe("PhoneNumber is required.");
  });

  test("should return error when phoneNumber is not 10 digits", () => {
    expect(validatePhoneNumber("123")).toBe("PhoneNumber must be 10 digits.");
    expect(validatePhoneNumber("12345678901")).toBe(
      "PhoneNumber must be 10 digits."
    );
  });

  test("should return error when phoneNumber contains invalid characters", () => {
    expect(validatePhoneNumber("123456789a")).toBe(
      "Phone Number can only contain letters and numbers."
    );
    expect(validatePhoneNumber("123-456-7890")).toBe(
      "Phone Number can only contain letters and numbers."
    );
    expect(validatePhoneNumber("(123)456-7890")).toBe(
      "Phone Number can only contain letters and numbers."
    );
    expect(validatePhoneNumber("123 456 7890")).toBe(
      "Phone Number can only contain letters and numbers."
    );
  });

  test("should return empty string for valid phoneNumber", () => {
    expect(validatePhoneNumber("1234567890")).toBe("");
    expect(validatePhoneNumber("0987654321")).toBe("");
  });
});

describe("validatePassword", () => {
  test("should return error when password is empty", () => {
    expect(validatePassword("")).toBe("Password is required.");
    expect(validatePassword("   ")).toBe("Password is required.");
  });

  test("should return error when password is less than 6 characters", () => {
    expect(validatePassword("Abc1@")).toBe(
      "Password must be at least 6 characters long."
    );
  });

  test("should return error when password exceeds 20 characters", () => {
    expect(validatePassword("Abc123@" + "a".repeat(15))).toBe(
      "Password cannot exceed 20 characters."
    );
  });

  test("should return error when password does not have lowercase", () => {
    expect(validatePassword("ABC123@")).toBe(
      "Password needs at least 1 digit, 1 lowercase, 1 uppercase and 1 unique char(@, $, !, %, *, ?, &)"
    );
  });

  test("should return error when password does not have uppercase", () => {
    expect(validatePassword("abc123@")).toBe(
      "Password needs at least 1 digit, 1 lowercase, 1 uppercase and 1 unique char(@, $, !, %, *, ?, &)"
    );
  });

  test("should return error when password does not have digit", () => {
    expect(validatePassword("Abcdef@")).toBe(
      "Password needs at least 1 digit, 1 lowercase, 1 uppercase and 1 unique char(@, $, !, %, *, ?, &)"
    );
  });

  test("should return error when password does not have unique char", () => {
    expect(validatePassword("Abc1234")).toBe(
      "Password needs at least 1 digit, 1 lowercase, 1 uppercase and 1 unique char(@, $, !, %, *, ?, &)"
    );
  });

  test("should return empty string for valid password", () => {
    expect(validatePassword("Abc123@")).toBe("");
    expect(validatePassword("Password1!")).toBe("");
    expect(validatePassword("Test123$")).toBe("");
    expect(validatePassword("Valid1%")).toBe("");
    expect(validatePassword("Strong1*")).toBe("");
    expect(validatePassword("Secure1?")).toBe("");
    expect(validatePassword("Good1&")).toBe("");
  });

  test("should return empty string for valid password with exactly 20 characters", () => {
    expect(validatePassword("Abc123@" + "a".repeat(13))).toBe("");
  });
});

describe("validateConfirmPassword", () => {
  test("should return empty string when password has error", () => {
    const passwordError = "Password is required.";
    expect(validateConfirmPassword("", passwordError, "")).toBe("");
    expect(validateConfirmPassword("Abc123@", passwordError, "Abc123@")).toBe(
      ""
    );
  });

  test("should return error when confirmPassword is empty and password is valid", () => {
    expect(validateConfirmPassword("Abc123@", "", "")).toBe(
      "Confirm Password is required."
    );
    expect(validateConfirmPassword("Abc123@", "", "   ")).toBe(
      "Confirm Password is required."
    );
  });

  test("should return error when confirmPassword is less than 6 characters", () => {
    expect(validateConfirmPassword("Abc123@", "", "Abc1@")).toBe(
      "Confirm Password must match the Password"
    );
  });

  test("should return error when confirmPassword exceeds 20 characters", () => {
    expect(
      validateConfirmPassword("Abc123@", "", "Abc123@" + "a".repeat(15))
    ).toBe("Confirm Password must match the Password");
  });

  test("should return error when confirmPassword does not match password", () => {
    expect(validateConfirmPassword("Abc123@", "", "Abc123!")).toBe(
      "Confirm Password must match the Password"
    );
    expect(validateConfirmPassword("Password1!", "", "Password1@")).toBe(
      "Confirm Password must match the Password"
    );
  });

  test("should return empty string when confirmPassword matches password", () => {
    expect(validateConfirmPassword("Abc123@", "", "Abc123@")).toBe("");
    expect(validateConfirmPassword("Password1!", "", "Password1!")).toBe("");
    expect(validateConfirmPassword("Test123$", "", "Test123$")).toBe("");
  });
});
