import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { UserInformation } from "../types";
import { ProfileInformation } from "../ProfileInformation";
type State = { userInformation: UserInformation | null };

export class ClassApp extends Component<Record<string, never>, State> {
  state: State = {
    userInformation: null
  };

  render() {
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation
          userData={this.state.userInformation}
        />
        <ClassForm 
          setUserData={(data) => this.setState({userInformation: data})}
        />
      </>
    );
  }
}
