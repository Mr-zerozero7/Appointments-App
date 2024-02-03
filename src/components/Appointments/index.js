// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'
import './index.css'

const initialList = []

class Appointments extends Component {
  state = {appointmentList: initialList, title: '', date: '', isStarred: false}

  onDateFormat = event => {
    this.setState({
      date: event.target.value,
    })
  }

  onTitleText = event => {
    const {value} = event.target
    this.setState({title: value})
  }

  favoriteStatusFun = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isFavorite: !eachItem.isFavorite}
        }
        return eachItem
      }),
    }))
  }

  onStarredItems = () => {
    this.setState(prevState => ({
      isStarred: !prevState.isStarred,
    }))
  }

  addAppointment = event => {
    const {title, date} = this.state
    event.preventDefault()
    const formatedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      title,
      date: formatedDate,
      isFavorite: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  render() {
    const {appointmentList, title, date, isStarred} = this.state
    const filteredItems = appointmentList.filter(
      eachItem => eachItem.isFavorite === true,
    )
    const filteredDetails = isStarred ? filteredItems : appointmentList
    const starredClassName = isStarred ? 'activeStarred' : 'unActiveStarred'

    return (
      <div className="bg-container">
        <div className="content-box">
          <div className="top-section">
            <div className="from-container">
              <h1 className="main-heading">Add Appointment</h1>
              <form className="form" onSubmit={this.addAppointment}>
                <label htmlFor="inputText" className="label">
                  TITLE
                </label>
                <br />
                <input
                  id="inputText"
                  className="input"
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={this.onTitleText}
                />
                <br />

                <label htmlFor="dateInput" className="label">
                  DATE
                </label>
                <br />
                <input
                  id="dateInput"
                  className="input"
                  type="date"
                  value={date}
                  placeholder="dd/mm/yy"
                  onChange={this.onDateFormat}
                />
                <br />
                <button className="add-button" type="submit">
                  Add
                </button>
              </form>
            </div>
            <img
              className="appointment-image"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr />
          <div className="bottom-section">
            <div className="item-heading-tabs">
              <h1 className="item-heading">Appointments</h1>
              <button
                className={starredClassName}
                type="submit"
                onClick={this.onStarredItems}
              >
                Starred
              </button>
            </div>
            <ul className="appointment-items-container">
              {filteredDetails.map(eachItem => (
                <AppointmentItem
                  listDetails={eachItem}
                  favoriteStatus={this.favoriteStatusFun}
                  key={eachItem.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
