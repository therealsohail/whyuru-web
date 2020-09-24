import React from "react";
import { Bar } from "react-chartjs-2";

class ResultChart extends React.Component {
  state = {
    labels: [
      "Openess",
      "Conscientiousness",
      "Extroversion",
      "Agreebleness",
      "Neuroticism",
    ],
    datasets: [
      {
        label: "Score",
        data: [
          this.props.data.openess,
          this.props.data.conscientiousness,
          this.props.data.extroversion,
          this.props.data.agreebleness,
          this.props.data.neuroticism,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  render() {
    return (
      <div className="container">
        <Bar
          data={this.state}
          width={50}
          height={350}
          options={{ maintainAspectRatio: false }}
        />
      </div>
    );
  }
}

export default ResultChart;
