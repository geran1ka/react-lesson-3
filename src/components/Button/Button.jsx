import React from 'react';
import PropTypes from 'prop-types';
import style from './Button.module.css';

export const Button = props => <button className={style.btn} {...props}>{props.children}</button>;

Button.propTypes = {
  children: PropTypes.string || PropTypes.element,
};
