import {JBadge} from "@ben-ryder/jigsaw-react";
import type {BlogPostTag, ProjectTag} from "@lib/api/types/content/tag.ts";

import "./CardComplex.scss"

export interface CardComplexProps {
	link: string
	title: string
	description: string
	tags: ProjectTag[] | BlogPostTag[]
	releasedAt?: string
	publishedAt: string
	updatedAt?: string
}


export function CardComplex(props: CardComplexProps) {
	return (
		<div className="card-complex">
			<a href={props.link} className="card-complex__link-wrapper">
				<h3 className="card-complex__title">{props.title}</h3>
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
				<div className="card-complex__timestamps">
					{!props.releasedAt &&
							<p className="card-complex__timestamp-published">{`Published ${props.publishedAt}`}</p>
					}
					{props.releasedAt &&
							<p className="card-complex__timestamp-released">{`Released ${props.releasedAt}`}</p>
					}
					{props.updatedAt &&
							<p className="card-complex__timestamp-updated">{`Updated ${props.updatedAt}`}</p>
					}
				</div>
			</a>
		</div>
	)
}
