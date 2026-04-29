import { useRef } from "react";
import { PhoneInputState } from "../utils/transformations";
import { ErrorMessage } from "../ErrorMessage";

type Props = {
  phoneInputState: PhoneInputState;
  setPhoneInputState: React.Dispatch<React.SetStateAction<PhoneInputState>>;
  errorMessage: string;
  showError: boolean;
};

export const FunctionalPhoneInput = ({
  phoneInputState,
  setPhoneInputState,
  errorMessage,
  showError,
}: Props) => {
  
  const phoneRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handlePhoneChange =
    (index: 0 | 1 | 2 | 3, maxLength: number) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value.replace(/\D/g, "").slice(0, maxLength);

      const newState = [...phoneInputState] as PhoneInputState;
      newState[index] = val;

      setPhoneInputState(newState);

      if (val.length === maxLength && index < 3) {
        phoneRefs[index + 1].current?.focus();
      }
    };

  const handleKeyDown =
    (index: 0 | 1 | 2 | 3) =>
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && phoneInputState[index] === "" && index > 0) {
        phoneRefs[index - 1].current?.focus();
      }
    };

  return (
    <>
      <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>
        <div id="phone-input-wrap">
          <input
            type="text"
            id="phone-input-1"
            placeholder="55"
            ref={phoneRefs[0]}
            value={phoneInputState[0]}
            onChange={handlePhoneChange(0, 2)}
            onKeyDown={handleKeyDown(0)}
          />
          -
          <input
            type="text"
            id="phone-input-2"
            placeholder="55"
            ref={phoneRefs[1]}
            value={phoneInputState[1]}
            onChange={handlePhoneChange(1, 2)}
            onKeyDown={handleKeyDown(1)}
          />
          -
          <input
            type="text"
            id="phone-input-3"
            placeholder="55"
            ref={phoneRefs[2]}
            value={phoneInputState[2]}
            onChange={handlePhoneChange(2, 2)}
            onKeyDown={handleKeyDown(2)}
          />
          -
          <input
            type="text"
            id="phone-input-4"
            placeholder="5"
            ref={phoneRefs[3]}
            value={phoneInputState[3]}
            onChange={handlePhoneChange(3, 1)}
            onKeyDown={handleKeyDown(3)}
          />
        </div>
      </div>
      <ErrorMessage 
          message={errorMessage} 
          show={showError} 
      />
    </>
  );
};