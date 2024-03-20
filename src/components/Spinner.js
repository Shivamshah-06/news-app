import React, { Component } from 'react'
import Iphone from './Iphone-spinner-2.gif'
export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center my-3'>
        <img src={Iphone} alt="Iphone" />
      </div>
    )
  }
}
