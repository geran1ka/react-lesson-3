import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      result: '',
      userNumber: '',
      randomNumber: Math.floor(Math.random() * (this.props.max - this.props.min) +
      this.props.min),
      count: 0,
      numberOfAttempts: 3,
      newGame: false,
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState(state => ({
      count: state.count + 1,
    }));

    this.setState(state => {
      console.log(state);
      console.log('state.numberOfAttempts - state.count: ', state.numberOfAttempts - state.count);
      if (!(state.numberOfAttempts - state.count)) {
        return {
          result: `У вас закончились попытки`,
          newGame: true,
        };
      }
      if (!state.userNumber) {
        return {
          result: `Введите число`
        };
      }

      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber} больше загаданного`,
        };
      }

      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} меньше загаданного`,
        };
      }

      return {
        result: `Вы угадали загаданное число ${state.userNumber},
        попыток ${state.count}`,
        newGame: true,
      };
    });
  };
  handleChange = e => {
    this.setState({
      userNumber: e.target.value,
    });
  };

  handleReset = e => {
    this.setState({
      result: 5,
      userNumber: '',
      randomNumber: Math.floor(Math.random() * (this.props.max - this.props.min) +
      this.props.min),
      count: 0,
      newGame: false,
    });
  };

  render() {
    console.log(this.state.count);
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>
        <form className={style.form} onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor='user_number'>
            Угадай число
          </label>
          <input className={style.input} type='number' id='user_number'
            onChange={this.handleChange} value={this.state.userNumber}
          />
          <button className={style.btn}>Угадать</button>
        </form>
        {this.state.newGame ?
          <button className={style.btn} type='button' onClick={this.handleReset}>Сыграть еще</button> :
          ''}
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
