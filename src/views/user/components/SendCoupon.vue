<template>
    <div>
        <el-dialog
            title="发放优惠券"
            :visible.sync="showDialog" 
            width="30%"
        >
        <el-form ref="couponForm" :model="form">

            <el-form-item :rules="[simpleRule]" label="选择优惠券" prop="coupon_id">
                <el-select filterable clearable v-model="form.coupon_id" placeholder="请选择">
                    <el-option
                        v-for="item in coupons"
                        :key="item.id"
                        :label="`${item.name}—id:${item.id}`"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item prop="coupon_num" :rules="[simpleRule]" label="发放数量：">
                <el-input style="width:50%" type="number" v-model="form.coupon_num"></el-input>
            </el-form-item>

        </el-form>

        <div slot="footer" class="dialog-footer">
            <el-button @click="showDialog = false">取消</el-button>
            <el-button type="primary" @click="submit">确定</el-button>
      </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    props:{
        id:{},
        visable:[Boolean]
    },
    data(){
        return {
            simpleRule: { required: true, message: '必填项', trigger: 'change' },
            showDialog:false,
            form:{
                coupon_num:1,
                member_ids:'',
                coupon_id:''
            },
            coupons:[]
        }
    },
    watch:{
        visable(v){
            this.showDialog = v
        },
        showDialog(v){
            this.$emit('update:visable',v)
        },
        id(v){
            this.form.member_ids = v
        }
    },
    created(){
        this.getCoupons()
    },
    methods:{
        async getCoupons(){
            const { data } = await this.$api.activity.couponList({
                    pageSize: 10000,
                    page: 1
            });
            this.coupons = data.items
        },
        submit(){
            this.$refs.couponForm.validate((v)=>{
                if(v){
                    this.$api.activity.couponSend(this.form).then(res=>{
                        this.$refs.couponForm.resetFields()
                        this.showDialog = false
                    })
                }
            })
        }
    }
}
</script>