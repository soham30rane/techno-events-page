import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import "./events.css";
import { motion, useAnimation } from "framer-motion";
import EventItem from "./EventItem/eventitem";
import eventsData from "./data";

const Events = () => {
  const data = eventsData
  const moveRightButtonRef = useRef(null);
  const moveLeftButtonRef = useRef(null);

  // You need to create one control for each event that is added to the data 
  // and add that control to the controls Array. Also update the totalEvents variable
  const totalEvents = data.length;
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
    console.log(controlIndex);
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

  const handleMoveRight = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      let [i, j, k, l, m] = getIndexes()
      let a = i === 0 ? totalEvents - 1 : i - 1;

      console.log(`i=${i}`)
      console.log(`j=${j}`)
      console.log(`k=${k}`)
      console.log(`l=${l}`)
      console.log(`m=${m}`)
      console.log(`a=${a}`)

      controls[a].start({
        scale: 0.0,
        x: -150 * window.innerWidth / 1536,
        y: 70 * window.innerHeight / 714,
        opacity: 1,
        transition: { duration: 0 }
      }).then(() => {
        controls[a].start({
          x: 0 * window.innerWidth / 1536,
          scale: 1.2,
          opacity: 1,
          y: 40 * window.innerHeight / 714,
          transition: { duration: 0.5 }
        })
      })
      controls[i].start({
        x: 500 * window.innerWidth / 1536,
        scale: 0.4,
        y: -30 * window.innerHeight / 714
      })
      controls[j].start({
        x: 700 * window.innerWidth / 1536,
        scale: 0.2,
        y: -60 * window.innerHeight / 714
      })
      controls[k].start({
        x: 800 * window.innerWidth / 1536,
        scale: 0.05,
        opacity: 1,
        y: -80 * window.innerHeight / 714
      })
      controls[l].start({
        scale: 0.0,
        x: 900 * window.innerWidth / 1536,
        y: -90 * window.innerHeight / 714,
      })
      controls[m].start({

      })

      console.log(isAnimating)
      setCurrentIndex(a)
      if (controlIndex === 0) {
        setControlIndex(totalEvents - 1)
      } else {
        setControlIndex(controlIndex - 1)
      }
      setTimeout(() => setIsAnimating(false), 1.5);
    }
  }
  const setCurrentEvent = async (value) => {
    let indexof = -1;
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if (element.title === value) {
        indexof = i;
        break;
      }
    }

    const rightMoves = (totalEvents + indexof - currentIndex) % totalEvents;
    const leftMoves = (totalEvents + currentIndex - indexof) % totalEvents;
    console.log('moves required', leftMoves, rightMoves);

    const moveLeftAsync = async () => {
      for (let i = 0; i < leftMoves; i++) {
        if (!isAnimating) {
          moveLeftButtonRef.current.click();
          await new Promise((resolve) => setTimeout(resolve, 1500)); // Adjust timing based on animation duration
        }
      }
    };

    const moveRightAsync = async () => {
      for (let i = 0; i < rightMoves; i++) {
        if (!isAnimating) {
          moveRightButtonRef.current.click();
          await new Promise((resolve) => setTimeout(resolve, 1500)); // Adjust timing based on animation duration
        }
      }
    };
    if (leftMoves < rightMoves) {
      await moveLeftAsync();
    } else {
      await moveRightAsync();
    }
  };



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
  }, [moveRightButtonRef])
  useEffect(() => {
    const handleScroll = (e) => {
      const scrollThreshold = 5;
      clearInterval(autoClickInterval)

      if (e.deltaY < -scrollThreshold || e.deltaY > scrollThreshold) {
        moveRightButtonRef.current.click();
      }
    };

    const handleKeyboardEvents = (e) => {
      clearInterval(autoClickInterval)
      if (e.key === 'ArrowRight') {
        moveRightButtonRef.current.click();
      } else if (e.key === 'ArrowLeft') {
        moveLeftButtonRef.current.click();
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
      ];
      initials.current = initialscopy;
    };

    const autoClickInterval = setInterval(() => {
      if (!isAnimating) {
        moveRightButtonRef.current.click();
      }
    }, 5000); // Click the button every 5 seconds
    window.addEventListener('keydown', handleKeyboardEvents);
    window.addEventListener('resize', handleResize);
    window.addEventListener('wheel', handleScroll);
    window.addEventListener('touchstart', handleTouchStart);

    return () => {
      window.removeEventListener('keydown', handleKeyboardEvents);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('wheel', handleScroll);
      clearInterval(autoClickInterval);
    };
  }, [initials, moveRightButtonRef, handleTouchStart, isAnimating]);


  return (
    <div className="events-container">
      <select
        style={{
          display: "none",
          
        }}
        className="dropdown"
        value={data[currentIndex].title}
        onChange={(e) => setCurrentEvent(e.target.value)}
        onClick={() => {
          document.getElementById("options").style.display = "block";
        }}
      >
        {data.map((element) => (
          <option id={element.id} value={element.title}>
            {element.title}
          </option>
        ))}
      </select>

      <div
        id="options"
        style={{
          display: "flex",
          backgroundColor: "transparent",
          color: "grey",
          border: "none",
          flexDirection: "row", // Align items horizontally
          textShadow:'2px 2px 4px rgba(0, 0, 0, 0.5)',
        }}
      >
        {data.map((element) => (
          <div
            key={element.id}
            onClick={(e) => setCurrentEvent(e.target.innerText)}
            style={{
              padding: "8px",
              cursor: "pointer",
              whiteSpace: "nowrap", // Avoid wrapping of long text
              textShadow: element.title===data[currentIndex].title?'2px 2px 4px rgba(0, 0, 0, 0.5)':'none',
              backgroundColor: element.title===data[currentIndex].title?'rgba(0,0,255,0.5)':'transparent',
            }}
          >
            {element.title}
          </div>
        ))}
      </div>

      <button className="control-btn" style={{ visibility: "hidden" }} onClick={handleMoveRight} ref={moveLeftButtonRef}>Move left</button>
      <button className="control-btn" onClick={handleMoveLeft} ref={moveRightButtonRef} style={{ visibility: "hidden" }}>Move Right</button>
      {/* {data.map((item,index) => (
        console.log(item.id)
      ))} */}
      {data.map((item, index) => (
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
    </div>
  );
};

export default Events;