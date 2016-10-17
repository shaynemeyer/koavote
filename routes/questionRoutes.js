var render = require('./../lib/render');
var parse = require("co-body");
var db = require('./../lib/db');

module.exports.showNewQuestion = function *() {
  this.body = yield render("newQuestion");
};

module.exports.addQuestion = function *() {
  var postedData = yield parse(this);

  var questionToStore = {
    title: postedData.questionTitle,
    tags: splitAndTrimTagString(postedData.tagString)
  };

  var q = yield db.questions.insert(questionToStore);

 this.redirect("/question/" + q._id);
};

module.exports.showQuestion = function *(id) {
  var q = yield db.questions.findById(id);

  vm = {
    id: q._id.toString(),
    questionTitle: q.title,
    tagString: q.tags.join(', ')
  };

  this.body = yield render("showQuestion", vm);
};

function splitAndTrimTagString(tagString) {
  var tags = tagString.split(',');

  for(var i = 0; i < tags.length; i++){
    tags[i] = tags[i].trim();

    // Remove empty tags
    if(tags[i].length === 0) {
      tags.splice(i);
      i--;
    }
  }

  return tags;
};