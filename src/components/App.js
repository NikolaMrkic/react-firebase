import React, { Component } from 'react';
import { database } from '../firebase'; // mora se importovati da bi pristupili fajlu firebase.js
import _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      posts: {}
    };

    //vezivanje
    this.onInputChange = this.onInputChange.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
  }

  // lifecycle
  componentDidMount() {
    database.on('value', snapshot => {
      this.setState({
        posts: snapshot.val()
      });
    });
  }
  //prikazivanje podataka iz firebase
  renderPosts() {
    return _.map(this.state.posts, (post, key) => {
      return (
        <div key={key}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      );
    });
  }

  onInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onHandleSubmit(e) {
    //Upis u firebase postavljamo podatke koje zelimo da upisemo 
    e.preventDefault();
    const post = {
      title: this.state.title,
      body: this.state.body
    };
    database.push(post);
    this.setState({  //brisanje vrednosti iz imputa nakon unosa
      title: '',
      body: ''

    });
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onHandleSubmit} >{/* form onSubmit = this. pa nnasa xxmetodaaz!!!*/}
          <div className="form-group">
            <input value={this.state.title} // moramo definisati value da bi mogli brisati string iz imputa
              type="text" name="title" placeholder="Title" onChange={this.onInputChange} ref="title" className="form-control" />
          </div>
          <div className="form-group">
            <input value={this.state.body} // moramo definisati value da bi mogli brisati string iz imputa 
              type="text" name="body" placeholder="Body" onChange={this.onInputChange} ref="body" className="form-control" />
          </div>
          <button className="btn btn-primary">Post</button>
        </form>
        <br />
        {this.renderPosts()}
      </div>
    );
  }
}




export default App;
