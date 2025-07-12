import { execSync } from "node:child_process";
import { Temporal } from "@js-temporal/polyfill";

export type GitLog = {
    hash: string;
    author: string;
    date: string;
    subject: string;
};

export function git_log(filepath: string): GitLog[] {
    const output = execSync(
        `git log --pretty=format:'{"hash":"%H","author":"%an","date":"%ad","subject":"%s"},' -- ${filepath}`,
    ).toString();

    const json = `[${output.trim().replace(/},$/, "}")}]`;

    return JSON.parse(json);
}

export type PostHistory = {
    date: Temporal.Instant;
    subject: string;
};

export function get_post_history(
    id: string,
    isMdx = true,
): PostHistory[] {
    const path = `src/contents/posts/${id}.${isMdx ? "mdx" : "md"}`;

    const result = git_log(path)
        [Symbol.iterator]()
        .map((log) => ({
            date: Temporal.Instant.from(new Date(log.date).toISOString()),
            subject: log.subject,
        }))
        .filter((log) => !log.subject.startsWith("Merge"));
    
    return Array.from(result).reverse();
}
