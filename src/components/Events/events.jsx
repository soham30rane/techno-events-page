import { useRef, useState , useEffect } from "react";
import "./events.css";
import { motion,useAnimation } from "framer-motion";
import EventItem from "./EventItem/eventitem";
import eventsData from "./data";

const Events = () => {
  const data = eventsData
  const moveLeftButtonRef = useRef(null);

  const control1 = useAnimation()
  const control2 = useAnimation()
  const control3 = useAnimation()
  const control4 = useAnimation()
  const control5 = useAnimation()

  const controls = [control1,control2,control3,control4,control5]
  const [controlIndex,setControlIndex] = useState(0)
  const [isAnimating,setIsAnimating]   = useState(false)
  const [currentIndex,setCurrentIndex] = useState(0)

  const getIndexes = () => {
    let newControlIndex = controlIndex % 5
    let diff = controls.length - newControlIndex
    console.log(diff)
    switch(diff){
      case 1:
        return [newControlIndex,0,1,2,3]
      case 2:
        return [newControlIndex,newControlIndex+1,0,1,2]
      case 3:
        return [newControlIndex,newControlIndex+1,newControlIndex+2,0,1]
      case 4:
        return [newControlIndex,newControlIndex+1,newControlIndex+2,newControlIndex+3,0]
      default:
        return [newControlIndex,newControlIndex+1,newControlIndex+2,newControlIndex+3,newControlIndex+4]
    }
  }
  
  const handleMoveLeft = ()=>{
    if (!isAnimating){
      setIsAnimating(true)
      let [i,j,k,l,m] = getIndexes()

      console.log(`i=${i}`)
      console.log(`j=${j}`)
      console.log(`k=${k}`)
      console.log(`l=${l}`)
      console.log(`m=${m}`)

      controls[i].start({
        x:-150,
        scale:1.2,
        opacity:0,
        y:70,
        transition:{ duration : 0.5 }
      }).then(()=>{
        controls[i].start({
          scale:0.0,
          x:900,
          y:-90,
          transition:{ duration : 0 }
        })
      })
      controls[j].start({
        x:0,
        scale:1,
        y:40
      })
      controls[k].start({
        x:500,
        scale:0.4,
        y:-30
      })
      controls[l].start({
        x:700,  
        scale:0.2,
        y:-60
      })
      controls[m].start({
        x:800,
        scale:0.05,
        opacity:1,
        y:-80
      })

      console.log(isAnimating)
      setCurrentIndex(j)
      setControlIndex(controlIndex + 1)
      setTimeout(() => setIsAnimating(false), 1.5);
  }
  }

  useEffect(() => {
    const handleKeyboardEvents = (e) => {
      if (e.key === 'ArrowRight') {
        console.log(`Right key down`)
        moveLeftButtonRef.current.click()
      } else if (e.key === 'ArrowLeft') {
        // Handle right arrow key press
        // Call startAnimation(i) with the appropriate index
      }
    };

    // Attach the event listeners when the component mounts
    window.addEventListener('keydown', handleKeyboardEvents);

    // Clean up the event listeners when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyboardEvents);
    };
  }, []);

  return (
    <div className="events-container">

      <button className="control-btn" onClick={handleMoveLeft} ref={moveLeftButtonRef}>Move left</button>
      <button className="control-btn" >Move Right</button>

      <motion.div 
        animate={controls[0]}
        initial={{
          scale:1,
          x:0,
          y:40
        }}
        transition={{
          duration:1
        }}
      className="planet front" >
        <img src={(currentIndex===0 ?require(`../../img/${data[0].imgname}`) :require('../../img/planet2.png'))} alt="" />
      </motion.div>

      <motion.div 
        animate={controls[1]}
        initial={{
          scale:0.4,
          x:500,
          y:-30
        }}
        transition={{
          duration:1
        }}
      className="planet" >
        <img src={(currentIndex===1 ?require(`../../img/${data[1].imgname}`) :require('../../img/planet3.png'))} alt="" />
      </motion.div>

      <motion.div 
        animate={controls[2]}
        initial={{
          scale:0.2,
          x:700,
          y:-60
        }}
        transition={{
          duration:1
        }}
      className="planet" >
        <img src={(currentIndex===2 ?require(`../../img/${data[2].imgname}`) :require('../../img/planet4.png'))} alt="" />
      </motion.div>

      <motion.div 
        animate={controls[3]}
        initial={{
          scale:0.05,
          x:800,
          y:-80
        }}
        transition={{
          duration:1
        }}
      className="planet" >
        <img src={(currentIndex===3 ?require(`../../img/${data[3].imgname}`) :require('../../img/planet5.png'))} alt="" />
      </motion.div>

      <motion.div 
        animate={controls[4]}
        initial={{
          scale:0.0,
          x:900,
          y:-90
        }}
        transition={{
          duration:1
        }}
      className="planet">
        <img src={(currentIndex===4 ?require(`../../img/${data[4].imgname}`) :require('../../img/planet6.png'))} alt="" />
      </motion.div>
      <div className="spaceship">
        <img src={require("../../img/spaceship-small-transperent.png")} alt="" />
      </div>
      <EventItem title={data[currentIndex].title} imgname={data[currentIndex].imgname} brief={data[currentIndex].brief}/>
    </div>
  );
};
  
export default Events;