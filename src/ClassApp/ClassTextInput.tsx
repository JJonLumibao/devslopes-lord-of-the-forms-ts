import { Component } from "react";
import { ErrorMessage } from "../ErrorMessage";

type TextInputProps = {
  label: string, 
  placeholder: string,
  value: string,
  errorMessage: string,
  showError: boolean,
  onChange: React.ChangeEventHandler<HTMLInputElement>,
}

export class ClassTextInput extends Component<TextInputProps> {
  render () {
    const {label, placeholder, value, errorMessage, showError, onChange} = this.props;
    return (
      <>
        <div className="input-wrap">
          <label>{label}:</label>
          <input 
            type="text"
            placeholder={placeholder} 
            value={value}
            onChange={onChange}
          />
        </div>
        <ErrorMessage 
          message={errorMessage} 
          show={showError} 
        />
      </>
    );
  }
}