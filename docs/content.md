# Content
The content for benryder.me is loaded from markdown files saved in the root `content` folder.  
In local development these can be manually added or symlinked, however for production builds files are downloaded from S3-compatible object storage during the build.

## Structure
The content folder must use the following file structure:
- `Config`
  - `Feeds.md` - Markdown contents of the /feeds page
  - `Footer.md` - Markdown used for footer copyright, `links` frontmatter for footer links
  - `Header.md` - Markdown ignored (could be alert message in future), `links` frontmatter for header links
  - `Home.md` - Markdown for main home page greeter
  - `Posts.md` - Markdown for /posts page description
  - `Projects.md` - Markdown for /projects page description
- `Pages`
  - `Example.md`
  - `Folder`
    - `Example2.md`
- `Posts`
  - `Post1.md`
  - `Post2`
    - `Post2.md`
    - `assets` (any name but `assets` as convention, images can be references in post via relative path)
      - `image1.png`
- `Projects`
  - `Project1.md`
  - `Project2`
    - `Project2.md`
    - `assets` (any name but `assets` as convention, images can be references in post via relative path)
      - `image1.png`
