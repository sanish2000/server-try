module.exports = function (user, userDetail) {
    if (userDetail.name)
        user.name = userDetail.name;
    if (userDetail.username)
        user.username = userDetail.username;
    if (userDetail.password)
        user.password = userDetail.password;
    if (userDetail.email)
        user.email = userDetail.email;
    if (userDetail.dob)
        user.dob = userDetail.dob;
    if (userDetail.gender)
        user.gender = userDetail.gender;
    if (userDetail.phoneNumber)
        user.phoneNumber = userDetail.phoneNumber;
    if (userDetail.status)
        user.status = true;
    if (userDetail.inActiveStatus)
        user.status = false;
    if (userDetail.role)
        user.role = userDetail.role;
    if (userDetail.image)
        user.image = userDetail.image;
    if (userDetail.permanent_address || userDetail.temp_address) {
        if (!user.address) {
            user.address = {};
        }
        if (userDetail.permanenet_address)
            user.address.permanent_address = userDetail.permanent_address;
        if (userDetail.temp_address)
            user.address.temp_address = userDetail.temp_address.split(',');
    }
    return user;
}
