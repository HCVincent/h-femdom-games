import Link from "next/link";
import React from "react";

type FooterProps = {};

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="footer p-10 bg-neutral text-neutral-content mt-10 text-white">
      <p className="text-lg max-w-[20rem]">
        {`AcgFemdom is a website you can download female dominance type of games, animes and comics for
        free. We will keep on updating contents.`}
      </p>
      <nav>
        <header className="footer-title ">Company</header>
        <Link className="link link-hover line-through " href="/">
          About us
        </Link>
        <Link className="link link-hover " href="/contact">
          Contact
        </Link>
        <Link className="link link-hover line-through " href="/">
          Jobs
        </Link>
      </nav>
      <nav>
        <header className="footer-title ">Legal</header>
        <Link className="link link-hover " href="/terms">
          Terms of use
        </Link>
        <Link className="link link-hover " href="/privacy">
          Privacy policy
        </Link>
        <Link className="link link-hover " href="/cookie">
          Cookie policy
        </Link>
      </nav>
    </footer>
  );
};
export default Footer;
