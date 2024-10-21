/project-root
│
├── /src
│   ├── /gateway                  # Nơi chứa WebSocket Gateway
│   │   ├── notifications.gateway.ts
│   │
│   ├── /services                 # Nơi chứa các logic services
│   │   ├── notification.service.ts
│   │
│   ├── /modules                  # Các module của NestJS
│   │   ├── app.module.ts
│   │   ├── notification.module.ts
│   │
│   ├── /utils                    # Các tiện ích dùng chung (Redis, Logger)
│   │   ├── redis.util.ts
│   │   ├── logger.util.ts
│   │
│   ├── /cluster                  # File khởi động Cluster Mode
│   │   ├── cluster-setup.ts
│   │
│   ├── main.ts    
        redis.config.ts
│   ├── database.config.ts              
│
├── package.json
├── tsconfig.json
└── README.md
