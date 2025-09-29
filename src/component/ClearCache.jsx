export default function ClearCache({ onClick }) {
  return (
    <button
      type="button"
      className="border border-[#ffffff29] rounded-lg text-white text-sm px-3 py-2 hover:bg-[#1a003f] transition-colors"
      onClick={onClick}
    >
      Clear Cache
    </button>
  );
}
