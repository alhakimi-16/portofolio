import Image from "next/image";

/** The portrait, or the initials until a photo is added in profile.ts. */
export function Avatar({ photo, initials, name }: { photo?: string; initials: string; name: string }) {
  if (photo) {
    return (
      <Image
        src={photo}
        alt={name}
        width={192}
        height={192}
        priority
        className="size-20 rounded-full object-cover ring-1 ring-line"
      />
    );
  }
  return (
    <div
      aria-hidden
      className="grid size-20 place-items-center rounded-full bg-accent-soft font-serif text-[1.75rem] text-accent ring-1 ring-line"
    >
      {initials}
    </div>
  );
}
