import "./App.css";
import React, { useEffect, useState } from "react";
import { Button } from "./Button";

function App() {
    const [inputText, setInputText] = useState("");
    const [outputText, setOutputText] = useState("");
    const [mode, setMode] = useState("En to Ja");
    const [isTranslating, setIsTranslating] = useState(false);
    const [clickCopyInputAlert, setClickCopyInputAlert] = useState(false);
    const [clickCopyOutputAlert, setClickCopyOutputAlert] = useState(false);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === "Enter") {
                onClickPrint();
            }
        };
        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    });

    const onClickPrint = () => {
        if (inputText !== "" && !isTranslating) {
            const shiftText = inputText.replace(/\n/g, "%0A");
            setIsTranslating(true);
            setOutputText("翻訳中...");
            let url = "";
            if (mode === "En to Ja") {
                url =
                    "https://script.google.com/macros/s/AKfycbz75gst14sUdgdFBflmAs_91Eqbna6jZwDJ0g3o7jBc-2BDuKQgBu9WMjkpH8Qx_65ZHg/exec?text=" +
                    shiftText +
                    "&source=en&target=ja";
            } else {
                url =
                    "https://script.google.com/macros/s/AKfycbz75gst14sUdgdFBflmAs_91Eqbna6jZwDJ0g3o7jBc-2BDuKQgBu9WMjkpH8Qx_65ZHg/exec?text=" +
                    shiftText +
                    "&source=ja&target=en";
            }
            fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setIsTranslating(false);
                    setOutputText(data.text);
                });
        } else if (isTranslating) {
            console.log("翻訳処理中です。");
        } else {
            setOutputText("翻訳する文章を入力してください。");
        }
    };

    const onClickLang = () => {
        if (mode === "En to Ja") {
            setMode("Ja to En");
        } else {
            setMode("En to Ja");
        }
        let tmpInput = inputText;
        setInputText(outputText);
        setOutputText(tmpInput);
    };

    const onClickCopyInput = () => {
        navigator.clipboard.writeText(inputText);
        onClickCopyInputAlert();
    };

    const onClickCopyOutput = () => {
        navigator.clipboard.writeText(outputText);
        onClickCopyOutputAlert();
    };

    const onClickCopyInputAlert = () => {
        setClickCopyInputAlert(true);
        setTimeout(() => {
            setClickCopyInputAlert(false);
        }, 2000);
    };

    const onClickCopyOutputAlert = () => {
        setClickCopyOutputAlert(true);
        setTimeout(() => {
            setClickCopyOutputAlert(false);
        }, 2000);
    };

    return (
        <>
            <div className="mode">
                <Button className="Button" onClick={onClickLang}>
                    <span className="material-symbols-outlined">multiple_stop</span>
                </Button>
            </div>
            <div className="output">
                <div className="title">
                    <h2>{mode === "En to Ja" ? "English" : "Japanese"}</h2>
                    <Button className="Button" onClick={onClickCopyInput} style={{ boxShadow: "none" }}>
                        <span className="material-symbols-outlined">inventory</span>
                    </Button>
                </div>
                <div className="title">
                    <h2>{mode === "En to Ja" ? "Japanese" : "English"}</h2>
                    <Button className="Button" onClick={onClickCopyOutput} style={{ boxShadow: "none" }}>
                        <span className="material-symbols-outlined">inventory</span>
                    </Button>
                </div>
                <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    type="text"
                    style={{}}
                    placeholder="翻訳する文章を入力してください。"
                />
                <textarea
                    value={outputText}
                    onChange={(e) => setInputText(e.target.value)}
                    type="text"
                    style={{}}
                    disabled
                    placeholder="翻訳された文章がここに表示されます"
                />
            </div>
            <div className="comment-input">{clickCopyInputAlert ? "コピーしました" : ""}</div>
            <div className="comment-output">{clickCopyOutputAlert ? "コピーしました" : ""}</div>
        </>
    );
}

export default App;
