# project-x

Scraping Youtube videos Information. Application built using Node.js, Express, Mongoose, MongoDB.

## Index
+ [Demo](#demo)
+ [Features](#features)
+ [Installation](#installation)
+ [How It Works](#how-it-works)
+ [Support](#support)
+ [Contribute](#contribute)

## Demo<a name="demo"></a>
Check [Demo](https://naveen-project-x.herokuapp.com/)

## Features<a name="features"></a>
+ Uses Express as the application Framework.
+ Uses [MongoDB](https://github.com/mongodb/mongo), [Mongoose](https://github.com/Automattic/mongoose) for storing and querying data.


## Installation<a name="installation"></a>
### Running Locally
Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

1. Clone or Download the repository

    ```
	$ git clone https://github.com/naveenvprakash/project-x
	$ cd project-x

	```

2. Install Dependencies

	```
	$ npm install
	```
2. Edit configuration file in project-x/config/ with your credentials.

3. Start the application

	```
	$ npm start
	```
Your app should now be running on [localhost:3000](http://localhost:3000/).

### Deploying to Heroku
Make sure you have the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

1. Create a new Heroku application, and push your chat application to a Git remote repository

	```
	$ heroku create
	$ git push heroku master
	```

2. Open your application in the browser

	```
	$ heroku open
	```

## How-it-works<a name="how-it-works"></a>

### Database<a name="database"></a>
Mongoose is used to interact with a MongoDB that's hosted in Amazon EC2(check config for details). To run it locally change the mongoDb host to "localhost".

#### Schemas
There is only one schema right now; mediaData.

#### Models<a name="models"></a>
Each model wraps Mongoose Model object, overrides and provides some methods. 'MediaRepo'.

## API

Try Hitting this API, This end-point triggers the scraping and data is saved to DB since its Huge amount of Data (1000000 and more docs) pagination is handled and Loops through every page till end. Since Youtube provides only 50 docs per page. Script runs for longtime.

You can view some of the Data in logs, if you running locally.

check Heroku logs for live Application.

```
GET:: HOST/api/scraper
```
```
GET:: https://naveen-project-x.herokuapp.com/api/scraper
```

## Support <a name="support"></a>
I've written this script as an Assignment. If you find it useful, please support the project by spreading the word.

## Contribute <a name="contribute"></a>

Contribute by creating new issues, sending pull requests on Github or you can send an email at: naveenvprakash@gmail.com
