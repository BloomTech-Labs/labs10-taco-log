import React, { Component } from 'react';
import { InputGroup, Input }  from 'reactstrap';
class AccountSettings extends Component {
  render() {
    return (
    <div>
      Adjust your display name here!
      <InputGroup>
      <Input placeholder="DisplayName" />
      </InputGroup>
    </div>
    )
  }
}

export default AccountSettings;