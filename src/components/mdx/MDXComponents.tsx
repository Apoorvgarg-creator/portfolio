import type { MDXComponents as MDXComponentsType } from "mdx/types";

export const mdxComponents: MDXComponentsType = {
  h1: (props) => (
    <h1
      className="text-2xl font-bold text-terminal-green text-glow mb-6 mt-8"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="text-xl font-bold text-terminal-green mb-4 mt-6"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="text-lg font-bold text-terminal-text mb-3 mt-4"
      {...props}
    />
  ),
  p: (props) => (
    <p className="text-terminal-text/90 mb-4 leading-relaxed" {...props} />
  ),
  a: (props) => (
    <a
      className="text-terminal-green underline underline-offset-4 hover:text-terminal-amber transition-colors"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  ul: (props) => <ul className="list-none mb-4 space-y-1" {...props} />,
  li: (props) => (
    <li className="text-terminal-text/90 before:content-['›_'] before:text-terminal-green before:mr-1" {...props} />
  ),
  ol: (props) => (
    <ol className="list-decimal list-inside mb-4 space-y-1 text-terminal-text/90" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-2 border-terminal-green pl-4 my-4 text-terminal-text/70 italic"
      {...props}
    />
  ),
  code: (props) => {
    const isInline = typeof props.children === "string";
    if (isInline) {
      return (
        <code className="bg-terminal-border/50 text-terminal-green px-1.5 py-0.5 text-sm" {...props} />
      );
    }
    return <code {...props} />;
  },
  strong: (props) => (
    <strong className="text-terminal-text font-bold" {...props} />
  ),
  hr: () => (
    <hr className="border-terminal-border my-8" />
  ),
};
