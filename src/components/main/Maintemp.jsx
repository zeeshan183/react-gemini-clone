import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import './Main.css'
import { url } from './gemni.js';

const Maintemp = () => {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(undefined);
  const [loading, setLoading] = useState(false); 

const askQuestion = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setResult(null);

    const payload = {
      contents: [{
        parts: [{ 
          text: `Answer the following question in exactly 3 to 5 sentences. Keep it professional and accurate. Question: ${question}` 
        }]
      }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 250,
      }
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      
      // Proper path to the text response
      const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;
      setResult(answer || "No response received.");
    } catch (err) {
      console.error(err);
      setResult("Error fetching response. Please check your connection.");
    } finally {
      setLoading(false);
      setQuestion(""); 
    }
  };


  return (
    <div className='main'>
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        
<div className="greet">
  <p><span>Hello, Dev</span></p>

  {/* Hide "How can I help you" and "Result" when loading */}
  {!loading ? (
    <>
      {result ? null : <p>How can I help you?</p>}
      <p className="result-text">{result}</p>
    </>
    ) : (
    /* This is your Loader */
    <div className="loader">
      <hr />
      <hr />
      <hr />
    </div>
  )}
</div>
        <div className="cards">
          <div className="card">
            <p>Suggest beautiful places to see on upcoming road trip</p>
            <img src={assets.compass_icon} alt="" />
          </div>
          <div className="card">
            <p>Briefly summarize this concept: urban planning</p>
            <img src={assets.bulb_icon} alt="" />
          </div>
          <div className="card">
            <p>Brainstorming team bonding activities for our work retreat</p>
            <img src={assets.message_icon} alt="" />
          </div>
          <div className="card">
            <p>Improve the readability of the following code</p>
            <img src={assets.code_icon} alt="" />
          </div>
        </div>
        {/* bottom */}
        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder='Enter a prompt here.'
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img src={assets.send_icon} onClick={askQuestion} alt="" />
            </div>
          </div>
          <p className='bottom-info'>
            Gemini is a smart AI assistant that helps you brainstorm, summarize, and organize ideas.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Maintemp
