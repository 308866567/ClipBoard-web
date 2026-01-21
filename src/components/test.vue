<template>
<!--  <el-table :data="tableData" style="width: 99%">
    <el-table-column prop="name" label="文件名" />
    <el-table-column label="操作" width="300px">
      <template v-slot="scope">
        <el-button type="info" size="small" @click="fileDownload(scope.row)">下载</el-button>
        <el-button type="primary" size="small" @click="showImage(scope.row)">预览</el-button>
        <el-button type="danger" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-button type="info" size="small" @click="test()">测试</el-button>-->
</template>

<script lang="ts" setup>/*
import { ref } from 'vue'
import axios from 'axios'
const path = ''
const tableData = ref([])
var imgUrl = ref('xx')
// console.log('http://8.134.222.236:38080/file/list/'+n)
axios.get('http://8.134.222.236:38080/file/list/')
  .then(function (response) {
    // console.log(response);
    tableData.value = response.data.data.map(item => ({ name: item }));
    // tableData.value = response.data.data;
    // console.log(tableData.value)
  })

const fileDownload = (row) => {
  console.log(row.name)
  window.location.href = 'http://8.134.222.236:38080/file/list/' + row.name;
}
const emit=defineEmits(['getImage'])
const showImage = (row) => {
  imgUrl.value = "http://8.134.222.236:38080/file/list/" + row.name;
  var t="http://8.134.222.236:38080/file/list/" + row.name;
  emit('getImage',t);
  // alert(imgUrl.value);
}*/
</script>