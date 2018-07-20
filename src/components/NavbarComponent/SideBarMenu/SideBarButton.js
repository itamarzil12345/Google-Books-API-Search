import React from "react";
import "./SideBarMenu.css";

class SideBarButton extends React.Component {
  render() {
    return (
      <div className="sideBtn" onClick={this.props.onClick}>
        <div className="line" />
        <div className="line" />
        <div className="line" />
      </div>
    );
  }
}

export default SideBarButton;
