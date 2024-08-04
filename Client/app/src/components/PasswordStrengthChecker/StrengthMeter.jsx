import React from 'react';
import './PasswordStrengthMeter.css';

const PasswordStrengthMeter = ({ password }) => {
  const strength = getPasswordStrength(password);
  const strengthClass = getStrengthClass(strength);

  return (
    <>
    <div className="password-strength-meter">
      <div className={`strength-bar ${strengthClass}`} style={{ width: `${strength}%` }}></div>
    </div>
    <p className={`strength-text ${strengthClass}`}>{getStrengthMessage(strength)}</p>
    </>
  );
};

const getPasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 6) strength += 20;
  if (password.length >= 8) strength += 20;
  if (/[A-Z]/.test(password)) strength += 20;
  if (/[a-z]/.test(password)) strength += 20;
  if (/[0-9]/.test(password)) strength += 10;
  if (/[\W_]/.test(password)) strength += 10;
  return strength;
};

const getStrengthClass = (strength) => {
  if (strength <= 40) return 'weak';
  if (strength <= 60) return 'fair';
  if (strength <= 80) return 'good';
  return 'strong';
};

const getStrengthMessage = (strength) => {
  if (strength <= 40) return 'Weak';
  if (strength <= 60) return 'Fair';
  if (strength <= 80) return 'Good';
  return 'Strong';
};

export default PasswordStrengthMeter;
