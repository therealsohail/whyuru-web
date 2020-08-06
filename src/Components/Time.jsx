import React from "react";
import moment from "moment";
import InputMoment from "input-moment";
import "input-moment/dist/input-moment.css";
import { Nav, Image } from "react-bootstrap";
import { client } from "../client";
import $ from "jquery";

class Time extends React.Component {
  state = {
    m: moment(),
    type: "wakeup",
    activeLanguage: "English",
    activeCategory: "Openess",
    activeGender: "Male",
    videos: [],
    selected: false,
    selectedArray: [],
    data: [],
  };

  toggleClass = (index) => {
    if (
      this.state.selectedArray.length >= 0 ||
      this.state.selectedArray.length <= this.state.video.length
    ) {
      if (!this.state.selected) {
        this.setState({
          selected: !this.state.selected,
          selectedArray: [...this.state.selectedArray, index],
        });
      } else if (this.state.selected) {
        this.setState({
          selected: !this.state.selected,
          selectedArray: this.state.selectedArray.splice(
            this.state.selectedArray.indexOf(index),
            1
          ),
        });
      }
    }
  };

  handleChange = (m) => {
    this.setState({ m });
  };

  handleSave = () => {
    console.log("saved", this.state.m.format("llll"));
  };

  componentDidMount() {
    $("#checkbox").click(function () {
      console.log("Hello");
      if ($("#checkbox").parent().hasClass("selected")) {
        $("#checkbox").parent().removeClass("selected");
      } else {
        $("#checkbox").parent().addClass("selected");
      }
    });
    client
      .getEntries({
        content_type: this.state.type,
        "fields.language[match]": this.state.activeLanguage,
        "fields.category[match]": this.state.activeCategory,
        "fields.gender[match]": this.state.activeGender,
      })
      .then((res) => {
        this.setState({
          videos: res.items,
        });
        console.log(this.state.videos);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.type !== this.state.type ||
      prevState.activeLanguage !== this.state.activeLanguage ||
      prevState.activeCategory !== this.state.activeCategory ||
      prevState.activeGender !== this.state.activeGender
    ) {
      client
        .getEntries({
          content_type: this.state.type,
          "fields.language[match]": this.state.activeLanguage,
          "fields.category[match]": this.state.activeCategory,
          "fields.gender[match]": this.state.activeGender,
        })
        .then((res) => {
          this.setState({
            videos: res.items,
          });
          console.log(this.state.videos);
        });
    }
  }

  // handleClick = (vid) => {
  //   if (this.state.video.isActive === false) {
  //     this.setState({
  //       video: {
  //         isActive: true,
  //         border: "4px solid #09e823",
  //         vid,
  //       },
  //     });
  //   } else {
  //     if (vid.sys.id === this.state.video.vid.sys.id) {
  //       this.setState({
  //         video: {
  //           isActive: false,
  //           border: "2px solid #b5b5b5",
  //           vid: "",
  //         },
  //       });
  //     }
  //   }
  // };

  languages = [
    "English",
    "Chinese",
    "Hindi",
    "Japanese",
    "Korean",
    "Russian",
    "Spanish",
  ];

  categories = [
    "Openess",
    "Conscientiosness",
    "Extroversion",
    "Agreeableness",
    "Neuroticism",
  ];

  removeData = (e, id) => {
    var array = [...this.state.data];
    var index = array.indexOf(id);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ data: array });
    }
  };

  handleCheckbox = (e, id, video, index) => {
    if (e.target.checked) {
      if (video.sys.id === id) {
        this.setState({
          data: [...this.state.data, { ...video }],
        });
      }
    } else if (!e.target.checked) {
      this.setState({
        data: this.state.data.filter((item) => item.sys.id !== e.target.name),
      });
    }
  };

  render() {
    console.log(this.state.data);
    return (
      <div>
        <center>
          <form>
            <div className="input">
              <input type="text" value={this.state.m.format("llll")} readOnly />
            </div>
            <InputMoment
              moment={this.state.m}
              onChange={this.handleChange}
              minStep={5}
            />
          </form>
        </center>

        <Nav fill variant="pills" defaultActiveKey="#">
          <Nav.Item>
            <Nav.Link
              href="#"
              onClick={() => this.setState({ type: "wakeup" })}
            >
              Wakeup
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="link-1"
              onClick={() => this.setState({ type: "bedtime" })}
            >
              Bedtime
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <div className="options">
          <div className="language-select">
            <select
              name="languages"
              onChange={(e) =>
                this.setState({ activeLanguage: e.target.value })
              }
            >
              {this.languages.map((language, index) => {
                return (
                  <option name="language" value={language} key={index}>
                    {language}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="category-select">
            <select
              name="categories"
              onChange={(e) =>
                this.setState({ activeCategory: e.target.value })
              }
            >
              {this.categories.map((category, index) => {
                return (
                  <option name="category" value={category} key={index}>
                    {category}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="gender-select">
            <select
              onChange={(e) => this.setState({ activeGender: e.target.value })}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
        <div className="videos-container">
          {this.state.videos.map((video, i) => {
            const id = video.sys.id;
            const videoTitle = video.fields.name;
            const videoThumbnail = video.fields.videoThumbnail.fields.file.url;
            return (
              <div
                // onClick={() => this.handleClick(video)}
                className="video-card"
                id="video-card"
                key={id}
              >
                <input
                  type="checkbox"
                  name={id}
                  id="_checkbox"
                  onClick={(e) => this.handleCheckbox(e, id, video, i)}
                />
                <label for="_checkbox">
                  <div id="tick_mark"></div>
                </label>
                <Image
                  className="thumbnail"
                  src={videoThumbnail}
                  width="120"
                  height="90"
                  rounded
                />
                <p style={{ color: " #000", textAlign: "center" }}>
                  {videoTitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Time;
