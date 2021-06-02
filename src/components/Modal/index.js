import {useEffect} from 'react'
import ReactDOM from 'react-dom'
import './styles.scss'
const modalContainer = document.getElementById('modal')
const modalEl = document.createElement('div')


const Modal = ({children, onClose, title}) => {

  useEffect(() => {
    modalContainer.appendChild(modalEl)

    return () => {
      modalContainer.removeChild(modalEl)
    }
  }, [])

  const content = <div className='modal__container'>
    <div className='modal__content'>
      <div className="modal__title">
        <h3>{title}</h3>
        <span className="modal__icon_close" onClick={onClose}>X</span>
      </div>
      {children}
    </div>
  </div>

  return ReactDOM.createPortal(
    content,
    modalEl
  )
}


export default Modal