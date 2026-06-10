const Admin = require("../models/Admin");
const Banner = require("../models/Banner");
const Offer = require("../models/Offer");
const Book = require("../models/Book");
const Position = require("../models/Position");
const BookOutline = require("../models/BookOutline");

const seedDatabase = async () => {
  try {
    // 1. Seed Admin User if none exists
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const defaultUsername = process.env.ADMIN_USERNAME || "admin";
      const defaultPassword = process.env.ADMIN_PASSWORD || "admin123";
      
      await Admin.create({
        username: defaultUsername,
        password: defaultPassword,
      });
      console.log(`[SEED] Admin account created successfully! Username: '${defaultUsername}'`);
    }

    // 2. Seed Default Banner Images (indices 0 to 4) if none exist
    const bannerCount = await Banner.countDocuments();
    if (bannerCount === 0) {
      const defaultBanners = [
        { index: 0, imageUrl: "/images/banner3.png" },
        { index: 1, imageUrl: "/images/banner222.png" },
        { index: 2, imageUrl: "/images/banner45.png" },
        { index: 3, imageUrl: "/images/bookscover/std1term1.jpeg" },
        { index: 4, imageUrl: "/images/bookscover/std2sem2.jpeg" },
      ];
      await Banner.insertMany(defaultBanners);
      console.log("[SEED] Default 5 banner images seeded successfully!");
    } else if (bannerCount < 5) {
      // In case some slots are missing, fill them in
      const defaultBanners = [
        { index: 0, imageUrl: "/images/banner3.png" },
        { index: 1, imageUrl: "/images/banner222.png" },
        { index: 2, imageUrl: "/images/banner45.png" },
        { index: 3, imageUrl: "/images/bookscover/std1term1.jpeg" },
        { index: 4, imageUrl: "/images/bookscover/std2sem2.jpeg" },
      ];
      for (const item of defaultBanners) {
        const exists = await Banner.findOne({ index: item.index });
        if (!exists) {
          await Banner.create(item);
          console.log(`[SEED] Missing banner slot ${item.index} filled.`);
        }
      }
    }

    // 3. Seed Default Offer if none exists
    const offerCount = await Offer.countDocuments();
    if (offerCount === 0) {
      await Offer.create({
        tag: "2026 Academic Season Offer",
        title: "Partner with Us & Save up to 20%",
        description: "Get exclusive institutional rates, free teacher guidekits, and curriculum orientation workshops for your entire school faculty.",
        buttonText: "Request Institutional Quote",
        buttonLink: "/contact?ref=academic-offer",
        isActive: true,
      });
      console.log("[SEED] Default active offer banner seeded successfully!");
    }

    // 4. Seed Default Books if none exist
    const bookCount = await Book.countDocuments();
    if (bookCount === 0) {
      const defaultBooks = [
        // Std 1
        {
          title: "English Reader",
          image: "/images/bookscover/std1term1.jpeg",
          category: "CBSE",
          std: "Std 1",
          description: "An engaging course designed around interactive stories, grammar basics, and vocabulary builders for first-grade CBSE students.",
          index: 0
        },
        {
          title: "Hindi Praveshika",
          image: "/images/bookscover/std1hindi.jpeg",
          category: "ICSE",
          std: "Std 1",
          description: "Introduction to Hindi scripts, simple poems, and basic vocabulary designed for ICSE curriculum guidelines.",
          index: 1
        },
        {
          title: "Mathematics",
          image: "/images/bookscover/std1term1.jpeg",
          category: "State Syllabus",
          std: "Std 1",
          description: "Foundation mathematical concepts, number recognition, addition, and subtraction for State Board standards.",
          index: 2
        },
        {
          title: "Environmental Studies",
          image: "/images/bookscover/std2sem2.jpeg",
          category: "State Syllabus",
          std: "Std 1",
          description: "Interactive course exploring nature, community, hygiene, and daily habits for State Board first graders.",
          index: 3
        },
        {
          title: "General Knowledge",
          image: "/images/bookscover/std3sem2.jpeg",
          category: "CBSE",
          std: "Std 1",
          description: "Fun quizzes, world facts, and basic science facts to nurture curious minds in CBSE standard 1.",
          index: 4
        },
        // Std 2
        {
          title: "Mathematics",
          image: "/images/bookscover/std2sem2.jpeg",
          category: "CBSE",
          std: "Std 2",
          description: "Conceptual math course with illustrative problem solving, shapes, and division concepts aligned with CBSE guidelines.",
          index: 5
        },
        {
          title: "Term Book",
          image: "/images/bookscover/std2term2.jpeg",
          category: "ICSE",
          std: "Std 2",
          description: "Comprehensive term material cover for core sciences, English, and social studies in the ICSE framework.",
          index: 6
        },
        {
          title: "Environment",
          image: "/images/bookscover/std2sem2.jpeg",
          category: "State Syllabus",
          std: "Std 2",
          description: "Introduction to Environmental Studies, plants, animals, and local geography under State Board guidelines.",
          index: 7
        },
        {
          title: "English Grammar",
          image: "/images/bookscover/std1term1.jpeg",
          category: "CBSE",
          std: "Std 2",
          description: "Key grammar rules, punctuation, sentence building, and worksheets for second-grade CBSE students.",
          index: 8
        },
        {
          title: "Hindi Pathmala",
          image: "/images/bookscover/std3hindi.jpeg",
          category: "ICSE",
          std: "Std 2",
          description: "Hindi prose reading comprehension, grammar foundations, and poems tailored for Std 2 ICSE learners.",
          index: 9
        },
        // Std 3
        {
          title: "Science Explorer",
          image: "/images/bookscover/std3sem2.jpeg",
          category: "CBSE",
          std: "Std 3",
          description: "Explores core scientific themes, life cycles, and nature patterns with interactive exercises for CBSE Std 3.",
          index: 10
        },
        {
          title: "Hindi Pathmala",
          image: "/images/bookscover/std3hindi.jpeg",
          category: "ICSE",
          std: "Std 3",
          description: "Advanced vocabulary, short stories, and grammatical structures tailored for Std 3 ICSE scholars.",
          index: 11
        },
        {
          title: "Term Book",
          image: "/images/bookscover/std3term1.jpeg",
          category: "State Syllabus",
          std: "Std 3",
          description: "Full term coverage containing environmental science, regional language, and mathematics for State Board.",
          index: 12
        },
        {
          title: "Social Studies",
          image: "/images/bookscover/std3sem2.jpeg",
          category: "CBSE",
          std: "Std 3",
          description: "Introduction to society, civic responsibilities, transport, and national symbols for CBSE Std 3.",
          index: 13
        },
        {
          title: "Art & Craft",
          image: "/images/bookscover/std1hindi.jpeg",
          category: "State Syllabus",
          std: "Std 3",
          description: "Creative coloring, paper craft, drawing techniques, and DIY activities for third-grade State curriculum.",
          index: 14
        },
        // Std 4
        {
          title: "General Studies",
          image: "/images/bookscover/std3sem2.jpeg",
          category: "CBSE",
          std: "Std 4",
          description: "Advanced social sciences, history, and scientific methods for standard 4 CBSE students.",
          index: 15
        },
        {
          title: "Math Mastery",
          image: "/images/bookscover/std4term2.jpeg",
          category: "ICSE",
          std: "Std 4",
          description: "High-level arithmetic, fractions, decimals, and basic geometry problems designed for ICSE guidelines.",
          index: 16
        },
        {
          title: "General Science",
          image: "/images/bookscover/std4term2.jpeg",
          category: "State Syllabus",
          std: "Std 4",
          description: "State board aligned curriculum covering human systems, physics basics, and plant physiology.",
          index: 17
        },
        {
          title: "English Grammar",
          image: "/images/bookscover/std2term2.jpeg",
          category: "ICSE",
          std: "Std 4",
          description: "Advanced grammar syntax, composition writing, essay drafting, and comprehension skills for ICSE Std 4.",
          index: 18
        },
        {
          title: "Computer Science",
          image: "/images/bookscover/std1term1.jpeg",
          category: "State Syllabus",
          std: "Std 4",
          description: "Foundational guide to computer software, MS Office basics, typing, and safe internet browsing for State Board.",
          index: 19
        }
      ];
      await Book.insertMany(defaultBooks);
      console.log("[SEED] Default 20 textbooks seeded successfully!");
    }

    // 5. Seed Default Career Positions if none exist
    const positionCount = await Position.countDocuments();
    if (positionCount === 0) {
      const defaultPositions = [
        {
          title: "Educational Content Developer",
          department: "Editorial & Content Development",
          type: "Full-Time / Hybrid",
          description: "Review and curate engaging educational content for school textbook series across CBSE, ICSE, and State boards.",
          requirements: [
            "Post-graduate/graduate degree in Education, English, Mathematics, or Science.",
            "Strong command over written English and child pedagogy.",
            "Prior experience in textbook drafting or lesson planning is a plus."
          ]
        },
        {
          title: "Graphic Designer & Children's Book Illustrator",
          department: "Creative & Book Design",
          type: "Full-Time (In-office)",
          description: "Design vibrant textbook cover pages, clean multi-column text layouts, and custom illustrations geared toward young learners.",
          requirements: [
            "Proficiency in Adobe InDesign, Photoshop, and Illustrator.",
            "A creative portfolio showcasing illustration skills and children's book layouts.",
            "Excellent understanding of color psychology and print media standards."
          ]
        },
        {
          title: "Academic Coordinator & Teacher Trainer",
          department: "Academic Support Services",
          type: "Full-Time (Requires Travel)",
          description: "Conduct training seminars for partner schools, coordinate implementation of our digital/printed content, and collect feedback.",
          requirements: [
            "Degree in education or relevant academic field with 2+ years teaching experience.",
            "Exceptional public speaking, presentation, and training skills.",
            "Willingness to travel to educational institutions across states."
          ]
        }
      ];
      await Position.insertMany(defaultPositions);
      console.log("[SEED] Default career positions seeded successfully!");
    }

    // 6. Seed Default Book Series Outlines if none exist
    const outlineCount = await BookOutline.countDocuments();
    if (outlineCount === 0) {
      const defaultOutlines = [
        {
          name: "Wings",
          label: "Core Series",
          classes: "LKG to Grade 5",
          gradient: "from-amber-500 via-orange-500 to-red-500",
          image: "",
          index: 0
        },
        {
          name: "Pearls & Petals",
          label: "Kindergarten",
          classes: "KG",
          gradient: "from-pink-500 to-rose-600",
          image: "",
          index: 1
        },
        {
          name: "Nexus",
          label: "Integrated",
          classes: "LKG to Grade 5",
          gradient: "from-sky-500 via-indigo-500 to-blue-600",
          image: "",
          index: 2
        },
        {
          name: "Manjadi",
          label: "Malayalam",
          classes: "KG to Grade 8",
          gradient: "from-emerald-500 to-teal-600",
          image: "",
          index: 3
        },
        {
          name: "Explore the World",
          label: "GK & Science",
          classes: "Grade 1 to 8",
          gradient: "from-violet-500 to-purple-600",
          image: "",
          index: 4
        }
      ];
      await BookOutline.insertMany(defaultOutlines);
      console.log("[SEED] Default book outlines seeded successfully!");
    }
  } catch (error) {
    console.error("[SEED] Error seeding database:", error);
  }
};

module.exports = seedDatabase;
