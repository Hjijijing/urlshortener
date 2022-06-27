# urlshortener

Simple url shortener using mongoose and epxress.

## Env variables

| Variable Name | Description |
| --- | --- |
| MONGODB_URI | Connection URI to MongoDB database |
| API_KEY | Key for creating new urls via post request to /api |
| PORT | The port to run on (most likely 80 or 443)

## Creating new urls

To create a new url, send a POST request to /api with the following headers:

| Header | Value |
| --- | --- |
| Content-Type | application/json |
| Authorization | Basic \<API-KEY> |

Where API-KEY is the key you set in the environment variables

The body should be json and look and follow this format:

```json
{
    "fullUrl": "https://example.com",
    "shortUrl": "example"
}
```

With the above code the path /example will redirect to https://example.com
