import { Svg } from "~/components/Svg";

export const SocialMediaLinks = ({ className }: { className?: string }) => (
  <ul
    className={className}
  >
    <li>
      <a
        href="https://www.linkedin.com/in/connor-tangney-69aa8666/"
        target="_blank"
      >
        <Svg id="linked-in" className="h-6 w-6" />
      </a>
    </li>
    <li>
      <a href="https://github.com/ctangney-tulip" target="_blank">
        <Svg id="github" className="h-8 w-8" />
      </a>
    </li>
  </ul>
);
