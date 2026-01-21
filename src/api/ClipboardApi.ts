/**
 * @file api.ts
 * @description 封装后端 Redis Clipboard Controller 的接口请求方法和数据类型定义。
 */

// 假设后端接口的基路径
// 使用 Vite 环境变量，开发环境用本地，生产环境用远程
const BASE_URL = import.meta.env.VITE_API_SERVICE_URL;

// --- 1. 数据模型定义 (Types) ---

/**
 * 对应后端 /update 接口的请求体 DTO。
 */
export interface ClipboardUpdateDto {
    /** 要操作的字段/键。如果为 null 或 undefined，后端会生成一个ID。 */
    field?: string;
    /** 要设置的值。必须包含。 */
    value: string;
}

/**
 * 后端 /query 接口返回的整个 Map 数据的类型。
 * 键是字符串 (field)，值是字符串 (value)。
 */
export interface ClipboardMap {
    [field: string]: string;
}

/**
 * 统一的 API 响应结构（用于返回操作消息的接口）。
 * 虽然后端直接返回 string，但在前端最好定义一个清晰的 Result 结构。
 */
export interface ApiResponse<T = string> {
    success: boolean;
    data?: T;
    message: string;
}

// --- 2. 接口请求封装 (Functions) ---

/**
 * 通用的 fetch 包装函数
 * @param endpoint 接口路径
 * @param options fetch 选项
 */
async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            // 可以在这里添加认证 header，如 'Authorization': 'Bearer ...'
        },
        ...options,
    });

    if (!response.ok) {
        // 处理 HTTP 错误，例如 404, 500
        throw new Error(`HTTP error! status: ${response.status} at ${endpoint}`);
    }

    // 后端接口直接返回 String 或 JSON，这里统一处理为 text
    const text = await response.text();

    try {
        // 尝试解析 JSON，适用于 /query 接口返回 Map 的情况
        return JSON.parse(text) as T;
    } catch (e) {
        // 如果不是 JSON，直接返回原始文本（适用于返回消息的接口）
        throw new Error(
          `不是json对象 ${response.status} at ${endpoint}`,
        );
    }
}

/**
 * 1. 【POST /query】 查询所有内容。
 * @returns 包含所有字段和值的 Map 对象。
 */
export async function queryAll(): Promise<ClipboardMap> {
    return apiFetch<ClipboardMap>('/query', {
        method: 'GET',
    });
}

/**
 * 2. 【POST /query/{field}】 查询指定字段内容。
 * @param field 要查询的键。
 * @returns 指定字段的值。
 */
export async function queryOne(field: string): Promise<string> {
    // 后端返回的是一个 JSON 格式的 String，例如 "内容1"
    return apiFetch<string>(`/query/${field}`, {
      method: "GET",
    });
}

/**
 * 3. 【POST /update】 更新/添加字段内容。
 * @param data 包含 field 和 value 的对象。
 * @returns 操作结果消息。
 */
export async function updateOne(data: ClipboardUpdateDto): Promise<string> {
    if (!data.value) {
        throw new Error('Value is required for update operation.');
    }

    // 后端返回的是 String 消息，例如 "fieldA==valueA" 或 "请求体中必须包含 value 字段"
    return apiFetch<string>('/update', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

/**
 * 4. 【POST /delete/{field}】 删除指定字段内容。
 * @param field 要删除的键。
 * @returns 操作结果消息。
 */
export async function deleteOne(field: string): Promise<string> {
    // 后端返回的是 String 消息，例如 "成功删除字段 'key'，原值为: value"
    return apiFetch<string>(`/delete/${field}`, {
        method: 'POST',
    });
}

// --- 3. 使用示例（可选）---

export async function testApi() {
    try {
        console.log('--- 1. 查询所有 ---');
        const allData = await queryAll();
        console.log(allData);

        const testField = Object.keys(allData)[0] || 'newId';

        console.log(`\n--- 2. 查询单个 (${testField}) ---`);
        const singleValue = await queryOne(testField);
        console.log(singleValue);

        console.log('\n--- 3. 更新/添加 ---');
        const updateMessage = await updateOne({ value: `TestValue-${Date.now()}` }); // field 留空，让后端生成
        console.log(updateMessage);

        const newField = updateMessage.split('==')[0]; // 从返回消息中提取新生成的 field

        console.log(`\n--- 4. 删除 (${newField}) ---`);
        const deleteMessage = await deleteOne(newField);
        console.log(deleteMessage);

    } catch (error) {
        console.error('API 调用发生错误:', error);
    }
}

// testApi(); // 可以在开发环境中运行测试
