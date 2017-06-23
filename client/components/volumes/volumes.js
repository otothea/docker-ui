import React from 'react'
import axios from 'axios'

const COLUMNS = ['Driver', 'Volume Name']

export default class Volumes extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      volumes: [],
    }
  }

  componentDidMount() {
    this.loadVolumes()
  }

  loadVolumes = () => {
    axios.get('/api/v1/volumes').then(res => {
      this.setState({
        volumes: res.data.map(volume => [
          volume.Driver,
          volume.Name,
        ]),
      })
    })
  }

  render() {
    return (
      <div className="Volumes">
        <h1>VOLUMES</h1>
        <table>
          <thead>
          <tr>
            {COLUMNS.map((column, i) => <th key={i}>{column}</th>)}
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {this.state.volumes.map((item, i) => (
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
