

export default function BodyPartButton({ label, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className='bg-red-600 text-white font-bold px-6 py-2 shadow-md rounded w-40 disabled:opacity-50'
    >
      {label}
    </button>
  );
}
