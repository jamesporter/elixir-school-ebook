const frontMatter = require("front-matter"),
  marked = require("marked"),
  Epub = require("epub-gen"),
  highlight = require("highlightjs"),
  fs = require("fs"),
  commander = require("commander");

const config = JSON.parse(fs.readFileSync('config.json'));
const css = fs.readFileSync('code.css').toString();

commander
  .option('-l, --language <language_code>', 'Set language code', config.language)
  .parse(process.argv);
const language_code = commander.language;

marked.setOptions({
  highlight: code => highlight.highlightAuto(code).value
});

const loadContent = () => {

  let data = [];

  const rootDirectoryPath = config.root + language_code + "/lessons/";
  config.subdirectories.forEach( (s, sIdx) => {
    const subdirectoryPath = rootDirectoryPath + s;
    if (!fs.existsSync(subdirectoryPath)) return;
    const fileNames = fs.readdirSync(subdirectoryPath);
    fileNames.forEach( f => {
      data.push(processRawFile(fs.readFileSync(subdirectoryPath + "/" + f).toString(), s, sIdx));
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
  const html = marked.parse(cleanedBody);

  return {
    sectionIdx,
    sectionName,
    attributes,
    html
  }
};

const convertToEpub = (data, outputFilename) => {
  const options = {
    title: "Elixir School",
    author: "Sean Callan",
    css,
    content: data.map(d => ({
      title: d.attributes.title,
      data: d.html,
      rawData: d.html
    }))
  };

  new Epub(options, outputFilename).promise.then(
    () => console.log("Elixir School epub Generated Successfully"),
    err => console.error("Failed:", err)
  );
};

if (!fs.existsSync(config.output)) fs.mkdirSync(config.output);
const data = loadContent();
convertToEpub(data, config.output + "/elixir-school_" + language_code + ".epub");