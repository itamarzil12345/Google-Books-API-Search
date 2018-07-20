import React from "react";
import SideBarButton from "./SideBarButton";
import ShowMenu from "./ShowMenu";
import "./SideBarMenu.css";

class SideBarMenu extends React.Component {
  state = {
    sideBarOn: false
  };

  handleClick() {
    this.setState({ sideBarOn: !this.state.sideBarOn });
    console.log(this.state.SideBarOn);
  }
  render() {
    return (
      <div>
        <SideBarButton onClick={this.handleClick.bind(this)} />
        <div
          className={this.state.sideBarOn ? "sidebarMenuOn" : "sidebarMenuOff"}
        />
      </div>
    );
  }
}

export default SideBarMenu;
