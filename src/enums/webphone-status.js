import Enum from '../lib/enum';

const definition = {
  // For registering
  preRegister: 'PRE_REGISTER',
  registerSuccessed: 'REGISTER_SUCCESSED',
  registerFailed: 'REGISTER_FAILED',
  // For callout and active call
  callConnecting: 'CALL_CONNECTING',
  callConnected: 'CALL_CONNECTED',
  callFailed: 'CALL_FAILED',
  // For incoming call
  callIncoming: 'CALL_INCOMING',
};

export default new Enum(definition);
