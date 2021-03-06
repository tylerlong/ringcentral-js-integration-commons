import { expect } from 'chai';
import getWebphoneReducer, {
  getVideoElementPreparedReducer,
  getConnectionStatusReducer,
  getConnectRetryCountsReducer,
  getWebphoneCountsReducer,
  getActiveSessionIdReducer,
  getRingSessionIdReducer,
  getSessionsReducer,
  getErrorCodeReducer,
} from './getWebphoneReducer';

import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

import actionTypes from './actionTypes';
import connectionStatus from './connectionStatus';

describe('Webphone :: getVideoElementPreparedReducer', () => {
  it('getVideoElementPreparedReducer should be a function', () => {
    expect(getVideoElementPreparedReducer).to.be.a('function');
  });
  it('getVideoElementPreparedReducer should return a reducer', () => {
    expect(getVideoElementPreparedReducer()).to.be.a('function');
  });
  describe('videoElementPreparedReducer', () => {
    const reducer = getVideoElementPreparedReducer(actionTypes);
    it('should have initial state of false', () => {
      expect(reducer(undefined, {})).to.equal(false);
    });
    it('should return original state when actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
      .to.equal(originalState);
    });
    it('should return true when action.type is videoElementPrepared', () => {
      expect(reducer({}, { type: actionTypes.videoElementPrepared })).to.equal(true);
    });
  });
});

describe('Webphone :: getConnectionStatusReducer', () => {
  it('getConnectionStatusReducer should be a function', () => {
    expect(getConnectionStatusReducer).to.be.a('function');
  });
  it('getConnectionStatusReducer should return a reducer', () => {
    expect(getConnectionStatusReducer()).to.be.a('function');
  });
  describe('connectionStatusReducer', () => {
    const reducer = getConnectionStatusReducer(actionTypes);
    it('should have initial state of disconnected', () => {
      expect(reducer(undefined, {})).to.equal(connectionStatus.disconnected);
    });
    it('should return original state when actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
      .to.equal(originalState);
    });

    it('should return connecting when actionTypes is connect or reconnect', () => {
      [
        actionTypes.connect,
        actionTypes.reconnect,
      ].forEach((type) => {
        expect(reducer('foo', {
          type,
        })).to.equal(connectionStatus.connecting);
      });
    });

    it('should return connected when actionTypes is registered', () => {
      expect(reducer('foo', { type: actionTypes.registered, }))
        .to.equal(connectionStatus.connected);
    });

    it('should return disconnected when actionTypes is unregistered', () => {
      expect(reducer('foo', { type: actionTypes.unregistered, }))
        .to.equal(connectionStatus.disconnected);
    });

    it('should return disconnecting when actionTypes is disconnect', () => {
      expect(reducer('foo', { type: actionTypes.disconnect, }))
        .to.equal(connectionStatus.disconnecting);
    });

    it('should return connectFailed when actionTypes is connectError or registrationFailed', () => {
      [
        actionTypes.connectError,
        actionTypes.registrationFailed,
      ].forEach((type) => {
        expect(reducer('foo', {
          type,
        })).to.equal(connectionStatus.connectFailed);
      });
    });
  });
});


describe('Webphone :: getConnectRetryCountsReducer', () => {
  it('getConnectRetryCountsReducer should be a function', () => {
    expect(getConnectRetryCountsReducer).to.be.a('function');
  });
  it('getConnectRetryCountsReducer should return a reducer', () => {
    expect(getConnectRetryCountsReducer()).to.be.a('function');
  });
  describe('connectRetryCountsReducer', () => {
    const reducer = getConnectRetryCountsReducer(actionTypes);
    it('should have initial state of zero', () => {
      expect(reducer(undefined, {})).to.equal(0);
    });

    it('should return original state when actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
      .to.equal(originalState);
    });

    it('should return original state + 1 when actionTypes is reconnect', () => {
      const originalState = 1;
      expect(reducer(originalState, { type: actionTypes.reconnect }))
        .to.equal(2);
    });

    it('should return zero when actionTypes is registered or resetRetryCounts', () => {
      [
        actionTypes.registered,
        actionTypes.resetRetryCounts,
      ].forEach((type) => {
        expect(reducer('foo', {
          type,
        })).to.equal(0);
      });
    });
  });
});

