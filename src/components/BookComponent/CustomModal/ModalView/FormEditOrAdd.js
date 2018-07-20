import React from "react";
import BookDate from "../../BookDate";


class FormEditOrAdd extends React.Component {
  render() {
    return (
      <div>
        <div className="overlayContent">
          <div>
            <form
              className="form-inline"
              ref="bookForm"
              onSubmit={this.props.onSubmitModification.bind(this)}
            >
              <input
                type="text"
                ref="bookTitle"
                onChange={this.props.onChangeBookTitle.bind(this)}
                value={this.props.formViewTitle}
                placeholder="enter title"
                className="form-control"
              />
              {this.props.onValidateSubmit ? (
                <p className="errorMsgStyle">{this.props.errorMsg.title}</p>
              ) : null}
              <br />
              <input
                type="text"
                value={this.props.formViewAuthor}
                onChange={this.props.onChangeBookAuthor.bind(this)}
                placeholder="enter author"
                ref="bookAuthor"
                className="form-control"
              />
              {this.props.onValidateSubmit ? (
                <p className="errorMsgStyle">{this.props.errorMsg.author}</p>
              ) : null}
              <br />
              {
                <BookDate
                  formViewDate={this.props.formViewDate}
                  onChangeBookDate={this.props.onChangeBookDate.bind(this)}
                  onChangeBookDatePicker={this.props.onChangeBookDatePicker.bind(
                    this
                  )}
                />
              }
              {this.props.onValidateSubmit ? (
                <p className="errorMsgStyle">{this.props.errorMsg.date}</p>
              ) : null}
              <br />
              {this.props.actionType == "add" ? (
                <button type="submit"> Add Book</button>
              ) : (
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              )}
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.props.onCloseModal}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
        <button onClick={this.props.onCloseModal}>Close </button>
      </div>
    );
  }
}

export default FormEditOrAdd;