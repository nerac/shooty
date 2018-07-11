# Shooty

Take photos of any website every certain time. Useful for quality checks.

[![npm](https://img.shields.io/npm/v/shooty.svg)](https://www.npmjs.com/package/shooty)
[![npm](https://img.shields.io/npm/dw/shooty.svg)](https://www.npmjs.com/package/shooty) [![Greenkeeper badge](https://badges.greenkeeper.io/nerac/shooty.svg)](https://greenkeeper.io/)



## Usage

	> npm i -g shooty
	> shooty --help

	Takes screenshoots of a website every X time

	Usage
		$ shooty <url>

	Options
		--start           Date it will start (optional)
		--stop            Date it will stop (optional)
		--every, -e       Time between every shoot (2m,3h,1d)
		--limit, -l       Number of photos to maintain (optional)
		--fullpage, -f    Shoot the entire page not only the viewport (default: false)
		--mobile, -m      Enforces a mobile user agent (default: true)
		--version         Displays current version
		--help            Displays help

	Examples
		$ shooty https://google.com --every 1h
		$ shooty https://google.com --every 3m --start "10 Jul 2018 22:09:00 GMT+4" --stop "11 Jul 2018 22:09:00 GMT+4"


## Features

- [X] Set a start date
- [X] Set a stop date
- [ ] Limit the number of images generated

## Contribute

Feel free to fork, open issues or share any kind of suggestion.
