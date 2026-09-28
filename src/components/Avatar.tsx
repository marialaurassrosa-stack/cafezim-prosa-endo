import { getInitials } from "@/lib/format";

interface AvatarProps {
  name: string;
  photoUrl: string | null;
  size?: number;
  className?: string;
  /** Same crop tuning as the card photo (speaker.photoOriginY) — keeps face framing consistent between card and avatar. */
  originY?: number;
  /** Same crop tuning as the card photo (speaker.photoZoom). */
  zoom?: number;
}

/**
 * Shows the exact same portrait used in the card, cropped into a plain
 * circle (same photoUrl + zoom/origin, no separate asset and no ring/border
 * — "mesmo enquadramento e identidade visual em todos os pontos da
 * página"), otherwise a purple initials placeholder ("never fake a
 * professor's face").
 */
export function Avatar({ name, photoUrl, size = 56, className = "", originY = 0, zoom = 1 }: AvatarProps) {
  if (photoUrl) {
    return (
      <div
        className={`relative shrink-0 overflow-hidden rounded-full ${className}`}
        style={{ width: size, height: size }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- local/CMS photos of arbitrary aspect ratio, no next/image config needed */}
        <img
          src={photoUrl}
          alt={name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          style={{
            objectPosition: `50% ${originY}%`,
            transform: zoom !== 1 ? `scale(${zoom})` : undefined,
            transformOrigin: `50% ${originY}%`,
          }}
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
