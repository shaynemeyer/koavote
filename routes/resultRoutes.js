var parse = require("co-body");
var render = require("./../lib/render.js");
var utils = require("./../lib/utils.js");
var db = require("./../lib/db.js");

module.exports.showResultPage = function *() {
  var questionList = yield db.questions.find({});
  this.body = yield render("result", { questions : questionList });
};

module.exports.renderResultsFile = function *() {
  var postedData = yield parse(this);
  postedData.tags = utils.splitAndTrimTagString(postedData.tagString);

  var vm = { votes : yield getVotesForCritera(postedData) };

  this.set("content-type", "application/vnd.ms-excel");
  this.set("content-disposition", "attachment;filename=results.xls");

  this.body = yield render('showResults', vm);
};

function *getVotesForCritera(postedCriteria){
  // append values to filter object
  var filter = { };
  if(postedCriteria.questionTitle != ''){
    filter.questionTitle = postedCriteria.questionTitle;
  }

  if(postedCriteria.tags.length > 0){
    filter.tags = { $in : postedCriteria.tags};
  }

  if(postedCriteria.from.length > 0){
    filter.created_at = {
      $gte: utils.yyyymmdd_to_date(postedCriteria.from),
      $lte: utils.yyyymmdd_to_date(postedCriteria.to)
    };
  }

  // Do search with the configured filter object
  return yield db.votes.find(filter);
};