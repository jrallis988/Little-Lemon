export default function Logo({ solid = false, className = "" }) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <img
        src={solid ? "/images/logo.png" : "/images/logo-white.png"}
        alt="River Valley Community College"
        className={solid ? "h-9 w-auto sm:h-10" : "h-8 w-auto sm:h-9"}
      />
    </span>
  );
}
