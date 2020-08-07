import React from "react";
import moment from "moment";
import InputMoment from "input-moment";
import "input-moment/dist/input-moment.css";
import { Nav, Image, Button } from "react-bootstrap";
import { client } from "../client";
import ReactCardFlip from "react-card-flip";
import check from "../Assets/check.svg";

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
    isFlipped: false,
    time: "",
    date: "",
    isSelected: [],
  };

  handleChange = (m) => {
    this.setState({ m });
  };

  handleSave = () => {
    let dateTimeArray = this.state.m.format("llll").split(" ");
    this.setState({
      time: dateTimeArray[4] + " " + dateTimeArray[5],
      date: dateTimeArray[3] + " " + dateTimeArray[1] + " " + dateTimeArray[2],
    });
  };

  componentDidMount() {
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

  handleCheckbox = (e, id, video, index) => {
    if (e.target.checked) {
      if (e.target.name === id) {
        this.setState({ isSelected: [...this.state.isSelected, id] });
      }

      if (video.sys.id === id) {
        this.setState({
          data: [
            ...this.state.data,
            {
              id: video.sys.id,
              title: video.fields.name,
              thumbnail: video.fields.videoThumbnail.fields.file.url,
              video: video.fields.video.fields.file.url,
            },
          ],
        });
      }
    } else if (!e.target.checked) {
      this.setState({
        isSelected: this.state.isSelected.filter(
          (num) => num !== e.target.name
        ),
      });
      this.setState({
        data: this.state.data.filter((item) => item.id !== e.target.name),
      });
    }
  };

  render() {
    console.log(this.state.isSelected);
    return (
      <>
        <Button
          variant="primary"
          className="save-button"
          onClick={this.handleSave}
        >
          Save
        </Button>
        <div style={{ paddingTop: 20 }}>
          <center>
            <form>
              <div className="input">
                <input
                  type="text"
                  value={this.state.m.format("llll")}
                  readOnly
                />
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
                onChange={(e) =>
                  this.setState({ activeGender: e.target.value })
                }
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
              const videoThumbnail =
                video.fields.videoThumbnail.fields.file.url;
              return (
                <label for={id}>
                  <input
                    type="checkbox"
                    name={id}
                    id={id}
                    onClick={(e) => this.handleCheckbox(e, id, video, i)}
                  />
                  <ReactCardFlip
                    isFlipped={
                      this.state.isSelected.includes(id) ? true : false
                    }
                    flipDirection="horizontal"
                    className="video-card"
                    id="video-card"
                    key={id}
                  >
                    <div className="front">
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
                    <div className="back" onClick={this.handleFlip}>
                      <img src={check} alt="check" />
                    </div>
                  </ReactCardFlip>
                </label>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default Time;
