/**
 * @file ServerInfo.ts
 * @description 服务器服务信息类型定义和数据
 */

/**
 * 服务器服务接口定义
 */
export interface ServerService {
  /** 端口号 */
  port: number;
  /** 服务描述 */
  description: string;
  /** 访问URL，格式：IP:端口 */
  url: string;
}

/**
 * 服务器服务列表
 * 服务器地址：8.134.222.236
 */
export const serverServices: ServerService[] = [
  {
    port: 29101,
    description: "Cockpit - Web 控制台",
    url: "8.134.222.236:29101"
  },
  {
    port: 29100,
    description: "Portainer - 容器管理",
    url: "8.134.222.236:29100"
  },
  {
    port: 38081,
    description: "剪贴板 Java 后端接口",
    url: "8.134.222.236:38081"
  },
  {
    port: 38082,
    description: "剪贴板 Web 前端",
    url: "8.134.222.236:38082"
  },
  {
    port: 26379,
    description: "Redis 数据库",
    url: "8.134.222.236:26379"
  },
  {
    port: 28081,
    description: "Redis Commander - Redis 管理界面",
    url: "8.134.222.236:28081"
  },
  {
    port: 23306,
    description: "MySQL 数据库",
    url: "8.134.222.236:23306"
  },
  {
    port: 28899,
    description: "phpMyAdmin - MySQL 管理界面",
    url: "8.134.222.236:28899"
  },
];