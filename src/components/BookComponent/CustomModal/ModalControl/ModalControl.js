import React, { Component } from "react";
import RemoveBook from "../ModalView/RemoveBook";
import EditOrAddBook from "../ModalView/EditOrAddBook";
import "../ModalView/ModalView.css";

class ModalControl extends Component {
  state = { show: false };

  showModal = () => {
    this.props.onStartEditingBook(this.props.book, this.props.index);
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    const { ...props } = this.props;
    if (this.props.modalTitle == "remove" && this.props.show) {
      return (
        <RemoveBook
          {...props}
          actionType={this.props.modalTitle}
          handleClose={this.hideModal}
        />
      );
    } else if (
      (this.props.modalTitle == "add" || this.props.modalTitle == "edit") &&
      this.props.show
    ) {
      return (
        <EditOrAddBook
          {...props}
          actionType={this.props.modalTitle}
          handleClose={this.hideModal}
          isBookExist={this.props.isBookExist}
        />
      );
    } else {
      return null;
    }
  }
}

export default ModalControl;
