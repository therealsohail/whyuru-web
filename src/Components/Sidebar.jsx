import React from "react";
import "input-moment/dist/input-moment.css";
import Time from "./Time";

class Sidebar extends React.Component {
  state = {
    sidebarClass: this.props.sidebar,
  };

  closeHandler = (e) => {
    e.preventDefault();
    this.setState({
      sidebarClass: "sidebar close",
    });
    this.refs.time.clearData();
    setTimeout(() => {
      this.props.close();
    }, 1000);
  };
  render() {
    return (
      <div className={this.state.sidebarClass}>
        <button id="close" onClick={this.closeHandler}>
          <i className="fas fa-times" style={{ color: "#000" }}></i>
        </button>

        <Time
          ref="time"
          sidebarClass={this.state.sidebarClass}
          closeHandler={this.closeHandler}
        />
      </div>
    );
  }
}

export default Sidebar;
