var React = require('React');
//var mui = require('material-ui');
var $ = require('jQuery');
var moment = require('moment');

var PageHeader = React.createClass({
  render: function() {
    return (
      <header className="intro-header">
          <div className="container">
              <div className="row">
                  <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                      <div className="site-heading">
                          <h1>Clean Blog</h1>
                          <hr className="small"/>
                          <span className="subheading">A Clean Blog Theme by Start Bootstrap</span>
                      </div>
                  </div>
              </div>
          </div>
      </header>
    );
  }
});


var Post = React.createClass({
  render: function() {
    console.log(this.props.post);
    //<h3 className="post-preview" dangerouslySetInnerHTML={{__html: this.props.post.content}}></h3>
    return (
      <div>
        <div className="post-preview">
          <a>
            <h2 className="post-title"> {this.props.post.title } </h2>
          </a>
          <p className="post-meta">
            Posted by 
            <a href="#"> Wei-Ting kuo </a> 
            on {moment(this.props.post.date).format('MMMM Do YYYY')}
          </p>
        </div>
        <hr />
      </div>
    );
  },
});

var Posts = React.createClass({
  render: function() {
    rows = [];
    for (var i in this.props.posts) {
      rows.push(<Post post={this.props.posts[i]}/>);
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
            <div> {rows} </div>
          </div>
        </div>
      </div>
    );
  }
});

var App = React.createClass({

  getInitialState: function() {
    return {
      page: 1,
      posts: [],
      fetching: false,
    }
  },

  checkWindowScroll: function(){

    var h = window.innerHeight || 0;
    var s = document.body.scrollTop;
    if (h+s == document.body.offsetHeight) {
      this.fetch()
    } 
  },

  componentDidMount: function() {

    window.addEventListener('scroll', this.checkWindowScroll);

  },

  fetch: function() {
    
    if (this.state.fetching) return;
    this.setState({fetching: true});
    this.setState({page: this.state.page + 1});
    res = $.ajax({
      url: '/posts?page=' + this.state.page,
      dataType: 'json',
      async: false,
    });
    this.setState({posts: this.state.posts.concat( res.responseJSON )});
    this.setState({fetching: false});
  },
  
  render: function() {
    return (
      <div>
        <PageHeader /> 
        <Posts posts={this.state.posts}/>
      </div>
    );
  }
});

React.render(
  <App />,
  document.getElementById('app')
);


