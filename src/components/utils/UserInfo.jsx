import config from '../../config';
import { getCacheObject } from '../helpers/globalHelpers/GlobalHelperFunctions';
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;
const userInfo = getCacheObject(SESSION_KEY_NAME);

export default userInfo;