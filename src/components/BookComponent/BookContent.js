import React from "react";
import StarRatingComponent from "react-star-rating-component";
import "./BookListGroup.css";

class BookContent extends React.Component {
  render() {
    const { book } = this.props;

    const RenderDate = props => {
      if (!props.date) {
        return null;
      }
      if (typeof props.date === "string" || props.date instanceof String) {
        return <h5>Date: {props.date}</h5>;
      } else {
        return <h5>{props.date.toString()}</h5>;
      }
    };

    return (
      <div>
        <h4>{book.title}</h4> <br />
        By: {book.author} <br />
        {<RenderDate date={book.date} />} <br />
        Rating:<br />
        <StarRatingComponent name="rate1" starCount={5} value={book.rating} />
        <br />
      </div>
    );
  }
}

export default BookContent;
