# Workin on my personal webpage
## It's a work in progress...

## Some notes
* Right now, this App / site is using React's HashRouter. I'd much rather prefer to use BrowserRouter, but due to some oddities with gh-pages and apps using React Router I've opted to use HashRouter for the time being.
* Right now, I'm declaring the PUBLIC directory for use with resource requests (things like images): `const PUBLIC = process.env.PUBLIC_URL;`