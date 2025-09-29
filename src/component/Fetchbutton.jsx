
import { BsArrowRepeat } from "react-icons/bs";
export default function FetchButton({ onClick, disabled, loading }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={`bg-[#220752] text-white text-md px-3 py-2 w-full rounded hover:bg-[#190739] flex justify-center items-center gap-2 ${
        disabled || loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {loading ? (
        <div className="spinner w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <>
          <BsArrowRepeat />
          Fetch Data
        </>
      )}
    </button>
  );
}
