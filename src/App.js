import React from 'react';
import './App.css';
import Post from "./components/ post"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: "",
      loading: [],
      final: [],
      error: ""
    }
  }

  hit = (event) => {
    try {
      let text = new RegExp(event.target.value, "i");

      this.setState({
        final: ""
      })

      this.requiredData(text);

    } catch (e) {
      this.setState({
        error: "Invalid Input"
      })
    }


  }

  requiredData = (text) => {
    // console.log(this.state.loading.slice(0, 7).filter(s => /'s'/.test(s.title)))

    this.setState({
      final: this.state.loading.filter(items => {
        if ((text.test(items.title) && text.test(items.by)) || text.test(items.title) || text.test(items.by) || text.test(items.url)) {
          return items
        }
      })
    })


    if (this.state.final.length === 0) {

      this.setState({
        error: "No Result Found"
      })

    } else {

      this.setState({
        error: ""
      })

    }

  }

  async componentDidMount() {

    let id = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
      .then(resp => resp.json())

    id.forEach(async (element) => {

      let eachData = await fetch(`https://hacker-news.firebaseio.com/v0/item/${element}.json?print=pretty`)
        .then(resp => resp.json())
        
      this.setState({
        loading: [...this.state.loading, eachData]
      })

    })

  }


  render() {
    // console.log(this.state.loading)

    return (
      <div className="App" >

        <div id="header">
          <div id="logo-title">
            <h1>Search<br></br>Hacker News</h1>
          </div>

          <div id="search-container">
            <input id="area" name="search-text" typeof="text" placeholder="Search Newest Stories Here" onChange={this.hit}></input>
            <span id="error">{this.state.error}</span>

          </div>
        </div>

        <div id="content">
          {
            this.state.final
              .sort((a, b) => b.score - a.score)
              .map(k => < Post data={k} />)
          }
        </div>

      </div>
    );
  }

}

export default App;
