import { getInitials } from "@/lib/format";

interface AvatarProps {
  name: string;
  photoUrl: string | null;
  size?: number;
  className?: string;
}

/**
 * Shows the real photo cropped into a clean circle with a thin yellow ring,
 * otherwise a purple initials placeholder ("never fake a professor's face").
 *
 * The photo is deliberately rendered a bit smaller than the outer circle
 * (inset) so the yellow ring behind it always shows — no white ever, since
 * this crops the same edge-to-edge purple portrait used in the card/modal,
 * not a separate pre-shaped asset.
 */
export function Avatar({ name, photoUrl, size = 56, className = "" }: AvatarProps) {
  if (photoUrl) {
    return (
      <div
        className={`relative shrink-0 rounded-full bg-yellow ${className}`}
        style={{ width: size, height: size }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- local/CMS photos of arbitrary aspect ratio, no next/image config needed */}
        <img
          src={photoUrl}
          alt={name}
          loading="lazy"
          decoding="async"
          // Explicit w/h (not just the inset shorthand) because Tailwind's
          // preflight sets `img { height: auto }`, which has bitten this
          // exact "absolutely positioned photo" pattern before.
          className="absolute inset-[6%] h-[88%] w-[88%] rounded-full object-cover object-top"
        />
      </div>
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