describe('Webphone :: getWebphoneCountsReducer', () => {
  it('getWebphoneCountsReducer should be a function', () => {
    expect(getWebphoneCountsReducer).to.be.a('function');
  });
  it('getWebphoneCountsReducer should return a reducer', () => {
    expect(getWebphoneCountsReducer()).to.be.a('function');
  });
  describe('webphoneCountsReducer', () => {
    const reducer = getWebphoneCountsReducer(actionTypes);
    it('should have initial state of zero', () => {
      expect(reducer(undefined, {})).to.equal(0);
    });

    it('should return original state when actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
      .to.equal(originalState);
    });

    it('should return original state + 1 when actionTypes is reconnect or connect', () => {
      [
        actionTypes.reconnect,
        actionTypes.connect,
      ].forEach((type) => {
        const originalState = 1;
        expect(reducer(originalState, {
          type,
        })).to.equal(2);
      });
    });

    it('should return original state - 1 when actionTypes is connectError, disconnect or registrationFailed', () => {
      [
        actionTypes.connectError,
        actionTypes.disconnect,
        actionTypes.registrationFailed,
      ].forEach((type) => {
        const originalState = 3;
        expect(reducer(originalState, {
          type,
        })).to.equal(2);
      });
    });
  });
});

describe('Webphone :: getActiveSessionIdReducer', () => {
  it('getActiveSessionIdReducer should be a function', () => {
    expect(getActiveSessionIdReducer).to.be.a('function');
  });
  it('getActiveSessionIdReducer should return a reducer', () => {
    expect(getActiveSessionIdReducer()).to.be.a('function');
  });
  describe('activeSessionIdReducer', () => {
    const reducer = getActiveSessionIdReducer(actionTypes);
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.equal(null);
    });

    it('should return original state when actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
      .to.equal(originalState);
    });

    it('should return sessionId when actionTypes is callStart', () => {
      const originalState = '1111';
      expect(reducer(originalState, {
        type: actionTypes.callStart,
        sessionId: '222',
      })).to.equal('222');
    });

    it(`should return original state when actionTypes is callEnd
        and sessionId is unequal original state`, () => {
      const originalState = '111';
      expect(reducer(originalState, {
        type: actionTypes.callEnd,
        sessionId: '222',
      })).to.equal('111');
    });

    it(`should return null when actionTypes is callEnd
        and sessionId is equal original state`, () => {
      const originalState = '111';
      expect(reducer(originalState, {
        type: actionTypes.callEnd,
        sessionId: '111',
      })).to.equal(null);
    });

    it('should return null when actionTypes is disconnect', () => {
      const originalState = '111';
      expect(reducer(originalState, {
        type: actionTypes.disconnect,
        sessionId: '222',
      })).to.equal(null);
    });
  });
});

describe('Webphone :: getRingSessionIdReducer', () => {
  it('getRingSessionIdReducer should be a function', () => {
    expect(getRingSessionIdReducer).to.be.a('function');
  });
  it('getRingSessionIdReducer should return a reducer', () => {
    expect(getRingSessionIdReducer()).to.be.a('function');
  });
  describe('ringSessionIdReducer', () => {
    const reducer = getRingSessionIdReducer(actionTypes);
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.equal(null);
    });

    it('should return original state when actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
      .to.equal(originalState);
    });

    it('should return sessionId when actionTypes is callRing', () => {
      const originalState = '1111';
      expect(reducer(originalState, {
        type: actionTypes.callRing,
        sessionId: '222',
      })).to.equal('222');
    });

    it(`should return original state when actionTypes is callEnd and callStart
        and sessionId is unequal original state`, () => {
      [
        actionTypes.callStart,
        actionTypes.callEnd,
      ].forEach((type) => {
        const originalState = '111';
        expect(reducer(originalState, {
          type,
          sessionId: '222',
        })).to.equal('111');
      });
    });

    it(`should return null when actionTypes is callEnd and callStart
        and sessionId is equal original state`, () => {
      [
        actionTypes.callStart,
        actionTypes.callEnd,
      ].forEach((type) => {
        const originalState = '111';
        expect(reducer(originalState, {
          type,
          sessionId: '111',
        })).to.equal(null);
      });
    });

    it('should return null when actionTypes is disconnect', () => {
      const originalState = '111';
      expect(reducer(originalState, {
        type: actionTypes.disconnect,
        sessionId: '222',
      })).to.equal(null);
    });
  });
});

