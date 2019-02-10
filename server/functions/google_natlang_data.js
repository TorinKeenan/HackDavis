const language = require('@google-cloud/language');
const client = new language.LanguageServiceClient();
const raw_text = "This is some test data lets see how it goes";

// var google_natlang_data = funtion(raw_text){
const document = {
    content: raw_text,
    type: 'PLAIN_TEXT',
};

client
    .analyzeSentiment({
        document: document
    })
    .then(results => {
        const sentiment = results[0].documentSentiment;

        console.log(`Text: ${text}`);
        console.log(`Sentiment score: ${sentiment.score}`);
        console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
    })
    .catch(err => {
        console.error('ERROR:', err);
    });
// }
// module.exports = google_natlang_data;
