export default function Button({ children, onClick, className = "", ...props }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-lg font-semibold shadow transition hover:scale-105 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
