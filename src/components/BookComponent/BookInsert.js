import React from "react";
import ModalControl from "./CustomModal/ModalControl/ModalControl";

class BookInsert extends React.Component {
  constructor() {
    super();
    this.state = {
      showInsert: false
    };

    this.toggleOnInsert = this.toggleOnInsert.bind(this);
  }
  toggleOnInsert() {
    this.setState({
      showInsert: !this.state.showInsert
    });
    if (this.state.showInsert) {
        this.props.onStartAddingBook();
    }
  }
  render() {
    return (
      <div>
        <button
          className="insertBook"
          type="button"
          onClick={this.toggleOnInsert}
        >
          Add New Book
        </button>
        <div
          className={this.state.showInsert ? "overlay overlayOpen" : "overlay"}
        >
          <ModalControl
            modalTitle="add"
            show={this.state.showInsert}
            toggleOnInsert={this.toggleOnInsert.bind(this)}
            searchModeOn={this.props.searchModeOn}
            searchMode={this.props.searchMode}
            books={this.props.books}
            isBookExist={this.props.isBookExist}
            formViewTitle={this.props.formViewTitle}
            formViewAuthor={this.props.formViewAuthor}
            formViewDate={this.props.formViewDate}
            onChangeBookAuthor={this.props.onChangeBookAuthor}
            onChangeBookTitle={this.props.onChangeBookTitle}
            onChangeBookDate={this.props.onChangeBookDate}
            onChangeBookDatePicker={this.props.onChangeBookDatePicker}
            onAddBook={this.props.onAddBook.bind(this)}
            onStartAddingBook={this.props.onStartAddingBook.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default BookInsert;
