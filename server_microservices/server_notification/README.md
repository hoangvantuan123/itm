/nestjs-server
│
├── /src
│   ├── /gateways                  # Chứa WebSocket Gateway
│   │   └── notifications.gateway.ts
│   │
│   ├── /services                  # Chứa các service logic
│   │   └── notification.service.ts
│   │
│   ├── /modules                   # Các module trong dự án
│   │   └── notification.module.ts
│   │
│   ├── /common                    # Chứa tiện ích và cấu hình chung
│   │   ├── /utils                 # Các tiện ích (Redis)
│   │   │   └── redis.util.ts
│   │   └── app.module.ts
│   │
│   ├── main.ts                    # Entry point của ứng dụng
│
├── package.json                   # Thông tin dự án và dependencies
├── tsconfig.json                  # Cấu hình TypeScript
└── README.md                      # Tài liệu dự án
