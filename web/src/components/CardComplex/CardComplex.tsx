import {JBadge} from "@ben-ryder/jigsaw-react";
import type {BlogPostTag, ProjectTag} from "@lib/api/types/content/tag.ts";

import "./CardComplex.scss"

export interface CardComplexProps {
	link: string
	title: string
	description: string
	tags: ProjectTag[] | BlogPostTag[]
}


export function CardComplex(props: CardComplexProps) {
	return (
		<div className="card-complex">
			<a href={props.link} className="card-complex__link">
				<h3 className="card-complex__title">{props.title}</h3>
			</a>
			<p className="card-complex__description">{props.description}</p>
			{props.tags.length > 0 &&
				<ul className="card-complex__tags">
					{props.tags.map(tag =>
						<li key={tag.slug}>
							<JBadge text={tag.text} variant={tag.colour} />
						</li>
					)}
				</ul>
			}
		</div>
	)
}
