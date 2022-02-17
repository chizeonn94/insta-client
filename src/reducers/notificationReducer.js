const INITIAL_STATE = {
  notifications: [],
  unreadCount: 0,
  fetching: false,
  error: false,
};
const NotificationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_NOTIFICATION": {
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      };
    }
    case "FETCH_NOTIFICATIONS_START": {
      return {
        ...state,
        fetching: true,
        error: false,
      };
    }
    case "FETCH_NOTIFICATIONS_FAILURE": {
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    }
    case "FETCH_NOTIFICATIONS_SUCCESS": {
      const unreadCount = action.payload.filter(
        (notification) => notification.read === false
      ).length;
      return {
        ...state,
        fetching: false,
        error: false,
        notifications: action.payload,
        unreadCount,
      };
    }
    case "READ_NOTIFICATIONS": {
      const notifications = JSON.parse(JSON.stringify(state.notifications));
      notifications.forEach((notification) => (notification.read = true));
      return {
        ...state,
        unreadCount: 0,
        notifications,
      };
    }
    case "CLEAR_NOTIFICATIONS": {
      return {
        ...state,
        unreadCount: 0,
        notifications: [],
      };
    }
    default: {
      return state;
    }
  }
};

export default NotificationReducer;
