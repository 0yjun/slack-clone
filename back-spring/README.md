# 프로젝트 코드 컨벤션 및 구조 가이드라인

## 프로젝트 구조

```bash
domain
└── 도메인명
    ├── controller
    │   └── *Controller.java
    ├── model
    │   ├── response
    │   │   └── *Response.java
    │   └── request
    │       └── *Request.java
    ├── repository
    │   ├── *Repository.java
    │   └── entity
    │       └── *Entity.java
    └── service
        └── *Service.java
```
