import React from 'react';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

class DeliveryPriceSlider extends React.Component {

  static propTypes = {
    time: PropTypes.object.isRequired,
    price: PropTypes.number.isRequired,
    handleChangeTime: PropTypes.func.isRequired,
    handleChangePrice: PropTypes.func.isRequired
  };

  state = {
    min: -3,
    max: 5
  };

  componentDidMount () {
    this.calculatePrice();
  }

  onChange = (time) => {
    let {min, max} = time;
    const range = max - min;
    if (min < this.state.min) {
      min = this.state.min;
      max = min + range;
    }
    else if (max > this.state.max) {
      max = this.state.max;
      min = max - range;
    }

    this.props.handleChangeTime({ min, max });
    this.calculatePrice({ min, max });
  };

  calculatePrice = (time = null) => {
    time = time || this.props.time;

    const startTime = time.min;
    const endTime = time.max;
    let price = 15;

    if (endTime - startTime === 3) {
      price = 30;
    }
    else if (endTime - startTime === 2) {
      price = 45;
    }

    this.props.handleChangePrice(price);
  };

  tipFormatter = (time) => {
    if (time < 0) {
      return `${time + 12}am`;
    }
    else if (time === 0) {
      return `${time + 12}pm`;
    }
    else {
      return `${time}pm`;
    }
  };

  render() {
    const { time, price } = this.props;
    const { min, max } = this.state;

    return (
      <div className='delivery-price'>
        <div className='price-field'>
          <span className='price-field__label'>Delivery price: </span>
          <span className='price-field__value'>${price}</span>
        </div>

        <div className='time-slider-container'>
          <InputRange
            minValue={min}
            maxValue={max}
            formatLabel={this.tipFormatter}
            value={time}
            onChange={this.onChange}
            draggableTrack
          />

        </div>
      </div>
    );
  }
}

export default DeliveryPriceSlider;