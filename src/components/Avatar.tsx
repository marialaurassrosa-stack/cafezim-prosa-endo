import { getInitials } from "@/lib/format";

interface AvatarProps {
  name: string;
  photoUrl: string | null;
  size?: number;
  className?: string;
}

/**
 * Shows the real photo when one is configured; otherwise a purple initials
 * placeholder, per the brief's "never fake a professor's face" rule.
 */
export function Avatar({ name, photoUrl, size = 56, className = "" }: AvatarProps) {
  if (photoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- local/CMS photos of arbitrary aspect ratio, no next/image config needed
      <img
        src={photoUrl}
        alt={name}
        width={size}
        height={size}
        className={`rounded-full object-cover ${className}`}
      />
    );
  }
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-purple-dark font-semibold text-white ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      role="img"
      aria-label={name}
    >
      {getInitials(name)}
    </div>
  );
}
