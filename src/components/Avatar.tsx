import { getInitials } from "@/lib/format";

interface AvatarProps {
  name: string;
  photoUrl: string | null;
  size?: number;
  className?: string;
}

// The speaker photos are already an art-directed cutout (a yellow shape with
// the portrait breaking out of it, on a 364:525 canvas) — not a plain
// rectangle meant to be re-cropped into a second circle. Sizing the box to
// that same ratio and using object-contain shows the composition intact;
// object-cover + rounded-full here would just clip it into a messy circle
// with a visible ring of the photo's own white background around it.
const PHOTO_RATIO = 525 / 364;

/**
 * Shows the real photo when one is configured; otherwise a purple initials
 * placeholder, per the brief's "never fake a professor's face" rule.
 */
export function Avatar({ name, photoUrl, size = 56, className = "" }: AvatarProps) {
  if (photoUrl) {
    const height = Math.round(size * PHOTO_RATIO);
    return (
      // eslint-disable-next-line @next/next/no-img-element -- local/CMS photos of arbitrary aspect ratio, no next/image config needed
      <img
        src={photoUrl}
        alt={name}
        width={size}
        height={height}
        loading="lazy"
        decoding="async"
        // Tailwind's preflight sets `img { height: auto }`, which would
        // otherwise override the height attribute above — inline style wins.
        style={{ width: size, height }}
        className={`shrink-0 object-contain ${className}`}
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
