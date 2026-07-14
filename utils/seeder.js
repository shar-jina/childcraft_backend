const Admin = require("../models/Admin");
const Banner = require("../models/Banner");
const Offer = require("../models/Offer");
const Book = require("../models/Book");
const Position = require("../models/Position");
const BookOutline = require("../models/BookOutline");
const Gallery = require("../models/Gallery");

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

    // 4. Seed Default Books matching the 34 series if none exist
    const hasLegacyBooks = await Book.exists({ category: { $in: ["CBSE", "ICSE", "State Syllabus", "General"] } });
    if (hasLegacyBooks) {
      console.log("[SEED] Legacy curriculum-based books detected. Clearing Book collection for series-based catalog...");
      await Book.deleteMany({});
    }

    const bookCount = await Book.countDocuments();
    if (bookCount === 0) {
      const TEXTBOOK_CATEGORIES = [
        {
          name: "Core Series",
          series: [
            "Wings (S&T)",
            "Pearls & Petals (S&T)",
            "Nexus (T)",
            "Nexus Plus (T)",
            "Next Generation (T)",
            "Golden Wings (T)",
            "Green Planet"
          ]
        },
        {
          name: "Languages",
          series: [
            "Manjadi",
            "Malayala Manjari",
            "Basha Tarang",
            "Lipi Sagaram",
            "Hindi Praveshika",
            "Sarovar 1-5",
            "Madhuri Hindi Reader"
          ]
        },
        {
          name: "Grammar & English",
          series: [
            "Active Grammar 1-8",
            "Basic Grammar",
            "Graded English",
            "Active English (Reader)"
          ]
        },
        {
          name: "Computers & GK",
          series: [
            "IT Exploring e-World",
            "Smart Computer",
            "World of Computer",
            "GK - Fun & Facts",
            "GK – Explore the World"
          ]
        },
        {
          name: "Writing & Art",
          series: [
            "Fun with Crayon",
            "Sulekh Mala Handwriting",
            "Vivanta",
            "Capital and Small Letters",
            "Magic of Art",
            "Cursive Writing",
            "Draw & Colour",
            "Art & Activity",
            "ABC Writing Capital and Small",
            "Aalekhanamithram - Malayalam Writing"
          ]
        }
      ];

      const defaultBooks = [];
      let indexCounter = 0;

      const images = [
        "/images/bookscover/std1term1.jpeg",
        "/images/bookscover/std1hindi.jpeg",
        "/images/bookscover/std2sem2.jpeg",
        "/images/bookscover/std2term2.jpeg",
        "/images/bookscover/std3sem2.jpeg",
        "/images/bookscover/std3hindi.jpeg",
        "/images/bookscover/std3term1.jpeg",
        "/images/bookscover/std4term2.jpeg"
      ];

      TEXTBOOK_CATEGORIES.forEach(group => {
        group.series.forEach(seriesName => {
          let count = 5;
          if (seriesName.includes("1-8") || seriesName.includes("Explore the World") || seriesName.includes("Grammar")) {
            count = 8;
          } else if (seriesName.includes("1-5")) {
            count = 5;
          } else if (seriesName.includes("Petals") || seriesName.includes("Writing") || seriesName.includes("Praveshika")) {
            count = 3;
          }

          for (let i = 1; i <= count; i++) {
            const image = images[(i - 1) % images.length];
            defaultBooks.push({
              title: `${seriesName} - Book ${i}`,
              image: image,
              category: seriesName,
              std: `Grade ${i}`,
              description: `A comprehensive textbook designed for the ${seriesName} curriculum, focused on conceptual clarity, active learning tools, and standard-aligned exercises.`,
              index: indexCounter++
            });
          }
        });
      });

      await Book.insertMany(defaultBooks);
      console.log(`[SEED] Dynamically seeded ${defaultBooks.length} default books across 34 series successfully!`);
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

    // 7. Seed Default Gallery Items if they don't exist in database
    const defaultGallery = [
      { imageUrl: '/images/gallery/img3.jpeg', title: 'Campus Activity', index: 0 },
      { imageUrl: '/images/gallery/img2.jpeg', title: 'Student Projects', index: 1 },
      { imageUrl: '/images/gallery/img1.jpeg', title: 'Library Reference', index: 2 },
      { imageUrl: '/images/gallery/img4.jpeg', title: 'Classroom Interaction', index: 3 },
      { imageUrl: '/images/gallery/img5.jpeg', title: 'School Building', index: 4 },
      { imageUrl: '/images/gallery/img6.jpeg', title: 'Creative Writing Workshop', index: 5 },
      { imageUrl: '/images/gallery/img7.jpeg', title: 'Interactive Learning', index: 6 },
      { imageUrl: '/images/gallery/img8.jpeg', title: 'Group Discussion', index: 7 },
    ];

    for (const item of defaultGallery) {
      const exists = await Gallery.findOne({ imageUrl: item.imageUrl });
      if (!exists) {
        await Gallery.create(item);
        console.log(`[SEED] Seeded default gallery image: ${item.title}`);
      }
    }
  } catch (error) {
    console.error("[SEED] Error seeding database:", error);
  }
};

module.exports = seedDatabase;
