# Containers Admin

Project made for admin the containers logistics in a port enviroment.

## API Reference

### Containers

#### Create new container record

```http
  POST /api/containers
```

| Body           | Type     | Description                                         |
| :------------- | :------- | :-------------------------------------------------- |
| `container_id` | `string` | **Required**. Container Number: (Ex. 'TEST1234567') |
| `client`       | `string` | **Required**. Client identifier                     |
| `type`         | `enum`   | **Required**. '20' or '40'                          |
| `status`       | `enum`   | **Required**. 'FULL' or 'EMPTY'                     |
| `category`     | `enum`   | **Required**. 'IMPORT' or 'EXPORT'                  |

##### _Response_

| Status | Return    | Description                  |
| :----- | :-------- | :--------------------------- |
| `201`  | `object`  | Return the container created |
| `400`  | `message` | Container not valid          |

#### Get container record

```http
  GET /api/containers/:container_id
```

| Query          | Type     | Description                                         |
| :------------- | :------- | :-------------------------------------------------- |
| `container_id` | `string` | **Required**. Container Number: (Ex. 'TEST1234567') |

##### _Response_

| Status | Return    | Description                 |
| :----- | :-------- | :-------------------------- |
| `200`  | `object`  | Return the container record |
| `400`  | `message` | Container not found         |

#### Get container records

```http
  GET /api/containers/
```

| Paramns    | Type     | Description                                           |
| :--------- | :------- | :---------------------------------------------------- |
| `take`     | `string` | Number of records requested. Default = 20             |
| `skip`     | `string` | Number of records skiped. Default = 0                 |
| `client`   | `string` | Client identifier to filter containers by client      |
| `status`   | `enum`   | 'FULL' or 'EMPTY' to filter containers by status      |
| `category` | `enum`   | 'IMPORT' or 'EXPORT' to filter containers by categoty |

##### _Response_

| Status | Return   | Description                                 |
| :----- | :------- | :------------------------------------------ |
| `200`  | `object` | Return the containers records. (see bellow) |

###### _response object_

```
    {
        items: [Container]!
        total_items: Int
    }

```

#### Update container record

```http
  PUT /api/containers/:container_id
```

| Query          | Type     | Description                                         |
| :------------- | :------- | :-------------------------------------------------- |
| `container_id` | `string` | **Required**. Container Number: (Ex. 'TEST1234567') |

| Body       | Type     | Description          |
| :--------- | :------- | :------------------- |
| `client`   | `string` | Client identifier    |
| `type`     | `enum`   | '20' or '40'         |
| `status`   | `enum`   | 'FULL' or 'EMPTY'    |
| `category` | `enum`   | 'IMPORT' or 'EXPORT' |

##### _Response_

| Status | Return    | Description                 |
| :----- | :-------- | :-------------------------- |
| `200`  | `object`  | Return the container record |
| `400`  | `message` | Update not valid            |
| `400`  | `message` | Container not found         |

#### Delete container record

```http
  DELETE /api/containers/:container_id
```

| Query          | Type     | Description                                         |
| :------------- | :------- | :-------------------------------------------------- |
| `container_id` | `string` | **Required**. Container Number: (Ex. 'TEST1234567') |

##### _Response_

| Status | Return    | Description              |
| :----- | :-------- | :----------------------- |
| `200`  | `message` | Container record deleted |
| `400`  | `message` | Container not found      |

### Operations

#### Post new operation

```http
  POST /api/operations
```

| Body           | Type     | Description                                                 |
| :------------- | :------- | :---------------------------------------------------------- |
| `operation`    | `enum`   | **Required**. Operation type: see below possible operations |
| `time_type`    | `enum`   | **Required**. 'START' or 'END'                              |
| `container_id` | `string` | **Required**. Container Number: (Ex. 'TEST1234567')         |
| `date`         | `string` | **Required**. Date string: 'YYYY-MM-DDTHH:mm:ss'            |

Possible operations: \['BOARDING', 'LANDING', 'GATE_IN', 'GATE_OUT', 'STACK_POSITIONING', 'WEIGHING', 'SCANNER'\]

##### _Response_

| Status | Return    | Description             |
| :----- | :-------- | :---------------------- |
| `201`  | `id`      | Return the operation id |
| `400`  | `message` | Operation not valid     |

#### Get operation record

```http
  GET /api/operations/:operation_id
```

| Query          | Type     | Description                |
| :------------- | :------- | :------------------------- |
| `operation_id` | `string` | **Required**. Operation id |

##### _Response_

| Status | Return    | Description                 |
| :----- | :-------- | :-------------------------- |
| `200`  | `object`  | Return the operation record |
| `400`  | `message` | Container not found         |

#### Get operatios records

```http
  GET /api/operations/
```

| Paramns        | Type     | Description                                        |
| :------------- | :------- | :------------------------------------------------- |
| `take`         | `string` | Number of records requested. Default = 20          |
| `skip`         | `string` | Number of records skiped. Default = 0              |
| `operation`    | `string` | Operation to filter operations                     |
| `container_id` | `string` | Container Number to filter operations by container |
| `client`       | `string` | Client identifier to filter containers by client   |

##### _Response_

| Status | Return   | Description                                 |
| :----- | :------- | :------------------------------------------ |
| `200`  | `object` | Return the operations records. (see bellow) |

###### _response object_

```
    {
        items: [Operation]!
        total_items: Int
    }

```

#### Update operation record

```http
  PUT /api/operations/:operation_id
```

| Query          | Type     | Description                |
| :------------- | :------- | :------------------------- |
| `operation_id` | `string` | **Required**. Operation id |

| Body           | Type     | Description                              |
| :------------- | :------- | :--------------------------------------- |
| `operation`    | `enum`   | Operation: see below possible operations |
| `type`         | `enum`   | 'START' or 'END'                         |
| `container_id` | `string` | Container Number: (Ex. 'TEST1234567')    |
| `time`         | `string` | Date string: 'YYYY-MM-DDTHH:mm:ss'       |

##### _Response_

| Status | Return    | Description                 |
| :----- | :-------- | :-------------------------- |
| `200`  | `object`  | Return the operation record |
| `400`  | `message` | Update not valid            |
| `400`  | `message` | Container not found         |

#### Delete operation record

```http
  DELETE /api/operations/:operation_id
```

| Query          | Type     | Description                |
| :------------- | :------- | :------------------------- |
| `operation_id` | `string` | **Required**. Operation id |

##### _Response_

| Status | Return    | Description              |
| :----- | :-------- | :----------------------- |
| `200`  | `message` | Operation record deleted |
| `400`  | `message` | Operation not found      |

## Tech Stack

**Client:** React, MaterializeCSS

**Server:** REST with: Node, Express

## License

[ISC License](https://choosealicense.com/licenses/isc/)

Copyright (c) 2021, Jeremias Leao

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
