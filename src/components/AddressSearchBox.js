import React from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import classnames from 'classnames';

class AddressSearchBox extends React.Component {
  static propTypes = {
    address: PropTypes.string.isRequired,
    placeId: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    handleError: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isGeocoding: false,
    };
  }

  handleChange = (address) => {
    this.props.onChange(address);
    this.props.handleError('');
  };

  handleSelect = (selected, placeId) => {
    this.setState({ isGeocoding: true });
    this.props.onChange(selected, placeId);

    geocodeByAddress(selected)
      .then(res => getLatLng(res[0]))
      .then(() => {
        this.setState({ isGeocoding: false });
      })
      .catch(error => {
        this.setState({ isGeocoding: false });
        console.log('error', error);
      });
  };

  handleCloseClick = () => {
    this.props.onChange('');
  };

  handleError = (status, clearSuggestions) => {
    console.log('Error from Google Maps API', status); // eslint-disable-line no-console
    this.props.handleError(status);
    clearSuggestions();
  };

  render() {
    const { address, errorMessage } = this.props;

    return (
      <div>
        <PlacesAutocomplete
          onChange={this.handleChange}
          value={address}
          onSelect={this.handleSelect}
          onError={this.handleError}
          shouldFetchSuggestions
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => {
            return (
              <div className='search-bar'>
                <div className="search-bar-container">
                  <div className="search-input-container">
                    <input
                      {...getInputProps({
                        placeholder: 'Start typing your address',
                        className: 'search-input',
                      })}
                    />
                    {address.length > 0 && (
                      <button
                        className="clear-button"
                        onClick={this.handleCloseClick}
                      >
                        <i className='fa fa-times' />
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
          <div className="error-message">{errorMessage}</div>
        )}
      </div>
    );
  }
}

export default AddressSearchBox;