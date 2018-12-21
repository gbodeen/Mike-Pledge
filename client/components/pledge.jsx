import React from "react";
import axios from "axios";

const pledgeStyle = {
  float: "right",
  width: "50%",
  height: "50%",
  borderStyle: "solid",
  borderWidth: "2px",
  textAlign: "center"
};

export default class Pledge extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeProject = this.changeProject.bind(this);
    this.state = {
      next_id: 1,
      pledge_amount: "10",
      isValidNumber: true,
      hasBacked: false
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/pledges", {
        params: {
          id: this.state.next_id
        }
      })
      .then(result => {
        this.setState({
          id: result.data.id,
          goal: result.data.goal,
          pledged: result.data.pledged,
          backer_count: result.data.backer_count,
          days_left: result.data.days_left,
          next_id: result.data.id + 1
        });
      });
  }

  handleClick(e) {
    axios
      .post("http://localhost:3000/pledges", {
        id: this.state.id,
        pledge_amount: Number(this.state.pledge_amount),
        hasBacked: this.state.hasBacked
      })
      .then(result => {
        this.setState({
          pledged: result.data.pledged,
          backer_count: result.data.backer_count,
          pledge_amount: "",
          hasBacked: true
        });
      });
  }

  isValidNum(num) {
    if (!isNaN(num) && Number(num) > 0) {
      if (num.split(".")[1]) {
        return num.split(".")[1].length < 3;
      } else {
        return true;
      }
    }
    return false;
  }

  handleChange(e) {
    this.setState({
      pledge_amount: e.target.value,
      isValidNumber: this.isValidNum(e.target.value)
    });
  }

  changeProject(e) {
    axios
      .get("http://localhost:3000/pledges", {
        params: {
          id: this.state.next_id
        }
      })
      .then(result => {
        this.setState({
          id: result.data.id,
          goal: result.data.goal,
          pledged: result.data.pledged,
          backer_count: result.data.backer_count,
          days_left: result.data.days_left,
          next_id: result.data.id + 1
        });
      });
  }

  render() {
    return (
      <div style={pledgeStyle}>
        <p>
          <span>Goal: {this.state.goal}</span>
          <br />
          <span>Pledged: {this.state.pledged}</span>
          <br />
          <span>Backer Count: {this.state.backer_count}</span>
          <br />
          <span>Days Left: {this.state.days_left}</span>
          <br />
          <input
            type="text"
            name="pledge_amount"
            value={this.state.pledge_amount}
            onChange={this.handleChange}
          />
          <input
            type="submit"
            name="pledge_submit"
            value="Make A Pledge"
            onClick={this.handleClick}
            disabled={!this.state.isValidNumber}
          />
          <br />
          <button onClick={this.changeProject}>ChangeProject</button>
        </p>
      </div>
    );
  }
}
