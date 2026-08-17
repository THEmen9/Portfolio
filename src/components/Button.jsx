
export default function Button({ size = "md", className = "", children, ...props }){

const sizeStyles = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button className={`rounded ${sizeStyles[size] || sizeStyles.md} ${className}`} {...props}>
      {children}
    </button>
  )

}