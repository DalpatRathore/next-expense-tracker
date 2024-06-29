import { Code2 } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="flex items-center justify-between py-4 border-t border-muted px-2 max-w-7xl mx-auto mt-5">
      <p className="text-xs lg:text-sm text-muted-foreground">
        Built with React.js, Next.js, Typescript, Zod, React Hook Form,
        Tailwind, Prisma, Neon, Git, Github, & Shadcn.
      </p>
      <a href="https://www.linkedin.com/in/dalpatrathore">
        <Button variant={"outline"} size={"icon"}>
          <Code2 className="w-4 h-4 ml-1"></Code2>
        </Button>
      </a>
    </footer>
  );
};
export default Footer;
