import "./eventitem.css";

const EventItem = () => {
  return (
    <div class="event-popup">
        <div class="popup-header">
          <h2>Robowars</h2>
        </div>
        <div class="popup-content">
          <img src={require('../../../img/robowars.png')} alt="robowars" />
          <p>Brace yourself, for the warrior within is set to align with the brute outside. For the flames of war...</p>
        </div>
        {/* <button >Close</button> */}
      </div>
  );
};
  
export default EventItem;