import React, { useState } from 'react';
import { Mail ,Loader2} from 'lucide-react';
import AuthNavbar from './AuthNavbar';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../ApiServices/authApiService';
import { toast } from 'react-toastify';
import { validateForm } from '../../utils/validator';
import { handleApiError } from '../../utils/authErrorhandler';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const[email , setEmail] = useState('');
    const[loading , setLoading] = useState(false);

    const handleForgotPassword = async (e) => {
       e.preventDefault();
         setLoading(true);

        const isValid = validateForm({ email });
    if (!isValid) {
      setLoading(false);
      return;
    }

       try {
         const response = await forgotPassword({email});
         console.log("forgot password response:", response); 
   
          if ( response.status === "success") {
         toast.success(response.message || "forgot password successful!");
         setTimeout(() => navigate("/Login"), 500);
       } else {
         toast.error(response?.message || "forgot password failed.");
       }
     } catch (error) {
       const errorMsg = handleApiError(error); 
       toast.error(errorMsg || "Something went wrong during change password.");
     }finally{
       setLoading(false);
     }
     };
  return (
    <>
    <AuthNavbar/>
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#f0f4ff] via-[#e7e9fc] to-[#f8f9ff] flex items-center justify-center px-4">

      <div className="bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
    
        {/* Left: Form */}
        <div className="p-10 bg-white">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Forgot Your Password?</h2>
          <p className="text-gray-600 text-sm mb-6 text-center">
            Enter your registered email address and we'll send you a link to reset your password.
          </p>

          <form className="space-y-5" onSubmit={handleForgotPassword}>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
               <div className="text-right text-sm">
          <button type ="button" className="text-purple-600 hover:underline" onClick = {() => navigate("/Login")} >
            Back to login?
          </button>
        </div>
           <button
  type="submit"
  disabled={loading}
  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-xl hover:scale-[1.02] transition-all flex justify-center items-center"
>
  {loading ? (
    <Loader2 className="animate-spin" size={24} />
  ) : (
    'Send Reset Link'
  )}
</button>
          </form>
        </div>

        {/* Right: Info */}
        <div className="hidden md:flex flex-col items-center justify-center p-10 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
          <h3 className="text-3xl font-bold mb-4">Secure Recovery</h3>
          <p className="text-purple-100 text-sm text-center max-w-sm">
            No worries, happens to the best of us. Your password reset link will land in your inbox shortly.
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default ForgotPassword;
