import React from 'react';
import Popup from "reactjs-popup";
import AddressSearchBox from "./components/AddressSearchBox";
import DeliveryPriceSlider from "./components/DeliveryPriceSlider";

class App extends React.Component {

  _basePrice = 15;

  notDeliveryPlaces = ['ChIJQ2dALkKuEmsRhDvkyrz2Y0w'];

  constructor (props) {
    super(props);
    this.state = {
      address: '',
      addressError: '',
      placeId: '',
      time: {min: -3, max: 5},
      price: this._basePrice,
      formStep: 1,
      showResult: false
    };
  }

  calcBasePrice = () => {
    let basePrice = this._basePrice;
    if (this.state.placeId === 'ChIJtf0nyiKwEmsRUOBFCe4yimU') {
      basePrice = 10;
    }
    return basePrice;
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

  handleChangeAddress = (address, placeId = '') => {
    if (this.notDeliveryPlaces.includes(placeId)) {
      this.setState({address});
      this.handleAddressError('We do not deliver to this area');
    }
    else {
      this.setState({address, placeId, addressError: ''});
    }
  };

  handleChangeTime = (time) => {
    this.setState({time});
  };

  handleChangePrice = (time) => {
    const startTime = time.min;
    const endTime = time.max;
    let price = this.calcBasePrice();

    if (endTime - startTime === 3) {
      price *= 2;
    }
    else if (endTime - startTime === 2) {
      price *= 3;
    }

    this.setState({price});
  };

  handleAddressError = (addressError) => {
    this.setState({addressError});
  };

  prevStep = () => {
    this.setState({formStep: this.state.formStep - 1});
  };

  nextStep = () => {
    this.setState({formStep: this.state.formStep + 1});
  };

  submit = () => {
    this.setState({showResult: true});
  };

  closeModal = () => {
    this.setState({ showResult: false });
  };

  render() {
    return (
      <div className="app">
        <div className="search-box">
          {this.state.formStep === 1 && (
            <AddressSearchBox
              address={this.state.address}
              errorMessage={this.state.addressError}
              placeId={this.state.placeId}
              onChange={this.handleChangeAddress}
              handleError={this.handleAddressError}
            />
          )}

          {this.state.placeId && this.state.formStep === 1 && (
            <div className="next-btn-wrapper">
              <button onClick={this.nextStep}>Next</button>
            </div>
          )}
        </div>

        {this.state.formStep === 2 && (
          <div className="address-box">
            <div className="address-info">
              <div className="delivery-address address-col">
                <div className="address-inner">
                  <div className="col-body">
                    {this.state.address}
                  </div>
                </div>
                <div className="delivery-buttons">
                  <button onClick={this.prevStep}>Change Address</button>
                </div>
              </div>

              <div className="address-col">
                <div className="address-inner">
                  <div className="col-body">
                    <DeliveryPriceSlider
                      time={this.state.time}
                      price={this.state.price}
                      tipFormatter={this.tipFormatter}
                      handleChangeTime={this.handleChangeTime}
                      handleChangePrice={this.handleChangePrice}
                    />
                  </div>
                </div>
                <div className="delivery-buttons">
                  <button onClick={this.submit}>Done</button>
                </div>

              </div>

            </div>
          </div>
        )}

        <Popup
          open={this.state.showResult}
          closeOnDocumentClick
          onClose={this.closeModal}
          className="custom-popup"
        >
          <div className="modal">
            <div className="modal-header">
              <a className="close" onClick={this.closeModal}>
                &times;
              </a>
            </div>
            <div className="modal-body">
              <div className="delivery-body">
                <div className="delivery-row">
                  Your order will be delivered at: {this.state.address}
                </div>
                <div className="delivery-row">
                  From: {this.tipFormatter(this.state.time.min)} - {this.tipFormatter(this.state.time.max)}
                </div>
                <div className="delivery-row">
                  Delivery price is: ${this.state.price}
                </div>
              </div>
            </div>
          </div>
        </Popup>
      </div>
    );
  }
}

export default App;
