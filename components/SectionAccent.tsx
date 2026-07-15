"use client";

/** Subtle spacer between homepage bands */
export default function SectionAccent() {
  return (
    <div className="relative py-2" aria-hidden="true">
      <div
        className="mx-auto h-px max-w-xs"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(24,131,71,0.25), transparent)",
        }}
      />
    </div>
  );
}
