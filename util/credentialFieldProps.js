export const signUpInitValue = {
  firstName: "",
  lastName: "",
  birthdate: "",
  houseAddress: "",
  area: "",
  disabled: false,
};

export const credentialFieldProps = (setCredential) => {
  return {
    firstName: {
      icon: "person",
      placeholder: "First Name",
      customStyle: { flex: 1 },
      changeTextHandler: (enteredText) =>
        onChangeValueHandler("firstName", setCredential, enteredText),
    },
    lastName: {
      icon: "person",
      placeholder: "Last Name",
      customStyle: { flex: 1 },
      changeTextHandler: (enteredText) =>
        onChangeValueHandler("lastName", setCredential, enteredText),
    },
  };
};

const onChangeValueHandler = (identifier, setCredential, enteredText) => {
  const value = enteredText.trim();

  setCredential((prev) => {
    return {
      ...prev,
      [identifier]: value,
    };
  });
};
