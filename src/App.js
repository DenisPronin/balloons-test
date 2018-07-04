import React from 'react';
import AddressSearchBox from "./components/AddressSearchBox";
import DeliveryPriceSlider from "./components/DeliveryPriceSlider";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <AddressSearchBox />
        <DeliveryPriceSlider />
      </div>
    );
  }
}

export default App;
