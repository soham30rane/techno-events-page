import React, { useState } from 'react';
import './faq.css'; // Make sure to have your CSS in a file named 'styles.css'

const Accordion = () => {
  const [activeItem, setActiveItem] = useState(null);

  const toggleAccordion = (index) => {
    setActiveItem(activeItem === index ? null : index);
  };

  const faqData = [
    {
      title: 'Can i participate in more than one competition',
      content:
        'Yes you can participate in multiple competiitons',
    }
  ];

  return (
    <div className="container">
      <h2>FAQs</h2>
      <div className="accordion">
        {faqData.map((item, index) => (
          <div className="accordion-item" key={index}>
            <button
              onClick={() => toggleAccordion(index)}
              aria-expanded={activeItem === index ? 'true' : 'false'}
            >
              <span className="accordion-title">{item.title}</span>
              <span className="icon" aria-hidden="true"></span>
            </button>
            <div
              className="accordion-content"
              style={{
                opacity: activeItem === index ? 1 : 0,
                maxHeight: activeItem === index ? '9em' : 0,
                transition: 'all 200ms linear',
                overflow: 'hidden',
              }}
            >
              <p>{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
