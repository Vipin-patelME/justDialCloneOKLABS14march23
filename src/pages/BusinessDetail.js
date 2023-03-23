import React from 'react'
//import { useLocation, useMatch, useParams } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'

function BusinessDetail() {
    // const id = useParams()
    // const location = useLocation()
    // const history = useMatch('/register/bussiness')
    //console.log(history)
    // console.log(location)
    // console.log(id)
    return (
        <Container fluid>
            <Row className='card-cont shadow'>
                <Col lg={4}>
                    <img className='image-style' src='https://images.jdmagicbox.com/comp/mumbai/f3/022pxx22.xx22.210804130508.y9f3/catalogue/a-r-residency-mira-road-thane-lodging-services-yzl8l9kkhj.jpg?temp=1' alt='hotel' />
                </Col>
                <Col lg={7}>
                    <div className='ms-4 mt-5'>
                        <h2>Hotel AR Residency</h2>
                        <div className='rating-cont'>
                            <p className='btn btn-success' type='button'>2.3</p>
                            <img className='start-img' src='https://cdn.pixabay.com/photo/2012/04/01/19/28/rating-24185__340.png' alt='start'/>
                            <p>256 rating</p>
                        </div>
                        <p>Railway road neemuch</p>
                        <button type='button'>Members Only</button>
                        <div className='message-box mt-3'>
                            <img className='msg-img' src='https://www.pngkey.com/png/detail/51-512118_message-icon-message-icon-png-black.png' alt='msg'/>
                            <p>I like this hotel too much because of staff behaviour, Staf members were well mentained and working efficiently</p>
                        </div>
                        <button className='btn btn-success me-3' type='button'>Call now</button>
                        <button className='btn btn-secondary' type='button'>Get best deal</button>
                    </div>
                </Col>
                <Col lg={1}>
                    <img className='msg-img' src='https://w7.pngwing.com/pngs/615/837/png-transparent-heart-symbol-love-symbol-love-text-heart.png' alt='love'/>
                </Col>
            </Row>
        </Container>
    )
}

export default BusinessDetail