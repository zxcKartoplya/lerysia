<script setup lang="ts">
const postcard = useAppConfig().postcard

const hasSongLink = computed(() =>
	Boolean(postcard.hero.secondaryActionHref.trim()),
)

const isExternalLink = (href: string) => /^https?:\/\//.test(href)

useHead(() => ({
	title: postcard.seo.title,
	meta: [
		{ name: 'description', content: postcard.seo.description },
		{ property: 'og:title', content: postcard.seo.title },
		{ property: 'og:description', content: postcard.seo.description },
		{ property: 'og:type', content: 'website' },
	],
}))
</script>

<template>
	<main class="page-shell">
		<section class="panel hero-panel">
			<div class="hero-copy">
				<p class="eyebrow">
					{{ postcard.hero.overline }}
				</p>
				<h1>{{ postcard.hero.title }}</h1>
				<p class="lead">
					{{ postcard.hero.subtitle }}
				</p>
			</div>

			<div class="hero-frame">
				<img
					class="hero-image"
					:src="postcard.hero.imageSrc"
					:alt="postcard.hero.imageAlt"
				/>
			</div>

			<div class="journey-grid">
				<article class="mini-card">
					<span class="mini-card__label">{{ postcard.hero.fromLabel }}</span>
					<strong class="mini-card__value">{{
						postcard.hero.fromValue
					}}</strong>
				</article>

				<article class="mini-card">
					<span class="mini-card__label">{{ postcard.hero.toLabel }}</span>
					<strong class="mini-card__value">{{ postcard.hero.toValue }}</strong>
				</article>
			</div>

			<div class="button-row">
				<a
					class="button button-primary"
					:href="postcard.hero.primaryActionHref"
				>
					{{ postcard.hero.primaryActionLabel }}
				</a>

				<a
					v-if="hasSongLink"
					class="button button-secondary"
					:href="postcard.hero.secondaryActionHref"
					:target="
						isExternalLink(postcard.hero.secondaryActionHref)
							? '_blank'
							: undefined
					"
					:rel="
						isExternalLink(postcard.hero.secondaryActionHref)
							? 'noreferrer'
							: undefined
					"
				>
					{{ postcard.hero.secondaryActionLabel }}
				</a>
			</div>
		</section>

		<section class="panel section-panel">
			<div class="section-heading">
				<p class="section-kicker">{{ postcard.intro.title }}</p>
			</div>

			<p class="body-copy">
				{{ postcard.intro.text }}
			</p>
		</section>

		<CountdownPanel
			v-if="postcard.hero.meetingDate"
			:label="postcard.hero.meetingLabel"
			:past-label="postcard.hero.meetingPassedLabel"
			:date="postcard.hero.meetingDate"
		/>

		<section class="panel section-panel">
			<div class="section-heading">
				<p class="section-kicker">Фото</p>
				<h2>{{ postcard.galleryTitle }}</h2>
				<p class="section-description">
					{{ postcard.galleryText }}
				</p>
			</div>

			<div class="gallery-grid">
				<article
					v-for="photo in postcard.gallery"
					:key="photo.src"
					class="photo-card"
				>
					<div class="photo-frame">
						<img :src="photo.src" :alt="photo.alt" />
					</div>
					<p class="photo-caption">
						{{ photo.caption }}
					</p>
				</article>
			</div>
		</section>

		<section class="panel section-panel">
			<div class="section-heading">
				<p class="section-kicker">Слова</p>
				<h2>{{ postcard.missYouTitle }}</h2>
			</div>

			<div class="memory-grid">
				<article
					v-for="item in postcard.missYou"
					:key="item.title"
					class="memory-card"
				>
					<h3>{{ item.title }}</h3>
					<p>{{ item.text }}</p>
				</article>
			</div>
		</section>

		<section id="letter" class="panel section-panel">
			<div class="section-heading">
				<p class="section-kicker">Письмо</p>
				<h2>{{ postcard.letter.title }}</h2>
			</div>

			<div class="letter-copy">
				<p v-for="paragraph in postcard.letter.paragraphs" :key="paragraph">
					{{ paragraph }}
				</p>
			</div>
		</section>

		<section class="panel section-panel">
			<div class="section-heading">
				<p class="section-kicker">скууууучаю</p>
				<h2>{{ postcard.reasonsTitle }}</h2>
			</div>

			<ol class="reasons-list">
				<li
					v-for="(reason, index) in postcard.reasons"
					:key="reason"
					class="reason-item"
				>
					<span class="reason-index">{{
						String(index + 1).padStart(2, '0')
					}}</span>
					<span class="reason-text">{{ reason }}</span>
				</li>
			</ol>
		</section>

		<RevealNote
			:title="postcard.secretNote.title"
			:button-label="postcard.secretNote.buttonLabel"
			:paragraphs="postcard.secretNote.paragraphs"
		/>

		<footer class="panel footer-panel">
			<p class="footer-signature">
				{{ postcard.footer.signature }}
			</p>
			<p class="footer-note">
				{{ postcard.footer.note }}
			</p>
		</footer>
	</main>
</template>
