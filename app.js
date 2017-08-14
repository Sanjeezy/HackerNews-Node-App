////Sanjay Tamizharasu
//Sample node app
const https = require('https');

function printMessage(itemID, type, title, score) {
	//print message to console
	//console.log(userName + "has" + badgecount + "badges" + "and" + points + "points");
	const mssg = `${itemID} is of type ${type}, its title is: ${title} badges and it has ${score} points`;
	console.log(mssg);
}

function displayComments(commentID) {
  const req = https.get(`https://hacker-news.firebaseio.com/v0/item/${commentID}.json`, response => {
    var body = "";

    response.on('data', (data) => {
			body +=  data.toString();
		});

		response.on('end', () => {
			const comment = JSON.parse(body);
			//console.dir(comment);
      //console.log('\n');
      const mssg = `id:${commentID},\n comment:${comment.text}\n`
      console.log(mssg);
		});
  });
}

function getProfile(itemID) {
	const request = https.get(`https://hacker-news.firebaseio.com/v0/item/${itemID}.json`, response => {
	   var body = "";

		response.on('data', (data) => {
			body +=  data.toString();
		});

		response.on('end', () => {
			const item = JSON.parse(body);
			//console.dir(item);
			printMessage(itemID, item.type, item.title, item.score);
      		console.log("\n");

      if(item.kids.length > 0) {
        item.kids.forEach(displayComments);
      }
		});
  });
}

getProfile(8863); //dropbox post
