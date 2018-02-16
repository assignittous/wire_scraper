# The Wire Scraper


## Overview

This set of sample scripts scrapes episodes from the Wikipedia page for the Wire to show you the basics of scraping and parsing using NodeJS and Javascript.


## How It Works

The first script, `scrape.js`, simply saves a URL to a file (`wire_episodes.html`) for parsing. You can just as easily use a `curl` statement to do the same thing, but Windows users may not have `curl` on their machines, so just doing it in a script makes it easier.

The second script, `parse.js`, opens up `wire_episodes.html` and traverses the document object model (DOM) using `cheerio`, which uses Jquery-like selectors. After parsing the data out of `wire_episodes.html`, it saves the data into `wire_episodes.csv` for import into Excel, Access or some other data tool.


## Things I'm Assuming You've Done

1. Installed NodeJS on your local machine (Get it here: https://nodejs.org/en/ the LTS version is fine)
2. Installed a text editor like Atom, Visual Studio Code, Notepad++ or TextWrangler. Any good code editor will do.


## Things I'm Assuming You Know

1. Some Javascript familiarity
2. Some familiarity with Jquery (jquery.com)
3. How to run a command in a terminal or DOS window


## Pre-Flight Tasks

Using a shell or DOS prompt, install the required dependencies

`cd {into the folder you unzipped wire_scraper}`

For example:

`cd c:\Downloads\wire_scraper`

If you extracted the zipfile to c:\Downloads\

After that, enter this command:

`npm install`

This should take a minute or less. In the unlikely event that the command gneerates warnings, you can ignore them. If you get an error, you may have a problem related to your Node install.

## Run Each script

`node scrape.js`

This will make an http request to Wikipedia's page for The Wire episodes, and save the page as HTML locally. The reason why this script is split from the parsing script is to be nice and not flood Wikipedia with unnecessary requests. *You only need to run this script once.*

`node parse.js`

This will parse the html file from the previous step and save the data as csv.
