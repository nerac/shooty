const puppeteer = require('puppeteer');
const meow = require('meow');

const cli = meow(`
	Usage
	  $ shooty <url>

	Options
	  --every, -e       Time between every shoot (2m,3h,1d)
	  --fullpage, -f    Shoot the entire page not only the viewport
	  --mobile, -m      Enforces a mobile user agent
	  --version         Displays current version
	  --help            Displays help

	Examples
	  $ shooty https://google.com --every 1h
`, {
	flags: {
		every: {
			type: 'string',
			alias: 'e',
			default: '1h'
		},
		mobile: {
			type: 'boolean',
			alias: 'm',
			default: true
		},
		fullpage: {
			type: 'boolean',
			alias: 'f',
			default: false
		}
	}
});
const error = (msg) => {
    console.error('\x1b[31m%s\x1b[0m',`\n  Error: ${msg}`);
    cli.showHelp()
}
const isValidUrl = (str) => {
pattern = new RegExp('^(https?:\/\/)');
return pattern.test(str)
}
const extractURL = (input) => {
    let url = input[0] || null;
    if(!url){
        error("you need to specify an URL");
    }
    if(!isValidUrl(url)){
        error("please introduce a valid URL");
    }
    return url;
}
const extractInterval = (time) => {
    if(!/^\d+[mhd]$/.test(flags.every)){
        error("only minutes (5m), hours (1h) and days (2d) are accepted.");
    }
    let letter = time.substr(time.length - 1);
    let number = parseInt(time.substr(0,time.length - 1));
    let multiplier = letter == 'm' && 60 || letter == 'h' && 60*60 || letter == 'd' && 60*60*24;
    return number*1000*multiplier;
}
const shoot = async (url,flags) => {

    try{
      let now = (new Date()).toLocaleTimeString();
      let name = now.replace(/[:]/g,'_')+".png";
      console.log("Taking screenshot at:",now);
      const browser = await puppeteer.launch({ignoreHTTPSErrors:true});
      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(60000);
      if(flags.mobile){
        page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25');
      }
      await page.goto(url);
      await page.screenshot({path: name, fullPage: flags.fullpage});
      await browser.close();
      console.log("Screenshot taken with name:",name);
    }catch(e){
        console.error('\x1b[31m%s\x1b[0m',`\n  ${e}`);
    }

};
const flags = cli.flags;
const url = extractURL(cli.input);
const interval = extractInterval(flags.every);

console.log(`Screenshot of ${url} every ${flags.every}`);
setInterval(shoot.bind(null,url,flags),interval);
shoot(url,flags);
