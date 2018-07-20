import React from "react";
import CustomTopNavBar from "../NavbarComponent/CustomTopNavBar";
import BookList from "./BookList";
import BookInsert from "./BookInsert";
import moment from "moment";
import { validateBookName } from "./Validators/BookNameValidation";
import shortid from "shortid";

class BookMain extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      searchMode: true,
      noResults: false,
      isLoaded: true,
      isBookExist: false,
      isValidNewBookTitle: false,
      isValidNewBookAuthor: false,
      isValidNewBookDate: false,
      chosenBookName: "",
      books: [],
      formViewTitle: "",
      formViewAuthor: "",
      formViewID: "",
      formViewDate: new Date()
    };
    this.onDeleteBook = this.onDeleteBook.bind(this);
    this.onChangeBookSearch = this.onChangeBookSearch.bind(this);
    this.onChangeBookAuthor = this.onChangeBookAuthor.bind(this);
    this.onChangeBookDate = this.onChangeBookDate.bind(this);
    this.onChangeBookDatePicker = this.onChangeBookDatePicker.bind(this);
    this.onChangeBookID = this.onChangeBookID.bind(this);
    this.onChangeBookTitle = this.onChangeBookTitle.bind(this);
    this.onUpdateList = this.onUpdateList.bind(this);
    this.onAddBook = this.onAddBook.bind(this);
    this.onEditBook = this.onEditBook.bind(this);
    this.onStartAddingBook = this.onStartAddingBook.bind(this);
    this.onStartEditingBook = this.onStartEditingBook.bind(this);
    this.fetchBooks = this.fetchBooks.bind(this);
    this.removeNoResults = this.removeNoResults.bind(this);
  }

  componentDidMount() {
    this.fetchBooks();
  }

  searchModeOn() {
    this.setState({
      searchMode: true
    });
  }

  fetchBooks() {
    this.setState({
      isLoaded: false
    });
    fetch(
      "https://www.googleapis.com/books/v1/volumes?q=" +
        this.state.chosenBookName +
        "+inauthor:keyes&key=AIzaSyDtkjESpTixprLyOE7j8svfpGt0RO2oOSM&maxResults=20"
    )
      .then(res => res.json())
      .then(
        result => {
          var books = [];
          if (!result.items) {
            this.setState({
              noResults: true
            });
          } else {
            result.items.forEach((item, index) => {
              books[index] = {
                id: item.id,
                date: moment(item.volumeInfo.publishedDate).format(
                  "YYYY-MM-DD"
                ),
                title: item.volumeInfo.title
              };
              if (
                item.volumeInfo.imageLinks != null &&
                item.volumeInfo.imageLinks.smallThumbnail != null
              ) {
                books[index].image = item.volumeInfo.imageLinks.smallThumbnail;
              }
              if (item.volumeInfo.authors != null) {
                books[index].author = item.volumeInfo.authors[0];
              }

              if (item.volumeInfo.averageRating != null) {
                books[index].rating = item.volumeInfo.averageRating;
              }
            });
            this.setState({
              isLoaded: true,
              books: books
            });
          }
        },

        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  onDeleteBook(key) {
    delete this.state.books[key];
    this.setState({
      books: this.state.books
    });
  }

  onChangeBookSearch(event) {
    this.setState({
      chosenBookName: event.target.value
    });
  }

  onUpdateList() {
    this.fetchBooks();
    this.removeNoResults();
  }

  onAddBook() {
    var updatedBooks = this.state.books;
    var finalBook = {
      id: shortid.generate(),
      author: validateBookName(this.state.formViewAuthor),
      date: this.state.formViewDate,
      title: validateBookName(this.state.formViewTitle)
    };

    updatedBooks.push(finalBook);
    this.setState({
      books: updatedBooks,
      formViewTitle: "",
      formViewAuthor: "",
      formViewDate: "",
      formViewID: ""
    });
  }

  onStartEditingBook(book) {
    console.log("onStartEditing book:", book);
    this.setState({
      formViewAuthor: validateBookName(book.author),
      formViewTitle: validateBookName(book.title),
      formViewID: book.id,
      formViewDate: book.date
    });
  }

  onStartAddingBook() {
    this.setState({
      searchMode: false,
      formViewTitle: "",
      formViewAuthor: "",
      formViewDate: "",
      formViewID: ""
    });
  }

  onEditBook(key) {
    var updatedBooks = this.state.books;
    updatedBooks[key].title = validateBookName(this.state.formViewTitle);
    updatedBooks[key].author = validateBookName(this.state.formViewAuthor);
    updatedBooks[key].id = this.state.formViewID;
    updatedBooks[key].date = this.state.formViewDate;
    if (
      updatedBooks.filter(book => book.title === this.state.formViewTitle)
        .length > 1
    ) {
      this.setState({
        isBookExist: true
      });
    } else {
      this.setState({
        books: updatedBooks,
        formViewTitle: "",
        formViewAuthor: "",
        formViewDate: "",
        formViewID: ""
      });
    }
  }

  onChangeBookTitle(title) {
    this.setState({
      formViewTitle: title
    });
  }

  onChangeBookAuthor(author) {
    this.setState({
      formViewAuthor: author
    });
  }

  onChangeBookDate(date) {
    this.setState({
      formViewDate: date
    });
  }

  onChangeBookDatePicker(date) {
    this.setState(
      {
        formViewDate: date
      },
      () => console.log(this.state.formViewDate)
    );
  }

  onChangeBookID(ID) {
    this.setState({
      formViewID: ID
    });
  }

  removeNoResults() {
    this.setState({
      noResults: false
    });
  }

  resetIsBookExist() {
    this.setState({
      isBookExist: false
    });
  }

  render() {
    return (
      <div>
        <CustomTopNavBar
          searchModeOn={this.searchModeOn.bind(this)}
          searchMode={this.state.searchMode}
          removeNoResults={this.removeNoResults.bind(this)}
          error={this.state.error}
          noResults={this.state.noResults}
          isLoaded={this.state.isLoaded}
          chosenBookName={this.state.chosenBookName}
          onChangeBookSearch={this.onChangeBookSearch.bind(this)}
          onUpdateList={this.onUpdateList.bind(this)}
        />

        <BookInsert
          modalTitle="add"
          searchModeOn={this.searchModeOn.bind(this)}
          searchMode={this.state.searchMode}
          books={this.state.books}
          isBookExist={this.state.isBookExist}
          formViewTitle={this.state.formViewTitle}
          formViewAuthor={this.state.formViewAuthor}
          formViewDate={this.state.formViewDate}
          onChangeBookAuthor={this.onChangeBookAuthor.bind(this)}
          onChangeBookTitle={this.onChangeBookTitle.bind(this)}
          onChangeBookDate={this.onChangeBookDate.bind(this)}
          onChangeBookDatePicker={this.onChangeBookDatePicker.bind(this)}
          onAddBook={this.onAddBook.bind(this)}
          onStartAddingBook={this.onStartAddingBook.bind(this)}
        />
        <br />
        <br />
        <BookList
          isBookExist={this.state.isBookExist}
          formViewAuthor={this.state.formViewAuthor}
          formViewID={this.state.formViewID}
          formViewTitle={this.state.formViewTitle}
          formViewDate={this.state.formViewDate}
          onDeleteBook={this.onDeleteBook.bind(this)}
          onChangeBookTitle={this.onChangeBookTitle.bind(this)}
          onChangeBookAuthor={this.onChangeBookAuthor.bind(this)}
          onChangeBookID={this.onChangeBookID.bind(this)}
          onChangeBookDate={this.onChangeBookDate.bind(this)}
          onChangeBookDatePicker={this.onChangeBookDatePicker.bind(this)}
          onStartEditingBook={this.onStartEditingBook.bind(this)}
          isLoaded={this.state.isLoaded}
          chosenBookName={this.state.chosenBookName}
          books={this.state.books}
          error={this.state.error}
          noResults={this.state.noResults}
          onUpdateList={this.onUpdateList.bind(this)}
          onEditBook={this.onEditBook.bind(this)}
        />
      </div>
    );
  }
}

export default BookMain;
