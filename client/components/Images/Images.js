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

  render() {
    const {error, images, inspect} = this.imagesStore

    return (
      <div className="Images">
        <div className="master-detail">
          <div className="master">
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <div className="table-responsive">
              <table className="table">
                <thead>
                <tr>
                  <th>Repository</th>
                  <th>Tag</th>
                  <th>Image ID</th>
                  <th>Created</th>
                  <th>Size</th>
                  <th />
                </tr>
                </thead>
                <tbody>
                {images.map((image, i) => (
                  <tr key={i}>
                    <td title={image.repository}>{image.repository}</td>
                    <td title={image.tag}>{image.tag}</td>
                    <td title={image.image}><a href="#" onClick={e => this.inspectImage(e, image.image)}>{image.image}</a></td>
                    <td title={image.created}>{image.created}</td>
                    <td title={image.size}>{image.size}</td>
                    <td>
                      <div className="dropdown pull-right">
                        <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                          <span className="glyphicon glyphicon-cog" />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-right">
                          <li><a href="#" onClick={() => this.destroyImage(image.image)}>Delete</a></li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
          {inspect && <div className="detail">
            <pre><code>{JSON.stringify(inspect, undefined, 2)}</code></pre>
          </div>}
        </div>
      </div>
    )
  }
}
