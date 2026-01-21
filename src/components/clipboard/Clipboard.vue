<template>
 <div>
    <el-button type="primary" @click="refreshProcessedData">刷新</el-button>
  </div>
  <ClipboardCard field="" v="" @save-update="handleSaveUpdate" />
  <template v-for="(value, field) in processedData" :key="field">
    <ClipboardCard :field="String(field)" :v="value" @save-update="handleSaveUpdate"
      @delete-item="handleDeleteItem" />
  </template> 
</template>

<script setup lang="ts">
import {
  type ClipboardMap,
  deleteOne,
  queryAll,
  updateOne,
} from "@/api/ClipboardApi.ts";
import type { ClipboardUpdateDto } from "@/api/ClipboardApi.ts";

import { onMounted, ref } from "vue";
import ClipboardCard from "@/components/clipboard/ClipboardCard.vue";
import { ElMessage } from "element-plus";

// interface ClipboardMap {
//   [field: string]: string;
// }
const processedData = ref<ClipboardMap>();
// processedData.value={"1":"内容1","3":"内容1","33":"内容1","20251201183043067":"测试内容1","20251201183211046":"测试内容1","20251201183304365":"测试内容1","20251201183318603":"测试内容1","20251201183339834":"测试内容1","20251201183509030":"测试内容1","key1":"测试内容已被修改","20251204175142081":"测试内容1"}

// queryAll().then(res => {
//   console.log('查询所有res=',res);
//   processedData.value = res;
//   console.log('  processedData.value = ',processedData.value);
// });

const refreshProcessedData = async () => {
  console.log("--- 开始刷新数据 ---");
  try {
    // 使用 await 等待 Promise 完成
    const res = await queryAll();
    console.log("查询所有res=", res);
    // 将结果赋值给响应式变量
    processedData.value = res;
    console.log("processedData.value = ", processedData.value);
    // 可选：给用户一个成功的反馈
    ElMessage.success("数据刷新成功！");
  } catch (error) {
    // 捕获 API 调用过程中可能发生的错误
    console.error("数据刷新失败:", error);
    // 可选：给用户一个失败的反馈
    ElMessage.error("数据加载失败，请检查网络或服务端。");
  }
};
refreshProcessedData();

defineExpose({
  processedData,
});


const handleSaveUpdate = async (data: ClipboardUpdateDto) => {
  try {
    // 1. 调用更新 API
    const responseMessage = (await updateOne(data)) as unknown as {
      field: string;
      value: string;
    };
    if (!responseMessage.field) {
      ElMessage.error("field不存在");
      return;
    }
    if (!processedData.value) {
      return;
    }
    // 2. 如果 API 调用成功，更新本地数据
    processedData.value[responseMessage.field] = responseMessage.value;
    // 3. 提示用户操作成功，显示后端返回的消息
    ElMessage.success(`更新成功`);
  } catch (error) {
    // 4. 处理 API 调用失败的情况（如网络错误、后端返回 4xx/5xx 或 updateOne 抛出的 Error）
    const errorMessage =
      error instanceof Error ? error.message : "未知错误，更新失败。";
    ElMessage.error(`❌ 更新失败: ${errorMessage}`);
  }
};
/**
 * 2. 处理删除事件 (调用 deleteOne API)
 * @param field 要删除的键
 */
const handleDeleteItem = async (field: string) => {
  if (!processedData.value || !processedData.value[field]) {
    ElMessage.warning(`键 [${field}] 不存在于本地数据。`);
    return;
  }

  try {
    // 1. 调用删除 API
    const responseMessage = await deleteOne(field);

    // 2. 如果 API 调用成功，删除本地数据
    if (processedData.value) {
      delete processedData.value[field];
    }

    // 3. 提示用户操作成功
    ElMessage.warning(`删除成功`);
  } catch (error) {
    // 4. 处理 API 调用失败的情况
    const errorMessage =
      error instanceof Error ? error.message : "未知错误，删除失败。";
    ElMessage.error(`❌ 删除失败: ${errorMessage}`);
  }
};
</script>
