const db =  require('mongoose');

const LikeSchema = db.Schema({
    user: {
        type: db.Schema.Types.ObjectId,
        ref: 'User'
    },
    likeable: {
        type: db.Schema.Types.ObjectId,
        required: true,
    },
},{
    timestamps: true
})

const Like = db.model('Like',LikeSchema);

module.exports = Like;