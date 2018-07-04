import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import React from 'react';
import Slider from 'rc-slider';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class DeliveryPriceSlider extends React.Component {

  tipFormatter = (value) => {
    return `${value}%`;
  };

  render() {
    return (
      <div>
        <div className='price-slider-container'>
          <Range
            min={0}
            max={20}
            defaultValue={[3, 10]}
            tipFormatter={this.tipFormatter}
          />
        </div>
      </div>
    );
  }
}

export default DeliveryPriceSlider;