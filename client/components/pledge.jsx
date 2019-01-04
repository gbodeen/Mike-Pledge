import React from "react";
import axios from "axios";
// import "../styles/app.css";

const pledgeStyle = {
  float: "right",
  width: "50%",
  height: "50%",
  borderStyle: "solid",
  borderWidth: "2px",
  textAlign: "center"
};

export default class Pledge extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      pledge_amount: "10",
      isValidNumber: true,
      hasBacked: false,
      pledgesRoute: "http://" + window.location.hostname + ":3000/pledges/"
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      axios.get(this.state.pledgesRoute + this.props.id).then(result => {
        this.setState({
          goal: result.data.goal,
          pledged: result.data.pledged,
          backer_count: result.data.backer_count,
          days_left: result.data.days_left,
          pledge_amount: "10",
          hasBacked: false
        });
      });
    }
  }

  componentDidMount() {
    axios.get(this.state.pledgesRoute + this.props.id).then(result => {
      this.setState({
        goal: result.data.goal,
        pledged: result.data.pledged,
        backer_count: result.data.backer_count,
        days_left: result.data.days_left
      });
    });
  }

  handleClick(e) {
    axios
      .post(this.state.pledgesRoute, {
        id: this.props.id,
        pledge_amount: Number(this.state.pledge_amount),
        hasBacked: this.state.hasBacked
      })
      .then(() => {
        return axios.get(this.state.pledgesRoute + this.props.id);
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

  render() {
    return (
      <div style={pledgeStyle}>
        <p>
          <span id="goal">Goal: {this.state.goal}</span>
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
        </p>
      </div>
    );
  }
}
