#!/usr/bin/env node

/**
 * IMS2025 - Quick Start Script
 *
 * This script checks if everything is set up correctly and provides instructions
 * Usage: node start-guide.js
 */

const fs = require("fs");
const path = require("path");

const BACKEND_PORT = 3000;
const FRONTEND_PORT = 3001;

console.clear();
console.log("\n");
console.log(
  "╔════════════════════════════════════════════════════════════════╗"
);
console.log(
  "║         IMS2025 - Inventory Management System                 ║"
);
console.log(
  "║                    START GUIDE                                 ║"
);
console.log(
  "╚════════════════════════════════════════════════════════════════╝"
);
console.log("\n");

// Check prerequisites
console.log("📋 Checking Prerequisites...\n");

const checks = [
  {
    name: "Node.js",
    check: () => {
      try {
        require("child_process").execSync("node --version");
        return true;
      } catch {
        return false;
      }
    },
  },
  {
    name: "npm",
    check: () => {
      try {
        require("child_process").execSync("npm --version");
        return true;
      } catch {
        return false;
      }
    },
  },
  {
    name: "Backend package.json",
    check: () => fs.existsSync("package.json"),
  },
  {
    name: "Frontend package.json",
    check: () => fs.existsSync("frontend/package.json"),
  },
  {
    name: "Backend .env file",
    check: () => fs.existsSync(".env"),
  },
  {
    name: "Frontend .env.local file",
    check: () => fs.existsSync("frontend/.env.local"),
  },
];

let allChecksPass = true;
checks.forEach(({ name, check }) => {
  const passed = check();
  const status = passed ? "✅" : "❌";
  console.log(`${status} ${name}`);
  if (!passed) allChecksPass = false;
});

console.log("\n");

if (!allChecksPass) {
  console.log("⚠️  Some prerequisites are missing.\n");
  console.log("Please follow the QUICKSTART.md guide to set up the project.\n");
  process.exit(1);
}

console.log("✅ All prerequisites are met!\n");
console.log(
  "════════════════════════════════════════════════════════════════\n"
);

// Display start instructions
console.log("🚀 START THE APPLICATION\n");
console.log("Open two terminal windows and run:\n");

console.log(
  "┌─ Terminal 1 (Backend Server) ─────────────────────────────────┐"
);
console.log(
  "│                                                               │"
);
console.log(
  "│  $ cd c:\\xampp\\htdocs\\classweb\\IMS2025                       │"
);
console.log("│  $ npm run dev                                               │");
console.log(
  "│                                                               │"
);
console.log("│  Server will run on: http://localhost:3000                   │");
console.log(
  "│                                                               │"
);
console.log(
  "└───────────────────────────────────────────────────────────────┘\n"
);

console.log(
  "┌─ Terminal 2 (Frontend Server) ─────────────────────────────────┐"
);
console.log(
  "│                                                               │"
);
console.log(
  "│  $ cd c:\\xampp\\htdocs\\classweb\\IMS2025\\frontend            │"
);
console.log("│  $ npm run dev                                               │");
console.log(
  "│                                                               │"
);
console.log("│  Frontend will run on: http://localhost:3001                 │");
console.log(
  "│                                                               │"
);
console.log(
  "└───────────────────────────────────────────────────────────────┘\n"
);

console.log(
  "════════════════════════════════════════════════════════════════\n"
);

// Display URLs
console.log("🌐 ACCESS YOUR APPLICATION\n");
console.log(
  "┌─ URLs ────────────────────────────────────────────────────────┐"
);
console.log(
  "│                                                               │"
);
console.log("│  Backend:   http://localhost:3000                            │");
console.log("│  Frontend:  http://localhost:3001                            │");
console.log("│  API:       http://localhost:3000/api                        │");
console.log(
  "│                                                               │"
);
console.log(
  "└───────────────────────────────────────────────────────────────┘\n"
);

console.log(
  "════════════════════════════════════════════════════════════════\n"
);

// Display key info
console.log("📚 IMPORTANT INFORMATION\n");
console.log("✓ Make sure MongoDB is running on localhost:27017");
console.log("✓ Both servers must be running (backend + frontend)");
console.log("✓ Don't close either terminal while developing");
console.log("✓ Check browser console for any errors\n");

console.log(
  "════════════════════════════════════════════════════════════════\n"
);

// Display key features
console.log("✨ AVAILABLE FEATURES\n");
console.log("✓ User Authentication (Register/Login)");
console.log("✓ Product Management (Create, Read, Update, Delete)");
console.log("✓ Customer Management (Create, Read, Update, Delete)");
console.log("✓ Order Management (Create, Read, Update, Delete)");
console.log("✓ JWT-based Security");
console.log("✓ Image Upload Support (Cloudinary)");
console.log("✓ Email Notifications\n");

console.log(
  "════════════════════════════════════════════════════════════════\n"
);

// Display documentation
console.log("📖 DOCUMENTATION\n");
console.log("Read these files for more information:\n");
console.log("  • QUICKSTART.md              - Quick setup guide (5-10 min)");
console.log("  • SETUP.md                   - Detailed setup guide");
console.log("  • INTEGRATION_GUIDE.md       - API integration details");
console.log("  • BACKEND_FRONTEND_CONNECTION.md - Connection overview");
console.log("  • COMPLETION_CHECKLIST.md    - What's been set up\n");

console.log(
  "════════════════════════════════════════════════════════════════\n"
);

// Display next steps
console.log("📝 NEXT STEPS\n");
console.log("1. Open two terminals");
console.log("2. Start backend: npm run dev");
console.log("3. Start frontend: npm run dev (in frontend folder)");
console.log("4. Open http://localhost:3001 in your browser");
console.log("5. Try logging in or creating an account");
console.log("6. Start building features!\n");

console.log(
  "════════════════════════════════════════════════════════════════\n"
);

console.log("💡 TROUBLESHOOTING\n");
console.log("Issue: CORS Error in console");
console.log("→ Make sure FRONTEND_URL in .env is http://localhost:3001\n");

console.log("Issue: Cannot connect to MongoDB");
console.log("→ Start MongoDB: mongod (or check .env MONGODB_URI)\n");

console.log("Issue: Port 3000/3001 already in use");
console.log("→ Change PORT in .env or kill the process using the port\n");

console.log(
  "════════════════════════════════════════════════════════════════\n"
);

console.log("🎉 YOU'RE ALL SET!\n");
console.log(
  "Ready to start? Open two terminals and follow the instructions above.\n"
);

console.log("Happy Coding! 🚀\n");
