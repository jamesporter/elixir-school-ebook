# elixir-school-ebook

MVP generation of an ebook (epub) version of [Elixir School](https://elixirschool.com/)

Sample output:

https://github.com/jamesporter/elixir-school-ebook/raw/master/elixir-school-sample.epub

```
git clone --recursive git@github.com:jamesporter/elixir-school-ebook.git
```
(Note the recursive flag as using git submodule for [Elixir School (repo)](https://github.com/doomspork/elixir-school
this does the easy part!) You might want to swap out language etc (see config.json) before generating.

NPM:

```
npm i
npm run epub
```

Yarn:

```
yarn
yarn run epub
```

Should generate epub in `dist`

Proof of concept, currently depending on forked version of `epub-gen`. But it seems to work nicely for my Kindle! 

See https://github.com/elixirschool/elixirschool/issues/1039 which includes mention of an Elixir approach to this (but not sure if implementation... as a relative newcomer to Elixir it was way easier to build in Node.js!)
