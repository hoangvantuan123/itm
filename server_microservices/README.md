
```pip freeze > requirements.txt
```
```docker-compose up -d```


# Dự Án API Health Check

## Giới thiệu

Endpoint `/health` sẽ trả về thông tin về trạng thái của server, cơ sở dữ liệu, bộ nhớ, CPU, và tình trạng ổ đĩa.

## Endpoint

### 1. Kiểm Tra Sức Khỏe

**URL:** `/api/check/health`

**Phương thức:** `GET`

#### Ví dụ Phản Hồi

```json
{
  "status": "up",
  "timestamp": "2024-10-12T20:24:37.478Z",
  "database": {
    "status": "up"
  },
  "memory": {
    "used": 45473032,
    "total": 48812032
  },
  "cpu": {
    "temperature": null
  },
  "disk": [
    {
      "fs": "/dev/disk1s1s1",
      "size": 250551357440,
      "used": 9347719168,
      "available": 24264945664,
      "status": "healthy"
    },
    {
      "fs": "/dev/disk1s2",
      "size": 250551357440,
      "used": 2119467008,
      "available": 24264945664,
      "status": "healthy"
    },
    {
      "fs": "/dev/disk1s4",
      "size": 250551357440,
      "used": 4296335360,
      "available": 24264945664,
      "status": "healthy"
    },
    {
      "fs": "/dev/disk1s6",
      "size": 250551357440,
      "used": 9146368,
      "available": 24264945664,
      "status": "healthy"
    },
    {
      "fs": "/dev/disk1s5",
      "size": 250551357440,
      "used": 209223053312,
      "available": 24264945664,
      "status": "healthy"
    }
  ]
}
