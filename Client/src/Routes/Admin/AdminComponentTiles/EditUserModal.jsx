import { useState } from "react";
export default function EditUserModal({ user, onClose, onSave }) {
  const [inputs, setInputs] = useState(user); // Initialize form with user data
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(inputs); // Pass edited inputs back to save changes
  };

  return (
    <div className="EditUserModal">
      <button onClick={onClose} className="exit-btn">
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <form className="Form" onSubmit={handleSubmit}>
        <h2 className="edit-header">Update a User's Information</h2>
        <label htmlFor="email">Email:</label>
        <input
          className="admin-input"
          required={true}
          type="email"
          id="email"
          name="email"
          value={inputs.email}
          placeholder="Email"
          onChange={handleInputChange}
        />
        <label htmlFor="firstName">First Name:</label>
        <input
          className="admin-input"
          required={true}
          type="text"
          id="firstName"
          name="firstName"
          value={inputs.firstName}
          placeholder="FirstName"
          onChange={handleInputChange}
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          className="admin-input"
          required={true}
          type="text"
          id="lastName"
          name="lastName"
          value={inputs.lastName}
          placeholder="Last Name"
          onChange={handleInputChange}
        />
        <button className="update" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}
