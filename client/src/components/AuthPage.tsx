// src/components/AuthPage.tsx
import React, { useState, useEffect } from 'react';

const AuthPage: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const rotatingTexts = [
    "DSA interview",
    "System Design interview",
    "SQL interview",
    "Project interview"
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentText = rotatingTexts[loopNum % rotatingTexts.length];
  
    if (!isDeleting && displayText !== currentText) {
      // Typing
      timer = setTimeout(() => {
        setDisplayText(currentText.substring(0, displayText.length + 1));
      }, typingSpeed);
    } else if (!isDeleting && displayText === currentText) {
      // Pause at end of word
      timer = setTimeout(() => {
        setIsDeleting(true);
        setTypingSpeed(100); // Faster when deleting
      }, 1500);
    } else if (isDeleting && displayText !== '') {
      // Deleting
      timer = setTimeout(() => {
        setDisplayText(currentText.substring(0, displayText.length - 1));
      }, typingSpeed);
    } else if (isDeleting && displayText === '') {
      // Move to next word
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setTypingSpeed(150); // Normal speed for typing
    }
  
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, typingSpeed]);
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
    {/* Left section */}
    <div className="w-full md:w-1/2 bg-[#0a0a29] flex flex-col p-8 min-h-screen md:min-h-full">
      <header>
        <h1 className="text-2xl font-bold text-[#c3b3e6]">
          EdgePrep<span className="text-purple-400 ml-1">●</span>
        </h1>
      </header>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md text-center">
          <h2 className="text-4xl font-bold text-[#c3b3e6] mb-2">
            Help You prepare
          </h2>
          <div className="h-32 flex flex-col items-center justify-start">
            <div className="text-4xl font-bold text-[#c3b3e6] mb-6">
              for {' '}
              <span className="inline-block min-w-[20px] relative">
                {displayText}
                <span className="animate-blink absolute -right-1 top-0 text-[#c3b3e6]">|</span>
              </span>
              <br />with AI
            </div>
          </div>
          <p className="text-gray-400 text-center max-w-sm mx-auto mt-4">
            Master technical interviews with personalized AI-powered practice and feedback
          </p>
        </div>
      </div>
    </div>

    {/* Right section */}
    <div className="w-full md:w-1/2 bg-black flex flex-col p-8 min-h-screen md:min-h-full">
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        <h3 className="text-2xl font-bold text-white mb-8">Get started</h3>
        
        <div className="w-full space-y-4">
          <button className="w-full bg-[#0084ff] hover:bg-[#0074e0] text-white font-semibold py-3 px-4 rounded">
            Log in
          </button>
          
          <button className="w-full bg-[#0084ff] hover:bg-[#0074e0] text-white font-semibold py-3 px-4 rounded">
            Sign up
          </button>
          
          <p className="text-center text-sm text-gray-500 mt-2">
            Try it first
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full flex justify-center text-sm text-gray-600">
        <a href="#" className="hover:text-gray-400 transition-colors">Terms of use</a>
        <span className="mx-2">|</span>
        <a href="#" className="hover:text-gray-400 transition-colors">Privacy policy</a>
      </footer>
    </div>
  </div>
  );
};

export default AuthPage;
