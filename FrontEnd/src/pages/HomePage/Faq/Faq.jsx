import { useState } from "react";
import styles from "./Faq.module.css";

function Faq() {
  const [expandedIndexes, setExpandedIndexes] = useState([]); // Track which accordions are expanded

  const toggleAccordion = (index) => {
    if (expandedIndexes.includes(index)) {
      setExpandedIndexes(expandedIndexes.filter((i) => i !== index)); // Collapse the accordion
    } else {
      setExpandedIndexes([...expandedIndexes, index]); // Expand the accordion
    }
  };

  return (
    <section className={styles.FAQ__list__container} id="FAQ">
      <h1 className={styles.FAQ__heading}>Frequently Asked Questions</h1>
      <div className={styles.FAQ__list}>
        {accordionData.map((item, index) => (
          <div key={index} className={styles.FAQ__accordian}>
            <button
              className={styles.FAQ__title}
              onClick={() => toggleAccordion(index)}
            >
              {item.title}
            </button>
            <div
              className={styles.FAQ__content}
              style={{
                maxHeight: expandedIndexes.includes(index) ? "500px" : "0",
                opacity: expandedIndexes.includes(index) ? "1" : "0",
                transform: expandedIndexes.includes(index)
                  ? "translateY(0)"
                  : "translateY(-10px)",
                transition: "all 0.4s ease",
              }}
            >
              {item.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Example FAQ data
const accordionData = [
  {
    title: "What is NetFy?",
    content: [
      "NetFy is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
      "You can watch as much as you want, whenever you want, without a single ad - all for one low monthly price. There's always something new to discover, and new TV shows and movies are added every week!",
    ],
  },
  {
    title: "How much does NetFy cost?",
    content: [
      "Watch NetFy on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹199 to ₹799 a month. No extra costs, no contracts.",
    ],
  },
  {
    title: "Where can I watch?",
    content: [
      "Watch anywhere, anytime, on an unlimited number of devices. Sign in with your NetFy account to watch instantly on the web at NetFy.com from your personal computer or on any internet-connected device that offers the NetFy app, including smart TVs, smartphones, tablets, streaming media players, and game consoles.",
      "You can also download your favorite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take NetFy with you anywhere.",
    ],
  },
];

export default Faq;
