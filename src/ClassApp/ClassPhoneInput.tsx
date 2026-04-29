import { Component, createRef } from "react";
import { PhoneInputState } from "../utils/transformations";
import { ErrorMessage } from "../ErrorMessage";

type Props = {
  phoneInputState: PhoneInputState;
  setPhoneInputState: (value: PhoneInputState) => void;
  errorMessage: string;
  showError: boolean;
};

export class ClassPhoneInput extends Component<Props> {
  phoneRefs = [
    createRef<HTMLInputElement>(),
    createRef<HTMLInputElement>(),
    createRef<HTMLInputElement>(),
    createRef<HTMLInputElement>(),
  ];

  handlePhoneChange =
    (index: 0 | 1 | 2 | 3, maxLength: number) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value.replace(/\D/g, "").slice(0, maxLength);

      const newState = [...this.props.phoneInputState] as PhoneInputState;
      newState[index] = val;

      this.props.setPhoneInputState(newState);

      if (val.length === maxLength && index < 3) {
        this.phoneRefs[index + 1].current?.focus();
      }
    };

  handleKeyDown =
    (index: 0 | 1 | 2 | 3) =>
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        e.key === "Backspace" &&
        this.props.phoneInputState[index] === "" &&
        index > 0
      ) {
        this.phoneRefs[index - 1].current?.focus();
      }
    };

  render() {
    const phone = this.props.phoneInputState;

    return (
      <>
      
        <div className="input-wrap">
          <label htmlFor="phone">Phone:</label>
          <div id="phone-input-wrap">
            <input
              type="text"
              id="phone-input-1"
              placeholder="55"
              ref={this.phoneRefs[0]}
              value={phone[0]}
              onChange={this.handlePhoneChange(0, 2)}
              onKeyDown={this.handleKeyDown(0)}
            />
            -
            <input
              type="text"
              id="phone-input-2"
              placeholder="55"
              ref={this.phoneRefs[1]}
              value={phone[1]}
              onChange={this.handlePhoneChange(1, 2)}
              onKeyDown={this.handleKeyDown(1)}
            />
            -
            <input
              type="text"
              id="phone-input-3"
              placeholder="55"
              ref={this.phoneRefs[2]}
              value={phone[2]}
              onChange={this.handlePhoneChange(2, 2)}
              onKeyDown={this.handleKeyDown(2)}
            />
            -
            <input
              type="text"
              id="phone-input-4"
              placeholder="5"
              ref={this.phoneRefs[3]}
              value={phone[3]}
              onChange={this.handlePhoneChange(3, 1)}
              onKeyDown={this.handleKeyDown(3)}
            />
          </div>
        </div>
        <ErrorMessage 
          message={this.props.errorMessage}
          show={this.props.showError}
        />
      </>
    );
  }
}