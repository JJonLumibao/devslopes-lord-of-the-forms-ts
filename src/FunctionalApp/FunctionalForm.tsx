import { Dispatch, SetStateAction, useState } from "react";
import { isCityValid, isEmailValid, isPhoneValid } from "../utils/validations";
import { capitalize, PhoneInputState } from "../utils/transformations";
import { UserInformation } from "../types";
import { FunctionalTextInput } from "./FunctionalTextInput";
import { FunctionalPhoneInput } from "./FunctionalPhoneInput";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "City is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";


export const FunctionalForm = ({setUserData}: {setUserData: Dispatch<SetStateAction<UserInformation | null>>}) => {
  const [firstNameInput, setFirstNameInput] = useState<string>("");
  const [lastNameInput, setLastNameInput] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");
  const [cityInput, setCityInput] = useState<string>("");
  const [phoneInput, setPhoneInput] = useState<PhoneInputState>(["", "", "", ""]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    
  const showFirstNameError = isSubmitted && firstNameInput.length < 2;
  const showLastNameError = isSubmitted && lastNameInput.length < 2;
  const showEmailError = isSubmitted && !isEmailValid(emailInput);
  const showCityError = isSubmitted && !isCityValid(cityInput);
  const showPhoneError = isSubmitted && !isPhoneValid(phoneInput.join(""));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setIsSubmitted(true);

        const hasErrors = 
          firstNameInput.length < 2 || 
          lastNameInput.length < 2 || 
          !isEmailValid(emailInput) || 
          !isCityValid(cityInput) || 
          !isPhoneValid(phoneInput.join(""));

        if(hasErrors) {
          alert("Bad Inputs");
          return;
        }

        setUserData({
          firstName: firstNameInput,
          lastName: lastNameInput,
          email: emailInput, 
          city: cityInput,
          phone: phoneInput.join(""),
        })
      }}
    >
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <FunctionalTextInput 
        label="First Name"
        placeholder="Bilbo"
        value={firstNameInput}
        errorMessage={firstNameErrorMessage}
        showError={showFirstNameError}
        onChange={(e) => {
          setFirstNameInput(capitalize(e.target.value));
        }}
      />

      {/* last name input */}
      <FunctionalTextInput 
        label="Last Name"
        placeholder="Baggins"
        value={lastNameInput}
        errorMessage={lastNameErrorMessage}
        showError={showLastNameError}
        onChange={(e) => {
          setLastNameInput(capitalize(e.target.value));
        }}
      />

      {/* Email Input */}
      <FunctionalTextInput 
        label="Email"
        placeholder="bilbo-baggins@adventurehobbits.net"
        value={emailInput}
        errorMessage={emailErrorMessage}
        showError={showEmailError}
        onChange={(e) => {
          setEmailInput(e.target.value);
        }}
      />

      {/* City Input */}
      <FunctionalTextInput 
        label="City"
        placeholder="Hobbiton"
        value={cityInput}
        errorMessage={cityErrorMessage}
        showError={showCityError}
        onChange={(e) => {
          setCityInput(e.target.value);
        }}
      />

      {/* Phone Input */}
      <FunctionalPhoneInput
        phoneInputState={phoneInput}
        setPhoneInputState={setPhoneInput}
        errorMessage={phoneNumberErrorMessage}
        showError={showPhoneError}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};
