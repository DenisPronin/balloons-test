import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import classnames from 'classnames';

class AddressSearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      placeId: '',
      errorMessage: '',
      isGeocoding: false,
    };
  }

  handleChange = address => {
    this.setState({
      address,
      errorMessage: '',
    });
  };

  handleSelect = (selected, placeId) => {
    this.setState({ isGeocoding: true, address: selected, placeId });
    geocodeByAddress(selected)
      .then(res => getLatLng(res[0]))
      .then(({ lat, lng }) => {
        this.setState({
          isGeocoding: false,
        });
      })
      .catch(error => {
        this.setState({ isGeocoding: false });
        console.log('error', error);
      });
  };

  handleCloseClick = () => {
    this.setState({
      address: ''
    });
  };

  handleError = (status, clearSuggestions) => {
    console.log('Error from Google Maps API', status); // eslint-disable-line no-console
    this.setState({ errorMessage: status }, () => {
      clearSuggestions();
    });
  };

  render() {
    const { address, errorMessage } = this.state;

    return (
      <div>
        <PlacesAutocomplete
          onChange={this.handleChange}
          value={address}
          onSelect={this.handleSelect}
          onError={this.handleError}
          shouldFetchSuggestions={address.length > 2}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => {
            return (
              <div className='search-bar'>
                <label>Enter your address: </label>
                <div className="search-bar-container">
                  <div className="search-input-container">
                    <input
                      {...getInputProps({
                        placeholder: 'Start typing your address',
                        className: 'search-input',
                      })}
                    />
                    {this.state.address.length > 0 && (
                      <button
                        className="clear-button"
                        onClick={this.handleCloseClick}
                      >
                        x
                      </button>
                    )}
                  </div>
                  {suggestions.length > 0 && (
                    <div className="autocomplete-container">
                      {suggestions.map(suggestion => {
                        const className = classnames('suggestion-item', {
                          'suggestion-item--active': suggestion.active,
                        });

                        return (
                          <div
                            key={`suggestion-${suggestion.id}`}
                            {...getSuggestionItemProps(suggestion, { className })}
                          >
                            <strong>
                              {suggestion.formattedSuggestion.mainText}
                            </strong>{' '}
                            <small>
                              {suggestion.formattedSuggestion.secondaryText}
                            </small>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          }}
        </PlacesAutocomplete>

        {errorMessage.length > 0 && (
          <div className="error-message">{this.state.errorMessage}</div>
        )}
      </div>
    );
  }
}

export default AddressSearchBox;