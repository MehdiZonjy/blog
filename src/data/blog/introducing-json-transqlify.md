---
author: Mehdi Zonjy
pubDatetime: 2018-03-29T16:56:00Z
title: "Introducing Json Transqlify"
slug: introducing-json-transqlify
featured: false
draft: false
tags:
  - javascript
  - nodejs
  - json-transqlify
description: "Introducing Json Transqlify - a tool for querying JSON with SQL-like syntax."
---

Earlier this year I participated in a hackathon in the company where I work. The idea was to transfer data from a Mongodb to a MySQL db to fulfill some business requirements. I needed to apply some transformations on the JSONs and validation. Each record was to be decomposed and normalized into multiple tables.  I needed to Update or Insert a record depending on some conditions.

It became apparent to me that alot of the code I wrote could be abstracted into a library that handles most of the common logic flow. The idea kept brewing in the back of my mind until I recently realized it into a npm module I call [Json-Transqlify](https://www.npmjs.com/package/json-transqlify) (Json Transform Sqlify)

In this blog I hope to demonstrate some of the functionality I've already baked into Json-Transqlify and some of the other ideas I'm working on.

## Example 1

The backbone of Json-Transqlify is a yaml defininiton file that defines how the JSON (entity) should be validated, transformed, and loaded (insert/update) into the tables.

I'll start with a simple example where I have some User objects that have the following schemaJavaScript

```
{
  "name": "FIRST_NAME LAST_NAME",
  "age": "NUMBER",
  "address":{
    "country": "STRING",
    "city": "CITY"
  }
}
```

I want to insert those objects into the following users tableSQL

```
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fname` varchar(45) NOT NULL,
  `lname` varchar(45) NOT NULL,
  `age` int(11) NOT NULL,
  `country` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
)
```

  
The json-transqlify definition file might look something like this

```
version: 1.0
validator:
  schema:  # validate user object schema  
    default: user-schema.json
loaders: # notice loaders is an array
  - insert:
      label: InsertUser # name of this operation (can be anything)
      tableName: users # table to which the json will be inserted
      transform: 
        columns: # map each column to appropreiate field on json
          - column: fname # insert into a column name fname
            value: $entity.name.split(' ')[0] # $entity refers to the user object we are inserting.
          - column: lname
            value: $entity.name.split(' ')[1] # grap last name
          - column: country
            value: $entity.address.country
          - column: city
            value: $entity.address.city
          - column: age
            value: $entity.age
```

  
I'll break down the previous definition file and go through each section.

### 1\. Validator

json-transqlify allows you to define [json-schema](https://json-schema.org/) rules to check if each record you try to process fulfills a certain schema (behind the scenes i'm using [ajv](https://github.com/epoberezkin/ajv) to handle validation). I need to create a user-schema.json file that describes the schema of user objects and place it next to my json-transqlify yaml  definition file.JavaScript

```
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "age": {
      "type": "number"
    },
    "address": {
      "type": "object",
      "properties": {
        "country": {
          "type": "string"
        },
        "city": {
          "type": "string"
        }
      },
      "required": [
        "country",
        "city"
      ]  
  },
  "required": [
    "name",
    "age"
  ]
}
```

If your json-schema is a large file you can actually break it down into separate files and instruct json-transqlify definition file to [reference them](https://github.com/MehdiZonjy/json-transqlify#1-schema) .

Json-transqlify also allows you to define a [custom validator function](https://github.com/MehdiZonjy/json-transqlify#2-func-validator) that is required to return a promise that resolves to true or rejects.

### 2\. Loaders

Loaders perform the Insert/Update on db. You can define multiple loaders (insert and update multiple tables) and json-transqlify will run them inside one transaction. In the example above I'm using Insert loader which requires tableName, label and transformer.

Each loader you define needs a label attached to it. In cases where you have multiple loaders, it's possible to access the result of loaderA when running loaderB perhaps to use the insertedId to fulfill a foreignkey constraint (more on this later).

### 3\. Transformers

Transformers map the user object (entity) to table columns. There are multiple types of transformers, the one i'm using in this example is Columns Transformer. 

Columns Transformer allows you to define the value of each column by defining an expression that will be evaluated at runtime. In this example $entity is a reserved variable that refers to the json we are processing (the user object). The expression you define can be anything as long as it's a valid JS expression that returns a value. It's also worth to note that by default you can use lodash in the expression.

I'm making the assumption that a user name is always "<First Name> <Last Name>" however it's possible to have spaces in between. a improvement would be to split the user name by space, the first element in the array is the firstName, the rest would be the lastName (I know this isn't always correct but for the sake of the example bear with me). We could implement this by using lodash's [head](https://lodash.com/docs/4.17.5#head) and [tail](https://lodash.com/docs/4.17.5#tail) methods.

```
transformer:
  columns:
    - column: fname
      value: _.head($entity.split(' '))
    - columns: lname
      value: _.tail($entity.split(' ')).join(' ')
```

json-transqlify allows you to define your own  [custom transformer function](https://github.com/MehdiZonjy/json-transqlify#2-func-transformer). The function will be invoked with the $entity, $history ( more on this guy later), and $conn (db connection).. The  function most return a promise that resolves to a JSON where the keys represet table columns .

Now that I've covered the json-transqlify definition file, We need to consume and parse this guy somehow.

first add [json-transqlify](https://www.npmjs.com/package/json-transqlify) to your project

```
npm install json-transqlify
```

Then instantiate a json-transqlifer factory and construct a transqlifer object as such  
 JavaScript

```
const createFactory = require('json-transqlify').createFactory;

