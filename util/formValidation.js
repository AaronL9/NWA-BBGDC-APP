export const validateSignUpForm = (values, setErrors) => {
  const errors = {};

  if (!values.firstName.trim()) {
    errors.firstName = "First Name is required";
  }

  if (!values.lastName.trim()) {
    errors.lastName = "Last Name is required";
  }

  if (!values.birthDate.trim()) {
    errors.birthDate = "Birth Date is required";
  }

  if (!values.address || !values.address.houseNo.trim()) {
    errors.houseNo = "House Number is required";
  }

  if (!values.address || !values.address.street.trim()) {
    errors.street = "Street is required";
  }

  setErrors(errors);
  return Object.keys(errors).length === 0;
};

export function validatePhoneNumber(phoneNumber, setError) {
  const cleanedNumber = phoneNumber.trim();

  // Check if there are any characters aside from numbers
  if (/[^0-9]/.test(cleanedNumber)) {
    setError("Phone number should only contain numeric characters");
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
