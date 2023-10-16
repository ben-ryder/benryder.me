import type {CardComplexProps} from "../CardComplex/CardComplex.tsx";
import {CardComplex} from "../CardComplex/CardComplex.tsx";

import "./CardComplexListing.scss"
import type {BlogPostTag, ProjectTag} from "@lib/api/types/content/tag.ts";
import {
	JButton,
	JButtonGroup,
	JForm, JFormContent,
	JFormRow,
	JMultiSelectControl,
	JSelect,
	JSelectControl,
	JProse
} from "@ben-ryder/jigsaw-react";
import type {JMultiSelectOptionData} from "@ben-ryder/jigsaw-react"
import {FormEvent, useState} from "react";

interface CardComplexListingProps {
	title: string
	description: string
	cards: CardComplexProps[]
	tags: ProjectTag[] | BlogPostTag[]
}

function sortCards(cards: CardComplexProps[]) {
	return cards.sort((a, b) => {
		return (b.datePublished || b.dateCreated) - (a.datePublished || a.dateCreated)
	})
}

export function CardComplexListing(props: CardComplexListingProps) {
	const [visibleCards, setVisibleCards] = useState<CardComplexProps[]>(sortCards(props.cards))
	const tagOptions: JMultiSelectOptionData[] = props.tags.map(tag => {
		return {
			text: tag.text,
			value: tag.slug,
			variant: tag.colour
		}
	})
	const [selectedTags, setSelectedTags] = useState<JMultiSelectOptionData[]>([])

	function updateFilters() {
		let filteredCards = [];
		if (selectedTags.length === 0) {
			filteredCards = props.cards
		}
		else {
			const selectedTagSlugs = selectedTags.map(selectedTag => selectedTag.value);

			filteredCards = sortCards(props.cards
				.filter(card => {
					const cardTagSlugs = card.tags.map(tag => tag.slug)
					return selectedTagSlugs.every(tag => cardTagSlugs.includes(tag))
				})
			)
		}

		setVisibleCards(filteredCards)
	}

	function resetFilters() {
		setVisibleCards(props.cards)
		setSelectedTags([])
	}

	return (
		<div className="max-width-container">
			<div className="card-complex-listing">
				<div className="card-complex-listing__content">
					<h2 className="card-complex-listing__title">{props.title}</h2>
					<div className="card-complex-listing__description">
						<JProse>
							<div dangerouslySetInnerHTML={{__html: props.description}} />
						</JProse>
					</div>
				</div>
				<noscript className="noscript card-complex-listing__filters-noscript">
					<p>Javascript is disabled so the filter and sort functionality
					is not currently available. Consider enabling Javascript to
						improve your experience.</p>
				</noscript>
				<form
					className="card-complex-listing__filters js-required"
					onSubmit={(e: FormEvent) => {
						e.preventDefault()
						updateFilters()
					}}
					onReset={(e: FormEvent) => {
						e.preventDefault()
						resetFilters()
					}}
				>
					<JMultiSelectControl
						className="card-complex-listing__filter-tag"
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
					{/*<JSelectControl*/}
					{/*	className="card-complex-listing__filter-sort"*/}
					{/*	label="Sort By"*/}
					{/*	id='sortBy'*/}
					{/*	options={[*/}
					{/*		{*/}
					{/*			text: "Release Date",*/}
					{/*			value: "releaseDate"*/}
					{/*		},*/}
					{/*		{*/}
					{/*			text: "Name",*/}
					{/*			value: "name"*/}
					{/*		},*/}
					{/*	]}*/}
					{/*/>*/}
					<JButtonGroup className="card-complex-listing__filter-buttons">
						<JButton type="reset" variant="secondary">Reset</JButton>
						<JButton type="submit" variant="primary">Filter</JButton>
					</JButtonGroup>
				</form>
				<div className="card-complex-listing__cards">
					{visibleCards.map(card =>
						<CardComplex key={card.link} {...card} />
					)}
				</div>
				{visibleCards.length === 0 &&
            <div className="card-complex-listing__no-cards">
                <p>No Projects Found</p>
                <button onClick={resetFilters}>Reset Filters</button>
            </div>
				}
			</div>
		</div>
	)
}
