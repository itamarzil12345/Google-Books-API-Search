import React from "react";
import "./ModalView.css";

class ViewRemove extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false
    };

    this.deleteBook = this.deleteBook.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  onCloseModal = event => {
    if (event) {
      event.preventDefault();
    }
    this.setState({ open: false });
    this.props.toggleOnRemove();
  };

  deleteBook(e) {
    if (e) {
      e.preventDefault();
    }

    this.props.onDeleteBook(this.props.index);
  }
  render() {
    return (
      <div className={this.props.show ? "overlay overlayOpen" : "overlay"}>
        <div className="overlayContent">
          <div>
            <br />
            <br />
            <h2> Are you sure you want to remove this book?</h2>
            <form className="form-inline" onSubmit={this.deleteBook}>
              <br />
              <button type="submit" className="btn btn-primary">
                Remove
              </button>&nbsp;&nbsp;
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.onCloseModal}
              >
                Cancel
              </button>
            </form>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
export default ViewRemove;
