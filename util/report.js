export const validateReportForm = (values, setErrors) => {
  const errors = {};

  if (!values.address.trim()) {
    errors.address = "Location is required";
  }

  if (!values.offense.trim()) {
    errors.offense = "Offense is required";
  }

  if (!values.description.trim()) {
    errors.description = "Description is required";
  }

  // Rest of the validation logic remains the same

  setErrors(errors);
  return Object.keys(errors).length === 0;
};
