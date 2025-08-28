document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const generateBtn = document.getElementById('generate-btn');
    const generateAgainBtn = document.getElementById('generate-again-btn');
    const editPostBtn = document.getElementById('edit-post-btn');
    const copyPostBtn = document.getElementById('copy-post-btn');
    const saveEditsBtn = document.getElementById('save-edits-btn');
    const saveApiKeyBtn = document.getElementById('save-api-key');
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');
    const editableContent = document.getElementById('editable-content');
    const recentPostsContainer = document.getElementById('recent-posts');

    // Sample post data
    const samplePosts = [
        {
            title: "The Future of AI in Healthcare",
            content: "AI is no longer just a buzzword in healthcare — it’s transforming how we deliver care. From predictive analytics that help prevent diseases, to personalized medicine tailored to each patient’s needs, and advanced diagnostics that improve accuracy — the possibilities are endless.\n\nThe real question is: How quickly can healthcare systems adapt and scale these innovations to benefit everyone?\n\nI believe we are only scratching the surface of AI’s potential in healthcare. What do you think — which area will AI revolutionize first?\n\n#AI #Healthcare #Innovation #FutureOfWork",
            date: "2023-07-15"
        },
        {
            title: "Remote Work Best Practices",
            content: "3+ years into the global shift to remote work, one thing is clear: productivity and balance depend on the systems we build for ourselves.\n\nHere are 3 simple practices that have helped me:\n1. Structured routine – fixed work hours and break times.\n2. Dedicated workspace – even a small corner helps create focus.\n3. Boundaries – logging off on time to protect personal life.\n\nRemote work is here to stay, but thriving in it requires intentional effort. What practices have worked best for you while working remotely?\n\n#RemoteWork #Productivity #WorkLifeBalance #HybridWork",
            date: "2023-07-10"
        },
        {
            title: "The Power of Networking",
            content: "If I could give one piece of career advice: never underestimate the power of networking.\n\nSome of my best opportunities didn’t come from job boards — they came from genuine relationships built over time.\n- A mentor who introduced me to the right people.\n- A colleague who recommended me for a project.\n- A connection who became a long-term collaborator.\n\nNetworking isn’t about collecting contacts; it’s about building trust and adding value to others.\n\nHow has networking impacted your career journey?\n\n#Networking #CareerGrowth #ProfessionalDevelopment #Leadership",
            date: "2023-07-05"
        }
    ];


    // Initialize the app
    function init() {
        loadRecentPosts();
        setupEventListeners();
        loadApiKey();
    }

    // Set up event listeners
    function setupEventListeners() {
        // Navigation
        navLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const tab = this.getAttribute('data-tab');
                switchTab(tab);
            });
        });

        // Generate post
        generateBtn.addEventListener('click', generatePost);
        generateAgainBtn.addEventListener('click', generatePost);

        // Edit post
        editPostBtn.addEventListener('click', function () {
            switchTab('editor');
        });

        // Copy to clipboard
        copyPostBtn.addEventListener('click', copyToClipboard);

        // Save edits
        saveEditsBtn.addEventListener('click', saveEdits);

        // Formatting buttons
        document.querySelectorAll('.toolbar-btn').forEach(button => {
            if (button.id !== 'add-emoji') {
                button.addEventListener('click', function () {
                    const command = this.getAttribute('data-command');
                    document.execCommand(command, false, null);
                    editableContent.focus();
                });
            }
        });

        // Add emoji
        document.getElementById('add-emoji').addEventListener('click', function () {
            const emojis = ['😊', '🚀', '👍', '💡', '🔥', '👏', '🎯', '💼', '🌐', '📈'];
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            document.execCommand('insertText', false, randomEmoji);
            editableContent.focus();
        });

        // Save API key
        saveApiKeyBtn.addEventListener('click', saveApiKey);

        // Export buttons
        document.getElementById('download-txt').addEventListener('click', function () {
            showNotification('Post downloaded as TXT file');
        });

        document.getElementById('download-pdf').addEventListener('click', function () {
            showNotification('Post exported as PDF');
        });

        document.getElementById('export-txt').addEventListener('click', function () {
            showNotification('All posts exported as TXT');
        });

        document.getElementById('export-pdf').addEventListener('click', function () {
            showNotification('All posts exported as PDF');
        });

        document.getElementById('export-docx').addEventListener('click', function () {
            showNotification('All posts exported as DOCX');
        });

        // Data management
        document.getElementById('clear-history').addEventListener('click', function () {
            if (confirm('Are you sure you want to clear your post history? This cannot be undone.')) {
                localStorage.removeItem('recentPosts');
                recentPostsContainer.innerHTML = '<p>No recent posts found.</p>';
                showNotification('Post history cleared successfully');
            }
        });

        document.getElementById('export-data').addEventListener('click', function () {
            showNotification('All data exported successfully');
        });
    }

    // Switch between tabs
    function switchTab(tabName) {
        // Update navigation
        navLinks.forEach(link => {
            if (link.getAttribute('data-tab') === tabName) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Update content
        tabContents.forEach(tab => {
            if (tab.id === tabName) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    }

    // Generate a post (simulated AI response)
    function generatePost() {
        const topic = document.getElementById('topic').value || 'AI in technology';
        const tone = document.getElementById('tone').value;

        // Show loading state
        const generateButton = this.id === 'generate-again-btn' ? generateAgainBtn : generateBtn;
        const originalText = generateButton.innerHTML;
        generateButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
        generateButton.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
            // Sample content based on topic and tone
            const content = generateSampleContent(topic, tone);

            // Update the generated content
            document.getElementById('generated-content').innerHTML = content;
            editableContent.innerHTML = content;

            // Generate hashtags
            generateHashtags(topic);

            // Generate SEO suggestions
            generateSEOSuggestions(topic);

            // Save to recent posts
            saveToRecentPosts(topic, content);

            // Switch to generator tab if coming from dashboard
            if (this.id === 'generate-btn') {
                switchTab('generator');
            }

            // Reset button state
            generateButton.innerHTML = originalText;
            generateButton.disabled = false;

            showNotification('Post generated successfully!');
        }, 1500);
    }

    // Generate sample content based on topic and tone
    function generateSampleContent(topic, tone) {
        // Title banana (topic ka first letter capitalize)
        const title = `<h3>🚀 ${topic.charAt(0).toUpperCase() + topic.slice(1)}</h3>`;

        const contents = {
            professional: [
                `In today’s fast-changing digital landscape, <b>${topic}</b> is emerging as a key driver of transformation across industries. It’s not just about technology adoption — it’s about how businesses adapt, how leaders prepare, and how employees grow in this new era.<br><br>
    🔹 One major observation: early adopters of ${topic} consistently build a stronger competitive edge and resilience against disruptions.<br><br>
    Beyond short-term benefits, ${topic} is shaping long-term strategies — influencing how organizations innovate, collaborate, and create trust with their stakeholders. The true scope of this evolution is only beginning to unfold.`,

                `Exploring <b>${topic}</b> reveals a powerful reality: it directly impacts how we work, connect, and develop as professionals. The adoption curve is accelerating faster than many predicted, and companies that prepare today are the ones that will define the next decade.<br><br>
    🔹 Key insight: investing in ${topic} is no longer just a technical decision — it’s about leadership, accessibility, and cultural readiness.<br><br>
    The big question now is: how do we ensure ${topic} becomes scalable, inclusive, and beneficial for all, not just for a select few?`
            ],
            technical: [
                `Breaking down <b>${topic}</b> from a technical lens highlights some critical layers — scalability, security, and seamless integration with existing systems.<br><br>
    🔹 Each technical decision today lays the foundation for long-term adaptability and system reliability.<br><br>
    For engineers and architects, the challenge lies in designing ${topic} solutions that can evolve with rapid advancements in infrastructure and cybersecurity landscapes.`,

                `A deep dive into <b>${topic}</b> shows the interconnected nature of modern architectures. From backend frameworks to end-user applications, every piece must align to maintain performance and resilience.<br><br>
    🔹 Technical leaders must constantly ask: how do we make ${topic} scalable without sacrificing reliability and user trust?<br><br>
    The answers to this will shape the success (or failure) of ${topic} adoption in the coming years.`
            ],
            casual: [
                `Hey friends 👋 I’ve been exploring <b>${topic}</b> lately, and honestly — the way it’s shaping our future is mind-blowing! From everyday use cases to industry-wide shifts, the opportunities feel endless.<br><br>
    🔹 What’s fascinating is how ${topic} isn’t just about technology — it’s about people, trust, and the way we all work together.<br><br>
    Would love to hear your perspective — how do you see ${topic} transforming our world in the next 5 years?`,

                `So I’ve been diving into <b>${topic}</b>, and it’s far more impactful than I imagined. The pace of change is faster than anyone expected, and those who embrace it early are clearly ahead of the curve.<br><br>
    🔹 Key takeaway: adopting ${topic} early isn’t just about staying relevant — it’s about thriving in the new normal.<br><br>
    Curious to know — what’s been your own experience with ${topic}?`
            ]
        };

        const endings = {
            professional: "<br><br>✨ Over to you: What opportunities or challenges do you see with this trend? I’d love to hear your perspective and spark a meaningful conversation.",
            technical: "<br><br>💡 I’d love to learn from others: which technical approaches or strategies around this excite you the most? Drop your insights below!",
            casual: "<br><br>🙌 Would love to know your thoughts too — share your take in the comments, let’s discuss!"
        };

        const randomContent = contents[tone][Math.floor(Math.random() * contents[tone].length)];
        return `${title}<p>${randomContent}</p><p>${endings[tone]}</p>`;
    }


    // Generate hashtags based on topic
    function generateHashtags(topic) {
        // Format topic into hashtag (remove spaces)
        const formattedTopic = topic.replace(/\s+/g, '');
        let hashtags = [`#${formattedTopic}`];

        // Add common LinkedIn growth hashtags
        hashtags = hashtags.concat([
            '#Innovation',
            '#FutureOfWork',
            '#Leadership',
            '#CareerGrowth',
            '#Technology',
            '#AI'
        ]);

        const hashtagsContainer = document.getElementById('hashtags-container');
        hashtagsContainer.innerHTML = '';

        hashtags.slice(0, 7).forEach(tag => {
            const span = document.createElement('span');
            span.className = 'hashtag';
            span.textContent = tag;
            hashtagsContainer.appendChild(span);
        });
    }


    // Generate SEO suggestions
    function generateSEOSuggestions(topic) {
        const keywords = [
            `${topic} strategies`,
            `future of ${topic}`,
            `importance of ${topic}`,
            `${topic} best practices`,
            `how to improve ${topic}`
        ];

        const seoContainer = document.getElementById('seo-suggestions');
        seoContainer.innerHTML = `
<p><strong>Suggested SEO Keywords:</strong> ${keywords.join(', ')}</p>
<p style="margin-top: 10px;"><strong>Content Tips:</strong> Add real-world examples, statistics, or case studies. Use storytelling where possible. Posts with visuals or infographics consistently perform better on LinkedIn (up to 2.5x higher engagement).</p>
`;
    }


    // Save to recent posts
    function saveToRecentPosts(title, content) {
        let recentPosts = JSON.parse(localStorage.getItem('recentPosts')) || [];

        // Add new post to beginning of array
        recentPosts.unshift({
            title: title,
            content: content.replace(/<br>/g, ' ').substring(0, 150) + '...',
            date: new Date().toISOString().split('T')[0]
        });

        // Keep only the last 5 posts
        if (recentPosts.length > 5) {
            recentPosts = recentPosts.slice(0, 5);
        }

        // Save to localStorage
        localStorage.setItem('recentPosts', JSON.stringify(recentPosts));

        // Update UI
        loadRecentPosts();
    }

    // Load recent posts from localStorage
    function loadRecentPosts() {
        const recentPosts = JSON.parse(localStorage.getItem('recentPosts')) || samplePosts;
        recentPostsContainer.innerHTML = '';

        if (recentPosts.length === 0) {
            recentPostsContainer.innerHTML = '<p>No recent posts found.</p>';
            return;
        }

        recentPosts.forEach(post => {
            const postEl = document.createElement('div');
            postEl.className = 'history-item';
            postEl.innerHTML = `
                <div class="history-item-header">
                    <div class="history-item-title">${post.title}</div>
                    <div class="history-item-date">${post.date}</div>
                </div>
                <div class="history-item-content">${post.content}</div>
                <div class="history-item-actions">
                    <button class="btn btn-outline" style="padding: 5px 10px; font-size: 13px;">Edit</button>
                    <button class="btn btn-outline" style="padding: 5px 10px; font-size: 13px;">Delete</button>
                </div>
            `;
            recentPostsContainer.appendChild(postEl);
        });
    }

    // Copy to clipboard
    function copyToClipboard() {
        const content = document.getElementById('generated-content').textContent;
        navigator.clipboard.writeText(content).then(() => {
            showNotification('Post copied to clipboard!');
        });
    }

    // Save edits
    function saveEdits() {
        const editedContent = editableContent.innerHTML;
        document.getElementById('generated-content').innerHTML = editedContent;
        showNotification('Changes saved successfully!');
    }

    // Save API key to localStorage
    function saveApiKey() {
        const apiKey = document.getElementById('api-key').value;
        if (apiKey) {
            localStorage.setItem('apiKey', apiKey);
            showNotification('API key saved successfully!');
        } else {
            showNotification('Please enter a valid API key', 'error');
        }
    }

    // Load API key from localStorage
    function loadApiKey() {
        const apiKey = localStorage.getItem('apiKey');
        if (apiKey) {
            document.getElementById('api-key').value = apiKey;
        }
    }

    // Show notification
    function showNotification(message, type = 'success') {
        notificationText.textContent = message;
        notification.className = 'notification show';

        if (type === 'error') {
            notification.style.borderLeftColor = 'var(--error)';
        } else {
            notification.style.borderLeftColor = 'var(--success)';
        }

        setTimeout(() => {
            notification.className = 'notification';
        }, 3000);
    }

    // Initialize the application
    init();
});
