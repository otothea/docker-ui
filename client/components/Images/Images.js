import React from 'react'
import axios from 'axios'
import moment from 'moment'
import {sortBy} from 'lodash'

const sizeOf = bytes => {
  if (Number(bytes) === 0) { return '0.00 B' }
  const e = Math.floor(Math.log(bytes) / Math.log(1024))
  return (bytes/Math.pow(1024, e)).toFixed(2)+' '+' KMGTP'.charAt(e)+'B'
}

export default class Images extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      images: [],
      inspect: null,
    }
  }

  componentDidMount() {
    this.loadImages()
  }

  destroyImage = id => {
    if (confirm(`Are you sure you want to delete image ${id}`)) {
      axios.delete(`/api/v1/images/${id}`).then(() => {
        this.loadImages()
      })
    }
  }

  inspectImage = (e, id) => {
    e.preventDefault()

    axios.get(`/api/v1/images/${id}`).then(res => {
      this.setState({
        inspect: res.data,
      })
    })
  }

  loadImages = () => {
    axios.get('/api/v1/images').then(res => {
      this.setState({
        images: sortBy(res.data, image => -image.Created).map(image => ({
          repository: image.RepoTags ? image.RepoTags[0].split(':')[0] : image.RepoDigests ? image.RepoDigests[0].split('@')[0] : '<none>',
          tag: image.RepoTags ? image.RepoTags[0].split(':')[1] : '<none>',
          image: image.Id.split(':')[1].substr(0, 12),
          created: moment.unix(image.Created).fromNow(),
          size: sizeOf(image.Size),
        })),
      })
    })
  }

  pruneImages = () => {
    if (confirm('Are you sure you want to delete unused images?')) {
      axios.post('/api/v1/images/prune').then(() => {
        this.loadImages()
      })
    }
  }

  render() {
    return (
      <div className="Images">
        <h1>IMAGES</h1>
        <div className="master-detail">
          <div className="master">
            <table>
              <thead>
              <tr>
                <th>Repository</th>
                <th>Tag</th>
                <th>Image ID</th>
                <th>Created</th>
                <th>Size</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {this.state.images.map((image, i) => (
                <tr key={i}>
                  <td title={image.repository}>{image.repository}</td>
                  <td title={image.tag}>{image.tag}</td>
                  <td title={image.image}><a href="#" onClick={e => this.inspectImage(e, image.image)}>{image.image}</a></td>
                  <td title={image.created}>{image.created}</td>
                  <td title={image.size}>{image.size}</td>
                  <td>
                    <button onClick={() => this.destroyImage(image.image)}>Delete</button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
            <button onClick={() => this.pruneImages()}>Delete all unused images</button>
          </div>
          {this.state.inspect && <div className="detail">
            <pre>{JSON.stringify(this.state.inspect, undefined, 2)}</pre>
          </div>}
        </div>
      </div>
    )
  }
}
