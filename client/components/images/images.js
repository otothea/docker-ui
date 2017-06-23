import React from 'react'
import axios from 'axios'
import moment from 'moment'

const COLUMNS = ['Repository', 'Tag', 'Image ID', 'Created', 'Size']

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
    }
  }

  componentDidMount() {
    this.loadImages()
  }

  loadImages = () => {
    axios.get('/api/v1/images').then(res => {
      this.setState({
        images: res.data.map(image => [
          image.RepoTags ? image.RepoTags[0].split(':')[0] : image.RepoDigests[0].split('@')[0],
          image.RepoTags ? image.RepoTags[0].split(':')[1] : '<none>',
          image.Id.split(':')[1].substr(0, 12),
          moment.unix(image.Created).fromNow(),
          sizeOf(image.Size),
        ]),
      })
    })
  }

  render() {
    return (
      <div className="Images">
        <h1>IMAGES</h1>
        <table>
          <thead>
          <tr>
            {COLUMNS.map((column, i) => <th key={i}>{column}</th>)}
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {this.state.images.map((item, i) => (
            <tr key={i}>
              {item.map((value, k) => (
                <td key={k} title={value}>{value}</td>
              ))}
              <td />
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    )
  }
}
