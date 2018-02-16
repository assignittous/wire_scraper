var htmlFile, htmlElements, cheerio, currentSeason, fs, jsonexport;

// set up dependencies
cheerio = require('cheerio'); // cheerio lets you use jquery like functions to parse and traverse the dom of html data
fs = require("fs-extra"); // is a little better than vanilla file library
jsonexport = require('jsonexport'); // library used to export the csv

// load the html file from the scrape
htmlFile = fs.readFileSync("./wire_episodes.html", {
  encoding: 'utf8'
});

// set it up for cheerio
htmlElements = cheerio.load(htmlFile);

// the lines of the csv file
outputArray = []

// find the coontainers for each episode

episodes = htmlElements(".vevent");

// since the episodes are in a table that don't have an identifier for the season,
// we can just increment the season number every time the loop encounters a season episode #1
currentSeason = 0

episodes.each(function(index, item) { // iterate through each of the episodes

    var element, episode, row;
    element = cheerio.load(item); // make each episode container parseable with cheerio

    // get the episode # for the season
    episode = parseInt(element("td").first().text())

    if (episode == 1) { // check if the episode is the first in its season
      currentSeason++; // increment by 1
    }

    story_by = element("td").eq(3).text().split("\n")[0];
    teleplay_by = element("td").eq(3).text().split("\n")[1];
    viewers = parseFloat(element("td").eq(5).text().replace(/\[.*\]/g, "")) * 1000000;

    row = {
      series_episode: parseInt(element("th").text()),
      season: currentSeason,
      season_episode: episode,
      title: element("td").eq(1).text().replace(/"/g,""),
      title_link: element("td").eq(1).children("a").attr("href"),
      directed_by: element("td").eq(2).text(),
      story_by: story_by.substr(11),
      teleplay_by: (teleplay_by == undefined ? null : teleplay_by.substr(14)),
      air_date: element("td").eq(4).children("span").children(".dtstart").text(),
      viewers: (isNaN(viewers) ? null : viewers)
    }
    console.log(row);
    outputArray.push(row);
});


// note: jsonexport automatically:
// * injects a header at the top of the csv file
// * handles nulls
// * puts quotation marks around strings as necessary

jsonexport(outputArray, function(err, csv) {
  if (err) {
    return console.log(err);
  } else {
    return fs.writeFileSync("./wire_episodes.csv", csv);
  }
});

