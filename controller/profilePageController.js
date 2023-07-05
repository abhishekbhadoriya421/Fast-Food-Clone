const User = require("../modules/User");
module.exports.ProfilePage = function (req, res) {
  return res.render("ProfilePage/profilePage.ejs");
};

// Fetching all friend's
let getUserDetails = async (id) => {
  return User.findById(id);
};

// Fetching other user's
module.exports.userProfile = async (req, res) => {
  try {
    let userId = req.query.id;
    let userDetails = await User.findById(userId);
    let { image, friends, fullName, email, phone, address, gender } =
      userDetails;
    if (friends.length > 0) {
      friends = await Promise.all(
        friends.map((id) => {
          return getUserDetails(id);
        })
      );

      friends = friends.map((obj) => ({
        name: obj.fullName,
        email: obj.email,
        image: obj.image,
        id: obj.id,
      }));
    }
    return res.render("ProfilePage/profilePage", {
      id: userId,
      image: image,
      friends: friends,
      fullName: fullName,
      email: email,
      phone: phone,
      address: address,
      gender: gender,
    });
  } catch (err) {
        res.redirect('back');
  }
};

// Add or remove friend
module.exports.createFriend = async (req, res) => {
  try {
    let userId = req.query.id;
    let type = req.query.type;

    if (type === "unfriend") {
      // Friend is removed
      req.user.friends.pull(userId);
      await req.user.save();
    } else {
      // addFriend
      req.user.friends.push(userId);
      await req.user.save();
    }
    return res.redirect("back");
  } catch (err) {
    res.redirect("back");
  }
};

// Update Image
module.exports.updateImage = async (req, res) => {
  try {
    let profilePic = `/uploads/${req.file.filename}`;
    req.user.image = profilePic;
    await req.user.save();
    res.redirect("back");
  } catch (err) {
    return res.redirect("back");
  }
};
