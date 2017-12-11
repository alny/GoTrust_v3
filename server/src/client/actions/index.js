export const FETCH_USERS = 'fetch_users';
export const fetchUsers = () => async (dispatch, getState, api) => {
  const res = await api.get('/user/active');

  dispatch({
    type: FETCH_USERS,
    payload: res
  });
};

export const FETCH_CURRENT_USER = 'fetch_current_user';
export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  const res = await api.get('/current_user');

  dispatch({
    type: FETCH_CURRENT_USER,
    payload: res
  });
};

export const FETCH_ADMINS = 'fetch_admins';
export const fetchAdmins = () => async (dispatch, getState, api) => {
  const res = await api.get('/admins');

  dispatch({
    type: FETCH_ADMINS,
    payload: res
  });
};

export const CHECK_LINK = 'check_link';
export const checkFacebook = (id) => async (dispatch, getState, api) => {
  const res = await api.get('/checkFacebook/' + id);

  return dispatch({
    type: CHECK_LINK,
    payload: res
  });
};

export const CHECK_STEAM_LINK = 'check_steam_link';
export const checkSteam = (id) => async (dispatch, getState, api) => {
  const res = await api.get('/checkSteam/' + id);

  return dispatch({
    type: CHECK_STEAM_LINK,
    payload: res
  });
};

export const FETCH_PROFILE = 'fetch_profile';
export const fetchProfile= (id) => async (dispatch, getState, api) => {
  const res = await api.get('/profile/' + id);

  dispatch({
    type: FETCH_PROFILE,
    payload: res
  });
};

export const FETCH_TOP_USER = 'fetch_top_user';
export const fetchTopUser= () => async (dispatch, getState, api) => {
  const res = await api.get('/user/top');

  dispatch({
    type: FETCH_TOP_USER,
    payload: res
  });
};

export const FETCH_MIDDLEMEN = 'fetch_middlemen';
export const fetchMiddlemen = () => async (dispatch, getState, api) => {
  const res = await api.get('/user/middlemen');

  dispatch({
    type: FETCH_MIDDLEMEN,
    payload: res
  });
};

export const PLUS_REP = 'plus_rep';
export const plusRep = (params) => async (dispatch, getState, api) => {
  const res = await api.put('/rep/plus', params);

  return dispatch({
    type: PLUS_REP,
    payload: res,
    params: params
  });
};

export const MINUS_REP = 'minus_rep';
export const minusRep = (params) => async (dispatch, getState, api) => {
  const res = await api.put('/rep/minus', params);

  return dispatch({
    type: MINUS_REP,
    payload: res,
    params: params
  });
};


export const POST_COMMENT = 'post_comment';
export const postComment = (params) => async (dispatch, getState, api) => {
  const res = await api.post('/user/comment', params);

  dispatch({
    type: POST_COMMENT,
    payload: res,
    params: params
  });
};

export const TRADE_URL = 'trade_url';
export const updateTradeUrl = (params) => async (dispatch, getState, api) => {
  const res = await api.put('/user/tradeurl', params);

  return dispatch({
    type: TRADE_URL,
    payload: res,
    params: params
  });
};

export const FETCH_INVENTORY = 'fetch_inventory';
export const fetchInventory = (id) => async (dispatch, getState, api) => {
  const res = await api.get('/user/inventory/' + id);

  dispatch({
    type: FETCH_INVENTORY,
    payload: res
  });
};

export const FETCH_TRADES = 'fetch_trades';
export const fetchTrades= () => async (dispatch, getState, api) => {
  const res = await api.get('/user/get/trades');
  dispatch({
    type: FETCH_TRADES,
    payload: res
  });
};

export const POST_TRADE = 'post_trade';
export const postTrade = (params) => async (dispatch, getState, api) => {
  const res = await api.post('/user/post/trade', params);

  dispatch({
    type: POST_TRADE,
    payload: res,
    params: params
  });
};

export const POST_BID = 'post_bid';
export const postBid = (params) => async (dispatch, getState, api) => {
  const res = await api.post('/user/post/bid', params);

  dispatch({
    type: POST_BID,
    payload: res,
    params: params
  });
};
