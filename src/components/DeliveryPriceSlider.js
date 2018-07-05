import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import React from 'react';
import Slider from 'rc-slider';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class DeliveryPriceSlider extends React.Component {

  state = {
    timeInterval: [1, 3],
    price: 45
  };

  onSliderChange = (timeInterval) => {
    this.setState({ timeInterval });
    this.calculatePrice();
  };

  calculatePrice = () => {
    const { timeInterval } = this.state;
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
    const { price, timeInterval } = this.state;

    const marks = {
      '-3': '9am',
      '5': '5pm'
    };

    return (
      <div className='delivery-price'>
        <div className='price-field'>
          <span className='price-field__label'>Delivery price: </span>
          <span className='price-field__value'>${price}</span>
        </div>

        <div className='time-slider-container'>
          <Range
            min={-3}
            max={5}
            tipFormatter={this.tipFormatter}
            tipProps={{visible: true}}
            allowCross={false}
            pushable
            marks={marks}
            value={timeInterval}
            onChange={this.onSliderChange}
            onAfterChange={this.onSliderChange}
          />
        </div>
      </div>
    );
  }
}

export default DeliveryPriceSlider;