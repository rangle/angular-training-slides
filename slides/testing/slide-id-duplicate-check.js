const fs = require('fs');
let allMarkdownFiles;
let duplicates = new Set();
let allIds = new Set();

var Table = require('cli-table');

var table = new Table({
  head: ['Duplicated Id', 'File Names']
  , colWidths: [50, 25]
});

fs.readdir('./src/content', (err, files) => {

  // get all the slide markdown files in content folder
  allMarkdownFiles = files.filter(file => file.indexOf('.md') !== -1);

  // look at each file and get the id's
  flatAllIdsByFile = allMarkdownFiles.map(mdFile => {
    content = fs.readFileSync('./src/content/' + mdFile, 'utf8');
    return {
      fileName: mdFile,
      allIds: content.match(/<!-- .slide: id.*-->/g)
    }
  }).map(item => {
    return (item.allIds || []).map(id => {
      return {
        fileName: item.fileName,
        slideId: id
      };
    });
  }).reduce((acc, curr) => {
    return [...acc, ...curr];
  }, []);

  // create list of duplicates
  flatAllIdsByFile.forEach(currentValue => {
    if (allIds.has(currentValue.slideId)) {
      duplicates.add(currentValue.slideId);
    };
    allIds.add(currentValue.slideId);
  });

  // format the result for output
  const result = [...duplicates].map(duplicate => {
    return {
      id: duplicate,
      files: flatAllIdsByFile.filter(allId => {
        return allId.slideId === duplicate;
      }).map(item => item.fileName)
    };
  });

  // using result determine pass/fail
  if (duplicates.size) {
    result.forEach(r => table.push([r.id, r.files.join('\n')]));
    console.log(table.toString());
    process.exit(1);
  }
  process.exit(0)



});
