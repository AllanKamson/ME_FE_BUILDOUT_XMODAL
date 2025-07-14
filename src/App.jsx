import { useState } from 'react'

import './index.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle opening the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
    setUsername('');
    setEmail('');
    setPhone('');
    setDob('');
    setErrorMessage('');
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); 

    // Reset error message
    setErrorMessage('');

    // --- Validation Checks ---

    // 1. Check if all fields are filled (uses internal error message display)
    if (!username) {
      setErrorMessage('Please fill out the Username field.');
      return;
    }
    if (!email) {
      setErrorMessage('Please fill out the Email Address field.');
      return;
    }
    if (!phone) {
      setErrorMessage('Please fill out the Phone Number field.');
      return;
    }
    if (!dob) {
      setErrorMessage('Please fill out the Date of Birth field.');
      return;
    }

    // 2. Email validation (must contain '@' symbol - uses window.alert())
    if (!email.includes('@')) {
      window.alert('Invalid email. Please check your email address.');
      return;
    }

    // 3. Phone number validation (must be 10 digits - uses window.alert())
    if (!/^\d{10}$/.test(phone)) {
      window.alert('Invalid phone number. Please enter a 10-digit phone number.');
      return;
    }

    // 4. Date of Birth validation (cannot be a future date - uses window.alert())
    const today = new Date();
    const selectedDob = new Date(dob);
    if (selectedDob > today) {
      window.alert('Invalid date of birth. Date of birth cannot be in the future.');
      return;
    }

    // If all validations pass, close the modal
    handleCloseModal();
  };

  return (
    <div className="App">
      <h1 className="main-title">User Details Modal</h1>
      {/* Button to open the modal */}
      <button className="open-form-button" onClick={handleOpenModal}>Open Form</button>

      {/* Conditional rendering of the modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}> {/* Prevent clicks inside modal from closing it */}
            <div className="modal-content">
              <h2>Fill Details</h2>
              {/* Display error message for empty fields */}
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address:</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number:</label>
                  <input
                    type="tel" // Use tel type for phone numbers
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dob">Date of Birth:</label>
                  <input
                    type="date" // Use date type for date input
                    id="dob"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="submit-button">Submit</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;