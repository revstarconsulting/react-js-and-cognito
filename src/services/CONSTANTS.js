/**
 * All API urls and other constants will reside here.
 * It is always a good idea to keep a local copy of all API response to 
 * keep your app working for UI changes and 
 * make it independent of network requirements.
 * 
 * They need to be categorised and grouped together as:
 *  - Actual endpoints url.
 *  - Local data .json file path.
 * At a moment only one group should be uncommented.
 * 
 * Other way to deal with this is to name every json file as per your service endpoint and use a basepath variable.
 * Toggle this basePath variable between "actual-domain.com/" or "/data/".
 */

// Actual endpoints. Uncomment below section to use actual data.
// export const GET_ALL_USERS = () => `https://jsonplaceholder.typicode.com/users`;
// export const GET_USER_DETAILS = (id) => `https://jsonplaceholder.typicode.com/users/${id}`;

// Local endpoints. Uncomment below section to use dummy local data.

export const USERS_API = `${process.env.REACT_APP_STAGE && process.env.REACT_APP_STAGE === 'local' ? '/users':''}/users/`;
export const ORGANIZATIONS_API = `${process.env.REACT_APP_STAGE && process.env.REACT_APP_STAGE === 'local' ? '/organizations':''}/organizations/`;
export const SITES_API = `${process.env.REACT_APP_STAGE && process.env.REACT_APP_STAGE === 'local' ? '/sites':''}/sites/`;
export const ORGANIZATIONS_USERS_API = `${process.env.REACT_APP_STAGE && process.env.REACT_APP_STAGE === 'local' ? '/organizations-users':''}/organizations-users/`;
export const USERS_GROUPS = `${process.env.REACT_APP_STAGE && process.env.REACT_APP_STAGE === 'local' ? '/users-groups':''}/users-groups/`;
export const SITES_GROUPS_API = `${process.env.REACT_APP_STAGE && process.env.REACT_APP_STAGE === 'local' ? '/sites-groups':''}/sites-groups/`;

export const GROUPS_API = `${process.env.REACT_APP_STAGE && process.env.REACT_APP_STAGE === 'local' ? '/groups':''}/groups/`;
export const VALUES_DEFINITIONS_API = `${process.env.REACT_APP_STAGE && process.env.REACT_APP_STAGE === 'local' ? '/values-definitions':''}/values-definitions/`;
export const SHIFTS_API = `${process.env.REACT_APP_STAGE && process.env.REACT_APP_STAGE === 'local' ? '/shifts':''}/shifts/`;
export const GET_USER_DETAILS = (id) => `/data/user`;
