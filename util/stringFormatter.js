export function limitStringLength(inputString, maxLength) {
  if (inputString.length <= maxLength) {
    return inputString;
  } else {
    return inputString.substring(0, maxLength - 3) + "...";
  }
}

export const extractFilename = (uri) => {
  const pathArray = uri.split("/");
  return pathArray[pathArray.length - 1];
};

export const extractErrorMessage = (errorCode) => {
  const errorMessage = errorCode.split("/");
  errorMessage.shift();
  const extractErrorMessage = errorMessage[0].split("-").join(" ");

  const formattedMessage =
    extractErrorMessage.charAt(0).toUpperCase() + extractErrorMessage.slice(1);

  return formattedMessage;
};
