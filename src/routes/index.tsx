import { createFileRoute } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { FloatingPetals } from "@/components/FloatingPetals";
import { AudioPlayer } from "@/components/AudioPlayer";
import { ShareButtons } from "@/components/ShareButtons";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Happy Mother's Day 2026 — A Loving Tribute to Mom" },
      {
        name: "description",
        content:
          "A heartfelt Mother's Day 2026 tribute with a warm song, gentle words, and love for the strongest, kindest woman we know.",
      },
      { property: "og:title", content: "Happy Mother's Day 2026 ❤️" },
      {
        property: "og:description",
        content: "To the strongest, kindest, and most loving woman we know.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/og-image.jpg" },
      { property: "og:image:width", content: "1280" },
      { property: "og:image:height", content: "672" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Happy Mother's Day 2026 ❤️" },
      {
        name: "twitter:description",
        content: "To the strongest, kindest, and most loving woman we know.",
      },
      { name: "twitter:image", content: "/og-image.jpg" },
      { name: "theme-color", content: "#f5d6c6" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <FloatingPetals />

      {/* Soft radial glow overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, oklch(0.95 0.08 35 / 0.5), transparent 60%)",
        }}
      />

      {/* HERO */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
        <div className="fade-up mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/70 backdrop-blur-sm border border-border">
          <Heart className="w-4 h-4 text-primary fill-primary" />
          <span className="text-sm font-medium tracking-wide text-muted-foreground">
            Mother's Day · 2026
          </span>
        </div>

        <h1
          className="fade-up text-glow font-serif text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] leading-[1.05] text-foreground max-w-5xl"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.45 0.12 25), oklch(0.62 0.16 30), oklch(0.55 0.14 20))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Happy Mother's Day
        </h1>

        <p className="fade-up-delay-1 mt-8 max-w-3xl font-serif italic text-2xl sm:text-3xl md:text-4xl text-foreground/80 leading-snug">
          To the strongest, kindest, and most loving woman we know.
        </p>

        <div className="fade-up-delay-2 mt-14 w-full flex justify-center">
          <AudioPlayer />
        </div>

        <div
          className="fade-up-delay-3 absolute bottom-8 left-1/2 -translate-x-1/2 text-sm text-muted-foreground tracking-wide flex items-center gap-2"
        >
          Made with <Heart className="w-3.5 h-3.5 text-primary fill-primary" /> in 2026
        </div>
      </section>

      {/* HEARTFELT MESSAGE */}
      <section className="relative z-10 px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="inline-flex w-14 h-14 items-center justify-center rounded-full mb-8"
            style={{ background: "var(--gradient-rose)", boxShadow: "var(--shadow-glow)" }}
          >
            <Heart className="w-7 h-7 text-primary-foreground fill-primary-foreground" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-foreground mb-10">
            For every Mom, everywhere.
          </h2>
          <p className="font-serif italic text-2xl sm:text-3xl leading-relaxed text-foreground/85">
            “You are the soft hand that wiped our tears, the quiet strength behind our courage,
            and the warm light we carry wherever we go. Every prayer you whispered, every sleepless
            night, every gentle smile — they shaped the people we are today.”
          </p>
          <p className="mt-8 text-xl sm:text-2xl text-muted-foreground leading-relaxed">
            Today, and every day, we celebrate you. Your love is the kind that doesn't fade with
            time — it only grows softer, deeper, and more beautiful.
          </p>
        </div>
      </section>

      {/* CLOSING */}
      <section className="relative z-10 px-6 pb-32 pt-12">
        <div className="mx-auto max-w-3xl text-center flex flex-col items-center gap-12">
          <div
            className="w-full p-10 sm:p-14 rounded-3xl bg-card/80 backdrop-blur-md border border-border"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight">
              Thank you for everything you do.
            </h3>
            <p
              className="mt-4 font-serif italic text-2xl sm:text-3xl"
              style={{
                background: "var(--gradient-rose)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              We love you, endlessly.
            </p>
          </div>

          <ShareButtons />

          <p className="text-sm text-muted-foreground pt-8 flex items-center gap-2">
            Made with <Heart className="w-3.5 h-3.5 text-primary fill-primary" /> in 2026
          </p>
        </div>
      </section>
    </main>
  );
}
