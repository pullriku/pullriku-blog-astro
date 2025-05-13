<%*
const imageFolderPath = `images/posts/${tp.file.title}`;
const imageFolderFile = tp.app.vault.getAbstractFileByPath(imageFolderPath);
const postPath = `posts/${tp.file.title}.mdx`;
const postFile = tp.app.vault.getAbstractFileByPath(postPath);

await tp.app.vault.delete(imageFolderFile);
await tp.app.vault.delete(postFile);
%>