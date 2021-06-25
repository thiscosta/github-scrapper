# github_scrapper

This project is an api that returns a grouped summary of all files from a given github repository, including file extensions, bytes and number of lines.
<br />

# Executing

There are 2 ways of executing this project: cloning the repository and through docker.
<br />

### Docker

Pull the docker image running the following command: <br /><br/>
<code><b>docker pull thiscosta/github_scrapper</b></code><br /><br/><br/>
And run the image giving the <b>PORT</b> environment, like below: <br /><br/>
<code><b>docker run -e PORT=3000 -p 3000:3000 thiscosta/github_scrapper</b></code><br /><br /><br/>

### From source

Clone the repository and install dependencies with <b>npm install / yarn</b>. <br />
Create a .env file on the root directory with the <b>PORT</b> variable where the application should start, and start the API with <b>npm start / yarn start</b> <br /><br /> <br />

# Making requests

A swagger will be available on the <b>PORT</b> defined environment variable to access the unique API route.

<br /> <br/>

# License
MIT