const db = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'json_transqlify_demos',
  connectionLimit: 2
}

const factory = createFactory(db)
const transqlifier = factory.createTransqlifier('./insert-user.yaml');

const obj = { name: "Harry Potter", age: 10, address: { city: 'UK', country: 'Little Whinging' } };

// transqlifier will return a promise 
transqlifier(obj);
```

## Example 2

Let's try a more complicated example this time. Given a Lesson object such asJavaScript

```
{
  "name": "Lesson1",
  "course": {
    "name": "course1
  }
}
```

And the following two tables tablesSQL

```
CREATE TABLE `lessons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `course_id` int NOT NULL  FOREIGN KEY REFERENCES courses(course_id),
  PRIMARY KEY (`id`)
)

CREATE TABLE `courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `difficulty` int NOT NULL,
  PRIMARY KEY (`id`)
)

ALTER TABLE `courses` 
ADD UNIQUE INDEX `course_title` (`title`);
```

The following  transqlify definition makes sure that each lesson object also creates a course. and enforces course name to be unique. 

```
version: 1.0
validator:
  schema:
    default: lesson-schema.json
loaders:
  - insert:
      label: InsertCourse
      tableName: courses
      transform:
        columns:
          - column: title
            value: $entity.course.title
          - column: difficulty
            value: $entity.course.difficulty
      on: # precondition, if it evaluates to false the loader does not run
        - db: # db precondition runs a query and allows custom evaluation of result
            query: SELECT 1 from courses where title = ? # check if a course with same name exists
            params:
              - $entity.course.title
            expect: $rows.length === 0 # $rows refers to the result return from query
  - insert:
      label: InsertLesson
      tableName: lessons
      transform:
        func: transform-lesson.js
```

### Validator:

Similar to the previous example, the validator is a simple json-schema defiitnion JavaScript

```
{
  "type": "object",
  "properties": {
    "title": {
      "type": "string"
    },
    "course": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string"
        },
        "difficulty": {
          "type": "number"
        }
      },
      "required": [
        "title",
        "difficulty"
      ]
    }
  },
  "required": [
    "title",
    "course"
  ]
}
```

### Preconditions

The "on" field allows you to define a list of preconditions. If any of them evaluates to false the loader is not executed. I use a [Db Precondition](https://github.com/MehdiZonjy/json-transqlify#dbPrecondition) which runs a custom query  and allows custom evaluation of the returned rows ($rows). I check whether a course with same title already exists, and if so the InsertCourse loader does not run

json-transqlify currently supports 2 extra preconditions; [Expression Precondition](https://github.com/MehdiZonjy/json-transqlify#1-expression-precondition-exp) and [Custom Function Precondition](https://github.com/MehdiZonjy/json-transqlify#3-custom-precondition-function-func).

### Custom Function Transformer

On the second loader, I'm using a custom function to do the transformation, because I want to grab the course\_id . The function looks like thisJavaScript

```
const transformLesson = async ({ $entity, $history, $conn }) => {
  if ($history.InsertCourse) {
    return {
      title: $entity.title,
      course_id: $history.InsertCourse.$insertedId
    }
  }

  const result = await $conn.query('SELECT id from courses where title = ?', [$entity.course.title])
  return {
    title: $entity.title,
    course_id: result[0].id
  }
}

module.exports = transformLesson
```

-   $entity is the object we are transforming (lesson object)
-   $conn is db connection.
-   $history contains the result of all previous loaders. The result of each loader is accessed via its label. In this case $history.InsertCourse which contains the result of the transformer in addition to a special field $insertedId.

Because InsertCourse loader has a precondition, $history.InsertCourse might not always be defined (when a course already exists in db with the same name), in that case I query the db for a course with same title and grab its id

Finally, parse the yaml file and construct a transqlifer JavaScript

```
const createFactory = require('json-transqlify').createFactory;

const db = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'json_transqlify_demos',
  connectionLimit: 2
}

const factory = createFactory(db)
const transqlifier = factory.createTransqlifier('./insert-lesson.yaml');

const main = async () => {
  const lesson1 = { title: 'Lesson1 Title', course: { title: 'Course Title', difficulty: 3 } }
  const lesson2 = { title: 'Lesson2 Title', course: { title: 'Course Title', difficulty: 3 } }
  await transqlifier(lesson1)
  await transqlifier(lesson2)
  factory.closePool()
}

main()
```

## What's Next

There are a couple of improvements I'd like to add to Json-Transqlify before I drop the alpha label.

-   Bulk Insert Loader
-   Bulk Update Loader
-   Upsert Loader
-   Reuse loaders by defining them in separate files and importing them.
-   Custom function loader
-   Decouple MySQL from Json-Transqlify tosupport other kinds of SQL based DBs.
-   Improve logging and error reporting.

The package  is available on [NPM](https://www.npmjs.com/package/json-transqlify) and [Github](https://github.com/MehdiZonjy/json-transqlify).

The code for those examples can be found on the [Github repository](https://github.com/MehdiZonjy/json-transqlify/tree/master/examples) as well
