"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HELP_TEXT = `Available commands:
  help          Show this message
  whoami        About Apoorv
  ls projects   List projects
  goto blog     Navigate to blog section
  goto projects Navigate to projects section
  goto book     Navigate to book page
  clear         Clear terminal
  exit          Close terminal`;

const WHOAMI_TEXT = `Apoorv
Software Engineer @ Scale AI
OSS Contributor & Maintainer
Speaker, Author, Streamer`;

export default function InteractiveShell() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<{ command: string; output: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const processCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();

    switch (trimmed) {
      case "help":
        return HELP_TEXT;
      case "whoami":
        return WHOAMI_TEXT;
      case "ls projects":
        return "project-alpha/  react-terminal-ui/  dotfiles/  markdown-to-slides/";
      case "goto blog":
        document.getElementById("blog")?.scrollIntoView({ behavior: "smooth" });
        return "Navigating to blog...";
      case "goto projects":
        document
          .getElementById("projects")
          ?.scrollIntoView({ behavior: "smooth" });
        return "Navigating to projects...";
      case "goto book":
        window.location.href = "/book";
        return "Loading book...";
      case "clear":
        return "__CLEAR__";
      case "exit":
        return "__EXIT__";
      case "":
        return "";
      default:
        return `command not found: ${trimmed}. Type 'help' for available commands.`;
    }
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const output = processCommand(input);

      if (output === "__CLEAR__") {
        setHistory([]);
      } else if (output === "__EXIT__") {
        setIsOpen(false);
        setHistory([]);
      } else {
        setHistory((prev) => [...prev, { command: input, output }]);
      }
      setInput("");
    },
    [input, processCommand]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "\\") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[9990] bg-terminal-black border-t border-terminal-green/50 h-64 flex flex-col"
        >
          <div className="flex items-center justify-between px-4 py-1 border-b border-terminal-border text-xs">
            <span className="text-terminal-green">
              interactive shell (Ctrl+\ to toggle)
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-terminal-dim hover:text-terminal-text"
            >
              [x]
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 text-sm">
            <p className="text-terminal-dim mb-2">
              Type &apos;help&apos; for available commands.
            </p>
            {history.map((entry, i) => (
              <div key={i} className="mb-2">
                <div>
                  <span className="text-terminal-green">$ </span>
                  <span className="text-terminal-text">{entry.command}</span>
                </div>
                {entry.output && (
                  <pre className="text-terminal-text/70 whitespace-pre-wrap mt-0.5">
                    {entry.output}
                  </pre>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-4 py-2 border-t border-terminal-border"
          >
            <span className="text-terminal-green text-sm">$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent text-terminal-text text-sm outline-none caret-terminal-green"
              autoComplete="off"
              spellCheck={false}
            />
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
