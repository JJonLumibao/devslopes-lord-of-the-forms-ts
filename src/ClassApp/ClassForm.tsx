import { Component, createRef } from "react";
import { isCityValid, isEmailValid, isPhoneValid } from "../utils/validations";
import { capitalize, PhoneInputState } from "../utils/transformations";
import { UserInformation } from "../types";
import { ClassPhoneInput } from "./ClassPhoneInput";
import { ClassTextInput } from "./ClassTextInput";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

type Props = {
  setUserData: (data: UserInformation) => void;
}

export class ClassForm extends Component<Props> {
  state = {
    firstNameInput: "",
    lastNameInput: "",
    emailInput: "",
    cityInput: "",
    phoneInput: ["", "", "", ""] as PhoneInputState,
    isSubmitted: false,
  }

  phoneRefs = [createRef<HTMLInputElement>(), createRef<HTMLInputElement>(), createRef<HTMLInputElement>(), createRef<HTMLInputElement>()];
  
  render() {    
    const {firstNameInput, lastNameInput, emailInput, cityInput, phoneInput, isSubmitted} = this.state;

    const showFirstNameError = isSubmitted && firstNameInput.length < 2;
    const showLastNameError = isSubmitted && lastNameInput.length < 2;
    const showEmailError = isSubmitted && !isEmailValid(emailInput);
    const showCityError = isSubmitted && !isCityValid(cityInput);
    const showPhoneError = isSubmitted && !isPhoneValid(phoneInput.join(""));

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          this.setState({isSubmitted: true});

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

          this.props.setUserData({
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
        <ClassTextInput 
          label="First Name"
          placeholder="Bilbo"
          value={firstNameInput}
          errorMessage={firstNameErrorMessage}
          showError={showFirstNameError}
          onChange={(e) => {
            this.setState({firstNameInput: capitalize(e.target.value)})
          }}
        />

        {/* last name input */}
        <ClassTextInput 
          label="Last Name"
          placeholder="Baggins"
          value={lastNameInput}
          errorMessage={lastNameErrorMessage}
          showError={showLastNameError}
          onChange={(e) => {
            this.setState({lastNameInput: capitalize(e.target.value)})
          }}
        />

        {/* Email Input */}
        <ClassTextInput 
          label="Email"
          placeholder="bilbo-baggins@adventurehobbits.net"
          value={emailInput}
          errorMessage={emailErrorMessage}
          showError={showEmailError}
          onChange={(e) => {
            this.setState({emailInput: e.target.value});
          }}
        />

        {/* City Input */}
        <ClassTextInput 
          label="City"
          placeholder="Hobbiton"
          value={cityInput}
          errorMessage={cityErrorMessage}
          showError={showCityError}
          onChange={(e) => {
            this.setState({cityInput: e.target.value});
          }}
        />

        {/* Phone Input */}
        <ClassPhoneInput 
          phoneInputState={phoneInput}
          setPhoneInputState={(value) => {
            this.setState({phoneInput: value})
          }}
          errorMessage={phoneNumberErrorMessage}
          showError={showPhoneError}
        />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
