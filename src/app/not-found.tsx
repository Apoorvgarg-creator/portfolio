import Link from "next/link";
import TerminalWindow from "@/components/terminal/TerminalWindow";
import CommandLine from "@/components/terminal/CommandLine";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <TerminalWindow title="error — bash">
          <CommandLine command="cd /requested/path">
            <p className="text-red-400 mt-1">
              bash: cd: /requested/path: No such file or directory
            </p>
          </CommandLine>

          <CommandLine command="echo $?">
            <p className="text-terminal-amber mt-1">404</p>
          </CommandLine>

          <pre className="text-terminal-green text-glow my-4 text-xs">
{`
 ██╗  ██╗ ██████╗ ██╗  ██╗
 ██║  ██║██╔═══██╗██║  ██║
 ███████║██║   ██║███████║
 ╚════██║██║   ██║╚════██║
      ██║╚██████╔╝     ██║
      ╚═╝ ╚═════╝      ╚═╝
`}
          </pre>

          <CommandLine command="cat error.log">
            <p className="text-terminal-text/70 mt-1 text-sm">
              The page you&apos;re looking for doesn&apos;t exist.
            </p>
            <p className="text-terminal-text/70 text-sm">
              It might have been moved, deleted, or never existed.
            </p>
          </CommandLine>

          <div className="mt-4">
            <Link
              href="/"
              className="text-terminal-green text-sm hover:text-glow"
            >
              visitor@apoorv:~$ cd ~ <span className="text-terminal-dim">[go home]</span>
            </Link>
          </div>
        </TerminalWindow>
      </div>
    </div>
  );
}
