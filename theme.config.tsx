import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: (
    <>
      <img
        style={{ width: "28px", margin: "10px" }}
        src="https://www.svgrepo.com/show/495866/airdrop.svg"
      ></img>
      <b>Truecallerjs</b>
    </>
  ),
  project: {
    link: "https://github.com/sumithemmadi/truecallerjs",
  },
  // chat: {
  //   link: "https://discord.com",
  // },
  docsRepositoryBase: "https://github.com/sumithemmadi/truecallerjs",
  footer: {
    text: "Truecallerjs",
  },
};

export default config;
