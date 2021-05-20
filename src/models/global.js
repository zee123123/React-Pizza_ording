export default {
  namespace: "global",

  state: {
    userInfo: {
      email: null,
      pwd: null,
      key: null,
    },
  },

  subscriptions: {},

  effects: {
    // dispatch User Information
    *setUserInfo({ payload }, { put }) {
      // eslint-disable-line
      yield put({ type: "set_userinfo", payload });
    },
  },

  reducers: {
    // Set Users' Information: the state
    set_userinfo(state, { payload }) {
      return { ...state, userInfo: payload };
    },
  },
};
