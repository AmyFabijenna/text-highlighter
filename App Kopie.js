import React, { useState } from "react";
import nlp from "compromise";

export default function TextHighlighter() {
  const [text, setText] = useState("");
  const [formattedText, setFormattedText] = useState("");

  const highlightText = () => {
    let doc = nlp(text);
    let words = text.split(" ");

    let highlighted = words.map((word) => {
      let cleanWord = word.replace(/[^a-zA-ZäöüßÄÖÜ]/g, "");
      
      if (doc.match(cleanWord).nouns().text()) {
        return `<span style='color: darkred; font-weight: bold;'>${word}</span>`; // Dunkelrot für Nomen
      } else if (doc.match(cleanWord).verbs().text()) {
        return `<span style='color: darkblue; font-style: italic;'>${word}</span>`; // Dunkelblau für Verben
      } else if (doc.match(cleanWord).adjectives().text()) {
        return `<span style='color: darkgreen; text-decoration: underline;'>${word}</span>`; // Dunkelgrün für Adjektive
      } else if (doc.match(cleanWord).match("[heute|gestern|morgen|jetzt|bald|früher|später|seit|ab|bis|während|in|am|um|an|Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag|Sonntag]").text()) {
        return `<span style='color: lightblue;'>${word}</span>`; // Hellblau für temporale Ergänzungen
      } else if (doc.match(cleanWord).match("[weil|da|denn|deshalb|deswegen|somit|aufgrund|infolge|wegen|aus|dank|anlässlich|trotz|durch]").text()) {
        return `<span style='color: lightcoral;'>${word}</span>`; // Hellrot für kausale Ergänzungen
      } else if (doc.match(cleanWord).match("[gern|leicht|schnell|laut|vorsichtig|mit Freude|auf diese Weise|mit|ohne|durch|mittels|laut|entsprechend]").text()) {
        return `<span style='color: orange;'>${word}</span>`; // Orange für modale Ergänzungen
      } else if (doc.match(cleanWord).match("[hier|dort|oben|unten|links|rechts|nebenan|drinnen|draußen|überall|nirgendwo|in|an|auf|unter|über|zwischen|neben|hinter|vor]").text()) {
        return `<span style='color: magenta;'>${word}</span>`; // Magenta für lokale Ergänzungen
      }
      return word;
    });

    setFormattedText(highlighted.join(" "));
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <textarea
        className="w-full p-2 border rounded"
        rows="5"
        placeholder="Gib deinen Text hier ein..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={highlightText}
      >
        Text hervorheben
      </button>
      <div
        className="mt-4 p-2 border rounded bg-gray-100"
        dangerouslySetInnerHTML={{ __html: formattedText }}
      ></div>
    </div>
  );
}
