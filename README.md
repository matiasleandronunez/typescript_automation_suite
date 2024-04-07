# Holistic Testing Approach written mostly in TS with Playwright

This project showcases a holistic testing approach, leveraging mainly Typescript JS and Playwright for API and UI testing. The demonstration site includes a REST API backend using [atsea-sample-shop-app](https://github.com/dockersamples/atsea-sample-shop-app/).

## Setup
### Running in Docker

You only need to have [docker](https://docs.docker.com/engine/install/) and [docker-compose](https://docs.docker.com/compose/install/) installed in your system

Tear down and destroy older volumes if any
```bash
docker-compose down -v
```

To build and run the containers:

```bash
docker-compose up --build --force-recreate
```



### Running from local env
To learn or play with the solution you might want to run the tests from your local environment.
This will require you to install node.js, npm, playwright in whatever flavor is appropriate for your host system
You'll still need docker-engine & docker-compose to boot the sample site up in order to target it:
```
docker-compose -f docker-compose-sample_site_only.yml up -d
```
And set up the following env vars, with the adequate value as per your system's configuration:
```
- BASE_API_URI=http://localhost:8080/api
- BASE_URI=http://localhost:8080/
- HOST_HAS_GUI=true
```

Execute `npm install` and then you can run playwright from command line:
```bash
npx playwright test --reporter=list --config=playwright.config.ts
```

Don't forget to set env vars!
- HOST_HAS_GUI=false
- BASE_API_URL=http://atsea:8080/api/
- BASE_URL=http://atsea:8080/

or simply execute 
```bash
sh ./run_regression.sh
```


For this demo results are reported in list + html formats, with trace and video on for all tests. These can be disabled, or (changed to be appended only on failure for instance) through the configuration file [playwright.config.ts](playwright.config.ts)

You can experiment other configurations such as browsers, workers, etc! Refer to playwright documentation on the matter:
https://playwright.dev/docs/test-configuration

## Notes:
POM pattern is implemented for maintainability