import React from "react";
import moment from "moment";
import InputMoment from "input-moment";
import "input-moment/dist/input-moment.css";
import axios from "axios";

import { Nav, Image, Button, Modal } from "react-bootstrap";
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
    affirmationVideos: [],
    selected: false,
    selectedArray: [],
    data: [],
    isFlipped: false,
    time: "",
    date: "",
    isSelected: [],
    count: 0,
    showModal: false,
    modalId: null,
    value: [],
  };

  handleChange = (m) => {
    this.setState({ m });
  };

  handleSave = () => {
    let dateTimeArray = this.state.m.format("llll").split(" ");
    let timeData = dateTimeArray[4] + " " + dateTimeArray[5];
    let dateData =
      dateTimeArray[3] +
      " " +
      dateTimeArray[1] +
      " " +
      dateTimeArray[2].replace(",", "");
    this.setState({
      time: timeData,
      date: dateData,
    });

    // let response = await axios.post(
    //   "https://whyuruapi.herokuapp.com/api/Schedular",
    //   {
    //     date: this.state.date,
    //     time: this.state.time,
    //     data: this.state.data,
    //   }
    // );
    // console.log(response);

    setTimeout(() => {
      axios
        .post("https://whyuruapi.herokuapp.com/api/Scheduler", {
          date: this.state.date,
          time: this.state.time,
          data: this.state.data,
        })
        .then((res) => {
          if (res) {
            alert("Data added successfully");
          }
          this.props.closeOnSave();
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
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
      });

    client
      .getEntries({
        content_type: "affirmation",
        "fields.language[match]": this.state.activeLanguage,
      })
      .then((res) => {
        this.setState({
          affirmationVideos: res.items,
        });
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
        });

      client
        .getEntries({
          content_type: "affirmation",
          "fields.language[match]": this.state.activeLanguage,
        })
        .then((res) => {
          this.setState({
            affirmationVideos: res.items,
          });
        });
    }
  }

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

  isFlipped = (id) => {
    if (this.state.isSelected.includes(id)) {
      return true;
    } else if (!this.state.isSelected.includes(id) && !this.state.showModal) {
      return false;
    }
  };
  handleCheckbox = (e, id, video, index) => {
    if (e.target.checked) {
      if (e.target.name === id) {
        this.setState({ isSelected: [...this.state.isSelected, id] });
      }

      if (video.sys.id === id) {
        this.setState({
          modalId: id,
          // count: [...this.state.count, { countId: video.sys.id, countNum: 1 }],
          count: this.state.count + 1,
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
      this.setState((prevState) => ({
        count: prevState.count,
        data: this.state.data.filter((item) => item.id !== e.target.name),
      }));
    }
  };

  closeModal = (id) => {
    this.setState({
      showModal: false,
      modalId: null,
      count: 0,
      isSelected: this.state.isSelected.filter((num) => num !== id),
      data: this.state.data.filter((item) => item.id !== this.state.modalId),
    });
    this.unCheck(id);
  };

  incrementData = (video, id) => {
    this.setState({
      count: this.state.count + 1,
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
  };

  decrementData = (video, id) => {
    if (this.state.count >= 0) {
      this.setState({
        count: this.state.count - 1,
      });
      let tempData = this.state.data;
      tempData.pop();
      this.setState({
        data: tempData,
      });
    }
  };
  clearData = () => {
    this.setState({
      data: [],
    });
  };

  onChange(e, i) {
    let value = this.state.value.slice();
    value[i] = e.target.checked;
    this.setState({ value });
  }

  unCheck(i) {
    let value = this.state.value.slice();
    value[i] = false;
    this.setState({ value });
  }

  render() {
    console.log(this.state.value);
    let affirmation;
    if (this.state.type === "wakeup") {
      affirmation = (
        <div className="affirmation">
          <h5 style={{ color: "#000" }}>Affirmation</h5>
          <div className="videos-container">
            {this.state.affirmationVideos.map((video, i) => {
              const id = video.sys.id;
              const videoTitle = video.fields.title;
              const videoThumbnail =
                video.fields.videoThumbnail.fields.file.url;

              return (
                <>
                  <label for={id}>
                    <input
                      checked={true}
                      ref={"ref_" + id}
                      className="flip-check"
                      type="checkbox"
                      name={id}
                      id={id}
                      checked={this.state.value[id]}
                      onClick={(e) => this.handleCheckbox(e, id, video, i)}
                      onChange={(e) => this.onChange(e, id)}
                      disabled={
                        this.state.isSelected.includes(id) ? true : false
                      }
                    />
                    <ReactCardFlip
                      isFlipped={() => this.isFlipped(id)}
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
                  <Modal
                    style={{ zIndex: 5000 }}
                    show={this.state.modalId === id ? true : false}
                    onHide={() =>
                      this.setState({ showModal: false, modalId: null })
                    }
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Counter</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="modal-video-card">
                        <Image
                          className="thumbnail"
                          src={videoThumbnail}
                          width="120"
                          height="90"
                          rounded
                        />
                        <p style={{ color: " #000" }}>{videoTitle}</p>
                      </div>
                      <div className="modal-counter">
                        <span
                          className="minus bg-dark"
                          onClick={() => this.decrementData(video, id)}
                        >
                          -
                        </span>
                        <input
                          type="number"
                          className="count"
                          name="qty"
                          value={this.state.count}
                        />
                        <span
                          className="plus bg-dark"
                          onClick={() => this.incrementData(video, id)}
                        >
                          +
                        </span>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <label for={id}>
                        <Button
                          variant="secondary"
                          onClick={() => this.closeModal(id)}
                        >
                          Close
                        </Button>

                        <Button
                          variant="primary"
                          onClick={() =>
                            this.setState({
                              showModal: false,
                              modalId: null,
                              count: 0,
                            })
                          }
                        >
                          Save Changes
                        </Button>
                      </label>
                    </Modal.Footer>
                  </Modal>
                </>
              );
            })}
          </div>
        </div>
      );
    }
    return (
      <>
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
                onSave={this.handleSave}
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
                <>
                  <label for={id}>
                    <input
                      className="flip-check"
                      type="checkbox"
                      name={id}
                      id={id}
                      checked={this.state.value[id]}
                      onClick={(e) => this.handleCheckbox(e, id, video, i)}
                      onChange={(e) => this.onChange(e, id)}
                      disabled={
                        this.state.isSelected.includes(id) ? true : false
                      }
                    />
                    <ReactCardFlip
                      isFlipped={() => this.isFlipped(id)}
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
                  <Modal
                    style={{ zIndex: 5000 }}
                    show={this.state.modalId === id ? true : false}
                    onHide={() =>
                      this.setState({ showModal: false, modalId: null })
                    }
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Counter</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="modal-video-card">
                        <Image
                          className="thumbnail"
                          src={videoThumbnail}
                          width="120"
                          height="90"
                          rounded
                        />
                        <p style={{ color: " #000" }}>{videoTitle}</p>
                      </div>
                      <div className="modal-counter">
                        <span
                          className="minus bg-dark"
                          onClick={() => this.decrementData(video, id)}
                        >
                          -
                        </span>
                        <input
                          type="number"
                          className="count"
                          name="qty"
                          value={this.state.count}
                        />
                        <span
                          className="plus bg-dark"
                          onClick={() => this.incrementData(video, id)}
                        >
                          +
                        </span>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <label for={id}>
                        <Button
                          id="closeModal"
                          variant="secondary"
                          onClick={() => this.closeModal(id)}
                        >
                          Close
                        </Button>

                        <Button
                          variant="primary"
                          onClick={() =>
                            this.setState({
                              showModal: false,
                              modalId: null,
                              count: 0,
                            })
                          }
                        >
                          Save Changes
                        </Button>
                      </label>
                    </Modal.Footer>
                  </Modal>
                </>
              );
            })}
            {affirmation}
          </div>
        </div>
      </>
    );
  }
}

export default Time;
