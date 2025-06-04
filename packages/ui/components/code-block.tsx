'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  holiTheme,
  coyWithoutShadows,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import { Button } from './button';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  theme?: 'dark' | 'light';
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = 'javascript',
  filename,
  theme = 'dark',
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const customStyle = {
    margin: 0,
    borderRadius: 0,
    background: 'transparent',
    fontSize: '14px',
    lineHeight: '1.5',
    fontFamily:
      "var(--font-mono, 'Fira Code', 'Monaco', 'Cascadia Code', 'Ubuntu Mono', monospace)",
  };

  const customTheme =
    theme === 'dark'
      ? {
          ...holiTheme,
          'pre[class*="language-"]': {
            ...holiTheme['pre[class*="language-"]'],
            background: 'hsl(var(--background))',
            color: 'hsl(var(--foreground))',
          },
          'code[class*="language-"]': {
            ...holiTheme['code[class*="language-"]'],
            color: 'hsl(var(--foreground))',
          },
        }
      : coyWithoutShadows;

  return (
    <div className="relative group">
      <div className="rounded-lg border bg-card overflow-hidden">
        {/* Header */}
        {(filename || language) && (
          <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b">
            <div className="flex items-center gap-2">
              {language && (
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {language}
                </span>
              )}
              {filename && (
                <span className="text-xs text-muted-foreground font-mono">
                  {filename}
                </span>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={copyToClipboard}
              className="h-7 px-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 mr-1" />
                  <span className="text-xs">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3 mr-1" />
                  <span className="text-xs">Copy</span>
                </>
              )}
            </Button>
          </div>
        )}

        {/* Code */}
        <div className="relative">
          <SyntaxHighlighter
            language={language}
            style={customTheme}
            showLineNumbers={showLineNumbers}
            wrapLines={true}
            PreTag="div"
          >
            {code}
          </SyntaxHighlighter>

          {/* Copy button overlay for mobile */}
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="absolute top-2 right-2 h-7 px-2 md:hidden bg-background/80 backdrop-blur-sm"
          >
            {copied ? (
              <Check className="h-3 w-3" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
