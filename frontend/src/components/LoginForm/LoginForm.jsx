import React from 'react';
import PropTypes from 'prop-types';
import './LoginForm.css'

class LoginForm extends React.Component {
  state = {
    username: '',
    password: ''
  };

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    return (
      <article className="art">
        <div className="login-div log-div">
          <div className="login-div-2">
          </div>
        </div>
      <div className="gr27e">
        <img src="flutter-logo.png" width='280px' height='90px' />
      <form onSubmit={e => this.props.handle_login(e, this.state)}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handle_change}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handle_change}
        />
        <input type="submit" />
      </form>
      </div>
      <div className="gr27e">
        <div className="bot-div log-bot bottom-div bottom-log sign-bot">
        <p className="bot-p">Don't have an account? <a href="/signup/">Sign Up</a></p>
        </div>
      </div>
      </article>
    );
  }
}

export default LoginForm;

LoginForm.propTypes = {
  handle_login: PropTypes.func.isRequired
};