import moment from "moment";

export function isBookExist(books, title) {
  if (books.filter(book => book.title === title).length > 0) {
    return true;
  }
  return false;
}
export function isValidForm(title, author, date, books, isBookExist) {
  // is book title not already exist validator
  if (books.filter(book => book.title === title).length > 0) {
    return false;
  }
  if (!moment(date, "YYYY-MM-DD", true).isValid()) {
    return false;
  }
  return title.length > 0 && author.length > 0;
}

export function getTitleValidationState(title, isBookExist) {
  const length = title.length;
  if (isBookExist) return "error";
  if (length > 0) return "success";
  else if (length > 10) return "warning";
  else if (length === 0) {
    return "error";
  }
  return null;
}

export function getAuthorValidationState(author) {
  const length = author.length;
  if (length > 0) return "success";
  else if (length > 10) return "warning";
  else if (length === 0) return "error";
  return null;
}

export function getDateValidationState(date) {
  const length = date.length;
  if (length > 0) return "success";
  else if (length > 10) return "warning";
  else if (length === 0) return "error";
  return null;
}
