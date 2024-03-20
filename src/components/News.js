import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
  static defaultProps = {
    country : 'in',
    pagesize : 8,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pagesize:PropTypes.number,
    category: PropTypes.string,
  }
  
  constructor(props){
    super(props);
    console.log("hello i am constructor");
    this.state = {
       articles : [], 
       loading: false ,
       page: 1,
       totalResults: 0
       
    }
    document.title=`${this.props.category}-NewsMonkey`;
  }
  async updateNews(){
    this.props.setProgress(10);
    const url =`https://newsapi.org/v2/top-headlines?count                                                                                                                                                                                                                                                          $ry=${this.props.country}&category=${this.props.category}&apiKey=9ef5d987c32c43f0805ea2b6b4339ffb&page= ${this.state.page}&pageSize=${this.props.pagesize}`;
      this.setState({loading: true});   
      let data = await fetch(url);
      this.props.setProgress(30);
      let parsedData =await  data.json();
      this.props.setProgress(50);
      console.log(data);
      this.setState({articles : parsedData.articles,totalResults: parsedData.totalResults,
      })
      this.props.setProgress(100);

  }
  async componentDidMount(){
    this.updateNews();
      // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9ef5d987c32c43f0805ea2b6b4339ffb&page=1&pageSize=${this.props.pagesize}`;
      // this.setState({loading: true});   
      // let data = await fetch(url);
      // let parsedData =await  data.json();
      // console.log(data);
      // this.setState({articles : parsedData.articles,totalResults: parsedData.totalResults,
      // loading: false})
  }
  handleNextclick =async()=>{
    console.log("Next");
  //   if (!(this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pagesize))){
      
  //   let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9ef5d987c32c43f0805ea2b6b4339ffb&page= ${this.state.page + 1}&pageSize=${this.props.pagesize}`;
  //   this.setState({loading: true}); 
  //   let data = await fetch(url);
  //     let parsedData =await  data.json();
      
  //     console.log(data);
      
  //   this.setState({
  //     page:this.state.page + 1,
  //     articles : parsedData.articles,
  //     loading: false,
  //   })
  // }
  this.setState({page: this.state.page + 1});
  this.updateNews();
  }
  handlePreviousclick=async()=>{
    console.log("previous");
    // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9ef5d987c32c43f0805ea2b6b4339ffb&page=${this.state.page - 1}&pageSize=${this.props.pagesize}`;
    // this.setState({loading: true});   
    // let data = await fetch(url);
    //   let parsedData =await  data.json();
    //   console.log(data);
      
    // this.setState({
    //   page:this.state.page - 1,
    //   articles : parsedData.articles,
    //   loading: false,
    // })
    this.setState({page: this.state.page - 1});
    this.updateNews();
  }
  fetchMoreData =async () => {
    this.setState({
      page : this.state.page +1
    })
    this.setState({page: this.state.page + 1});
  const url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9ef5d987c32c43f0805ea2b6b4339ffb&page= ${this.state.page}&pageSize=${this.props.pagesize}`;
  this.setState({loading: true});   
  let data = await fetch(url);
  let parsedData =await  data.json();
  console.log(data);
  this.setState({articles : this.state.articles.concat(parsedData.articles),
    totalResults: parsedData.totalResults,
  loading: false})
  };
  render() {
    return (
      <>
        <h1 className="text-center">NewsMonkey - Top {this.props.category} headlines</h1>
        {/* {this.state.loading &&<Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}    
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container"></div>
        <div className="row my-3">
        
        { this.state.articles.map((element)=>{
          return< div className="col-md-4"  key={element.url}>
          <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
          </div>
        })}
        </div>
        </InfiniteScroll>
        {/* <div className="d-flex justify-content-between">
        <button disabled={this.state.page<=1}type="button" className="btn btn-dark" onClick={this.handlePreviousclick}>&larr; Previous</button>
        <button  disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pagesize)}type="button" className="btn btn-dark" onClick={this.handleNextclick}>Next &rarr;</button>
        </div> */}
        </>
      
    )
  }
}
