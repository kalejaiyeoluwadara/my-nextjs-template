# Next.js Template

A comprehensive Next.js starter template with Tailwind CSS, pre-built components, and essential configurations to kickstart your web development projects.

## Features

- ⚡️ **Next.js** - The React framework for production
- 🎨 **Tailwind CSS** - A utility-first CSS framework
- 📦 **Pre-built UI Components** - Buttons, inputs, form elements, and more
- 📦 **Shadcn** - Shadcn Installed
- 🔒 **TypeScript Support** - Type safety and improved developer experience
- 📱 **Responsive Design** - Mobile-first approach
- 🧩 **Modular Structure** - Well-organized project architecture

## Quick Start

Use this template to create a new project:

```bash
# Option 1: Using our custom script
./create-next-project.sh your-project-name

# Option 2: Manual clone and setup
git clone https://github.com/kalejaiyeoluwadara/nextjs-template.git your-project-name
cd your-project-name
rm -rf .git
git init
git add .
git commit -m "Initial commit from template"
npm install
```

## Project Structure

```
├── components/             # UI components
│   ├── ui/                 # Basic UI elements
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── ...
│   ├── layout/             # Layout components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   └── forms/              # Form-related components
│       ├── TextArea.tsx
│       └── ...
├── lib/                    # Utility functions and helpers
├── styles/                 # Global styles and theme configuration
├── types/                  # TypeScript type definitions
├── public/                 # Static assets
└── pages/                  # Next.js pages
    ├── api/                # API routes
    └── ...
```

## Google Auth

session

## Environment Variables

Create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_API_KEY=your_api_key_here
```

## Customization

### Tailwind Configuration

You can customize the theme in `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9ff",
          // Add your color palette
        },
        // More custom colors
      },
      // Add custom fonts, spacing, etc.
    },
  },
  // ...
};
```

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## License

MIT

## Author

[Dara.dev](https://github.com/kalejaiyeoluwadara)
