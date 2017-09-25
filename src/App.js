import React, { Component } from 'react';
import './App.css';
import InfiniteScroll from 'react-infinite-scroller';

class App extends Component {

  state ={data : [] , page : 1 ,  hasMoreItems : true ,}

  async getData(page) {
    console.log("get_data")
   let req;
   try {
     req = await fetch("https://content.guardianapis.com/search?api-key=3811404c-4fff-44c6-b717-46c36d3e15ca&show-fields=thumbnail&page=" + this.state.page)
      const result_json = await req.json()
      const ndata = result_json.response.results
      const {data} = this.state;
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
    setInterval(function(){
    }, 2000);
  }


  render() {
    console.log(this.state)
    let data;
    if(this.state.data[0]){
      console.log(this.state.data[0])
      data = this.state.data.map(elem => {
        if (elem.fields){
          return (
            <div key={elem.id}>
            <img src={elem.fields.thumbnail} alt="" width="100" height="100"/>
            <p>{elem.sectionName}</p>
            <p>{elem.webTitle}</p>
            <a href={elem.webUrl} target="_blank">[Read more]</a>
            </div>
          );
        }
      }
    )
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
