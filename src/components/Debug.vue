<script lang="ts" setup>
import {useRouter} from "vue-router";
import SlotDemo from "./slot-demo.vue";
import {computed, onMounted, ref} from "vue";
import dayjs from 'dayjs'
import axios from "axios";
import {ElMessage} from "element-plus";

const router = useRouter();


const goBack = () => {
  console.log('go back');
  router.go(-1); // 使用 Vue Router 返回上一页
}
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000
})

interface FormInline {
  id: number;
  name: string;
  birthday: string;
  salary: string;
  address: string,
  editing: boolean
}

const employees = ref<FormInline[]>([])
const formInline = ref<FormInline>({
  id: null,
  name: '',
  birthday: '',
  salary: '',
  address: '',
  editing: false,
});

const fetchEmployees = async () => {
  try {
    const response = await axiosInstance.get('/api/v2/employee')
    employees.value = response.data
    for (const employee of employees.value) {
      employee.birthday = dayjs(employee.birthday).format('YYYY-MM-DD')
      employee.salary += ' $'
      employee.editing = false
    }
    console.log(employees.value)
  } catch (error) {
    ElMessage.error("查询待办事项失败")
    console.error(error)
  }
}
const now = new Date(1997, 0, 1)
// now减一年

const addEmployee = async () => {
  try {
    now.setDate(now.getDate() + 1)
    const newEmployee = {
      name: "niuma",
      salary: Math.floor(Math.random() * 10001),
      birthday: dayjs(now).format('YYYY-MM-DD'),
      address: "No. 189, Grove St, Los Angeles"
    };
    await axiosInstance.post('/api/v2/employee', newEmployee)
    await fetchEmployees()
  } catch (error) {
    ElMessage.error("创建新员工信息失败")
    console.error(error)
  }
}
const addEmployee2 = async (employee: FormInline) => {
  try {
    onSubmit(employee)
    await axiosInstance.post('/api/v2/employee', employee)
    await fetchEmployees()
  } catch (error) {
    ElMessage.error("创建新员工信息失败")
    console.error(error)
  }
}
const removeEmployee = async (employeeId: number) => {
  try {
    console.log(employeeId)
    await axiosInstance.delete(`/api/v2/employee/${employeeId}`);
    await fetchEmployees()
  } catch (error) {
    ElMessage.error("移除员工信息失败")
    console.error(error)
  }
}
const tableData = ref([
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
])
const deleteRow = (index: number) => {
  tableData.value.splice(index, 1)
}
const onAddItem = () => {
  now.setDate(now.getDate() + 1)
  tableData.value.push({
    date: dayjs(now).format('YYYY-MM-DD'),
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  })
}
const enableEdit = (row: number) => {
  employees.value[row].editing = true;
  console.log(row)
  console.log(employees.value[row])
};
const saveEdit = async (row: number) => {
  employees.value[row].editing = false;
  try {
    await axiosInstance.put(`/api/v2/employee/${employees.value[row].id}`, row);
    console.log('Employee updated successfully');
  } catch (error) {
    console.error('Error updating employee:', error);
  }
};


const onSubmit = (formInline: FormInline) => {
  console.log('ADD!');
  console.log(formInline);
};

onMounted(fetchEmployees)
</script>

<template>
  <el-page-header @back="goBack">
    <template #content>
      <span class="text-large font-600 mr-3"> This is the Employee debug page~~ </span>
    </template>
  </el-page-header>
  <!--  DEMO  -->
  <slot-demo class="slot-demo">:-)</slot-demo>
  <el-table :data="tableData" style="width: 100%" max-height="250">
    <el-table-column fixed prop="date" label="Date" width="150"/>
    <el-table-column prop="name" label="Name" width="120"/>
    <el-table-column prop="state" label="State" width="120"/>
    <el-table-column prop="city" label="City" width="120"/>
    <el-table-column prop="address" label="Address" width="600"/>
    <el-table-column prop="zip" label="Zip" width="120"/>
    <el-table-column fixed="right" label="Operations" min-width="120">
      <template #default="scope">
        <el-button
            link
            type="primary"
            size="small"
            @click.prevent="deleteRow(scope.$index)"
        >
          Remove
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-button class="mt-4" style="width: 100%" @click="onAddItem">
    Add Item
  </el-button>


  <!--  Employee  -->
  <slot-demo class="slot-demo">:-)</slot-demo>
  <el-table :data="employees" style="width: 100%" max-height="500">
    <el-table-column fixed prop="birthday" label="Date" width="150"/>
    <el-table-column prop="name" label="Name" width="200"/>
    <el-table-column prop="age" label="Age" width="120"/>
    <el-table-column prop="salary" label="Salary" width="200"/>
    <el-table-column prop="address" label="Address" width="600"/>
    <el-table-column fixed="right" label="Operations" min-width="160">
      <template #default="scope">
        <el-button
            link
            type="primary"
            size="small"
            @click.prevent="removeEmployee(employees[scope.$index].id)"
        >
          Remove
        </el-button>
        <el-button
            link
            type="primary"
            size="small"
            @click.prevent="enableEdit(scope.$index)"
        >
          Edit
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="Employee name">
      <el-input v-model="formInline.name" placeholder="Approved by" clearable/>
    </el-form-item>
    <el-form-item label="Employee salary">
      <el-input v-model="formInline.salary" placeholder="Approved by" clearable/>
    </el-form-item>
    <el-form-item label="Employee address">
      <el-input v-model="formInline.address" placeholder="Approved by" clearable/>
    </el-form-item>
    <el-form-item label="Birthday">
      <el-date-picker
          v-model="formInline.birthday"
          type="date"
          placeholder="Pick a date"
          value-format="YYYY-MM-DD"
          clearable
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addEmployee2(formInline)">Add Item</el-button>
    </el-form-item>
  </el-form>
  <el-button class="mt-4" style="width: 100%" @click="addEmployee">
    Add Item
  </el-button>
</template>

<style scoped>
.page-container {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.el-page-header {
  display: flex;
  align-items: center;
  padding: 20px 30px;
  background-color: white;
  border-bottom: 1px solid #e0e0e0;
}

.el-page-header__left {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.el-page-header__title {
  font-size: 16px;
  color: #333;
}

.el-page-header__content {
  font-size: 18px;
  color: #666;
  font-weight: bold;
}

.slot-demo {
  padding: 20px;
}

.demo-form-inline {
  margin-top: 20px;
}

.demo-form-inline .el-input {
  --el-input-width: 220px;
}


</style>