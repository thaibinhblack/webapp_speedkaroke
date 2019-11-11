<template>
<f7-page>
    <f7-block>
        <h3 align="center" style="margin-bottom:25px;">Hãy để lại nhận xét của bạn để chi nhánh phát triển hơn!</h3>
        <span><star-rating :star-size="18" :increment="0.5" :rating="room.STAR_RATING" :show-rating="false" 
        @rating-selected="rating = $event"  >
         </star-rating></span>
        
        <f7-row v-for="(comment,index) in comments" :key="index">
            <f7-col width="15" class="AVATAR">
                <img v-if="user.TYPE_USER == 'FACEBOOK'" width="48px" height="48px"   :src="comment.AVATAR" alt="">
                <img v-else-if="user.TYPE_USER == 'GOOGLE'" width="48px" height="48px"   :src="comment.AVATAR" alt="">
                <img v-else :src="$store.state.PUBLIC_URL + comment.AVATAR" width="48px" height="48px" >
                {{user.USERNAME}}
            </f7-col>
            <f7-col width="85">
                <p>{{comment.CONTENT_COMMENT}}</p>
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
import StarRating from 'vue-star-rating'
export default {
    components:
    {
        StarRating,
    },
    props: ["room"],
    data()
    {
        return {
            user: {},
            value_comment: '',
            comments: [],
            rating: 0

        }
    },
    watch:
    {
        rating(newVal)
        {
            this.ApiRating(newVal)
            console.log(newVal)
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
            this.axios.get('http://127.0.0.1:8000/api/v1/' + 'comment_room/'+this.$f7route.params.UUID).then((response) => {
                this.comments = response.data
                console.log(response.data)
            })
        },
        comment_karaoke()
        {
            if(this.$session.has('token'))
            {
                if(this.value_comment != '')
                {
                    const data = new FormData()
                    data.append("UUID_ROOM_BAR_KARAOKE",this.$f7route.params.UUID)
                    data.append("CONTENT_COMMENT",this.value_comment)
                    this.axios.post('http://127.0.0.1:8000/api/v1/' + 'comment_room?api_token='+this.$session.get('token'),data).then(() => {
                        this.value_comment  = ''
                        this.api_comment()
                        this.likeRoom() 
                        this.$f7.dialog.preloader()
                        setTimeout(() => {
                            this.$f7.dialog.close()
                        },1500)
                    })
                }
                else
                {
                    this.$f7.dialog.alert('Bạn chưa nhập bình luận')
                }
            }
            else
            {
                this.$f7router.navigate('/login/')
            }
        },
        likeRoom()
        {
            if(!this.$session.has('token'))
            {
                this.$f7router.navigate('/login/')
            }
            else
            {
                const self = this;
                const app = self.$f7;
                this.axios.post(this.$store.state.API_URL + 'like_mobile?api_token='+this.$session.get('token')+'&UUID_ROOM_BAR_KARAOKE='+this.$f7route.params.UUID)
                .then(() => {
                    app.dialog.alert(`Lưu thành công`, () => {});
                })
            }
        },
        ApiRating(i)
        {
            this.$http.get('http://127.0.0.1:8000/api/v1/' + 'room/'+this.$f7route.params.UUID 
            + '/rating?api_token='+this.$session.get('token')+'&rating='+i).then((response) => {
               this.$f7.dialog.alert(response.data.message)
            })
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
        this.$f7.dialog.preloader()
        setTimeout(() => {
            this.$f7.dialog.close()
        },1500)
        // this.likeRoom()
    }
}
</script>

<style scoped>
.AVATAR img {border-radius: 50%}
.avatar img {border-radius: 50%}
.comment {border: 1px solid #e2e2e2; height: 70px;width: 100%;padding: 15px;border-radius: 5px;}
</style>