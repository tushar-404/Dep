"use client";

const WALLPAPERS = [
  "https://w.wallhaven.cc/full/85/wallhaven-85ok17.jpg",
  "https://w.wallhaven.cc/full/ex/wallhaven-exlppw.jpg",
  "https://w.wallhaven.cc/full/72/wallhaven-72dl3k.jpg",
  "https://w.wallhaven.cc/full/vq/wallhaven-vqyd11.jpg",
  "https://w.wallhaven.cc/full/9d/wallhaven-9dpxy3.jpg",
  "https://w.wallhaven.cc/full/zy/wallhaven-zy6owm.jpg",
  "https://w.wallhaven.cc/full/d6/wallhaven-d6q1q9.jpg",
  "https://w.wallhaven.cc/full/0p/wallhaven-0py7xr.jpg",
  "https://w.wallhaven.cc/full/k7/wallhaven-k7m3w1.jpg",
  "https://w.wallhaven.cc/full/3z/wallhaven-3zgrqg.jpg",
  "https://w.wallhaven.cc/full/4y/wallhaven-4ydxjl.jpg",
  "https://w.wallhaven.cc/full/l8/wallhaven-l8kp6y.jpg",
];

export default function AnimeBackground() {
  return (
    <div className="bg-grid" aria-hidden="true">
      {WALLPAPERS.map((src, i) => (
        <div key={i} className="bg-grid__cell">
          <img
            src={src}
            alt=""
            className="bg-grid__img"
            loading={i < 4 ? "eager" : "lazy"}
          />
        </div>
      ))}
      <div className="bg-grid__overlay" />
    </div>
  );
}
