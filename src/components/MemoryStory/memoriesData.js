import pic1 from "../../assets/pic1.jpg";
import pic2 from "../../assets/pic2.jpg";
import pic3 from "../../assets/pic3.jpg";
import pic4 from "../../assets/pic4.jpg";
import pic5 from "../../assets/pic5.jpg";
import pic6 from "../../assets/pic6.jpg";
import pic7 from "../../assets/pic7.jpg";

/**
 * 7 Curated Museum Exhibition Artworks
 */
export const museumMemories = [
  {
    id: "memory-01",
    image: pic6,
    alt: "The journey on the road under city lights",
    roman: "I",
    title: "THE JOURNEY",
    text: "The long road, every mile and every minute...\nall leading me closer to you.",
    frameAspect: "portrait",
    offsetY: -6,
    zoom: 1.08,
  },
  {
    id: "memory-02",
    image: pic1,
    alt: "The moment we finally met in person",
    roman: "II",
    title: "FIRST MEET",
    text: "The moment we finally met and held each other.",
    frameAspect: "portrait",
    offsetY: 6,
    zoom: 1.08,
  },
  {
    id: "memory-03",
    image: pic2,
    alt: "Bonding, karaoke, food trips, and exploring together",
    roman: "III",
    title: "OUR MOMENTS",
    text: "Kumain, nag-karaoke, naglakad, at nag-gala—\nevery simple adventure with you became my happiest memory.",
    frameAspect: "portrait",
    offsetY: -8,
    zoom: 1.08,
  },
  {
    id: "memory-04",
    image: pic4,
    alt: "Finding peace and calm in your embrace",
    roman: "IV",
    title: "PEACE",
    text: "Sa yakap at piling mo, nahanap ko ang kapayapaan.\nIn your warmth, the chaotic world finally felt quiet and safe.",
    frameAspect: "portrait",
    offsetY: 6,
    zoom: 1.08,
  },
  {
    id: "memory-05",
    image: pic5,
    alt: "In the kitchen together - Gratitude for taking care of me",
    roman: "V",
    title: "YOUR CARE",
    text: "Salamat sa bawat pag-aalaga, lambing, at pag-intindi.\nHaving you take care of me is the greatest blessing.",
    frameAspect: "portrait",
    offsetY: -6,
    zoom: 1.08,
  },
  {
    id: "memory-06",
    image: pic3,
    alt: "Illustrated artwork of us under Mayon at 7-Eleven",
    roman: "VI",
    title: "CHOOSING YOU",
    text: "Every memory became another reason\nto keep choosing us.",
    frameAspect: "portrait",
    offsetY: 6,
    zoom: 1.08,
  },
  {
    id: "memory-07",
    image: pic7,
    alt: "Majestic Mount Mayon volcano under clear sky",
    roman: "VII",
    title: "MAYON",
    text: "And somehow,\nMayon became a little symbol of us.",
    frameAspect: "mayon", // Cropped tightly and focused on Mayon volcano cone
    offsetY: 0,
    zoom: 1.1,
    isFinal: true,
  },
];

export const finaleMessage = {
  tagline: "FOR YOU",
  message: "“To the one who made every distance, every story,\nand every memory feel like home.”",
  buttonText: "Open Letter",
};
