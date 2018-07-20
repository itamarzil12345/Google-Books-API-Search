import React from "react";
import FormEditOrAdd from "./FormEditOrAdd";
import moment from "moment";
import * as Validators from "../../Validators/FormValidator";
import "./ModalView.css";

class BookInsertModal extends React.Component {
  constructor(props) {
    super(props);

    // check if edit or add and setState accordingly
    this.state = {
      open: false,
      startDate: "",
      onValidateSubmit: false
    };

    if (this.props.actionType == "add") {
      this.setState({
        errorMsg: {
          title: "Title Cannot Be Empty",
          author: "Author Cannot Be Empty",
          date: "Please Pick a Publish Date"
        }
      });
    } else if (this.props.actionType == "edit") {
      this.setState({
        errorMsg: {
          title: "",
          author: "",
          date: ""
        }
      });
    }
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onChangeBookDatePicker = this.onChangeBookDatePicker.bind(this);
    this.onChangeBookAuthor = this.onChangeBookAuthor.bind(this);
    this.onChangeBookTitle = this.onChangeBookTitle.bind(this);
    this.onChangeBookDate = this.onChangeBookDate.bind(this);
    this.createBook = this.createBook.bind(this);
    this.onEditBook = this.onEditBook.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.actionType !== this.props.actionType) {
      if (this.props.actionType == "add") {
        this.setState({
          errorMsg: {
            title: "Title Cannot Be Empty",
            author: "Author Cannot Be Empty",
            date: "Please Pick a Publish Date"
          }
        });
      } else if (this.props.actionType == "edit") {
        this.setState({
          errorMsg: {
            title: "",
            author: "",
            date: ""
          }
        });
      }
    }
  }

  onCloseModal = event => {
    if (event) {
      event.preventDefault();
    }

    if (this.props.actionType == "add") {
      this.setState({
        open: false,
        errorMsg: {
          title: "Title Cannot Be Empty",
          author: "Author Cannot Be Empty",
          date: "Please Pick a Publish Date"
        },
        onValidateSubmit: false
      });
      this.props.toggleOnInsert();
    }
    if (this.props.actionType == "edit") {
      this.setState({
        open: false,
        errorMsg: {
          title: "",
          author: "",
          date: ""
        },
        onValidateSubmit: false
      });
      this.props.toggleOnEdit();
    }
  };

  onChangeBookTitle(event) {
    this.props.onChangeBookTitle(event.target.value);
    if (event.target.value.length > 0) {
      this.setState(prevState => ({
        errorMsg: {
          ...prevState.errorMsg,
          title: ""
        }
      }));
    } else {
      this.setState(prevState => ({
        errorMsg: {
          ...prevState.errorMsg,
          title: "Title Cannot Be Empty"
        }
      }));
    }
  }

  onChangeBookAuthor(event) {
    this.props.onChangeBookAuthor(event.target.value);
    if (event.target.value.length > 0) {
      this.setState(prevState => ({
        errorMsg: {
          ...prevState.errorMsg,
          author: ""
        }
      }));
    } else {
      this.setState(prevState => ({
        errorMsg: {
          ...prevState.errorMsg,
          author: "Author Cannot Be Empty"
        }
      }));
    }
  }

  onChangeBookDate(event) {
    this.props.onChangeBookDate(event.target.value);
    if (
      event.target.value.length > 0 &&
      moment(this.props.formViewDate, "YYYY-MM-DD", true).isValid()
    ) {
      this.setState(prevState => ({
        errorMsg: {
          ...prevState.errorMsg,
          date: ""
        }
      }));
    } else {
      this.setState(prevState => ({
        errorMsg: {
          ...prevState.errorMsg,
          date: "Please Pick a Publish Date"
        }
      }));
    }
  }

  onChangeBookDatePicker(date) {
    this.props.onChangeBookDatePicker(date);
    if (date.length > 0 && moment(date, "YYYY-MM-DD", true).isValid()) {
      this.setState(prevState => ({
        errorMsg: {
          ...prevState.errorMsg,
          date: ""
        }
      }));
    } else {
      this.setState(prevState => ({
        errorMsg: {
          ...prevState.errorMsg,
          date: "Please Pick a Publish Date"
        }
      }));
    }
  }

  createBook(event) {
    if (event) {
      event.preventDefault();
    }
    // validation

    if (
      !Validators.isValidForm(
        this.props.formViewTitle,
        this.props.formViewAuthor,
        this.props.formViewDate,
        this.props.books,
        this.props.isBookExist
      )
    ) {
      console.log("validation: error");
      if (Validators.isBookExist(this.props.books, this.props.formViewTitle)) {
        this.setState(prevState => ({
          errorMsg: {
            ...prevState.errorMsg,
            title: "Book Title Already Exists!"
          }
        }));
      }
      this.setState({
        onValidateSubmit: true
      });
    } else {
      this.onCloseModal();
      this.setState({
        errorMsg: {
          title: "Title Cannot Be Empty",
          author: "Author Cannot Be Empty",
          date: "Please Pick a Publish Date",
          onValidateSubmit: false
        }
      });
      this.props.onAddBook();
    }
  }

  onEditBook(event) {
    if (event) {
      event.preventDefault();
    }
    if (
      !Validators.isValidForm(
        this.props.formViewTitle,
        this.props.formViewAuthor,
        this.props.formViewDate,
        this.props.books,
        this.props.isBookExist
      )
    ) {
      console.log("form input errors");
      this.setState({
        onValidateSubmit: true
      });
    } else {
      this.onCloseModal();
      this.props.onEditBook(this.props.index);
    }
  }

  onSubmitModification(event) {
    if (this.props.actionType == "add") {
      this.createBook(event);
    }
    if (this.props.actionType == "edit") {
      this.onEditBook(event);
    }
  }

  render() {
    const { open } = this.state;
    return (
      <FormEditOrAdd
        onSubmitModification={this.onSubmitModification.bind(this)}
        onChangeBookTitle={this.onChangeBookTitle}
        onChangeBookAuthor={this.onChangeBookAuthor}
        onChangeBookDate={this.onChangeBookDate}
        onChangeBookDatePicker={this.onChangeBookDatePicker}
        formViewTitle={this.props.formViewTitle}
        formViewAuthor={this.props.formViewAuthor}
        formViewDate={this.props.formViewDate}
        onValidateSubmit={this.state.onValidateSubmit}
        errorMsg={this.state.errorMsg}
        onValidateSubmit={this.state.onValidateSubmit}
        actionType={this.state.actionType}
        onCloseModal={this.state.onCloseModal}
      />
    );
  }
}

export default BookInsertModal;
