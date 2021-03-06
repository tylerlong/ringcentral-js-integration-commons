import RcModule from '../../lib/RcModule';
import moduleStatuses from '../../enums/moduleStatuses';

export default class Brand extends RcModule {
  constructor({ id, name, fullName, application, ...options }) {
    super(options);
    this._reducer = (state = {
      id,
      name,
      fullName,
      application,
    }) => state;
  }
  get id() {
    return this.state.id;
  }
  get name() {
    return this.state.name;
  }
  get fullName() {
    return this.state.fullName;
  }
  get application() {
    return this.state.application;
  }
  // eslint-disable-next-line class-methods-use-this
  get status() {
    return moduleStatuses.ready;
  }

  // eslint-disable-next-line class-methods-use-this
  get ready() {
    return true;
  }
}
