## &nbsp;GitHub Tree Builder
---------------------
This service returns a JSON of a given repo file tree

## &nbsp; **File structure**
---------------------
```bash
.
├── Services/  
        ├──octokitReq.js # make api calls to git api using the octokit lib
        ├──repoTreeOps.js # operations that are needed to the service of generating a file tree recursively
├── routers/
        ├──controllers.js # take request object, pull out data from request, validate, then send to service(s)
        ├──routes.js # handle the HTTP requests that hits the API and route them to appropriate controller(s)
├── .gitingore/ 
├── package-lock.json
├── package.json
└──  app.js      # the main file, that starts the server                    
```


## &nbsp;**Get Started**
---------------------
### Setup:
```bash
npm install express
npm install dotenv
npm install @octokit/rest
```
in addition, add a .env file to the project, with one param inside: GITHUB_ACCESS_TOKEN= <githubAccessToken>

### Run:
#start a server on default port 3000:
```bash
node app.js
```

#run the following on your browser command line:
http://localhost:3000/github_api/repoTree?owner=YOURUSERNAME&repo=YOURREPONAME
 
 
        

## &nbsp;**Other Notes**
---------------------
1.	note that this solution uses PAT that limits me to 1000 requests per hour to repository. I would use github apps that has higher rate limit.

2.      The assignment required a solution that can be used in production. If I had more time, I would have added:
                a.	Error handling & test (checking the JSONs are valid, validate inputs…) and health check-ins
                b.	Logs management & documentation – I would add a JSON format logs to allow better queries and KPIs measurement down the road.
                c.	We could have used caching to improve the mechanism. For example, I could have set a key-value caching (like Redis) to store the responses of the API requests by their SHAs 


