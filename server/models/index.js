// 當有人 require("./models") 時，會直接獲得這兩個屬性：user 和 course
module.exports = {
  user: require("./user-model"),
  course: require("./course-model"),
};
