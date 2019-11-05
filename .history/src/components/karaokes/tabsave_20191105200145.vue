<template>
<f7-page>
    <f7-block>
        <h3 align="center" style="margin-bottom:25px;">Hãy để lại nhận xét của bạn để chi nhánh phát triển hơn!</h3>
        <f7-row v-for="(comment,index) in comments" :key="index">
            <f7-col width="15" class="AVATAR">
                <img v-if="user.TYPE_USER == 'FACEBOOK'" width="48px" height="48px"   :src="user.AVATAR" alt="">
                <img v-else-if="user.TYPE_USER == 'GOOGLE'" width="48px" height="48px"   :src="user.AVATAR" alt="">
                <img v-else :src="$store.state.PUBLIC_URL + user.AVATAR" width="48px" height="48px" >
            </f7-col>
        </f7-row>
        <f7-row>
            <f7-col width="15" class="avatar">
                <img v-if="user.TYPE_USER == 'FACEBOOK'" width="48px" height="48px"   :src="user.AVATAR" alt="">
                <img v-else-if="user.TYPE_USER == 'GOOGLE'" width="48px" height="48px"   :src="user.AVATAR" alt="">
                <img v-else :src="$store.state.PUBLIC_URL + user.AVATAR" width="48px" height="48px" >
            </f7-col>
            <f7-col width="85">
                <input type="text" v-model="value_comment" class="comment" placeholder="Nhập bình luận đánh giá chi nhánh!"> 
            </f7-col>
            <f7-col>
                <f7-button @click="comment_karaoke()" style="text-align:right">Bình luận</f7-button>
            </f7-col>
        </f7-row>
    </f7-block>
</f7-page>
</template>

<script>
export default {
    data()
    {
        return {
            user: {},
            value_comment: '',
            comments: []

        }
    },
    methods: {
        ApiGetToken()
        {
            this.axios.get(this.$store.state.API_URL + 'user/token?api_token='+this.$session.get('token')).then((response) => {
                this.user = response.data
            })
        },
        api_comment()
        {
            this.axios.get(this.$store.state.API_URL + 'comment/'+this.$f7route.params.UUID).then((response) => {
                this.comments = response.data
                console.log(response.data)
            })
        },
        comment_karaoke()
        {
            if(this.value_comment != '')
            {
                const data = new FormData()
                data.append("UUID_BAR_KARAOKE",this.$f7route.params.UUID)
                data.append("CONTENT_COMMENT",this.value_comment)
                this.axios.post(this.$store.state.API_URL + 'comment?api_token='+this.$session.get('token'),data).then(() => {
                    this.value_comment  = ''
                })
            }
        }
    },
    mounted()
    {
        if(!this.$session.has('token'))
        {
            this.$f7router.navigate('/login/')
        }
        this.ApiGetToken()
        this.api_comment()
    }
}
</script>

<style scoped>
.avatar img {border-radius: 50%}
.comment {border: 1px solid #e2e2e2; height: 70px;width: 100%;padding: 15px;border-radius: 5px;}
</style>