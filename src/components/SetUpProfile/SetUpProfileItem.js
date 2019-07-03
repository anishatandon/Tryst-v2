import React, { Component } from 'react';

class SetUpProfileItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editText: this.props.biodata.text,
    };
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.biodata.text,
    }));
  };

  onChangeEditText = event => {
    this.setState({ editText: event.target.value });
  };

  onSaveEditText = () => {
    this.props.onEditMessage(this.props.biodata, this.state.editText);

    this.setState({ editMode: false });
  };

  render() {
    const { authUser, biodata, onRemoveMessage } = this.props;
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
            <strong>{biodata.userId}</strong> {biodata.text}
            {biodata.editedAt && <span>(Edited)</span>}
          </span>
        )}

        {authUser.uid === biodata.userId && (
          <span>
            {editMode ? (
              <span>
                <button onClick={this.onSaveEditText} className="half-button">Save</button>
                <button onClick={this.onToggleEditMode} className="half-button"> Reset</button>
              </span>
            ) : (
              <button onClick={this.onToggleEditMode} className="half-button">Edit</button>
            )}

            {!editMode && (
              <button
                type="button" className="half-button"
                onClick={() => onRemoveMessage(biodata.uid)}
              >
                Delete
              </button>
            )}
          </span>
        )}
      </li>
    );
  }
}

export default SetUpProfileItem;
