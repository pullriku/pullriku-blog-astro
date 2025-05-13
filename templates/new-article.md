---
title: 
desc: 
pubDate: "{{date}}"
tags: 
pub: false
---
<%*
const imageFolder = `images/posts/${tp.file.title}`;
const mdPostPath = `posts/${tp.file.title}.md`;
const mdPostFile = tp.app.vault.getAbstractFileByPath(mdPostPath);
const mdxPostPath = `posts/${tp.file.title}.mdx`;

try {
	await tp.app.vault.createFolder(imageFolder);
} catch (e) { console.error(e); }

await tp.app.vault.rename(mdPostFile, mdxPostPath);
// await tp.app.vault.delete(mdPostFile);
%>
import Details from "@layouts/Details.astro";
// 必ずclientディレクティブを設定する
import Quiz from "@components/Quiz";

## 