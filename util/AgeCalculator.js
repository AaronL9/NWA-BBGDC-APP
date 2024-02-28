import firesotre from "@react-native-firebase/firestore";
import { parse, differenceInYears, isBefore } from "date-fns";

export function getAge(birthdate) {
  const parsedBirthdate = parse(birthdate, "MMMM d, yyyy", new Date());

  if (!parsedBirthdate || isNaN(parsedBirthdate.getTime())) {
    console.log("Invalid date format");
  }

  const currentDate = new Date();

  const age = differenceInYears(currentDate, parsedBirthdate);

  if (isBefore(parsedBirthdate, currentDate)) {
    return age;
  } else {
    return age - 1;
  }
}

export async function updateAge(birthdate, currentAge, uid) {
  const parsedBirthdate = parse(birthdate, "MMMM d, yyyy", new Date());

  if (!parsedBirthdate || isNaN(parsedBirthdate.getTime())) {
    console.log("Invalid date format");
  }

  const currentDate = new Date();

  const age = differenceInYears(currentDate, parsedBirthdate);

  if (age > currentAge) {
    try {
      await firesotre().collection("users").doc(uid).update({ age });
    } catch (error) {
      console.log(error);
    }
  }
}
