var stat = {}
stat.scoreMultiplier = 1;
stat.totalNumberOfShotsFired = 0;
stat.numberOfSuccessfulShots = 0;
stat.avgTimesShotsWrapped=0;
stat.fuelUsed = 0;
stat.timesShotWrap=0;
stat.timesShot=0;
stat.asteroidsHit=0;

stat.Stats = function Stats(){
//Avg game shots that wrapped
stat.avgTimesShotsWrapped=(stat.timesShotWrap)/stat.timesShot;
//TODO: Fix accuracy
//accuracy=stat.asteroidsHit/stat.timesShot;
}
module.exports = stat;


//TODO these things might get overwritten
//var accuracy = stat.numberOfSuccessfulShots/totalNumberOfShotsFired;
