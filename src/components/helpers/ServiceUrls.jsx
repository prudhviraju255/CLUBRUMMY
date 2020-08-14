
const BASE_URL = "http://localhost:8090";

const ServiceUrls = {

    CLUB_REGISTERED_USERS: BASE_URL + '/admin/getClubList',
    CLUB_CREATE_USER: BASE_URL + "/admin/clubRegistration",
    UPDATE_CLUB: BASE_URL + "/admin/updateClub",
    DELETE_CLUB: BASE_URL + "/admin/deleteClub",
    CHECK_CLUB_USERNAME_EXIST: BASE_URL + "/admin/checkClubUsername",

    USERS_LIST: BASE_URL + '/admin/getUserList',
    CREATE_USER: BASE_URL + "/admin/userRegistration",
    UPDATE_USER: BASE_URL + "/admin/updateUser",
    DELETE_USER: BASE_URL + "/admin/deleteUser",
    CHECK_USERNAME_EXIST: BASE_URL + "/admin/checkUsername",

    SUPER_ADMIN_LOGIN: BASE_URL + "/admin/superAdminLogin",
    ADMIN_LOGIN: BASE_URL + "/admin/clublogin",
    USER_LOGIN: BASE_URL + "/admin/userLogin",
};
export default ServiceUrls;