import React, { Component } from 'react';
import { InputGroup, Input, Button }  from 'reactstrap';
class AccountSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
  this.onUsernameChange = this.onUsernameChange.bind(this);
  }

  onUsernameChange(e) {
    this.setState({ username: event.target.value });
  }

  handleSubmit(e) {
    event.preventDefault();
    sessionStorage.setItem('username', this.username);
  }

  render() {
    return (
    <div>
      Adjust your display name here!
      <InputGroup>
      <Input type="text" value={this.username} onChange{...this.onUsernameChange} placeholder="DisplayName" />
      <Button color="Primary">Save username</Button>
      </InputGroup>
    </div>
    )
  }
}

export default AccountSettings;