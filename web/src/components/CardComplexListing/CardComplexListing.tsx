import type {CardComplexProps} from "../CardComplex/CardComplex";
import {CardComplex} from "../CardComplex/CardComplex";

import "./CardComplexListing.scss"
import type {BlogPostTag, ProjectTag} from "@lib/api/types/content/tag.ts";
import {JMultiSelectControl, JSelect, JSelectControl} from "@ben-ryder/jigsaw-react";
import type {JMultiSelectOptionData} from "@ben-ryder/jigsaw-react"
import {useState} from "react";

interface CardComplexListingProps {
	title: string
	description: string
	cards: CardComplexProps[]
	tags: ProjectTag[] | BlogPostTag[]
}

export function CardComplexListing(props: CardComplexListingProps) {
	const [cards, setCards] = useState<CardComplexProps[]>(props.cards);

	const tagOptions: JMultiSelectOptionData[] = props.tags.map(tag => {
		return {
			text: tag.text,
			value: tag.slug,
			variant: tag.colour
		}
	})
	const [selectedTags, setSelectedTags] = useState<JMultiSelectOptionData[]>([])

	return (
		<div className="max-width-container">
			<div className="card-complex-listing">
				<div className="card-complex-listing__content">
					<h2 className="card-complex-listing__title">{props.title}</h2>
					<p className="card-complex-listing__description">{props.description}</p>
				</div>
				<noscript className="noscript card-complex-listing__filters-noscript">
					<p>Javascript is disabled so the filter and sort functionality
					is not currently available. Consider enabling Javascript to
						improve your experience.</p>
				</noscript>
				<div className="card-complex-listing__filters js-required">
					<JMultiSelectControl
						id="tags"
						label="Filter By Tags"
						searchText="Search or select tags..."
						options={
							tagOptions.filter(tag => {
								for (const selectedTag of selectedTags) {
									if (tag.value === selectedTag.value) {
										return false;
									}
								}
								return true
							})
						}
						selectedOptions={selectedTags}
						setSelectedOptions={setSelectedTags}
					/>
					<JSelectControl
						label="Sort By"
						id='sortBy'
						options={[
							{
								text: "Release Date",
								value: "releaseDate"
							},
							{
								text: "Name",
								value: "name"
							},
						]}
					/>
				</div>
				<div className="card-complex-listing__cards">
					{props.cards.map(card =>
						<CardComplex key={card.link} {...card} />
					)}
				</div>
			</div>
		</div>
	)
}
