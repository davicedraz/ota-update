# ota-update-server

Firmware version update server for IoT devices

## Setup

``` bash
# change the urls into .env file
Create the file .env and set the following properties as you need:

# ENV is the enviroment variable to project context, should be 'development' or 'production'
ENV=development

# SERVER_PORT has to be the URL where this server runs
SERVER_PORT=8001

# MAX_SIZE limit the size of firmware in megabytes to a firmware binary deployed
MAX_SIZE=1
```

## Install

First, install dependencies
``` bash
npm install
```

Serve the application
``` bash 
npm start
```

## Usage

### Deploy

- [POST]
- Route: http://localhost:8001/deploy
- Content-Type: multipart/form-data
- Body:
    ```JSON
    {
        "project": "project_name",
        "board": "esp_01m",  
        "version": "0_0_1" 
    }
    ```
- File: 
    ``` JSON
    firmware: file.bin
    ```

### Update\*

- [GET]
- Route: http://localhost:8001/update/project_name/board_type
- Content-Type: application/json
- Headers:
    - x-ESP8266-version: 0_0_1
    - x-ESP8266-mode: sketch
    - x-ESP8266-chip-size: 1000000

\* This should be implemented on firmware and sent by device 