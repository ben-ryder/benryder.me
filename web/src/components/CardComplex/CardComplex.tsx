import {JBadge} from "@ben-ryder/jigsaw-react";
import type {BlogPostTag, ProjectTag} from "@lib/api/types/content/tag.ts";

import "./CardComplex.scss"
import {formatTimestamp} from "@lib/api/utils/format-timestamp.ts";

export interface CardComplexProps {
	link: string
	title: string
	description: string
	tags: ProjectTag[] | BlogPostTag[]
	dateCreated: string
	dateUpdated?: string
	datePublished?: string
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
					{props.datePublished
						? <p className="card-complex__timestamp-published">{`Published ${formatTimestamp(props.datePublished)}`}</p>
						: <p className="card-complex__timestamp-created">{`Created ${formatTimestamp(props.dateCreated)}`}</p>
					}
					{props.dateUpdated &&
							<p className="card-complex__timestamp-updated">{`Updated ${formatTimestamp(props.dateUpdated)}`}</p>
					}
				</div>
			</a>
		</div>
	)
}
