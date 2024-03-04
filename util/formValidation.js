export const validateSignUpForm = (values, setErrors) => {
  const errors = {};

  if (!values.firstName.trim()) {
    errors.firstName = "First Name is required";
  }

  if (!values.lastName.trim()) {
    errors.lastName = "Last Name is required";
  }

  if (!values.birthdate.trim()) {
    errors.birthDate = "Birth Date is required";
  }

  if (!values.houseAddress.trim()) {
    errors.houseAddress = "House Address is required";
  }

  if (!values.area.trim()) {
    errors.area = "Area is required";
  }

  if (Object.keys(errors).length === 0) {
    setErrors(null);
    return true;
  } else {
    setErrors(errors);
    return false;
  }
};

export function validatePhoneNumber(phoneNumber, setError) {
  const cleanedNumber = phoneNumber.trim();

  // Check if there are any characters aside from numbers
  if (/[^0-9+]/.test(cleanedNumber)) {
    setError("Invalid phone number");
    return null;
  }

  if (cleanedNumber.startsWith("+63") && cleanedNumber.length === 13) {
    return cleanedNumber;
  } else if (cleanedNumber.startsWith("09") && cleanedNumber.length === 11) {
    return "+63" + cleanedNumber.slice(1);
  } else {
    setError("Invalid phone number");
    return null;
  }
}
