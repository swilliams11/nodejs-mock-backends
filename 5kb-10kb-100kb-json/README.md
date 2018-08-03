# Node.js backend API testing
This is a backend server that returns 5kb, 10kb, 100kb payloads.

## Run locally
```
cd 5kb-10kb-100kb-xml-json
npm start
```

or

```
cd 5kb-10kb-100kb-xml-json
node app.js
```

## Test
```
curl http://IP:9000/5kb
curl http://IP:9000/10kb
curl http://IP:9000/100kb
```

```
curl -X POST http://IP:9000/customers -d '{"id": "1", "name":"sam smith"}'
curl -X GET http://IP:9000/customers/1
```
