import {unified} from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSanitize from "rehype-sanitize";

/**
 * Generate HTML for the given markdown
 *
 * @param markdownText
 */
export async function convertMarkdownToHTML(markdownText: string) {
	const file = await unified()
		.use(remarkParse)
		.use(remarkRehype)
		.use(rehypeSanitize)
		.use(rehypeStringify)
		.process(markdownText)

	return String(file)
}
