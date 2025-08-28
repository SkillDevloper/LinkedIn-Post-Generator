# LinkedIn Post Generator

A lightweight, AI-powered tool for creating professional LinkedIn posts with ease. Built with HTML, CSS, and vanilla JavaScript for fast performance and minimal dependencies.

![Version](https://img.shields.io/badge/Version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

---

## ✨ Features
- 🤖 AI-powered post generation using OpenAI/DeepSeek APIs
- 🎨 Clean, LinkedIn-inspired UI design
- ✏️ Rich text editor with formatting options
- 🏷️ Automatic SEO keyword and hashtag suggestions
- 🖼️ AI/stock image suggestions
- 💾 Local storage for post history
- 📤 Export options (TXT, PDF, DOCX)
- 📱 Fully responsive design
- 🔒 Secure API key management

---

## 🚀 UI ScreenShort

![Screenshot](https://github.com/SkillDevloper/LinkedIn-Post-Generator/blob/main/Screenshort/1.jpg)
![Screenshot](https://github.com/SkillDevloper/LinkedIn-Post-Generator/blob/main/Screenshort/2.jpg)
![Screenshot](https://github.com/SkillDevloper/LinkedIn-Post-Generator/blob/main/Screenshort/3.jpg)
![Screenshot](https://github.com/SkillDevloper/LinkedIn-Post-Generator/blob/main/Screenshort/4.jpg)

---

## ⚡ Quick Start

Clone the repository:
```bash
git clone https://github.com/your-username/linkedin-post-generator.git
```

Navigate to the project directory:
```bash
cd linkedin-post-generator
```

Open in your browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

Open your browser and go to: [http://localhost:8000](http://localhost:8000)

---

## 📝 Usage

### Generating Posts
1. Enter your topic in the input field on the Dashboard  
2. Select your preferred tone (Professional, Technical, or Casual)  
3. Click "Generate Post" to create your content  
4. Review the generated post, hashtags, and SEO suggestions  
5. Edit using the rich text editor if needed  
6. Copy to clipboard or export in your preferred format  

### API Configuration
1. Navigate to the Settings tab  
2. Enter your OpenAI or DeepSeek API key  
3. Click "Save" to securely store your key in local storage  

### Export Options
- 📋 Copy to Clipboard  
- 📝 Download TXT file  
- 📄 Export PDF  
- 📑 Export Word (DOCX) *(requires backend)*  

---

## 📂 Project Structure
```text
linkedin-post-generator/
├── index.html          # Main application file
├── README.md           # Project documentation
├── backend/            # Optional backend implementation
│   ├── server.js       # Node.js/Express server
│   ├── package.json    # Backend dependencies
│   └── .env.example    # Environment variables template
└── assets/             # Additional resources
    ├── screenshots/    # Application screenshots
    └── icons/          # App icons
```

---

## 🔌 API Integration

### Frontend Implementation
The tool currently uses a simulated AI response for demonstration purposes. To integrate with actual AI APIs:

- Get an API key from OpenAI or DeepSeek  
- Enter your API key in the Settings tab  
- The app will use the provided key to make requests to the AI service  

### Backend Implementation (Optional)
For enhanced security, you can set up a lightweight backend to proxy API requests:

1. Navigate to the backend directory  
2. Copy `.env.example` to `.env` and add your API key  
3. Install dependencies:  
   ```bash
   npm install
   ```
4. Start the server:  
   ```bash
   npm start
   ```
5. The frontend will now route API requests through your backend server  

---

## 🎨 Customization

### Styling
The application uses CSS custom properties for easy theming. Modify the values in the `:root` selector to match your brand:
```css
:root {
  --primary: #your-color;
  --secondary: #your-color;
  /* ... more custom properties */
}
```

### Adding New Tones
1. Update the tone select dropdown in the HTML  
2. Add corresponding content templates in the `generateSampleContent()` function  
3. Update any related UI elements as needed  

---

## 🌐 Browser Support
- Chrome (latest)  
- Firefox (latest)  
- Safari (latest)  
- Edge (latest)  

---

## 🤝 Contributing
We welcome contributions! Please feel free to submit a Pull Request.

1. Fork the project  
2. Create your feature branch  
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes  
   ```bash
   git commit -m "Add some AmazingFeature"
   ```
4. Push to the branch  
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request  

---

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments
- LinkedIn for design inspiration  
- OpenAI and DeepSeek for AI capabilities  
- Unsplash for stock imagery  
- Font Awesome for icons  

---

## 🛠️ Support
If you have any questions or issues, please open an issue on GitHub.

⚠️ Disclaimer: This tool is not affiliated with or endorsed by LinkedIn Corporation.
