type IconProps = {
    path: string;
    size?: number;
    className?: string;
};
  
function Icon({ path, size = 20, className }: IconProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        aria-hidden="true"
      >
        <path d={path} />
      </svg>
    );
}
export default Icon
