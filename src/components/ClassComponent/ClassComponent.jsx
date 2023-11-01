import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';
import {Button} from '../Button/Button';

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      result: 'Введите число',
      userNumber: '',
      userNumbers: [],
      randomNumber: Math.floor(Math.random() * (this.props.max - this.props.min) +
      this.props.min),
      count: 0,
      numberOfAttempts: 3,
      newGame: false,
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    this.setState(state => {
      if (!state.userNumber) {
        return {
          result: `Введите число`
        };
      }


      if (+state.userNumber > this.props.max || +state.userNumber < this.props.min) {
        return {
          result: `Число ${state.userNumber} вне диапазона ${this.props.min} - ${this.props.max}`,
        };
      }

      if (!(state.userNumbers.find(item => +item === +state.userNumber))) {
        state.userNumbers.push(state.userNumber);
        state.count += 1;
      } else {
        return {
          result: `Вы уже вводили число ${state.userNumber}`,
        };
      }


      if (!(state.numberOfAttempts - state.count) && +state.userNumber !== state.randomNumber) {
        return {
          result: `У вас закончились попытки`,
          newGame: true,
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

    this.setState(state => ({
      userNumber: '',
    }));
  };

  handleChange = e => {
    this.setState({
      userNumber: e.target.value,
    });
  };

  handleReset = e => {
    e.preventDefault();
    this.setState({
      result: 'Введите число',
      userNumber: '',
      userNumbers: [],
      randomNumber: Math.floor(Math.random() * (this.props.max - this.props.min) +
      this.props.min),
      count: 0,
      newGame: false,
    });
  };

  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>
        <form className={style.form} onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor='user_number'>
            Угадай число
          </label>
          {
            this.state.newGame ?
              <>
                <input className={style.input} type='number' id='user_number'
                  onChange={this.handleChange} value={this.state.userNumber} disabled />
                <Button type='button' onClick={(e) => {
                  this.handleReset(e);
                }}>Сыграть еще</Button>
              </> :
              <>
                <input className={style.input} type='number' id='user_number'
                  onChange={this.handleChange} value={this.state.userNumber} />
                <Button>Угадать</Button>
              </>
          }
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
