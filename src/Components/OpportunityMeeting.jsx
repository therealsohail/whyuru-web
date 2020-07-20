import React, { Component } from "react";
import { client } from "../client";

class OpportunityMeeting extends Component {
  state = {
    articles: [],
  };

  componentDidMount() {
    client
      .getEntries({
        content_type: "opportunityMeetingPreparation",
      })
      .then((response) => {
        console.log(response);
        this.setState({
          articles: response.items,
        });
        console.log(this.state);
      });
  }

  render() {
    //let image = require("../Assets/brain.png");

    return (
      <div className="container opp-meeting">
        <h4 className="opp-heading">Oportunity meeting preperation</h4>

        {this.state.articles.map((article, index) => {
          const { image, description } = article.fields;
          const imageFile = image.fields.file.url;

          return (
            <div className="row opp-row article" key={index}>
              <div className="col-sm-6 opp-container">
                <img
                  className="opp-image img-fluid"
                  style={{
                    display: "block",
                    margin: "auto",
                    width: "200",
                  }}
                  src={imageFile}
                  alt=""
                />
              </div>
              <div className="col-sm-6 opp-content">
                <p>{description}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default OpportunityMeeting;
