import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { client } from "../client";
import BigFiveNavbar from "../Components/BigFiveNavbar";

class BigFive extends Component {
  state = {
    quizdata: [],
    openess: 0,
    conscientiousness: 0,
    extroversion: 0,
    agreebleness: 0,
    neuroticism: 0,
  };

  componentDidMount() {
    client
      .getEntries({
        content_type: "bigFive",
      })
      .then((res) => {
        this.setState({
          quizdata: res.items,
        });
      });
  }

  handleCheckbox = (e, id) => {
    console.log(id);
    if (e.target.checked) {
      if (e.target.name === "stronglyDisagree-" + id) {
        switch (e.target.value) {
          case "Openess":
            this.setState((prevState) => ({
              openess: prevState.openess + 1,
            }));
            break;
          case "Conscientiousness":
            this.setState((prevState) => ({
              conscientiousness: prevState.conscientiousness + 1,
            }));
            break;
          case "Extroversion":
            this.setState((prevState) => ({
              extroversion: prevState.extroversion + 1,
            }));
            break;
          case "Agreebleness":
            this.setState((prevState) => ({
              agreebleness: prevState.agreebleness + 1,
            }));
            break;
          case "Neuroticism":
            this.setState((prevState) => ({
              neuroticism: prevState.neuroticism + 1,
            }));
            break;
          default:
            return;
        }
      } else if (e.target.name === "disagree-" + id) {
        switch (e.target.value) {
          case "Openess":
            this.setState((prevState) => ({
              openess: prevState.openess + 1,
            }));
            break;
          case "Conscientiousness":
            this.setState((prevState) => ({
              conscientiousness: prevState.conscientiousness + 1,
            }));
            break;
          case "Extroversion":
            this.setState((prevState) => ({
              extroversion: prevState.extroversion + 1,
            }));
            break;
          case "Agreebleness":
            this.setState((prevState) => ({
              agreebleness: prevState.agreebleness + 1,
            }));
            break;
          case "Neuroticism":
            this.setState((prevState) => ({
              neuroticism: prevState.neuroticism + 1,
            }));
            break;
          default:
            return;
        }
      } else if (e.target.name === "neutral-" + id) {
        switch (e.target.value) {
          case "Openess":
            this.setState((prevState) => ({
              openess: prevState.openess + 1,
            }));
            break;
          case "Conscientiousness":
            this.setState((prevState) => ({
              conscientiousness: prevState.conscientiousness + 1,
            }));
            break;
          case "Extroversion":
            this.setState((prevState) => ({
              extroversion: prevState.extroversion + 1,
            }));
            break;
          case "Agreebleness":
            this.setState((prevState) => ({
              agreebleness: prevState.agreebleness + 1,
            }));
            break;
          case "Neuroticism":
            this.setState((prevState) => ({
              neuroticism: prevState.neuroticism + 1,
            }));
            break;
          default:
            return;
        }
      } else if (e.target.name === "agree-" + id) {
        switch (e.target.value) {
          case "Openess":
            this.setState((prevState) => ({
              openess: prevState.openess + 1,
            }));
            break;
          case "Conscientiousness":
            this.setState((prevState) => ({
              conscientiousness: prevState.conscientiousness + 1,
            }));
            break;
          case "Extroversion":
            this.setState((prevState) => ({
              extroversion: prevState.extroversion + 1,
            }));
            break;
          case "Agreebleness":
            this.setState((prevState) => ({
              agreebleness: prevState.agreebleness + 1,
            }));
            break;
          case "Neuroticism":
            this.setState((prevState) => ({
              neuroticism: prevState.neuroticism + 1,
            }));
            break;
          default:
            return;
        }
      } else if (e.target.name === "stronglyAgree-" + id) {
        switch (e.target.value) {
          case "Openess":
            this.setState((prevState) => ({
              openess: prevState.openess + 1,
            }));
            break;
          case "Conscientiousness":
            this.setState((prevState) => ({
              conscientiousness: prevState.conscientiousness + 1,
            }));

            break;
          case "Extroversion":
            this.setState((prevState) => ({
              extroversion: prevState.extroversion + 1,
            }));

            break;
          case "Agreebleness":
            this.setState((prevState) => ({
              agreebleness: prevState.agreebleness + 1,
            }));

            break;
          case "Neuroticism":
            this.setState((prevState) => ({
              neuroticism: prevState.neuroticism + 1,
            }));

            break;
          default:
            return;
        }
      }
    }
  };

