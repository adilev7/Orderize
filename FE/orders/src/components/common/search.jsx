import React, { Component } from "react";
import Autosuggest from "react-autosuggest";

class Search extends Component {
  state = {
    data: [],
    value: "",
    suggestions: [],
  };

  componentDidMount = async () => {
    const { data, value } = this.props;
    data && this.setState({ data, value });
  };

  getSuggestions = (value) => {
    const { data } = this.state;
    const inputValue = value?.trim().toLowerCase();
    const inputLength = inputValue?.length;
    if (data) {
      return inputLength === 0
        ? data
        : data.filter(
            (item) =>
              item.description.toLowerCase().slice(0, inputLength) ===
              inputValue
          );
    }
  };

  getSuggestionValue = (suggestion) => {
    const { name } = this.props;
    return suggestion[name];
  };

  renderSuggestion = (suggestion) => {
    const { name } = this.props;
    return <div>{suggestion[name]}</div>;
  };

  onChange = (e, { newValue }) => {
    const { id, name } = this.props;
    e.persist();
    this.setState({ value: newValue });

    const obj = { currentTarget: { id, name, value: newValue } };

    if (e.currentTarget.name === name) {
      this.props.onChange(e);
    } else {
      this.props.onChange(obj);
    }
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const { name, id, placeholder, error, ...rest } = this.props;

    const inputProps = {
      ...rest,
      name,
      id,
      placeholder,
      value,
      onChange: this.onChange,
    };

    return (
      <React.Fragment>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
        {error && <span className='text-danger'>{error}</span>}
      </React.Fragment>
    );
  }
}

export default Search;
