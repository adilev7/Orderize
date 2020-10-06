import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
// import productService from "../services/productService";
//data,name,placeholder
class Search extends Component {
  state = {
    data: [],
    value: "",
    suggestions: [],
  };

  componentDidMount = async () => {
    const { data } = this.props;
    data && this.setState({ data });
  };

  getSuggestions = (value) => {
    const { data } = this.state;
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    if (data) {
      return inputLength === 0
        ? []
        : data.filter(
            (item) =>
              item.description.toLowerCase().slice(0, inputLength) ===
              inputValue
          );
    } else {
      console.log("EMPTY");
    }
  };

  getSuggestionValue = (suggestion) => {
    const { name } = this.props;
    return suggestion[name];
  };

  renderSuggestion = (suggestion) => {
    console.log(suggestion);
    const { name } = this.props;
    return <div>{suggestion[name]}</div>;
  };

  onChange = (e, { newValue }) => {
    e.persist();
    const { id, name } = this.props;
    console.log(e.currentTarget);
    console.log(newValue);
    const message = this.getSuggestions(newValue)
      ? "The product you are searching for does not exist"
      : "";

    this.setState({ value: newValue });
    const obj = { currentTarget: { id, name, value: newValue } };
    let searchErr = { id, name, message };
    if (e.currentTarget.name === name) {
      console.log(JSON.stringify(searchErr));
      this.props.onChange(e, searchErr);
      this.props.validate(e, searchErr);
    } else {
      this.props.onChange(obj);
    }
  };

  onSuggestionsFetchRequested = ({ value }) => {
    console.log(
      "onSuggestionsFetchRequested {value}",
      value,
      "getSuggestions",
      this.getSuggestions(value)
    );
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
    const { name, id, placeholder, error, validate, ...rest } = this.props;

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
        {/* {data.find((product) => product === value) && error && (
          <span className='text-danger'>{error}</span>
        )} */}
        {error && <span className='text-danger'>{error}</span>}
      </React.Fragment>
    );
  }
}

export default Search;
