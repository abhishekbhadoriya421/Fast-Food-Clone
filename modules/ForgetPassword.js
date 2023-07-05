const db =  require('mongoose');

const ForgetSchema = db.Schema({
    email: {
        type: String,
        required : true
    },
    OTP: {
        type: String,
        required : true
    },
},{
    timestamps: true
})

const ForgetPassword = db.model('ForgetPassword',ForgetSchema);

module.exports = ForgetPassword;