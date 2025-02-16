export function Button({ children, className, ...props }) {
    return (
      <button
        className={`w-full p-3 bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-lg shadow-md hover:from-purple-500 hover:to-purple-700 ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
  