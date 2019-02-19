import React from 'react'
import { Switch } from 'react-router-dom'
import axios from 'axios'
import Header from './Header'
import EventList from './EventList'
import EventForm from './EventForm'
import Event from './Event'

class Editor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      events: null,
    }
  }

  componentDidMount() {
    axios
      .get('/api/events.json')
      .then(response => this.setState({ events: response.data }))
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const { events } = this.state
    if (events === null) return null;

    const { match } = this.props
    const eventId = match.params.id
    const event = events.find(e => e.id === Number(eventId))

    return (
      <div>
        <Header />
        <div className="grid">
          <EventList events={events} activeId={Number(eventId)} />
          <Switch>
            <PropsRoute path='/events/new' component={EventForm} />
            <PropsRoute path='/events/:id' component={Event} event={event} />
          </Switch>
        </div>
      </div>
    )
  }
}

Editor.propTypes = {
  match: propTypes.shape(),
}

Editor.defaultProps = {
  match: undefined,
}

export default Editor;