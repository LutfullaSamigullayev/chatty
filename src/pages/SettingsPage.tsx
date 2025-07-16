// 1. SettingsPage.tsx
import { useTheme } from "@/context/ThemeContext";

const themes = [
  "light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
  "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden",
  "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black",
  "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade",
  "night", "coffee", "winter", "dim", "nord", "sunset"
];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Theme Settings</h2>

      <select
        className="select select-bordered w-full max-w-xs mb-6"
        value={theme}
        onChange={(e) => setTheme(e.target.value as any)}
      >
        {themes.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      <div className="bg-base-200 p-4 rounded-xl">
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img src="/avatar1.png" />
            </div>
          </div>
          <div className="chat-header">
            John Doe <time className="text-xs opacity-50 ml-1">12:00 PM</time>
          </div>
          <div className="chat-bubble">Hey! How's it going?</div>
        </div>
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img src="/avatar2.png" />
            </div>
          </div>
          <div className="chat-header">
            You <time className="text-xs opacity-50 ml-1">12:01 PM</time>
          </div>
          <div className="chat-bubble chat-bubble-primary">I'm doing great! Just working on some new features.</div>
        </div>
      </div>
    </div>
  );
}
