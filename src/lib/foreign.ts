const defaultUserName = "pullriku";

export function zennUrl(
  slug: string,
  username: string = defaultUserName,
): string {
  return `https://zenn.dev/${username}/articles/${slug}`;
}
