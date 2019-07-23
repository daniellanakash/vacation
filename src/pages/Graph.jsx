import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";

export class Graph extends Component {
  state = {
    chardata: {
      labels: [],
      datasets: [
        {
          label: "User Followes",
          data: [],
          backgroundColor: [
            "rgba(255,99,132,0.6)",
            "rgba(255,99,132,0.6)",
            "rgba(255,99,132,0.6)"
          ]
        }
      ]
    }
  };

  async componentDidMount() {
    const results = await fetch(`http://localhost:5000/api/vacations`);
    const data = await results.json();
    const xData = data.map(x => x.destination);
    const yData = data.map(y => y.followers);
    console.log(yData);

    this.setState(prevState => ({
      chardata: {
        labels: xData,
        datasets: [
          {
            label: "User Followes",
            data: yData,
            backgroundColor: [
              "rgba(255,99,132,0.6)",
              "rgba(255,99,132,0.6)",
              "rgba(255,99,132,0.6)"
            ]
          }
        ]
      }
    }));
  }

  render() {
    return (
      <div className="container">
        <div className="chart">
          <Bar
            data={this.state.chardata}
            options={{
              title: {
                display: true,
                text: "Graph",
                fontSize: 25
              },
              legend: {
                dusplay: true,
                position: "bottom"
              },
              scales: {
                xAxes: [
                  {
                    stacked: true
                  }
                ],
                yAxes: [
                  {
                    stacked: true
                  }
                ]
              }
            }}
          />
        </div>
        <Link to="/admin" className="backAdmin">
          Back to Admin
        </Link>
      </div>
    );
  }
}
