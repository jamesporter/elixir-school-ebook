# elixir-school-ebook

MVP generation of an ebook (epub) version of [Elixir School](https://elixirschool.com/)


```
git clone --recursive git@github.com:jamesporter/elixir-school-ebook.git
npm i
npm run epub
```

(note the recursive flag as using git submodule for [Elixir School (repo)](https://github.com/doomspork/elixir-school
)

Should generate epub in `dist`

Edit configuration to choose your language etc. (Have only used with default.)

Proof of concept, currently depending on forked version of `epub-gen`. But it seems to work nicely for my Kindle! 
