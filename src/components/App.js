import React, { Component } from 'react';
import { database } from '../firebase'; // mora se importovati da bi pristupili fajlu firebase.js
import _ from 'lodash';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import renderHTML from 'react-render-html';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      posts: {}
    };

    // vezivanje
    this.onHandleChange = this.onHandleChange.bind(this);
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
  // prikazivanje podataka iz firebase
  renderPosts() {
    return _.map(this.state.posts, (post, key) => {
      return (
        <div key={key}>
          <h2>{post.title}</h2>
          <p>{renderHTML(post.body)}</p>
        </div>
      );
    });
  }

  onHandleChange(e) {
    this.setState({ body: e});
    console.log(this.state.body);
    
  }
  onHandleSubmit(e) {
    // Upis u firebase postavljamo podatke koje zelimo da upisemo 
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
              type="text"
               name="title" 
               placeholder="Title"
                onChange={e => {this.setState({ title: e.target.value});
              }} 
                ref="title"
                 className="form-control" />
          </div>
          <div className="form-group">
            <ReactQuill
            modules={App.modules}
            formats={App.modules}
             value={this.state.body} // moramo definisati value da bi mogli brisati string iz imputa             
               placeholder="Body"
                onChange={this.onHandleChange} 
                 />
          </div>
          <button className="btn btn-primary">Post</button>
        </form>
        <br />
        {this.renderPosts()}
      </div>
    );
  }
}

App.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'video'],
    ['clean'],
    ['code-block']
  ]
};

App.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
  'video',
  'code-block'
];



export default App;
