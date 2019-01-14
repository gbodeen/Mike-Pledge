import React from "react";
import axios from "axios";
import "../styles/app.css";

export default class Pledge extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      pledge_amount: 10,
      isValidNumber: true,
      hasBacked: false,
      pledgesRoute: "/pledge/"
    };
  }

  componentDidUpdate(prevProps) {
    const project_id = this.props.id || 1;
    if (this.props.id !== prevProps.id) {
      axios.get(this.state.pledgesRoute + project_id).then(result => {
        this.setState({
          goal: result.data.goal,
          pledged: result.data.total_pledged,
          backer_count: result.data.backer_count,
          days_left: Math.floor((Date.now() - result.data.deadline) / 86400000),
          pledge_amount: 10,
          hasBacked: false
        });
      });
    }
  }

  componentDidMount() {
    const project_id = this.props.id || 1;
    axios.get(this.state.pledgesRoute + project_id).then(result => {
      this.setState({
        goal: result.data.goal,
        pledged: result.data.total_pledged,
        backer_count: result.data.backer_count,
        days_left: result.data.days_left
      });
    });
  }

  handleClick(e) {
    const project_id = this.props.id || 1;
    axios
      .post(this.state.pledgesRoute, {
        project_id: project_id,
        pledge_amount: Number(this.state.pledge_amount),
        username: "Mike " + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)] + "'Connor"
      })
      .then(() => {
        return axios.get(this.state.pledgesRoute + project_id);
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
      <div className="component">
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
