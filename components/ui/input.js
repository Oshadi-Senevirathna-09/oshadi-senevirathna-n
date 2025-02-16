export function Input({ type = 'text', placeholder, className, ...props }) {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 ${className}`}
        {...props}
      />
    );
  }
  