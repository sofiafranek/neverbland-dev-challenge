import React, { Component } from 'react';
import { singleShow } from './../../Services/singleShow';

class SingleShow extends Component {
  constructor() {
    super();
    this.state = {
      singleShow: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    singleShow(this.props.match.params.id)
      .then((show) => {
        this.setState({
          singleShow: show,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const single = this.state.singleShow;
    console.log(single._embedded, 'show');

    return (
      <div>
        <h1>Single Show Page</h1>
      </div>
    );
  }
}

export default SingleShow;
