import React from "react";
import "./BookListGroup.css";
import BookFooter from "./BookFooter";
import BookContent from "./BookContent";

class BookList extends React.Component {
  render() {
    const { ...props } = this.props;
    const { isLoaded, books } = this.props;
    const BookImage = props => {
      if (!props.image) {
        return null;
      }
      return (
        <div className="product-image">
          <img src={props.image} alt={props.title} />
        </div>
      );
    };

    if (this.props.noResults === true) {
      return <h1>No Results</h1>;
    } else if (!isLoaded) {
      return <div />;
    } else {
      return (
        <div>
          <div className="cards">
            {books.map((book, index) => (
              <div key={book.title} className="card">
                <div className="card-inner">
                  <div className="card-body">
                    <BookImage image={book.image} title={book.title} />
                    <BookContent book={book} />
                  </div>
                  <BookFooter
                    {...props}
                    book={book}
                    index={index}
                    books={books}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}

export default BookList;
