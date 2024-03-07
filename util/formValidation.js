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
  const input = phoneNumber.trim();

  if (/^\+639\d{9}$/.test(input) && input.length === 13) {
    return input;
  }

  if (/^09\d{9}$/.test(input) && input.length === 11) {
    return "+63" + input.slice(1);
  }

  setError("Invalid phone number");
  return null;
}
