const service_map = {
  0:'无',
  10:'售后',
  1:'咨询'
}
export default {
    name: "memberManagement",
    data() {
        return {
            // 抽屉相关
            drawerVisible: false,
            id: null, // 编辑 ID
            adminGroup: [],
            simpleRule: { required: true, message: '必填项', trigger: 'change' },
            ruleForm: {
                username: '',
                name: '',
                role: '',
                sex: 1,
                phone: '',
                email: '',
                group_id: [],
                password: '',
                service_type:'',
            },
            roles: [],
            rules: {},
            avatar: [],


            visible: false,
            previewImg: '',
            loading: false,
            page: 1,
            pageSize: 10,
            count: 0,
            current: 1,
            query:{},
            tableData: [],
            searchOPtions: [
                {
                    type: 'input',
                    key: 'username',
                    placeholder: '用户名'
                },
                {
                    type: 'cascader',
                    key: 'group_id',
                    placeholder: '所属部门',
                    options:[]
                },
            ],
            service_map
        }
    },
    created() {
        // 抽屉相关
        this.gettAdminGroupDataDrawer()
        this.getRoles()

        this.gettAdminGroupData()
            .then(bool => {
                if(bool) this.getData();
            })
    },
    methods: {
        // 抽屉相关
        formatDrawer(arr) {
          const formatArr = arr.map(val => {
              if(val.children && val.children.length > 0) {
                  return {
                      value: `${val.id}`,
                      label: val.name,
                      children: this.formatDrawer(val.children)
                  }
              }
              return {
                  value: `${val.id}`,
                  label: val.name
              }
          })
          return formatArr;
        },
        handleEdit(id) {
          this.id = id
          this.drawerVisible = true
          this.getAdminMemberDetail(id)
        },
        // 部门列表数据
        async gettAdminGroupDataDrawer() {
          try {
              const { data } = await this.$api.jurisdiction.tree();
              // 回填部门树
              this.adminGroup = this.formatDrawer(data.tree);
          } catch (e) {
              throw new Error(e);
          }
        },
        async getRoles() {
          try {
              const { data } = await this.$api.jurisdiction.getRoleList();
              this.roles = data.items;
          } catch (e) {
              throw new Error(e);
          }
        },
        async getAdminMemberDetail(id) {
          try {
              const { data } = await this.$api.jurisdiction.getAdminMemberDetail({ id });
              for(const key in this.ruleForm) {
                  this.ruleForm[key] = data[key];
              }
              this.avatar = [{ name:'avatar', url: data.avatar }];
              this.ruleForm.group_id = [...data.position.split(',')];
          } catch (e) {
              throw new Error(e);
          }
        },
        getsuccessUpload(val){
          this.avatar = [{ name:'avatar', url:val[0] }];
        },
        submit() {
          this.$refs.ruleForm.validate(async (valid) => {
              if (valid) {
                  try {
                      const params = Object.assign({}, this.ruleForm);
                      params.position = [...params.group_id].join(',') || ',';
                      params.group_id = [...params.group_id].splice(-1, 1)[0] || 0;
                      if(this.avatar.length > 0) params.avatar = this.avatar[0].url;
                      if(this.id) {
                          params.id = this.id;
                          await this.$api.jurisdiction.EditAdminMember(params)
                      } else {
                          await this.$api.jurisdiction.AddAdminMember(params)
                      }
                      this.drawerVisible = false
                      this.gettAdminGroupData().then(bool => {
                          if(bool) this.getData();
                      })
                  } catch (e) {
                      throw new Error(e);
                  }
              }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },


        /**
         * 递归格式化为合法数据
         * @param arr
         * @returns {*}
         */
        format(arr) {
            const formatArr = arr.map(val => {
                if(val.children && val.children.length > 0) {
                    return {
                        value: val.id,
                        label: val.name,
                        children: this.format(val.children)
                    }
                }
                return {
                    value: val.id,
                    label: val.name
                }
            })
            return formatArr;
        },
        // 部门列表数据
        async gettAdminGroupData() {
            try {
                const { data } = await this.$api.jurisdiction.tree();
                // 回填对应搜索项
                const arr = this.format(data.tree);
                this.searchOPtions.map(val => {
                    if(val.key === 'group_id') {
                        val.options = [...arr];
                    }
                })
                return Promise.resolve(true);
            } catch (e) {
                throw new Error(e);
                return Promise.reject(false);
            }
        },
        handlePageChange(val) {
            this.page = val;
            this.getData();
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getData();
        },
        handelSearch(type, query) {
console.log('>>>>>> type', type)
console.log('>>>>>> query', query)
            const todo = {
                search: () => {
                    if(query.group_id) query.group_id = [...query.group_id].splice(-1, 1);
                    this.query = {...query};
                    this.page = 1;
                    this.getData();
                },
                reset: () => {
                    this.query = {};
                    this.pageSize = 10;
                    this.page = 1;
                    this.getData();
                }
            }
            todo[type]();
        },
        // 部门列表数据
        async getData() {
            try {
                this.loading = true;
                const params = Object.assign({}, this.query);
                params.page = this.page;
                params.pageSize = this.pageSize;
                const { data } = await this.$api.jurisdiction.getAdminMemberList(params);
                this.loading = false;
                this.tableData = data.items;
                this.count = data.count;
            } catch (e) {
                this.loading = false;
                throw new Error(e);
            }
        },
        jumpTo(name, id) {
            this.$router.push({ name, params: { id } });
        },
        handleDel(id) {
            this.$confirm('确认删除选中成员？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                try {
                    await this.$api.jurisdiction.DelAdminMember({ id });
                    this.getData();
                } catch (e) {
                    throw new Error(e);
                }
            })
        },
    }
}
