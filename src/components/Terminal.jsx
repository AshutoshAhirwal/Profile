import React, { useState, useEffect } from 'react';

const commands = [
  { text: "ssh ashutosh@drupal-architect", delay: 500 },
  { text: "Status: ACCESS GRANTED", delay: 200, type: 'output' },
  { text: "npx drupal-credits --user=ahirwal", delay: 800 },
  { text: "Credits: 105+ (Core & Contrib)", delay: 400, type: 'output' },
  { text: "Loading custom SDC components...", delay: 600, type: 'output' }
];

const Terminal = () => {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    let currentTimeout;
    let index = 0;

    const typeNext = () => {
      if (index < commands.length) {
        const cmd = commands[index];
        currentTimeout = setTimeout(() => {
          setLines(prev => [...prev, cmd]);
          index++;
          typeNext();
        }, cmd.delay);
      }
    };

    typeNext();

    return () => clearTimeout(currentTimeout);
  }, []);

  return (
    <div className="terminal-container">
      <div className="terminal-header">
        <div className="terminal-dots">
          <div className="dot red"></div>
          <div className="dot yellow"></div>
          <div className="dot green"></div>
        </div>
        <div className="terminal-title">ashutosh@architect ~</div>
      </div>
      <div className="terminal-body" id="terminal-output">
        {lines.map((line, i) => (
          <div key={i} className="terminal-line">
            {line.type === 'output' ? (
              <span style={{ color: 'var(--text-main)' }}>{"> "} {line.text}</span>
            ) : (
              <>
                <span style={{ color: '#3B82F6' }}>$</span> {line.text}
              </>
            )}
          </div>
        ))}
        <span className="terminal-cursor"></span>
      </div>
    </div>
  );
};

export default Terminal;
