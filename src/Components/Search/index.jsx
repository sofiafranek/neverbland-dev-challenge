import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      // filter: '',
    };
  }

  startSearch = (event) => {
    const search = event.target.value;
    this.setState({
      search,
    });
    this.props.search(search);
  };

  // startFilter(event) {
  //   const filter = event.target.value;
  //   this.setState({
  //     filter
  //   });
  //   this.props.filter(filter);
  // }

  render() {
    return (
      <div>
        <form>
          <input
            type="search"
            name="search"
            value={this.state.search}
            onChange={this.startSearch}
            placeholder="Search..."
            autoComplete="off"
          />
        </form>
        {/* <select name="filter" className="col-4 filter" onChange={this.startFilter}>
          <option value="">--Filter by--</option>
          <option value="ascendingEquality"></option>
          <option value="descendingEquality"></option>
          <option value="ascendingEmployees"></option>
          <option value="descendingEmployees"></option>
        </select> */}
      </div>
    );
  }
}

export default Search;
