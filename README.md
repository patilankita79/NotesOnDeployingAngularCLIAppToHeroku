# Notes on Deploying Angular CLI application To Heroku
Steps to be followed for deploying Angular CLI application to Heroku. <br>
Heroku is a cloud platform as a service.
<hr>
<strong>Step 1:</strong> <br>
<li>Create an account on Heroku</li> <br>
<strong>Step 2:</strong> <br>
Login the Heroku account.
Click new -> Create new app -> Give app name.
<br>
<img src = "https://github.com/patilankita79/Notes_DeployingAngularCLIAppToHeroku/blob/master/Screenshots_DeployAppToHeroku/Screenshot%202017-09-25%2020.22.23.png" />
<img src = "https://github.com/patilankita79/Notes_DeployingAngularCLIAppToHeroku/blob/master/Screenshots_DeployAppToHeroku/Screenshot%202017-09-25%2020.22.41.png" />
<br>
<strong>Step 3:</strong> <br>
Select the deployment method out of Heroku Git, GitHub, dropbox. <br>
I have used Heroku Git (Usig Heroku CLI) as a deployment method. <br>
Download and install <a href = "https://devcenter.heroku.com/articles/heroku-cli">Heroku CLI</a> <br>
<strong>Step 4:</strong> <br>
Before deploying angular application to Heroku, we need to configure angular application. <br>

<h2>Configure Angular Application </h2>

<strong>Make the following changes in package.json </strong> <br>

Heroku will install all the dependencies that are present in "dependencies" attribute. 
Move following dependecies from "devDependencies" to "dependencies"
```
"@angular/compiler": "^4.2.4",
    "@angular/compiler-cli": "^4.2.4",
    "typescript": "~2.3.3"
```
        
Now change the the values in "scripts" attributes". Heroku will look either for "preinstall" or "postinstall" in "scripts" <br>
<strong>Main concern: </strong> What will happen after dependencies are installed <br>

Add following in "scripts"
```
"postinstall": "ng build --aot --target=production"
```
<br>
ng build command creates the compiled version in <strong>dist</strong> folder.
<br>
Add "engines" attribute in package.json and sppecify node and npm versions that you have used to build application. This will prevent the version issues.

To check node and npm versions,<br>
<img src = "https://github.com/patilankita79/Notes_DeployingAngularCLIAppToHeroku/blob/master/Screenshots_DeployAppToHeroku/NodeNpmVersionInfo.png" />

```
"engines": {
    "node": "6.11.2",
    "npm": "3.10.10"
  }
```

<br>
For reference, I have attached <a href="https://github.com/patilankita79/Notes_DeployingAngularCLIAppToHeroku/blob/master/package.json">package.json</a> of an angular application
<strong>Step 5: Create Node Server</strong>
Create a <strong>node server</strong> that will serve the compiled files in dist directory. For that we will use<strong> Express</strong> <br>
Run the following command in the project directory

```
$npm install --save express
```

This will add dependencies in package.json of angular application<br>
<strong>Express server: </strong>Create server.js in the root directory of angular application

```
const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist'));

app.listen(process.env.PORT || 8080);

//Path Location Strategy

app.get('/*', function(req, res) {
res.sendFile(path.join(__dirname + '/dist/index.html'));
})
```
For reference, I have attached <a href="">server.js</a>
<br>
To tell Heroku to run server.js when application starts, we need to add server.js in package.json
<br>
In "scripts" attribute,
 change "start": "ng serve" to "start": "node server.js",
 
```
 "start": "node server.js"
 ```
<br>
<strong>Step 6: Deploying app to Heroku</strong>
<br>In project directory, run the following command,

```
$git init
```

```
heroku login
```

```
heroku git:remote -a heroku-project-name
```

```
git add .
```

```
git commit -m "initial heroku commit"
```

```
git push heroku master
```

After the push is complete, you can see the URL of your deployed application..

