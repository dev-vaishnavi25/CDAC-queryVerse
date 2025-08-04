import React, { useState, useEffect  , useRef} from 'react';
import { CheckCircle, MailCheck, ShieldCheck, BookOpenText } from 'lucide-react';
import AuthNavbar from './AuthNavbar';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Confetti from 'react-confetti';
import { verifyEmail } from '../../ApiServices/authApiService';
import { toast } from 'react-toastify';

const VerifyMail = () => {
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const token = searchParam.get("token");
  // const {token} = useParams();
  const [showConfetti, setShowConfetti] = useState(true);
  const [status , setStatus] = useState("loading");
  const hasVerifiedRef = useRef(false); 


useEffect(() => {
  if (token && !hasVerifiedRef.current) {
    hasVerifiedRef.current = true;
    handleVerify(token);
  }

  const timer = setTimeout(() => setShowConfetti(false), 10000);
  return () => clearTimeout(timer);
}, [token]);

 const handleVerify = async (token) => {
    console.log("📩 Token from URL:", token);
    try {
      const response = await verifyEmail(token);
      // console.log("✅ Email verification response:", response);

      if (response?.status === "success") {
        toast.success(response.message);
        setStatus("success");
      } else {
        toast.error(response?.message || "Verification failed.");
        setStatus("error");
      }
    } catch (error) {
      // console.log("❌ Error during verification:", error);
      toast.error(error?.response?.data?.message || "Verification failed.");
      setStatus("error");
    }
  };
  const handleLogin = () => {
    navigate('/Login');
  };

   if (status === "loading") {
    return (
      <>
        <AuthNavbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg text-gray-600">Verifying your email...</p>
        </div>
      </>
    );
  }

   if (status === "error") {
    return (
      <>
        <AuthNavbar />
        <div className="min-h-screen flex items-center justify-center flex-col gap-4">
          <p className="text-xl text-red-600">Email verification failed!</p>
          <button
            onClick={() => navigate('/')}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Go Home
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <AuthNavbar />
     {showConfetti && (
  <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
    <Confetti
      numberOfPieces={500}
      recycle={false}
      className="w-full h-full"
    />
  </div>
)}

      <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] via-[#eaf0ff] to-[#f3f4f9] flex items-center justify-center overflow-hidden relative">
        {/* Animated Background Blobs */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-purple-300 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-300 opacity-20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200 opacity-20 rounded-full blur-[100px] animate-pulse delay-500"></div>

        <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-md border border-gray-200 overflow-hidden">
          {/* Left: Message Card */}
          <div className="flex flex-col justify-center p-10 bg-white">
            <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Email Verified!</h2>
            <p className="text-gray-600 text-sm mb-6 text-center">
              Your account is now active. Enjoy the full experience of QueryVerse.
            </p>
            <button
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all mx-auto"
              onClick={handleLogin}
            >
              Back to Login
            </button>
          </div>

          {/* Right: Info Section */}
          <div className="hidden md:flex flex-col items-center justify-center p-10 bg-gradient-to-br from-blue-600 to-purple-700 text-white space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Verified & Ready</h3>
              <p className="text-purple-100 text-sm">
                You’re all set to explore, learn, and connect with the community.
              </p>
            </div>

            <div className="space-y-4 text-sm text-purple-100">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} /> Account Secured
              </div>
              <div className="flex items-center gap-2">
                <MailCheck size={18} /> Email Confirmed
              </div>
              <div className="flex items-center gap-2">
                <BookOpenText size={18} /> Unlock Full Features
              </div>
            </div>

            <div className="mt-6 text-purple-200 italic text-center max-w-xs text-sm">
              “Welcome aboard! Start your journey with confidence and community.”
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyMail;
