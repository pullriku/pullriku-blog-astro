import { execSync } from "node:child_process";
import dayjs from "dayjs";

export type GitLog = {
  hash: string;
  author: string;
  date: string;
  subject: string;
};

export function gitLog(filepath: string): GitLog[] {
  const output = execSync(
    `git log --pretty=format:'{"hash":"%H","author":"%an","date":"%ad","subject":"%s"},' -- ${filepath}`,
  ).toString();

  const json = `[${output.trim().replace(/},$/, "}")}]`;

  return JSON.parse(json);
}

export type PostHistory = {
  date: dayjs.Dayjs;
  subject: string;
};

export function getPostHistory(id: string, isMdx: boolean): PostHistory[] {
  const path = `src/contents/posts/${id}.${isMdx ? "mdx" : "md"}`;

  const iter = gitLog(path)
    [Symbol.iterator]()
    .filter((log) => !(log.subject.startsWith("Merge") || log.subject.startsWith("article:ignore-history")))
    .map((log) => {
      const subject = log.subject;
      const index = subject.indexOf(":");
      return {
        date: dayjs(log.date),
        subject:
          index !== -1 ? subject.slice(index + 1).trim() : subject.trim(),
      };
    });

  const sorted = Array.from(iter).reverse();

  const pubIndex = sorted.findIndex((log) => log.subject.startsWith("公開"));
  let result: PostHistory[];
  if (pubIndex) {
    result = sorted.slice(pubIndex);
  } else {
    result = sorted;
  }

  return result;
}
