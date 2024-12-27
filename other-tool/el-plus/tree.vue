<script lang="ts" setup>
defineOptions({
  name: "Welcome"
});
import { ref } from "vue";
import { ArrowDown } from "@element-plus/icons-vue";
import type Node from "element-plus/es/components/tree/src/model/node";
import type { AllowDropType } from "element-plus/es/components/tree/src/tree.type";
import { ElMessageBox } from "element-plus";

const allowDrop = (draggingNode: Node, dropNode: Node, type: AllowDropType) => {
  return true;
};

 function findIndexPath(data, targetId) {
  let path = [];

  function dfs(items, currentPath) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const newPath = [...currentPath, i]; // 更新當前路徑
      if (item.id === targetId) {
        path = newPath; // 找到目標 id，更新 path
        return true;
      }
      if (item.children) {
        if (dfs(item.children, newPath)) return true; // 遞迴搜索
      }
    }
    return false;
  }

  dfs(data, []);
  return path;
}

 function insertDataAtIndex(data, arrayIndex, newData) {
  let current = data;

  // 遍歷 arrayIndex，找到要插入的父層位置
  for (let i = 0; i < arrayIndex.length; i++) {
    const index = arrayIndex[i];
    // 若路徑錯誤，則返回
    if (!current[index]) {
      return;
    }
    // 確保有 children 陣列
    if (!current[index].children) {
      current[index].children = [];
    }
    current = current[index].children;
  }

  // 在指定位置的 children 加入新資料
  current.push(newData);
}

 function deleteDataAtIndex(data, arrayIndex) {
  let current = data;

  // 遍歷 arrayIndex，找到要刪除的位置
  for (let i = 0; i < arrayIndex.length; i++) {
    const index = arrayIndex[i];
    // 若路徑錯誤，則返回
    if (!current || !current[index]) {
      console.error("Invalid path: ", arrayIndex);
      return;
    }
    const isLast = i === arrayIndex.length - 1;
    if (isLast) {
      // 使用 splice 刪除指定索引的元素
      current.splice(index, 1);
      return;
    }
    current = current[index].children;
    if (!current) {
      console.error("Path leads to invalid children: ", arrayIndex);
      return;
    }
  }
}


const treeData = ref([
  {
    id: 1734422634106,
    label: "newFile2",
    children: [
      {
        id: 1734422633939,
        label: "newFile1",
        children: [],
        type: ""
      }
    ],
    type: ""
  }
]);

const hanldeNodeClick = (node, _data) => {
  nodeForm.value = node;
};
const defaultNodeForm = {
  id: null,
  label: "",
  children: [],
  type: ""
};
let globalCount = 3;
const nodeForm = ref({ ...defaultNodeForm });

const action = {
  // 新增檔案
  addFile() {
    const defaultData = {
      id: Date.now(),
      label: `newFile${globalCount}`,
      children: [],
      type: ""
    };
    const arryIndex = findIndexPath(treeData.value, nodeForm.value.id);
    insertDataAtIndex(treeData.value, arryIndex, defaultData);
    globalCount++;
  },
  // 新增資料夾
  addOutsideFile() {
    const defaultData = {
      id: Date.now(),
      label: `newFile${globalCount}`,
      children: [],
      type: ""
    };
    treeData.value.push(defaultData);
    globalCount++;
  },
  // 刪除
  delete() {
    const doDelete = () => {
      const arryIndex = findIndexPath(treeData.value, nodeForm.value.id);
      deleteDataAtIndex(treeData.value, arryIndex);
      // 清空form
      nodeForm.value = { ...defaultNodeForm };
    };
    if (nodeForm.value?.children?.length > 0) {
      ElMessageBox.confirm("是否刪除?", "Warning", {
        confirmButtonText: "確定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          doDelete();
        })
        .catch(() => {});
    } else {
      doDelete();
    }
  }
};

const demoMode = ref(true);
</script>

<template>
  <div class="example-showcase" v-show="demoMode">
    <h1>v1.2.0.4.t</h1>
    <pre>
  操作說明:
  若children有東西則視為資料夾; 沒有則為檔案;
  將檔案拖曳至檔案父層會成為資料夾
  </pre
    >
    <el-button @click="action.addOutsideFile" class="m-1 p-1">新增</el-button>
    <el-row justify="center">
      <el-col :span="12">
        <el-tree
          style="max-width: 600px"
          :allow-drop="allowDrop"
          :data="treeData"
          draggable
          default-expand-all
          node-key="id"
          :expand-on-click-node="false"
          @node-click="hanldeNodeClick"
        >
          <template #default="{ node, data }">
            <span class="custom-tree-node">
              <span>
                {{ node.label }}
                {{ data?.children?.length ? "📁" : "📄" }}
              </span>
              <span>
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    <el-icon class="el-icon--right">
                      <arrow-down />
                    </el-icon>
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <!-- <el-dropdown-item>複製</el-dropdown-item> -->
                      <el-dropdown-item @click="action.addFile">
                        在子層加入檔案
                      </el-dropdown-item>
                      <el-dropdown-item divided @click="action.delete">
                        刪除
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </span>
            </span>
          </template>
        </el-tree>
      </el-col>
      <el-col :span="12">
        <el-form
          :model="nodeForm"
          label-width="auto"
          style="max-width: 600px"
          v-show="nodeForm.label"
        >
          <el-form-item label="label">
            <el-input v-model="nodeForm.label" />
          </el-form-item>
          <el-form-item label="type">
            <el-select v-model="nodeForm.type" placeholder="please select Type">
              <el-option label="Menu" value="Menu" />
              <el-option label="Page" value="Page" />
              <el-option label="Url" value="Url" />
            </el-select>
          </el-form-item>
          <el-form-item label="data">
            <pre
              >{{ JSON.stringify(treeData, null, 2) }}
            </pre>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

</style>
