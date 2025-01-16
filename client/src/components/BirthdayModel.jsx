import React from "react";
import { FaBirthdayCake, FaGift } from "react-icons/fa";

function BirthdayModal({ birthdayMessage, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Birthdays Today <FaGift /></h3>
        <p>{birthdayMessage}</p>
        <p>Happy Birthday <FaBirthdayCake /></p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default BirthdayModal;
