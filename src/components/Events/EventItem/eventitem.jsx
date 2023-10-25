import "./eventitem.css";


const EventItem = (props) => {
  return (
    <div class="event-popup">
        <div class="popup-header">
          <h2>{props.title}</h2>
        </div>
        <div class="popup-content">
          <img src={require(`../../../img/${props.imgname}`)} alt={props.imgname} />
          <p>{props.brief}</p>
        </div>
        {/* <button >Close</button> */}
      </div>
  );
};
  
export default EventItem;