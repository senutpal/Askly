"use client";

import { glass } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { Avatar, AvatarImage } from "@workspace/ui/components/avatar";
import { useMemo } from "react";
import { cn } from "@workspace/ui/lib/utils";

interface DicebearAvatarProps {
  seed: string;
  size?: number;
  className?: string;
  badgeClassName?: string;
  imageUrl?: string;
  badgeImageUrl?: string;
}

export const DicebearAvatar = ({
  seed,
  size = 32,
  className,
  badgeClassName,
  imageUrl,
  badgeImageUrl,
}: DicebearAvatarProps) => {
  const avatarSrc = useMemo(() => {
    if (imageUrl) return imageUrl;
    return createAvatar(glass, {
      seed: seed.toLowerCase().trim(),
      size,
    }).toDataUri();
  }, [seed, size, imageUrl]);

  const badgeSize = Math.round(size * 0.5);

  return (
    <div
      className="relative inline-block"
      style={{ width: size, height: size }}
    >
      <Avatar
        className={cn("border", className)}
        style={{ width: size, height: size }}
      >
        <AvatarImage src={avatarSrc} alt="User avatar" />
      </Avatar>

      {badgeImageUrl && (
        <div
          className={cn(
            "absolute bottom-0 right-0  flex items-center justify-center overflow-hidden rounded-full border-2 border-background bg-background",
            badgeClassName
          )}
          style={{
            width: badgeSize,
            height: badgeSize,
            transform: "translate(15%, 15%)",
          }}
        >
          <img
            alt=""
            className="h-full w-full object-cover"
            height={badgeSize}
            width={badgeSize}
            src={badgeImageUrl}
          />
        </div>
      )}
    </div>
  );
};
