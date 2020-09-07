import Vue from "vue"


export async function loadHelper({ state, commit, rootState }, path, commitId, params) {
    try {
        commit("setLoading", true, { root: true })
        const res = await Vue.prototype.$axios.get(path, {params})
        //console.log("load result", path, res.status);
        commit(commitId, res.data)
    }
    catch (error) {
        //console.error("ERROR", error, path);
        console.error("ERROR!!!!!", error.message);
        commit('setError', error.message, { root: true });
    }
    finally {
        commit("setLoading", false, { root: true })
    }
}
 