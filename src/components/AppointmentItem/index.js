// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {listDetails, favoriteStatus} = props
  const {title, date, isFavorite, id} = listDetails

  const onStarClick = () => {
    favoriteStatus(id)
  }

  return (
    <li className="item-container">
      <div className="item-tag-container">
        <p className="title-name">{title}</p>
        <button
          className="star-button"
          data-testid="star"
          onClick={onStarClick}
          type="button"
        >
          {isFavorite ? (
            <img
              className="selected-star"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
              alt="star"
            />
          ) : (
            <img
              className="unselect-star"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png"
              alt="star"
            />
          )}
        </button>
      </div>
      <p className="date-tag">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
