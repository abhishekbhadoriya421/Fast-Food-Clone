const db =  require('mongoose');

const CommentSchema = db.Schema({
    content: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userId : {
        type: db.Schema.Types.ObjectId,
        ref : 'User'
    },
    mealId: {
        type: Number,
        ref : 'Meal'
    },
},{
    timestamps: true
})

const Comment = db.model('Comment',CommentSchema);

module.exports = Comment;