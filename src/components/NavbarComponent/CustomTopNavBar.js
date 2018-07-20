import React from "react";
import "./TopNavBar.css";
import SubmitOrLoad from "./SubmitOrLoad";

class CustomTopNavBar extends React.Component {
  isValidForm() {
    if (this.props.chosenBookName.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    return (
      <div className="topnav">
        <div className="search-container">
          <form>
            <SubmitOrLoad
              isValidForm={this.isValidForm.bind(this)}
              removeNoResults={this.props.removeNoResults.bind(this)}
              error={this.props.error}
              noResults={this.props.noResults}
              isLoaded={this.props.isLoaded}
              chosenBookName={this.props.chosenBookName}
              onChangeBookSearch={this.props.onChangeBookSearch}
              onUpdateList={this.props.onUpdateList}
            />
            <input
              className="searchBooksInput"
              type="text"
              onChange={this.props.onChangeBookSearch.bind(this)}
              placeholder="Search Books"
              value={this.props.chosenBookName}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default CustomTopNavBar;
