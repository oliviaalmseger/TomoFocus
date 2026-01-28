const mongoose = require("mongoose");
require("dotenv").config();

const Quote = require("./models/Quote");

const quotes = [
  { text: "You showed up for yourself today." },
  { text: "Consistency beats intensity." },
  { text: "Small progress is still progress." },
  { text: "Focus grows with every session." },
  { text: "Taking breaks helps you go further." },
  { text: "One focused moment at a time." },
  { text: "You chose progress over distraction." },
  { text: "Discipline is built quietly." },
  { text: "Progress doesn't need to be loud." },
  { text: "Your effort today matters." },
  
  { text: "Happiness is not by chance, but by choice." },
  { text: "Believe you can, and you're halfway there." },
  { text: "No one is you, and that is your superpower." },
  { text: "If you can dream it, you can do it." },
  { text: "Aim for the moon. Even if you miss, you'll land among the stars." }, 
  { text: "Focus is a skill you're building." },
  { text: "You're allowed to be proud of small wins." },
  { text: "Showing up is already a victory." },
  { text: "You're doing better than you think." },
  { text: "Focused time is a gift to your future self." }, 
  
  { text: "Progress comes from patience." },
  { text: "You don't need perfection to move forward." },
  { text: "Today's effort supports tomorrow's success." },
  { text: "Rest and focus work best together." },
  { text: "You're building something meaningful." },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ✅");

    await Quote.deleteMany(); // Clear existing quotes before seeding

    await Quote.insertMany(quotes);
    console.log("Quotes seeded 🌱");

    process.exit();
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seed();
