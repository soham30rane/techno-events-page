import React, { Component } from 'react';
import Accordion from './faq';
const bgImage = require('../../img/deep-space-bg.jpg');

export default class EventInfo extends Component {
    render() {
        const {
            title,
            imgname,
            eventDesc,
            venue,
            date,
            price,
        } = this.props;

        return (
            <div className='eventsinfo' style={{
                width: '100vw',
                height: '100vh',
                fontFamily: 'Helveti ca',
                overflowX: 'hidden'
            }}>
                <img src={bgImage} alt='' style={{
                    width: '100vw',
                    height: '100vh',
                    zIndex: -100,
                    overflow: 'hidden',
                    position: 'fixed',
                    left: 0,
                    top: 0
                }} />
                <div style={{
                    marginTop: '10%',
                    backgroundColor: 'transparent',
                    display: 'flex',
                    width: '100%',
                    height: '70%'
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        color: 'black',
                        textAlign: 'left',
                        width: '40%',
                        marginLeft: '10%',
                        textShadow: '0px 4px 30px #ffffff66'
                    }}>
                        <div style={{
                            fontSize: "40px",
                            fontWeight: '800',
                            width: "100%",
                            height: '20%',
                            color: 'white',
                            lineHeight: '100%',
                            fontFamily: 'Helveti ca'

                        }}>{title}</div>
                        <div style={{
                            fontSize: "20px",
                            fontWeight: '600',
                            width: "100%",
                            height: '77%',
                            color: 'grey',
                            lineHeight: '100%',
                        }}>{eventDesc}</div>

                    </div>
                    <div style={{
                        maxWidth: '31%',
                        marginLeft: '5%',
                        maxHeight: '100%'
                    }}>
                        <img src={require(`../../img/${imgname}`)} alt='' />
                    </div>
                </div>
                <div style={{
                    marginLeft: '10%',
                    width: 'fit-content',
                    background: 'linear-gradient(90deg, rgba(255,255,255,0.3), transparent)',
                    color: 'white',
                    height: '10%',
                    fontWeight: '600',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center', // Adjusted alignment
                    position: 'relative', // Position absolutely inside relative parent
                    bottom: 0, // Positioned at the bottom of the parent div
                    left: 0,
                    right: 0,
                    padding: '0 5%', // Added padding to the parent div,
                    marginBottom: '1%'
                }}>
                    <div style={{
                        width: '10%',
                        textAlign: 'left',
                    }}>
                        Event Brief
                    </div>
                    <img src={require('../../img/clipboard.png')} alt="" style={{
                    maxHeight: '70%'
                    }}/>
                    <div style={{
                        width: '30%',
                    }}>
                        Date: {date}
                    </div>
                        <img src={require('../../img/l.png')} alt="" style={{
                        maxHeight: '70%'
                        }}/>
                    <div style={{
                        width: '30%',
                    }}>
                        Venue:{venue}
                    </div>
                        <img src={require('../../img/dollar.png')} alt="" style={{
                        maxHeight: '70%'
                        }}/>
                    <div style={{
                        width: '30%',
                    }}>
                        Prize: {price}
                    </div>
                </div>

                <div style={{
                    backgroundColor: 'black',
                }}>
                    <Accordion />
                </div>
            </div>
        );
    }
}
