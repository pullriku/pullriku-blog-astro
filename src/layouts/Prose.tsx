import type { JSX } from "astro/jsx-runtime";
import "@styles/ProseExt.css";

export interface ProseProps {
    children: JSX.Element | JSX.Element[];
}

export default function Prose({ children }: ProseProps): JSX.Element {
    return (
        <div
            className="prose dark:prose-invert
    prose-h1:font-bold prose-h1:text-4xl prose-h1:my-0
  prose-a:text-blue-600 prose-a:no-underline prose-a:hover:underline dark:prose-a:text-blue-400 
    prose:break-words !max-w-none
    prose-img:rounded-xl prose-img:mx-auto prose-img:object-contain prose-img:max-h-[38rem] prose-img:my-0 prose-img:w-auto prose-img:h-auto prose-img:shadow-lg
  "
        >
            {children}
        </div>
    );
}
