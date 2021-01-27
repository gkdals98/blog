export const state = () => ({
  cur_depth : "aaaaa"
})

export const mutations = {
  change(state, item) {
    state.cur_depth = item;
  }
}
