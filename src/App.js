import React, { Component } from 'react';
import './App.css';

const ipfsClient = require('ipfs-http-client')

// create a stream from a file, which enables uploads of big files without allocating memory twice
const fileReaderPullStream = require('pull-file-reader')


class App extends Component {
  constructor () {
    super()
    this.state = {
      added_file_hash: null,
      selectedFile: null,
      fileList: []
    }
    this.ipfs = ipfsClient({
      mode: 'no-cors',
      host: 'localhost',
      port: '5001', 
      
    })
    // bind methods
    this.captureFile = this.captureFile.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.saveToIpfsWithFilename = this.saveToIpfsWithFilename.bind(this)
  }

  captureFile (event){
    this.setState({fileList: []});
    if (event.target.files.length > 4 ) {
      alert("You may only select up to 4 photos.");
    }
    for (var i = 0; i < event.target.files.length; i++) {
      this.state.fileList.push(event.target.files[i]);
    
    var file = this.state.fileList[i]
    var fileStream = new fileReaderPullStream(file);
    var fileDetails = {
      path: file.name,
      content: fileStream
    }
    this.saveToIpfsWithFilename(fileDetails)
  }}

  saveToIpfsWithFilename (file) {
    let ipfsId
    const options = {
      wrapWithDirectory: false,
      progress: (prog) => console.log(`received: ${prog}`)
    }
    this.ipfs.add(file, options)
      .then((response) => {
        console.log(response)
        // CID of wrapping directory is returned last
        ipfsId = response[response.length - 1].hash
        console.log(ipfsId)
        this.setState({added_file_hash: ipfsId})
      }).catch((err) => {
        console.error(err)
      })
  }

  handleSubmit (event) {
    event.preventDefault()
  }

  render () {
    return (
      <div>
        <form id='captureMedia' onSubmit={this.handleSubmit}>
          <div>
            <input type="text" placeholder="Item Name" id="ItemName" name="name" required
              minLength="4" maxLength="32" style={{width: "50%"}}></input>
          </div>

        </form>            
        <div><br></br>
          <textarea placeholder="Item Description" id="ItemDescription" name="description" required maxLength="256" style={{width: "50%", resize: "none"}} rows="5" form="captureMedia"></textarea>
        </div>          
        <div>
            <input type="text" placeholder="Enter a price" id="ItemPrice" name="price" required
              minLength="4" maxLength="10" style={{width: "50%"}} form="captureMedia"></input>  
        </div>
        <hr style={{width: "50%"}} align="left"></hr>      
        <div>
          <b>Add a photo</b><p>
            <label htmlFor="selector">
            <img src="paperclip.png" alt=""/>
            </label><input id="selector" type='file' multiple accept="image/*" onChange={(event)=> { 
               this.captureFile(event)}} style={{display: 'none'}} form="captureMedia"/><br/>
               </p>
        </div>

        <div>
          <a target='_blank' rel="noopener noreferrer"
            href={'http://localhost:8080/ipfs/' + this.state.added_file_hash}>
            {this.state.added_file_hash}
          </a>
          <br/>

        </div>
      </div>
    )
  }
}

export default App;
