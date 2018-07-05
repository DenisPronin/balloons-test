import React from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

class DeliveryPriceSlider extends React.Component {

  state = {
    timeInterval: [-3, 5],
    time: {min: -3, max: 5},
    min: -3,
    max: 5,
    price: null
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

    this.setState({time: { min, max }});
    this.calculatePrice([time.min, time.max]);
  };

  calculatePrice = (timeInterval = null) => {
    timeInterval = timeInterval || this.state.timeInterval;

    const [startTime, endTime] = timeInterval;
    let price = 15;

    if (endTime - startTime === 3) {
      price = 30;
    }
    else if (endTime - startTime === 2) {
      price = 45;
    }

    this.setState({ price });
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
    const { price, time, min, max } = this.state;

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