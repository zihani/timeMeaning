import Vue from 'vue'
import Vuex from 'vuex'
import {getTimeInterval} from '../utils/index'
import {fetchSocial,fetchSiteInfo} from '@/api'
Vue.use(Vuex)
// 略:后台获取系统运行时间
const runAt = '1589878800000';
let timer = null;
const state = {
    loading: false,
    runTimeInterval: '',
    socials: '',
    websiteInfo: '',
    todoshow:false,
    postList:[]
}
const mutations = {
    SET_LOADING: (state, v) => {
        state.loading = v;
    },
    SET_SOCIALS: (state, v) => {
        state.socials = v;
    },
    SET_SITE_INFO: (state, v) =>{
      state.websiteInfo = v;
    },
    GET_RUNTIME_INTERVAL: (state) => {
        if (!timer || !state.runTimeInterval) {
            clearInterval(timer)
            timer = setInterval(() => {
                state.runTimeInterval = getTimeInterval(runAt);
            }, 1000);
        }
    },
    SET_UPDATE_TODOSHOW:(state,v) =>{
        state.todoshow = !state.todoshow
    },
    SET_ARTICLE:(state,v) =>{
        // if(v){
        //     setStorage("postList",v) 
        //     state.postList = v
        // }
    },
    GET_ARTICLE:(state,v) =>{
        // const postList = getStorage("postList")
        // if(postList && postList.length > 0){
        //      state.postList = getStorage("postList")
        // }
    }
}
const actions = {
    setLoading: ({commit}, v) => {
        commit('SET_LOADING', v);
    },
    initComputeTime: ({commit}) => {
        commit('GET_RUNTIME_INTERVAL');
    },
    getSiteInfo: ({commit,state}) =>{
        return new Promise(resolve => {
            if (state.websiteInfo){
                resolve(state.websiteInfo)
            }else {
                fetchSiteInfo().then(res => {
                    let data = res.data || {}
                    commit('SET_SITE_INFO',data);
                    resolve(data);
                }).catch(err => {
                    resolve({});
                })
            }
        })
    },
    getSocials: ({commit,state}) =>{
        return new Promise((resolve => {
            if (state.socials){
                resolve(state.socials)
            } else {
                fetchSocial().then(res =>{
                    let data = res.data || []
                    commit('SET_SOCIALS',data);
                    resolve(data);
                }).catch(err =>{
                    resolve([]);
                })
            }
        }))
    },
    updateToDoShow:({commit,state}) =>{
        return new Promise((resolve => {
            commit('SET_UPDATE_TODOSHOW');
            resolve();
        }))
    },
    initPostList: ({commit}) => {
        commit('GET_ARTICLE');
    },
    //    this.$store.dispatch('savePostList',)
    savePostList:({commit,state}) =>{
        return new Promise((resolve => {
            commit('SET_ARTICLE',state);
            resolve();
        }))
    },
}
const getters = {
    loading: state => state.loading,
    runTimeInterval: state => state.runTimeInterval,
    notice: state => state.websiteInfo?state.websiteInfo.notice:'',
    todoshow: state => state.todoshow,
    postList: state => state.postList
}
export default new Vuex.Store({
    state,
    mutations,
    actions,
    modules: {},
    getters
})
