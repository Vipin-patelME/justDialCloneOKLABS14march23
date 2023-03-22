import React from 'react'
import BusinessDetail from './BusinessDetail'

function Businesses() {
    const array = [1,2,3,4,5,6,7,8,9,10,11,21,13,14,15,12,16,18,17,18,]


  return (
        <>
            {
                array.map(eachItem =><BusinessDetail />)
            }
        </>
    )
}

export default Businesses