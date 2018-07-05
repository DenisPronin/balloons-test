import React from 'react';
import AddressSearchBox from "./components/AddressSearchBox";
import DeliveryPriceSlider from "./components/DeliveryPriceSlider";

class App extends React.Component {

  state = {
    address: '',
    placeId: '',
    time: {min: -3, max: 5},
    price: 15,
    formStep: 1
  };

  handleChangeAddress = (address, placeId = '') => {
    this.setState({address, placeId});
  };

  handleChangeTime = (time) => {
    this.setState({time});
  };

  handleChangePrice = (price) => {
    this.setState({price});
  };

  prevStep = () => {
    this.setState({formStep: this.state.formStep - 1});
  };

  nextStep = () => {
    this.setState({formStep: this.state.formStep + 1});
  };

  render() {
    return (
      <div className="app">
        {this.state.formStep === 1 && (
          <AddressSearchBox
            address={this.state.address}
            placeId={this.state.placeId}
            onChange={this.handleChangeAddress}
          />
        )}

        {this.state.placeId && this.state.formStep === 1 && (
          <button onClick={this.nextStep}>Next</button>
        )}

        {this.state.formStep === 2 && (
          <div>
            <div>{this.state.address}</div>
            <DeliveryPriceSlider
              time={this.state.time}
              price={this.state.price}
              handleChangeTime={this.handleChangeTime}
              handleChangePrice={this.handleChangePrice}
            />

            <button onClick={this.prevStep}>Change Address</button>
            <button>Done</button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
