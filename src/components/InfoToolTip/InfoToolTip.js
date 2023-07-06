import './InfoToolTip.css';

const InfoToolTip = ({ message, isPopupOpen, onPopupClose }) => {
  return (
    <div className={`popup ${isPopupOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button
          className="popup__close-button" 
          type="button" 
          onClick={onPopupClose} 
        />
        <p>{JSON.stringify(message)}</p>
      </div>
    </div>
  );
};

export default InfoToolTip;