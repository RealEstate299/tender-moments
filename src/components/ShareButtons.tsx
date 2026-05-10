import { useEffect, useState } from "react";
import { Facebook, Link2, MessageCircle, Send, Twitter } from "lucide-react";

const SHARE_TEXT = "Happy Mother's Day 2026 — to the strongest, kindest, and most loving woman we know. ❤️";

export function ShareButtons() {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") setUrl(window.location.href);
  }, []);

  const enc = encodeURIComponent;
  const links = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: `https://wa.me/?text=${enc(`${SHARE_TEXT} ${url}`)}`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}&quote=${enc(SHARE_TEXT)}`,
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${enc(SHARE_TEXT)}&url=${enc(url)}`,
    },
    {
      name: "Telegram",
      icon: Send,
      href: `https://t.me/share/url?url=${enc(url)}&text=${enc(SHARE_TEXT)}`,
    },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <p className="text-lg text-muted-foreground">Send it to your Mom</p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {links.map(({ name, icon: Icon, href }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${name}`}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-card border border-border text-foreground hover:bg-accent transition-all hover:scale-105"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <Icon className="w-5 h-5 text-primary" />
            <span className="font-medium">{name}</span>
          </a>
        ))}
        <button
          onClick={copy}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-card border border-border text-foreground hover:bg-accent transition-all hover:scale-105"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <Link2 className="w-5 h-5 text-primary" />
          <span className="font-medium">{copied ? "Copied!" : "Copy link"}</span>
        </button>
      </div>
    </div>
  );
}
