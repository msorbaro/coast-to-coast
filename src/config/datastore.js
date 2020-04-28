import firebase from 'firebase';
  
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

firebase.initializeApp(config);
ourDB = firebase.database();

export function addPoll(PollQuestion, PollChoices, PollCategory, PollTimeSeconds, PollTimeMinutes, PollTimeHours, PollTimeDays, PollTimeMonths, PollTimeYears, PollUser, StartTime) {
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
        StartTime
    });
}

export function removePoll(pollID){
    ourDB.ref('PollBoard/' + pollID).remove();
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
// }


