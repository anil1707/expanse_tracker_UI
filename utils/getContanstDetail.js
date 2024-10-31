import { useEffect, useState } from "react";
import * as Contacts from "expo-contacts";

const useContactByNumber = async (phoneNumber) => {
  let obj = { contactName: "", number:"", error: "" };
  const fetchContact = async () => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });
        if (data.length > 0) {
          const contact = data.find(
            (contact) =>
              contact.phoneNumbers &&
              contact.phoneNumbers.some(
                (pn) => {
                  const phoneWithoutCountryCode = pn.number.replace(
                    /^\+\d{1,2}(?=\s|\d)/,
                    ""
                  );
                  const numberWithoutSpaces = phoneWithoutCountryCode.replace(
                    /\s+/g,
                    ""
                  )
                  return numberWithoutSpaces === phoneNumber;
                }
              )
          );
          if (contact?.name) {
            obj["contactName"] = contact?.name;
            obj["number"] = contact?.phoneNumbers[0].number;
          } else {
            console.log("Contact not found");
            obj["contactName"] = "Contact not found";
          }
        } else {
          console.log("No contacts available");
          obj["contactName"] = "No contacts found";
        }
      } else {
        console.log("Permission denied");
        obj["error"] = "Permission denied";
      }
    } catch (err) {
      console.error("Error fetching contact:", err);
      obj["error"] = "Error fetching contact";
    }

    return { contactName: obj.contactName, number: obj.number, error: obj.error };
  };

  const result = await fetchContact();
  return result;
};

export default useContactByNumber;
