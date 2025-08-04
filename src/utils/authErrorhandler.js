import { toast } from "react-toastify";
import axios from "axios";

export const handleApiError = (error, navigate) => {
    console.log("API Error Details:", error);

    if (error.response) {
        const { status, data } = error.response;

        switch (status) {
            case 400:
                toast.error(data.message || "Bad Request");
                break;
            case 401:
                toast.error(data.message || "Unauthorized. Please log in again.");
                navigate("/login"); 
                break;
            case 403:
                toast.error(data.message || "Forbidden. You do not have permission.");
                break;
            case 404:
                toast.error(data.message || "Resource Not Found");
                break;
            case 408:
                toast.error(data.message || "Request Timeout");
                break;
            case 429:
                toast.error(
                    data.message || "Too Many Requests. Please try again later."
                );
                break;
            case 500:
                toast.error(
                    data.message || "Internal Server Error. Please try again later."
                );
                break;
            case 502:
                toast.error(data.message || "Bad Gateway. Please try again later.");
                break;
            case 503:
                toast.error(
                    data.message || "Service Unavailable. Please try again later."
                );
                break;
            case 504:
                toast.error(data.message || "Gateway Timeout. Please try again later.");
                break;
            default:
                toast.error(
                    data.message ||
                    "An unexpected error occurred. Please try again later."
                );
                break;
        }

        return data;
    } else if (error.request) {
        toast.error(
            "No Response Received from the Server. Please Check your Internet Connection and try again."
        );
        console.error("Error Request Data:", error.request);
    } else if (axios.isCancel(error)) {
        toast.info("Request canceled");
        console.error("Request Canceled:", error.message);
    } else {
        toast.error(
            error.message || "An error occurred while setting up the request."
        );
    }

    return null;
};