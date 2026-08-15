# Content

The content for benryder.me is loaded from markdown files saved in the `content` folder.  
In local development these can be manually added or symlinked, however for production build files are downloaded for S3-compatible object storage during the build.

## Content Structure
The content folder must use the following file structure:
- Top-level directory structure as desired, for example environment directories like `live` and `dev`. The directory to use for the build is set in the front-end via `CONTENT_SOURCE_DIRECTORY`
- Each source directory MUST contain:
  - `home.md `- Contents to display in the homepage "greeter"
  - `pages/` - Pages
  - `projects/` - Projects
  - `guides/` - Guides
  - `blog-posts/` - Blog posts
  - All content folders SHOULD either contain:
    - a markdown file like `post1.md`
    - or a directory structure like so:
      - `/post1`
        - `post1.md`
        - `assets/`
          - `image-1.png`
          - `image-2.png`
  - All other content like header/footer links, social links, contact page etc is hardcoded.

### Example
```
/live
	home.md
	pages/
		about.md
		privacy-policy.md
		..
	projects/
		project-one.md
		project-two/
			/assets
				image-1.png
			project-two.md
		project-three.md
	blob-posts/
		post-1/
			/assets
				image-1.png
			post-1.md
		post2.md
/testing
	....
```

## Build
During the front-end build the entire source directory is downloaded into the local filesystem and then used to statically generate content.

Images should be referenced relatively within content file (`./assets/image1.png`) so they work normally in markdown editors.  
The build process will handle these paths and build/bundle the images as required for the website.
