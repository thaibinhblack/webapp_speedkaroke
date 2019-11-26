<template>
<f7-page>
    <f7-navbar  back-link="Back" title="Thông tin cá nhân"></f7-navbar>
     <f7-toolbar top tabbar labels>
        <f7-link tab-link="#info" class="camera">
            <f7-icon class="icon-store" ios="material:account_box" aurora="material:account_box" md="material:account_box" >
            </f7-icon>
            <small>Thông tin cá nhân</small>
        </f7-link>
        <f7-link tab-link="#speedcoin" class="camera">
            <f7-icon class="icon-store" ios="material:flash_on" aurora="material:flash_on" md="material:flash_on" >
            </f7-icon>
            <small>SPEED COIN</small>
        </f7-link>
        <f7-link tab-link="#password" class="camera">
            <f7-icon class="icon-store" ios="material:vpn_key" aurora="material:vpn_key" md="material:vpn_key" >
            </f7-icon>
            <small>Mật khẩu</small>
        </f7-link>
        
    </f7-toolbar>
    <f7-tabs>
        <f7-tab id="info" tab-active>
            <f7-block>
                <div class="card" style="padding: 15px;">
                    <form action="">
                        <div class="form-group row">
                            <img width="70px" height="70px" :src="$store.state.PUBLIC_URL + user.AVATAR" alt="AVATAR" style="margin:auto;border-radius:50%">
                        </div>
                        <div class="form-group row">
                            <label for="emailuser" class="col-sm-4 col-xs-5 col-4 col-form-label" >Email</label>
                            <div class="col-sm-8 col-8 col-xs-7">
                                    <input type="email" disabled v-model="user.EMAIL" class="form-control" id="emailuser" aria-describedby="emailHelp" placeholder="Enter email" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="phoneuser" class="col-sm-4 col-xs-5 col-4 col-form-label" >Họ & Tên</label>
                            <div class="col-sm-8 col-8 col-xs-7">
                                    <input type="text" v-model="user.DISPLAY_NAME" class="form-control" id="phoneuser" aria-describedby="emailHelp" placeholder="Họ và tên" />
                            </div>
                        </div>
                       
                        <div class="form-group row">
                            <label for="provinceuser" class="col-sm-4 col-xs-5 col-4 col-form-label" >Tỉnh</label>
                            <div class="col-sm-8 col-8 col-xs-7" >
                                <select class="form-control" id="provinceuser" v-model="user.ID_PROVINCE"> 
                                    <option v-for="(province,index) in provinces" :key="index" :value="province.ID_PROVINCE">{{province.NAME_PROVINCE}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="provinceuser" class="col-sm-4 col-xs-5 col-4 col-form-label" >Quận / Huyện</label>
                            <div class="col-sm-8 col-8 col-xs-7" >
                                <select class="form-control" id="provinceuser" v-model="user.ID_DISTRICT"> 
                                    <option v-for="(district,index) in districts" :key="index" :value="district.ID_DISTRICT">{{district.NAME_DISTRICT}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="addressuser" class="col-sm-4 col-xs-5 col-4 col-form-label" >Địa chỉ</label>
                            <div class="col-sm-8 col-8 col-xs-7">
                                    <input type="text" v-model="user.ADDRESS" class="form-control" id="addressuser" aria-describedby="emailHelp" placeholder="Số điện thoại" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="phoneuser" class="col-sm-4 col-xs-5 col-4 col-form-label" >SĐT</label>
                            <div class="col-sm-8 col-8 col-xs-7">
                                    <input type="text" v-model="user.PHONE" class="form-control" id="phoneuser" aria-describedby="emailHelp" placeholder="Số điện thoại" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="genderuser" class="col-sm-4 col-xs-5 col-4 col-form-label" >Giới tính</label>
                            <div class="col-sm-4 col-4 col-xs-7">
                                    <input v-model="user.GENDER"  class="form-check-input" type="radio" name="male" id="genderuser" value="1" >
                                    <label class="form-check-label" for="exampleRadios1">
                                        Nam
                                    </label>
                                
                            </div>
                            <div class="col-sm-4 col-4">
                                <input v-model="user.GENDER" class="form-check-input" type="radio" name="female" id="genderuser" value="0" >
                                    <label class="form-check-label" for="exampleRadios1">
                                        Nữ
                                    </label>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="birthday" class="col-sm-4 col-xs-5 col-4 col-form-label" >Ngày sinh</label>
                            <div class="col-sm-8 col-8 col-xs-7">
                                    <input type="date" v-model="user.BIRTH_DAY" class="form-control" id="birthday"  placeholder="Ngày sinh" />
                            </div>
                        </div>
                        

                        <div class="form-group row">
                            <div class="col-sm-9">
                                <button type="submit" :disabled="update"  class="btn btn-primary btn-form">Cập nhật</button>
                                
                            </div>
                        </div>
                    </form>
                </div>
            </f7-block>
        </f7-tab>
        <f7-tab id="speedcoin">
            <f7-block>
                <div class="form-group row">
                    <label for="speedcoin" class="col-sm-4 col-xs-5 col-4 col-form-label" >SPEED COIN</label>
                    <div class="col-sm-8 col-8 col-xs-7">
                            <input disabled type="text" v-model="user.SPEED_COIN" class="form-control" id="speedcoin" placeholder="Họ và tên" />
                    </div>
                </div>
                <form action="">
                    <strong>Đổi SPEED COIN</strong>
                </form>
            </f7-block>
        </f7-tab>

        <f7-tab id="password">
            <f7-block>
                <form @submit.prevent="api_change_password()">
                     <div class="form-group row">
                        <label for="speedcoin" class="col-sm-4 col-xs-5 col-4 col-form-label" >Mật khẩu mới</label>
                        <div class="col-sm-8 col-8 col-xs-7">
                                <input  type="password" v-model="password.new_password" class="form-control" id="speedcoin" placeholder="Nhập mật khẩu mới" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="speedcoin" class="col-sm-4 col-xs-5 col-4 col-form-label" >Nhập mật khẩu mới xác thực</label>
                        <div class="col-sm-8 col-8 col-xs-7">
                                <input  type="password" v-model="password.confirm_password" class="form-control" id="speedcoin" placeholder="Nhập lại mật khẩu xác thực" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-9">
                            <button type="submit"   class="btn btn-primary btn-form">Cập nhật mật khẩu</button>
                            
                        </div>
                    </div>
                </form>
            </f7-block>
        </f7-tab>
    </f7-tabs>
</f7-page>
</template>

<script>
export default {
    data()
    {
        return {
            user: {},
            provinces: [],
            districts: [],
            password: {

            }
        }
    },
    methods: {

        ApiGetToken()
        {
            this.axios.get(this.$store.state.API_URL + 'user/token?api_token='+this.$session.get('token')).then((response) => {
                this.user = response.data
                this.api_district(response.data.ID_DISTRICT)
            })
        },
        api_province()
        {
            this.axios.get(this.$store.state.API_URL + 'province').then((response) => {
                this.provinces = response.data
            })
        },
        api_district(id)
        {
            this.axios.get(this.$store.state.API_URL + 'district?ID_PROVINCE='+id).then((response) => {
                this.districts = response.data
            })
        },
        api_change_password()
        {
            const password = new FormData();
            const app = this;
            if(this.password.new_password == this.password.confirm_password)
            {
                
                this.axios.post(this.$store.state.API_URL + 'change_password?api_token='+this.$session.get('token'),password).then((response) => {
                    app.$f7.dialog.alert(response.data)
                })
               
            }
            else
            {
                app.$f7.dialog.alert('Mật khẩu xác thực không đúng!')
            }
            
        }
    },
    mounted()
    {
        this.ApiGetToken()
        this.api_province()
    }
}
</script>