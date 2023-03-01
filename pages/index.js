import Head from 'next/head'
import {useState} from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function Home() {
    const [generatedReleaseNotes, setGeneratedReleaseNotes] = useState("")
    const [tone, setTone] = useState("Regular")
    const [commits, setCommits] = useState("")
    const [loading, setLoading] = useState(false)

    const toneChangeHandler = (newTone) => setTone(newTone)
    const handleCommitsChange = (event) => setCommits(event.target.value)
    const handleGenerateReleaseNotes = () => {
        if(commits === "") {
            alert("Commits cannot be empty.")
        } else {
            setLoading(true)
            if (!["Funny", "Regular", "Formal"].includes(tone)) {
                setTone("Regular")
            }
            fetch("/api/generateReleaseNotes?tone=" + tone, {
                body: commits,
                method: "POST"
            })
                .then(res => res.json())
                .then(json => {
                    setGeneratedReleaseNotes(json[0].text)
                    setLoading(false)
                })
                .catch(ex => {
                    setLoading(false)
                    alert("Error: " + ex.message)
                })
        }
    }

    const handleCopy = () => navigator.clipboard.writeText(generatedReleaseNotes);

    return (
        <>
            <Head>
                <title>Release Notes GPT</title>
                <meta name="description" content="Generate release notes for your commits using ChatGPT."/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className="flex flex-col justify-center items-center bg-dark h-full w-full p-10">
                <div className="flex flex-col justify-center items-center my-10">
                    <h1 className="font-prompt font-semibold text-light text-5xl my-5">Release Notes GPT</h1>
                    <h2 className="font-montserrat font-normal text-lightBlue text-2xl">Generate release notes for your
                        commit messages.</h2>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-col justify-center items-start my-10">
                        <p className="font-prompt text-lg font-normal text-center text-light">Enter your commit messages
                            separated by newlines.</p>
                        <textarea
                            className="h-[10rem] w-[50rem] focus:outline-none bg-lightBlue p-3 font-montserrat rounded-md" value={commits} onChange={handleCommitsChange}/>
                    </div>
                    <div className="flex flex-col justify-center items-start my-5">
                        <p className="font-prompt text-lg font-normal text-center text-light mb-2">Choose your tone.</p>
                        <div className="flex flex-row gap-[18rem] font-montserrat text-lightBlue font-normal text-md">
                            <div className="flex flex-row gap-2">
                                <input type="checkbox" id="formal-checkbox" name="formal" value="formal" checked={tone === "Formal"} onChange={() => toneChangeHandler("Formal")}/>
                                <label htmlFor="formal-checkbox">Formal</label>
                            </div>
                            <div className="flex flex-row gap-2">
                                <input type="checkbox" id="regular-checkbox" name="regular" value="regular" checked={tone === "Regular"} onChange={() => toneChangeHandler("Regular")}/>
                                <label htmlFor="regular-checkbox">Regular</label>
                            </div>
                            <div className="flex flex-row gap-2">
                                <input type="checkbox" id="funny-checkbox" name="funny" value="funny" checked={tone === "Funny"} onChange={() => toneChangeHandler("Funny")}/>
                                <label htmlFor="funny-checkbox">Funny</label>
                            </div>
                        </div>
                    </div>
                    <button className="bg-darkBlue py-3 px-5 rounded-xl text-light drop-shadow-2xl m-2" onClick={handleGenerateReleaseNotes}>
                        Generate Release Notes
                    </button>
                </div>
                {
                    loading &&
                    <div className="mt-10">
                        <ClipLoader
                            color="var(--color-light)"
                            loading={loading}
                            size={50}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                }
                {generatedReleaseNotes && !loading &&
                    <div className="m-16 w-[50rem] flex flex-col justify-center items-center">
                        <div className="bg-lightBlue rounded-lg w-full p-3 font-prompt whitespace-pre-line">
                            {generatedReleaseNotes}
                        </div>
                        <button className="bg-darkBlue py-2 px-5 rounded-xl text-light drop-shadow-2xl m-5" onClick={handleCopy}>Copy</button>
                    </div>
                }
            </main>
        </>
    )
}
