
const PROMPT = "Generate release notes for an App Store or Play Store application for a new release that contains the following commit messages."
const USER_AGENT =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36';
export default async function handler(req, res) {
    return new Promise((resolve, reject) => {
        let prompt;
        switch (req.query.tone) {
            case "Formal":
                prompt = PROMPT + " Make it formal.\n" + req.body
                break;
            case "Funny":
                prompt = PROMPT + " Make it funny and edgy.\n" + req.body
                break;
            default:
                prompt = PROMPT + "\n" + req.body
                break;
        }
        fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + process.env.OPENAI_API_KEY,
                "Content-Type": "application/json",
                "User-Agent": USER_AGENT
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt,
                temperature: 0,
                max_tokens: 250
            })
        })
            .then(res => res.json())
            .then(json => {
                res.status(200).json(json.choices);
                resolve();
            })
            .catch(e => res.status(500));
    });
}