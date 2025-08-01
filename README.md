# The New York Times Articles API

An API that provides homepage articles, sectionslist and section-specific articles. Simple enough.

## Table of Contents
(Optional, if your README is long)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Installation

How to install and set up your project locally.

```bash
npm install
npm start
```


## Usage
### GET /homepage

example output:
```json
[
    {
        title: STRING,
        url: STRING
    }, ...
]
```

### GET /sections

example output:
```json
[
    {
        sectionId: STRING,
        url: STRING
    }, ...
]
```


### GET /section/{sectionId}

example output:
```json
[
    {
        title: STRING,
        url: STRING
    }, ...
]
```

## License
This software is free to use and modify.
Commercial distribution is only allowed if the software has been significantly modified.