"use client";

import { useEffect } from "react";

function getHeadingLink(id: string) {
  const url = new URL(window.location.href);
  url.hash = id;
  return url.toString();
}

interface HeadingLinksProps {
  copyLabel: string;
}

export function HeadingLinks({ copyLabel }: HeadingLinksProps) {
  useEffect(() => {
    const headings = Array.from(document.querySelectorAll("article h2, article h3, article h4"));
    const handlers: Array<{ button: HTMLButtonElement; onClick: (event: MouseEvent) => void }> = [];

    for (const heading of headings) {
      const id = heading.getAttribute("id");
      if (!id) {
        continue;
      }
      if (heading.querySelector(".heading-link-btn")) {
        continue;
      }

      const button = document.createElement("button");
      button.type = "button";
      button.className = "heading-link-btn";
      button.setAttribute("aria-label", copyLabel);
      button.textContent = "#";

      const onClick = (event: MouseEvent) => {
        event.preventDefault();
        const url = getHeadingLink(id);
        window.history.replaceState(null, "", url);
        if (navigator.clipboard?.writeText) {
          navigator.clipboard.writeText(url);
        } else {
          const input = document.createElement("input");
          input.value = url;
          document.body.appendChild(input);
          input.select();
          document.execCommand("copy");
          input.remove();
        }
      };

      heading.classList.add("heading-with-link");
      heading.appendChild(button);
      button.addEventListener("click", onClick);
      handlers.push({ button, onClick });
    }

    return () => {
      for (const { button, onClick } of handlers) {
        button.removeEventListener("click", onClick);
        button.remove();
      }
    };
  }, [copyLabel]);

  return null;
}
