import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import InfiniteScroll from 'react-infinite-scroller';

class App extends Component {

  state ={data : [] , page : 1 ,  hasMoreItems : true}

  async getData(page) {
    console.log("get_data")
   let req;
   try {
     req = await fetch("https://content.guardianapis.com/search?api-key=3811404c-4fff-44c6-b717-46c36d3e15ca&page=" + this.state.page)
      const result_json = await req.json()
      const ndata = result_json.response.results
      //this.setState({data : data ,page : this.state.page+1})
      const {data} = this.state;
      // const items = this.state.items;
      //data.push(ndata);
      ndata.map(elem => {
            data.push(elem)
        })
      this.setState({data , page : this.state.page+1 , hasMoreItems: true});
      console.log(this.state.page)
      console.log(this.state.data)
   }catch (e){
     alert(e.message)
   }
 }

  componentDidMount(){
    //this.getData()
  }

  onscrollfunc(){
    console.log('yo')
  }

  render() {
    let data;
    if(this.state.data[0]){
      data = this.state.data.map(elem => {
          return (
            <p>{elem.id}</p>
          );
        })
    }else{
      data = ''
    }


    return (

      <div className="App">
      <InfiniteScroll
              pageStart={1}
              loadMore={this.getData.bind(this)}
              hasMore={this.state.hasMoreItems}
              threshold = {200}
              loader={<div className="loader">Loading ...</div>}>
              <div>
                {data}
              </div>
          </InfiniteScroll>
      </div>
    );
  }
}

export default App;
