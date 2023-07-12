import './InfoToolTip.css';

const InfoToolTip = 
({ 
  isPopupOpen, 
  infoMessage, 
  onPopupClose 
}) => {
  return (
    <div className={`popup ${isPopupOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button
          className="popup__close-button" 
          type="button"
          aria-label="Закрыть окно попапа"
          onClick={onPopupClose} 
        />
        <p>{infoMessage}</p>
      </div>
    </div>
  );
};

export default InfoToolTip;