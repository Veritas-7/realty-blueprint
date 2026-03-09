import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyBlockProps {
  content: string;
  label?: string;
}

export const CopyBlock = ({ content, label }: CopyBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-muted border border-border rounded-lg">
      {label && (
        <div className="px-4 py-2 border-b border-border text-xs font-medium text-muted-foreground">
          {label}
        </div>
      )}
      <pre className="p-4 text-sm text-foreground overflow-x-auto whitespace-pre-wrap break-words">
        {content}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 rounded-md bg-background border border-border hover:bg-secondary transition-colors"
        aria-label="복사"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5 text-muted-foreground" />}
      </button>
    </div>
  );
};
