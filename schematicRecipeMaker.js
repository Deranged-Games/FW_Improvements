const fs = require('fs');

var newFile = [`<configs>\n\t<append xpath="/recipes">`];
fs.readFile(`Z:/Steam/steamapps/common/7 Days To Die/Data/Config/items.xml`, "utf8", function(err, data) {
  if(err) throw err;
  var commented = false;
  
  lines = data.split('\n');
  for(var i in lines){
	//Code to handle commented sections.
	if(!commented && lines[i].indexOf("<!--") != -1) commented = true;
    if(commented && lines[i].indexOf("-->") != -1){commented = false; continue;}
	if(commented) continue;

	//Read schematics, create xml needed, and add to list.
    if(lines[i].indexOf('Schematic">') == -1) continue;
	var schematicName = lines[i].split('"')[1];
	
	newFile.push(`\t\t<recipe name="${schematicName}" count="2"><ingredient name="resourcePaper" count="5"/><ingredient name="resourceCoal" count="1"/><ingredient name="${schematicName}" count="1"/></recipe>`);
  }
  newFile.push(`\t</append>\n</configs>`);

  fs.writeFile(`Z:/Steam/steamapps/common/7 Days To Die/mods/FW_Improvements/Config/schematics.xml`, newFile.join('\n'), function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
});


