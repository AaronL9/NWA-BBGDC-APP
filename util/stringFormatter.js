export function limitStringLength(inputString, maxLength) {
  if (inputString.length > maxLength) {
    let trimmedString = inputString.substring(0, maxLength);

    while (/\s$/.test(trimmedString)) {
      trimmedString = trimmedString.substring(0, trimmedString.length - 1);
    }

    trimmedString += "...";

    return trimmedString;
  } else {
    return inputString;
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

export function trimStringValues(obj) {
  for (const prop in obj) {
    if (typeof obj[prop] === "string") {
      obj[prop] = obj[prop].trim();
    }
  }
}
