import { getInitials } from "@/lib/format";

interface AvatarProps {
  name: string;
  photoUrl: string | null;
  size?: number;
  className?: string;
  /** Same crop tuning as the card photo (speaker.photoOriginY). Ignored when `avatarUrl` is set. */
  originY?: number;
  /** Same crop tuning as the card photo (speaker.photoZoom). Ignored when `avatarUrl` is set. */
  zoom?: number;
  /** Ready-made circular badge — takes priority over cropping `photoUrl`, and is what's shown everywhere the avatar appears (grid and modal) so the same image is never reformatted between the two. */
  avatarUrl?: string | null;
}

/**
 * Shows the professor's avatar: the ready-made circular badge (`avatarUrl`)
 * when the speaker has one — same asset in the "Quem vai sentar para
 * prosear?" grid and in the speaker modal, so clicking never changes the
 * image's format — otherwise falls back to cropping `photoUrl` (the card
 * portrait) into a plain circle, or a purple initials placeholder ("never
 * fake a professor's face").
 */
export function Avatar({
  name,
  photoUrl,
  size = 56,
  className = "",
  originY = 0,
  zoom = 1,
  avatarUrl,
}: AvatarProps) {
  if (avatarUrl) {
    return (
      <div className={`relative shrink-0 ${className}`} style={{ width: size, height: size }}>
        {/* Já vem pronto (foto recortada em círculo) — só encaixar, sem recorte/zoom próprio. */}
        {/* eslint-disable-next-line @next/next/no-img-element -- badge pronto, tamanho fixo por professor */}
        <img src={avatarUrl} alt={name} loading="lazy" decoding="async" className="h-full w-full object-contain" />
      </div>
    );
  }
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
