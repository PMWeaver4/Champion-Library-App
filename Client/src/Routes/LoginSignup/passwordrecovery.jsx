import React, { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRequestReset = async () => {
    const response = await fetch('/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });
    const data = await response.json();
    if (response.ok) {
      setCodeSent(true);
    } else {
      setMessage(data.message);
    }
  };

  const handleResetPassword = async () => {
    const response = await fetch('/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, code, newPassword })
    });
    const data = await response.json();
    if (response.ok) {
      setMessage('Password reset successfully.');
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div>
      {!codeSent ? (
        <>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <button onClick={handleRequestReset}>Send Reset Code</button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter code"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
          <button onClick={handleResetPassword}>Reset Password</button>
        </>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgotPassword;