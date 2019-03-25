import React, { Component } from "react";
import ReactMde from "react-mde";
import Showdown from "showdown";

export interface ReactMdeState {
  mdeState: ReactMdeTypes.MdeState;
}

export class FormMde extends Component<{}, ReactMdeState> {
  converter: Showdown.Converter

  constructor(props) {
    super(props);
    this.state = {
      value: "hello world",
      tab: 'write'
    };
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true
    });
  }

  handleTabChange = tab => {
    this.setState({ tab });
  };

  handleValueChange = (value) => {
    this.setState({ value });
  };

  render() {
    return (
        <ReactMde
        onChange={this.handleValueChange}
        onTabChange={this.handleTabChange}
        value={this.state.value}
        generateMarkdownPreview={markdown =>
          Promise.resolve(this.converter.makeHtml(markdown))
        }
        selectedTab={this.state.tab}
      />
    );
  }
}