  resetQuizScore = () => {
    this.setState({
      openess: 0,
      conscientiousness: 0,
      extroversion: 0,
      agreebleness: 0,
      neuroticism: 0,
    });
  };

  render() {
    return (
      <>
        <BigFiveNavbar />
        <div
          className="main-con"
          style={{ background: "#ededed", width: "90%", margin: "auto" }}
        >
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col"></th>
                <th scope="col">Strongly Disagree</th>
                <th scope="col">Disagree</th>
                <th scope="col">Neutral</th>
                <th scope="col">Agree</th>
                <th scope="col"> Strongly Agree</th>
              </tr>
            </thead>
            <tbody>
              {this.state.quizdata.map((ques) => {
                const id = ques.sys.id;
                const question = ques.fields.question;
                const agree = ques.fields.agree[0];
                const stronglyAgree = ques.fields.stronglyAgree[0];
                const neutral = ques.fields.neutral[0];
                const disagree = ques.fields.disagree[0];
                const stronglyDisagree = ques.fields.stronglyDisagree[0];

                return (
                  <tr key={id}>
                    <th scope="row">{question} &nbsp;</th>
                    <td>
                      <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          name={`stronglyDisagree-${id}`}
                          value={stronglyDisagree}
                          id={`${stronglyDisagree}-${id}`}
                          onClick={(e) => this.handleCheckbox(e, id)}
                        />
                        <label
                          class="custom-control-label"
                          for={`${stronglyDisagree}-${id}`}
                        ></label>
                      </div>
                    </td>
                    <td>
                      <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          name={`disagree-${id}`}
                          value={disagree}
                          id={`${disagree}-${id}`}
                          onClick={(e) => this.handleCheckbox(e, id)}
                        />
                        <label
                          class="custom-control-label"
                          for={`${disagree}-${id}`}
                        ></label>
                      </div>
                    </td>
                    <td>
                      <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          name={`neutral-${id}`}
                          value={neutral}
                          id={`${neutral}-${id}`}
                          onClick={(e) => this.handleCheckbox(e, id)}
                        />
                        <label
                          class="custom-control-label"
                          for={`neutral-${id}`}
                        ></label>
                      </div>
                    </td>
                    <td>
                      <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          name={`agree-${id}`}
                          value={agree}
                          id={`${agree}-${id}`}
                          onClick={(e) => this.handleCheckbox(e, id)}
                        />
                        <label
                          class="custom-control-label"
                          for={`${agree}-${id}`}
                        ></label>
                      </div>
                    </td>
                    <td>
                      <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          name={`stronglyAgree-${id}`}
                          value={stronglyAgree}
                          id={`${stronglyAgree}-${id}`}
                          onClick={(e) => this.handleCheckbox(e, id)}
                        />
                        <label
                          class="custom-control-label"
                          for={`${stronglyAgree}-${id}`}
                        ></label>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Link
          to={{
            pathname: "/result",
            state: {
              openess: this.state.openess,
              conscientiousness: this.state.conscientiousness,
              extroversion: this.state.extroversion,
              agreebleness: this.state.agreebleness,
              neuroticism: this.state.neuroticism,
            },
          }}
        >
          <center>
            <Button
              style={{ marginTop: 10 }}
              resetScore={this.resetQuizScore}
              variant="primary"
              size="lg"
            >
              Get result
            </Button>
          </center>
        </Link>
      </>
    );
  }
}

export default BigFive;
