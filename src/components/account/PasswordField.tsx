import { MdVisibility, MdVisibilityOff } from "react-icons/md";

interface PasswordFieldProps {
  label: string;
  name: string;
  value: string;
  visible: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggle: () => void;
  placeholder?: string;
}

export default function PasswordField({
  label,
  name,
  value,
  visible,
  onChange,
  onToggle,
  placeholder = "••••••••",
}: PasswordFieldProps) {
  return (
    <div>
      <label className="block text-foreground/70 text-sm font-medium mb-2">{label}</label>
      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          required
          placeholder={placeholder}
          className="w-full px-4 py-2.5 pr-10 bg-secondary/10 border border-secondary/20 rounded-lg text-secondary text-sm focus:outline-none focus:border-primary/50 focus:bg-secondary/15 transition-all"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary/50 hover:text-secondary transition-colors"
        >
          {visible ? <MdVisibility className="w-4 h-4" /> : <MdVisibilityOff className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
