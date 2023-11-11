<template>
    <div class="home">
        <banner isHome="true"></banner>
        <div class="site-content ">
              <!-- <div style="margin-bottom: 20px;">
                <el-button
                  size="small"
                  @click="addTab(editableTabsValue)"
                >
                  add tab
                </el-button>
              </div>
              <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
                <el-tab-pane
                  v-for="(item, index) in editableTabs"
                  :key="item.name"
                  :label="item.title"
                  :name="item.name"
                >
                </el-tab-pane>
              </el-tabs> -->
        </div>
        <div class="site-content">
            <!--通知栏-->
            <!-- <div class="notify">
                <div class="search-result" v-if="hideSlogan">
                    <span v-if="searchWords">搜索结果："{{searchWords}}" 相关文章</span>
                    <span v-else-if="category">分类 "{{category}}" 相关文章</span>
                </div>
                <quote v-else>{{notice}}</quote>
            </div> -->
            <!--焦点图-->
            <!-- <div class="top-feature" v-if="!hideSlogan">
                <section-title>
                    <div style="display: flex;align-items: flex-end;">聚焦<small-ico></small-ico></div>
                </section-title>
                <div class="feature-content">
                    <div class="feature-item" v-for="item in features" :key="item.title">
                        <Feature :data="item"></Feature>
                    </div>
                </div>
            </div> -->
            <!--文章列表-->
            <main class="site-main" :class="{'search':hideSlogan}">
                <section-title v-if="!hideSlogan">推荐</section-title>
                <template v-for="item in postList">
                    <post :post="item" :key="item.id"></post>
                </template>
            </main>

            <!--加载更多-->
            <div class="more" v-show="hasNextPage">
                <div class="more-btn" @click="loadMore">More</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Banner from '@/components/banner'
    import Feature from '@/components/feature'
    import sectionTitle from '@/components/section-title'
    import Post from '@/components/post'
    import SmallIco from '@/components/small-ico'
    import Quote from '@/components/quote'
    import {fetchFocus, fetchList} from '../api'
    export default {
        name: 'Home',
        props: ['cate', 'words'],
        data() {
            return {
                features: [],
                postList: [
                    {
                        id:0,
                        isTop:true,
                        banner:"https://s1.ax1x.com/2020/05/14/YDhagx.jpg", // 封面图
                        isHot:true,
                        pubTime:294095007045, //日期
                        title:"看一遍闭着眼都会安装Lua了", //大标题
                        summary:"Lua 是一种轻量小巧的脚本语言，能为应用程序提供灵活的扩展和定制功能。", //详情
                        content:"", //正文
                        viewsCount:4045,
                        commentsCount:99
                    }
                ],
                currPage: 1,
                hasNextPage: false,
                editableTabsValue: '2',
                editableTabs: [{
                    title: 'Tab 1',
                    name: '1',
                    content: 'Tab 1 content'
                }, {
                    title: 'Tab 2',
                    name: '2',
                    content: 'Tab 2 content'
                }],
                tabIndex: 2
            }
        },
        components: {
            Banner,
            Feature,
            sectionTitle,
            Post,
            SmallIco,
            Quote
        },
        computed: {
            searchWords() {
                return this.$route.params.words
            },
            category() {
                return this.$route.params.cate
            },
            hideSlogan() {
                return this.category || this.searchWords
            },
            notice() {
                return this.$store.getters.notice
            }
        },
        methods: {
            addTab(targetName) {
                let newTabName = ++this.tabIndex + '';
                this.editableTabs.push({
                    title: 'New Tab',
                    name: newTabName,
                    content: 'New Tab content'
                });
                this.editableTabsValue = newTabName;
            },
            removeTab(targetName) {
                let tabs = this.editableTabs;
                let activeName = this.editableTabsValue;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                            if (tab.name === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name;
                            }
                        }
                    });
                }
                
                this.editableTabsValue = activeName;
                this.editableTabs = tabs.filter(tab => tab.name !== targetName);
            },
            fetchFocus() {
                fetchFocus().then(res => {  
                    debugger
                    console.log(res.data)
                    debugger
                    this.features = res.data || []
                }).catch(err => {
                    console.log(err)
                })
            },
            fetchList() {
                fetchList().then(res => {
                    // this.postList = res.data.items || []
                    // this.currPage = res.data.page
                    // this.hasNextPage = res.data.hasNextPage
                }).catch(err => {
                    console.log(err)
                })
            },
            loadMore() {
                fetchList({page:this.currPage+1}).then(res => {
                    // this.postList = this.postList.concat(res.data.items || [])
                    // this.currPage = res.data.page
                    // this.hasNextPage = res.data.hasNextPage
                })
            }
        },
        mounted() {
            this.fetchFocus();
            this.fetchList();
        }
    }
</script>
<style scoped lang="less">
    .el-tabs__item .is-top .is-closable {
        
    }
    .site-content {
        .notify {
            margin: 60px 0;
            border-radius: 3px;
            & > div {
                padding: 20px;
            }
        }
        .search-result {
            padding: 15px 20px;
            text-align: center;
            font-size: 20px;
            font-weight: 400;
            border: 1px dashed #ddd;
            color: #828282;
        }
    }
    .top-feature {
        width: 100%;
        height: auto;
        margin-top: 30px;

        .feature-content {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            position: relative;

            .feature-item {
                width: 32.9%;
            }
        }
    }

    .site-main {
        padding-top: 80px;

        &.search {
            padding-top: 0;
        }
    }

    .more{
        margin: 50px 0;
        .more-btn{
            width: 100px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            color: #ADADAD;
            border: 1px solid #ADADAD;
            border-radius: 20px;
            margin: 0 auto;
            cursor: pointer;
            &:hover{
                color: #8fd0cc;
                border: 1px dashed #8fd0cc;
            }
        }
    }

    /******/
    @media (max-width: 800px) {
        .top-feature {
            display: none;
        }

        .site-main {
            padding-top: 40px;
        }

        .site-content {
            .notify {
                margin: 30px 0 0 0;
            }

            .search-result {
                margin-bottom: 20px;
                font-size: 16px;
            }
        }
    }
    /******/
</style>