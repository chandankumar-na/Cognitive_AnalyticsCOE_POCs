
var skill;
var time_period;
var quarter;

exports.setSkill = function (_skill) {
    skill = _skill;
};
exports.setTimePeriod = function (_time_period) {
    time_period = _time_period;
};
exports.setQuarter = function (_quarter) {
    quarter = _quarter;
};

exports.getInput= function () {
    return {
        skill: skill,
        time_period:time_period,
        quarter:quarter
    };
};