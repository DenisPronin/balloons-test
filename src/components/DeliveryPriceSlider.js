import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import React from 'react';
import Slider from 'rc-slider';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class DeliveryPriceSlider extends React.Component {

  state = {
    timeInterval: [-3, 5],
    price: null
  };

  componentDidMount () {
    this.calculatePrice();
  }

  onSliderChange = (timeInterval) => {
    this.setState({ timeInterval });
    this.calculatePrice(timeInterval);
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