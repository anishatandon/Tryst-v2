import React, { Component } from 'react';

class SetUpProfileItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editText: this.props.messages.text,
    };
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.messages.text,
    }));
  };

  onChangeEditText = event => {
    this.setState({ editText: event.target.value });
  };

  onSaveEditText = () => {
    this.props.onEditMessage(this.props.messages, this.state.editText);

    this.setState({ editMode: false });
  };

  render() {
    const { authUser, messages, onRemoveMessage } = this.props;
    const { editMode, editText } = this.state;

    return (
      <li>
        {editMode ? (
          <input
            type="text"
            value={editText}
            onChange={this.onChangeEditText}
          />
        ) : (
          <span>
            <strong>{messages.userId}</strong> {messages.text}
            {messages.editedAt && <span>(Edited)</span>}
          </span>
        )}

        {authUser.uid === messages.userId && (
          <span>
            {editMode ? (
              <span>
                <button onClick={this.onSaveEditText} className="half-button">Save</button>
                <button onClick={this.onToggleEditMode} className="half-button"> Reset</button>
              </span>
            ) : (
              <button onClick={this.onToggleEditMode} className="half-button">Edit</button>
            )}
          </span>
        )}
      </li>
    );
  }
}

export default SetUpProfileItem;
