const frontMatter = require("front-matter"),
  marked = require("marked"),
  epub = require("epub-gen"),
  fs = require("fs");

const config = JSON.parse(fs.readFileSync('config.json'));

const loadContent = () => {

  let data = [];

  config.subdirectories.forEach( s => {
    console.log("**", s);

    const fileNames = fs.readdirSync(config.root + s);
    fileNames.forEach( f => {
      data.push(processRawFile(fs.readFileSync(config.root + s + "/" + f).toString()));
    })
  });
  console.log(data);
};

const processRawFile = content => {

  const {body, attributes} = frontMatter(content);

  return {
    attributes,
    html: marked.parse(body)
  }
};


loadContent();