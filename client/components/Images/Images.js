import {inject, observer} from 'mobx-react'
import React from 'react'
import AppStore from 'stores/AppStore'

@inject('store')
@observer
export default class Images extends React.Component {
  props: {
    store: AppStore;
  }

  constructor(props) {
    super(props)

    this.appStore = props.store
    this.imagesStore = this.appStore.images
  }

  componentDidMount() {
    this.loadImages()
  }

  destroyImage = id => {
    if (confirm(`Are you sure you want to delete image ${id}`)) {
      this.imagesStore.destroyImage(id)
    }
  }

  inspectImage = (e, id) => {
    e.preventDefault()

    this.imagesStore.inspectImage(id)
  }

  loadImages = () => {
    this.imagesStore.loadImages()
  }

  pruneImages = () => {
    if (confirm('Are you sure you want to delete unused images?')) {
      this.imagesStore.pruneImages()
    }
  }

  render() {
    return (
      <div className="Images">
        <div className="master-detail">
          <div className="master">
            <h1>IMAGES</h1>
            {this.imagesStore.error && <div className='error'>{this.imagesStore.error}</div>}
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
              {this.imagesStore.images.map((image, i) => (
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
          {this.imagesStore.inspect && <div className="detail">
            <pre>{JSON.stringify(this.imagesStore.inspect, undefined, 2)}</pre>
          </div>}
        </div>
      </div>
    )
  }
}
