"use client";

import { useEffect } from "react";

export function CopyCodeButton() {
  useEffect(() => {
    const codeBlocks = document.querySelectorAll("pre");

    codeBlocks.forEach((pre, index) => {
      if (pre.querySelector(".copy-button")) {
        return;
      }

      pre.style.position = "relative";
      pre.classList.add("code-block");

      const code = pre.querySelector("code");
      const className = code?.className || "";
      const languageMatch = className.match(/language-([a-z0-9-]+)/i);
      const header = document.createElement("div");
      header.className = "code-header";
      const meta = document.createElement("div");
      meta.className = "code-meta";
      meta.textContent = languageMatch ? languageMatch[1].replace(/-/g, " ").toUpperCase() : "CODE";
      header.appendChild(meta);

      const button = document.createElement("button");
      button.className = "copy-button";
      button.setAttribute("data-index", String(index));
      button.innerHTML = `
        <svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: none;">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      `;

      header.appendChild(button);
      pre.insertBefore(header, code ?? pre.firstChild);

      button.addEventListener("click", async () => {
        const code = pre.querySelector("code");
        if (code) {
          await navigator.clipboard.writeText(code.textContent || "");

          const copyIcon = button.querySelector(".copy-icon") as HTMLElement;
          const checkIcon = button.querySelector(".check-icon") as HTMLElement;
          if (copyIcon && checkIcon) {
            copyIcon.style.display = "none";
            checkIcon.style.display = "block";

            setTimeout(() => {
              copyIcon.style.display = "block";
              checkIcon.style.display = "none";
            }, 2000);
          }
        }
      });
    });

    return () => {
      document.querySelectorAll("pre.code-block").forEach((pre) => {
        pre.classList.remove("code-block");
        pre.querySelectorAll(".code-header").forEach((header) => {
          header.remove();
        });
      });
    };
  }, []);

  return null;
}
