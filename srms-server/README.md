# Student Result Management System

REST APIs for a Student Result Management System.

### Technologies
    NodeJs
    ExpressJs
    Typescript
    Sqlite3

## To Start

### Install dependencies

    yarn install

### Run database migration

    yarn migrate:run

### Start local server on http://localhost:8000

    yarn start

## To run tests

    yarn test

## REST API

The REST APIs for the SRMS are described below:

## Get a list of Students

### Request

`GET /api/v1/students`

    curl -i -H 'Accept: application/json' http://localhost:8000/api/v1/students

### Response
    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 43
    Date: Fri, 28 Apr 2023 01:19:55 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"status":"success","data":{"students":[{id...}]}

## Create a new Student

### Required Params
    firstName: string
    familyName: string
    birthDate: string
    email: string

### Request

`POST /api/v1/students`

    curl -i -H 'Accept: application/json' -d 'firstName=John&familyName=Doe&email=john@mail.com&birthDate=1990-11-3' http://localhost:8000/api/v1/students

### Response

    HTTP/1.1 201 Created
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 36
    Date: Fri, 28 Apr 2023 01:19:55 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"status":"success","data":{"id":1}}

## Delete a Student

### Required Params
    studentId: string

### Request

`DELETE /api/v1/students/{studentId}`

    curl -X DELETE http://localhost:8000/api/v1/students/2	-H "Accept: application/json"

### Response

    HTTP/1.1 204 No Content
    Date: Fri, 28 Apr 2023 01:19:55 GMT
    Status: 204 No Content
    Connection: close

## Get a list of Courses
### Request

`GET /api/v1/courses`

    curl -i -H 'Accept: application/json' http://localhost:8000/api/v1/courses
### Response
    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 43
    Date: Fri, 28 Apr 2023 01:19:55 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"status":"success","data":{"courses":[{id...}]}

## Create a new Course

### Required Params
    title: string

### Request

`POST /api/v1/students`

    curl -i -H 'Accept: application/json' -d 'title=Biology' http://localhost:8000/api/v1/courses

### Response

    HTTP/1.1 201 Created
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 36
    Date: Sun, 30 Apr 2023 01:30:13 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"status":"success","data":{"id":1}}

## Delete a Course

### Required Params
    courseId: string

### Request

`DELETE /api/v1/students/{courseId}`

    curl -X DELETE http://localhost:8000/api/v1/courses/1	-H "Accept: application/json"

### Response

    HTTP/1.1 204 No Content
    Date: Fri, 28 Apr 2023 01:19:55 GMT
    Status: 204 No Content
    Connection: close

## Get a list of Results

### Request

`GET /api/v1/students`

    curl -i -H 'Accept: application/json' http://localhost:8000/api/v1/results

### Response
    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 43
    Date: Fri, 28 Apr 2023 01:19:55 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"status":"success","data":{"results":[{id...}]}

## Create a new Result

### Required Params
    studentId: string
    courseId: string
    scord: "A|B|C|D|E|F"

### Request

`POST /api/v1/students`

    curl -i -H 'Accept: application/json' -d 'courseId=1&studentId=1&score=A' http://localhost:8000/api/v1/results

### Response

    HTTP/1.1 201 Created
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 36
    Date: Sun, 30 Apr 2023 01:30:13 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"status":"success","data":{"id":1}}

## Invalid URLs

### Request

`POST /api/v1/invalid`

    HTTP/1.1 404 Not Found
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 36
    Date: Sun, 30 Apr 2023 01:30:13 GMT

### Response

    {"status":"404","reason":"Not found"}
