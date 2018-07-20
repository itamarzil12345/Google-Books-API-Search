import React from "react";
import "./CustomModal/ModalView/ModalView.css";
import "./BookListGroup.css";
import ModalControl from "./CustomModal/ModalControl/ModalControl";

class BookFooter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showEdit: false,
      showDelete: false
    };
    this.toggleOnEdit = this.toggleOnEdit.bind(this);
    this.toggleOnRemove = this.toggleOnRemove.bind(this);
    this.showCustomModal = this.showCustomModal.bind(this);
  }

  showCustomModal() {}

  toggleOnEdit() {
    this.setState(
      {
        showEdit: !this.state.showEdit
      },
      () => {
        if (this.state.showEdit) {
          this.props.onStartEditingBook(this.props.book);
        }
      }
    );
  }

  toggleOnRemove() {
    this.setState({
      showDelete: !this.state.showDelete
    });
  }
  render() {
    const { ...props } = this.props;
    return (
      <div className="card-footer">
        <p> </p>
        <button
          className="editBtnStyle"
          type="button"
          onClick={this.toggleOnRemove}
        >
          Remove
        </button>
        <button
          className="editBtnStyle"
          type="button"
          onClick={this.toggleOnEdit}
        >
          Edit
        </button>
        <div
          className={
            this.state.showEdit || this.state.showDelete
              ? "overlay overlayOpen"
              : "overlay"
          }
        >
          <ModalControl
            modalTitle="remove"
            show={this.state.showDelete}
            toggleOnRemove={this.toggleOnRemove.bind(this)}
            {...props}
          />

          <ModalControl
            show={this.state.showEdit}
            modalTitle="edit"
            toggleOnEdit={this.toggleOnEdit.bind(this)}
            {...props}
          />
        </div>
      </div>
    );
  }
}

export default BookFooter;
