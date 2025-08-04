import { toast } from "react-toastify";

export const validateForm = ({ email }) => {
  if (!email) {
    toast.error("Email is required.");
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    toast.error("Please enter a valid email address.");
    return false;
  }
  return true;
};


export const MentorvalidateForm = (form) => {
  const { fullName, email, password } = form;

  if (!fullName || !email || !password) {
    toast.error("Please fill all the fields.");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    toast.error("Invalid email format.");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters.");
    return false;
  }

  return true;
};
