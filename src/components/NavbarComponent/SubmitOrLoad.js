import React from "react";

class SubmitOrLoad extends React.Component {
  render() {
    if (this.props.noResults === true) {
      return (
        <div
        className="fa fa-search" 
          disabled={!this.props.isValidForm()}
          onClick={this.props.onUpdateList}
        />
        
      );
    } else if (this.props.isLoaded) {
      return   <div
      className="fa fa-search" 
        disabled={!this.props.isValidForm()}
        onClick={this.props.onUpdateList}
      />
    } else {
      return null;
    }
  }
}

export default SubmitOrLoad;
