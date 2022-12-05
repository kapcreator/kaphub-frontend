import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { hideModal } from '../../actions/modal'

import "./Modal.css"

const Modal = () => {
  const dispatch = useDispatch()

  const { isShow, textContent, onConfirm } = useSelector((state) => state.modal)

  const confirmAndHide = () => {
    onConfirm()
    dispatch(hideModal())
  }

  return (
    <div className='modal' style={{visibility: isShow ? "visible" : "hidden"}}>
      <div className='modal-overlay'></div>
      <div className='modal-box'>
        <div className='modal-box__text'>{textContent}</div>

        <div className='modal-box__btns'>
          <button onClick={confirmAndHide} className='btn'>Confirm</button>
          <button onClick={()=>dispatch(hideModal())} className='btn'>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default Modal