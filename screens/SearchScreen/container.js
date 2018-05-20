import React, { Component } from "react";
import PropTypes from "prop-types";
import SearchScreen from "./presenter";
import SearchBar from "../../components/SearchBar";

class Container extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      headerTitle: <SearchBar submit={text => params.submitSearch(text)} />
    };
  };

  static propTypes = {
    getEmptySearch: PropTypes.func.isRequired,
    searchHashtag: PropTypes.func.isRequired,
    search: PropTypes.array
  };

  // search가 없어서 search.length가 에러나니까 empty array를 넣어줌.
  static defaultProps = {
    search: []
  };

  state = {
    searchingBy: "",
    isFetching: false
  };

  componentDidMount() {
    // 이게 props로 있는 이유는 Route의 StackNavigatior 안에 있기 때문
    const { navigation } = this.props;
    // Params를 쓰는 이유는 static method 안에서는 {...this.state} 이렇게 못 쓰기 때문.
    // 그래서 navigation의 params 기능을 사용해서 돌려서 넣는 것.
    navigation.setParams({
      submitSearch: this._submitSearch
    });
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.search) {
      this.setState({
        isFetching: false
      });
    }
  };

  render() {
    return (
      <SearchScreen {...this.state} {...this.props} refresh={this._refresh} />
    );
  }

  _submitSearch = text => {
    const { searchingBy } = this.state;
    const { searchHashtag, getEmptySearch } = this.props;
    if (text === "") {
      getEmptySearch();
    } else {
      searchHashtag(text);
    }
    this.setState({
      searchingBy: text,
      isFetching: true
    });
  };

  _refresh = () => {
    const { searchingBy } = this.state;
    const { getEmptySearch, searchHashtag } = this.props;
    if (searchingBy === "") {
      getEmptySearch();
    } else {
      searchHashtag(searchingBy);
    }
  };
}

export default Container;
