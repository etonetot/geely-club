import config from 'src/config.js';
import { loadHelper } from './common'


export default {
    namespaced: true,

    state: function() {
        return {
            chapters: [],
            docs: [],
            curDoc: 0,
            arrAllChapters: []
        }
    },

    getters: {
        docs: state => state.docs,
        chapters: state => state.chapters,
        curDoc: state => state.curDoc,
        arrAllChapters: state => state.arrAllChapters
    },

    mutations: {
        setDocs: (state, data) => {
            state.arrAllChapters = [];
            let curlevel = 0, root = [], parent = root, cur = 0;

            data.chapters.forEach(item => {
                if (item.level > curlevel) {
                    parent = cur;
                    curlevel = item.level;
                }
                else if (item.level < curlevel) {
                    curlevel = item.level;
                    parent = cur.parent.parent;
                }
                cur = { label: item.chaptername, parent: parent, id: item.id, checked: true };
                if (!parent.children)
                    parent.children = [];
                parent.children.push(cur);
                
                state.arrAllChapters.push(item.id)    
            });

            //console.log("SET_DOCS", data.rows, root.children);
            //state.arrCheckedChapters = root.id;
            state.docs = data.rows;
            state.chapters = root.children;
        },

        setDoc: (state, doc) => {
            doc.content = doc.content.replace(/\n/g, "<br />");
            state.curDoc = doc;
            state.loading = false;
        },

    },

    actions: {
        async load(ctx, {curCar}) {
            await loadHelper(ctx, config.apiVendor + curCar + '/getdocs', "setDocs")
        },

        async loadDoc(ctx, {docid}) {
            await loadHelper(ctx, 'getdoc', "setDoc", { docid })
        },

    },

};
