import React, { Component } from "react";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

class App extends Component {
  state = {
    manager: "",
    players: [],
    balance: "",
    value: "",
    message: ""
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({ manager, players, balance });
  }

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager}</p>
        <p>There are currently {this.state.players.length} players playing</p>
        <p>
          Grand prize is currently{" "}
          {web3.utils.fromWei(this.state.balance, "ether")} ether
        </p>
        <hr />
        <h3>{this.state.message}</h3>
        <form onSubmit={this.handleSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label htmlFor="">Amount of ether to enter</label>
            <input
              type="text"
              onChange={event => this.setState({ value: event.target.value })}
              value={this.state.value}
            />
          </div>
          <button type="submit">Enter</button>
        </form>
        <hr />
        <h3>{this.state.message2}</h3>
        <form onSubmit={this.handlePickAWinnerSubmit}>
          <h4>Time to pick a winner</h4>
          <button type="submit">Pick a winner</button>
        </form>
      </div>
    );
  }

  handleSubmit = async event => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Waiting on transaction success...." });

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether")
    });

    this.setState({ message: "You have been entered...." });
  };

  handlePickAWinnerSubmit = async event => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message2: "Selecting a winner...." });

    const winner = await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    this.setState({ message2: "A winner has been picker!" });
  };
}

export default App;
