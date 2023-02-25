<template>
  <el-container style="height:100%">
    <el-aside width="200px">
      <common-aside />
    </el-aside>
    <el-container>
      <el-header class="d-flex justify-between align-center"
        style="color: #333;border-bottom: 1px solid #ccc;padding: 40px 20px;">
        <div>
          <h2>返校信息管理系统</h2>
        </div>
        <div class="d-flex align-center">
          <div class="avatar">
            <img src="@/assets/avatar_.png" alt="">
          </div>
          <div class="userName">{{ getUserInfo.name }}</div>
          <div class="mx-1">
            <el-button type="text" @click="handleEditUserInfoBtn">修改用户信息</el-button>
          </div>
          <div class="">
            <el-button type="text" @click="handleLogout">退出登录</el-button>
          </div>
        </div>
      </el-header>
      <common-bread style="line-height: 40px" />
      <el-main>
        <router-view />
      </el-main>
    </el-container>
    <el-dialog title="用户信息" :visible.sync="show_editUserInfo_dialog" center :close-on-click-modal="false"
      @close="handleCancelBtn">
      <el-form :model="edit_formData" label-position="top" ref="formRef">
        <el-row>
          <el-col v-for="(item, index) in edit_formConfig" :key="index" :span="item.span"
            style="padding: 0 10px;box-sizing: border-box;">
            <el-form-item :label="item.label" :value="edit_formData[item.key]" :prop="item.key">
              <component :is="item.component" v-bind="item.itemProps" style="width: 100%;"
                v-model="edit_formData[item.key]">
                <template v-if="item.component === 'el-select'">
                  <el-option v-for="(option, optionIndex) in item.children" :key="optionIndex" :label="option.label"
                    :value="option.value" :disabled="option.disabled"></el-option>
                </template>
              </component>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancelBtn">取 消</el-button>
        <el-button type="primary" @click="handleSubmitBtn">提 交</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>
<script>
import CommonAside from '@/components/CommonAside.vue'
import CommonBread from '@/components/CommonBread.vue'
import { MessageBox } from 'element-ui';
import { userUpdate } from '@/api/index'
export default {
  data() {
    return {
      edit_formData: {
        account: "",
        // password: "",
        name: "",
        gender: "",
        age: "",
      },
      edit_formConfig: [
        {
          span: 12,
          component: "el-input",
          key: "account",
          label: "账号",
          itemProps: {
            placeholder: "请输入",
            readonly: true
          }
        },
        // {
        //   span: 12,
        //   component: "el-input",
        //   key: "password",
        //   label: "密码",
        //   itemProps: {
        //     type: "password",
        //     placeholder: "请输入"
        //   }
        // },
        {
          span: 12,
          component: "el-input",
          key: "name",
          label: "姓名",
          itemProps: {
            placeholder: "请输入"
          }
        },
        {
          span: 12,
          component: "el-select",
          key: "gender",
          label: "性别",
          itemProps: {
            placeholder: "请选择"
          },
          children: [
            {
              label: "男",
              value: 1
            },
            {
              label: '女',
              value: 0
            }
          ]
        },
        {
          span: 12,
          component: "el-input",
          key: "age",
          label: "年龄",
          itemProps: {
            placeholder: "请输入"
          }
        },
      ],
      show_editUserInfo_dialog: false
    }
  },
  components: {
    CommonBread,
    CommonAside
  },
  computed: {
    getUserInfo() {
      let userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        let res = JSON.parse(userInfo)
        return res;
      }
    }
  },
  methods: {
    handleEditUserInfoBtn() {
      Object.assign(this.edit_formData, this.getUserInfo);
      console.log(this.edit_formData)
      this.show_editUserInfo_dialog = true;
    },
    handleSubmitBtn() {
      MessageBox.confirm("是否提交？", "提示", {
        type: "warning"
      }).then(() => {
        this.updateUserInfo();
      })
    },
    async updateUserInfo() {
      let res = await userUpdate(this.edit_formData);
      if (res.type === 'success') {
        console.log(res);
        let userInfo = res.data;
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        console.log(this.getUserInfo);
        this.handleCancelBtn();
        setTimeout(() => {
          location.reload();
        }, 0);
      }
    },
    handleCancelBtn() {
      this.$refs.formRef.resetFields();
      this.show_editUserInfo_dialog = false;
    },
    handleLogout() {
      localStorage.clear();
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style scoped>
.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: center;
  line-height: 100vh;
}

.userName {
  color: #333;
  line-height: 2;
}

.avatar {
  width: 60px;
  height: 60px;
  padding: 10px;
  box-sizing: border-box;
  margin: 0 1rem;
}

.avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
</style>