describe('Webphone :: getSessionsReducer', () => {
  it('getSessionsReducer should be a function', () => {
    expect(getSessionsReducer).to.be.a('function');
  });
  it('getSessionsReducer should return a reducer', () => {
    expect(getSessionsReducer()).to.be.a('function');
  });
  describe('sessionsReducer', () => {
    const reducer = getSessionsReducer(actionTypes);
    it('should have initial state of empty array', () => {
      expect(reducer(undefined, {})).to.deep.equal([]);
    });
    it('should return original state when actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return empty array when actionTypes is destroySessions', () => {
      const originalState = {};
      expect(reducer(originalState, { type: actionTypes.destroySessions }))
        .to.deep.equal([]);
    });
    it('should return session array when actionTypes is updateSessions', () => {
      const originalState = [];
      const sessions = [{
        id: '123',
        direction: 'inbound',
        callStatus: 'test',
        request: {
          to: {
            uri: {
              user: 'test',
            },
            displayName: 'haha',
          },
          from: {
            uri: {
              user: 'test',
            },
            displayName: 'ha',
          },
        },
        startTime: 'Fri Apr 21 2017 13:39:34 GMT+0800',
        creationTime: 1492753174000,
        isOnHold: () => ({
          local: false,
        }),
        isOnMute: false,
        isOnRecord: false,
      }];
      expect(reducer(originalState, { type: actionTypes.updateSessions, sessions }))
        .to.equal(sessions);
    });
  });
});

describe('getWebphoneReducer', () => {
  it('should be a function', () => {
    expect(getWebphoneReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getWebphoneReducer(actionTypes)).to.be.a('function');
  });
  it('should return a combined reducer', () => {
    const reducer = getWebphoneReducer(actionTypes);
    const statusReducer = getModuleStatusReducer(actionTypes);
    const videoElementPreparedReducer = getVideoElementPreparedReducer(actionTypes);
    const connectionStatusReducer = getConnectionStatusReducer(actionTypes);
    const connectRetryCountsReducer = getConnectRetryCountsReducer(actionTypes);
    const webphoneCountsReducer = getWebphoneCountsReducer(actionTypes);
    const activeSessionIdReducer = getActiveSessionIdReducer(actionTypes);
    const ringSessionIdReducer = getRingSessionIdReducer(actionTypes);
    const sessionsReducer = getSessionsReducer(actionTypes);
    const errorCodeReducer = getErrorCodeReducer(actionTypes);
    expect(reducer(undefined, {})).to.deep.equal({
      status: statusReducer(undefined, {}),
      videoElementPrepared: videoElementPreparedReducer(undefined, {}),
      connectionStatus: connectionStatusReducer(undefined, {}),
      connectRetryCounts: connectRetryCountsReducer(undefined, {}),
      webphoneCounts: webphoneCountsReducer(undefined, {}),
      activeSessionId: activeSessionIdReducer(undefined, {}),
      ringSessionId: ringSessionIdReducer(undefined, {}),
      sessions: sessionsReducer(undefined, {}),
      errorCode: errorCodeReducer(undefined, {}),
    });
  });
});
