import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import "./events.css";
import { motion, useAnimation } from "framer-motion";
import EventItem from "./EventItem/eventitem";
import eventsData from "./data";

const Events = () => {
  const data = eventsData
  const moveRightButtonRef = useRef(null);

  // You need to create one control for each event that is added to the data 
  // and add that control to the controls Array. Also update the totalEvents variable
  const totalEvents = 7
  const control1 = useAnimation()
  const control2 = useAnimation()
  const control3 = useAnimation()
  const control4 = useAnimation()
  const control5 = useAnimation()
  const control6 = useAnimation()
  const control7 = useAnimation()


  const controls = [control1, control2, control3, control4, control5, control6, control7]
  const [controlIndex, setControlIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const getIndexes = () => {
    let newControlIndex = controlIndex % totalEvents
    let diff = controls.length - newControlIndex
    console.log(diff)
    switch (diff) {
      case 1:
        return [newControlIndex, 0, 1, 2, 3]
      case 2:
        return [newControlIndex, newControlIndex + 1, 0, 1, 2]
      case 3:
        return [newControlIndex, newControlIndex + 1, newControlIndex + 2, 0, 1]
      case 4:
        return [newControlIndex, newControlIndex + 1, newControlIndex + 2, newControlIndex + 3, 0]
      default:
        return [newControlIndex, newControlIndex + 1, newControlIndex + 2, newControlIndex + 3, newControlIndex + 4]
    }
  }

  const handleMoveLeft = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      let [i, j, k, l, m] = getIndexes()

      console.log(`i=${i}`)
      console.log(`j=${j}`)
      console.log(`k=${k}`)
      console.log(`l=${l}`)
      console.log(`m=${m}`)

      controls[i].start({
        x: -150 * window.innerWidth / 1536,
        scale: 1.2,
        opacity: 0,
        y: 70 * window.innerHeight / 714,
        transition: { duration: 0.5 }
      }).then(() => {
        controls[i].start({
          scale: 0.0,
          x: 900 * window.innerWidth / 1536,
          y: -90 * window.innerHeight / 714,
          transition: { duration: 0 }
        })
      })
      controls[j].start({
        x: 0,
        scale: 1,
        y: 40 * window.innerHeight / 714
      })
      controls[k].start({
        x: 500 * window.innerWidth / 1536,
        scale: 0.4,
        y: -30 * window.innerHeight / 714
      })
      controls[l].start({
        x: 700 * window.innerWidth / 1536,
        scale: 0.2,
        y: -60 * window.innerHeight / 714
      })
      controls[m].start({
        x: 800 * window.innerWidth / 1536,
        scale: 0.05,
        opacity: 1,
        y: -80 * window.innerHeight / 714
      })

      console.log(isAnimating)
      setCurrentIndex(j)
      setControlIndex(controlIndex + 1)
      setTimeout(() => setIsAnimating(false), 1.5);
    }
  }

  const initials = useMemo(() => [
    {
      scale: 1,
      x: 0,
      y: 40 * window.innerHeight / 714
    },
    {
      scale: 0.4,
      x: 400 * window.innerWidth / 1536,
      y: -16 * window.innerHeight / 714
    },
    {
      scale: 0.2,
      x: 700 * window.innerWidth / 1536,
      y: -60 * window.innerHeight / 714
    },
    {
      scale: 0.05,
      x: 800 * window.innerWidth / 1536,
      y: -80 * window.innerHeight / 714
    },
    {
      scale: 0.0,
      x: 900 * window.innerWidth / 1536,
      y: -90 * window.innerHeight / 714
    }
  ], [])
  const handleTouchStart = useCallback((e) => {
    // Store the initial touch position
    const touchStartX = e.touches[0].clientX;

    const handleTouchMove = (e) => {
      // Calculate the horizontal distance traveled
      const touchEndX = e.touches[0].clientX;
      const deltaX = touchEndX - touchStartX;

      // Set a threshold for swipe gesture (adjust as needed)
      const swipeThreshold = 5;

      if (deltaX < -swipeThreshold || deltaX > swipeThreshold) {
        moveRightButtonRef.current.click();
      }

      // Clean up the touchmove event listener
      window.removeEventListener("touchmove", handleTouchMove);
    };
    window.addEventListener("touchmove", handleTouchMove);
  },[moveRightButtonRef])
  useEffect(() => {
    const handleScroll = (e) => {
      // Set the scroll threshold as needed, for example, 100 pixels
      const scrollThreshold = 5;

      if (e.deltaY < -scrollThreshold || e.deltaY > scrollThreshold) {
        moveRightButtonRef.current.click();
      }
    };
    const handleKeyboardEvents = (e) => {
      if (e.key === 'ArrowRight') {
        console.log(`Right key down`)
        moveRightButtonRef.current.click()
      } else if (e.key === 'ArrowLeft') {
        // Handle right arrow key press
        // Call startAnimation(i) with the appropriate index
      }
    };
    const handleResize = () => {
      const initialscopy = [
        {
          scale: 1,
          x: 0,
          y: 40 * window.innerHeight / 714
        },
        {
          scale: 0.4,
          x: 500 * window.innerWidth / 1536,
          y: -30 * window.innerHeight / 714
        },
        {
          scale: 0.2,
          x: 700 * window.innerWidth / 1536,
          y: -60 * window.innerHeight / 714
        },
        {
          scale: 0.05,
          x: 800 * window.innerWidth / 1536,
          y: -80 * window.innerHeight / 714
        },
        {
          scale: 0.0,
          x: 900 * window.innerWidth / 1536,
          y: -90 * window.innerHeight / 714
        }
      ]
      initials.current = initialscopy
    }
    // Attach the event listeners when the component mounts
    window.addEventListener('keydown', handleKeyboardEvents);
    window.addEventListener('resize', handleResize);
    window.addEventListener('wheel', handleScroll)
    window.addEventListener("touchstart", handleTouchStart);
    
    // Clean up the event listeners when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyboardEvents);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, [initials, moveRightButtonRef, handleTouchStart]);

  return (<>
    {/* <img alt='background' src={bgImage} style={{
      width: window.innerWidth,
      height: window.innerHeight,
      zIndex: -5,
      position: 'fixed',
      top: 0,
      left: 0
    }}/> */}
    <div className="events-container">
      <button className="control-btn" style={{ visibility: "hidden" }} >Move left</button>
      <button className="control-btn" onClick={handleMoveLeft} ref={moveRightButtonRef} style={{ visibility: "hidden" }}>Move Right</button>
      {/* {data.map((item,index) => (
        console.log(item.id)
      ))} */}
      {data.map((item,index) => (
        <motion.div
          animate={controls[item.id]}
          initial={(item.id < 5 ? initials[item.id] : initials[4])}
          transition={{ duration: 1 }}
          className="planet"
          // style={{
          //   width: item.id===controlIndex?'28%':'20%',
          // }}
        >
          <img src={currentIndex === item.id ? require(`../../img/${data[item.id].imgname}`) : require(`../../img/planet${item.id % 5}.png`)}
            alt={item.title} />
        </motion.div>
      ))}

      {/* <div className="spaceship">
        <img src={require("../../img/spaceship-small-transperent.png")} alt="" />
      </div> */}
      <EventItem title={data[currentIndex].title} imgname={data[currentIndex].imgname} brief={data[currentIndex].brief} />
    </div></>
  );
};

export default Events;