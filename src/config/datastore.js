import firebase from 'firebase';
// import iterable from 'react';
// import {Map} from 'react';
  
var config = {
  apiKey: "AIzaSyDC67XKc5L_EWNe6eTlo3FRSsMjAm9VZl0",
  authDomain: "dartpoll-firebase.firebaseapp.com",
  databaseURL: "https://dartpoll-firebase.firebaseio.com",
  projectId: "dartpoll-firebase",
  storageBucket: "dartpoll-firebase.appspot.com",
  messagingSenderId: "153871283278",
  appId: "1:153871283278:web:dbce95bb15c5b5f4817f1f",
  measurementId: "G-YE7VEVJSFY"
};

var ourDB = firebase.database();
var pollsRef = firebase.database();

export function addPoll(PollQuestion, PollChoices, PollCategory, PollTimeSeconds, PollTimeMinutes, PollTimeHours, PollTimeDays, PollTimeMonths, PollTimeYears, PollUser, StartTime, PollID) {
    ourDB.ref('PollBoard/').push({
        PollQuestion,
        PollChoices,
        PollCategory,
        PollTimeSeconds,
        PollTimeMinutes,
        PollTimeHours,
        PollTimeDays,
        PollTimeMonths,
        PollTimeYears,
        PollUser,
        StartTime,
        PollID
    });
    //this is pushing to the directory specified by the pollID
    //but I want to push a variable that essentially tracks the answer choice and num votes to the db

    var pollName = PollID.toString();
    var tempdir = pollsRef.ref('Polls').push({PollID});
    // pollsRef.ref(tempdir).set(PollID);
  
    
    for(let x = 0; x < PollChoices.length; x++){
        var choice = PollChoices[x].toString();
        var temptempdir =  pollsRef.ref(tempdir).push({choice, score: 0});
        // pollsRef.ref(temptempdir).set(choice);
        // pollsRef.ref(temptempdir).push({score: 0});
    }

}
export function updateVoteCount(ans, ansnum, pollID){
    console.log("in ds");
    console.log(ans, ansnum, pollID );
    let PollsDir = null;

    ourDB.ref('Polls/').on('value', (snapshot) => {
         PollsDir = snapshot.val();
    });
    console.log("everything in polls dir");
    console.log(PollsDir);
    
    let allPollsDir = null;
    //these var for when we increment val of ans 
    let anspath = null;
    let ansval = 0;
    //these will become 
    let pid1 = null;
    let pid2 = null;
    if(PollsDir != null){
        allPollsDir = Object.keys(PollsDir).map((id) => {
            //looking at poll id level 
            const info = PollsDir[id];
            console.log("value of id" + id);
            console.log("inside object map")
            console.log(info);
            //looking through answer choices
            Object.keys(PollsDir[id]).map((id2) => {
                const sinfo = PollsDir[id][id2];
                console.log("inside answers and votes")
                console.log(sinfo);
                if(PollsDir[id][id2].choice == ans){
                    //store path of answer 
                    pid1 = id;
                    pid2 = id2;
                    //retreieve current num votes
                    ansval = PollsDir[id][id2].score;
                }
            })
        });
    }
    //increment and push change 
    ansval += 1;
    let choice = ans;
    let score = ansval;
    anspath = "Polls/"+ pid1 +"/" + pid2;
    console.log("directory path:" +anspath);
    pollsRef.ref(anspath).set({choice, score});

}

export function removePoll(fbpollID, localPollID){
    //remove the poll from both poll board and polls
    ourDB.ref('PollBoard/' + fbpollID).remove();
    ourDB.ref('Polls/' + localPollID).remove();
}

export function fetchPolls(callBack){
    ourDB.ref('PollBoard/').on('value', (snapshot) => {
        const allPolls = snapshot.val();
        callBack(allPolls);
    });
}
// export function updatePoll(id, newName) {
//     ourDB.ref('PollBoard/' + id).on('value', (snapshot) => {
//         const updates = {pokemonName: newName};
//         const whereToUpdate = ourDB.ref('pkmn/' + id);
//         whereToUpdate.update(updates);
//     });
// }t


