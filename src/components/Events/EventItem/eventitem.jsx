import "./eventitem.css";

const EventItem = (props) => {
  return (<>
    <div className="event-popup">
      <div className="popup-header">
        <h2>{props.title}</h2>
      </div>
      <div className="popup-content">
        <p>{props.brief}</p>
      </div>
      {/* <button >Close</button> */}
    </div>
  </>
  );
};

export default EventItem;