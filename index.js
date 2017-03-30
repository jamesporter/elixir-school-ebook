const frontMatter = require("front-matter"),
  marked = require("marked"),
  Epub = require("epub-gen"),
  fs = require("fs");

const config = JSON.parse(fs.readFileSync('config.json'));



const loadContent = () => {

  let data = [];

  config.subdirectories.forEach( (s, sIdx) => {
    console.log("**", s);

    const fileNames = fs.readdirSync(config.root + s);
    fileNames.forEach( f => {
      data.push(processRawFile(fs.readFileSync(config.root + s + "/" + f).toString(), s, sIdx));
    })
  });

  return data.sort((a,b) => {
    if(a.sectionIdx < b.sectionIdx) {
      return -1;
    } else if(a.sectionIdx > b.sectionIdx) {
      return 1;
    } else {
      return a.attributes.order - b.attributes.order;
    }
  });
};

const processRawFile = (content, sectionName, sectionIdx )=> {

  const {body, attributes} = frontMatter(content);
  //one slightly ugly hack to get rid of jekyll toc include
  const cleanedBody = body.replace("{% include toc.html %}", "");

  return {
    sectionIdx,
    sectionName,
    attributes,
    html: marked.parse(cleanedBody)
  }
};

const convertToEpub = (data, outputFilename) => {
  const options = {
    title: "Elixir School",
    author: "Sean Callan",
    content: data.map(d => ({
      title: d.attributes.title,
      author: "Sean Callan",
      data: d.html
    }))
  };

  new Epub(options, outputFilename).promise.then(
    () => console.log("Elixir School epub Generated Successfully"),
    err => console.error("Failed:", err)
  );
};

if (!fs.existsSync(config.output)) fs.mkdirSync(config.output);
const data = loadContent();
convertToEpub(data, config.output + "/elixir-school.epub");