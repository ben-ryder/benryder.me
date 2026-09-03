# Deploy
The website relies on local markdown content which is hard to access in continuous deployment pipelines, so 
the site is built and deployed manually.

1. [Install the Netlify CLI](https://docs.netlify.com/api-and-cli-guides/cli-guides/get-started-with-cli/#installation)
2. Build the site locally
3. Use the `netlify deploy` command to manually deploy ([learn more](https://docs.netlify.com/api-and-cli-guides/cli-guides/get-started-with-cli/#manual-deploys))
   - `npm deploy --dir=dist`
   - `npm deploy --dir=dist --alias=YOUR_ALIAS`
   - `npm deploy --dir=dist --prod`
 